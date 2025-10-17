import { useEffect, useRef, useState } from "react"

import { Mic, Square, AudioLinesIcon } from "lucide-react"

import { toast } from "sonner"

import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"

import { useSpeechRecognition } from "~/hooks/use-speech-recognition"

import { renderCounter } from "~/functions/render_counter"
import getAudioTranscript from "~/functions/get_transcript"

import { initialVoiceSettings } from "~/constants/initial_profile"

function VoiceInput({
  onResult
}: {
  onResult: (transcript: string, isFinal: boolean) => void
}) {

  ///////////////////////// Render Counter ////////////////////////////
  const counterRef = useRef(0)
  counterRef.current = renderCounter({ counter: counterRef.current })
  console.log(`VoiceInput rendered ${counterRef.current} times`)
  /////////////////////////////////////////////////////////////////////

  const {
    isRecording,
    isFinal,
    audioFile,
    startRecording,
    stopRecording,
    clearRecording,
  } = useSpeechRecognition()

  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const savedStr = localStorage.getItem("settings")

  useEffect(() => {
    if (error) {
      toast.error("Recording Error", {
        description: error,
        action: {
          label: "Dismiss",
          onClick: () => setError(null),
        },
      })
    }
  }, [error])

  const handleRecordingToggle = () => {
    if (isRecording) {
      stopRecording()
    } else {
      clearRecording() // Clear previous recording
      startRecording()
    }
  }

  useEffect(() => {
    console.log(isFinal, "isFinal from VoiceInp")
    if (isFinal === true) {
      handleSendRecording()
    }
  }, [isFinal])


  const handleSendRecording = async () => {
    console.log(isProcessing, audioFile)
    if (!audioFile || isProcessing) return

    setIsProcessing(true)
    setError(null)

    try {
      console.log("Sending audio file:", {
        name: audioFile.name,
        size: audioFile.size,
        type: audioFile.type
      })

      // Send audio file to the backend 
      const transcript = await getAudioTranscript({
        file: audioFile,
        languageCode: savedStr
          ? JSON.parse(savedStr).languageCode
          : initialVoiceSettings.languageCode
      })

      console.log("Backend transcript:", transcript)

      if (transcript && transcript.trim()) {
        onResult(transcript.trim(), true)
        clearRecording() // Clear after successful processing
      } else {
        setError("No speech detected in recording")
      }
    } catch (error) {
      console.error("Failed to get transcript from backend:", error)
      setError("Failed to process audio. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        onClick={handleRecordingToggle}
        disabled={isProcessing}
        className={`
              flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 cursor-pointer
              ${isRecording
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }
              disabled:cursor-not-allowed disabled:opacity-50
            `}
        aria-pressed={isRecording}
        aria-label={isRecording ? "Stop Recording" : "Start Recording"}
      >
        {isProcessing ?
          <div className="flex items-center gap-4">
            <Spinner />
          </div> :
          (isRecording ?
            <Square className="w-4 h-4" /> :
            <Mic className="w-4 h-4" />
          )}
      </Button>
    </div>
  )
}

export default VoiceInput