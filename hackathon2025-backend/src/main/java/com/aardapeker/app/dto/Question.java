package com.aardapeker.app.dto;

import java.util.Map;

public record Question(String category, String questionText, String[] options, String correctAnswer, Map<String, String> explanation, String hint) {

}
