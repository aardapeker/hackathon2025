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
  | "misc"

export type FixStep = {
  type: ErrorKey
  explanation: string
}

export type NextChatMessage = {
  topic: string
}

export type QuizOutput = {
  questions: Question[]
}

export type Question = {
  questionText: string
  options: string[]
  correctAnswer: string
  explanation: string
  hint: string
  feedback: Feedback
}

export type Feedback = {
  // optionFeedback: { [option: string]: string } // to avoid extra nesting
  [option: string]: string
}

export type Mode = "CHAT" | "QUIZ"

export type Output = {
  originalInput: string
  fixedInput: string
  chatOutput: string
  fixSteps: FixStep[]
  nextChatMessages: NextChatMessage[]
}

export type PracticeResponse = {
  mode: Mode
  output: Output
  quizOutput: QuizOutput
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
