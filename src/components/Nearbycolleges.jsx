import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  100% FREE — No API key, No Google, No credit card needed
//  Uses:
//    • Browser Geolocation API  — get user GPS (free, built-in)
//    • Nominatim API            — GPS → city name (free, OpenStreetMap)
//    • Overpass API             — find nearby colleges (free, OpenStreetMap)
// ─────────────────────────────────────────────────────────────────────────────

// ─── Haversine distance (km) ──────────────────────────────────────────────────
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── Detect college type from name ───────────────────────────────────────────
function detectType(name = "") {
  const n = name.toLowerCase();
  if (n.includes("medical") || n.includes("nursing") || n.includes("pharmacy"))
    return { type: "Medical",        icon: "🏥", color: "#EF4444", bg: "#FEF2F2", border: "#FECACA" };
  if (n.includes("polytechnic"))
    return { type: "Polytechnic",    icon: "⚙️", color: "#8B5CF6", bg: "#F5F3FF", border: "#DDD6FE" };
  if (n.includes("engineering") || n.includes("technical") || n.includes("technology"))
    return { type: "Engineering",    icon: "🔬", color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" };
  if (n.includes("law"))
    return { type: "Law",            icon: "⚖️", color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" };
  if (n.includes("women") || n.includes("woman") || n.includes("mahila"))
    return { type: "Women's",        icon: "👩‍🎓", color: "#EC4899", bg: "#FDF2F8", border: "#FBCFE8" };
  if (n.includes("agriculture") || n.includes("agricultural"))
    return { type: "Agriculture",    icon: "🌾", color: "#65A30D", bg: "#F7FEE7", border: "#D9F99D" };
  return   { type: "Arts & Science", icon: "🎓", color: "#10B981", bg: "#F0FDF4", border: "#A7F3D0" };
}

// ─── Check if college is government ──────────────────────────────────────────
function isGovt(name = "", operator = "") {
  const text = (name + " " + operator).toLowerCase();
  return (
    text.includes("government") ||
    text.includes("govt") ||
    text.includes("gov't") ||
    text.includes("sarkari") ||
    text.includes("rajkiya") ||
    text.includes("anna university") ||
    text.includes("state university") ||
    text.includes("central university") ||
    text.includes("national institute") ||
    text.includes("nit ") ||
    text.includes("iit ") ||
    text.includes("iim ") ||
    text.includes("iisc") ||
    text.includes("tifr") ||
    text.includes("isro") ||
    operator.toLowerCase().includes("government")
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  NOMINATIM — Reverse geocode GPS → city name (FREE, no key)
// ─────────────────────────────────────────────────────────────────────────────
async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      data.address?.state_district ||
      "Your Area"
    );
  } catch {
    return "Your Area";
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  OVERPASS API — Find nearby colleges (FREE, no key, OpenStreetMap data)
// ─────────────────────────────────────────────────────────────────────────────
async function fetchNearbyColleges(lat, lng, radiusKm) {
  const radiusM = radiusKm * 1000;

  // Overpass QL query — finds all universities/colleges within radius
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="university"](around:${radiusM},${lat},${lng});
      way["amenity"="university"](around:${radiusM},${lat},${lng});
      node["amenity"="college"](around:${radiusM},${lat},${lng});
      way["amenity"="college"](around:${radiusM},${lat},${lng});
      node["building"="university"](around:${radiusM},${lat},${lng});
      way["building"="university"](around:${radiusM},${lat},${lng});
    );
    out center;
  `;

  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });
    const data = await res.json();

    const seen = new Set();
    const results = [];

    for (const el of data.elements || []) {
      const name     = el.tags?.name || el.tags?.["name:en"] || "";
      const operator = el.tags?.operator || "";
      if (!name) continue;
      if (seen.has(name)) continue;

      // Get lat/lng (nodes have direct, ways have center)
      const elLat = el.lat ?? el.center?.lat;
      const elLng = el.lon ?? el.center?.lon;
      if (!elLat || !elLng) continue;

      seen.add(name);

      const govt = isGovt(name, operator);
      const dist = getDistance(lat, lng, elLat, elLng);
      const { type, icon, color, bg, border } = detectType(name);

      results.push({
        id:       el.id.toString(),
        name,
        type,     icon, color, bg, border,
        address:  [
          el.tags?.["addr:street"],
          el.tags?.["addr:city"],
          el.tags?.["addr:state"],
        ].filter(Boolean).join(", ") || "Address not listed",
        lat:      elLat,
        lng:      elLng,
        distance: dist,
        isGovt:   govt,
        phone:    el.tags?.phone || el.tags?.["contact:phone"] || null,
        website:  el.tags?.website || el.tags?.["contact:website"] || null,
        operator,
        mapsUrl:  `https://www.openstreetmap.org/?mlat=${elLat}&mlon=${elLng}&zoom=17`,
        gmapsUrl: `https://maps.google.com/?q=${encodeURIComponent(name + " " + (el.tags?.["addr:city"] || ""))}`,
      });
    }

    return results.sort((a, b) => a.distance - b.distance);
  } catch (e) {
    console.error("Overpass error:", e);
    throw e;
  }
}

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ rating }) {
  if (!rating) return null;
  return (
    <span style={{ color: "#F59E0B", fontSize: 12 }}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
      <span style={{ color: "#9CA3AF", marginLeft: 4, fontSize: 11 }}>{rating}</span>
    </span>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: 16, padding: "16px 18px", marginBottom: 12 }}>
      {[[65, 16], [40, 12], [85, 12], [38, 32]].map(([w, h], i) => (
        <div key={i} style={{
          width: `${w}%`, height: h, background: "#E5E7EB",
          borderRadius: 8, marginBottom: 10,
          animation: "pulse 1.4s ease-in-out infinite",
        }} />
      ))}
    </div>
  );
}

// ─── College Card ─────────────────────────────────────────────────────────────
function CollegeCard({ college, isNearest, showAll }) {
  return (
    <div style={{
      background:   college.bg,
      border:      `1.5px solid ${isNearest ? college.color : college.border}`,
      borderRadius: 16, padding: "16px 18px", marginBottom: 12, position: "relative",
      boxShadow: isNearest
        ? `0 0 0 2px ${college.color}44, 0 4px 16px ${college.color}22`
        : "0 1px 4px rgba(0,0,0,0.06)",
    }}>

      {/* Nearest badge */}
      {isNearest && (
        <div style={{
          position: "absolute", top: -11, left: 16,
          background: college.color, color: "#fff",
          fontSize: 10, fontWeight: 800, padding: "2px 12px", borderRadius: 99,
        }}>📍 NEAREST TO YOU</div>
      )}

      {/* Govt badge */}
      {!college.isGovt && (
        <div style={{
          position: "absolute", top: -11, right: 16,
          background: "#6B7280", color: "#fff",
          fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 99,
        }}>Private</div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: college.color + "20",
          display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 20, flexShrink: 0,
        }}>{college.icon}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", lineHeight: 1.3 }}>
            {college.name}
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{
              background: college.color + "20", color: college.color,
              fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
            }}>{college.type}</span>
            {college.isGovt && (
              <span style={{
                background: "#D1FAE5", color: "#065F46",
                fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
              }}>🏛️ Government</span>
            )}
          </div>
        </div>

        {/* Distance */}
        <div style={{
          background: isNearest ? college.color : "#F3F4F6",
          color:      isNearest ? "#fff"         : "#374151",
          borderRadius: 10, padding: "5px 10px",
          fontSize: 13, fontWeight: 800, whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {college.distance < 1
            ? `${(college.distance * 1000).toFixed(0)} m`
            : `${college.distance.toFixed(1)} km`}
        </div>
      </div>

      {/* Address */}
      {college.address !== "Address not listed" && (
        <div style={{ marginTop: 10, fontSize: 12, color: "#6B7280", display: "flex", gap: 6 }}>
          <span>📌</span><span>{college.address}</span>
        </div>
      )}

      {/* Phone */}
      {college.phone && (
        <div style={{ marginTop: 6, fontSize: 12, color: "#374151", display: "flex", gap: 6 }}>
          <span>📞</span><span>{college.phone}</span>
        </div>
      )}

      {/* Operator */}
      {college.operator && (
        <div style={{ marginTop: 6, fontSize: 12, color: "#6B7280", display: "flex", gap: 6 }}>
          <span>🏢</span><span>{college.operator}</span>
        </div>
      )}

      {/* Action buttons */}
      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <a href={college.gmapsUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: 5,
          background: college.color, color: "#fff",
          borderRadius: 8, padding: "7px 14px",
          fontSize: 12, fontWeight: 700, textDecoration: "none",
        }}>🗺️ Google Maps</a>

        <a href={college.mapsUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: 5,
          background: "#F3F4F6", color: "#374151",
          borderRadius: 8, padding: "7px 14px",
          fontSize: 12, fontWeight: 600, textDecoration: "none",
        }}>🌍 OpenStreetMap</a>

        {college.website && (
          <a href={college.website} target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "#EFF6FF", color: "#1D4ED8",
            borderRadius: 8, padding: "7px 14px",
            fontSize: 12, fontWeight: 600, textDecoration: "none",
          }}>🌐 Website</a>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function NearbyColleges({ isLoggedIn = true }) {
  const [colleges,    setColleges]    = useState([]);
  const [userLoc,     setUserLoc]     = useState(null);
  const [cityName,    setCityName]    = useState("");
  const [status,      setStatus]      = useState("idle");
  // idle | locating | fetching | done | denied | error
  const [filter,      setFilter]      = useState("Govt Only");
  const [sortBy,      setSortBy]      = useState("distance");
  const [searchQuery, setSearchQuery] = useState("");
  const [radiusKm,    setRadiusKm]    = useState(20);

  const FILTERS = ["Govt Only", "All Colleges", "Medical", "Engineering", "Polytechnic", "Arts & Science", "Women's", "Agriculture", "Law"];

  // ── Search using Overpass ───────────────────────────────────────────────────
  const runSearch = useCallback(async (lat, lng, radius) => {
    setStatus("fetching");
    setColleges([]);
    try {
      const [city, results] = await Promise.all([
        reverseGeocode(lat, lng),
        fetchNearbyColleges(lat, lng, radius),
      ]);
      setCityName(city);
      setColleges(results);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }, []);

  // ── Get GPS ─────────────────────────────────────────────────────────────────
  const requestLocation = useCallback(() => {
    if (!isLoggedIn) return;
    setStatus("locating");
    setColleges([]);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setUserLoc({ lat, lng });
        runSearch(lat, lng, radiusKm);
      },
      () => setStatus("denied"),
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, [isLoggedIn, radiusKm, runSearch]);

  useEffect(() => {
    if (isLoggedIn) requestLocation();
  }, [isLoggedIn]);

  // ── Filter + sort ───────────────────────────────────────────────────────────
  const displayed = colleges
    .filter((c) => {
      if (filter === "Govt Only")    return c.isGovt;
      if (filter === "All Colleges") return true;
      return c.type === filter;
    })
    .filter((c) => {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.address.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "name")     return a.name.localeCompare(b.name);
      return 0;
    });

  const nearestId  = sortBy === "distance" ? displayed[0]?.id : null;
  const isLoading  = status === "locating" || status === "fetching";
  const govtCount  = colleges.filter((c) => c.isGovt).length;

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", fontFamily: "'Segoe UI', sans-serif", padding: "0 0 48px" }}>

      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)",
        borderRadius: 20, padding: "22px 22px 20px", color: "#fff", marginBottom: 14,
      }}>
        <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 2 }}>
          🏛️ Govt. Colleges Near You
        </div>
        <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 4 }}>
          100% Free · No API Key · Works Anywhere in India
        </div>
        <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 14, display: "flex", gap: 12 }}>
          <span>📡 Overpass API</span>
          <span>🗺️ OpenStreetMap</span>
          <span>📍 Browser GPS</span>
        </div>

        {/* Status */}
        {!isLoggedIn ? (
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 14px", fontSize: 13 }}>
            🔒 Please <strong>log in</strong> to enable location search.
          </div>
        ) : status === "idle" ? (
          <button onClick={requestLocation} style={{
            background: "#fff", color: "#1D4ED8", border: "none",
            borderRadius: 10, padding: "11px 24px",
            fontSize: 14, fontWeight: 800, cursor: "pointer",
          }}>📍 Find Colleges Near Me</button>
        ) : status === "locating" ? (
          <div style={{ fontSize: 13, opacity: 0.9, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>🔄</span>
            Getting your GPS location…
          </div>
        ) : status === "fetching" ? (
          <div style={{ fontSize: 13, opacity: 0.9, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>🔍</span>
            Searching colleges near <strong style={{ marginLeft: 4 }}>{cityName || "you"}</strong>…
          </div>
        ) : status === "denied" ? (
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px", fontSize: 13, display: "flex", gap: 8 }}>
            ⚠️ Location access denied.
            <span onClick={requestLocation} style={{ fontWeight: 800, cursor: "pointer", textDecoration: "underline" }}>Try again</span>
          </div>
        ) : status === "error" ? (
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px", fontSize: 13, display: "flex", gap: 8 }}>
            ❌ Search failed. Check internet connection.
            <span onClick={requestLocation} style={{ fontWeight: 800, cursor: "pointer", textDecoration: "underline" }}>Retry</span>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 99, padding: "6px 14px", fontSize: 12, fontWeight: 700 }}>
              ✅ {cityName} · {govtCount} govt + {colleges.length - govtCount} private colleges
            </div>
            <button onClick={requestLocation} style={{
              background: "rgba(255,255,255,0.15)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)", borderRadius: 99,
              padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer",
            }}>🔄 Refresh</button>
          </div>
        )}

        {/* Radius slider */}
        {isLoggedIn && status !== "idle" && (
          <div style={{ marginTop: 14, fontSize: 12, opacity: 0.9 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              📏 Search radius: <strong>{radiusKm} km</strong>
              <input
                type="range" min="5" max="60" step="5"
                value={radiusKm}
                onChange={(e) => setRadiusKm(Number(e.target.value))}
                style={{ flex: 1, accentColor: "#fff" }}
              />
            </div>
            {userLoc && (
              <button onClick={() => runSearch(userLoc.lat, userLoc.lng, radiusKm)} style={{
                background: "rgba(255,255,255,0.2)", color: "#fff",
                border: "none", borderRadius: 8, padding: "7px 16px",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}>🔍 Search {radiusKm} km</button>
            )}
          </div>
        )}
      </div>

      {/* ── Search bar ── */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
        <input
          type="text" placeholder="Search college name or area…"
          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%", padding: "11px 14px 11px 38px",
            borderRadius: 12, border: "1.5px solid #E5E7EB",
            fontSize: 13, outline: "none", boxSizing: "border-box", background: "#FAFAFA",
          }}
        />
      </div>

      {/* ── Filters ── */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, gap: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "5px 11px", borderRadius: 99, border: "none", cursor: "pointer",
              fontSize: 11, fontWeight: 700,
              background: filter === f ? "#1D4ED8" : "#F3F4F6",
              color:      filter === f ? "#fff"    : "#374151",
            }}>{f}</button>
          ))}
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{
          padding: "6px 10px", borderRadius: 8, border: "1.5px solid #E5E7EB",
          fontSize: 12, background: "#fff", cursor: "pointer",
          outline: "none", fontWeight: 600, color: "#374151",
        }}>
          <option value="distance">📍 Nearest first</option>
          <option value="name">🔤 A–Z</option>
        </select>
      </div>

      {/* ── Skeletons ── */}
      {isLoading && [1, 2, 3].map((i) => <Skeleton key={i} />)}

      {/* ── Count ── */}
      {status === "done" && (
        <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 12 }}>
          Showing <strong style={{ color: "#374151" }}>{displayed.length}</strong> colleges
          {filter !== "All Colleges" ? ` · ${filter}` : ""}
          {searchQuery ? ` matching "${searchQuery}"` : ""}
          {" "}within <strong style={{ color: "#374151" }}>{radiusKm} km</strong> of {cityName}
        </div>
      )}

      {/* ── Empty state ── */}
      {status === "done" && displayed.length === 0 && (
        <div style={{
          textAlign: "center", padding: "40px 20px",
          background: "#F9FAFB", borderRadius: 16,
        }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>🏫</div>
          <div style={{ fontWeight: 700, color: "#374151", fontSize: 15, marginBottom: 6 }}>
            No colleges found
          </div>
          <div style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 16 }}>
            Try increasing the radius or switching to "All Colleges"
          </div>
          <button onClick={() => { setFilter("All Colleges"); setRadiusKm(40); }} style={{
            background: "#1D4ED8", color: "#fff", border: "none",
            borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>Show All Colleges (40 km)</button>
        </div>
      )}

      {/* ── Cards ── */}
      {displayed.map((c) => (
        <CollegeCard key={c.id} college={c} isNearest={c.id === nearestId} />
      ))}

      {/* ── Login nudge ── */}
      {!isLoggedIn && (
        <div style={{
          background: "#EFF6FF", border: "1.5px solid #BFDBFE",
          borderRadius: 14, padding: "20px", textAlign: "center",
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔐</div>
          <div style={{ fontWeight: 700, color: "#1D4ED8", fontSize: 15 }}>Login to find colleges near you</div>
          <div style={{ color: "#6B7280", fontSize: 13, marginTop: 4 }}>
            Uses your GPS + free OpenStreetMap data. No API key. No credit card. Works anywhere.
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin   { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}