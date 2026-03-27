import { useState } from 'react'


const CAREER_DATA = [
  {
    stream: 'Science',
    icon: '⚗️',
    color: '#3B82F6',
    bg: '#EFF6FF',
    degrees: [
      {
        name: 'B.Sc. Computer Science / IT',
        duration: '3 Years',
        careers: ['Software Developer', 'Data Analyst', 'Cybersecurity Analyst', 'App Developer'],
        exams: ['GATE CS', 'TCS, Infosys Campus'],
        salary: '₹4–18 LPA',
        scope: 'Very High',
      },
      {
        name: 'B.Sc. Physics / Maths',
        duration: '3 Years',
        careers: ['Defence Scientist', 'Actuarial Analyst', 'Teacher / Lecturer', 'UPSC'],
        exams: ['JAM', 'CSIR NET', 'GATE'],
        salary: '₹3–12 LPA',
        scope: 'High',
      },
      {
        name: 'B.Sc. Biology / Microbiology',
        duration: '3 Years',
        careers: ['Biotech Researcher', 'Pharmacist', 'Lab Technician', 'M.Sc. → PhD'],
        exams: ['NEET PG', 'DBT-JRF', 'ICMR JRF'],
        salary: '₹3–10 LPA',
        scope: 'High',
      },
    ],
  },
  {
    stream: 'Commerce',
    icon: '📊',
    color: '#10B981',
    bg: '#F0FDF4',
    degrees: [
      {
        name: 'B.Com / B.Com Honours',
        duration: '3 Years',
        careers: ['Chartered Accountant', 'Tax Consultant', 'Financial Analyst', 'Auditor'],
        exams: ['CA Foundation', 'CMA', 'CS Foundation'],
        salary: '₹5–25 LPA',
        scope: 'Very High',
      },
      {
        name: 'BBA (Bachelor of Business Admin)',
        duration: '3 Years',
        careers: ['Marketing Manager', 'HR Executive', 'Startup Founder', 'MBA Graduate'],
        exams: ['CAT', 'MAT', 'XAT', 'SNAP'],
        salary: '₹4–20 LPA',
        scope: 'Very High',
      },
      {
        name: 'BA Economics',
        duration: '3 Years',
        careers: ['Economist', 'Policy Analyst', 'RBI Grade B', 'Research Fellow'],
        exams: ['RBI Grade B', 'UPSC', 'DSE Entrance'],
        salary: '₹5–18 LPA',
        scope: 'High',
      },
    ],
  },
  {
    stream: 'Arts',
    icon: '🎭',
    color: '#F97316',
    bg: '#FFF7ED',
    degrees: [
      {
        name: 'B.A. Political Science / History',
        duration: '3 Years',
        careers: ['IAS / IPS Officer', 'Political Advisor', 'Researcher', 'Professor'],
        exams: ['UPSC CSE', 'State PSC', 'NET/JRF'],
        salary: '₹6–20 LPA',
        scope: 'Very High',
      },
      {
        name: 'B.A. English / Journalism',
        duration: '3 Years',
        careers: ['Journalist', 'Content Writer', 'Editor', 'PR Manager', 'Author'],
        exams: ['IIMC Entrance', 'ACJ', 'Symbiosis Mass Comm'],
        salary: '₹3–15 LPA',
        scope: 'High',
      },
      {
        name: 'B.A. Psychology',
        duration: '3 Years',
        careers: ['Counselor', 'HR Manager', 'Therapist (after M.Sc.)', 'Social Worker'],
        exams: ['DUET', 'BHU PET', 'NIMHANS'],
        salary: '₹4–14 LPA',
        scope: 'High',
      },
    ],
  },
  {
    stream: 'Vocational',
    icon: '🔧',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    degrees: [
      {
        name: 'B.Voc. IT / Software Development',
        duration: '3 Years',
        careers: ['Web Developer', 'IT Support', 'Systems Admin', 'Freelancer'],
        exams: ['AICTE Affiliated', 'NSQF Level 5/6'],
        salary: '₹3–12 LPA',
        scope: 'Very High',
      },
      {
        name: 'B.Voc. Tourism & Hospitality',
        duration: '3 Years',
        careers: ['Hotel Manager', 'Travel Agent', 'Airline Staff', 'Tourism Officer'],
        exams: ['IIHM eCHAT', 'State Tourism Board'],
        salary: '₹3–10 LPA',
        scope: 'High',
      },
      {
        name: 'B.Voc. Healthcare',
        duration: '3 Years',
        careers: ['Hospital Admin', 'Paramedic', 'Lab Assistant', 'Pharma Sales'],
        exams: ['NSQF Certification', 'AIIMS Paramedical'],
        salary: '₹3–9 LPA',
        scope: 'High',
      },
    ],
  },
]

const SCOPE_COLOR = { 'Very High': '#10B981', 'High': '#F59E0B' }

export default function CareerPaths() {
  const [activeStream, setActiveStream] = useState(0)
  const [activeDegree, setActiveDegree] = useState(null)

  const stream = CAREER_DATA[activeStream]

  return (
    <div style={{ paddingTop: 68, background: 'var(--cream)', minHeight: '100vh' }}>
      <div className="page-hero">
        <div className="container">
          <p className="section-label" style={{ color: '#FED7AA' }}>Visual Guide</p>
          <h1>Career Path Explorer</h1>
          <p>See exactly where each degree takes you — jobs, exams, salary, and more.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {/* Stream Tabs */}
        <div style={{
          display: 'flex', gap: 10, flexWrap: 'wrap',
          marginBottom: 40, padding: '6px',
          background: 'white',
          borderRadius: 16, border: '1px solid #E8E0D5',
          boxShadow: 'var(--shadow-sm)',
          width: 'fit-content',
        }}>
          {CAREER_DATA.map((s, i) => (
            <button key={s.stream} onClick={() => { setActiveStream(i); setActiveDegree(null) }} style={{
              padding: '10px 22px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Sora, sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.2s',
              background: activeStream === i ? s.color : 'transparent',
              color: activeStream === i ? 'white' : '#64748B',
            }}>
              <span>{s.icon}</span> {s.stream}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: activeDegree !== null ? '1fr 1.2fr' : '1fr', gap: 28 }}>
          {/* Degree List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {stream.degrees.map((deg, i) => (
              <div key={i} onClick={() => setActiveDegree(activeDegree === i ? null : i)}
                className="card"
                style={{
                  cursor: 'pointer',
                  borderColor: activeDegree === i ? stream.color : '#E8E0D5',
                  background: activeDegree === i ? stream.bg : 'white',
                  transition: 'all 0.25s',
                  padding: '22px 24px',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: 'Sora, sans-serif', fontWeight: 700,
                      fontSize: '1rem', color: activeDegree === i ? stream.color : '#1E293B',
                      marginBottom: 6,
                    }}>{deg.name}</div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.78rem', color: '#94A3B8',
                        fontFamily: 'DM Sans, sans-serif',
                      }}>⏱ {deg.duration}</span>
                      <span style={{
                        fontSize: '0.78rem', color: '#94A3B8',
                        fontFamily: 'DM Sans, sans-serif',
                      }}>💰 {deg.salary}</span>
                      <span style={{
                        fontSize: '0.72rem', fontWeight: 700, fontFamily: 'Sora, sans-serif',
                        color: SCOPE_COLOR[deg.scope],
                        background: `${SCOPE_COLOR[deg.scope]}18`,
                        padding: '2px 10px', borderRadius: 50,
                      }}>📈 {deg.scope} Scope</span>
                    </div>
                  </div>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: activeDegree === i ? stream.color : '#F8F4EF',
                    color: activeDegree === i ? 'white' : '#94A3B8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem', flexShrink: 0, marginLeft: 12,
                    transition: 'all 0.2s',
                    transform: activeDegree === i ? 'rotate(180deg)' : 'none',
                  }}>▼</span>
                </div>

                {activeDegree === i && (
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${stream.color}33` }}>
                    <div style={{ marginBottom: 14 }}>
                      <p style={{ fontSize: '0.78rem', fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Career Options</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {deg.careers.map(c => (
                          <span key={c} style={{
                            padding: '4px 12px', borderRadius: 50,
                            background: stream.bg, color: stream.color,
                            fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '0.78rem',
                          }}>{c}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.78rem', fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Key Entrance Exams</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {deg.exams.map(e => (
                          <span key={e} className="tag">{e}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Comparison / Info Panel */}
          {activeDegree === null && (
            <div>
              <div className="card" style={{ background: stream.bg, borderColor: `${stream.color}33` }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>{stream.icon}</div>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', color: stream.color, fontSize: '1.5rem', marginBottom: 12 }}>
                  {stream.stream} Stream
                </h3>
                <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: 20, fontSize: '0.92rem' }}>
                  Click on any degree card on the left to see the full career map — including jobs, salary, and entrance exams.
                </p>
                <div style={{ padding: '14px 18px', borderRadius: 12, background: 'white', border: `1px solid ${stream.color}22` }}>
                  <p style={{ fontSize: '0.78rem', fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Quick Stats</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                      { label: 'Degrees Listed', value: stream.degrees.length },
                      { label: 'Avg. Start Salary', value: '₹4–8 LPA' },
                      { label: 'Top Exam', value: stream.degrees[0].exams[0] },
                      { label: 'Best For', value: stream.icon + ' ' + stream.stream },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, color: stream.color, fontSize: '1.1rem' }}>{s.value}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: 2 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Roadmap visual */}
              <div className="card" style={{ marginTop: 20 }}>
                <h4 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>
                  🗺️ Typical Journey
                </h4>
                {['Class 12 Pass', '3-Year Degree', 'Entrance Exams', 'Job / Higher Study'].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: i < 3 ? 4 : 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: stream.color, color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.8rem',
                      }}>{i + 1}</div>
                      {i < 3 && <div style={{ width: 2, height: 20, background: `${stream.color}33` }} />}
                    </div>
                    <div style={{
                      fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem',
                      color: '#334155', paddingBottom: i < 3 ? 16 : 0,
                    }}>{step}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
