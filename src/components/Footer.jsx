import { Link } from 'react-router-dom'

const LINKS = {
  Explore: [
    { label: 'Take Quiz',    to: '/quiz'      },
    { label: 'Career Map',   to: '/careers'   },
    { label: 'Colleges',     to: '/colleges'  },
    { label: 'Timeline',     to: '/timeline'  },
    { label: 'Dashboard',    to: '/dashboard' },
  ],
  
  Account: [
    { label: 'Login',        to: '/login'     },
    { label: 'Sign Up',      to: '/signup'    },
  ],
  Legal: [
    { label: 'Privacy Policy',    to: '#' },
    { label: 'Terms of Use',      to: '#' },
  ],
}

const SOCIALS = [
  { icon: '𝕏',   label: 'Twitter',   href: '#' },
  { icon: 'in',   label: 'LinkedIn',  href: '#' },
  { icon: '▶',   label: 'YouTube',   href: '#' },
  { icon: '✉',   label: 'Email',     href: 'mailto:hello@pathfinder.in' },
]

export default function Footer() {
  return (
    <footer style={{
      background: '#0F172A',
      padding: '60px 24px 28px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '40px 32px',
          paddingBottom: 48,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: 'linear-gradient(135deg, #F97316, #F59E0B)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Sora, sans-serif', fontWeight: 800, color: 'white', fontSize: '1rem',
              }}>P</div>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'white', letterSpacing: '-0.02em' }}>PathFinder</span>
            </Link>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem',
              color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: '0 0 20px',
              maxWidth: 220,
            }}>
              Helping students in India discover the right career path — one quiz at a time.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIALS.map(({ icon, label, href }) => (
                <a key={label} href={href} aria-label={label} style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.55)',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.78rem',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,115,22,0.18)'; e.currentTarget.style.color = '#F97316'; e.currentTarget.style.borderColor = '#F97316' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)' }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <div style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em',
                textTransform: 'uppercase', marginBottom: 16,
              }}>{section}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map(({ label, to }) => (
                  <Link key={label} to={to} style={{
                    textDecoration: 'none',
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.55)', transition: 'color 0.18s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#F97316'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12, paddingTop: 24,
        }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.28)', margin: 0,
          }}>
            © {new Date().getFullYear()} PathFinder. Made with ❤️ for students across India.
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            {['🎯 Career Quiz', '🗺️ Career Map', '🏫 College Finder'].map(tag => (
              <span key={tag} style={{
                padding: '4px 10px', borderRadius: 50,
                background: 'rgba(249,115,22,0.10)', border: '1px solid rgba(249,115,22,0.20)',
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
                color: 'rgba(249,115,22,0.7)',
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
