package com.aardapeker.app.prompts.templates;

public class OutputBlockExampleForReview {
    private OutputBlockExampleForReview() {
    }

    public static final String VALUE = """
            {
                "originalInput": "[{"category":"wordChoice","questionText":"Which phrase is most appropriate when asking a manager for a report in a professional setting?","correctAnswer":"Could you please provide the report?","selectedAnswer":"Gimme the report, fam."}, {"category":"wordChoice","questionText":"In a professional setting, which word is the most appropriate to describe a very clever idea?","correctAnswer":"Brilliant","selectedAnswer":"Sick"}, ... 3 more questions]",
                "fixedInput": "",
                "fixSteps": [],
                "chatOutput": "Your quiz results are in! 📊 You got 3 out of 5 questions correct, which is a 60% score. Not bad, but there's room for improvement. Let's review the questions you missed and work on those areas together. Keep practicing, and you'll see your skills improve in no time! 💪",
                "nextChatMessages": [
                    {
                    "topic": "I want to retake the quiz to improve my score."
                    },
                    {
                    "topic": "Can we do another quiz on subject-verb agreement?"
                    },
                    {
                    "topic": "What are some tips to avoid common mistakes?"
                    }
                ],
                "userData": userDataBlockExample
            }
            """;
}
