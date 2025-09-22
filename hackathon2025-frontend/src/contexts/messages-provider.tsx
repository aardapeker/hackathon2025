import React, { createContext, useState, useCallback, useMemo } from "react"
import type { AssistantMessage, Message, UserMessage } from "@/types"

type MessagesProviderProps = {
  children: React.ReactNode
  initialMessages?: Message[]
}

type MessagesProviderState = {
  messages: Message[],
  addUserMessage: (m: UserMessage) => void,
  addAssistantMessage: (m: AssistantMessage) => void,
  isLoading: boolean,
  startLoading: () => void,
  stopLoading: () => void
}

const initialState: MessagesProviderState = {
  messages: [],
  addUserMessage: () => { },
  addAssistantMessage: () => { },
  isLoading: false,
  startLoading: () => { },
  stopLoading: () => { }
}

const MessagesProviderContext = createContext<MessagesProviderState>(initialState)

export function MessagesProvider({
  children,
  initialMessages = []
}: MessagesProviderProps) {

  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const startLoading = useCallback(() => setIsLoading(true), [])
  const stopLoading = useCallback(() => setIsLoading(false), [])


  const addUserMessage = useCallback((m: UserMessage) => {
    setMessages(prev => [...prev, m])
    startLoading()
  }, [startLoading])

  const addAssistantMessage = useCallback((m: AssistantMessage) => {
    setMessages(prev => [...prev, m])
    stopLoading()
  }, [stopLoading])

  const value = useMemo(() => ({
    messages,
    addUserMessage,
    addAssistantMessage,
    isLoading,
    startLoading,
    stopLoading
  }), [messages, addUserMessage, addAssistantMessage, isLoading, startLoading, stopLoading])

  return (
    <MessagesProviderContext.Provider value={value}>
      {children}
    </MessagesProviderContext.Provider>
  )
}

export { MessagesProviderContext }

