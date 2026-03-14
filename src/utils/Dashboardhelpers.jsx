// ─────────────────────────────────────────────────────────────────────────────
//  DASHBOARD HELPERS — synced with Colleges.jsx & FieldQuiz.jsx
// ─────────────────────────────────────────────────────────────────────────────

// ── Saved Colleges ────────────────────────────────────────────────────────────
export function getSavedColleges() {
  try { return JSON.parse(localStorage.getItem('pf_saved_colleges') || '[]') }
  catch { return [] }
}

export function removeCollege(id) {
  try {
    const saved = getSavedColleges().filter(c => c.id !== id)
    localStorage.setItem('pf_saved_colleges', JSON.stringify(saved))
    window.dispatchEvent(new Event('pathfinder:storage'))
  } catch {}
}

// ── Quiz Result ───────────────────────────────────────────────────────────────
export function getQuizResult() {
  try { return JSON.parse(localStorage.getItem('pf_quiz_result') || 'null') }
  catch { return null }
}

export function saveQuizResult(result) {
  try {
    const toSave = { ...result, takenAt: new Date().toISOString() }
    localStorage.setItem('pf_quiz_result', JSON.stringify(toSave))
    logActivity({
      emoji: '🎯',
      title: `Quiz completed — Top match: ${result.topCareer}`,
      desc:  result.fieldTitle || '',
    })
    window.dispatchEvent(new Event('pathfinder:storage'))
  } catch {}
}

// ── Activity Log ──────────────────────────────────────────────────────────────
export function getActivityLog() {
  try { return JSON.parse(localStorage.getItem('pf_activity_log') || '[]') }
  catch { return [] }
}

export function logActivity({ emoji, title, desc }) {
  try {
    const log = getActivityLog()
    log.unshift({ emoji, title, desc: desc || '', time: new Date().toISOString() })
    localStorage.setItem('pf_activity_log', JSON.stringify(log.slice(0, 50)))
    window.dispatchEvent(new Event('pathfinder:storage'))
  } catch {}
}