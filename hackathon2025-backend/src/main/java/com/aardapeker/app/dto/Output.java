package com.aardapeker.app.dto;

import java.util.List;

public record Output(
        String originalInput,
        String fixedInput,
        List<FixStep> fixSteps,
        String chatOutput,
        List<NextChatMessage> nextChatMessages
) {}
