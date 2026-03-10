import { useState, useMemo } from 'react'
import videos from '../data/videos'
import VideoCard from './VideoCard'
import VideoModal from './VideoModal'
import './LearnSection.css'

const ALL = 'All'

export default function LearnSection() {
  const topics = useMemo(() => [ALL, ...new Set(videos.map(v => v.topic))], [])
  const [activeTopic,    setActiveTopic]    = useState(ALL)
  const [search,         setSearch]         = useState('')
  const [selectedVideo,  setSelectedVideo]  = useState(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return videos.filter(v => {
      const matchTopic  = activeTopic === ALL || v.topic === activeTopic
      const matchSearch = !q ||
        v.title.toLowerCase().includes(q) ||
        v.topic.toLowerCase().includes(q) ||
        v.desc.toLowerCase().includes(q)
      return matchTopic && matchSearch
    })
  }, [activeTopic, search])

  return (
    <section className="ls-section">

      {/* ── Hero Header ── */}
      <div className="ls-hero">
        <div className="ls-hero-badge">🎓 Video Learning Hub</div>
        <h1 className="ls-hero-title">
          Learn <span>What You Want</span>
        </h1>
        <p className="ls-hero-sub">
          Choose a topic and start watching curated video lessons instantly.
        </p>

        {/* Search */}
        <div className="ls-search-wrap">
          <svg className="ls-search-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search topics, e.g. Python, Biology, History…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ── Topic Pills ── */}
      <div className="ls-topics">
        {topics.map(topic => (
          <button
            key={topic}
            className={`ls-pill${activeTopic === topic ? ' active' : ''}`}
            onClick={() => setActiveTopic(topic)}
          >
            {topic === ALL ? '🎓 All Topics' : topic}
          </button>
        ))}
      </div>

      {/* ── Stats Bar ── */}
      <div className="ls-stats">
        <span>{filtered.length} video{filtered.length !== 1 ? 's' : ''} found</span>
        {search && <span>· searching "<strong>{search}</strong>"</span>}
        {activeTopic !== ALL && <span>· topic: <strong>{activeTopic}</strong></span>}
      </div>

      {/* ── Video Grid ── */}
      {filtered.length > 0 ? (
        <div className="ls-grid">
          {filtered.map(video => (
            <VideoCard key={video.id} video={video} onPlay={setSelectedVideo} />
          ))}
        </div>
      ) : (
        <div className="ls-no-results">
          <div className="ls-no-results-icon">🔍</div>
          <h3>No videos found</h3>
          <p>Try a different topic or search keyword.</p>
          <button className="ls-reset-btn" onClick={() => { setSearch(''); setActiveTopic(ALL) }}>
            Clear filters
          </button>
        </div>
      )}

      {/* ── Modal ── */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </section>
  )
}