import { useState, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function detectType(name = '', tags = {}) {
  const n = (name + ' ' + (tags.amenity || '') + ' ' + (tags.isced_level || '')).toLowerCase()
  if (n.includes('medical') || n.includes('nursing') || n.includes('pharmacy'))
    return { type: 'Medical', icon: '🏥', color: '#EF4444', bg: '#FEF2F2', border: '#FECACA' }
  if (n.includes('polytechnic') || n.includes('polytech'))
    return { type: 'Polytechnic', icon: '⚙️', color: '#8B5CF6', bg: '#F5F3FF', border: '#DDD6FE' }
  if (n.includes('engineering') || n.includes('technical') || n.includes('technology') || n.includes('iit') || n.includes('nit'))
    return { type: 'Engineering', icon: '🔬', color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE' }
  if (n.includes('law'))
    return { type: 'Law', icon: '⚖️', color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A' }
  if (n.includes('women') || n.includes('woman') || n.includes('mahila'))
    return { type: "Women's", icon: '👩‍🎓', color: '#EC4899', bg: '#FDF2F8', border: '#FBCFE8' }
  return { type: 'Arts & Science', icon: '🎓', color: '#10B981', bg: '#F0FDF4', border: '#A7F3D0' }
}

function isGovt(name = '', tags = {}) {
  const n = name.toLowerCase()
  const op = (tags.operator || '').toLowerCase()
  return (
    n.includes('government') || n.includes('govt') || n.includes('sarkari') ||
    n.includes('rajkiya') || n.includes('anna university') ||
    n.includes('national institute') || n.includes('nit ') ||
    n.includes('iit ') || n.includes('iim ') ||
    op.includes('government') || op.includes('govt') ||
    tags.operator_type === 'government' || tags.operator_type === 'public'
  )
}

// ── Geocode city name → lat/lng using Nominatim ──
async function geocodeCity(cityName) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`,
    { headers: { 'Accept-Language': 'en' } }
  )
  const data = await res.json()
  if (!data?.length) return null
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), displayName: data[0].display_name }
}

const BLOCK_PATTERN = /^(block|blk|building|bldg|wing|annex|floor|dept|department|room|lab|hostel block)\s*[\d\w]*$/i

function deduplicateCampusBlocks(colleges) {
  const CLUSTER_KM = 0.3
  const kept = []
  for (const college of colleges) {
    if (BLOCK_PATTERN.test(college.name.trim())) continue
    const nearDupe = kept.find(k => getDistance(k.lat, k.lng, college.lat, college.lng) < CLUSTER_KM)
    if (nearDupe) {
      if (college.name.length > nearDupe.name.length) kept[kept.indexOf(nearDupe)] = college
    } else {
      kept.push(college)
    }
  }
  return kept
}

async function fetchNearbyCollegesOverpass(lat, lng, radiusMeters) {
  const query = `
[out:json][timeout:25];
(
  node["amenity"="college"](around:${radiusMeters},${lat},${lng});
  way["amenity"="college"](around:${radiusMeters},${lat},${lng});
  node["amenity"="university"](around:${radiusMeters},${lat},${lng});
  way["amenity"="university"](around:${radiusMeters},${lat},${lng});
);
out center tags;
  `.trim()

  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
  ]

  let data = null
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, { method: 'POST', body: query, headers: { 'Content-Type': 'text/plain' } })
      if (!res.ok) continue
      data = await res.json()
      if (data?.elements) break
    } catch (err) {
      console.warn(`Overpass failed (${endpoint}):`, err.message)
    }
  }

  if (!data?.elements?.length) return []

  const seen = new Set()
  const raw  = []

  for (const el of data.elements) {
    const tags = el.tags || {}
    const name = tags.name || tags['name:en'] || ''
    if (!name || seen.has(name.toLowerCase())) continue
    seen.add(name.toLowerCase())

    const placeLat = el.lat ?? el.center?.lat
    const placeLng = el.lon  ?? el.center?.lon
    if (!placeLat || !placeLng) continue

    const dist = getDistance(lat, lng, placeLat, placeLng)
    const { type, icon, color, bg, border } = detectType(name, tags)
    const city    = tags['addr:city'] || tags['addr:district'] || ''
    const state   = tags['addr:state'] || ''
    const address = [city, state].filter(Boolean).join(', ')

    raw.push({
      id: String(el.id),
      name, type, icon, color, bg, border, address,
      lat: placeLat, lng: placeLng, distance: dist,
      isGovt:  isGovt(name, tags),
      website: tags.website || tags['contact:website'] || null,
      phone:   tags.phone   || tags['contact:phone']   || null,
      mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(name + (address ? ' ' + address : ''))}`,
      osmUrl:  `https://www.openstreetmap.org/?mlat=${placeLat}&mlon=${placeLng}&zoom=16`,
    })
  }

  return deduplicateCampusBlocks(raw.sort((a, b) => a.distance - b.distance))
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div style={{ background: 'white', border: '1.5px solid #E8E0D5', borderRadius: 18, padding: '22px 24px', marginBottom: 18 }}>
      {[[65, 18], [40, 13], [85, 13], [38, 36]].map(([w, h], i) => (
        <div key={i} style={{ width: `${w}%`, height: h, background: '#F1F5F9', borderRadius: 8, marginBottom: 12, animation: 'pulse 1.4s ease-in-out infinite' }} />
      ))}
    </div>
  )
}

function CollegeCard({ college, isNearest }) {
  return (
    <div style={{
      background: college.bg,
      border: `1.5px solid ${isNearest ? college.color : college.border}`,
      borderRadius: 18, padding: '22px 24px', marginBottom: 18, position: 'relative',
      boxShadow: isNearest ? `0 0 0 2px ${college.color}33, 0 4px 20px ${college.color}18` : '0 1px 4px rgba(0,0,0,0.05)',
    }}>
      {isNearest && (
        <div style={{ position: 'absolute', top: -12, left: 20, background: college.color, color: '#fff', fontSize: 11, fontWeight: 800, padding: '3px 14px', borderRadius: 99, fontFamily: 'Sora, sans-serif' }}>
          📍 NEAREST TO SEARCH LOCATION
        </div>
      )}
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
        <div style={{ width: 52, height: 52, borderRadius: 13, background: college.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, border: `1.5px solid ${college.color}33` }}>
          {college.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1E293B', marginBottom: 4 }}>{college.name}</h4>
              {college.address
                ? <p style={{ fontSize: '0.85rem', color: '#64748B' }}>📌 {college.address}</p>
                : <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>📌 Location via OpenStreetMap</p>}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ padding: '4px 12px', borderRadius: 50, fontSize: '0.78rem', fontFamily: 'Sora, sans-serif', fontWeight: 700, background: college.color + '20', color: college.color, border: `1px solid ${college.color}33` }}>
                {college.type}
              </span>
              {college.isGovt && (
                <span style={{ padding: '4px 12px', borderRadius: 50, fontSize: '0.78rem', fontFamily: 'Sora, sans-serif', fontWeight: 700, background: '#D1FAE5', color: '#065F46' }}>🏛️ Govt</span>
              )}
              <span style={{ padding: '4px 12px', borderRadius: 50, fontSize: '0.82rem', fontFamily: 'Sora, sans-serif', fontWeight: 800, background: isNearest ? college.color : '#F1F5F9', color: isNearest ? '#fff' : '#334155' }}>
                {college.distance < 1 ? `${(college.distance * 1000).toFixed(0)} m` : `${college.distance.toFixed(1)} km`}
              </span>
            </div>
          </div>
          {(college.phone || college.website) && (
            <div style={{ display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
              {college.phone   && <span style={{ fontSize: '0.82rem', color: '#64748B' }}>📞 {college.phone}</span>}
              {college.website && <a href={college.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', color: college.color, textDecoration: 'none' }}>🌐 Website</a>}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
            <a href={college.mapsUrl} target="_blank" rel="noopener noreferrer"
              style={{ padding: '9px 18px', borderRadius: 10, background: college.color, color: '#fff', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
              🗺️ Google Maps
            </a>
            <a href={college.osmUrl} target="_blank" rel="noopener noreferrer"
              style={{ padding: '9px 18px', borderRadius: 10, background: '#F8F4EF', color: '#334155', fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', border: '1.5px solid #E8E0D5' }}>
              🌍 OpenStreetMap
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Colleges() {
  const [colleges,   setColleges]   = useState([])
  const [cityInput,  setCityInput]  = useState('')
  const [cityName,   setCityName]   = useState('')
  const [status,     setStatus]     = useState('idle') // idle | searching | done | empty | error | notfound
  const [radiusKm,   setRadiusKm]   = useState(20)
  const [filter,     setFilter]     = useState('All')
  const [search,     setSearch]     = useState('')
  const [savedLoc,   setSavedLoc]   = useState(null)

  const runSearch = useCallback(async (lat, lng, radius, displayCity) => {
    setStatus('searching')
    setColleges([])
    try {
      const results = await fetchNearbyCollegesOverpass(lat, lng, radius * 1000)
      setCityName(displayCity)
      setColleges(results)
      setStatus(results.length === 0 ? 'empty' : 'done')
    } catch {
      setStatus('error')
    }
  }, [])

  const handleSearch = useCallback(async () => {
    const query = cityInput.trim()
    if (!query) return
    setStatus('searching')
    setColleges([])
    try {
      const loc = await geocodeCity(query)
      if (!loc) { setStatus('notfound'); return }
      // extract short city name from full display name
      const shortName = loc.displayName.split(',')[0]
      setSavedLoc({ lat: loc.lat, lng: loc.lng })
      runSearch(loc.lat, loc.lng, radiusKm, shortName)
    } catch {
      setStatus('error')
    }
  }, [cityInput, radiusKm, runSearch])

  const filtered = colleges
    .filter(c => filter === 'All' ? true : filter === 'Govt Only' ? c.isGovt : c.type === filter)
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  const nearestId = filtered[0]?.id
  const isLoading = status === 'searching'
  const govtCount = colleges.filter(c => c.isGovt).length

  return (
    <div style={{ paddingTop: 68, background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <p className="section-label" style={{ color: '#FED7AA' }}>College Finder</p>
          <h1>Nearby Government Colleges</h1>
          <p>Type your city or district — no location permission needed.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>

        {/* ── Search Box ── */}
        <div style={{ background: 'white', border: '1.5px solid #E8E0D5', borderRadius: 18, padding: '24px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#1E293B', marginBottom: 6 }}>
            🏙️ Enter your city or district
          </h4>
          <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: 16 }}>
            No location permission required — just type where you are.
          </p>

          {/* Input row */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 240px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem' }}>📍</span>
              <input
                type="text"
                placeholder="e.g. Chennai, Erode, Coimbatore, Delhi…"
                value={cityInput}
                onChange={e => setCityInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                style={{
                  width: '100%', padding: '13px 14px 13px 42px',
                  borderRadius: 12, border: '1.5px solid #E8E0D5',
                  fontFamily: 'Sora, sans-serif', fontSize: '0.95rem',
                  color: '#1E293B', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#F97316'}
                onBlur={e  => e.target.style.borderColor = '#E8E0D5'}
              />
            </div>

            {/* Radius */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: 12, padding: '8px 14px', flexShrink: 0 }}>
              <span style={{ fontSize: '0.82rem', color: '#92400E', fontFamily: 'Sora, sans-serif', fontWeight: 600, whiteSpace: 'nowrap' }}>📏 {radiusKm} km</span>
              <input
                type="range" min="5" max="100" step="5" value={radiusKm}
                onChange={e => setRadiusKm(Number(e.target.value))}
                style={{ accentColor: '#F97316', width: 90 }}
              />
            </div>

            <button
              onClick={handleSearch}
              disabled={isLoading || !cityInput.trim()}
              style={{
                padding: '13px 28px', borderRadius: 12, border: 'none',
                background: isLoading || !cityInput.trim() ? '#FED7AA' : 'linear-gradient(135deg, #F97316, #F59E0B)',
                color: 'white', fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: '0.95rem', cursor: isLoading || !cityInput.trim() ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap', transition: 'all 0.2s',
              }}
            >
              {isLoading ? '⏳ Searching…' : '🔍 Find Colleges'}
            </button>
          </div>

          {/* Quick city chips */}
          <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontFamily: 'Sora, sans-serif', alignSelf: 'center' }}>Quick pick:</span>
            {['Chennai', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Coimbatore', 'Erode', 'Jaipur', 'Pune', 'Kolkata'].map(city => (
              <button key={city} onClick={() => { setCityInput(city); }}
                style={{ padding: '5px 14px', borderRadius: 50, border: '1.5px solid #E8E0D5', background: cityInput === city ? '#FFF7ED' : 'white', color: cityInput === city ? '#F97316' : '#334155', fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* ── Status messages ── */}
        {status === 'searching' && (
          <div style={{ background: 'white', border: '1.5px solid #E8E0D5', borderRadius: 18, padding: '22px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: '1.5rem', animation: 'spin 1s linear infinite', display: 'inline-block' }}>🔍</span>
            <div>
              <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#1E293B', marginBottom: 2 }}>Searching colleges near <span style={{ color: '#F97316' }}>{cityInput}</span>…</h4>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Querying OpenStreetMap within {radiusKm} km…</p>
            </div>
          </div>
        )}

        {status === 'notfound' && (
          <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 18, padding: '22px 24px', marginBottom: 24 }}>
            <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#DC2626', marginBottom: 4 }}>❌ City not found: "{cityInput}"</h4>
            <p style={{ fontSize: '0.88rem', color: '#64748B' }}>Try a different spelling or a nearby larger city name.</p>
          </div>
        )}

        {status === 'error' && (
          <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 18, padding: '22px 24px', marginBottom: 24 }}>
            <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#DC2626', marginBottom: 4 }}>❌ Search failed</h4>
            <p style={{ fontSize: '0.88rem', color: '#64748B' }}>Overpass API may be temporarily busy. Try again in a moment.</p>
          </div>
        )}

        {status === 'empty' && (
          <div style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A', borderRadius: 18, padding: '22px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.8rem' }}>🏫</span>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#1E293B', marginBottom: 2 }}>No colleges found near {cityName}</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Try increasing the radius or search a nearby bigger city.</p>
            </div>
            {savedLoc && (
              <button onClick={() => { setRadiusKm(r => Math.min(r + 20, 100)); runSearch(savedLoc.lat, savedLoc.lng, Math.min(radiusKm + 20, 100), cityName) }}
                style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#F97316', color: '#fff', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                🔍 Expand Radius
              </button>
            )}
          </div>
        )}

        {status === 'done' && (
          <div style={{ background: 'white', border: '1.5px solid #E8E0D5', borderRadius: 18, padding: '18px 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#1E293B', marginBottom: 2 }}>
                ✅ Colleges near <span style={{ color: '#F97316' }}>{cityName}</span>
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                {govtCount} govt · {colleges.length - govtCount} private · {colleges.length} total within {radiusKm} km
              </p>
            </div>
            {savedLoc && (
              <button onClick={() => runSearch(savedLoc.lat, savedLoc.lng, radiusKm, cityName)}
                style={{ padding: '8px 18px', borderRadius: 10, border: '1.5px solid #E8E0D5', background: 'white', color: '#334155', fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
                🔄 Refresh
              </button>
            )}
          </div>
        )}

        {/* ── Filters ── */}
        {status === 'done' && (
          <div style={{ background: 'white', border: '1.5px solid #E8E0D5', borderRadius: 18, padding: '16px 20px', marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 200px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
              <input type="text" placeholder="Search college name…" value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '10px 14px 10px 36px', borderRadius: 10, border: '1.5px solid #E8E0D5', fontFamily: 'Sora, sans-serif', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['All', 'Govt Only', 'Engineering', 'Medical', 'Polytechnic', "Women's", 'Arts & Science'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ padding: '7px 14px', borderRadius: 50, border: filter === f ? 'none' : '1.5px solid #E8E0D5', background: filter === f ? '#F97316' : 'transparent', color: filter === f ? 'white' : '#64748B', fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Skeletons */}
        {isLoading && [1, 2, 3].map(i => <Skeleton key={i} />)}

        {/* Count */}
        {status === 'done' && (
          <div style={{ marginBottom: 16, color: '#64748B', fontSize: '0.88rem' }}>
            Showing <strong style={{ color: '#1E293B' }}>{filtered.length}</strong> of {colleges.length} colleges
            {filter !== 'All' && <span> · <span style={{ color: '#F97316' }}>{filter}</span></span>}
          </div>
        )}

        {/* No match */}
        {status === 'done' && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🏫</div>
            <h4 style={{ fontFamily: 'Sora, sans-serif', color: '#1E293B', marginBottom: 8 }}>No colleges match this filter</h4>
            <button onClick={() => { setFilter('All'); setSearch('') }}
              style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#F97316', color: '#fff', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Cards */}
        {filtered.map(c => <CollegeCard key={c.id} college={c} isNearest={c.id === nearestId} />)}

      </div>

      <footer style={{ background: '#1E293B', color: '#94A3B8', padding: '40px 24px', marginTop: 60 }}>
        <div className="container" style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontFamily: 'Sora, sans-serif', color: 'white', marginBottom: 16 }}>PathFinder</h4>
            <p style={{ fontSize: '0.88rem', maxWidth: 280, lineHeight: 1.6 }}>Empowering students with personalized career guidance and connecting them to quality education.</p>
          </div>
          <div>
            <h5 style={{ fontFamily: 'Sora, sans-serif', color: 'white', marginBottom: 12 }}>Quick Links</h5>
            {['Home', 'Take Quiz', 'Career Map', 'Colleges', 'Timeline'].map(link => (
              <a key={link} href={`/${link.toLowerCase().replace(' ', '-')}`} style={{ display: 'block', color: '#94A3B8', fontSize: '0.88rem', marginBottom: 8, textDecoration: 'none' }}>{link}</a>
            ))}
          </div>
          <div>
            <h5 style={{ fontFamily: 'Sora, sans-serif', color: 'white', marginBottom: 12 }}>Support</h5>
            {['About Us', 'Privacy Policy', 'Terms of Use', 'Contact'].map(link => (
              <a key={link} href="#" style={{ display: 'block', color: '#94A3B8', fontSize: '0.88rem', marginBottom: 8, textDecoration: 'none' }}>{link}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #334155', marginTop: 32, paddingTop: 20, textAlign: 'center', fontSize: '0.82rem' }}>
          © {new Date().getFullYear()} PathFinder. All rights reserved.
        </div>
      </footer>

      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  )
}