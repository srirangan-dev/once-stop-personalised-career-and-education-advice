const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function getToken() {
  return (
    localStorage.getItem('pf_token') ||
    localStorage.getItem('token') ||
    sessionStorage.getItem('token') ||
    ''
  )
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  }
}

export async function getDashboardData() {
  try {
    const res = await fetch(`${API}/api/dashboard`, { headers: authHeaders() })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return {
      quizResult:    data.quizResult    || null,
      savedColleges: data.savedColleges || [],
      activityLog:   data.activityLog   || [],
    }
  } catch (err) {
    console.error('getDashboardData error:', err)
    return { quizResult: null, savedColleges: [], activityLog: [] }
  }
}

export async function getQuizResult() {
  const data = await getDashboardData()
  return data.quizResult
}

export async function getSavedColleges() {
  const data = await getDashboardData()
  return data.savedColleges
}

export async function getActivityLog() {
  const data = await getDashboardData()
  return data.activityLog
}

export async function saveQuizResult(result) {
  try {
    const res = await fetch(`${API}/api/dashboard/quiz`, {
      method:  'POST',
      headers: authHeaders(),
      body:    JSON.stringify(result),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    window.dispatchEvent(new Event('pathfinder:storage'))
  } catch (err) {
    console.error('saveQuizResult error:', err)
  }
}

export async function saveCollege(college) {
  try {
    const res = await fetch(`${API}/api/dashboard/colleges/save`, {
      method:  'POST',
      headers: authHeaders(),
      body:    JSON.stringify(college),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    window.dispatchEvent(new Event('pathfinder:storage'))
  } catch (err) {
    console.error('saveCollege error:', err)
  }
}

export async function removeCollege(id) {
  try {
    const res = await fetch(`${API}/api/dashboard/colleges/remove`, {
      method:  'POST',
      headers: authHeaders(),
      body:    JSON.stringify({ id }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    window.dispatchEvent(new Event('pathfinder:storage'))
  } catch (err) {
    console.error('removeCollege error:', err)
  }
}