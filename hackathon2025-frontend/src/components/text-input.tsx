/* eslint-disable react-hooks/refs */
import React, { useEffect, useRef } from "react"
import { useState } from "react"

import { Textarea } from "./ui/textarea"

import { renderCounter } from "@/functions/render_counter"

interface TextInputProps {
  formRef: React.RefObject<HTMLFormElement | null>
  newInputValue: string
  onInputValue: (value: string) => void
}

function TextInput({ formRef, newInputValue, onInputValue }: TextInputProps) {

  ///////////////////////// Render Counter ////////////////////////////
  const counterRef = useRef(0)
  counterRef.current = renderCounter({ counter: counterRef.current })
  console.log(`TextInput rendered ${counterRef.current} times`)
  /////////////////////////////////////////////////////////////////////

  const [inputValue, setInputValue] = useState(newInputValue)

  useEffect(() => {
    setInputValue(newInputValue)
    // This effect resets the value and synchronizes the voice input with the text input.
  }, [newInputValue])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()

      if (!inputValue.trim()) return

      formRef?.current?.requestSubmit()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value as string

    setInputValue(content)

    if (content.trim().length < 2) {
      // Render the parent component only if the content length is 1 or 0.
      onInputValue(content)
    }
  }

  return (
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
  )
}

export default TextInput