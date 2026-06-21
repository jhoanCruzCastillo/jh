import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

interface Props {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', background: '#eef1f3' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh' }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '26px 30px 50px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
