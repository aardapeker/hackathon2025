package com.aardapeker.app.dto;

public record STTRequest(
    byte[] audioData,
    String languageCode
) {}