import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface Comment {
  id: string
  author: string
  avatar: string
  text: string
  date: string
  likes: number
}

const MOCK_COMMENTS: Comment[] = [
  { id: 'c1', author: 'María López', avatar: 'ML', text: 'Excelente explicación, me quedó muy claro el tema de la normativa.', date: 'Hace 2 días', likes: 5 },
  { id: 'c2', author: 'Carlos Quispe', avatar: 'CQ', text: '¿Alguien sabe dónde descargar el formato actualizado que mencionó el docente?', date: 'Hace 3 días', likes: 2 },
  { id: 'c3', author: 'Ana Flores', avatar: 'AF', text: 'Muy útil para el examen. Recomiendo tomar notas en el minuto 12:30.', date: 'Hace 5 días', likes: 8 },
]

interface Props {
  open: boolean
  onClose: () => void
  title: string
}

export function VideoModal({ open, onClose, title }: Props) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(false)
  const [liked, setLiked] = useState<'like' | 'dislike' | null>(null)
  const [likeCount, setLikeCount] = useState(24)
  const [dislikeCount, setDislikeCount] = useState(1)
  const [commentDraft, setCommentDraft] = useState('')
  const [comments, setComments] = useState(MOCK_COMMENTS)

  const totalStudents = 99
  const viewed = 67
  const notViewed = totalStudents - viewed

  const handleLike = () => {
    if (liked === 'like') { setLiked(null); setLikeCount(c => c - 1) }
    else { if (liked === 'dislike') { setDislikeCount(c => c - 1) } setLiked('like'); setLikeCount(c => c + 1) }
  }
  const handleDislike = () => {
    if (liked === 'dislike') { setLiked(null); setDislikeCount(c => c - 1) }
    else { if (liked === 'like') { setLikeCount(c => c - 1) } setLiked('dislike'); setDislikeCount(c => c + 1) }
  }

  const addComment = () => {
    if (!commentDraft.trim()) return
    setComments(prev => [{ id: `new-${Date.now()}`, author: 'Camila Torres', avatar: 'CT', text: commentDraft.trim(), date: 'Ahora', likes: 0 }, ...prev])
    setCommentDraft('')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,.55)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2vh 2vw',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 16, width: '100%', maxWidth: 1440,
              height: '96vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
              boxShadow: '0 24px 48px rgba(0,0,0,.25)',
            }}
          >
            {/* Header */}
            <div style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px', borderBottom: '1px solid #eef1f3' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#e3f1f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-play-circle" style={{ color: '#16708f', fontSize: 16 }} />
                </div>
                <div>
                  <div className="heading-font" style={{ fontWeight: 700, fontSize: 16, color: '#1f2d33' }}>{title}</div>
                  <div style={{ fontSize: 11.5, color: '#9aa7ad' }}>Clase grabada · Plataforma Virtual</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ background: '#f4f7f8', border: '1px solid #e3e8eb', borderRadius: 8, padding: '7px 12px', fontSize: 12, fontWeight: 600, color: '#16708f', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <i className="fa-solid fa-check-circle" style={{ fontSize: 11 }} /> Marcar completo
                </button>
                <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 9, border: '1px solid #e3e8eb', background: '#f4f7f8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-xmark" style={{ color: '#6c7b83', fontSize: 14 }} />
                </button>
              </div>
            </div>

            {/* Body: video + sidebar */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              {/* Left: video + comments */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '16px 18px 0' }}>
                {/* Video player */}
                <div style={{
                  flex: 'none', background: '#000', position: 'relative', aspectRatio: '16/9', maxHeight: '42vh', borderRadius: 12, overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}
                  onClick={() => { setPlaying(!playing); if (!playing) setProgress(Math.min(progress + 5, 100)) }}
                >
                  {!playing && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.3)', zIndex: 2 }}>
                      <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,.15)', border: '3px solid rgba(255,255,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fa-solid fa-play" style={{ fontSize: 26, color: '#fff', marginLeft: 5 }} />
                      </div>
                    </div>
                  )}
                  <div style={{ color: '#fff', fontSize: 14, opacity: 0.5 }}>{title}</div>

                  {/* Controls */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, background: 'linear-gradient(transparent, rgba(0,0,0,.8))', padding: '24px 14px 10px' }}>
                    <div style={{ height: 4, background: 'rgba(255,255,255,.2)', borderRadius: 2, marginBottom: 8, cursor: 'pointer' }}
                      onClick={e => { e.stopPropagation(); const r = e.currentTarget.getBoundingClientRect(); setProgress(Math.round((e.clientX - r.left) / r.width * 100)) }}
                    >
                      <div style={{ height: '100%', width: `${progress}%`, background: '#36ad46', borderRadius: 2, position: 'relative', transition: 'width .1s' }}>
                        <div style={{ position: 'absolute', right: -5, top: -3, width: 10, height: 10, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.3)' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <button onClick={e => { e.stopPropagation(); setPlaying(!playing) }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <i className={`fa-solid ${playing ? 'fa-pause' : 'fa-play'}`} style={{ color: '#fff', fontSize: 14 }} />
                      </button>
                      <button onClick={e => { e.stopPropagation(); setProgress(Math.max(0, progress - 10)) }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <i className="fa-solid fa-backward" style={{ color: '#fff', fontSize: 12 }} />
                      </button>
                      <button onClick={e => { e.stopPropagation(); setProgress(Math.min(100, progress + 10)) }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <i className="fa-solid fa-forward" style={{ color: '#fff', fontSize: 12 }} />
                      </button>
                      <span style={{ color: '#fff', fontSize: 11.5 }}>{Math.floor(progress * 0.45)}:{String(Math.floor((progress * 0.45 % 1) * 60)).padStart(2, '0')} / 45:00</span>
                      <div style={{ flex: 1 }} />
                      <button onClick={e => { e.stopPropagation(); setMuted(!muted) }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <i className={`fa-solid ${muted ? 'fa-volume-xmark' : 'fa-volume-high'}`} style={{ color: '#fff', fontSize: 12 }} />
                      </button>
                      <button onClick={e => e.stopPropagation()} style={{ background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: 4, padding: '2px 7px', cursor: 'pointer' }}>
                        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>1x</span>
                      </button>
                      <button onClick={e => e.stopPropagation()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <i className="fa-solid fa-expand" style={{ color: '#fff', fontSize: 12 }} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Like/dislike bar */}
                <div style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid #eef1f3' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2d33' }}>{title}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={handleLike} style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                      background: liked === 'like' ? '#e3f1f5' : '#f4f7f8',
                      border: `1px solid ${liked === 'like' ? '#16708f' : '#e3e8eb'}`,
                      borderRadius: 20, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                      color: liked === 'like' ? '#16708f' : '#6c7b83',
                    }}>
                      <i className={`fa-${liked === 'like' ? 'solid' : 'regular'} fa-thumbs-up`} style={{ fontSize: 14 }} /> {likeCount}
                    </button>
                    <button onClick={handleDislike} style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                      background: liked === 'dislike' ? '#fbe9e7' : '#f4f7f8',
                      border: `1px solid ${liked === 'dislike' ? '#c0392b' : '#e3e8eb'}`,
                      borderRadius: 20, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                      color: liked === 'dislike' ? '#c0392b' : '#6c7b83',
                    }}>
                      <i className={`fa-${liked === 'dislike' ? 'solid' : 'regular'} fa-thumbs-down`} style={{ fontSize: 14 }} /> {dislikeCount}
                    </button>
                  </div>
                </div>

                {/* Comments */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1f2d33', marginBottom: 14 }}>
                    <i className="fa-solid fa-comments" style={{ color: '#16708f', marginRight: 8 }} />
                    Comentarios ({comments.length})
                  </div>

                  {/* New comment */}
                  <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#16708f,#36ad46)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 12, fontWeight: 700, color: '#fff' }}>CT</div>
                    <div style={{ flex: 1 }}>
                      <input
                        value={commentDraft}
                        onChange={e => setCommentDraft(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') addComment() }}
                        placeholder="Escribe un comentario…"
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #e3e8eb', borderRadius: 10, fontSize: 13, outline: 'none', color: '#1f2d33' }}
                      />
                      {commentDraft.trim() && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                          <button onClick={() => setCommentDraft('')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#6c7b83', cursor: 'pointer', fontWeight: 600 }}>Cancelar</button>
                          <button onClick={addComment} style={{ background: '#16708f', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Comentar</button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Comment list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {comments.map(c => (
                      <div key={c.id} style={{ display: 'flex', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#e3f1f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 11, fontWeight: 700, color: '#16708f' }}>{c.avatar}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#1f2d33' }}>{c.author}</span>
                            <span style={{ fontSize: 11, color: '#9aa7ad' }}>{c.date}</span>
                          </div>
                          <div style={{ fontSize: 13, color: '#46555c', lineHeight: 1.5, marginTop: 3 }}>{c.text}</div>
                          <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 12, color: '#9aa7ad', display: 'flex', alignItems: 'center', gap: 4 }}>
                              <i className="fa-regular fa-thumbs-up" style={{ fontSize: 12 }} /> {c.likes}
                            </button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 12, color: '#9aa7ad' }}>
                              Responder
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right sidebar: metrics */}
              <div style={{ flex: 'none', width: 280, borderLeft: '1px solid #eef1f3', overflowY: 'auto', padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Views metrics */}
                <div style={{ background: '#f8fafb', border: '1px solid #eef1f3', borderRadius: 12, padding: '16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#16708f', letterSpacing: '.3px', marginBottom: 12 }}>
                    <i className="fa-solid fa-chart-pie" style={{ marginRight: 6 }} />VISUALIZACIÓN DEL RECURSO
                  </div>
                  <div style={{ display: 'flex', gap: 8, textAlign: 'center' }}>
                    <div style={{ flex: 1, background: '#fff', border: '1px solid #eef1f3', borderRadius: 10, padding: '10px 6px' }}>
                      <i className="fa-solid fa-users" style={{ color: '#16708f', fontSize: 14, marginBottom: 4, display: 'block' }} />
                      <div className="heading-font" style={{ fontWeight: 800, fontSize: 18, color: '#1f2d33', lineHeight: 1 }}>{totalStudents}</div>
                      <div style={{ fontSize: 10, color: '#9aa7ad', marginTop: 2 }}>Estudiantes</div>
                    </div>
                    <div style={{ flex: 1, background: '#fff', border: '1px solid #eef1f3', borderRadius: 10, padding: '10px 6px' }}>
                      <i className="fa-solid fa-eye" style={{ color: '#36ad46', fontSize: 14, marginBottom: 4, display: 'block' }} />
                      <div className="heading-font" style={{ fontWeight: 800, fontSize: 18, color: '#36ad46', lineHeight: 1 }}>{viewed}</div>
                      <div style={{ fontSize: 10, color: '#9aa7ad', marginTop: 2 }}>Visto</div>
                      <div style={{ fontSize: 10, color: '#36ad46', fontWeight: 600 }}>{Math.round(viewed / totalStudents * 100)}%</div>
                    </div>
                    <div style={{ flex: 1, background: '#fff', border: '1px solid #eef1f3', borderRadius: 10, padding: '10px 6px' }}>
                      <i className="fa-solid fa-eye-slash" style={{ color: '#9aa7ad', fontSize: 14, marginBottom: 4, display: 'block' }} />
                      <div className="heading-font" style={{ fontWeight: 800, fontSize: 18, color: '#6c7b83', lineHeight: 1 }}>{notViewed}</div>
                      <div style={{ fontSize: 10, color: '#9aa7ad', marginTop: 2 }}>No visto</div>
                      <div style={{ fontSize: 10, color: '#6c7b83', fontWeight: 600 }}>{Math.round(notViewed / totalStudents * 100)}%</div>
                    </div>
                  </div>
                </div>

                {/* Likes summary */}
                <div style={{ background: '#f8fafb', border: '1px solid #eef1f3', borderRadius: 12, padding: '16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#16708f', letterSpacing: '.3px', marginBottom: 12 }}>
                    <i className="fa-solid fa-heart" style={{ marginRight: 6 }} />EVALUACIÓN DEL RECURSO
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#e3f1f5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                        <i className="fa-solid fa-thumbs-up" style={{ color: '#16708f', fontSize: 18 }} />
                      </div>
                      <div className="heading-font" style={{ fontWeight: 800, fontSize: 16, color: '#16708f' }}>{likeCount}</div>
                      <div style={{ fontSize: 10, color: '#9aa7ad' }}>Me gusta</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#fbe9e7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                        <i className="fa-solid fa-thumbs-down" style={{ color: '#c0392b', fontSize: 18 }} />
                      </div>
                      <div className="heading-font" style={{ fontWeight: 800, fontSize: 16, color: '#c0392b' }}>{dislikeCount}</div>
                      <div style={{ fontSize: 10, color: '#9aa7ad' }}>No me gusta</div>
                    </div>
                  </div>
                </div>

                {/* Quick feedback */}
                <div style={{ background: '#f8fafb', border: '1px solid #eef1f3', borderRadius: 12, padding: '16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#16708f', letterSpacing: '.3px', marginBottom: 10 }}>
                    <i className="fa-solid fa-star" style={{ marginRight: 6 }} />¿QUÉ TE PARECIÓ?
                  </div>
                  <textarea
                    placeholder="Deja tu opinión sobre este recurso…"
                    rows={3}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #e3e8eb', borderRadius: 9, fontSize: 12.5, outline: 'none', resize: 'none', color: '#1f2d33', lineHeight: 1.45 }}
                  />
                  <button style={{ width: '100%', background: '#36ad46', color: '#fff', border: 'none', borderRadius: 9, padding: '9px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>
                    Registrar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
