package com.aardapeker.app.prompts.templates;

public class UserDataBlockExample {
    private UserDataBlockExample() {
    }

    public static final String VALUE = """
            {
                "profile": {
                    "name": "John Doe",
                    "bio": "User loves animals and wants to improve English.",
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
                    }
                }
            }
            """;

}
