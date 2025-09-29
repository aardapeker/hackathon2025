/* eslint-disable react-hooks/refs */
import type { Voice } from "@/types"

import React, { useRef, useState } from "react"
import { Form } from "react-router-dom"
import { nanoid } from 'nanoid'

import TextInput from "./text-input"
import SendButton from "./send-button"
import { VoiceInput } from "./voice-input"
import { SettingsSheet } from "./settings-sheet"

import { renderCounter } from "@/functions/render_counter"
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
  const [newInputValue, setNewInputValue] = useState("")

  const { addUserMessage } = useMessages()

  const formRef = useRef<HTMLFormElement>(null)

  const handleInput = (value: string) => {
    if (value.trim() !== "" && hasInput === false) {
      setHasInput(true)
      setNewInputValue(value)
      // If I don't set the state like this, the input does not reset after submitting.
    } else if (value.trim() === "" && hasInput === true) {
      setHasInput(false)
      setNewInputValue("")
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const content = e.currentTarget.content.value.trim() as string

    if (content !== "") {
      addUserMessage({
        id: nanoid(),
        role: "user",
        content
      })

      setNewInputValue("")
      setHasInput(false)
    }
  }

  const handleResult = (data: string, isFinal: boolean) => {
    if (!isFinal) return

    if (data.trim() === "") return

    console.log(data, "Voice Input!!")
    setNewInputValue(data)
  }

  return (
    <Form method="post" className="relative" onSubmit={handleSubmit} ref={formRef}>
      <div className="flex-1 min-h-[56px] max-h-[200px] flex items-center">

        <div className="relative w-full">
          {/* Large Input Container */}
          <div className="flex flex-col bg-card border border-border rounded-3xl shadow-sm hover:shadow-lg transition-all duration-200 focus-within:shadow-lg focus-within:border-ring min-h-[56px]">

            {/* Text Input */}
            <div className="flex-1 flex items-center px-3 py-3">
              <TextInput
                formRef={formRef}
                newInputValue={newInputValue}
                onInputValue={handleInput}
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