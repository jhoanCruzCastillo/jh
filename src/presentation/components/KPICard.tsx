import type { KPI } from '@/core/types'

export function KPICard({ icon, label, value, color, bg }: KPI) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 13, padding: '17px 18px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 11 }}>
        <i className={`fa-solid ${icon}`} style={{ color, fontSize: 17 }} />
      </div>
      <div className="heading-font" style={{ fontWeight: 800, fontSize: 25, color: '#1f2d33', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12.5, color: '#6c7b83', marginTop: 5 }}>{label}</div>
    </div>
  )
}
