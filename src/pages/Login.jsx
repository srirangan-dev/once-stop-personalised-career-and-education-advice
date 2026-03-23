import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_URL } from '../config'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const update = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError('') }

  const handleSubmit = async () => {
    if (!form.email)    { setError('Please enter your email.'); return }
    if (!form.password) { setError('Please enter your password.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }

    setBusy(true)
    try {
      // ✅ /api/auth/login matches your backend route
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await response.json()
      // ✅ Fixed: check data.error (what your backend sends), fallback to data.msg
      if (!response.ok) { setError(data.error || data.msg || 'Invalid credentials'); return }
      if (data.token) localStorage.setItem('pf_token', data.token)
      login(data.user)
      navigate('/')
    } catch (err) {
      setError('Something went wrong. Please check your connection.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FBF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', paddingTop: 88 }}>
      <div style={{ position: 'fixed', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #FED7AA44, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, #F9731611, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 460, animation: 'fadeUp 0.4s ease' }}>
        <div style={{ background: 'white', borderRadius: 28, padding: '44px 40px', boxShadow: '0 8px 48px rgba(0,0,0,0.10)', border: '1.5px solid #F1EDE8' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: 'linear-gradient(135deg, #F97316, #F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', boxShadow: '0 4px 14px #F9731644' }}>🧭</div>
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#1E293B' }}>PathFinder</span>
            </div>
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1.6rem', color: '#1E293B', margin: '0 0 8px' }}>Welcome back 👋</h1>
            <p style={{ fontSize: '0.9rem', color: '#64748B', margin: 0 }}>Sign in to your PathFinder account</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontFamily: 'Sora, sans-serif', fontWeight: 600, color: '#334155', marginBottom: 7 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>📧</span>
                <input type="email" placeholder="you@example.com" value={form.email}
                  onChange={e => update('email', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  style={{ width: '100%', padding: '13px 14px 13px 42px', borderRadius: 12, border: '1.5px solid #E8E0D5', fontFamily: 'Sora, sans-serif', fontSize: '0.9rem', color: '#1E293B', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#F97316'}
                  onBlur={e => e.target.style.borderColor = '#E8E0D5'} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                <label style={{ fontSize: '0.84rem', fontFamily: 'Sora, sans-serif', fontWeight: 600, color: '#334155' }}>Password</label>
                <button style={{ background: 'none', border: 'none', color: '#F97316', fontSize: '0.8rem', fontFamily: 'Sora, sans-serif', fontWeight: 600, cursor: 'pointer' }}>Forgot password?</button>
              </div>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>🔒</span>
                <input type={showPass ? 'text' : 'password'} placeholder="Your password" value={form.password}
                  onChange={e => update('password', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  style={{ width: '100%', padding: '13px 44px 13px 42px', borderRadius: 12, border: '1.5px solid #E8E0D5', fontFamily: 'Sora, sans-serif', fontSize: '0.9rem', color: '#1E293B', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#F97316'}
                  onBlur={e => e.target.style.borderColor = '#E8E0D5'} />
                <button onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div style={{ marginTop: 14, padding: '11px 15px', borderRadius: 10, background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '0.85rem', fontFamily: 'Sora, sans-serif' }}>
              ⚠️ {error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={busy}
            style={{ width: '100%', marginTop: 22, padding: '14px 0', borderRadius: 13, border: 'none', background: busy ? '#FED7AA' : 'linear-gradient(135deg, #F97316, #F59E0B)', color: 'white', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1rem', cursor: busy ? 'not-allowed' : 'pointer', boxShadow: busy ? 'none' : '0 4px 18px #F9731640', transition: 'all 0.2s' }}>
            {busy ? '⏳ Checking…' : '🚀 Sign In →'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.88rem', color: '#64748B', marginTop: 22, fontFamily: 'Sora, sans-serif' }}>
            New here?{' '}
            <Link to="/signup" style={{ color: '#F97316', fontWeight: 700, textDecoration: 'none' }}>Create an account →</Link>
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginTop: 24, flexWrap: 'wrap' }}>
          {['🎯 Career Quiz', '🗺️ Career Map', '🏫 College Finder'].map(f => (
            <span key={f} style={{ fontSize: '0.82rem', color: '#94A3B8', fontFamily: 'Sora, sans-serif' }}>{f}</span>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  )
}