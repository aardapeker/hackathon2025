import type { Profile } from "@/types"

export const initialProfile: Profile = {
  name: "",
  bio: "",
  summary: {
    improvements: "",
    weaknesses: "",
    personalInfo: "",
  },
  quizDetections: {
    capitalization: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    punctuation: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    spelling: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    articleUsage: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    pluralNounUsage: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    subjectVerbAgreement: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    verbTense: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    sentenceStructure: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    wordChoice: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    runOnSentence: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    fragment: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    commaUsage: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    prepositionUsage: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    conjunctionUsage: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    pronounUsage: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    negation: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    modalUsage: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
    misc: {
      correctRate: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      summary: "",
    },
  },
  lastMessages: [],
}
