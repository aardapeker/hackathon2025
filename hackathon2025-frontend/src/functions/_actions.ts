import type { UserData } from "@/types"

import { postUserInput } from "./post_user_input"
import { initialUserData } from "@/constants/initial_profile"

export async function chatAction({ request }: { request: Request }) {
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
      message: val.toString(),
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
