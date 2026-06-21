import { useEffect } from 'react'
import { motion, useAnimationControls } from 'motion/react'

type Animation = 'blink' | 'wink' | 'default'

interface Props {
  size?: number
  animation?: Animation
  loop?: boolean
  loopDelay?: number
}

export function MentorBot({ size = 24, animation = 'blink', loop = false, loopDelay = 3000 }: Props) {
  const controls = useAnimationControls()

  useEffect(() => {
    const run = async () => {
      if (animation === 'blink') {
        await controls.start({ scaleY: [1, 0.15, 1], transition: { duration: 0.4, ease: 'easeInOut' } })
      } else if (animation === 'wink') {
        await controls.start({ scaleY: [1, 0.15, 1], transition: { duration: 0.45, ease: 'easeInOut' } })
      } else {
        await controls.start({ x: [0, -1.5, 1.5, 0], y: [0, 1.5, 1.5, 0], transition: { duration: 1, ease: 'easeInOut' } })
      }
    }

    run()

    if (loop) {
      const interval = setInterval(run, loopDelay)
      return () => clearInterval(interval)
    }
  }, [animation, loop, loopDelay, controls])

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      <path d="M12 8V4H8" />
      <rect width={16} height={12} x={4} y={8} rx={2} />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <motion.path
        d="M15 13v2"
        animate={controls}
        style={{ transformOrigin: '15px 14px' }}
      />
      {animation === 'wink' ? (
        <path d="M9 13v2" />
      ) : (
        <motion.path
          d="M9 13v2"
          animate={controls}
          style={{ transformOrigin: '9px 14px' }}
        />
      )}
    </motion.svg>
  )
}
