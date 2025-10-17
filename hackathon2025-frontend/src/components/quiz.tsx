import type { ErrorKey, Question } from "~/types"

import { useRef, useState } from "react"
import { Form, useSubmit } from "react-router"

import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

import { useLoading } from "~/hooks/use-loading"

export type UserAnswer = {
  category: ErrorKey
  questionText: string
  correctAnswer: string
  selectedAnswer: string
}

type QuizProps = {
  questions: Question[],
  onSetSplit: (data: boolean) => void
}

function Quiz({ questions, onSetSplit }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [openAccordions, setOpenAccordions] = useState<string[]>([])

  const { startLoading } = useLoading()

  const formRef = useRef<HTMLFormElement>(null)
  const submit = useSubmit()

  const currentQuestion = questions[currentQuestionIndex]
  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newAnswer: UserAnswer = {
      category: currentQuestion.category,
      questionText: currentQuestion.questionText,
      correctAnswer: currentQuestion.correctAnswer,
      selectedAnswer: currentQuestion.options[+selectedAnswer]
    }
    const newAnswers = [...userAnswers, newAnswer]
    setUserAnswers(newAnswers)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
      setOpenAccordions([])
    } else {
      const formData = new FormData()
      formData.append("quizAnswers", JSON.stringify(newAnswers))
      submit(formData, { method: "post" })
      startLoading()
      onSetSplit(false)
    }
  }

  return (
    <div className="w-full h-full bg-background flex flex-col items-center justify-center p-4">
      <Form className="w-full" ref={formRef} onSubmit={handleNext}>
        <Card className="bg-card">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl font-bold text-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardTitle>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <Progress value={progressPercentage} className="w-full" />
              <p className="text-sm text-foreground text-center">
                {Math.round(progressPercentage)}% Complete
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-xl font-semibold leading-relaxed ">
              {currentQuestion.questionText}
            </h2>
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-3" >
              {currentQuestion.options.map((option, index) => (
                <div className="flex flex-col" key={index}>
                  {/* Later I can simplify these classes. */}
                  <div
                    className={`flex items-center space-x-3 rounded-lg transition-all cursor-pointer hover:bg-accent hover:text-accent-foreground ${selectedAnswer === index.toString()
                      ? `${option === currentQuestion.correctAnswer ? "bg-success hover:bg-success" : "bg-destructive hover:bg-destructive"}  text-accent-foreground`
                      : (selectedAnswer !== "" && currentQuestion.correctAnswer === option ? "bg-success hover:bg-success" : "bg-secondary text-muted-foreground")
                      }`}
                    style={selectedAnswer !== "" ? { pointerEvents: "none" } : {}}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="text-foreground hidden" disabled={selectedAnswer !== ""} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-lg text-balance hover:text-foreground p-4"
                    >
                      {option}
                    </Label>
                  </div>
                  {(selectedAnswer === index.toString() || currentQuestion.correctAnswer === option) && <div className={`p-3 text-muted-foreground ${selectedAnswer === "" && "hidden"}`}>
                    {selectedAnswer !== "" && currentQuestion.explanation[option]}
                  </div>}
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                variant="secondary"
                disabled={!selectedAnswer}
                size="lg"
                className="text-muted-foreground hover:text-accent-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestionIndex === (questions.length - 1) ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Form>
      <Accordion
        type="multiple"
        className="w-full h-0"
        value={openAccordions}
        onValueChange={setOpenAccordions}
      >
        <div className="mb-2 px-1">
          <AccordionItem value={"item-1"}>
            <AccordionTrigger>Hint: </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {currentQuestion.hint}
            </AccordionContent>
          </AccordionItem>
        </div>
      </Accordion>
    </div>
  )
}

export default Quiz
