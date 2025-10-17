import type { Output, PracticeResponse, UserData, Voice } from "~/types"

import { useEffect, useRef, useState } from "react"

import { nanoid } from 'nanoid'
import ReactMarkdown from "react-markdown"

import Quiz from "./quiz"
import InputForm from "./input-form"
import ChatMessages from "./chat-messages"
import TypingIndicator from "./typing-indicator"

import { MessageSquare, Volume2 } from "lucide-react"

import { Button } from "./ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"

import { useLoading } from "~/hooks/use-loading"
import { useIsMobile } from "~/hooks/use-mobile"
import { useIsDesktop } from "~/hooks/use-desktop"
import { useMessages } from "~/hooks/use-messages"

import playSpeech from "~/functions/play_speech"
import { renderCounter } from "~/functions/render_counter"

import { initialVoiceSettings } from "~/constants/initial_profile"

type ChatUIProps = {
  loaderData: string,
  actionData: PracticeResponse | undefined
}

export default function ChatUI({ loaderData, actionData }: ChatUIProps) {

  ///////////////////////// Render Counter ////////////////////////////
  const counterRef = useRef(0)
  counterRef.current = renderCounter({ counter: counterRef.current })
  console.log(`ChatUI rendered ${counterRef.current} times`)
  /////////////////////////////////////////////////////////////////////

  const savedStr = localStorage.getItem("settings")
  const saved: Voice = savedStr ? JSON.parse(savedStr) : initialVoiceSettings

  const [settingsData, setSettingsData] = useState(saved)
  const [isSplitScreen, setIsSplitScreen] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const { addAssistantMessage, messages } = useMessages()
  const { isLoading } = useLoading()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const processedActionRef = useRef<string | null>(null)

  const userData = JSON.parse(loaderData) as UserData

  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (!actionData) {
      return
    }

    const key = JSON.stringify(actionData)
    if (processedActionRef.current === key) {
      return
    }

    processedActionRef.current = key
    if (actionData.mode === "QUIZ") {
      setIsSplitScreen(true)
    }

    console.log(actionData)

    addAssistantMessage({
      id: nanoid(),
      role: "assistant",
      content: {
        originalInput: actionData.output.originalInput,
        chatOutput: actionData.output.chatOutput,
        fixedInput: actionData.output.fixedInput,
        fixSteps: actionData.output.fixSteps,
        nextChatMessages: actionData.output.nextChatMessages,
        userData: actionData.output.userData
      }
    })

  }, [actionData, addAssistantMessage])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [isSplitScreen])

  const handleSpeak = async (text: string) => {
    setIsSpeaking(true)
    console.log(settingsData, "from handleSpeak")
    await playSpeech(text, settingsData.voiceName, settingsData.voiceGender, settingsData.languageCode)
    setIsSpeaking(false)
  }

  const handleData = (data: Voice) => {
    console.log(data)
    setSettingsData(data)
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {isSplitScreen ?
        isMobile ? (
          // Mobile layout (if the screen size is less than 768px)
          <div className="flex flex-1 overflow-hidden mx-auto">
            {/* Quiz */}
            <div className="border-border flex flex-col w-screen custom-scrollbar overflow-y-auto">
              <div className="flex-1 flex items-center justify-center">
                {actionData !== undefined && <Quiz questions={actionData.quizOutput.questions} onSetSplit={(data) => setIsSplitScreen(data)} />}
              </div>
            </div>
            {/* Chatbot Message */}
            <Drawer defaultOpen>
              <DrawerTrigger asChild>
                <Button variant="outline" aria-label="Open chat drawer" title="Open chat" className="fixed right-4 bottom-4 w-12 h-12 rounded-full z-50">
                  <MessageSquare />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full custom-scrollbar overflow-y-auto">
                  <DrawerHeader>
                    <DrawerTitle>Chat Output</DrawerTitle>
                    <DrawerDescription>
                      Answer the questions to continue the conversation.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="mx-6">
                    <span className="ml-2">
                      <ReactMarkdown>
                        {(messages[messages.length - 1].content as Output).chatOutput}
                      </ReactMarkdown>
                    </span>
                    <Button
                      type="button"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:disabled:text-muted-foreground transition-colors duration-200 disabled:cursor-not-allowed"
                      disabled={!(messages[messages.length - 1].content as Output).chatOutput || isSpeaking}
                      onClick={() => handleSpeak((messages[messages.length - 1].content as Output).chatOutput)}
                    >
                      <Volume2 />
                    </Button>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button>Go to Quiz</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        ) : isDesktop ? (
          // Desktop layout (if the screen size is greater than 1200px)
          <div className="flex flex-1 overflow-hidden">
            <div className="w-1/3 border-r border-border flex flex-col custom-scrollbar overflow-y-auto">
              <div className="flex-1 flex items-center justify-center">
                {actionData !== undefined && <Quiz questions={actionData.quizOutput.questions} onSetSplit={(data) => setIsSplitScreen(data)} />}
              </div>
            </div>
            <div className="w-2/3 flex flex-col custom-scrollbar overflow-y-auto">
              {/* Messages Container */}
              <div className="flex-1">
                <div className={` max-w-4xl px-3 mx-auto ${messages.length === 0 ? "flex flex-col justify-end items-center h-full" : ""}`}  >
                  <ChatMessages
                    onSpeak={handleSpeak}
                    isSpeaking={isSpeaking}
                  />
                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Tablet or small laptop screen layout (when the screen size is between 768px and 1200px)
          <div className="flex flex-1 overflow-hidden">
            <div className="w-1/2 border-r border-border flex flex-col custom-scrollbar overflow-y-auto">
              <div className="flex-1 flex items-center justify-center">
                {actionData !== undefined && <Quiz questions={actionData.quizOutput.questions} onSetSplit={(data) => setIsSplitScreen(data)} />}
              </div>
            </div>

            <div className="w-1/2 flex flex-col custom-scrollbar overflow-y-auto">
              {/* Messages Container */}
              <div className="flex-1">
                <div className={` max-w-4xl px-3 mx-auto ${messages.length === 0 ? "flex flex-col justify-end items-center h-full" : ""}`}  >
                  <ChatMessages
                    onSpeak={handleSpeak}
                    isSpeaking={isSpeaking}
                  />
                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Messages Container */}
            <div className="flex-1 custom-scrollbar overflow-y-auto overflow-x-hidden">
              <div className={` max-w-4xl px-3 mx-auto ${messages.length === 0 ? "flex flex-col justify-end items-center h-full" : "transform translate-x-1"}`}  >
                {messages.length !== 0 ? (
                  <ChatMessages
                    onSpeak={handleSpeak}
                    isSpeaking={isSpeaking}
                  />
                ) : (
                  <div className="rounded-lg p-4">
                    <span className="text-muted-foreground text-3xl font-semibold">
                      {userData.profile.name !== "" ? `Hello ${userData.profile.name}! 👋 What subject would you like to discuss?` : "Hello! What subject would you like to discuss?"}
                    </span>
                  </div>
                )}

                {/* Typing Indicator */}
                {isLoading && <TypingIndicator />}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className={`border-border bg-background ${messages.length === 0 ? "h-2/3" : "border-t h-auto"}`}>
              <div className="max-w-4xl mx-auto px-3 py-6">
                <InputForm onData={handleData} />
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}
