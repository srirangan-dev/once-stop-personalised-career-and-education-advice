import { useEffect } from 'react'
import './VideoModal.css'

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="vm-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="vm-modal">
        <div className="vm-video">
          <button className="vm-close" onClick={onClose} aria-label="Close">✕</button>
          <iframe
            src={video.videoUrl}
            title={video.title}
            allowFullScreen
            allow="autoplay; encrypted-media"
          />
        </div>
        <div className="vm-info">
          <span className="vm-topic-tag">{video.topic}</span>
          <h3>{video.title}</h3>
          <p>{video.desc}</p>
        </div>
      </div>
    </div>
  )
}