import './VideoCard.css'

const PlayIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" width="52" height="52">
    <circle cx="30" cy="30" r="30" fill="rgba(249,115,22,0.92)" />
    <polygon points="24,18 46,30 24,42" fill="#fff" />
  </svg>
)

export default function VideoCard({ video, onPlay }) {
  return (
    <div className="vc-card" onClick={() => onPlay(video)}>
      <div className="vc-thumb">
        <img
          src={video.thumb}
          alt={video.title}
          loading="lazy"
          onError={e => (e.target.src = 'https://placehold.co/480x270/0f3460/e0e0e0?text=Video')}
        />
        <div className="vc-play-overlay"><PlayIcon /></div>
        <span className="vc-badge">{video.level}</span>
        <span className="vc-duration">{video.duration}</span>
      </div>
      <div className="vc-body">
        <h3>{video.title}</h3>
        <div className="vc-meta">
          <span>{video.topic}</span>
          <span className="vc-dot" />
          <span>{video.duration}</span>
        </div>
      </div>
    </div>
  )
}