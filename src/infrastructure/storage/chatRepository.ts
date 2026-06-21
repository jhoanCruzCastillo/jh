import type { ChatMessage } from '@/core/types'
import { getItem, setItem } from './localStorage'

const KEY = 'chat_messages'

const WELCOME: ChatMessage = {
  id: 'welcome',
  from: 'bot',
  text: 'Hola Perla 👋 Soy tu mentor de inversión pública. Estoy aquí 24/7 para enseñarte y acompañarte en cada sección de tu documentación técnica. ¿En qué te ayudo hoy?',
  timestamp: Date.now(),
}

export function loadChat(): ChatMessage[] {
  const stored = getItem<ChatMessage[] | null>(KEY, null)
  if (!stored || stored.length === 0) {
    setItem(KEY, [WELCOME])
    return [WELCOME]
  }
  return stored
}

export function saveChat(messages: ChatMessage[]): void {
  setItem(KEY, messages)
}

export function appendMessage(msg: ChatMessage): ChatMessage[] {
  const messages = loadChat()
  messages.push(msg)
  saveChat(messages)
  return messages
}
