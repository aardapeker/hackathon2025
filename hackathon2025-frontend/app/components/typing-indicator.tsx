import { Bot } from "lucide-react"

function TypingIndicator() {
  return (
    <div
      className="group px-4 py-4 my-3 bg-card text-left rounded-xl shadow-md border border-border"
      style={{
        marginLeft: "0",
        marginRight: "auto",
      }}
    >
      <div className="flex gap-3 items-start">

        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
        </div>

        {/* Typing Dots */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 py-2">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator