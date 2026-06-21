import { getItem, setItem } from './localStorage'

const STEP_KEY = 'workspace_step'
const DONE_KEY = 'workspace_done'
const FIELDS_KEY = 'workspace_fields'

export function loadStep(): number {
  return getItem(STEP_KEY, 0)
}

export function saveStep(step: number): void {
  setItem(STEP_KEY, step)
}

export function loadDoneSteps(): number[] {
  return getItem(DONE_KEY, [0, 1, 2])
}

export function saveDoneSteps(done: number[]): void {
  setItem(DONE_KEY, done)
}

export function loadFieldValues(): Record<string, Record<string, string>> {
  return getItem(FIELDS_KEY, {})
}

export function saveFieldValues(values: Record<string, Record<string, string>>): void {
  setItem(FIELDS_KEY, values)
}
