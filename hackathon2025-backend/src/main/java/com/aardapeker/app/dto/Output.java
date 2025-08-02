package com.aardapeker.app.dto;

import java.util.List;
import java.util.Map;

public record Output(
        String fixedInput,
        List<Map<String, String>> fixSteps,
        String chatOutput,
        List<String> nextChatMessages
) {}
