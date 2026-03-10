// ─────────────────────────────────────────────────────────────────────────────
//  src/utils/dashboardHelpers.js
//  All data is scoped per user — each user sees only their own saved data.
// ─────────────────────────────────────────────────────────────────────────────

// ── Get the current logged-in user's unique identifier ────────────────────────
function getUserId() {
  try {
    const raw =
      localStorage.getItem('pathfinder_user') ||
      localStorage.getItem('user') ||
      localStorage.getItem('auth_user') ||
      sessionStorage.getItem('pathfinder_user') ||
      sessionStorage.getItem('user')

    if (!raw) return 'guest'

    const parsed = JSON.parse(raw)
    // Use whichever field your AuthContext stores as unique — id, uid, _id, or email
    return parsed?.id || parsed?.uid || parsed?._id || parsed?.email || 'guest'
  } catch {
    return 'guest'
  }
}

// ── Build a per-user localStorage key ────────────────────────────────────────
const scopedKey = (name) => `pf_${getUserId()}_${name}`

// ── Internal read/write ───────────────────────────────────────────────────────
const read  = (k) => { try { return JSON.parse(localStorage.getItem(k)) } catch { return null } }
const write = (k, val) => {
  localStorage.setItem(k, JSON.stringify(val))
  window.dispatchEvent(new CustomEvent('pathfinder:storage', { detail: { key: k } }))
}

function logActivity(emoji, title, desc = '') {
  const k   = scopedKey('activity')
  const log = read(k) || []
  log.unshift({ emoji, title, desc, time: new Date().toISOString() })
  localStorage.setItem(k, JSON.stringify(log.slice(0, 50)))
  window.dispatchEvent(new CustomEvent('pathfinder:storage', { detail: { key: k } }))
}

// ─────────────────────────────────────────────────────────────────────────────
//  QUIZ
// ─────────────────────────────────────────────────────────────────────────────
export function saveQuizResult(result) {
  write(scopedKey('quiz_result'), {
    ...result,
    takenAt: result.takenAt || new Date().toISOString(),
  })
  logActivity('🧠', 'Completed Career Quiz', `Top match: ${result.topCareer}`)
}

export function getQuizResult() {
  return read(scopedKey('quiz_result'))
}

// ─────────────────────────────────────────────────────────────────────────────
//  COLLEGES
// ─────────────────────────────────────────────────────────────────────────────
export function saveCollege(college) {
  const k    = scopedKey('saved_colleges')
  const list = read(k) || []
  if (list.find(c => c.id === college.id)) return
  list.unshift({ ...college, savedAt: new Date().toISOString() })
  write(k, list)
  logActivity('🏛️', `Saved ${college.name}`, college.location || '')
}

export function removeCollege(id) {
  const k    = scopedKey('saved_colleges')
  const list = (read(k) || []).filter(c => c.id !== id)
  write(k, list)
  logActivity('🗑️', 'Removed a college from shortlist')
}

export function isCollegeSaved(id) {
  return !!(read(scopedKey('saved_colleges')) || []).find(c => c.id === id)
}

export function getSavedColleges() {
  return read(scopedKey('saved_colleges')) || []
}

// ─────────────────────────────────────────────────────────────────────────────
//  ACTIVITY
// ─────────────────────────────────────────────────────────────────────────────
export function getActivityLog() {
  return read(scopedKey('activity')) || []
}

export function logDashboardActivity(emoji, title, desc = '') {
  logActivity(emoji, title, desc)
}