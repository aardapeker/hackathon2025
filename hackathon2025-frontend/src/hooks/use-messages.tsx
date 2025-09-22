import { MessagesProviderContext } from "@/contexts/messages-provider"
import { useContext } from "react"

export function useMessages() {
  const ctx = useContext(MessagesProviderContext)
  return {
    messages: ctx.messages,
    addUserMessage: ctx.addUserMessage,
    addAssistantMessage: ctx.addAssistantMessage,
  }
}
