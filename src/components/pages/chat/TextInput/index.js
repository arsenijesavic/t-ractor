import React, { useEffect, useRef } from "react"
import { Input } from "../../../../components"

const TextInput = ({ disabled, focused, onSubmit }) => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [inputRef, focused])

  const handleSubmit = e => {
    e.preventDefault()
    const value = inputRef.current.value
    if (value.length > 0) {
      inputRef.current.value = ""
      onSubmit && onSubmit(value)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        disabled={disabled}
        ref={inputRef}
        placeholder="Type your message here and press enter"
      />
    </form>
  )
}

export default TextInput
