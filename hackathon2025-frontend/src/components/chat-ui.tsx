import { useActionData, useLoaderData } from "react-router-dom"
import { useCallback, useEffect, useRef, useState } from "react"
import type { Message, PracticeResponse, Profile, Voice } from "@/types"
import { nanoid } from 'nanoid'
import playSpeech from "@/functions/play_speech"

import TypingIndicator from "./typing-indicator"
import ChatMessages from "./chat-messages"
import InputForm from "./input-form"
import Quiz from "./quiz"

export default function ChatUI() {
  const savedStr = localStorage.getItem("settings")
  const saved: Voice = savedStr ? JSON.parse(savedStr) : { languageCode: "en-US", voiceName: "en-US-Chirp3-HD-Sadachbia", voiceGender: "MALE" }

  const [loading, setLoading] = useState<boolean>(false)
  const [hasInput, setHasInput] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [settingsData, setSettingsData] = useState(saved)
  const [isSplitScreen, setIsSplitScreen] = useState(false)

  const suggestionFormRef = useRef<HTMLFormElement>(null)
  const suggestionInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const userProfile = JSON.parse(useLoaderData()) as Profile
  const actionData = useActionData() as PracticeResponse

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (actionData) {
      if (actionData.mode === "QUIZ") {
        setIsSplitScreen(true)
      }
      setLoading(false)
      console.log(actionData)
      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: "assistant",
          content: {
            "originalInput": actionData.output.originalInput,
            "chatOutput": actionData.output.chatOutput,
            "fixedInput": actionData.output.fixedInput,
            "fixSteps": actionData.output.fixSteps,
            "nextChatMessages": actionData.output.nextChatMessages,
            "profile": actionData.output.profile
          },
        },
      ])
    } else {
      console.log("error")
    }
  }, [actionData])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value as string
    setInputValue(content)

    if ((content.trim().length > 0) !== hasInput) {
      setHasInput(content.trim().length > 0)
    }
  }, [hasInput])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [isSplitScreen])


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
  }

  const handleSpeak = (text: string) => {
    console.log(settingsData, "from handle Speak")
    playSpeech(text, settingsData.voiceName, settingsData.voiceGender, settingsData.languageCode)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
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

  const handleLoading = (data: boolean) => {
    setLoading(data)
    setIsSplitScreen(false)
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {!isSplitScreen ?
        <>
          {/* Messages Container */}
          <div className={`flex-1 custom-scrollbar ${messages.length !== 0 ? "overflow-y-scroll" : ""}`}>
            <div className={` max-w-4xl px-3 mx-auto ${messages.length === 0 ? "flex flex-col justify-end items-center h-full" : ""}`}  >
              {messages.length !== 0 ? (
                <ChatMessages messages={messages} onSubmit={handleSubmit} onClick={handleClick} onSpeak={handleSpeak} suggestionFormRef={suggestionFormRef} suggestionInputRef={suggestionInputRef} />
              ) : (
                <div className="rounded-lg p-4">
                  <span className="text-muted-foreground text-3xl font-semibold">
                    {userProfile.name !== "" ? `Hello ${userProfile.name}! 👋 What subject would you like to discuss?` : "Hello! What subject would you like to discuss?"}

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
        </>
        :
        <>
          {/* Split Screen */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Panel */}
            <div className="w-1/3 border-r border-border flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <Quiz questions={actionData.quizOutput.questions} onIsLoading={handleLoading} />
              </div>
            </div>
            {/* Right Panel */}
            <div className="w-2/3 flex flex-col">
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

                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </div>


            </div>
          </div>
        </>
      }
    </div>
  )
}
