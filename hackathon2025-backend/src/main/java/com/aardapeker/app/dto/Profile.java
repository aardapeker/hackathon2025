package com.aardapeker.app.dto;

import java.util.List;
import java.util.Map;

public record Profile(String name, String bio, Summary summary, Map<String, QuizCategoryStats> quizDetections, List<LastMessage> lastMessages) {
}
