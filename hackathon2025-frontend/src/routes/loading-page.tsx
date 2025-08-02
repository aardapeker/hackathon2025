import { useEffect, useState } from "react"

function LoadingPage() {
  const [timeoutReached, setTimeoutReached] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setTimeoutReached(true), 20000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">
          {timeoutReached
            ? "😴 Our servers are probably asleep. Please wait while we wake them up."
            : "Please wait.."}
        </p>
      </div>
    </div>
  )
}

export default LoadingPage