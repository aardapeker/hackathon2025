export async function testingEndpoint(): Promise<string> {
  const rootUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"

  const response = await fetch(`${rootUrl}/api/v1/test`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }

  return await response.text()
}
