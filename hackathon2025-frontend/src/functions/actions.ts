import { getStructuredPractice } from "./practice_structured_endpoint"

export async function chatAction({ request }: { request: Request }) {
  try {
    const formData = await request.formData()
    const entries = Array.from(formData.entries())
    const [, val] = entries[0]
    const data = await getStructuredPractice(val.toString())

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.log(err)
    // Prevent redirect by returning a 204 response on error
    return new Response(null, { status: 204 })
  }
}
