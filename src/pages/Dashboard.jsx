import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { removeCollege, getDashboardData } from '../utils/Dashboardhelpers'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function getToken() {
  return localStorage.getItem('pf_token') || localStorage.getItem('token') || ''
}

const STREAMS = [
  { value: 'Science (PCM)',   label: '🔬 Science (PCM)',   desc: 'Physics, Chemistry, Maths' },
  { value: 'Science (PCB)',   label: '🧬 Science (PCB)',   desc: 'Physics, Chemistry, Biology' },
  { value: 'Commerce',        label: '📊 Commerce',        desc: 'Accounts, Business Studies' },
  { value: 'Arts/Humanities', label: '🎭 Arts/Humanities', desc: 'History, Political Science' },
  { value: 'Vocational',      label: '🛠️ Vocational',      desc: 'Skill-based programs' },
]

const timeAgo = (iso) => {
  if (!iso) return ''
  const s = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (s < 60)    return 'just now'
  if (s < 3600)  return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

// ── Stream Selector ───────────────────────────────────────────────────────────
function StreamSelector({ currentStream, onSave }) {
  const [selected, setSelected] = useState(currentStream || '')
  const [saving,   setSaving]   = useState(false)
  const [saved,    setSaved]    = useState(false)

  const handleSave = async () => {
    if (!selected) return
    setSaving(true)
    try {
      const res = await fetch(`${API}/api/auth/profile`, {
        method:  'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ stream: selected }),
      })
      if (res.ok) {
        onSave(selected)
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      }
    } catch (err) {
      console.error('Stream save error:', err)
    }
    setSaving(false)
  }

  return (
    <div style={{ background:'#fff', border:'1px solid #E8E0D5', borderRadius:18, padding:'24px', marginBottom:28 }}>
      <div style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1rem', color:'#0F172A', marginBottom:4 }}>
        🎓 Your Stream
      </div>
      <div style={{ fontSize:'0.82rem', color:'#64748B', marginBottom:18 }}>
        Select your stream so we can show relevant careers and colleges.
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:10, marginBottom:18 }}>
        {STREAMS.map(s => (
          <button key={s.value} onClick={() => setSelected(s.value)} style={{
            padding:'12px 16px', borderRadius:12, cursor:'pointer', textAlign:'left',
            border:      selected === s.value ? '2px solid #F97316' : '1.5px solid #E8E0D5',
            background:  selected === s.value ? '#FFF4ED' : '#fff',
            boxShadow:   selected === s.value ? '0 0 0 3px rgba(249,115,22,0.1)' : 'none',
            transition: 'all 0.2s',
          }}>
            <div style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.85rem', color: selected === s.value ? '#F97316' : '#0F172A', marginBottom:3 }}>
              {s.label}
            </div>
            <div style={{ fontSize:'0.72rem', color:'#94A3B8' }}>{s.desc}</div>
          </button>
        ))}
      </div>

      <button onClick={handleSave} disabled={!selected || saving} style={{
        padding:'10px 28px', borderRadius:50, border:'none',
        cursor:     selected && !saving ? 'pointer' : 'not-allowed',
        background: saved    ? '#10B981' :
                    selected ? 'linear-gradient(135deg,#F97316,#F59E0B)' : '#E2E8F0',
        color:'#fff', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:'0.85rem',
        boxShadow:  selected ? '0 4px 14px rgba(249,115,22,0.3)' : 'none',
        transition: 'all 0.3s',
      }}>
        {saving ? '⏳ Saving…' : saved ? '✅ Saved!' : '💾 Save Stream'}
      </button>
    </div>
  )
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ emoji, label, value, sub, accent }) {
  return (
    <div style={{
      background: accent ? 'linear-gradient(135deg,#F97316,#F59E0B)' : '#fff',
      borderRadius: 18, padding: '22px 24px',
      border:    accent ? 'none' : '1px solid #E8E0D5',
      boxShadow: accent ? '0 8px 28px rgba(249,115,22,0.28)' : '0 2px 12px rgba(15,23,42,0.06)',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <span style={{ fontSize: '1.6rem' }}>{emoji}</span>
      <div style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1.6rem', color: accent ? '#fff' : '#0F172A' }}>{value}</div>
      <div style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'0.82rem', color: accent ? 'rgba(255,255,255,0.85)' : '#64748B' }}>{label}</div>
      {sub && <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'0.72rem', color: accent ? 'rgba(255,255,255,0.65)' : '#94A3B8' }}>{sub}</div>}
    </div>
  )
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyState({ emoji, title, desc, to, cta }) {
  return (
    <div style={{ background:'#fff', borderRadius:18, border:'1.5px dashed #E8E0D5', padding:'40px 24px', textAlign:'center' }}>
      <div style={{ fontSize:'2.2rem', marginBottom:10 }}>{emoji}</div>
      <div style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.95rem', color:'#0F172A', marginBottom:6 }}>{title}</div>
      <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'0.82rem', color:'#94A3B8', marginBottom:18, lineHeight:1.6, maxWidth:340, margin:'0 auto 18px' }}>{desc}</div>
      <Link to={to} style={{ display:'inline-block', padding:'10px 22px', borderRadius:50, background:'linear-gradient(135deg,#F97316,#F59E0B)', color:'#fff', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:'0.85rem', textDecoration:'none', boxShadow:'0 4px 14px rgba(249,115,22,0.3)' }}>
        {cta}
      </Link>
    </div>
  )
}

// ── Quiz Result Card ──────────────────────────────────────────────────────────
function QuizCard({ quizResult, navigate, full }) {
  const pct          = quizResult.matchScore  || 0
  const fieldColor   = quizResult.fieldColor  || '#F97316'
  const fieldIcon    = quizResult.fieldIcon   || '🎯'
  const verdictEmoji = quizResult.verdictEmoji || '🎯'
  const verdictLabel = quizResult.verdictLabel || ''

  const vColor =
    pct >= 80 ? '#10B981' :
    pct >= 60 ? '#3B82F6' :
    pct >= 40 ? '#F59E0B' : '#EF4444'

  return (
    <div style={{ background:'#fff', borderRadius:20, border:'1px solid #E8E0D5', overflow:'hidden', boxShadow:'0 2px 12px rgba(15,23,42,0.06)' }}>
      <div style={{ background:'linear-gradient(135deg,#0F172A,#1E293B)', padding:'24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:52, height:52, borderRadius:14, background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem', flexShrink:0 }}>
            {fieldIcon}
          </div>
          <div>
            <div style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.45)', fontFamily:'Sora,sans-serif', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:4 }}>Top Career Match</div>
            <div style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1.2rem', color:'white' }}>
              {quizResult.topCareer || quizResult.topMatch || quizResult.career || 'Your Top Career'}
            </div>
            {quizResult.fieldTitle && <div style={{ fontSize:'0.78rem', color:fieldColor, fontWeight:600, marginTop:2 }}>{quizResult.fieldTitle}</div>}
          </div>
        </div>
        <div style={{ position:'relative', width:90, height:90, flexShrink:0 }}>
          <svg viewBox="0 0 80 80" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
            <circle cx="40" cy="40" r="34" fill="none" stroke={vColor} strokeWidth="7"
              strokeDasharray={`${2*Math.PI*34}`}
              strokeDashoffset={`${2*Math.PI*34*(1-pct/100)}`}
              strokeLinecap="round" />
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontFamily:'Sora,sans-serif', fontWeight:900, fontSize:'1.3rem', color:'white', lineHeight:1 }}>{pct}%</span>
            <span style={{ fontSize:'0.55rem', color:'rgba(255,255,255,0.45)' }}>match</span>
          </div>
        </div>
      </div>

      <div style={{ padding:'10px 24px', background: vColor+'15', borderBottom:'1px solid #E8E0D5', display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ fontSize:'1rem' }}>{verdictEmoji}</span>
        <span style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.82rem', color:vColor }}>{verdictLabel}</span>
        {quizResult.takenAt && (
          <span style={{ marginLeft:'auto', fontSize:'0.72rem', color:'#CBD5E1', fontFamily:'DM Sans,sans-serif' }}>
            Taken {new Date(quizResult.takenAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
          </span>
        )}
      </div>

      <div style={{ padding:'20px 24px' }}>
        {quizResult.description && (
          <p style={{ fontSize:'0.85rem', color:'#64748B', lineHeight:1.6, marginBottom:20 }}>{quizResult.description}</p>
        )}

        {quizResult.scores && Object.keys(quizResult.scores).length > 0 && (
          <div style={{ marginBottom:20 }}>
            <div style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.78rem', color:'#94A3B8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 }}>Question-by-Question Score</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {Object.entries(quizResult.scores).slice(0, full ? 99 : 4).map(([label, score]) => (
                <div key={label}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:'0.76rem', fontWeight:600, color:'#334155', maxWidth:'80%', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{label}</span>
                    <span style={{ fontSize:'0.76rem', color:fieldColor, fontWeight:700 }}>{score}%</span>
                  </div>
                  <div style={{ height:6, background:'#F1F5F9', borderRadius:50 }}>
                    <div style={{ height:'100%', borderRadius:50, width:`${score}%`, background:`linear-gradient(90deg,${fieldColor},#F59E0B)` }} />
                  </div>
                </div>
              ))}
              {!full && quizResult.scores && Object.keys(quizResult.scores).length > 4 && (
                <div style={{ fontSize:'0.75rem', color:'#94A3B8', textAlign:'center', marginTop:4 }}>
                  +{Object.keys(quizResult.scores).length - 4} more — see Quiz Results tab
                </div>
              )}
            </div>
          </div>
        )}

        {full && quizResult.allCareers?.length > 0 && (
          <div style={{ marginBottom:20 }}>
            <div style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.78rem', color:'#94A3B8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 }}>All Recommended Careers</div>
            {quizResult.allCareers.map((career, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background: i===0 ? 'rgba(249,115,22,0.06)' : '#F8FAFC', borderRadius:12, border: i===0 ? '1px solid rgba(249,115,22,0.2)' : '1px solid #F1F5F9', marginBottom:8 }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:'0.88rem', color:'#0F172A' }}>
                    {i===0 ? '🥇 ' : i===1 ? '🥈 ' : i===2 ? '🥉 ' : ''}{career.name}
                  </div>
                  {career.salary && <div style={{ fontSize:'0.75rem', color:'#94A3B8' }}>{career.salary}</div>}
                </div>
                <span style={{ background: i===0 ? 'linear-gradient(135deg,#F97316,#F59E0B)' : '#E2E8F0', color: i===0 ? '#fff' : '#64748B', padding:'3px 12px', borderRadius:50, fontSize:'0.75rem', fontWeight:700 }}>
                  {career.match}%
                </span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:18 }}>
          {[
            { label:'Score',  value:`${quizResult.totalScore||0}/${quizResult.maxScore||0}`, color:vColor },
            { label:'Match',  value:`${pct}%`, color:vColor },
            { label:'Salary', value:quizResult.avgSalary || '—', color:'#F97316' },
          ].map(s => (
            <div key={s.label} style={{ background:'#F8FAFC', borderRadius:10, padding:'10px', textAlign:'center', border:'1px solid #E8E0D5' }}>
              <div style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'0.9rem', color:s.color }}>{s.value}</div>
              <div style={{ fontSize:'0.68rem', color:'#94A3B8', marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          <Link to="/careers" style={{ flex:1, minWidth:120, padding:'9px 20px', borderRadius:50, textDecoration:'none', background:'linear-gradient(135deg,#F97316,#F59E0B)', color:'#fff', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:'0.82rem', textAlign:'center', boxShadow:'0 4px 14px rgba(249,115,22,0.3)' }}>
            View Career Map →
          </Link>
          <button onClick={() => navigate('/quiz')} style={{ flex:1, minWidth:120, padding:'9px 20px', borderRadius:50, cursor:'pointer', background:'transparent', border:'1.5px solid #E8E0D5', color:'#64748B', fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'0.82rem' }}>
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

// ── College Card ──────────────────────────────────────────────────────────────
function CollegeCard({ college, onRemove, full }) {
  const accentColor = college.color  || '#F97316'
  const bgColor     = college.bg     || '#FFF4ED'
  const icon        = college.icon   || '🏫'

  return (
    <div style={{ background:bgColor, borderRadius:18, border:`1px solid ${college.border || '#E8E0D5'}`, padding:'18px 20px', boxShadow:'0 2px 10px rgba(15,23,42,0.05)', display:'flex', flexDirection:'column', gap:8 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, flex:1, minWidth:0 }}>
          <div style={{ width:40, height:40, borderRadius:10, flexShrink:0, background:accentColor+'20', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', border:`1px solid ${accentColor}33` }}>
            {icon}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.92rem', color:'#0F172A', lineHeight:1.3 }}>{college.name}</div>
            {(college.location || college.address) && (
              <div style={{ fontSize:'0.76rem', color:'#94A3B8', marginTop:2 }}>📍 {college.location || college.address}</div>
            )}
          </div>
        </div>
        <button onClick={() => onRemove(college.id)} style={{ background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.15)', borderRadius:8, color:'#EF4444', cursor:'pointer', fontSize:'0.72rem', fontWeight:700, padding:'4px 10px', fontFamily:'DM Sans,sans-serif', flexShrink:0 }}>
          Remove
        </button>
      </div>
      {full && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {college.type && (
            <span style={{ background:accentColor+'15', color:accentColor, border:`1px solid ${accentColor}30`, borderRadius:6, padding:'2px 9px', fontSize:'0.72rem', fontWeight:700, fontFamily:'DM Sans,sans-serif' }}>
              {college.type}
            </span>
          )}
          {college.isGovt && (
            <span style={{ background:'#D1FAE5', color:'#065F46', border:'1px solid #A7F3D0', borderRadius:6, padding:'2px 9px', fontSize:'0.72rem', fontWeight:700, fontFamily:'DM Sans,sans-serif' }}>
              🏛️ Govt
            </span>
          )}
          {college.distance != null && (
            <span style={{ background:'#F1F5F9', color:'#334155', borderRadius:6, padding:'2px 9px', fontSize:'0.72rem', fontWeight:700, fontFamily:'DM Sans,sans-serif' }}>
              {college.distance < 1 ? `${(college.distance*1000).toFixed(0)} m` : `${college.distance.toFixed(1)} km`} away
            </span>
          )}
        </div>
      )}
      {full && (college.mapsUrl || college.website) && (
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {college.mapsUrl && <a href={college.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:'0.75rem', color:accentColor, textDecoration:'none', fontWeight:600 }}>🗺️ Google Maps</a>}
          {college.website && <a href={college.website} target="_blank" rel="noopener noreferrer" style={{ fontSize:'0.75rem', color:'#3B82F6', textDecoration:'none', fontWeight:600 }}>🌐 Website</a>}
        </div>
      )}
      <div style={{ fontSize:'0.7rem', color:'#CBD5E1' }}>Saved {timeAgo(college.savedAt) || 'recently'}</div>
    </div>
  )
}

function getTopCareerLabel(quizResult) {
  if (!quizResult) return null
  return quizResult.topCareer || quizResult.topMatch || quizResult.career || null
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user, updateUser } = useAuth()
  const navigate             = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const [data, setData] = useState({
    quizResult:    null,
    savedColleges: [],
    activityLog:   [],
  })
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    const result = await getDashboardData()
    setData(result)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
    const refresh = () => fetchData()
    window.addEventListener('pathfinder:storage', refresh)
    window.addEventListener('focus', refresh)
    return () => {
      window.removeEventListener('pathfinder:storage', refresh)
      window.removeEventListener('focus', refresh)
    }
  }, [fetchData])

  const handleRemove = async (id) => {
    await removeCollege(id)
    fetchData()
  }

  const { quizResult, savedColleges, activityLog } = data

  const initials  = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : user?.username?.slice(0, 2).toUpperCase() || '??'
  const firstName     = (user?.name || user?.username || 'Student').split(' ')[0]
  const topCareerLabel = getTopCareerLabel(quizResult)

  const tabs = [
    { id:'overview',  label:'Overview',       emoji:'📈' },
    { id:'quiz',      label:'Quiz Results',   emoji:'🎯' },
    { id:'colleges',  label:'Saved Colleges', emoji:'🏫', count: savedColleges.length },
    { id:'activity',  label:'Activity',       emoji:'📣' },
  ]

  if (loading) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#FFFBF5', gap:16 }}>
        <div style={{ fontSize:'2.5rem', animation:'spin 1s linear infinite' }}>⏳</div>
        <div style={{ fontFamily:'Sora,sans-serif', fontWeight:700, color:'#94A3B8', fontSize:'1rem' }}>Loading your dashboard…</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight:'100vh', background:'#FFFBF5', fontFamily:'DM Sans,sans-serif', paddingTop:88 }}>
      <div style={{ maxWidth:1000, margin:'0 auto', padding:'0 20px 60px' }}>

        {/* ── Profile banner ── */}
        <div style={{ background:'linear-gradient(135deg,#FFF4ED,#FFFBF5)', border:'1px solid #E8E0D5', borderRadius:24, padding:'28px 32px', display:'flex', alignItems:'center', gap:20, marginBottom:28, flexWrap:'wrap' }}>
          <div style={{ width:64, height:64, borderRadius:18, flexShrink:0, background:'linear-gradient(135deg,#F97316,#F59E0B)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:22, color:'#fff', boxShadow:'0 8px 24px rgba(249,115,22,0.3)' }}>
            {initials}
          </div>
          <div style={{ flex:1, minWidth:200 }}>
            <div style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1.3rem', color:'#0F172A' }}>Welcome back, {firstName}! 👋</div>
            <div style={{ fontSize:'0.85rem', color:'#64748B', marginTop:4, display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
              {user?.email}
              {user?.stream && (
                <span style={{ background:'rgba(249,115,22,0.1)', color:'#F97316', padding:'2px 10px', borderRadius:50, fontSize:'0.75rem', fontWeight:700, border:'1px solid rgba(249,115,22,0.2)' }}>
                  {user.stream}
                </span>
              )}
            </div>
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/quiz')} style={{ padding:'9px 18px', borderRadius:50, cursor:'pointer', background:'linear-gradient(135deg,#F97316,#F59E0B)', border:'none', color:'#fff', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:'0.82rem', boxShadow:'0 4px 14px rgba(249,115,22,0.3)' }}>
              🎯 {quizResult ? 'Retake Quiz' : 'Take Quiz'}
            </button>
            <button onClick={() => navigate('/colleges')} style={{ padding:'9px 18px', borderRadius:50, cursor:'pointer', background:'#fff', border:'1.5px solid #E8E0D5', color:'#334155', fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'0.82rem' }}>
              🏫 Find Colleges
            </button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display:'flex', gap:6, marginBottom:24, overflowX:'auto', paddingBottom:4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding:'9px 18px', borderRadius:50, cursor:'pointer', flexShrink:0, background: activeTab===t.id ? 'linear-gradient(135deg,#F97316,#F59E0B)' : '#fff', border: activeTab===t.id ? 'none' : '1.5px solid #E8E0D5', color: activeTab===t.id ? '#fff' : '#64748B', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:'0.82rem', boxShadow: activeTab===t.id ? '0 4px 14px rgba(249,115,22,0.25)' : 'none', transition:'all 0.2s' }}>
              {t.emoji} {t.label}{t.count > 0 ? ` (${t.count})` : ''}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div>
            {/* ✅ Stream Selector */}
            <StreamSelector
              currentStream={user?.stream}
              onSave={(stream) => updateUser({ stream })}
            />

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:16, marginBottom:28 }}>
              <StatCard
                emoji="🎯"
                label="Quiz Status"
                value={quizResult ? 'Done ✔' : 'Pending'}
                sub={quizResult ? (topCareerLabel ? `Top: ${topCareerLabel}` : 'Quiz completed ✔') : 'Take the career quiz'}
                accent={!!quizResult}
              />
              <StatCard emoji="🏫" label="Saved Colleges" value={savedColleges.length} sub={savedColleges.length ? `Latest: ${savedColleges[0]?.name}` : 'No colleges saved yet'} />
              <StatCard emoji="📣" label="Activities"     value={activityLog.length}   sub={activityLog.length ? timeAgo(activityLog[0]?.time) : 'No activity yet'} />
              <StatCard emoji="🎓" label="Stream"         value={user?.stream || '—'}  sub="Your selected stream" />
            </div>

            <h3 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1rem', color:'#0F172A', marginBottom:14 }}>🎯 Quiz Results</h3>
            {quizResult
              ? <QuizCard quizResult={quizResult} navigate={navigate} />
              : <EmptyState emoji="🎯" title="No quiz taken yet" desc="Take the career quiz to discover your best career matches and get personalised college suggestions." to="/quiz" cta="Take the Quiz →" />}

            <h3 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1rem', color:'#0F172A', margin:'28px 0 14px' }}>🏫 Saved Colleges</h3>
            {savedColleges.length > 0 ? (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
                {savedColleges.slice(0,3).map(c => <CollegeCard key={c.id} college={c} onRemove={handleRemove} />)}
                {savedColleges.length > 3 && (
                  <button onClick={() => setActiveTab('colleges')} style={{ borderRadius:18, border:'1.5px dashed #E8E0D5', background:'transparent', color:'#F97316', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:'0.9rem', cursor:'pointer', padding:'24px' }}>
                    +{savedColleges.length - 3} more →
                  </button>
                )}
              </div>
            ) : (
              <EmptyState emoji="🏫" title="No colleges saved yet" desc={`Browse colleges and tap 💛 Save to Dashboard — they'll show up here just for you, ${firstName}.`} to="/colleges" cta="Browse Colleges →" />
            )}
          </div>
        )}

        {/* ── QUIZ ── */}
        {activeTab === 'quiz' && (
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <h3 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1rem', color:'#0F172A', margin:0 }}>🎯 Your Quiz Results</h3>
              {quizResult && (
                <button onClick={() => navigate('/quiz')} style={{ padding:'8px 18px', borderRadius:50, border:'none', background:'linear-gradient(135deg,#F97316,#F59E0B)', color:'#fff', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:'0.8rem', cursor:'pointer', boxShadow:'0 3px 12px rgba(249,115,22,0.25)' }}>
                  🔄 Retake Quiz
                </button>
              )}
            </div>
            {quizResult
              ? <QuizCard quizResult={quizResult} navigate={navigate} full />
              : <EmptyState emoji="🎯" title="You haven't taken the quiz yet" desc="Answer a few questions and we'll match you with the best career paths and colleges." to="/quiz" cta="Start Quiz →" />}
          </div>
        )}

        {/* ── COLLEGES ── */}
        {activeTab === 'colleges' && (
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <h3 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1rem', color:'#0F172A', margin:0 }}>🏫 Saved Colleges ({savedColleges.length})</h3>
              <Link to="/colleges" style={{ padding:'8px 18px', borderRadius:50, textDecoration:'none', background:'linear-gradient(135deg,#F97316,#F59E0B)', color:'#fff', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:'0.8rem', boxShadow:'0 3px 12px rgba(249,115,22,0.25)' }}>
                + Add More
              </Link>
            </div>
            {savedColleges.length > 0 ? (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
                {savedColleges.map(c => <CollegeCard key={c.id} college={c} onRemove={handleRemove} full />)}
              </div>
            ) : (
              <EmptyState emoji="🏫" title="Your shortlist is empty" desc={`Go to Find Colleges and tap 💛 Save to Dashboard — they'll be saved just for you, ${firstName}.`} to="/colleges" cta="Browse Colleges →" />
            )}
          </div>
        )}

        {/* ── ACTIVITY ── */}
        {activeTab === 'activity' && (
          <div>
            <h3 style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1rem', color:'#0F172A', marginBottom:16 }}>📣 Recent Activity</h3>
            {activityLog.length > 0 ? (
              <div style={{ background:'#fff', borderRadius:18, border:'1px solid #E8E0D5', overflow:'hidden' }}>
                {activityLog.map((item, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'16px 20px', borderBottom: i < activityLog.length-1 ? '1px solid #F1F5F9' : 'none' }}>
                    <div style={{ width:36, height:36, borderRadius:10, flexShrink:0, background:'rgba(249,115,22,0.08)', border:'1px solid rgba(249,115,22,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem' }}>
                      {item.emoji || '📎'}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:'0.88rem', color:'#0F172A' }}>{item.title}</div>
                      {item.desc && <div style={{ fontSize:'0.78rem', color:'#94A3B8', marginTop:2 }}>{item.desc}</div>}
                    </div>
                    <div style={{ fontSize:'0.72rem', color:'#CBD5E1', flexShrink:0 }}>{timeAgo(item.time)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background:'#fff', borderRadius:18, border:'1.5px dashed #E8E0D5', padding:'48px 24px', textAlign:'center' }}>
                <div style={{ fontSize:'2.5rem', marginBottom:12 }}>📣</div>
                <div style={{ fontFamily:'Sora,sans-serif', fontWeight:700, color:'#0F172A', marginBottom:8 }}>No activity yet</div>
                <div style={{ fontSize:'0.82rem', color:'#94A3B8' }}>Take a quiz or save a college to see your activity here.</div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}