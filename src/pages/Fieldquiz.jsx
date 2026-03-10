import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FIELDS, FIELD_QUESTIONS } from '../data/Fieldsdata'

export default function FieldQuiz() {
  const { fieldId } = useParams()
  const navigate    = useNavigate()

  const field     = FIELDS.find(f => f.id === fieldId)
  const questions = FIELD_QUESTIONS[fieldId]

  // ── guard: unknown fieldId ──
  if (!field || !questions) {
    return (
      <div style={{ paddingTop:120, textAlign:'center', fontFamily:'DM Sans,sans-serif' }}>
        <div style={{ fontSize:'3rem', marginBottom:16 }}>🤔</div>
        <h2 style={{ fontFamily:'DM Serif Display,serif', color:'#1E293B' }}>Field not found</h2>
        <p style={{ color:'#64748B', marginBottom:24 }}>We don't have a quiz for this field yet.</p>
        <Link to="/quiz" style={{ padding:'11px 28px', borderRadius:50, background:'#F97316', color:'white', textDecoration:'none', fontFamily:'Sora,sans-serif', fontWeight:700 }}>
          ← Back to All Fields
        </Link>
      </div>
    )
  }

  // ── state ──
  const TOTAL   = questions.length
  const [stage,   setStage]   = useState('detail')   // 'detail' | 'quiz' | 'result'
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])           // array of score numbers
  const [chosen,  setChosen]  = useState(null)         // index of selected option

  // ── scoring ──
  const totalScore   = answers.reduce((a, b) => a + b, 0)
  const maxScore     = questions.reduce((a, q) => a + Math.max(...q.options.map(o => o.score)), 0)
  const pct          = Math.round((totalScore / maxScore) * 100)

  const getVerdict = () => {
    if (pct >= 80) return { label: 'Excellent Fit!',       emoji: '🌟', color: '#10B981', bg: '#F0FDF4', desc: `You are a natural match for ${field.title}. Your mindset, interests, and aptitude align strongly with this field.` }
    if (pct >= 60) return { label: 'Good Fit',             emoji: '✅', color: '#3B82F6', bg: '#EFF6FF', desc: `You show solid interest and potential for ${field.title}. With focus and preparation, you can do very well here.` }
    if (pct >= 40) return { label: 'Moderate Fit',         emoji: '🤔', color: '#F59E0B', bg: '#FFFBEB', desc: `You have some alignment with ${field.title}, but you may find certain aspects challenging. Consider exploring related fields too.` }
    return          { label: 'Consider Other Fields',      emoji: '🔍', color: '#EF4444', bg: '#FEF2F2', desc: `Your responses suggest ${field.title} may not be the best fit right now. Explore other fields on PathFinder to find your true match.` }
  }

  const handleNext = () => {
    if (chosen === null) return
    const score = questions[current].options[chosen].score
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)
    setChosen(null)
    if (current + 1 < TOTAL) {
      setCurrent(current + 1)
    } else {
      setStage('result')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const restart = () => {
    setCurrent(0)
    setAnswers([])
    setChosen(null)
    setStage('quiz')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const progress = ((current) / TOTAL) * 100

  // ─────────────────────────────────────────────
  //  STAGE: FIELD DETAIL
  // ─────────────────────────────────────────────
  if (stage === 'detail') {
    return (
      <div style={S.page}>
        {/* Hero */}
        <div style={{ ...S.hero, borderBottom: `4px solid ${field.color}` }}>
          <div style={S.orb1} /><div style={S.orb2} /><div style={S.gridBg} />
          <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
            <button onClick={() => navigate('/quiz')} style={S.backBtn}>← All Fields</button>
            <div style={{ display:'flex', alignItems:'center', gap:20, marginTop:20, flexWrap:'wrap' }}>
              <div style={{ width:76, height:76, borderRadius:22, background:field.bg, border:`2px solid ${field.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.3rem', animation:'float 3s ease-in-out infinite', flexShrink:0 }}>
                {field.icon}
              </div>
              <div>
                <span style={{ padding:'4px 14px', borderRadius:50, fontSize:'0.72rem', fontFamily:'Sora,sans-serif', fontWeight:700, background:'rgba(255,255,255,0.1)', color:'#FED7AA', display:'inline-block', marginBottom:8 }}>
                  {field.tag}
                </span>
                <h1 style={{ fontFamily:'DM Serif Display,serif', fontSize:'clamp(1.8rem,3.5vw,2.6rem)', color:'white', lineHeight:1.2, marginBottom:6 }}>
                  {field.title}
                </h1>
                <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem' }}>{field.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth:1180, margin:'0 auto', padding:'44px 24px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24 }}>

            {/* ── Col 1: About + Skills + Demand ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <div style={S.card}>
                <p style={S.cardLabel}>📖 About This Field</p>
                <p style={{ color:'#475569', lineHeight:1.85, fontSize:'0.95rem' }}>{field.about}</p>
              </div>

              <div style={{ ...S.card, background:field.bg, border:`1px solid ${field.border}` }}>
                <p style={{ ...S.cardLabel, color:field.color }}>🧠 Skills You Need</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {field.skills.map(sk => (
                    <span key={sk} style={{ padding:'6px 14px', borderRadius:50, background:'white', color:field.color, fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'0.8rem', border:`1px solid ${field.border}` }}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div style={S.card}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                  <p style={{ ...S.cardLabel, marginBottom:0 }}>📊 Job Market Demand</p>
                  <span style={{ fontFamily:'Sora,sans-serif', fontWeight:800, color:field.color, fontSize:'0.95rem' }}>{field.scope}%</span>
                </div>
                <div style={{ height:10, background:'#F1F5F9', borderRadius:50, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${field.scope}%`, background:`linear-gradient(90deg,${field.color},${field.dark})`, borderRadius:50, transition:'width 1.2s ease' }} />
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
                  <span style={{ fontSize:'0.72rem', color:'#CBD5E1' }}>Low</span>
                  <span style={{ fontSize:'0.72rem', color:'#CBD5E1' }}>High</span>
                </div>
              </div>
            </div>

            {/* ── Col 2: Degrees + Exams ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <div style={{ ...S.card, background:field.bg, border:`1px solid ${field.border}` }}>
                <p style={{ ...S.cardLabel, color:field.color }}>🎓 Degrees to Pursue</p>
                {field.degrees.map((d, i) => (
                  <div key={d} style={{ padding:'9px 14px', borderRadius:10, marginBottom:7, background:'white', fontSize:'0.88rem', fontFamily:'DM Sans,sans-serif', color:'#334155', border:`1px solid ${field.border}`, display:'flex', alignItems:'center', gap:10, animation:`fadeUp 0.4s ease ${i*0.07}s both` }}>
                    <span style={{ width:22, height:22, borderRadius:'50%', background:field.bg, border:`1px solid ${field.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.65rem', fontFamily:'Sora,sans-serif', fontWeight:800, color:field.color, flexShrink:0 }}>
                      {i+1}
                    </span>
                    {d}
                  </div>
                ))}
              </div>

              <div style={S.card}>
                <p style={S.cardLabel}>📋 Entrance Exams</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {field.topExams.map(e => (
                    <span key={e} style={{ padding:'6px 16px', borderRadius:50, background:'#F8F4EF', color:'#475569', fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'0.78rem', border:'1px solid #E8E0D5' }}>
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Col 3: Careers + CTA ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <div style={{ background:'#0F172A', borderRadius:18, padding:'22px' }}>
                <p style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.72rem', color:'#FED7AA', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:14 }}>
                  🚀 Career Options
                </p>
                {field.careers.map((c, i) => (
                  <div key={c} style={{ padding:'10px 14px', borderRadius:10, marginBottom:8, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:'0.88rem', color:'rgba(255,255,255,0.85)', fontFamily:'DM Sans,sans-serif' }}>{c}</span>
                    {i === 0 && (
                      <span style={{ fontSize:'0.66rem', padding:'2px 8px', borderRadius:50, background:'rgba(16,185,129,0.2)', color:'#34D399', fontFamily:'Sora,sans-serif', fontWeight:700, flexShrink:0 }}>
                        Top Pick
                      </span>
                    )}
                  </div>
                ))}
                <div style={{ marginTop:14, paddingTop:14, borderTop:'1px solid rgba(255,255,255,0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans' }}>Avg. Salary</span>
                  <span style={{ fontFamily:'Sora,sans-serif', fontWeight:800, color:'#F97316', fontSize:'1.05rem' }}>{field.avgSalary}</span>
                </div>
              </div>

              {/* Quiz CTA */}
              <div style={{ background:`linear-gradient(135deg,${field.color}15,${field.color}06)`, border:`1.5px solid ${field.color}33`, borderRadius:18, padding:'24px' }}>
                <div style={{ fontSize:'2rem', marginBottom:12 }}>🧠</div>
                <h4 style={{ fontFamily:'DM Serif Display,serif', fontSize:'1.25rem', color:'#1E293B', marginBottom:8 }}>
                  Take the {field.title.split(' ')[0]} Quiz
                </h4>
                <p style={{ fontSize:'0.85rem', color:'#64748B', lineHeight:1.6, marginBottom:18 }}>
                  {TOTAL} questions written specifically for this field. Find out how well you truly fit.
                </p>
                <button
                  onClick={() => { setStage('quiz'); window.scrollTo({ top:0, behavior:'smooth' }) }}
                  style={{ width:'100%', padding:'15px', background:`linear-gradient(135deg,${field.color},${field.dark})`, color:'white', border:'none', borderRadius:12, fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'1rem', cursor:'pointer', boxShadow:`0 6px 28px ${field.color}40`, display:'flex', alignItems:'center', justifyContent:'center', gap:10, transition:'all 0.25s' }}
                >
                  Start Quiz →
                </button>
              </div>

              <button onClick={() => navigate('/quiz')} style={{ width:'100%', padding:'12px', background:'white', color:'#64748B', border:'1.5px solid #E2E8F0', borderRadius:12, fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'0.9rem', cursor:'pointer' }}>
                ← Explore Other Fields
              </button>
            </div>
          </div>
        </div>
        <KF />
      </div>
    )
  }

  // ─────────────────────────────────────────────
  //  STAGE: QUIZ QUESTIONS
  // ─────────────────────────────────────────────
  if (stage === 'quiz') {
    const q = questions[current]
    return (
      <div style={S.page}>
        {/* Hero bar */}
        <div style={{ background:`linear-gradient(135deg,#0F172A,#1E293B)`, padding:'28px 24px 24px', borderBottom:`3px solid ${field.color}` }}>
          <div style={{ maxWidth:700, margin:'0 auto' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:38, height:38, borderRadius:10, background:field.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem' }}>{field.icon}</div>
                <div>
                  <div style={{ fontFamily:'Sora,sans-serif', fontWeight:700, color:'white', fontSize:'0.9rem' }}>{field.title}</div>
                  <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.45)' }}>Aptitude Quiz</div>
                </div>
              </div>
              <button onClick={() => navigate('/quiz')} style={{ ...S.backBtn, marginBottom:0 }}>✕ Exit</button>
            </div>

            {/* Progress bar */}
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <span style={{ fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'0.8rem', color:'rgba(255,255,255,0.6)' }}>
                Question {current + 1} <span style={{ color:'rgba(255,255,255,0.3)' }}>/ {TOTAL}</span>
              </span>
              <span style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.8rem', color:field.color }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div style={{ height:6, background:'rgba(255,255,255,0.1)', borderRadius:50, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${progress}%`, background:`linear-gradient(90deg,${field.color},${field.dark})`, borderRadius:50, transition:'width 0.5s cubic-bezier(0.34,1.56,0.64,1)' }} />
            </div>
          </div>
        </div>

        <div style={{ maxWidth:700, margin:'0 auto', padding:'36px 24px 60px' }}>
          {/* Question */}
          <div style={{ background:'white', borderRadius:18, padding:'28px 30px', border:'1px solid #E8E0D5', boxShadow:'0 4px 20px rgba(15,23,42,0.07)', marginBottom:22, animation:'fadeUp 0.35s ease both' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background:`linear-gradient(135deg,${field.color},${field.dark})`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Sora,sans-serif', fontWeight:800, color:'white', fontSize:'0.82rem', flexShrink:0 }}>
                {current + 1}
              </div>
              <span style={{ fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'0.72rem', color:'#94A3B8', letterSpacing:'0.05em', textTransform:'uppercase' }}>
                {field.title} Assessment
              </span>
            </div>
            <h3 style={{ fontFamily:'DM Serif Display,serif', fontSize:'clamp(1.2rem,2.5vw,1.5rem)', color:'#1E293B', lineHeight:1.45 }}>
              {q.q}
            </h3>
          </div>

          {/* Options */}
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
            {q.options.map((opt, i) => {
              const isSel = chosen === i
              return (
                <button
                  key={i}
                  onClick={() => setChosen(i)}
                  style={{
                    padding:'15px 20px', borderRadius:14, cursor:'pointer', textAlign:'left',
                    border: isSel ? `2px solid ${field.color}` : '1.5px solid #E8E0D5',
                    background: isSel ? field.bg : 'white',
                    fontFamily:'DM Sans,sans-serif', fontSize:'0.95rem',
                    color: isSel ? field.dark : '#334155', fontWeight: isSel ? 600 : 400,
                    transition:'all 0.2s',
                    boxShadow: isSel ? `0 0 0 3px ${field.color}18` : '0 1px 3px rgba(15,23,42,0.06)',
                    display:'flex', alignItems:'center', gap:14,
                    animation:`fadeUp 0.4s ease ${i*0.06}s both`,
                  }}
                >
                  <span style={{
                    width:30, height:30, borderRadius:'50%', flexShrink:0,
                    background: isSel ? `linear-gradient(135deg,${field.color},${field.dark})` : '#F8F4EF',
                    border: isSel ? 'none' : '1.5px solid #E8E0D5',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'0.75rem', fontFamily:'Sora,sans-serif', fontWeight:700,
                    color: isSel ? 'white' : '#94A3B8', transition:'all 0.2s',
                  }}>
                    {isSel ? '✓' : ['A','B','C','D'][i]}
                  </span>
                  {opt.text}
                </button>
              )
            })}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={chosen === null}
            style={{
              width:'100%', padding:'14px',
              background: chosen !== null ? `linear-gradient(135deg,${field.color},${field.dark})` : '#E2E8F0',
              color: chosen !== null ? 'white' : '#94A3B8',
              border:'none', borderRadius:12,
              fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.95rem',
              cursor: chosen !== null ? 'pointer' : 'not-allowed',
              transition:'all 0.25s',
              boxShadow: chosen !== null ? `0 4px 20px ${field.color}35` : 'none',
            }}
          >
            {current + 1 === TOTAL ? '🎯 See My Result' : 'Next Question →'}
          </button>

          {/* Step dots */}
          <div style={{ display:'flex', justifyContent:'center', gap:7, marginTop:24 }}>
            {questions.map((_, i) => (
              <div key={i} style={{
                height:7, borderRadius:50,
                width: i === current ? 22 : 7,
                background: i < current ? field.color : i === current ? field.color : '#E2E8F0',
                opacity: i < current ? 0.45 : 1,
                transition:'all 0.3s ease',
              }} />
            ))}
          </div>
        </div>
        <KF />
      </div>
    )
  }

  // ─────────────────────────────────────────────
  //  STAGE: RESULT
  // ─────────────────────────────────────────────
  if (stage === 'result') {
    const verdict = getVerdict()
    const answeredRight = answers.filter(a => a >= 3).length

    return (
      <div style={S.page}>
        {/* Result Hero */}
        <div style={{ background:`linear-gradient(135deg,#0F172A,#1E293B)`, padding:'60px 24px 52px', borderBottom:`4px solid ${verdict.color}`, position:'relative', overflow:'hidden', textAlign:'center' }}>
          <div style={{ position:'absolute', top:-80, right:-80, width:320, height:320, borderRadius:'50%', background:`radial-gradient(circle,${verdict.color}22 0%,transparent 70%)` }} />
          <div style={{ position:'absolute', bottom:-60, left:-60, width:240, height:240, borderRadius:'50%', background:`radial-gradient(circle,${field.color}18 0%,transparent 70%)` }} />
          <div style={{ maxWidth:600, margin:'0 auto', position:'relative', zIndex:1 }}>
            <div style={{ fontSize:'3.5rem', marginBottom:10, animation:'float 3s ease-in-out infinite' }}>{verdict.emoji}</div>
            <div style={{ display:'inline-block', padding:'5px 16px', borderRadius:50, background:`${verdict.color}22`, color:verdict.color, fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.8rem', marginBottom:14, border:`1px solid ${verdict.color}44` }}>
              {verdict.label}
            </div>
            <h1 style={{ fontFamily:'DM Serif Display,serif', fontSize:'clamp(1.8rem,4vw,2.5rem)', color:'white', marginBottom:12, lineHeight:1.2 }}>
              Your Fit Score for<br />
              <span style={{ color:field.color }}>{field.title}</span>
            </h1>

            {/* Big score ring */}
            <div style={{ position:'relative', width:130, height:130, margin:'24px auto' }}>
              <svg viewBox="0 0 120 120" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke={verdict.color} strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
                  strokeLinecap="round"
                  style={{ transition:'stroke-dashoffset 1.4s cubic-bezier(0.34,1.56,0.64,1)' }} />
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:'Sora,sans-serif', fontWeight:900, fontSize:'2rem', color:'white', lineHeight:1 }}>{pct}%</span>
                <span style={{ fontSize:'0.62rem', color:'rgba(255,255,255,0.45)', fontFamily:'DM Sans' }}>match</span>
              </div>
            </div>

            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'0.95rem', lineHeight:1.7, maxWidth:480, margin:'0 auto' }}>
              {verdict.desc}
            </p>
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth:900, margin:'0 auto', padding:'44px 24px 60px' }}>

          {/* Score breakdown */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:14, marginBottom:32 }}>
            {[
              { label:'Your Score',      value:`${totalScore} / ${maxScore}`,      icon:'🎯', color:verdict.color },
              { label:'Strong Answers',  value:`${answeredRight} / ${TOTAL}`,       icon:'✅', color:'#10B981' },
              { label:'Field Match',     value:`${verdict.label}`,                  icon:verdict.emoji, color:verdict.color },
              { label:'Avg. Salary',     value:field.avgSalary,                     icon:'💰', color:'#F97316' },
            ].map(stat => (
              <div key={stat.label} style={{ background:'white', borderRadius:14, padding:'18px', border:'1px solid #E8E0D5', textAlign:'center', boxShadow:'0 2px 8px rgba(15,23,42,0.05)' }}>
                <div style={{ fontSize:'1.6rem', marginBottom:8 }}>{stat.icon}</div>
                <div style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1rem', color:stat.color, marginBottom:4 }}>{stat.value}</div>
                <div style={{ fontSize:'0.75rem', color:'#94A3B8', fontFamily:'DM Sans' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Per-question review */}
          <div style={{ background:'white', borderRadius:18, border:'1px solid #E8E0D5', padding:'24px', marginBottom:28 }}>
            <h4 style={{ fontFamily:'DM Serif Display,serif', fontSize:'1.2rem', color:'#1E293B', marginBottom:20 }}>
              Your Answer Review
            </h4>
            {questions.map((q, qi) => {
              const sc      = answers[qi] || 0
              const maxSc   = Math.max(...q.options.map(o => o.score))
              const chosen_ = q.options.find(o => o.score === sc)
              const isGood  = sc >= 3
              return (
                <div key={qi} style={{ padding:'14px 16px', borderRadius:12, marginBottom:10, background: isGood ? '#F0FDF4' : '#FFF7ED', border:`1px solid ${isGood ? '#A7F3D0' : '#FED7AA'}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, flexWrap:'wrap' }}>
                    <div style={{ flex:1 }}>
                      <p style={{ fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'0.8rem', color:'#64748B', marginBottom:5 }}>Q{qi + 1}</p>
                      <p style={{ fontSize:'0.88rem', color:'#334155', lineHeight:1.5, marginBottom:6 }}>{q.q}</p>
                      <p style={{ fontSize:'0.82rem', color: isGood ? '#059669' : '#D97706', fontFamily:'DM Sans', display:'flex', alignItems:'center', gap:6 }}>
                        <span>{isGood ? '✓' : '◎'}</span> {chosen_?.text || '—'}
                      </p>
                    </div>
                    <div style={{ textAlign:'center', flexShrink:0 }}>
                      <div style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:'1rem', color: isGood ? '#10B981' : '#F59E0B' }}>{sc}/{maxSc}</div>
                      <div style={{ fontSize:'0.65rem', color:'#94A3B8' }}>score</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recommended next steps */}
          <div style={{ background:`linear-gradient(135deg,${field.color}12,${field.color}05)`, border:`1.5px solid ${field.color}30`, borderRadius:18, padding:'24px', marginBottom:28 }}>
            <h4 style={{ fontFamily:'DM Serif Display,serif', fontSize:'1.2rem', color:'#1E293B', marginBottom:16 }}>
              📌 Recommended Next Steps
            </h4>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:10 }}>
              {field.degrees.slice(0, 3).map((d, i) => (
                <div key={d} style={{ padding:'12px 14px', borderRadius:12, background:'white', border:`1px solid ${field.border}`, display:'flex', gap:10, alignItems:'center' }}>
                  <span style={{ width:26, height:26, borderRadius:'50%', background:field.bg, border:`1px solid ${field.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem', fontFamily:'Sora,sans-serif', fontWeight:800, color:field.color, flexShrink:0 }}>{i+1}</span>
                  <span style={{ fontSize:'0.85rem', color:'#334155', fontFamily:'DM Sans' }}>{d}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:14, display:'flex', flexWrap:'wrap', gap:8 }}>
              <span style={{ fontSize:'0.8rem', color:'#64748B', fontFamily:'Sora,sans-serif', fontWeight:600 }}>Key Exams:</span>
              {field.topExams.map(e => (
                <span key={e} style={{ padding:'4px 12px', borderRadius:50, background:field.bg, color:field.color, fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'0.75rem', border:`1px solid ${field.border}` }}>{e}</span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link to="/colleges" style={{ flex:1, minWidth:180, textDecoration:'none', padding:'13px', borderRadius:12, background:'linear-gradient(135deg,#F97316,#F59E0B)', color:'white', fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.9rem', textAlign:'center', boxShadow:'0 4px 20px rgba(249,115,22,0.3)' }}>
              🏛️ Find Colleges
            </Link>
            <Link to="/careers" style={{ flex:1, minWidth:180, textDecoration:'none', padding:'13px', borderRadius:12, background:'white', color:'#334155', border:'1.5px solid #E8E0D5', fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'0.9rem', textAlign:'center' }}>
              🗺️ Career Map
            </Link>
            <button onClick={restart} style={{ flex:1, minWidth:160, padding:'13px', borderRadius:12, background:field.bg, color:field.color, border:`1.5px solid ${field.border}`, fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'0.9rem', cursor:'pointer' }}>
              🔄 Retry Quiz
            </button>
            <button onClick={() => navigate('/quiz')} style={{ flex:1, minWidth:160, padding:'13px', borderRadius:12, background:'white', color:'#64748B', border:'1.5px solid #E2E8F0', fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'0.9rem', cursor:'pointer' }}>
              🔍 Other Fields
            </button>
          </div>
        </div>
        <KF />
      </div>
    )
  }

  return null
}

// ── shared styles ──
const S = {
  page:    { paddingTop:68, background:'#FFFBF5', minHeight:'100vh', fontFamily:'DM Sans,sans-serif' },
  hero:    { background:'linear-gradient(135deg,#0F172A 0%,#1E293B 55%,#1a2f4a 100%)', padding:'52px 24px 44px', position:'relative', overflow:'hidden' },
  orb1:    { position:'absolute', top:-80, right:-80, width:360, height:360, borderRadius:'50%', background:'radial-gradient(circle,rgba(249,115,22,0.18) 0%,transparent 70%)' },
  orb2:    { position:'absolute', bottom:-60, left:'30%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(16,185,129,0.10) 0%,transparent 70%)' },
  gridBg:  { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'52px 52px' },
  backBtn: { background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.8)', padding:'8px 18px', borderRadius:50, fontFamily:'Sora,sans-serif', fontWeight:600, fontSize:'0.82rem', cursor:'pointer', marginBottom:20, backdropFilter:'blur(8px)' },
  card:    { background:'white', borderRadius:16, padding:'20px', border:'1px solid #E8E0D5' },
  cardLabel: { fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'0.72rem', color:'#94A3B8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 },
}

function KF() {
  return (
    <style>{`
      @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
    `}</style>
  )
}