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
  category: ErrorKey
  questionText: string
  options: string[]
  correctAnswer: string
  explanation: Explanation
  hint: string
}

export type Explanation = {
  [option: string]: string
}

export type Mode = "CHAT" | "QUIZ" | "REVIEW"

export type Summary = {
  improvements: string
  weaknesses: string
  personalInfo: string
}

export type Category = {
  correctRate: number
  correctAnswers: number
  totalQuestions: number
  summary: string
}

export type QuizResults = {
  [K in ErrorKey]?: Category
}

export type Profile = {
  name: string
  bio: string
  summary: Summary
}

export type UserData = {
  profile: Profile
  quizResults: QuizResults
  lastMessages: LastMessage[]
}

export type LastMessage = {
  user: string
  chatbot: string
}

export type Output = {
  originalInput: string
  fixedInput: string
  fixSteps: FixStep[]
  chatOutput: string
  nextChatMessages: NextChatMessage[]
  userData: UserData
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
