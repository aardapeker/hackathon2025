import { Send } from "lucide-react"

import { Button } from "./ui/button"

function SendButton({ hasInput }: { hasInput: boolean }) {
  return (
    <Button
      type="submit"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:disabled:text-muted-foreground transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
      disabled={!hasInput}
    >
      <Send />
    </Button>
  )
}

export default SendButton