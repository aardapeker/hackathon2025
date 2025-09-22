import { MessagesProviderContext } from "@/contexts/messages-provider"
import { useContext } from "react"

export function useLoading() {
  const ctx = useContext(MessagesProviderContext)
  return {
    isLoading: ctx.isLoading,
    startLoading: ctx.startLoading,
    stopLoading: ctx.stopLoading
  }
}