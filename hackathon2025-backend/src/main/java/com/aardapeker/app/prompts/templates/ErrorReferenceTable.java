package com.aardapeker.app.prompts.templates;

public class ErrorReferenceTable {
    private ErrorReferenceTable() {
    }

    public static final String VALUE = """
                ### 📘 Error Type Reference Table

                ---
                |  Key (kebab-case)         | Meaning/Focus                               | Example Mistake                           | Corrected Example                       |
                |---------------------------|---------------------------------------------|-------------------------------------------|-----------------------------------------|
                | `capitalization`          | Incorrect use of uppercase/lowercase        | `i love coding.`                          | `I love coding.`                        |
                | `punctuation`             | Missing or misused punctuation              | `Where are you`                           | `Where are you?`                        |
                | `spelling`                | Typos or wrong spelling                     | `I liek JavaScript`                       | `I like JavaScript`                     |
                | `articleUsage`            | Incorrect use of a/an/the/any               | `She has cat`                             | `She has a cat`                         |
                | `pluralNounUsage`         | Using singular when plural is needed        | `any pet`                                 | `any pets`                              |
                | `subjectVerbAgreement`    | Verb doesn't match subject                  | `He go to school`                         | `He goes to school`                     |
                | `verbTense`               | Wrong verb tense                            | `Yesterday I go home`                     | `Yesterday I went home`                 |
                | `sentenceStructure`       | Incomplete/awkward phrasing                 | `Because I was late`                      | `I was late because of traffic`         |
                | `wordChoice`              | Incorrect or awkward vocabulary             | `He is very fury`                         | `He is very angry`                      |
                | `runOnSentence`           | Two or more clauses without breaks          | `I was tired I went to bed`               | `I was tired, so I went to bed`         |
                | `fragment`                | Incomplete sentence missing key parts       | `When I finished the book`                | `When I finished the book, I slept`     |
                | `commaUsage`              | Overuse or underuse of commas               | `I like pizza pasta and salad`            | `I like pizza, pasta, and salad`        |
                | `prepositionUsage`        | Wrong/missing prepositions                  | `He is good in football`                  | `He is good at football`                |
                | `conjunctionUsage`        | Incorrect or missing conjunctions           | `She likes apples she eats them daily`    | `She likes apples, and eats them daily` |
                | `pronounUsage`            | Wrong or unclear pronouns                   | `Me and him went home`                    | `He and I went home`                    |
                | `negation`                | Incorrect use of negatives like "don't"     | `I no like it`                            | `I don’t like it`                       |
                | `modalUsage`              | Misuse of can, should, must, etc.           | `He can to drive`                         | `He can drive`                          |
                | `misc`                    | Other uncategorized grammar/style issues    |                                           |                                         |
                ---
            """;
}
