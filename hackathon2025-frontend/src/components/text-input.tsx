import { Textarea } from "./ui/textarea"

type TextInputProps = {
  inputValue: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

function TextInput({ inputValue, onChange, onKeyDown }: TextInputProps) {
  return (
    <div className="flex-1 flex items-center px-3 py-3">
      <Textarea
        name="content"
        placeholder="Ask anything..."
        className=" custom-scrollbar w-full px-3 py-2 resize-none border-0 rounded-2xl bg-transparent shadow-none text-foreground placeholder-muted-foreground focus:outline-none focus-visible:ring-0 focus:ring-0 text-base leading-6"
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
  )
}

export default TextInput