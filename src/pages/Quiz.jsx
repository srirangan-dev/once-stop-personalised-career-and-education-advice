import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FIELDS } from '../data/Fieldsdata'

export default function Quiz() {
  const [search,  setSearch]  = useState('')
  const [hovered, setHovered] = useState(null)
  const navigate = useNavigate()
  

  const filtered = FIELDS.filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase()) ||
    f.tagline.toLowerCase().includes(search.toLowerCase()) ||
    f.careers.some(c => c.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div style={S.page}>

      {/* ── HERO ── */}
      <div style={S.hero}>
        <div style={S.orb1} /><div style={S.orb2} /><div style={S.grid} />
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={S.heroTag}>
            <span style={S.heroTagLine} />
            Explore Your Interests
          </div>
          <h1 style={S.heroH1}>
            What excites{' '}
            <em style={{ color: '#F97316', fontStyle: 'italic' }}>you</em>{' '}
            the most?
          </h1>
          <p style={S.heroSub}>
            Tap any field card to see full details — degrees, careers, salary and exams.
            Then take a quiz tailored <strong style={{ color: 'white' }}>just for that field</strong> to confirm your fit.
          </p>

          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: 420 }}>
            <span style={S.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search fields, careers, subjects…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={S.searchInput}
            />
            {search && (
              <button onClick={() => setSearch('')} style={S.clearBtn}>✕</button>
            )}
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 24px 72px' }}>

        {/* Result count when searching */}
        {search && (
          <p style={S.resultCount}>
            <strong style={{ color: '#1E293B' }}>{filtered.length}</strong>{' '}
            field{filtered.length !== 1 ? 's' : ''} found for{' '}
            "<strong style={{ color: '#F97316' }}>{search}</strong>"
          </p>
        )}

        {filtered.length === 0 ? (
          <div style={S.empty}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
            <h4 style={S.emptyTitle}>No fields match your search</h4>
            <p style={S.emptySub}>Try a different term like "doctor", "business", or "arts"</p>
            <button onClick={() => setSearch('')} style={S.clearAllBtn}>Clear Search</button>
          </div>
        ) : (
          <div style={S.cardGrid}>
            {filtered.map((field, i) => (
              <FieldCard
                key={field.id}
                field={field}
                index={i}
                hovered={hovered === field.id}
                onMouseEnter={() => setHovered(field.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(`/quiz/${field.id}`)}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div style={S.bottomCta}>
          <div style={S.ctaOrb} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={S.ctaTitle}>Not sure which field fits you?</h3>
            <p style={S.ctaSub}>
              Select any field above to explore it in detail, then take a quiz
              with questions written specifically for that field.
            </p>
          </div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
            {['Technology & IT', 'Medicine', 'Business & Finance'].map(f => (
              <div key={f} style={S.ctaChip}>
                <span style={{ color: '#F97316' }}>▶</span> {f}
              </div>
            ))}
            <div style={S.ctaChip}>
              <span style={{ color: '#10B981' }}>+</span> 9 more fields…
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        input::placeholder { color: rgba(255,255,255,0.38); }
      `}</style>
    </div>
  )
}

/* ── Field Card ── */
function FieldCard({ field: f, index, hovered, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        background:  hovered ? f.bg    : 'white',
        border:      `2px solid ${hovered ? f.color : '#E8E0D5'}`,
        borderRadius: 20, padding: '24px', cursor: 'pointer',
        transition:  'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        transform:   hovered ? 'translateY(-7px) scale(1.025)' : 'none',
        boxShadow:   hovered ? `0 18px 44px ${f.color}28` : '0 1px 4px rgba(15,23,42,0.07)',
        animation:   `fadeUp 0.5s ease ${index * 0.045}s both`,
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Top colour bar */}
      {hovered && (
        <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${f.color},${f.dark})` }} />
      )}

      {/* Tag pill */}
      <div style={{
        position:'absolute', top:14, right:14,
        padding:'3px 10px', borderRadius:50,
        background: hovered ? 'white' : f.bg,
        color: f.tagColor,
        fontSize:'0.66rem', fontFamily:'Sora,sans-serif', fontWeight:700,
        border:`1px solid ${f.border}`,
      }}>{f.tag}</div>

      {/* Icon */}
      <div style={{
        width:54, height:54, borderRadius:15,
        background: hovered ? 'white' : f.bg,
        border:`1.5px solid ${f.border}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.75rem', marginBottom:15,
        boxShadow: hovered ? `0 4px 14px ${f.color}22` : 'none',
        transition:'all 0.3s',
      }}>{f.icon}</div>

      {/* Title */}
      <h3 style={{
        fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'1rem',
        color: hovered ? f.color : '#1E293B', marginBottom:5, paddingRight:56,
        transition:'color 0.2s',
      }}>{f.title}</h3>

      <p style={{ fontSize:'0.8rem', color:'#94A3B8', fontFamily:'DM Sans,sans-serif', marginBottom:14, lineHeight:1.5 }}>
        {f.tagline}
      </p>

      {/* Top 3 careers */}
      <div style={{ display:'flex', flexDirection:'column', gap:5, marginBottom:16 }}>
        {f.careers.slice(0,3).map(c => (
          <div key={c} style={{ fontSize:'0.77rem', color:'#475569', display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:f.color, flexShrink:0, display:'inline-block' }} />
            {c}
          </div>
        ))}
        <div style={{ fontSize:'0.7rem', color:'#CBD5E1' }}>+{f.careers.length - 3} more careers</div>
      </div>

      {/* Footer */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{
          padding:'5px 11px', borderRadius:50,
          background: hovered ? 'white' : '#F8F4EF',
          border:'1px solid #E8E0D5',
          fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.73rem', color:'#F97316',
        }}>💰 {f.avgSalary}</span>
        <span style={{
          fontSize:'0.73rem', fontFamily:'Sora,sans-serif', fontWeight:700,
          color: hovered ? f.color : '#CBD5E1', transition:'color 0.2s',
          display:'flex', alignItems:'center', gap:4,
        }}>
          {hovered ? 'Tap to explore →' : '▼ Explore'}
        </span>
      </div>
    </div>
  )
}

/* ── Styles ── */
const S = {
  page: { paddingTop:68, background:'#FFFBF5', minHeight:'100vh', fontFamily:'DM Sans,sans-serif' },

  hero: { background:'linear-gradient(135deg,#0F172A 0%,#1E293B 55%,#1a2f4a 100%)', padding:'64px 24px 52px', position:'relative', overflow:'hidden' },
  orb1: { position:'absolute', top:-80, right:-80, width:360, height:360, borderRadius:'50%', background:'radial-gradient(circle,rgba(249,115,22,0.18) 0%,transparent 70%)' },
  orb2: { position:'absolute', bottom:-60, left:'30%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(16,185,129,0.10) 0%,transparent 70%)' },
  grid: { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'52px 52px' },

  heroTag: { display:'flex', alignItems:'center', gap:8, marginBottom:16, fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.75rem', letterSpacing:'0.1em', color:'#F97316', textTransform:'uppercase' },
  heroTagLine: { width:28, height:2, background:'#F97316', display:'inline-block', borderRadius:2 },
  heroH1: { fontFamily:'DM Serif Display,serif', fontSize:'clamp(2rem,4vw,3rem)', color:'white', marginBottom:14, lineHeight:1.2 },
  heroSub: { color:'rgba(255,255,255,0.65)', fontSize:'1.05rem', maxWidth:540, lineHeight:1.75, marginBottom:32 },

  searchInput: { width:'100%', padding:'13px 44px 13px 46px', borderRadius:50, border:'1.5px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.09)', backdropFilter:'blur(12px)', color:'white', fontFamily:'DM Sans,sans-serif', fontSize:'0.95rem', outline:'none', boxSizing:'border-box' },
  searchIcon: { position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', fontSize:'1rem', pointerEvents:'none' },
  clearBtn: { position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.15)', border:'none', color:'white', width:24, height:24, borderRadius:'50%', cursor:'pointer', fontSize:'0.7rem', display:'flex', alignItems:'center', justifyContent:'center' },

  resultCount: { marginBottom:20, color:'#64748B', fontSize:'0.88rem' },

  cardGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(255px,1fr))', gap:18 },

  empty: { textAlign:'center', padding:'72px 20px' },
  emptyTitle: { fontFamily:'Sora,sans-serif', color:'#1E293B', marginBottom:8 },
  emptySub: { color:'#94A3B8', marginBottom:20 },
  clearAllBtn: { padding:'10px 26px', borderRadius:50, background:'#F97316', color:'white', border:'none', fontFamily:'Sora,sans-serif', fontWeight:600, cursor:'pointer', fontSize:'0.88rem' },

  bottomCta: { marginTop:60, background:'linear-gradient(135deg,#0F172A,#1a2f4a)', borderRadius:24, padding:'44px 36px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:28, position:'relative', overflow:'hidden' },
  ctaOrb: { position:'absolute', top:-40, right:-40, width:220, height:220, borderRadius:'50%', background:'radial-gradient(circle,rgba(249,115,22,0.18) 0%,transparent 70%)' },
  ctaTitle: { fontFamily:'DM Serif Display,serif', fontSize:'clamp(1.4rem,3vw,1.9rem)', color:'white', marginBottom:8 },
  ctaSub: { color:'rgba(255,255,255,0.58)', fontSize:'0.9rem', maxWidth:420, lineHeight:1.7 },
  ctaChip: { padding:'6px 14px', borderRadius:50, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.75)', fontFamily:'DM Sans,sans-serif', fontSize:'0.82rem', display:'flex', alignItems:'center', gap:8 },
}
