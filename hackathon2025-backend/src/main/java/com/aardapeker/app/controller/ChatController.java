package com.aardapeker.app.controller;

import com.aardapeker.app.service.TTSService;
import com.aardapeker.app.dto.*;
import com.aardapeker.app.prompts.SystemPrompts;

import java.io.IOException;
import java.util.List;

import com.google.cloud.texttospeech.v1.ListVoicesResponse;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
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
        String customPrompt = SystemPrompts.getStructuredPromptWithProfile(
                input.profile().name(),
                input.profile().bio(),
                input.profile().summary().improvements(),
                input.profile().summary().weaknesses(),
                input.profile().summary().personalInfo(),
                input.profile().quizDetections(),
                input.profile().lastMessages());

        System.out.println("Custom Prompt: " + customPrompt);

        return chatClient.prompt()
                .user(input.message())
                .system(customPrompt)
                .call()
                .entity(PracticeResponse.class);
    }

    @GetMapping("/available-voices")
    public List<VoiceInfo> getAvailableVoices(@RequestParam(required = false) String languageCode,
            @RequestParam(required = false) String voiceGender) throws IOException {
        try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {
            ListVoicesResponse response = textToSpeechClient.listVoices("");
            return response.getVoicesList().stream()
                    .filter(voice -> languageCode == null || voice.getLanguageCodesList().contains(languageCode))
                    .filter(voice -> voiceGender == null || voice.getSsmlGender().name().equalsIgnoreCase(voiceGender))
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