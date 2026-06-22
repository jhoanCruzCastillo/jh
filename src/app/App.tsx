import { useAppState } from './AppContext'
import { MainLayout } from '@/presentation/layout/MainLayout'
import { Dashboard } from '@/presentation/pages/Dashboard'
import { Projects } from '@/presentation/pages/Projects'
import { Workspace } from '@/presentation/pages/Workspace'
import { Courses } from '@/presentation/pages/Courses'
import { Training } from '@/presentation/pages/Training'
import { Assistant } from '@/presentation/pages/Assistant'
import { Formats } from '@/presentation/pages/Formats'
import { Plans } from '@/presentation/pages/Plans'

function PageRouter() {
  const { view } = useAppState()

  switch (view) {
    case 'inicio': return <Dashboard />
    case 'proyectos': return <Projects />
    case 'workspace': return <Workspace />
    case 'cursos': return <Courses />
    case 'entrenamiento': return <Training />
    case 'asistente': return <Assistant />
    case 'formatos': return <Formats />
    case 'planes': return <Plans />
    default: return <Dashboard />
  }
}

export function App() {
  return (
    <MainLayout>
      <PageRouter />
    </MainLayout>
  )
}
