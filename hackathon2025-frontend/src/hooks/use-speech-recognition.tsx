import { useState, useEffect, useRef } from "react"

interface UseSpeechRecognition {
  isRecording: boolean
  isFinal: boolean
  audioFile: File | null
  startRecording: () => void
  stopRecording: () => void
  clearRecording: () => void
}

export function useSpeechRecognition(): UseSpeechRecognition {
  const [isRecording, setIsRecording] = useState(false)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [isFinal, setIsFinal] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
          channelCount: 1,
        }
      })

      streamRef.current = stream

      audioChunksRef.current = []

      // Create MediaRecorder with WAV/LINEAR16 compatible settings
      let options: MediaRecorderOptions = {
        audioBitsPerSecond: 256000, // Bitrate for 16kHz (16000 * 16 bits * 1 channel)
      }

      // Try to use the best available format for LINEAR16 compatibility
      if (MediaRecorder.isTypeSupported('audio/wav')) {
        options.mimeType = 'audio/wav' // WAV format (best for LINEAR16)
      } else if (MediaRecorder.isTypeSupported('audio/webm;codecs=pcm')) {
        options.mimeType = 'audio/webm;codecs=pcm' // WebM with PCM codec
      } else if (MediaRecorder.isTypeSupported('audio/webm')) {
        options.mimeType = 'audio/webm' // WebM with default codec
      }

      const mediaRecorder = new MediaRecorder(stream, options)

      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        // Checks if the audio chunk has actual data
        if (event.data.size > 0) {
          // Adds the audio chunk to our collection array
          audioChunksRef.current.push(event.data)
        }
      }

      // Event handler for when recording stops
      mediaRecorder.onstop = () => {
        // Create audio blob with LINEAR16 compatible format
        // Combines all audio chunks into a single Blob with WAV type
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav' // LINEAR16 compatible
        })

        // Creates a File object with timestamp-based filename
        const audioFile = new File([audioBlob], `recording-${Date.now()}.wav`, {
          type: "audio/wav",
          lastModified: Date.now()
        })

        setAudioFile(audioFile)

        setIsFinal(true)

        // Clean up stream
        // Stops all microphone tracks and cleans up the stream
        if (streamRef.current !== null) {
          streamRef.current.getTracks().forEach(track => track.stop())
          streamRef.current = null
        }
      }

      // Start recording
      mediaRecorder.start(100) // Collecting data every 100ms
      setIsRecording(true)

    } catch (error) {
      console.error("Error accessing microphone:", error)
      setIsRecording(false)
      setIsFinal(false)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop() // Calls the MediaRecorder's stop() method
      // This triggers the onstop event handler in the startRecording func.
      // The onstop handler creates the audio file and cleans up the stream

    }
    setIsRecording(false)
  }

  const clearRecording = () => {
    setAudioFile(null)
    setIsFinal(false)
    audioChunksRef.current = []
  }

  useEffect(() => {
    // Returns a cleanup function (React calls this when component unmounts)
    return () => {
      if (streamRef.current) {
        // Release microphone
        streamRef.current.getTracks().forEach(
          track => track.stop()
        )
      }
    }
  }, [])

  return {
    isRecording,
    isFinal,
    audioFile,
    startRecording,
    stopRecording,
    clearRecording,
  }
}