interface Props {
  percent: number
  height?: number
  gradient?: string
}

export function ProgressBar({ percent, height = 8, gradient = 'linear-gradient(90deg,#16708f,#36ad46)' }: Props) {
  return (
    <div style={{ height, background: '#eef1f3', borderRadius: 6, overflow: 'hidden' }}>
      <div
        style={{
          width: `${percent}%`, height: '100%', borderRadius: 6,
          background: gradient, transition: 'width .4s',
        }}
      />
    </div>
  )
}
