package com.aardapeker.app.dto;

public record QuizCategoryStats(float correctRate,
                                int correctAnswers,
                                int totalQuestions,
                                String summary) {
}
