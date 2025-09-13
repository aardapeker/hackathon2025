package com.aardapeker.app.dto;

import java.util.Map;

public record UserData(Profile profile, Map<String, QuizCategoryStats> quizResults) {
}
