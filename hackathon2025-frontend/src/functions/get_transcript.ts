interface GetAudioTranscript {
  file: File
  languageCode: string
}

async function getAudioTranscript({ file, languageCode }: GetAudioTranscript) {
  const formData = new FormData()
  formData.append("file", file) // No need for 'as any'
  formData.append("languageCode", languageCode)

  try {
    const response = await fetch("http://localhost:8080/api/v1/stt", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(
        `Transcription failed: ${response.status} ${response.statusText}`,
      )
    }

    const text = await response.text()
    return text
  } catch (err) {
    console.error("Transcription error:", err)
    throw err // Re-throw to handle in calling code
  }
}

export default getAudioTranscript
