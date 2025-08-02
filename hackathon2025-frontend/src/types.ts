export type ErrorKey =
  | "capitalization"
  | "punctuation"
  | "spelling"
  | "articleUsage"
  | "pluralNounUsage"
  | "subjectVerbAgreement"
  | "verbTense"
  | "sentenceStructure"
  | "wordChoice"
  | "runOnSentence"
  | "fragment"
  | "commaUsage"
  | "prepositionUsage"
  | "conjunctionUsage"
  | "pronounUsage"
  | "negation"
  | "modalUsage"

export type FixStep = {
  [key in ErrorKey]?: string
}

export type Output = {
  chatOutput: string
  fixedInput: string
  fixSteps: FixStep[]
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

export type Voice = {
  languageCode: string
  voiceName: string
  voiceGender: string
}

export type VoiceBackend = {
  languageCode: string
  name: string
  ssmlGender: string
}
