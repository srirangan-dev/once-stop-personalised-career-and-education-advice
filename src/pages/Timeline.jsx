import { useState } from 'react'

const EVENTS = [
  {
    id: 1,
    title: 'DU Undergraduate Admissions Open',
    type: 'Admission',
    date: '2025-06-01',
    deadline: '2025-06-30',
    daysLeft: 45,
    status: 'upcoming',
    description: 'Delhi University CSAS portal opens for B.A., B.Sc., B.Com UG admissions.',
    streams: ['Arts', 'Science', 'Commerce'],
    link: '#',
    priority: 'high',
  },
  {
    id: 2,
    title: 'NSP Scholarship Application Window',
    type: 'Scholarship',
    date: '2025-07-01',
    deadline: '2025-09-30',
    daysLeft: 100,
    status: 'upcoming',
    description: 'National Scholarship Portal — apply for PM Scholarship, Merit-cum-Means, and state scholarships.',
    streams: ['All'],
    link: '#',
    priority: 'high',
  },
  {
    id: 3,
    title: 'CUET UG Result Declared',
    type: 'Exam Result',
    date: '2025-05-20',
    deadline: null,
    daysLeft: -5,
    status: 'past',
    description: 'CUET UG 2025 results have been announced. Check your score card.',
    streams: ['All'],
    link: '#',
    priority: 'medium',
  },
  {
    id: 4,
    title: 'Maharashtra CET Counselling Begins',
    type: 'Counselling',
    date: '2025-06-15',
    deadline: '2025-07-15',
    daysLeft: 20,
    status: 'upcoming',
    description: 'Maharashtra State CET Cell starts UG counselling for B.Sc., B.Com., B.A. in government colleges.',
    streams: ['Science', 'Commerce', 'Arts'],
    link: '#',
    priority: 'high',
  },
  {
    id: 5,
    title: 'Rajasthan Govt College Admission Last Date',
    type: 'Admission',
    date: '2025-07-20',
    deadline: '2025-07-20',
    daysLeft: 55,
    status: 'upcoming',
    description: 'Last date for online application to Rajasthan government degree colleges through SSO portal.',
    streams: ['All'],
    link: '#',
    priority: 'medium',
  },
  {
    id: 6,
    title: 'NEET UG Counselling Round 1',
    type: 'Counselling',
    date: '2025-08-01',
    deadline: '2025-08-15',
    daysLeft: 67,
    status: 'upcoming',
    description: 'MCC announces NEET UG 2025 counselling for MBBS/BDS admission in government medical colleges.',
    streams: ['Science'],
    link: '#',
    priority: 'high',
  },
  {
    id: 7,
    title: 'Post-Matric SC/ST Scholarship Deadline',
    type: 'Scholarship',
    date: '2025-10-31',
    deadline: '2025-10-31',
    daysLeft: 158,
    status: 'upcoming',
    description: 'Apply for Post-Matric Scholarship for SC/ST students enrolled in government colleges.',
    streams: ['All'],
    link: '#',
    priority: 'medium',
  },
  {
    id: 8,
    title: 'CUET UG 2025 Registration Opens',
    type: 'Exam',
    date: '2025-02-15',
    deadline: '2025-03-31',
    daysLeft: -60,
    status: 'past',
    description: 'CUET UG 2025 registration closed. Results expected in May 2025.',
    streams: ['All'],
    link: '#',
    priority: 'low',
  },
]

const TYPE_COLORS = {
  'Admission': { color: '#F97316', bg: '#FFF7ED' },
  'Scholarship': { color: '#10B981', bg: '#F0FDF4' },
  'Exam Result': { color: '#3B82F6', bg: '#EFF6FF' },
  'Counselling': { color: '#8B5CF6', bg: '#F5F3FF' },
  'Exam': { color: '#F59E0B', bg: '#FEF3C7' },
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function Timeline() {
  const [filter, setFilter] = useState('All')
  const [streamFilter, setStreamFilter] = useState('All')
  const [view, setView] = useState('list')

  const filtered = EVENTS.filter(e =>
    (filter === 'All' || e.type === filter) &&
    (streamFilter === 'All' || e.streams.includes(streamFilter) || e.streams.includes('All'))
  )

  const upcoming = filtered.filter(e => e.status === 'upcoming')
    .sort((a, b) => a.daysLeft - b.daysLeft)
  const past = filtered.filter(e => e.status === 'past')

  return (
    <div style={{ paddingTop: 68, background: 'var(--cream)', minHeight: '100vh' }}>
      <div className="page-hero">
        <div className="container">
          <p className="section-label" style={{ color: '#FED7AA' }}>Never Miss a Date</p>
          <h1>Admission & Scholarship Timeline</h1>
          <p>Stay on top of every important date — admissions, counselling, and scholarship windows.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Urgent Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #FEF3C7, #FFF7ED)',
          border: '1.5px solid #FCD34D',
          borderRadius: 16, padding: '18px 22px',
          display: 'flex', gap: 14, alignItems: 'center',
          marginBottom: 32,
        }}>
          <span style={{ fontSize: '1.5rem' }}>⚡</span>
          <div>
            <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#92400E', marginBottom: 4 }}>
              Upcoming This Month
            </p>
            <p style={{ fontSize: '0.88rem', color: '#B45309' }}>
              Maharashtra CET Counselling starts in 20 days. DU Admissions open in 45 days.
            </p>
          </div>
          <button className="btn" style={{
            marginLeft: 'auto', background: '#F59E0B', color: 'white', fontSize: '0.82rem',
            padding: '8px 18px', whiteSpace: 'nowrap',
          }}>Set Reminder</button>
        </div>

        {/* Filters */}
        <div style={{
          background: 'white', border: '1px solid #E8E0D5',
          borderRadius: 16, padding: '16px 20px',
          marginBottom: 32, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', gap: 8, flex: 1, flexWrap: 'wrap' }}>
            {['All', 'Admission', 'Scholarship', 'Exam', 'Counselling'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '7px 16px', borderRadius: 50,
                border: filter === f ? 'none' : '1.5px solid #E8E0D5',
                background: filter === f ? '#0F172A' : 'transparent',
                color: filter === f ? 'white' : '#64748B',
                fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '0.8rem',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>{f}</button>
            ))}
          </div>
          <select value={streamFilter} onChange={e => setStreamFilter(e.target.value)} className="form-select" style={{ minWidth: 140 }}>
            <option value="All">All Streams</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
            <option value="Vocational">Vocational</option>
          </select>
        </div>

        {/* Upcoming Events */}
        <div style={{ marginBottom: 48 }}>
          <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.6rem', color: '#1E293B', marginBottom: 20 }}>
            Upcoming Dates ({upcoming.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {upcoming.map((event) => {
              const tc = TYPE_COLORS[event.type] || { color: '#64748B', bg: '#F8FAFC' }
              const isUrgent = event.daysLeft <= 30
              return (
                <div key={event.id} className="card" style={{
                  padding: '22px 24px',
                  borderLeft: `4px solid ${tc.color}`,
                  display: 'flex', gap: 18, alignItems: 'flex-start',
                  flexWrap: 'wrap',
                }}>
                  {/* Date block */}
                  <div style={{
                    width: 60, textAlign: 'center',
                    background: tc.bg, borderRadius: 12,
                    padding: '10px 8px', flexShrink: 0,
                    border: `1px solid ${tc.color}22`,
                  }}>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'Sora, sans-serif', fontWeight: 700, color: tc.color, textTransform: 'uppercase' }}>
                      {MONTHS[new Date(event.date).getMonth()]}
                    </div>
                    <div style={{ fontSize: '1.5rem', fontFamily: 'Sora, sans-serif', fontWeight: 800, color: tc.color, lineHeight: 1 }}>
                      {new Date(event.date).getDate()}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 6, alignItems: 'center' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 50,
                        background: tc.bg, color: tc.color,
                        fontSize: '0.72rem', fontFamily: 'Sora, sans-serif', fontWeight: 700,
                      }}>{event.type}</span>
                      {isUrgent && (
                        <span style={{
                          padding: '3px 10px', borderRadius: 50,
                          background: '#FEE2E2', color: '#DC2626',
                          fontSize: '0.72rem', fontFamily: 'Sora, sans-serif', fontWeight: 700,
                          animation: 'pulse-glow 2s infinite',
                        }}>🔴 Urgent</span>
                      )}
                      {event.streams.map(s => s !== 'All' && (
                        <span key={s} className="tag" style={{ fontSize: '0.72rem' }}>{s}</span>
                      ))}
                    </div>
                    <h4 style={{
                      fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.98rem',
                      color: '#1E293B', marginBottom: 6,
                    }}>{event.title}</h4>
                    <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: 1.6 }}>{event.description}</p>
                  </div>

                  {/* Days left */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{
                      fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.5rem',
                      color: isUrgent ? '#DC2626' : '#F97316',
                    }}>{event.daysLeft}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}>days left</div>
                    <button className="btn btn-ghost" style={{ fontSize: '0.78rem', padding: '6px 14px', marginTop: 8 }}>
                      🔔 Remind me
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Past Events */}
        {past.length > 0 && (
          <div>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.4rem', color: '#94A3B8', marginBottom: 16 }}>
              Past Events ({past.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {past.map(event => {
                const tc = TYPE_COLORS[event.type] || { color: '#64748B', bg: '#F8FAFC' }
                return (
                  <div key={event.id} style={{
                    background: '#F8F9FA', border: '1px solid #E8E0D5',
                    borderRadius: 14, padding: '16px 20px',
                    display: 'flex', gap: 14, alignItems: 'center',
                    opacity: 0.65,
                  }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 50, fontSize: '0.72rem',
                      fontFamily: 'Sora, sans-serif', fontWeight: 700,
                      background: '#E2E8F0', color: '#64748B',
                    }}>Closed</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#64748B' }}>{event.title}</p>
                      <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Ended {Math.abs(event.daysLeft)} days ago</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Notification Signup */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A, #1a2f4a)',
          borderRadius: 22, padding: '40px', marginTop: 48,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🔔</div>
          <h3 style={{ fontFamily: 'DM Serif Display, serif', color: 'white', fontSize: '1.6rem', marginBottom: 12 }}>
            Never Miss a Deadline
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 28, maxWidth: 440, margin: '0 auto 28px' }}>
            Get WhatsApp and SMS reminders for admissions, scholarships, and important exam dates.
          </p>
          <div style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto', flexWrap: 'wrap' }}>
            <input
              type="tel"
              placeholder="Enter your WhatsApp number"
              className="form-input"
              style={{ flex: 1, minWidth: 220, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', color: 'white' }}
            />
            <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Subscribe Free
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}