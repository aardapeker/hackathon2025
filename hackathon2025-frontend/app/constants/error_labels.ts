import type { ErrorKey } from "~/types"

export const errorLabels: Record<ErrorKey, string> = {
  capitalization: "Capitalization",
  punctuation: "Punctuation",
  spelling: "Spelling",
  articleUsage: "Article Usage",
  pluralNounUsage: "Plural Noun Usage",
  subjectVerbAgreement: "Subject-Verb Agreement",
  verbTense: "Verb Tense",
  sentenceStructure: "Sentence Structure",
  wordChoice: "Word Choice",
  runOnSentence: "Run-on Sentence",
  fragment: "Fragment",
  commaUsage: "Comma Usage",
  prepositionUsage: "Preposition Usage",
  conjunctionUsage: "Conjunction Usage",
  pronounUsage: "Pronoun Usage",
  negation: "Negation",
  modalUsage: "Modal Usage",
  misc: "Miscellaneous",
}
