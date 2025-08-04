package com.aardapeker.app.dto;

public record Question(String questionText, String[] options, String correctAnswer, String explanation, String hint, Feedback feedback) {

}
