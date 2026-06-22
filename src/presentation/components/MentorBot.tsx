import { useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react'
import { motion, useAnimationControls, type Variants } from 'motion/react'

type Animation = 'blink' | 'wink' | 'default'

export interface MentorBotHandle {
  trigger: (anim?: Animation) => void
}

interface Props {
  size?: number
  animation?: Animation
  loop?: boolean
  loopDelay?: number
  randomize?: boolean
}

const ANIMATIONS: Animation[] = ['blink', 'wink', 'default']

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const },
      opacity: { duration: 0.15, delay: i * 0.08 },
    },
  }),
}

const eyeAppear: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, delay: 0.45 } },
}

export const MentorBot = forwardRef<MentorBotHandle, Props>(function MentorBot({ size = 24, animation = 'blink', loop = false, loopDelay = 3000, randomize = false }, ref) {
  const leftEye = useAnimationControls()
  const rightEye = useAnimationControls()
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useImperativeHandle(ref, () => ({
    trigger: (anim?: Animation) => { runAnimation(anim ?? 'wink') },
  }))

  const runAnimation = useCallback(async (anim: Animation) => {
    if (anim === 'blink') {
      await Promise.all([
        leftEye.start({ scaleY: [1, 0.15, 1], transition: { duration: 0.4, ease: 'easeInOut' } }),
        rightEye.start({ scaleY: [1, 0.15, 1], transition: { duration: 0.4, ease: 'easeInOut' } }),
      ])
    } else if (anim === 'wink') {
      await rightEye.start({ scaleY: [1, 0.15, 1], transition: { duration: 0.45, ease: 'easeInOut' } })
    } else {
      await Promise.all([
        leftEye.start({ x: [0, -1.5, 1.5, 0], y: [0, 1.5, 1.5, 0], transition: { duration: 1, ease: 'easeInOut' } }),
        rightEye.start({ x: [0, -1.5, 1.5, 0], y: [0, 1.5, 1.5, 0], transition: { duration: 1, ease: 'easeInOut' } }),
      ])
    }
  }, [leftEye, rightEye])

  useEffect(() => {
    const startDelay = 900

    if (randomize) {
      const scheduleNext = () => {
        const delay = 1500 + Math.random() * 3000
        timerRef.current = setTimeout(async () => {
          const pick = ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)]
          await runAnimation(pick)
          scheduleNext()
        }, delay)
      }
      timerRef.current = setTimeout(() => {
        runAnimation(ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)])
        scheduleNext()
      }, startDelay)
      return () => clearTimeout(timerRef.current)
    }

    const t = setTimeout(() => {
      runAnimation(animation)
      if (loop) {
        const interval = setInterval(() => runAnimation(animation), loopDelay)
        timerRef.current = interval as unknown as ReturnType<typeof setTimeout>
      }
    }, startDelay)
    return () => { clearTimeout(t); clearTimeout(timerRef.current) }
  }, [animation, loop, loopDelay, randomize, runAnimation])

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
      initial="hidden"
      animate="visible"
    >
      <motion.path d="M12 8V4H8" variants={draw} custom={0} />
      <motion.rect width={16} height={12} x={4} y={8} rx={2} variants={draw} custom={1} />
      <motion.path d="M2 14h2" variants={draw} custom={2} />
      <motion.path d="M20 14h2" variants={draw} custom={3} />
      <motion.g variants={eyeAppear}>
        <motion.path
          d="M15 13v2"
          animate={rightEye}
          style={{ transformOrigin: '15px 14px' }}
        />
      </motion.g>
      <motion.g variants={eyeAppear}>
        <motion.path
          d="M9 13v2"
          animate={leftEye}
          style={{ transformOrigin: '9px 14px' }}
        />
      </motion.g>
    </motion.svg>
  )
})
