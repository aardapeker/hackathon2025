import type { Voice } from "@/types"

import React, { useRef } from "react"
import { Form } from "react-router-dom"

import { Textarea } from "./ui/textarea"
import SendButton from "./send-button"
import { VoiceInput } from "./voice-input"
import { SettingsSheet } from "./settings-sheet"
import { renderCounter } from "@/functions/render_counter"

type InputFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  onData: (data: Voice) => void
  onResult: (transcript: string, isFinal: boolean) => void
  inputValue: string
  hasInput: boolean
  formRef: React.RefObject<HTMLFormElement | null>
}

function InputForm({
  onSubmit,
  onChange,
  onKeyDown,
  onData,
  onResult,
  inputValue,
  hasInput,
  formRef
}: InputFormProps) {

  ///////////////////////// Render Counter ////////////////////////////
  const counterRef = useRef(0)
  counterRef.current = renderCounter({ counter: counterRef.current })
  console.log(`InputForm rendered ${counterRef.current} times`)
  /////////////////////////////////////////////////////////////////////

  return (
    <Form method="post" className="relative" onSubmit={onSubmit} ref={formRef}>
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
                onChange={onChange}
                onKeyDown={onKeyDown}
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
                <VoiceInput onResult={onResult} />
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