import type { Voice } from "@/types"

import React, { useRef, useState } from "react"
import { Form } from "react-router-dom"

import { Textarea } from "./ui/textarea"
import SendButton from "./send-button"
import { VoiceInput } from "./voice-input"
import { SettingsSheet } from "./settings-sheet"
import { renderCounter } from "@/functions/render_counter"

import { nanoid } from 'nanoid'
import { useMessages } from "@/hooks/use-messages"


type InputFormProps = {
  onData: (data: Voice) => void
}

function InputForm({
  onData,
}: InputFormProps) {

  ///////////////////////// Render Counter ////////////////////////////
  const counterRef = useRef(0)
  counterRef.current = renderCounter({ counter: counterRef.current })
  console.log(`InputForm rendered ${counterRef.current} times`)
  /////////////////////////////////////////////////////////////////////

  const [hasInput, setHasInput] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState("")


  const { addUserMessage } = useMessages()


  const formRef = useRef<HTMLFormElement>(null)

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
      addUserMessage({
        id: nanoid(),
        role: "user",
        content
      })

      setInputValue("")
      setHasInput(false)
    }
  }

  const handleResult = (data: string, isFinal: boolean) => {
    if (!isFinal) return

    console.log(data)
    if (!data.trim()) {
      return
    }
    console.log(data, "Voice Input!!")
    setInputValue(data)
  }


  return (
    <Form method="post" className="relative" onSubmit={handleSubmit} ref={formRef}>
      <div className="flex-1 min-h-[56px] max-h-[200px] flex items-center">

        <div className="relative w-full">
          {/* Large Input Container */}
          <div className="flex flex-col bg-card border border-border rounded-3xl shadow-sm hover:shadow-lg transition-all duration-200 focus-within:shadow-lg focus-within:border-ring min-h-[56px]">

            {/* Text Input */}
            <div className="flex-1 flex items-center px-3 py-3">
              <Textarea
                name="content"
                placeholder="Ask anything..."
                className="custom-scrollbar w-full px-3 py-2 resize-none border-0 rounded-2xl bg-transparent shadow-none text-foreground placeholder-muted-foreground focus:outline-none focus-visible:ring-0 focus:ring-0 text-base leading-6"
                rows={1}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{
                  maxHeight: "150px",
                  overflowY: "auto"
                }}
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-border">
              <SettingsSheet onData={onData} />
              <div className="flex gap-2">
                <VoiceInput onResult={handleResult} />
                <SendButton hasInput={hasInput} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default InputForm