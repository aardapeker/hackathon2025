import { Bot, User, Volume2 } from "lucide-react"
import { Button } from "./ui/button"
import { Form } from "react-router-dom"
import type { ErrorKey, Message, Output } from "@/types"
import ReactMarkdown from "react-markdown"
import { errorLabels } from "@/constants/error_labels"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"


type MessageProps = {
  messages: Message[]
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onClick: (msg: string) => void
  onSpeak: (text: string) => void
  suggestionFormRef: React.RefObject<HTMLFormElement | null>
  suggestionInputRef: React.RefObject<HTMLInputElement | null>
}

function ChatMessages({ messages, onSubmit, onClick, onSpeak, suggestionFormRef, suggestionInputRef }: MessageProps) {
  return messages.map((message) => (
    <div
      key={message.id}
      className={`group px-4 py-4 my-3  ${message.role === "assistant"
        ? "bg-card text-left"
        : "bg-background text-right max-w-lg w-fit"
        } rounded-xl shadow-md border border-border`}
      style={{
        marginLeft: message.role === "assistant" ? "0" : "auto",
        marginRight: message.role === "assistant" ? "auto" : "0",
      }}
    >
      {/* Avatar */}
      {message.role === "assistant" ? (
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          {/* Message Content */}
          <div className="flex-1 min-w-0">
            <div className="whitespace-pre-wrap leading-relaxed text-foreground">
              {/* Corrected Input */}
              <div>
                <span className="font-semibold text-success">Corrected Input:</span>
                <span className="ml-2">{(message.content as Output).fixedInput}</span>
              </div>
              {/* Chat Output */}
              <div>
                <span className="font-semibold text-primary">Chat Output:</span>
                <span className="ml-2">{(message.content as Output).chatOutput}</span>
                <Button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:disabled:text-muted-foreground transition-colors duration-200 disabled:cursor-not-allowed"
                  disabled={!(message.content as Output).chatOutput}
                  onClick={() => onSpeak((message.content as Output).chatOutput)}
                >
                  <Volume2 />
                </Button>
              </div>
              {/* Fix Steps */}
              <div>
                <span className="font-semibold text-warning">Fix Steps:</span>
                <span className="ml-2">

                  {(message.content as Output).fixSteps.map((step, idx) => {
                    const key = Object.keys(step)[0] as ErrorKey
                    const md = Object.values(step)[0]

                    return (
                      <Accordion
                        key={idx}
                        type="multiple"
                        className="w-full"
                        defaultValue={["item-1", "item-2", "item-3"]}
                      >
                        <div className="mb-2">
                          <AccordionItem value={`item-${idx + 1}`}>
                            <AccordionTrigger>{errorLabels[key] || key}:</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                              <ReactMarkdown>
                                {md}
                              </ReactMarkdown>
                            </AccordionContent>
                          </AccordionItem>
                        </div>
                      </Accordion>
                    )
                  })}

                </span>
              </div>

              {/* Next Chat Messages */}
              <div>
                <span className="font-semibold text-muted-foreground">Suggestions:</span>
                <Form method="post" className="relative" onSubmit={onSubmit} ref={suggestionFormRef}>
                  <input
                    ref={suggestionInputRef}
                    type="hidden"
                    name="content"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(message.content as Output).nextChatMessages.map((msg, idx) => (

                      <Button
                        key={idx}
                        type="button"
                        className="px-3 py-1 rounded-xl bg-muted text-muted-foreground cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm transition-colors duration-200"
                        tabIndex={-1}
                        onClick={() => onClick(msg)}
                      >
                        {msg}
                      </Button>
                    ))}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          {/* Message Content */}
          <div className="flex-1 min-w-0">
            <div className="whitespace-pre-wrap leading-relaxed text-foreground">
              {message.content as string}
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-info text-info-foreground flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </div>

        </div>
      )}
    </div>

  ))

}


export default ChatMessages