package com.aardapeker.app.controller;

import com.aardapeker.app.service.TTSService;
import com.aardapeker.app.dto.*;
import com.aardapeker.app.prompts.SystemPrompts;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.cloud.texttospeech.v1.ListVoicesResponse;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class ChatController {
    private final ChatClient chatClient;
    private final TTSService ttsService;

    public ChatController(ChatClient.Builder builder, TTSService ttsService) {
        this.chatClient = builder.build();
        this.ttsService = ttsService;
    }

    @GetMapping("/test")
    public String test() {
        return "Test endpoint working!";
    }

    @PostMapping("/practice/structured")
    public PracticeResponse structuredResponse(@RequestBody Input input) {

        System.out.println("Received Input: " + input);

        String customPrompt = SystemPrompts.getStructuredPromptWithProfile(
                input.message(),
                input.profile().name(),
                input.profile().bio(),
                input.profile().summary().improvements(),
                input.profile().summary().weaknesses(),
                input.profile().summary().personalInfo(),
                input.quizResults(),
                input.lastMessages());

        System.out.println("Custom Prompt: " + customPrompt);

        return chatClient.prompt()
                .user(input.message())
                .system(customPrompt)
                .call()
                .entity(PracticeResponse.class);
    }

    @PostMapping("/practice/structured/dynamic")
    public CompletableFuture<PracticeResponse> structuredDynamicResponse(@RequestBody Input input) {

        String modeSelectorPrompt = SystemPrompts.getModeSelectorPromptWithProfile(
                input.message(),
                input.profile().name(),
                input.profile().bio(),
                input.profile().summary().improvements(),
                input.profile().summary().weaknesses(),
                input.profile().summary().personalInfo(),
                input.quizResults(),
                input.lastMessages());

        String chatPrompt = SystemPrompts.getChatPromptWithProfile(
                input.message(),
                input.profile().name(),
                input.profile().bio(),
                input.profile().summary().improvements(),
                input.profile().summary().weaknesses(),
                input.profile().summary().personalInfo(),
                input.quizResults(),
                input.lastMessages());

        String quizPrompt = SystemPrompts.getQuizPromptWithProfile(
                input.message(),
                input.profile().name(),
                input.profile().bio(),
                input.profile().summary().improvements(),
                input.profile().summary().weaknesses(),
                input.profile().summary().personalInfo(),
                input.quizResults(),
                input.lastMessages());

        String reviewPrompt = SystemPrompts.getReviewPromptWithProfile(
                input.message(),
                input.profile().name(),
                input.profile().bio(),
                input.profile().summary().improvements(),
                input.profile().summary().weaknesses(),
                input.profile().summary().personalInfo(),
                input.quizResults(),
                input.lastMessages());

        final ChatOptions modeOptions = ChatOptions
                .builder()
                .model("gemini-2.5-flash-lite")
                .temperature(0.2)
                .maxTokens(100)
                .build();

        final ChatOptions chatOptions = ChatOptions
                .builder()
                .model("gemini-2.5-flash")
                .temperature(0.7)
                .maxTokens(15000)
                .build();

        final ChatOptions quizOptions = ChatOptions
                .builder()
                .model("gemini-2.5-flash")
                .temperature(0.7)
                .maxTokens(15000)
                .build();

        final ChatOptions reviewOptions = ChatOptions
                .builder()
                .model("gemini-2.5-flash")
                .temperature(0.7)
                .maxTokens(15000)
                .build();

        return CompletableFuture.supplyAsync(() -> {
            JsonNode modeJson = chatClient.prompt()
                    .user(input.message())
                    .system(modeSelectorPrompt)
                    .options(modeOptions)
                    .call()
                    .entity(JsonNode.class);

            String mode = modeJson.get("mode").asText();

            String customPrompt = "CHAT".equals(mode)
                    ? chatPrompt
                    : ("QUIZ".equals(mode) ? quizPrompt : reviewPrompt);

            System.out.println("Using prompt for mode " + mode + ": " + customPrompt);

            ChatOptions selectedOptions;
            if ("CHAT".equals(mode)) {
                selectedOptions = chatOptions;
            } else if ("QUIZ".equals(mode)) {
                selectedOptions = quizOptions;
            } else {
                selectedOptions = reviewOptions;
            }

            System.out.println("Using options for mode " + mode + ": " + selectedOptions);

            return chatClient.prompt()
                    .user(input.message())
                    .system(customPrompt)
                    .options(selectedOptions)
                    .call()
                    .entity(PracticeResponse.class);
        });
    }

    @GetMapping("/available-voices")
    public List<VoiceInfo> getAvailableVoices(@RequestParam(required = false) String languageCode,
            @RequestParam(required = false) String voiceGender) throws IOException {
        try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {
            ListVoicesResponse response = textToSpeechClient.listVoices("");
            return response.getVoicesList().stream()
                    .filter(voice -> languageCode == null
                            || voice.getLanguageCodesList().contains(languageCode))
                    .filter(voice -> voiceGender == null
                            || voice.getSsmlGender().name().equalsIgnoreCase(voiceGender))
                    .map(voice -> new VoiceInfo(
                            voice.getName(),
                            voice.getSsmlGender().name(),
                            voice.getLanguageCodes(0)))
                    .toList();
        }
    }

    @PostMapping("/tts")
    public String getAudio(@RequestBody TTSRequest request) throws IOException {

        return ttsService.synthesizeSpeech(request.text(), request.voiceName(), request.voiceGender(),
                request.languageCode());
    }

}