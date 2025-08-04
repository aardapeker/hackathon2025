import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import type { Question } from "@/types"
import { useState } from "react"

function Quiz({ questions }: { questions: Question[] }) {
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)


  const handleNext = () => {
    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)

    }
  }
  return (
    <div className="min-h-screen bg-gray-950 dark:bg-gray-950 light:bg-gradient-to-br light:from-purple-50 light:via-pink-50 light:to-purple-100 flex items-center justify-center p-4">
      <Card className="neon-card w-full max-w-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20 light:from-white light:via-purple-50/50 light:to-pink-50/50 border border-purple-500/20 dark:border-purple-500/20 light:border-purple-300/30">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl font-bold text-white dark:text-white light:text-gray-800">
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardTitle>
            {/* <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="w-5 h-5 text-white dark:text-white light:text-gray-700" />
              <span className={`${timeLeft <= 10 ? "text-red-400" : "text-white dark:text-white light:text-gray-700"}`}>
                {timeLeft}s
              </span>
            </div> */}
          </div>

          {/* Progress bar */}
          {/* <div className="space-y-2">
            <Progress value={progressPercentage} className="w-full" />
            <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 text-center">
              {Math.round(progressPercentage)}% Complete
            </p>
          </div> */}

          {/* Timer bar */}
          {/* <div className="w-full bg-gray-700 dark:bg-gray-700 light:bg-gray-200 rounded-full h-2 mt-4">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${getTimerColor()}`}
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div> */}
        </CardHeader>

        <CardContent className="space-y-6">
          <h2 className="text-xl font-semibold leading-relaxed text-white dark:text-white light:text-gray-800">
            {questions[currentQuestionIndex].questionText}
          </h2>

          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-3">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-gray-800/50 dark:hover:bg-gray-800/50 light:hover:bg-purple-50/50 ${selectedAnswer === index.toString()
                  ? "border-purple-400 bg-purple-900/30 dark:border-purple-400 dark:bg-purple-900/30 light:border-purple-500 light:bg-purple-100/50"
                  : "border-purple-400/30 dark:border-purple-400/30 light:border-purple-300/40"
                  }`}
                onClick={() => setSelectedAnswer(index.toString())}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} className="text-purple-400" />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer text-lg text-white dark:text-white light:text-gray-800"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              size="lg"
              className="neon-button bg-gradient-to-r from-pink-700 to-purple-800 hover:from-pink-800 hover:to-purple-950 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === 4 ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Quiz