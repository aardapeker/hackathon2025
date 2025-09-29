package com.aardapeker.app.prompts.templates;

public class OutputBlockExampleForChat {
    private OutputBlockExampleForChat() {
    }

    public static final String VALUE = """
            {
                "originalInput": "i dont has any pet but i want a dog",
                "fixedInput": "I don't have any pets, but I want a dog.",
                "fixSteps": [
                    {
                    "type": "capitalization",
                    "explanation": "❌ **i** → ✅ **I**\\n📖 Always capitalize the word 'I' in English."
                    },
                    {
                    "type": "subjectVerbAgreement",
                    "explanation": "❌ **has** → ✅ **have**\\n📖 After 'I', we use 'have', not 'has'."
                    },
                    {
                    "type": "pluralNounUsage",
                    "explanation": "❌ **any pet** → ✅ **any pets**\\n📖 'Any' is typically used with plural nouns when referring to general things."
                    }
                ],
                "chatOutput": "Dogs are the best! 🐶 What kind of dog would you love to have?",
                "nextChatMessages": [
                    {
                    "topic": "I love breeds like Labrador or Golden Retriever."
                    },
                    {
                    "topic": "I am really into animal care and training."
                    },
                    {
                    "topic": "Dogs are my favorite animals, I love their loyalty."
                    }
                ],
                "userData": %userDataBlockExample
            }
            """;
}
