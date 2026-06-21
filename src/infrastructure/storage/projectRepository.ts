import type { Project } from '@/core/types'
import { SEED_PROJECTS } from '@/core/data/projects'
import { getItem, setItem } from './localStorage'

const KEY = 'projects'

export function loadProjects(): Project[] {
  const stored = getItem<Project[] | null>(KEY, null)
  if (!stored) {
    setItem(KEY, SEED_PROJECTS)
    return SEED_PROJECTS
  }
  return stored
}

export function saveProjects(projects: Project[]): void {
  setItem(KEY, projects)
}

export function addProject(project: Project): Project[] {
  const projects = loadProjects()
  projects.unshift(project)
  saveProjects(projects)
  return projects
}

export function updateProject(id: string, patch: Partial<Project>): Project[] {
  const projects = loadProjects().map(p =>
    p.id === id ? { ...p, ...patch } : p
  )
  saveProjects(projects)
  return projects
}
