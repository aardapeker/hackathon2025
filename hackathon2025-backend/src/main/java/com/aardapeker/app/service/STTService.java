package com.aardapeker.app.service;

import com.aardapeker.app.util.AudioConverter;
import com.google.cloud.speech.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class STTService {

    private final AudioConverter audioConverter;

    public STTService(AudioConverter audioConverter) {
        this.audioConverter = audioConverter;
    }


    public String transcribeAudio(byte[] audioData, String languageCode) throws IOException, InterruptedException {

        // Convert to mono WAV
        byte[] wavAudio = audioConverter.convertToLinear16(audioData);

        try (SpeechClient speechClient = SpeechClient.create()) {

            RecognitionAudio audio = RecognitionAudio.newBuilder()
                    .setContent(ByteString.copyFrom(wavAudio))
                    .build();

            RecognitionConfig config = RecognitionConfig.newBuilder()
                    .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
//                     .setSampleRateHertz(44100)
                    .setSampleRateHertz(16000)
                    .setLanguageCode(languageCode)
                    .build();

            RecognizeResponse response = speechClient.recognize(config, audio);
            List<SpeechRecognitionResult> results = response.getResultsList();

            StringBuilder transcription = new StringBuilder();
            for (SpeechRecognitionResult result : results) {
                transcription.append(result.getAlternatives(0).getTranscript());
            }

            return transcription.toString();
        }
    }
}
