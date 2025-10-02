import { useEffect, useState } from "react"

let recognition: SpeechRecognition | null = null

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition()
  recognition.continuous = true
  recognition.lang = "en-US"
}

function useSpeechRecognition() {
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isFinal, setIsFinal] = useState(false)

  useEffect(() => {
    if (!recognition) return

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log("onresult event", event)
      setTranscript(event.results[0][0].transcript)
      setIsFinal(event.results[0].isFinal)
      recognition.stop()
      setIsListening(false)
    }
  }, [])

  const startListening = () => {
    setTranscript("")
    setIsListening(true)
    setIsFinal(false)
    recognition?.start()
  }

  const stopListening = () => {
    setIsListening(false)
    recognition?.stop()
  }

  return {
    transcript,
    isFinal,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  }
}

export default useSpeechRecognition
