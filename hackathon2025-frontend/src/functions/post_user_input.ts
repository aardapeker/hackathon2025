import type {
  LastMessage,
  PracticeResponse,
  Profile,
  QuizResults,
} from "@/types"

export async function postUserInput({
  message,
  profile,
  quizResults,
  lastMessages,
}: {
  message: string
  profile: Profile
  quizResults: QuizResults
  lastMessages: LastMessage[]
}): Promise<PracticeResponse> {
  const rootUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
  const url = `${rootUrl}/api/v1/practice/structured/dynamic`

  const data = {
    message,
    profile,
    quizResults,
    lastMessages,
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    throw new Error(`Network error: ${error}`)
  }
}
