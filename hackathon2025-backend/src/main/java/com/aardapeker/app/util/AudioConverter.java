package com.aardapeker.app.util;

import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Component
public class AudioConverter {

    public byte[] convertToLinear16(byte[] inputAudio) throws IOException, InterruptedException {
        // Write input audio to temp file
        File tempInput = File.createTempFile("input", ".tmp");
        try (FileOutputStream fos = new FileOutputStream(tempInput)) {
            fos.write(inputAudio);
        }

        File tempOutput = File.createTempFile("output", ".pcm");  // or .raw

        String[] command = {
                "/usr/bin/ffmpeg",
                "-y",
                "-i", tempInput.getAbsolutePath(),
                "-ac", "1",
                "-ar", "16000",
                "-f", "s16le",  // Raw 16-bit PCM
                tempOutput.getAbsolutePath()
        };

        Process process = new ProcessBuilder(command).start();
        int exitCode = process.waitFor();
        tempInput.delete();

        if (exitCode != 0) {
            tempOutput.delete();
            throw new IOException("FFmpeg conversion failed");
        }

        byte[] outputBytes = java.nio.file.Files.readAllBytes(tempOutput.toPath());
        tempOutput.delete();
        return outputBytes;
    }
}
