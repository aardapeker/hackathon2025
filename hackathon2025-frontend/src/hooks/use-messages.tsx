import { useContext } from "react"

import { MessagesProviderContext } from "~/contexts/messages-provider"

export function useMessages() {
  const ctx = useContext(MessagesProviderContext)
  return {
    messages: ctx.messages,
    addUserMessage: ctx.addUserMessage,
    addAssistantMessage: ctx.addAssistantMessage,
  }
}
