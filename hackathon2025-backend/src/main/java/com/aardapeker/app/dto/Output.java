package com.aardapeker.app.dto;

import java.util.List;

public record Output(String fixedInput, String fixSteps, String chatOutput, List<String> nextChatMessages) {
}
