import { Link } from 'react-router-dom'

const FEATURES = [
  {
    icon: '🧠',
    title: 'Aptitude Quiz',
    desc: 'Discover your strengths and interests with our 15-minute quiz. Get personalized stream and career suggestions.',
    link: '/quiz',
    color: '#FFF7ED',
    accent: '#F97316',
  },
  
  {
    icon: '🗺️',
    title: 'Career Path Map',
    desc: 'Visualize exactly what degree you need and where it leads — jobs, exams, higher studies, and salaries.',
    link: '/careers',
    color: '#F0FDF4',
    accent: '#10B981',
  },
  {
    icon: '🏛️',
    title: 'College Directory',
    desc: 'Find government colleges near you. Filter by course, seats, facilities, and admission cutoffs.',
    link: '/colleges',
    color: '#EFF6FF',
    accent: '#3B82F6',
  },
  {
    icon: '📅',
    title: 'Admission Timeline',
    desc: 'Never miss a deadline. Get reminders for admissions, scholarships, and counseling dates.',
    link: '/timeline',
    color: '#FFF7ED',
    accent: '#F59E0B',
  },
]


const STREAMS = [
  {
    name: 'Science',
    icon: '⚗️',
    options: ['B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Maths', 'B.Sc. Biology', 'B.Sc. IT'],
    careers: ['Engineering', 'Medicine', 'Research', 'Data Science'],
    color: '#3B82F6',
    bg: '#EFF6FF',
  },
  {
    name: 'Commerce',
    icon: '📊',
    options: ['B.Com', 'BBA', 'B.Com Honours', 'Economics', 'Statistics'],
    careers: ['Banking', 'CA/CS', 'MBA', 'Finance', 'Entrepreneurship'],
    color: '#10B981',
    bg: '#F0FDF4',
  },
  {
    name: 'Arts',
    icon: '🎭',
    options: ['B.A. History', 'B.A. Political Sci.', 'B.A. Psychology', 'B.A. English', 'B.A. Sociology'],
    careers: ['Civil Services', 'Law', 'Journalism', 'Social Work', 'Teaching'],
    color: '#F97316',
    bg: '#FFF7ED',
  },
  {
    name: 'Vocational',
    icon: '🔧',
    options: ['B.Voc. Tourism', 'B.Voc. IT', 'B.Voc. Healthcare', 'B.Voc. Retail', 'NSQF Courses'],
    careers: ['Industry Jobs', 'Self-Employment', 'Skill Sector', 'Export'],
    color: '#8B5CF6',
    bg: '#F5F3FF',
  },
]

const STATS = [
  { value: '12,000+', label: 'Students Guided' },
  { value: '340+', label: 'Govt. Colleges Listed' },
  { value: '200+', label: 'Career Paths Mapped' },
  { value: '95%', label: 'Satisfaction Rate' },
]

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    class: 'Class 12, Rajasthan',
    text: 'I had no idea Commerce could lead to so many careers. PathFinder showed me the complete roadmap to become a CA. Now I\'m enrolled in B.Com at a government college!',
    stream: 'Commerce',
    initials: 'PS',
  },
  {
    name: 'Rahul Kumar',
    class: 'Class 12, Bihar',
    text: 'My parents wanted me to get a job quickly. The quiz result helped me show them how B.Sc. IT can lead to better salary than any ITI course. We made the right choice.',
    stream: 'Science',
    initials: 'RK',
  },
  {
    name: 'Anjali Patel',
    class: 'Class 12, Gujarat',
    text: 'Finding government colleges near my village was impossible before. PathFinder listed 4 colleges within 20 km with hostel facilities. I am attending one now.',
    stream: 'Arts',
    initials: 'AP',
  },
]

export default function Home() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #1a2f4a 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 68,
      }}>
        {/* Decorative orbs */}
        <div style={{
          position: 'absolute', top: '10%', right: '8%',
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '5%',
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '40%',
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
        }} />

        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}
                 className="fade-up">
              <span className="dot-live" />
              <span style={{
                fontFamily: 'Sora, sans-serif', fontSize: '0.8rem', fontWeight: 600,
                color: '#FED7AA', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>Free • For All Students • In Your Language</span>
            </div>

            <h1 style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              color: 'white', lineHeight: 1.15,
              marginBottom: 24,
            }} className="fade-up delay-1">
              Your Future Starts with the{' '}
              <em style={{ color: '#F97316', fontStyle: 'italic' }}>Right Choice</em>
            </h1>

            <p style={{
              fontSize: '1.15rem', color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.7, marginBottom: 36, maxWidth: 540,
            }} className="fade-up delay-2">
              Confused about which stream or college to choose after Class 10/12?
              PathFinder guides you to the best career path — personalised, free, and in your language.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }} className="fade-up delay-3">
              <Link to="/quiz" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                🧠 Take Free Quiz
              </Link>
              <Link to="/careers" className="btn" style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'white', border: '1.5px solid rgba(255,255,255,0.2)',
                fontSize: '1rem', padding: '14px 28px',
                backdropFilter: 'blur(10px)',
              }}>
                Explore Careers →
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 20, marginTop: 40, flexWrap: 'wrap' }} className="fade-up delay-4">
              {['✅ No Registration Needed', '🌐 10+ Regional Languages', '📴 Works Offline'].map(t => (
                <span key={t} style={{
                  fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)',
                  fontFamily: 'DM Sans, sans-serif',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Floating cards on right */}
        <div style={{
          position: 'absolute', right: '4%', top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 14,
        }} className="fade-in delay-4 hide-mobile">
          {[
            { emoji: '🎓', text: 'B.Sc. → IIT/NIT', sub: 'Science stream' },
            { emoji: '⚖️', text: 'B.A. → UPSC', sub: 'Arts stream' },
            { emoji: '💹', text: 'B.Com → CA', sub: 'Commerce stream' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 14, padding: '14px 20px',
              display: 'flex', alignItems: 'center', gap: 12,
              animation: `float ${2.5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}>
              <span style={{ fontSize: '1.4rem' }}>{card.emoji}</span>
              <div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, color: 'white', fontSize: '0.88rem' }}>{card.text}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{card.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <style>{`.hide-mobile { @media (max-width: 900px) { display: none; } }`}</style>
      </section>

      {/* ===== STATS BAR ===== */}
      <section style={{ background: '#F97316', padding: '40px 24px' }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 24, textAlign: 'center',
        }}>
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 800,
                fontSize: '2rem', color: 'white', lineHeight: 1,
              }}>{value}</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>Everything You Need</p>
            <h2 className="section-heading" style={{ margin: '0 auto 16px', maxWidth: 520, textAlign: 'center' }}>
              One platform, every answer
            </h2>
            <p className="section-sub" style={{ margin: '0 auto', textAlign: 'center' }}>
              From choosing subjects to finding a college and tracking deadlines — PathFinder has it all.
            </p>
          </div>

          <div className="grid-4">
            {FEATURES.map((f, i) => (
              <Link key={f.title} to={f.link} style={{ textDecoration: 'none' }}>
                <div className="card" style={{
                  animationDelay: `${i * 0.1}s`,
                  cursor: 'pointer', height: '100%',
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: f.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.6rem', marginBottom: 18,
                    border: `1px solid ${f.accent}22`,
                  }}>{f.icon}</div>
                  <h4 style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 700,
                    fontSize: '1rem', marginBottom: 10, color: '#1E293B',
                  }}>{f.title}</h4>
                  <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.65 }}>{f.desc}</p>
                  <div style={{
                    marginTop: 18, fontSize: '0.84rem', fontWeight: 600,
                    color: f.accent, fontFamily: 'Sora, sans-serif',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>Explore →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STREAMS SECTION ===== */}
      <section className="section" style={{ background: '#F8F4EF' }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <p className="section-label">Explore Streams</p>
            <h2 className="section-heading">Which path calls you?</h2>
            <p className="section-sub">Browse all four major academic streams and discover where each can take you.</p>
          </div>

          <div className="grid-2">
            {STREAMS.map((stream, i) => (
              <div key={stream.name} className="card" style={{ animationDelay: `${i*0.1}s` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 13,
                    background: stream.bg, fontSize: '1.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1.5px solid ${stream.color}33`,
                  }}>{stream.icon}</div>
                  <div>
                    <h4 style={{
                      fontFamily: 'Sora, sans-serif', fontWeight: 700,
                      fontSize: '1.1rem', color: stream.color,
                    }}>{stream.name} Stream</h4>
                    <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{stream.options.length} degree options</span>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: '0.78rem', fontFamily: 'Sora, sans-serif', fontWeight: 600, color: '#94A3B8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Courses</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {stream.options.map(o => (
                      <span key={o} className="tag" style={{ fontSize: '0.78rem' }}>{o}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: '0.78rem', fontFamily: 'Sora, sans-serif', fontWeight: 600, color: '#94A3B8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Career Paths</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {stream.careers.map(c => (
                      <span key={c} style={{
                        padding: '4px 12px', borderRadius: 50,
                        background: stream.bg, color: stream.color,
                        fontSize: '0.78rem', fontWeight: 600,
                        fontFamily: 'Sora, sans-serif',
                      }}>{c}</span>
                    ))}
                  </div>
                </div>

                <Link to="/careers" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  marginTop: 20, textDecoration: 'none',
                  fontFamily: 'Sora, sans-serif', fontWeight: 600,
                  fontSize: '0.88rem', color: stream.color,
                }}>View Full Career Map →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>Simple Process</p>
            <h2 className="section-heading" style={{ textAlign: 'center' }}>Start in 3 steps</h2>
          </div>

          <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { step: '01', title: 'Take the Quiz', desc: 'Answer 15 questions about your interests, strengths, and goals. Takes just 10 minutes.', icon: '📝' },
              { step: '02', title: 'Get Your Match', desc: 'Receive personalized stream, course, and career recommendations powered by AI.', icon: '✨' },
              { step: '03', title: 'Find Your College', desc: 'See nearby government colleges offering your recommended courses with full details.', icon: '🏛️' },
            ].map((item, i) => (
              <div key={i} style={{
                flex: '1 1 260px', maxWidth: 340,
                padding: '32px 28px', position: 'relative',
              }}>
                {i < 2 && (
                  <div style={{
                    position: 'absolute', top: 56, right: -12,
                    fontSize: '1.4rem', color: '#CBD5E1', zIndex: 1,
                  }}>→</div>
                )}
                <div style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: 'white',
                  border: '2px solid #FED7AA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', marginBottom: 20,
                  boxShadow: '0 4px 16px rgba(249,115,22,0.12)',
                }}>{item.icon}</div>
                <div style={{
                  fontSize: '0.72rem', fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  color: '#F97316', marginBottom: 8, letterSpacing: '0.08em',
                }}>STEP {item.step}</div>
                <h4 style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 700,
                  fontSize: '1.1rem', marginBottom: 10, color: '#1E293B',
                }}>{item.title}</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/quiz" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
              🚀 Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" style={{ background: '#0F172A' }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <p className="section-label" style={{ color: '#FED7AA' }}>
              <span style={{ background: '#FED7AA', width: 28, height: 2, display: 'inline-block' }} />
              Student Stories
            </p>
            <h2 className="section-heading" style={{ color: 'white' }}>Real students, real results</h2>
          </div>

          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 18, padding: '28px',
                animation: `fadeUp 0.6s ease ${i*0.15}s both`,
              }}>
                <div style={{ fontSize: '2rem', color: '#F97316', fontFamily: 'serif', marginBottom: 16, lineHeight: 1 }}>"</div>
                <p style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, fontSize: '0.92rem', marginBottom: 24 }}>
                  {t.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="avatar" style={{ width: 40, height: 40, fontSize: '0.85rem' }}>{t.initials}</div>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, color: 'white', fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>{t.class}</div>
                  </div>
                  <span style={{
                    marginLeft: 'auto', padding: '3px 10px', borderRadius: 50,
                    background: 'rgba(249,115,22,0.15)', color: '#FED7AA',
                    fontSize: '0.72rem', fontFamily: 'Sora, sans-serif', fontWeight: 600,
                  }}>{t.stream}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #F97316, #F59E0B)',
        padding: '72px 24px',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'white', marginBottom: 16,
          }}>
            Don't let confusion decide your future
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: 36 }}>
            Take the quiz — it's free, takes 10 minutes, and could change everything.
          </p>
          <Link to="/quiz" className="btn" style={{
            background: 'white', color: '#F97316',
            fontWeight: 700, fontSize: '1rem', padding: '14px 36px',
            boxShadow: '0 8px 28px rgba(0,0,0,0.15)',
          }}>
            🧠 Start Your Aptitude Quiz
          </Link>
        </div>
      </section>
    </div>
  )
}
