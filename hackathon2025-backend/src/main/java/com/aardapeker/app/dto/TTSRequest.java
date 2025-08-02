package com.aardapeker.app.dto;

public record TTSRequest(String text, String voiceName, String voiceGender, String languageCode) {}
