import { Send, User, Bot, Mic, Plus } from "lucide-react"

export default function DemoChatUI() {
  // Demo conversation data
  const messages = [
    {
      id: 1,
      role: "user",
      content: "Hi",
    },
    {
      id: 2,
      role: "assistant",
      content: "Hi! How can I help you today?",
    },
    {
      id: 3,
      role: "user",
      content: "I want to generate a landing page for my startup",
    },
    {
      id: 4,
      role: "assistant",
      content:
        "I'd be happy to help you create a landing page for your startup! To get started, could you tell me:\n\n• What's your startup about?\n• Who is your target audience?\n• What key message or value proposition do you want to highlight?\n• Do you have any specific design preferences or examples you like?\n\nOnce I know more about your startup, I can help you create an effective landing page that converts visitors into customers.",
    },
    {
      id: 5,
      role: "user",
      content: "It's a SaaS tool for project management, targeting small teams",
    },
    {
      id: 6,
      role: "assistant",
      content:
        'Perfect! A project management SaaS for small teams is a great niche. Here\'s what I\'d recommend for your landing page:\n\n**Hero Section:**\n• Headline: "Streamline Your Team\'s Workflow"\n• Subheading: "The simple project management tool that small teams actually want to use"\n• Clear CTA button: "Start Free Trial"\n\n**Key Features to Highlight:**\n• Task management & collaboration\n• Team communication tools\n• Progress tracking & reporting\n• Easy setup (no complex configuration)\n\n**Social Proof:**\n• Customer testimonials from small team leaders\n• Usage statistics or customer logos\n\nWould you like me to create the actual code for this landing page, or would you prefer to discuss the design and messaging further?',
    },
  ]

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-lg font-semibold text-gray-900">ChatGPT</h1>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.map((message, index) => {
            console.log(index)
            return (
              <div
                key={message.id}
                className={`group px-4 py-6 ${message.role === "assistant" ? "bg-gray-50" : "bg-white"
                  } border-b border-gray-100 last:border-b-0`}
              >
                <div className="flex gap-4 max-w-4xl mx-auto">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-sm flex items-center justify-center ${message.role === "user" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                        }`}
                    >
                      {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="prose prose-gray max-w-none">
                      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">{message.content}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Typing Indicator */}
          <div className="group px-4 py-6 bg-gray-50 border-b border-gray-100">
            <div className="flex gap-4 max-w-4xl mx-auto">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-sm bg-green-500 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 py-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area - Large ChatGPT Style */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="relative">
            {/* Large Input Container */}
            <div className="flex bg-white border border-gray-300 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-200 focus-within:shadow-lg focus-within:border-gray-400 min-h-[56px]">
              {/* Tools Button */}
              <div className="flex items-end p-3">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Tools</span>
                </button>
              </div>

              {/* Text Input */}
              <div className="flex-1 min-h-[56px] max-h-[200px] flex items-center">
                <textarea
                  placeholder="Ask anything..."
                  className="w-full resize-none border-0 bg-transparent px-2 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 text-base leading-6"
                  style={{
                    minHeight: "56px",
                    maxHeight: "200px",
                    scrollbarWidth: "thin",
                  }}
                  rows={1}
                />
              </div>

              {/* Right Side Buttons */}
              <div className="flex items-end p-3 gap-2">
                {/* Microphone Button */}
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <Mic className="w-5 h-5" />
                </button>

                {/* Send Button */}
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Footer Text */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">ChatGPT can make mistakes. Check important info.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
