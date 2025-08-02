import { useActionData } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import type { Message, Output, Voice } from "@/types"
import { nanoid } from 'nanoid'
import playSpeech from "@/functions/play_speech"

import TypingIndicator from "./typing-indicator"
import ChatMessages from "./chat-messages"
import InputForm from "./input-form"

export default function ChatUI() {
  const savedStr = localStorage.getItem("settings")
  const saved: Voice = savedStr ? JSON.parse(savedStr) : { languageCode: "en-US", voiceName: "en-US-Wavenet-D", voiceGender: "MALE" }

  const [loading, setLoading] = useState<boolean>(false)
  const [hasInput, setHasInput] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [settingsData, setSettingsData] = useState(saved)

  const suggestionFormRef = useRef<HTMLFormElement>(null)
  const suggestionInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)


  const actionData = useActionData() as Output

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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

  const handleResult = (data: string, isFinal: boolean) => {
    if (!isFinal) return
    console.log(123123)

    console.log(data)
    if (!data.trim()) {
      return
    }
    setMessages((prev) => [
      ...prev,
      {
        id: nanoid(),
        role: "user",
        content: data
      }
    ])
    setLoading(true)
    setInputValue("")
    setHasInput(false)

    // formRef.current?.requestSubmit()
  }

  const handleSpeak = (text: string) => {

    console.log(settingsData, "from handle Speak")

    playSpeech(text, settingsData.voiceName, settingsData.voiceGender, settingsData.languageCode)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.shiftKey && e.key === "Enter") {
      if (!inputValue.trim()) {
        e.preventDefault()
        return

      }
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  const handleData = (data: Voice) => {
    console.log(data)
    setSettingsData(data)
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
      <div className={`flex-1 custom-scrollbar ${messages.length !== 0 ? "overflow-y-scroll" : ""}`}>
        <div className={` max-w-4xl px-3 mx-auto ${messages.length === 0 ? "flex flex-col justify-end items-center h-full" : ""}`}  >
          {messages.length !== 0 ? (
            <ChatMessages messages={messages} onSubmit={handleSubmit} onClick={handleClick} onSpeak={handleSpeak} suggestionFormRef={suggestionFormRef} suggestionInputRef={suggestionInputRef} />
          ) : (
            <div className="rounded-lg p-4">
              <span className="text-muted-foreground text-3xl font-semibold">
                Hello! What subject would you like to discuss?
              </span>
            </div>
          )}

          {/* Typing Indicator */}
          {loading && <TypingIndicator />}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className={`border-border bg-background ${messages.length === 0 ? "h-2/3" : "border-t h-auto"}`}>
        <div className="max-w-4xl mx-auto px-3 py-6">
          <InputForm
            onSubmit={handleSubmit}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onData={handleData}
            onResult={handleResult}
            inputValue={inputValue}
            hasInput={hasInput}
            formRef={formRef}
          />

        </div>
      </div>
    </div>
  )
}
