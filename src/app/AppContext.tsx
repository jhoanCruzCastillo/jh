import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react'
import type { ViewKey, PerfilKey, ChatMessage } from '@/core/types'
import { loadChat, saveChat } from '@/infrastructure/storage/chatRepository'
import { loadStep, saveStep, loadDoneSteps, saveDoneSteps } from '@/infrastructure/storage/workspaceRepository'

interface AppState {
  view: ViewKey
  perfil: PerfilKey
  collapsed: boolean
  step: number
  doneSteps: number[]
  proyTab: string
  chat: ChatMessage[]
  thinking: boolean
}

type Action =
  | { type: 'SET_VIEW'; payload: ViewKey }
  | { type: 'SET_PERFIL'; payload: PerfilKey }
  | { type: 'TOGGLE_COLLAPSE' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'NEXT_STEP'; totalSteps: number }
  | { type: 'PREV_STEP' }
  | { type: 'SET_PROY_TAB'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_THINKING'; payload: boolean }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.payload }
    case 'SET_PERFIL':
      return { ...state, perfil: action.payload }
    case 'TOGGLE_COLLAPSE':
      return { ...state, collapsed: !state.collapsed }
    case 'SET_STEP': {
      saveStep(action.payload)
      return { ...state, step: action.payload }
    }
    case 'NEXT_STEP': {
      const done = state.doneSteps.includes(state.step)
        ? state.doneSteps
        : [...state.doneSteps, state.step]
      const next = Math.min(state.step + 1, action.totalSteps - 1)
      saveDoneSteps(done)
      saveStep(next)
      return { ...state, doneSteps: done, step: next }
    }
    case 'PREV_STEP': {
      const prev = Math.max(state.step - 1, 0)
      saveStep(prev)
      return { ...state, step: prev }
    }
    case 'SET_PROY_TAB':
      return { ...state, proyTab: action.payload }
    case 'ADD_MESSAGE': {
      const chat = [...state.chat, action.payload]
      saveChat(chat)
      return { ...state, chat }
    }
    case 'SET_THINKING':
      return { ...state, thinking: action.payload }
    default:
      return state
  }
}

const initialState: AppState = {
  view: 'inicio',
  perfil: 'estudiante',
  collapsed: false,
  step: loadStep(),
  doneSteps: loadDoneSteps(),
  proyTab: 'todos',
  chat: loadChat(),
  thinking: false,
}

const AppContext = createContext<AppState>(initialState)
const DispatchContext = createContext<Dispatch<Action>>(() => {})

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </AppContext.Provider>
  )
}

export function useAppState() {
  return useContext(AppContext)
}

export function useAppDispatch() {
  return useContext(DispatchContext)
}
