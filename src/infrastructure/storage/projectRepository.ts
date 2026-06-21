import type { Project } from '@/core/types'
import { SEED_PROJECTS } from '@/core/data/projects'
import { getItem, setItem } from './localStorage'

const KEY = 'projects'

export function loadProjects(): Project[] {
  const stored = getItem<Project[] | null>(KEY, null)
  if (!stored || !stored[0]?.documents) {
    setItem(KEY, SEED_PROJECTS)
    return SEED_PROJECTS
  }
  return stored
}

export function saveProjects(projects: Project[]): void {
  setItem(KEY, projects)
}
