import type { Route } from "./+types/home-page"
import type { PracticeResponse, UserData } from "~/types"


import ChatUI from "~/components/chat-ui"

import { postUserInput } from "~/functions/post_user_input"

import { initialUserData } from "~/constants/initial_profile"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

clientLoader.hydrate = true as const

export async function clientAction({ request }: Route.ClientActionArgs) {
  try {
    const userDataStr = localStorage.getItem("userData")
    console.log(userDataStr, "userDataStr")

    let userData

    if (userDataStr) {
      userData = JSON.parse(userDataStr) as UserData
      console.log(userData)
    } else {
      userData = initialUserData
    }

    console.log(userData, "userData")

    const formData = await request.formData()
    const entries = Array.from(formData.entries())
    const [, val] = entries[0]
    const data = await postUserInput({
      message: val.toString().trim(),
      profile: userData.profile,
      quizResults: userData.quizResults,
      lastMessages: userData.lastMessages,
    })

    console.log(data, "data")

    const savedData = {
      ...data.output.userData,
      lastMessages: [
        ...userData.lastMessages,
        {
          user: data.output.originalInput,
          chatBot: data.output.chatOutput,
        },
      ],
    }

    if (savedData.lastMessages.length > 10) {
      savedData.lastMessages = savedData.lastMessages.slice(-10)
    }

    localStorage.setItem("userData", JSON.stringify(savedData))

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.log(err)

    return new Response(null, { status: 204 })
  }
}

export async function clientLoader() {
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

export default function HomePage({ loaderData, actionData }: Route.ComponentProps) {
  return <ChatUI loaderData={loaderData as string} actionData={actionData as PracticeResponse | undefined} />
}
