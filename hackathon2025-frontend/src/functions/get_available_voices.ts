import type { Voice } from "@/types"

async function getAvailableVoices(
  languageCode?: string,
  voiceGender?: string,
): Promise<Voice[]> {
  const rootUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"

  let url = languageCode
    ? `${rootUrl}/api/v1/available-voices?languageCode=${encodeURIComponent(
        languageCode,
      )}`
    : `${rootUrl}/api/v1/available-voices`

  if (voiceGender) {
    url += `${languageCode ? "&" : "?"}voiceGender=${encodeURIComponent(
      voiceGender,
    )}`
  }

  const response = await fetch(url, {
    method: "GET",
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  return data
}

export default getAvailableVoices
