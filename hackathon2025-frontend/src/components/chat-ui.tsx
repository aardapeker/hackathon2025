import type { Message, PracticeResponse, UserData, Voice } from "@/types"

import { useEffect, useRef, useState } from "react"
import { useActionData, useLoaderData } from "react-router-dom"

import { nanoid } from 'nanoid'

import Quiz from "./quiz"
import InputForm from "./input-form"
import ChatMessages from "./chat-messages"
import playSpeech from "@/functions/play_speech"
import TypingIndicator from "./typing-indicator"
import { renderCounter } from "@/functions/render_counter"

export default function ChatUI() {

  ///////////////////////// Render Counter ////////////////////////////
  const counterRef = useRef(0)
  counterRef.current = renderCounter({ counter: counterRef.current })
  console.log(`ChatUI rendered ${counterRef.current} times`)
  /////////////////////////////////////////////////////////////////////

  const savedStr = localStorage.getItem("settings")
  const saved: Voice = savedStr ? JSON.parse(savedStr) : { languageCode: "en-US", voiceName: "en-US-Chirp3-HD-Sadachbia", voiceGender: "MALE" }

  const [loading, setLoading] = useState<boolean>(false)
  const [hasInput, setHasInput] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [settingsData, setSettingsData] = useState(saved)
  const [isSplitScreen, setIsSplitScreen] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const suggestionFormRef = useRef<HTMLFormElement>(null)
  const suggestionInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const userData = JSON.parse(useLoaderData()) as UserData
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
            "userData": actionData.output.userData
          },
        },
      ])
    } else {
      console.log("error")
    }
  }, [actionData])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [isSplitScreen])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value as string
    setInputValue(content)

    if ((content.trim().length > 0) !== hasInput) {
      setHasInput(content.trim().length > 0)
    }
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

    console.log(data)
    if (!data.trim()) {
      return
    }
    setInputValue(data)
    // setMessages((prev) => [
    //   ...prev,
    //   {
    //     id: nanoid(),
    //     role: "user",
    //     content: data
    //   }
    // ])
    // setLoading(true)
    // setInputValue("")
    // setHasInput(false)
  }

  const handleSpeak = async (text: string) => {
    setIsSpeaking(true)
    console.log(settingsData, "from handle Speak")
    await playSpeech(text, settingsData.voiceName, settingsData.voiceGender, settingsData.languageCode)
    setIsSpeaking(false)
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
                <ChatMessages messages={messages} onSubmit={handleSubmit} onClick={handleClick} onSpeak={handleSpeak} isSpeaking={isSpeaking} suggestionFormRef={suggestionFormRef} suggestionInputRef={suggestionInputRef} />
              ) : (
                <div className="rounded-lg p-4">
                  <span className="text-muted-foreground text-3xl font-semibold">
                    {userData.profile.name !== "" ? `Hello ${userData.profile.name}! 👋 What subject would you like to discuss?` : "Hello! What subject would you like to discuss?"}

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
                  <ChatMessages
                    messages={messages}
                    onSubmit={handleSubmit}
                    onClick={handleClick}
                    onSpeak={handleSpeak}
                    isSpeaking={isSpeaking}
                    suggestionFormRef={suggestionFormRef}
                    suggestionInputRef={suggestionInputRef}
                  />
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
