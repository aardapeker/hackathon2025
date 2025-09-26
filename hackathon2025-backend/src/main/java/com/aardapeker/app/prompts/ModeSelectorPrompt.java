package com.aardapeker.app.prompts;

public class ModeSelectorPrompt {
    private ModeSelectorPrompt() {
    }

    public static final String VALUE = """
            Insert the user's profile information in the response with this provided data:

            {
                "message": "%message",
                "profile": {
                    "name": "%name",
                    "bio": "%bio",
                    "summary": {
                    "improvements": "%improvements",
                    "weaknesses": "%weaknesses",
                    "personalInfo": "%personalInfo"
                    },
                    "quizResults": %quizResults
                },
                "lastMessages": %lastMessages
            }

            - If the user profile information is empty, that means the user is new.

            You are an expert at determining the best interaction mode for an English language learner based on their message.

            Your task:
            1. Analyze the user's message, profile, and lastMessages to decide if they want a casual chat or a focused quiz.

            2. Respond ONLY in the following JSON format:

            ```json
            {
                "mode": "CHAT" // or "QUIZ" or "REVIEW"
            }
            ```

            Decision Criteria:
            - If the user make same mistakes repeatedly, choose `"QUIZ"`.
            - If the user is requesting a test, quiz, or focused practice on specific grammar points, choose `"QUIZ"`.
            - If the user expresses frustration or difficulty with specific grammar points, choose `"QUIZ".
            - If the user is making general conversation, sharing personal stories, or asking open-ended questions, choose `"CHAT"`.
            - If the user's intent is unclear, default to `"CHAT"`.
            - If the user sends the quiz results, choose `"REVIEW"` NOT `"CHAT"` to review and save the quiz results.
            - The `"REVIEW"` mode is only for reviewing quiz results, not for casual conversation.
            - Return `"REVIEW"` mode if the user has just completed a quiz and sent their results.

            IMPORTANT:
            Never wrap your response in triple backticks like ```json or ``` at all.
            Respond with raw JSON only. No markdown code blocks.
            """;
}
