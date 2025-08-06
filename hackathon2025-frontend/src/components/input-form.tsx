import React from "react"
import { Form } from "react-router-dom"
import SendButton from "./send-button"
import { SettingsSheet } from "./settings-sheet"
import { VoiceInput } from "./voice-input"
import TextInput from "./text-input"
import type { Voice } from "@/types"

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
  return (
    <Form method="post" className="relative" onSubmit={onSubmit} ref={formRef}>
      <div className="flex-1 min-h-[56px] max-h-[200px] flex items-center">
        <div className="relative w-full">
          {/* Large Input Container */}
          <div className="flex flex-col bg-card border border-border rounded-3xl shadow-sm hover:shadow-lg transition-all duration-200 focus-within:shadow-lg focus-within:border-ring min-h-[56px]">
            {/* Text Input */}
            <TextInput inputValue={inputValue} onChange={onChange} onKeyDown={onKeyDown} />

            {/* Footer Buttons */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-border">
              {/* Settings Button */}
              <SettingsSheet onData={onData} />
              <div className="flex gap-2">
                {/* Microphone Button */}
                <VoiceInput onResult={onResult} />
                {/* Send Button */}
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