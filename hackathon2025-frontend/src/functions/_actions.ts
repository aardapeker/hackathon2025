import type { Profile } from "@/types"

import { postUserInput } from "./post_user_input"
import { initialProfile } from "@/constants/initial_profile"

export async function chatAction({ request }: { request: Request }) {
  try {
    let profile: Profile | undefined

    const profileStr = localStorage.getItem("profile")
    console.log(profileStr, "profileStr")

    if (profileStr) {
      profile = JSON.parse(profileStr) as Profile
      console.log(profile)
    } else {
      profile = initialProfile
    }

    console.log(profile, "profile")

    const formData = await request.formData()
    const entries = Array.from(formData.entries())
    const [, val] = entries[0]
    const data = await postUserInput({
      message: val.toString(),
      profile: profile,
    })

    console.log(data, "data")

    localStorage.setItem("profile", JSON.stringify(data.output.profile))

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.log(err)

    return new Response(null, { status: 204 })
  }
}
