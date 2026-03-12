  import { useState, useEffect, useCallback } from 'react'
  import { Link, useNavigate } from 'react-router-dom'
  import { useAuth } from '../context/AuthContext'
import { removeCollege, getQuizResult, getSavedColleges, getActivityLog } from '../utils/Dashboardhelpers'
  const timeAgo = (iso) => {
    if (!iso) return ''
    const s = Math.floor((Date.now() - new Date(iso)) / 1000)
    if (s < 60)    return 'just now'
    if (s < 3600)  return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  function StatCard({ emoji, label, value, sub, accent }) {Remove-Item .nvmrc -Force
    return (
      <div style={{
        background: accent ? 'linear-gradient(135deg,#F97316,#F59E0B)' : '#fff',
        borderRadius: 18, padding: '22px 24px',
        border: accent ? 'none' : '1px solid #E8E0D5',
        boxShadow: accent ? '0 8px 28px rgba(249,115,22,0.28)' : '0 2px 12px rgba(15,23,42,0.06)',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        <span style={{ fontSize: '1.6rem' }}>{emoji}</span>
        <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: '1.6rem', color: accent ? '#fff' : '#0F172A' }}>{value}</div>
        <div style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '0.82rem', color: accent ? 'rgba(255,255,255,0.85)' : '#64748B' }}>{label}</div>
        {sub && <div style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '0.72rem', color: accent ? 'rgba(255,255,255,0.65)' : '#94A3B8' }}>{sub}</div>}
      </div>
    )
  }

  function EmptyState({ emoji, title, desc, to, cta }) {
    return (
      <div style={{ background: '#fff', borderRadius: 18, border: '1.5px dashed #E8E0D5', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '2.2rem', marginBottom: 10 }}>{emoji}</div>
        <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#0F172A', marginBottom: 6 }}>{title}</div>
        <div style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '0.82rem', color: '#94A3B8', marginBottom: 18, lineHeight: 1.6, maxWidth: 340, margin: '0 auto 18px' }}>{desc}</div>
        <Link to={to} style={{ display: 'inline-block', padding: '10px 22px', borderRadius: 50, background: 'linear-gradient(135deg,#F97316,#F59E0B)', color: '#fff', fontFamily: 'DM Sans,sans-serif', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(249,115,22,0.3)' }}>
          {cta}
        </Link>
      </div>
    )
  }

  export default function Dashboard() {
    const { user }      = useAuth()
    const navigate      = useNavigate()
    const [activeTab, setActiveTab] = useState('overview')

    // ── Read data scoped to the logged-in user ────────────────────────────────
    const readData = useCallback(() => ({
      quizResult:    getQuizResult(),
      savedColleges: getSavedColleges(),
      activityLog:   getActivityLog(),
    }), [])

    const [data, setData] = useState(readData)

    useEffect(() => {
      // Re-read when helpers fire the storage event or when tab regains focus
      const refresh = () => setData(readData())
      window.addEventListener('pathfinder:storage', refresh)
      window.addEventListener('focus', refresh)
      return () => {
        window.removeEventListener('pathfinder:storage', refresh)
        window.removeEventListener('focus', refresh)
      }
    }, [readData])

    const { quizResult, savedColleges, activityLog } = data

    const handleRemove = (id) => {
      removeCollege(id)
      setData(readData())
    }

    const initials  = user?.name
      ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
      : user?.username?.slice(0, 2).toUpperCase() || '??'
    const firstName = (user?.name || user?.username || 'Student').split(' ')[0]

    const tabs = [
      { id: 'overview',  label: 'Overview',       emoji: '📊' },
      { id: 'quiz',      label: 'Quiz Results',   emoji: '🧠' },
      { id: 'colleges',  label: 'Saved Colleges', emoji: '🏛️', count: savedColleges.length },
      { id: 'activity',  label: 'Activity',       emoji: '📜' },
    ]

    return (
      <div style={{ minHeight: '100vh', background: '#FFFBF5', fontFamily: 'DM Sans,sans-serif', paddingTop: 88 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px 60px' }}>

          {/* Profile banner */}
          <div style={{ background: 'linear-gradient(135deg,#FFF4ED,#FFFBF5)', border: '1px solid #E8E0D5', borderRadius: 24, padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, flexShrink: 0, background: 'linear-gradient(135deg,#F97316,#F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 22, color: '#fff', boxShadow: '0 8px 24px rgba(249,115,22,0.3)' }}>{initials}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#0F172A' }}>Welcome back, {firstName}! 👋</div>
              <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: 4 }}>
                {user?.email}
                {user?.stream && <span style={{ marginLeft: 10, background: 'rgba(249,115,22,0.1)', color: '#F97316', padding: '2px 10px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(249,115,22,0.2)' }}>{user.stream}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/quiz')} style={{ padding: '9px 18px', borderRadius: 50, cursor: 'pointer', background: 'linear-gradient(135deg,#F97316,#F59E0B)', border: 'none', color: '#fff', fontFamily: 'DM Sans,sans-serif', fontWeight: 700, fontSize: '0.82rem', boxShadow: '0 4px 14px rgba(249,115,22,0.3)' }}>
                🧠 {quizResult ? 'Retake Quiz' : 'Take Quiz'}
              </button>
              <button onClick={() => navigate('/colleges')} style={{ padding: '9px 18px', borderRadius: 50, cursor: 'pointer', background: '#fff', border: '1.5px solid #E8E0D5', color: '#334155', fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '0.82rem' }}>
                🏛️ Find Colleges
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '9px 18px', borderRadius: 50, cursor: 'pointer', flexShrink: 0, background: activeTab === t.id ? 'linear-gradient(135deg,#F97316,#F59E0B)' : '#fff', border: activeTab === t.id ? 'none' : '1.5px solid #E8E0D5', color: activeTab === t.id ? '#fff' : '#64748B', fontFamily: 'DM Sans,sans-serif', fontWeight: 700, fontSize: '0.82rem', boxShadow: activeTab === t.id ? '0 4px 14px rgba(249,115,22,0.25)' : 'none', transition: 'all 0.2s' }}>
                {t.emoji} {t.label}{t.count > 0 ? ` (${t.count})` : ''}
              </button>
            ))}
          </div>

          {/* ── OVERVIEW ── */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 16, marginBottom: 28 }}>
                <StatCard emoji="🧠" label="Quiz Status"    value={quizResult ? 'Done ✓' : 'Pending'}  sub={quizResult ? `Top: ${quizResult.topCareer}` : 'Take the career quiz'} accent={!!quizResult} />
                <StatCard emoji="🏛️" label="Saved Colleges" value={savedColleges.length}                sub={savedColleges.length ? `Latest: ${savedColleges[0]?.name}` : 'No colleges saved yet'} />
                <StatCard emoji="📜" label="Activities"     value={activityLog.length}                  sub={activityLog.length ? timeAgo(activityLog[0]?.time) : 'No activity yet'} />
                <StatCard emoji="🎯" label="Stream"         value={user?.stream || '—'}                 sub="Your selected stream" />
              </div>

              <h3 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#0F172A', marginBottom: 14 }}>🧠 Quiz Results</h3>
              {quizResult
                ? <QuizCard quizResult={quizResult} navigate={navigate} />
                : <EmptyState emoji="🧠" title="No quiz taken yet" desc="Take the career quiz to discover your best career matches and get personalised college suggestions." to="/quiz" cta="Take the Quiz →" />}

              <h3 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#0F172A', margin: '28px 0 14px' }}>🏛️ Saved Colleges</h3>
              {savedColleges.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
                  {savedColleges.slice(0, 3).map(c => <CollegeCard key={c.id} college={c} onRemove={handleRemove} />)}
                  {savedColleges.length > 3 && (
                    <button onClick={() => setActiveTab('colleges')} style={{ borderRadius: 18, border: '1.5px dashed #E8E0D5', background: 'transparent', color: '#F97316', fontFamily: 'DM Sans,sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', padding: '24px' }}>
                      +{savedColleges.length - 3} more →
                    </button>
                  )}
                </div>
              ) : (
                <EmptyState emoji="🏛️" title="No colleges saved yet" desc={`Browse colleges and tap 💾 Save to Dashboard — they'll show up here just for you, ${firstName}.`} to="/colleges" cta="Browse Colleges →" />
              )}
            </div>
          )}

          {/* ── QUIZ ── */}
          {activeTab === 'quiz' && (
            <div>
              <h3 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#0F172A', marginBottom: 16 }}>🧠 Your Quiz Results</h3>
              {quizResult
                ? <QuizCard quizResult={quizResult} navigate={navigate} full />
                : <EmptyState emoji="🧠" title="You haven't taken the quiz yet" desc="Answer a few questions and we'll match you with the best career paths and colleges." to="/quiz" cta="Start Quiz →" />}
            </div>
          )}

          {/* ── COLLEGES ── */}
          {activeTab === 'colleges' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#0F172A', margin: 0 }}>🏛️ Saved Colleges ({savedColleges.length})</h3>
                <Link to="/colleges" style={{ padding: '8px 18px', borderRadius: 50, textDecoration: 'none', background: 'linear-gradient(135deg,#F97316,#F59E0B)', color: '#fff', fontFamily: 'DM Sans,sans-serif', fontWeight: 700, fontSize: '0.8rem', boxShadow: '0 3px 12px rgba(249,115,22,0.25)' }}>+ Add More</Link>
              </div>
              {savedColleges.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
                  {savedColleges.map(c => <CollegeCard key={c.id} college={c} onRemove={handleRemove} full />)}
                </div>
              ) : (
                <EmptyState emoji="🏛️" title="Your shortlist is empty" desc={`Go to Find Colleges and tap 💾 Save to Dashboard — they'll be saved just for you, ${firstName}.`} to="/colleges" cta="Browse Colleges →" />
              )}
            </div>
          )}

          {/* ── ACTIVITY ── */}
          {activeTab === 'activity' && (
            <div>
              <h3 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#0F172A', marginBottom: 16 }}>📜 Recent Activity</h3>
              {activityLog.length > 0 ? (
                <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #E8E0D5', overflow: 'hidden' }}>
                  {activityLog.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 20px', borderBottom: i < activityLog.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>{item.emoji || '📌'}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0F172A' }}>{item.title}</div>
                        {item.desc && <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: 2 }}>{item.desc}</div>}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#CBD5E1', flexShrink: 0 }}>{timeAgo(item.time)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: '#fff', borderRadius: 18, border: '1.5px dashed #E8E0D5', padding: '48px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📜</div>
                  <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>No activity yet</div>
                  <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Take a quiz or save a college to see your activity here.</div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    )
  }

  function QuizCard({ quizResult, navigate, full }) {
    const pct = quizResult.matchScore
    return (
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8E0D5', padding: '24px', boxShadow: '0 2px 12px rgba(15,23,42,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Top Career Match</div>
            <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#0F172A' }}>{quizResult.topCareer}</div>
            {quizResult.fieldTitle && <div style={{ fontSize: '0.8rem', color: '#F97316', fontWeight: 600, marginTop: 4 }}>Field: {quizResult.fieldTitle}</div>}
            {quizResult.description && <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: 6, maxWidth: 420, lineHeight: 1.5 }}>{quizResult.description}</div>}
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: 6 }}>Taken {quizResult.takenAt ? new Date(quizResult.takenAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'recently'}</div>
          </div>
          {pct && (
            <div style={{ background: 'linear-gradient(135deg,#F97316,#F59E0B)', borderRadius: 14, padding: '14px 20px', textAlign: 'center', minWidth: 80, boxShadow: '0 4px 16px rgba(249,115,22,0.28)' }}>
              <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#fff' }}>{pct}%</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Match</div>
            </div>
          )}
        </div>

        {quizResult.scores && Object.keys(quizResult.scores).length > 0 && (
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(quizResult.scores).slice(0, full ? 99 : 4).map(([field, score]) => (
              <div key={field}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>{field}</span>
                  <span style={{ fontSize: '0.78rem', color: '#F97316', fontWeight: 700 }}>{score}%</span>
                </div>
                <div style={{ height: 6, background: '#F1F5F9', borderRadius: 50 }}>
                  <div style={{ height: '100%', borderRadius: 50, width: `${score}%`, background: 'linear-gradient(90deg,#F97316,#F59E0B)' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {full && quizResult.allCareers?.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#0F172A', marginBottom: 12 }}>All Recommended Careers</div>
            {quizResult.allCareers.map((career, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', background: i === 0 ? 'rgba(249,115,22,0.06)' : '#F8FAFC', borderRadius: 12, border: i === 0 ? '1px solid rgba(249,115,22,0.2)' : '1px solid #F1F5F9', marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A' }}>{i === 0 ? '🥇 ' : i === 1 ? '🥈 ' : i === 2 ? '🥉 ' : ''}{career.name}</div>
                  {career.salary && <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{career.salary}</div>}
                </div>
                <span style={{ background: i === 0 ? 'linear-gradient(135deg,#F97316,#F59E0B)' : '#E2E8F0', color: i === 0 ? '#fff' : '#64748B', padding: '3px 12px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700 }}>{career.match}%</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
          <Link to="/careers" style={{ padding: '9px 20px', borderRadius: 50, textDecoration: 'none', background: 'linear-gradient(135deg,#F97316,#F59E0B)', color: '#fff', fontFamily: 'DM Sans,sans-serif', fontWeight: 700, fontSize: '0.82rem', boxShadow: '0 4px 14px rgba(249,115,22,0.3)' }}>View Career Map →</Link>
          <button onClick={() => navigate('/quiz')} style={{ padding: '9px 20px', borderRadius: 50, cursor: 'pointer', background: 'transparent', border: '1.5px solid #E8E0D5', color: '#64748B', fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '0.82rem' }}>Retake Quiz</button>
        </div>
      </div>
    )
  }

  function CollegeCard({ college, onRemove, full }) {
    return (
      <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #E8E0D5', padding: '18px 20px', boxShadow: '0 2px 10px rgba(15,23,42,0.05)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(135deg,#FFF4ED,#FED7AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', border: '1px solid #FED7AA' }}>🏛️</div>
          <button onClick={() => onRemove(college.id)} style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 8, color: '#EF4444', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', fontFamily: 'DM Sans,sans-serif' }}>Remove</button>
        </div>
        <div>
          <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: '0.92rem', color: '#0F172A', lineHeight: 1.3 }}>{college.name}</div>
          {college.location && <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: 3 }}>📍 {college.location}</div>}
        </div>
        {full && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {college.type   && <Tag>{college.type}</Tag>}
            {college.isGovt && <Tag>🏛️ Govt</Tag>}
          </div>
        )}
        <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>Saved {timeAgo(college.savedAt) || 'recently'}</div>
      </div>
    )
  }

  function Tag({ children }) {
    return <span style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 6, padding: '3px 9px', fontSize: '0.72rem', fontWeight: 600, color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>{children}</span>
  }