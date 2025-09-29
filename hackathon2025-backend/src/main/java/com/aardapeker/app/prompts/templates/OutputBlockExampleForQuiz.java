package com.aardapeker.app.prompts.templates;

public class OutputBlockExampleForQuiz {
    private OutputBlockExampleForQuiz() {
    }

    public static final String VALUE = """
            {
                "originalInput": "i dont has any pet but i want a dog",
                "fixedInput": "I don't have any pets, but I want a dog.",
                "fixSteps": [
                    {
                        "type": "capitalization",
                        "explanation": "❌ **i** → ✅ **I**\\n📖 In English, the word 'I' is always capitalized, no matter where it appears in a sentence."
                    },
                    {
                        "type": "subjectVerbAgreement",
                        "explanation": "❌ **has** → ✅ **have**\\n📖 After the subject 'I', the correct verb form is 'have', not 'has'."
                    },
                    {
                        "type": "pluralNounUsage",
                        "explanation": "❌ **any pet** → ✅ **any pets**\\n📖 When talking about things in general, 'any' is usually followed by a plural noun, so 'any pets' is correct."
                    }
                ],
                "chatOutput": "Dogs are wonderful companions! 🐶 I noticed a few areas where you can improve your English, so I prepared 5 quiz questions to help you practice. Let's work on these together and boost your skills!",
                "nextChatMessages": [],
                "userData": %userDataBlockExample
            }
            """;
}
