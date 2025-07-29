import type { Output } from "@/types"

export async function getStructuredPractice(message: string): Promise<Output> {
  const rootUrl = process.env.VITE_BACKEND_URL || "http://localhost:8080"

  const url = `${rootUrl}/api/v1/practice/structured?message=${encodeURIComponent(
    message,
  )}`
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }
  return await response.json()
}
