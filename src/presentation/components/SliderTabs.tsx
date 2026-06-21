import { motion } from 'motion/react'

interface Tab {
  key: string
  label: string
  icon?: string
}

interface Props {
  tabs: Tab[]
  active: string
  onSelect: (key: string) => void
  layoutId: string
  activeBg?: string
  activeColor?: string
  inactiveColor?: string
  fontSize?: number
  padding?: string
  borderRadius?: number
  gap?: number
  containerBg?: string
  containerBorder?: string
}

export function SliderTabs({
  tabs,
  active,
  onSelect,
  layoutId,
  activeBg = '#16708f',
  activeColor = '#fff',
  inactiveColor = '#6c7b83',
  fontSize = 13,
  padding = '9px 16px',
  borderRadius = 8,
  gap = 2,
  containerBg = '#fff',
  containerBorder = '1px solid #e3e8eb',
}: Props) {
  return (
    <div style={{ display: 'flex', gap, background: containerBg, border: containerBorder, padding: 4, borderRadius: borderRadius + 3 }}>
      {tabs.map(t => {
        const isActive = active === t.key
        return (
          <button
            key={t.key}
            onClick={() => onSelect(t.key)}
            style={{
              position: 'relative',
              border: 'none',
              cursor: 'pointer',
              borderRadius,
              padding,
              fontSize,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: 'transparent',
              color: isActive ? activeColor : inactiveColor,
              zIndex: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius,
                  background: activeBg,
                  zIndex: -1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {t.icon && <i className={`fa-solid ${t.icon}`} style={{ fontSize: fontSize - 1 }} />}
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
