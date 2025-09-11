package com.aardapeker.app.dto;

import java.util.Map;

public record Profile(String name, String bio, Summary summary, Map<String, QuizCategoryStats> quizDetections,Map<String, String> lastMessages) {
}
