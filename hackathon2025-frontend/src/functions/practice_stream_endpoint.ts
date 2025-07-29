export async function getPracticeStream(param: string) {
  const rootUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080"

  const response = await fetch(
    `${rootUrl}/api/v1/practice/stream?message=${encodeURIComponent(param)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }

  const data = await response.text()
  console.log(data)

  return data
}
