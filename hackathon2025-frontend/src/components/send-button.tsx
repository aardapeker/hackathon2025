import { Send } from "lucide-react"

import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

function SendButton({ hasInput }: { hasInput: boolean }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="submit"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:disabled:text-muted-foreground transition-colors duration-200 disabled:cursor-not-allowed"
            disabled={!hasInput}
          >
            <Send />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Send message
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default SendButton