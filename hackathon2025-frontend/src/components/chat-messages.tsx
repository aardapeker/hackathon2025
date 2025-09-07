import type { Message, Output } from "@/types"

import { diffChars } from "diff"
import { Form } from "react-router-dom"
import ReactMarkdown from "react-markdown"

import { AlertCircleIcon, Bot, CheckCircle2Icon, User, Volume2 } from "lucide-react"

import { Button } from "./ui/button"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

import { errorLabels } from "@/constants/error_labels"

type MessageProps = {
  messages: Message[]
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onClick: (msg: string) => void
  onSpeak: (text: string) => void
  suggestionFormRef: React.RefObject<HTMLFormElement | null>
  suggestionInputRef: React.RefObject<HTMLInputElement | null>
}

function ChatMessages({ messages, onSubmit, onClick, onSpeak, suggestionFormRef, suggestionInputRef }: MessageProps) {

  return messages.map((message, idx) => {
    let originalInput = ""
    let fixedInput = ""

    if (message.role === "assistant") {
      for (let i = idx - 1;i >= 0;i--) {
        if (messages[i].role === "user") {
          originalInput = messages[i].content as string
          break
        }
      }
      fixedInput = (message.content as Output).fixedInput || ""
    }

    let diff: import("diff").ChangeObject<string>[] = []
    if (originalInput && fixedInput) {
      diff = diffChars(originalInput, fixedInput)
    }

    return <div
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

              {/* Chat Output */}
              <div>
                <span className="font-semibold text-primary">Chat Output:</span>
                <span className="ml-2">
                  <ReactMarkdown>
                    {(message.content as Output).chatOutput}
                  </ReactMarkdown>
                </span>
                <Button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:disabled:text-muted-foreground transition-colors duration-200 disabled:cursor-not-allowed"
                  disabled={!(message.content as Output).chatOutput}
                  onClick={() => onSpeak((message.content as Output).chatOutput)}
                >
                  <Volume2 />
                </Button>
              </div>

              {/* Corrected Input */}
              {message.content.fixedInput && <Alert className="my-2">
                <AlertCircleIcon />
                <AlertTitle>I found some grammar mistakes in your message.</AlertTitle>
                <AlertDescription>
                  <div className="font-light text-lg text-foreground">
                    {diff.map((part, idx) => {
                      const color = part.added ? "var(--success)" :
                        part.removed ? "var(--destructive)" :
                          undefined
                      const style: React.CSSProperties = {
                        ...(color ? { color } : {}),
                        ...(part.removed ? { textDecoration: "line-through" } : {}),
                      }
                      if (part.added) {
                        return (
                          <Tooltip key={idx}>
                            <TooltipTrigger asChild>
                              <span style={style}>{part.value}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              Added
                            </TooltipContent>
                          </Tooltip>
                        )
                      }
                      return (
                        <span key={idx} style={style}>
                          {part.value}
                        </span>
                      )
                    })}</div>
                </AlertDescription>
              </Alert>}
              {message.content.fixedInput && <Alert className="my-2">
                <CheckCircle2Icon />
                <AlertTitle>Corrected Input: </AlertTitle>
                <AlertDescription>
                  {(message.content as Output).fixedInput}
                </AlertDescription>
              </Alert>}

              {/* Fix Steps */}
              {message.content.fixSteps.length !== 0 && <div>
                <span className="font-semibold text-warning">Fix Steps:</span>
                <span className="ml-2">
                  {(message.content as Output).fixSteps.map((step, idx) => {
                    const key = step.type
                    const md = step.explanation
                    return (
                      <Accordion
                        key={idx}
                        type="multiple"
                        className="w-full"
                        defaultValue={[]}
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
              }

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
                        className="h-fit max-w-fit px-3 py-1 rounded-xl bg-muted text-muted-foreground cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm whitespace-normal transition-colors duration-200"
                        tabIndex={-1}
                        onClick={() => onClick(msg.topic)}
                      >
                        {msg.topic}
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
  })
}

export default ChatMessages