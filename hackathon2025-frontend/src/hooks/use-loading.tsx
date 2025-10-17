import { useContext } from "react"

import { MessagesProviderContext } from "~/contexts/messages-provider"

export function useLoading() {
  const ctx = useContext(MessagesProviderContext)
  return {
    isLoading: ctx.isLoading,
    startLoading: ctx.startLoading,
    stopLoading: ctx.stopLoading
  }
}