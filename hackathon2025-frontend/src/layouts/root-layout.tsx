import type { Route } from "../+types/root"

import { Outlet } from "react-router"

import { testingEndpoint } from "~/functions/testing_endpoint"

clientLoader.hydrate = true as const

export async function clientLoader() {

  const data = await testingEndpoint()

  console.log(data, "from clientLoader")

  return data
}

function RootLayout({ loaderData }: Route.ComponentProps) {

  console.log(loaderData, "from RootLayout")

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}

export default RootLayout