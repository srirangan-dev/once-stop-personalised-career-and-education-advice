import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'Learn',      to: '/learn' },
  { label: 'Take Quiz',  to: '/quiz' },
  { label: 'Career Map', to: '/careers' },
  { label: 'Colleges',   to: '/colleges' },
  { label: 'Timeline',   to: '/timeline' },
]

// ─── Mini Dashboard Panel ─────────────────────────────────────────────────────
function UserPanel({ user, onLogout, onClose, isLight }) {
  const [activeTab, setActiveTab] = useState('profile')
  const panelRef = useRef(null)

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : user?.username?.slice(0, 2).toUpperCase() || '??'

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently'

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const tabs = ['profile', 'settings']

  return (
    <div ref={panelRef} style={{
      position: 'absolute', top: 'calc(100% + 10px)', right: 0,
      width: 300,
      background: 'white',
      borderRadius: 20,
      border: '1px solid #E8E0D5',
      boxShadow: '0 20px 60px rgba(15,23,42,0.15)',
      overflow: 'hidden',
      zIndex: 2000,
      animation: 'panelSlide 0.2s cubic-bezier(0.16,1,0.3,1)',
    }}>
      <style>{`
        @keyframes panelSlide {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: '20px 20px 0',
        background: 'linear-gradient(180deg, #FFF4ED 0%, white 100%)',
        borderBottom: '1px solid #F3EDE5',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: 'linear-gradient(135deg, #F97316, #F59E0B)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 16, color: 'white',
            boxShadow: '0 6px 16px rgba(249,115,22,0.3)',
          }}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.95rem',
              color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{user?.name || user?.username}</div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
              color: '#94A3B8', marginTop: 2,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{user?.email}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#22C55E', display: 'inline-block',
                boxShadow: '0 0 0 2px rgba(34,197,94,0.2)',
              }} />
              <span style={{ fontSize: '0.7rem', color: '#22C55E', fontFamily: 'DM Sans, sans-serif' }}>Online</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 3 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              flex: 1, padding: '7px 4px',
              background: activeTab === t ? 'rgba(249,115,22,0.08)' : 'transparent',
              border: activeTab === t ? '1px solid rgba(249,115,22,0.2)' : '1px solid transparent',
              borderRadius: 8, cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.75rem',
              color: activeTab === t ? '#F97316' : '#94A3B8',
              transition: 'all 0.15s',
            }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ padding: '14px 20px 16px', minHeight: 160 }}>

        {/* ── Profile ── */}
        {activeTab === 'profile' && (
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: '0.7rem', color: '#94A3B8',
              background: '#F8FAFC', border: '1px solid #E2E8F0',
              borderRadius: 20, padding: '3px 10px', marginBottom: 12,
              fontFamily: 'DM Sans, sans-serif',
            }}>⚡ Member since {memberSince}</div>
            {[
              { label: 'Username', value: `@${user?.username || user?.name}`, accent: true },
              { label: 'Email',    value: user?.email },
              { label: 'Stream',   value: user?.stream || 'Not set' },
            ].map(row => (
              <div key={row.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '9px 0', borderBottom: '1px solid #F1F5F9',
              }}>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{row.label}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: row.accent ? '#F97316' : '#334155', fontFamily: 'DM Sans, sans-serif' }}>{row.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Settings ── */}
        {activeTab === 'settings' && (
          <div>
            {[
              { label: 'Edit Profile',    to: '/dashboard' },
              { label: 'My Career Map',   to: '/careers'   },
              { label: 'Saved Colleges',  to: '/colleges'  },
              { label: 'My Timeline',     to: '/timeline'  },
            ].map(item => (
              <Link key={item.label} to={item.to} onClick={onClose} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '11px 0', borderBottom: '1px solid #F1F5F9',
                textDecoration: 'none',
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', fontFamily: 'DM Sans, sans-serif' }}>{item.label}</span>
                <span style={{ color: '#CBD5E1', fontSize: 16 }}>→</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Logout */}
      <div style={{ padding: '0 16px 16px' }}>
        <button onClick={() => { onLogout(); onClose() }} style={{
          width: '100%', padding: '11px',
          background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 12, cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.85rem',
          color: '#EF4444', letterSpacing: '0.03em',
          transition: 'all 0.2s',
        }}>
          🚪 Sign Out
        </button>
      </div>
    </div>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()                      // ✅ added
  const { user, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setDashboardOpen(false)
  }, [pathname])

  const isLight = pathname !== '/' || scrolled

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : user?.username?.slice(0, 2).toUpperCase() || '??'

  // ✅ Click avatar/name → go to dashboard
  const handleAvatarClick = () => navigate('/dashboard')

  // ✅ Click arrow only → toggle dropdown (stops propagation so avatar click doesn't fire)
  const handleArrowClick = (e) => {
    e.stopPropagation()
    setDashboardOpen(v => !v)
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(255,251,245,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid #E8E0D5' : '1px solid transparent',
      transition: 'all 0.3s ease',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1180, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 68,
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38,
            background: 'linear-gradient(135deg, #F97316, #F59E0B)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Sora, sans-serif', fontWeight: 800, color: 'white', fontSize: '1rem',
          }}>P</div>
          <span style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1.1rem',
            color: isLight ? '#0F172A' : 'white',
            letterSpacing: '-0.02em',
          }}>PathFinder</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={to} to={to} style={{
              textDecoration: 'none',
              padding: '8px 16px', borderRadius: 50,
              fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '0.9rem',
              color: pathname === to ? '#F97316' : isLight ? '#334155' : 'rgba(255,255,255,0.85)',
              background: pathname === to ? 'rgba(249,115,22,0.08)' : 'transparent',
              transition: 'all 0.2s ease',
            }}>{label}</Link>
          ))}

          {/* Logged OUT */}
          {!user && (
            <>
              <Link to="/login" style={{
                textDecoration: 'none', padding: '8px 18px', borderRadius: 50,
                fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.9rem',
                color: isLight ? '#F97316' : 'white',
                border: isLight ? '1.5px solid #F97316' : '1.5px solid rgba(255,255,255,0.6)',
                background: 'transparent', transition: 'all 0.2s ease', marginLeft: 8,
              }}>Login</Link>
              <Link to="/signup" style={{
                textDecoration: 'none', padding: '8px 18px', borderRadius: 50,
                fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.9rem',
                color: 'white', background: 'linear-gradient(135deg, #F97316, #F59E0B)',
                boxShadow: '0 3px 12px rgba(249,115,22,0.35)', transition: 'all 0.2s ease',
              }}>Sign Up</Link>
            </>
          )}

          {/* ✅ Logged IN */}
          {user && (
            <div style={{ position: 'relative', marginLeft: 8 }}>
              <div
                onClick={handleAvatarClick}         // ← tap avatar/name → /dashboard
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '5px 6px 5px 5px', borderRadius: 50,
                  background: dashboardOpen
                    ? 'rgba(249,115,22,0.12)'
                    : isLight ? '#FFF4ED' : 'rgba(255,255,255,0.15)',
                  border: dashboardOpen
                    ? '1.5px solid rgba(249,115,22,0.5)'
                    : isLight ? '1.5px solid #FED7AA' : '1.5px solid rgba(255,255,255,0.3)',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  userSelect: 'none',
                  boxShadow: dashboardOpen ? '0 0 16px rgba(249,115,22,0.15)' : 'none',
                }}
              >
                {/* Avatar circle */}
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F97316, #F59E0B)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.75rem', color: 'white',
                }}>{initials}</div>

                {/* Name */}
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.88rem',
                  color: isLight ? '#1E293B' : 'white',
                }}>{(user.name || user.username || '').split(' ')[0]}</span>

                {/* ✅ Arrow — only this opens the dropdown */}
                <div
                  onClick={handleArrowClick}
                  title="More options"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 22, height: 22, borderRadius: 6,
                    background: 'rgba(0,0,0,0.05)',
                    transition: 'background 0.15s',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="12" height="12" viewBox="0 0 24 24"
                    fill="none"
                    stroke={isLight ? '#94A3B8' : 'rgba(255,255,255,0.6)'}
                    strokeWidth="2.5"
                    style={{
                      transition: 'transform 0.25s',
                      transform: dashboardOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {dashboardOpen && (
                <UserPanel
                  user={user}
                  onLogout={logout}
                  onClose={() => setDashboardOpen(false)}
                  isLight={isLight}
                />
              )}
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          aria-label="Menu"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 4 }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: 'block', width: 22, height: 2, background: isLight ? '#0F172A' : 'white', borderRadius: 2 }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'white', border: '1px solid #E8E0D5', borderRadius: 14,
          margin: '0 0 16px', padding: '12px 8px',
          display: 'flex', flexDirection: 'column', gap: 2,
          boxShadow: '0 10px 40px rgba(15,23,42,0.14)',
        }}>
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={to} to={to} style={{
              textDecoration: 'none', padding: '10px 16px', borderRadius: 8,
              fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '0.95rem',
              color: pathname === to ? '#F97316' : '#334155',
              background: pathname === to ? 'rgba(249,115,22,0.08)' : 'transparent',
            }}>{label}</Link>
          ))}

          <div style={{ height: 1, background: '#E8E0D5', margin: '4px 8px' }} />

          {!user && (
            <div style={{ display: 'flex', gap: 8, padding: '6px 8px 4px' }}>
              <Link to="/login" style={{
                flex: 1, textAlign: 'center', textDecoration: 'none',
                padding: '10px 0', borderRadius: 50,
                fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.9rem',
                color: '#F97316', border: '1.5px solid #F97316', background: 'transparent',
              }}>Login</Link>
              <Link to="/signup" style={{
                flex: 1, textAlign: 'center', textDecoration: 'none',
                padding: '10px 0', borderRadius: 50,
                fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.9rem',
                color: 'white', background: 'linear-gradient(135deg, #F97316, #F59E0B)',
                boxShadow: '0 3px 12px rgba(249,115,22,0.35)',
              }}>Sign Up</Link>
            </div>
          )}

          {user && (
            <div style={{ padding: '6px 8px 4px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* ✅ Mobile: tap user card → go to /dashboard */}
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10,
                  background: '#FFF4ED', border: '1px solid #FED7AA',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F97316, #F59E0B)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.75rem', color: 'white',
                  }}>{initials}</div>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.88rem', color: '#0F172A' }}>{user.name || user.username}</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: '#F97316' }}>Tap to open Dashboard →</div>
                  </div>
                </div>
              </Link>

              {[
                { label: '🗺️ Career Map', to: '/careers' },
                { label: '🎓 Learn',      to: '/learn'   },
              ].map(item => (
                <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)} style={{
                  textDecoration: 'none', padding: '10px 16px', borderRadius: 8,
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '0.9rem', color: '#334155',
                }}>{item.label}</Link>
              ))}

              <button onClick={() => { logout(); setMenuOpen(false) }} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '10px 16px', borderRadius: 8, textAlign: 'left',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '0.95rem', color: '#EF4444',
              }}>🚪 Logout</button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex   !important; }
        }
      `}</style>
    </nav>
  )
}