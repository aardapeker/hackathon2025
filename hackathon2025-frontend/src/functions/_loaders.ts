import type { LoaderFunctionArgs } from "react-router-dom"

import { testingEndpoint } from "./testing_endpoint"
import { initialUserData } from "@/constants/initial_profile"

export async function rootLoader({ request }: LoaderFunctionArgs) {
  console.log(request)

  const data = await testingEndpoint()

  console.log(data)

  return data
}

export async function chatUILoader({ request }: LoaderFunctionArgs) {
  console.log(request)

  console.log("trying to fetch user profile from localstorage")
  let userData = localStorage.getItem("userData")

  if (!userData) {
    console.log(
      "there is no user profile detected, trying to save initial profile",
    )

    localStorage.setItem("userData", JSON.stringify(initialUserData))
    console.log("initial profile saved")
    userData = localStorage.getItem("userData")
    console.log("User Data is Initialized:", userData)
  }

  return userData
}
