package com.aardapeker.app.prompts.templates;

public class OutputBlockExample {
    private OutputBlockExample() {
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
                "userData": {
                    "profile": {
                    "name": "John Doe",
                    "bio": "User loves animals and wants to improve my English.",
                    "summary": {
                        "improvements": "User needs to work on verb tenses and plural nouns.",
                        "weaknesses": "User often confuses 'has' and 'have', and forgets to capitalize 'I'.",
                        "personalInfo": "User loves dogs and wants to have one in the future."
                    }
                    },
                    "quizResults": {
                    "subjectVerbAgreement": {
                        "correctRate": 54.5,
                        "correctAnswers": 6,
                        "totalQuestions": 11,
                        "summary": "Needs more work on subject-verb agreement. Many mistakes with 'he go' instead of 'he goes'."
                    },
                    "articleUsage": {
                        "correctRate": 80.0,
                        "correctAnswers": 8,
                        "totalQuestions": 10,
                        "summary": "Solid grasp of articles. Occasional confusion between 'a' and 'an'."
                    },
                        ... all other category types like this ...
                    }
                }
                }
                """;

}
