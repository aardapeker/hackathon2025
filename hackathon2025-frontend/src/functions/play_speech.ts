export default async function playSpeech(
  text: string,
  voiceName: string,
  voiceGender: string,
  languageCode: string,
) {
  const rootUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
  const response = await fetch(`${rootUrl}/api/v1/tts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voiceName, voiceGender, languageCode }),
  })

  const base64Audio = await response.text()
  const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`)
  audio.play()
}
