import { Outlet } from "react-router-dom"

function RootPage() {

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}

export default RootPage