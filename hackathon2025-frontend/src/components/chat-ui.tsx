import { Send, User, Bot, Mic, Plus } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { Form, useActionData } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import type { Message, Output } from "@/types"
import { nanoid } from 'nanoid'

const initialMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Hi",
  },
  {
    id: "2",
    role: "assistant",
    content: {
      "chatOutput": "✅ Perfect English! No mistakes found!\n---\nHi! How can I help you today?",
      "fixedInput": "Hi",
      "fixSteps": "No errors",
      "nextChatMessages": [
        "Ask me a question about English grammar",
        "Tell me about something you did today",
        "Ask me about my hobbies"
      ]
    }
  },
]

export default function ChatUI() {
  const [loading, setLoading] = useState<boolean>(false)
  const [hasInput, setHasInput] = useState<boolean>(false)
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")

  const suggestionFormRef = useRef<HTMLFormElement>(null)
  const suggestionInputRef = useRef<HTMLInputElement>(null)


  const actionData = useActionData() as Output

  useEffect(() => {
    if (actionData) {
      setLoading(false)
      console.log(actionData)
      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: "assistant",
          content: {
            "chatOutput": actionData.chatOutput,
            "fixedInput": actionData.fixedInput,
            "fixSteps": actionData.fixSteps,
            "nextChatMessages": actionData.nextChatMessages
          },
        },
      ])
    } else {
      console.log("error")
    }
  }, [actionData])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value as string
    setHasInput(content.trim().length > 0)
    setInputValue(content)

  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const content = e.currentTarget.content.value as string

    if (e.currentTarget.content.value !== null) {
      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: "user",
          content: content
        }
      ])
      setLoading(true)
      setInputValue("")
      setHasInput(false)
    }

  }


  const handleClick = (msg: string) => {
    if (suggestionInputRef.current) {
      suggestionInputRef.current.value = msg
    }
    suggestionFormRef.current?.requestSubmit()

  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="max-w-4xl px-3 mx-auto">
          <h1 className="text-lg font-semibold text-foreground">ChatGPT</h1>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-scroll custom-scrollbar">
        <div className="max-w-4xl px-3 mx-auto">
          {messages.map((message) => (
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
                      </div>
                      {/* Fix Steps */}
                      <div>
                        <span className="font-semibold text-warning">Fix Steps:</span>
                        <span className="ml-2">{(message.content as Output).fixSteps}</span>
                      </div>
                      {/* Next Chat Messages */}
                      <div>
                        <span className="font-semibold text-muted-foreground">Suggestions:</span>
                        <Form method="post" className="relative" onSubmit={handleSubmit} ref={suggestionFormRef}>
                          <input
                            ref={suggestionInputRef}
                            type="hidden"
                            name="content"
                          />
                          <div className="flex flex-wrap gap-2 mt-2">
                            {(message.content as Output).nextChatMessages.map((msg, idx) => (

                              <button
                                key={idx}
                                type="button"
                                className="px-3 py-1 rounded-xl bg-muted text-muted-foreground cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm transition-colors duration-200"
                                tabIndex={-1}
                                onClick={() => handleClick(msg)}
                              >
                                {msg}
                              </button>
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
          ))}

          {/* Typing Indicator */}
          {loading && (
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
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background">
        <div className="max-w-4xl mx-auto px-3 py-6">
          <Form method="post" className="relative" onSubmit={handleSubmit}>
            <div className="flex-1 min-h-[56px] max-h-[200px] flex items-center">
              <div className="relative w-full">
                {/* Large Input Container */}
                <div className="flex flex-col bg-card border border-border rounded-3xl shadow-sm hover:shadow-lg transition-all duration-200 focus-within:shadow-lg focus-within:border-ring min-h-[56px]">
                  {/* Text Input */}
                  <div className="flex-1 flex items-center px-3 py-3">
                    <Textarea
                      name="content"
                      placeholder="Ask anything..."
                      className="w-full px-3 py-2 resize-none border-0 rounded-2xl bg-transparent shadow-none text-foreground placeholder-muted-foreground focus:outline-none focus-visible:ring-0 focus:ring-0 text-base leading-6"
                      rows={1}
                      value={inputValue}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Footer Buttons */}
                  <div className="flex items-center justify-between px-3 py-2 border-t border-border">
                    {/* Tools Button */}
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Tools</span>
                    </button>
                    <div className="flex gap-2">
                      {/* Microphone Button */}
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                      {/* Send Button */}
                      <button
                        type="submit"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!hasInput}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div >
    </div >
  )
}
