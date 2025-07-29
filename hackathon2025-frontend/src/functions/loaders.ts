import type { LoaderFunctionArgs } from "react-router-dom"
import { testingEndpoint } from "./testing_endpoint"

export async function rootLoader({ request }: LoaderFunctionArgs) {
  console.log(request)

  const data = await testingEndpoint()

  console.log(data)

  return data
}
