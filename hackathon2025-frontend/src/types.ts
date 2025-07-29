export type Output = {
  chatOutput: string
  fixedInput: string
  fixSteps: string
  nextChatMessages: string[]
}

export type UserMessage = {
  id: string
  role: "user"
  content: string
}

export type AssistantMessage = {
  id: string
  role: "assistant"
  content: Output
}

export type Message = UserMessage | AssistantMessage
