import type { LoaderFunctionArgs } from "react-router-dom"

import { testingEndpoint } from "./testing_endpoint"
import { initialProfile } from "@/constants/initial_profile"

export async function rootLoader({ request }: LoaderFunctionArgs) {
  console.log(request)

  const data = await testingEndpoint()

  console.log(data)

  return data
}

export async function chatUILoader({ request }: LoaderFunctionArgs) {
  console.log(request)

  console.log("trying to fetch user profile from localstorage")
  let userProfile = localStorage.getItem("profile")

  if (!userProfile) {
    console.log(
      "there is no user profile detected, trying to save initial profile",
    )

    localStorage.setItem("profile", JSON.stringify(initialProfile))
    console.log("initial profile saved")
    userProfile = localStorage.getItem("profile")
    console.log("User Profile is Initialized:", userProfile)
  }

  return userProfile
}
