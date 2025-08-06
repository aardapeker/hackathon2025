package com.aardapeker.app.service;

import com.google.cloud.texttospeech.v1.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Base64;

@Service
public class TTSService {

public String synthesizeSpeech(String text, String voiceName, String voiceGender, String languageCode) throws IOException {
  try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {

      SynthesisInput input = SynthesisInput.newBuilder()
            .setText(text)
            .build();

      VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
            .setName(voiceName)
            .setLanguageCode(languageCode)
            .setSsmlGender(SsmlVoiceGender.valueOf(voiceGender.toUpperCase()))
            .build();

      AudioConfig audioConfig = AudioConfig.newBuilder()
            .setAudioEncoding(AudioEncoding.MP3)
            .build();

      SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

      byte[] audioBytes = response.getAudioContent().toByteArray();
      return Base64.getEncoder().encodeToString(audioBytes);
    }
  }
}
