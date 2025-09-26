package com.aardapeker.app.prompts;

import com.aardapeker.app.dto.LastMessage;
import com.aardapeker.app.dto.QuizCategoryStats;
import com.aardapeker.app.prompts.templates.*;

import java.util.List;
import java.util.Map;

public class SystemPrompts {
    public static String getStructuredPromptWithProfile(String message, String name, String bio,
            String improvements, String weaknesses, String personalInfo,
            Map<String, QuizCategoryStats> quizResults,
            List<LastMessage> lastMessages) {
        return PracticeStructuredPrompt.VALUE
                .replace("%message", message != null ? message : "")
                .replace("%name", name != null ? name : "")
                .replace("%bio", bio != null ? bio : "")
                .replace("%improvements", improvements != null ? improvements : "")
                .replace("%weaknesses", weaknesses != null ? weaknesses : "")
                .replace("%personalInfo", personalInfo != null ? personalInfo : "")
                .replace("%quizResults", quizResults != null ? quizResults.toString() : "{}")
                .replace("%lastMessages", lastMessages != null ? lastMessages.toString() : "[]")
                .replace("%errorReferenceTable", ErrorReferenceTable.VALUE)
                .replace("%userDataBlockExample", UserDataBlockExample.VALUE)
                .replace("%outputBlockExample", OutputBlockExample.VALUE);
    }

    public static String getModeSelectorPromptWithProfile(String message, String name, String bio,
            String improvements, String weaknesses, String personalInfo,
            Map<String, QuizCategoryStats> quizResults,
            List<LastMessage> lastMessages) {
        return ModeSelectorPrompt.VALUE
                .replace("%message", message != null ? message : "")
                .replace("%name", name != null ? name : "")
                .replace("%bio", bio != null ? bio : "")
                .replace("%improvements", improvements != null ? improvements : "")
                .replace("%weaknesses", weaknesses != null ? weaknesses : "")
                .replace("%personalInfo", personalInfo != null ? personalInfo : "")
                .replace("%quizResults", quizResults != null ? quizResults.toString() : "{}")
                .replace("%lastMessages", lastMessages != null ? lastMessages.toString() : "[]");
    }

    public static String getChatPromptWithProfile(String message, String name, String bio,
            String improvements, String weaknesses, String personalInfo,
            Map<String, QuizCategoryStats> quizResults,
            List<LastMessage> lastMessages) {
        return ChatPrompt.VALUE
                .replace("%message", message != null ? message : "")
                .replace("%name", name != null ? name : "")
                .replace("%bio", bio != null ? bio : "")
                .replace("%improvements", improvements != null ? improvements : "")
                .replace("%weaknesses", weaknesses != null ? weaknesses : "")
                .replace("%personalInfo", personalInfo != null ? personalInfo : "")
                .replace("%quizResults", quizResults != null ? quizResults.toString() : "{}")
                .replace("%lastMessages", lastMessages != null ? lastMessages.toString() : "[]")
                .replace("%errorReferenceTable", ErrorReferenceTable.VALUE)
                .replace("%userDataBlockExample", UserDataBlockExample.VALUE)
                .replace("%outputBlockExampleForChat", OutputBlockExampleForChat.VALUE);
    }

    public static String getQuizPromptWithProfile(String message, String name, String bio,
            String improvements, String weaknesses, String personalInfo,
            Map<String, QuizCategoryStats> quizResults,
            List<LastMessage> lastMessages) {
        return QuizPrompt.VALUE
                .replace("%message", message != null ? message : "")
                .replace("%name", name != null ? name : "")
                .replace("%bio", bio != null ? bio : "")
                .replace("%improvements", improvements != null ? improvements : "")
                .replace("%weaknesses", weaknesses != null ? weaknesses : "")
                .replace("%personalInfo", personalInfo != null ? personalInfo : "")
                .replace("%quizResults", quizResults != null ? quizResults.toString() : "{}")
                .replace("%lastMessages", lastMessages != null ? lastMessages.toString() : "[]")
                .replace("%errorReferenceTable", ErrorReferenceTable.VALUE)
                .replace("%userDataBlockExample", UserDataBlockExample.VALUE)
                .replace("%outputBlockExampleForQuiz", OutputBlockExampleForQuiz.VALUE);
    }

    public static String getReviewPromptWithProfile(String message, String name, String bio,
            String improvements, String weaknesses, String personalInfo,
            Map<String, QuizCategoryStats> quizResults,
            List<LastMessage> lastMessages) {
        return ReviewPrompt.VALUE
                .replace("%message", message != null ? message : "")
                .replace("%name", name != null ? name : "")
                .replace("%bio", bio != null ? bio : "")
                .replace("%improvements", improvements != null ? improvements : "")
                .replace("%weaknesses", weaknesses != null ? weaknesses : "")
                .replace("%personalInfo", personalInfo != null ? personalInfo : "")
                .replace("%quizResults", quizResults != null ? quizResults.toString() : "{}")
                .replace("%lastMessages", lastMessages != null ? lastMessages.toString() : "[]")
                .replace("%errorReferenceTable", ErrorReferenceTable.VALUE)
                .replace("%userDataBlockExample", UserDataBlockExample.VALUE)
                .replace("%outputBlockExampleForReview", OutputBlockExampleForReview.VALUE);
    }
}