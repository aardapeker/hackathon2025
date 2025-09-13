package com.aardapeker.app.dto;

import java.util.List;
import java.util.Map;

public record Input(String message, Profile profile, Map<String, QuizCategoryStats> quizResults, List<LastMessage> lastMessages) {
}
