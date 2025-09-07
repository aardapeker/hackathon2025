import { useEffect } from "react"

import { Mic, Square } from "lucide-react"

import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

import useSpeechRecognition from "@/hooks/use-speech-recognition"

export function VoiceInput({ onResult }: { onResult: (transcript: string, isFinal: boolean) => void }) {
  const { transcript, isFinal, isListening, startListening, stopListening, hasRecognitionSupport } = useSpeechRecognition()

  useEffect(() => {
    if (transcript) {
      onResult(transcript, isFinal)
    }
  }, [transcript, onResult, isFinal])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          onClick={isListening ? stopListening : startListening}
          disabled={!hasRecognitionSupport}
          className={`
          flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:disabled:text-muted-foreground transition-colors duration-200 disabled:cursor-not-allowed
          ${!hasRecognitionSupport && "disabled:cursor-not-allowed"}
        `}
          aria-pressed={isListening}
          aria-label={isListening ? "Stop Listening" : "Start Listening"}
        >
          {isListening ? <Square /> : <Mic />}

          <span className="sr-only">
            {isListening ? "Stop Listening" : "Start Listening"}
          </span>
        </Button>
      </TooltipTrigger>

      {!hasRecognitionSupport && (
        <TooltipContent>
          <p >
            Voice recognition is not supported in this browser.
          </p>
        </TooltipContent>
      )}
    </Tooltip >
  )
}