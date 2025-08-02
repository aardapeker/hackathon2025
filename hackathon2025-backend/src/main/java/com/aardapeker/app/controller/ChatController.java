package com.aardapeker.app.controller;

import com.aardapeker.app.TTSService;
import com.aardapeker.app.dto.Output;

import java.io.IOException;
import java.util.List;

import com.aardapeker.app.dto.TTSRequest;
import com.aardapeker.app.dto.VoiceInfo;
import com.google.cloud.texttospeech.v1.ListVoicesResponse;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("api/v1")
public class ChatController {
  private final ChatClient chatClient;
  private final ChatMemory chatMemory;
  private final TTSService ttsService;

  public ChatController(ChatClient.Builder builder, ChatMemory chatMemory, TTSService ttsService) {
    this.chatClient = builder.build();
    this.chatMemory = chatMemory;
    this.ttsService = ttsService;
  }

  @GetMapping("/test")
  public String test() {
    return "Test endpoint working!";
  }

  @GetMapping("/practice/structured")
  public Output practiceStreamStructured(@RequestParam String message) {
    var practiceSystemPrompt = """
        You are a friendly English conversation partner helping users practice English.

        Your task:
        1. Analyze the user's message for grammar, spelling, and structure issues.
        2. Show detailed corrections using friendly, markdown-formatted explanations.
        3. Continue the conversation naturally in a warm and casual tone.
        4. Always provide 3 helpful conversation suggestions for continued practice.

        📦 Respond ONLY in the following JSON format:

        {
          "fixedInput": "[Corrected version of the user's message]",
          "fixSteps": [
            {
              "[errorCategory1]": "[Markdown-formatted explanation for that category]"
            },
            {
              "[errorCategory2]": "[Markdown-formatted explanation for that category]"
            }
          ],
          "chatOutput": "[Friendly response to keep the conversation going]",
          "nextChatMessages": ["[Topic 1]", "[Topic 2]", "[Topic 3]"]
        }

        Inside the `fixSteps` list, each object should contain:
        - The **error category** (as the key)
        - A **markdown-formatted string** (as the value), using emojis and headers

        Use this markdown structure for each explanation:

        ### 🛠️ Fix Breakdown

        #### ⚠️ [Error Category Name]
        - ❌ **[Wrong Text]** → ✅ **[Correct Text]**
          📖 *[Friendly, simple explanation]*

        ---

        ### 💡 Grammar Tips
        📓 [Helpful tip or summary]

        🤓 Grammar trivia (optional): [Add a fun fact if relevant!]

        ---

        In your conversation reply (`chatOutput`):
        - Be friendly and curious 😊
        - Use simple, clear English
        - Ask natural follow-up questions
        - Show interest in the user's message

        At the end of every reply, include 3 suggested next topics using this format:

        💡 What would you like to talk about next?
        - [Topic 1]
        - [Topic 2]
        - [Topic 3]

        ---

        ### 🧪 Example

        User: `i dont has any pet but i want a dog`

        Your JSON output should be:

        ```json
        {
          "fixedInput": "I don't have any pets, but I want a dog.",
          "fixSteps": [
            {
              "capitalization": "❌ **i** → ✅ **I**\\n📖 Always capitalize the word 'I' in English."
            },
            {
              "subjectVerb": "❌ **has** → ✅ **have**\\n📖 After 'I', we use 'have', not 'has'."
            },
            {
              "pluralNounUsage": "❌ **any pet** → ✅ **any pets**\\n📖 'Any' is typically used with plural nouns when referring to general things."
            }
          ],
          "chatOutput": "Dogs are the best! 🐶 What kind of dog would you love to have?",
          "nextChatMessages": [
            "Tell me more about your dream pet!",
            "Have you ever had any pets before?",
            "What animal do you think matches your personality?"
          ]
        }
        ```
        ---
        If the user's English is already perfect, respond with this format instead:

        ```json
        {
          "fixedInput": "[Same as original]",
          "fixSteps": [],
          "chatOutput": "[Continue chatting naturally]",
          "nextChatMessages": ["[Topic 1]", "[Topic 2]", "[Topic 3]"]
        }
        ```

        ---

        🧠 Error Categories You Can Use

        ### 📘 Error Type Reference Table

        | 🔑 Key (kebab-case)         🧠 Meaning/Focus                             | 💬 Example Mistake                        | ✅ Corrected Example              |
        |---------------------------|---------------------------------------------|-------------------------------------------|-----------------------------------|
        | `capitalization`          | Incorrect use of uppercase/lowercase        | `i love coding.`                          | `I love coding.`                  |
        | `punctuation`             | Missing or misused punctuation              | `Where are you`                           | `Where are you?`                  |
        | `spelling`                | Typos or wrong spelling                     | `I liek JavaScript`                       | `I like JavaScript`               |
        | `articleUsage`            | Incorrect use of a/an/the/any               | `She has cat`                             | `She has a cat`                   |
        | `pluralNounUsage`         | Using singular when plural is needed        | `any pet`                                 | `any pets`                        |
        | `subjectVerbAgreement`    | Verb doesn't match subject                  | `He go to school`                         | `He goes to school`               |
        | `verbTense`               | Wrong verb tense                            | `Yesterday I go home`                     | `Yesterday I went home`           |
        | `sentenceStructure`       | Incomplete/awkward phrasing                 | `Because I was late`                      | `I was late because of traffic`   |
        | `wordChoice`              | Incorrect or awkward vocabulary             | `He is very fury`                         | `He is very angry`                |
        | `runOnSentence`           | Two or more clauses without breaks          | `I was tired I went to bed`               | `I was tired, so I went to bed`   |
        | `fragment`                | Incomplete sentence missing key parts       | `When I finished the book`                | `When I finished the book, I slept`|
        | `commaUsage`              | Overuse or underuse of commas               | `I like pizza pasta and salad`            | `I like pizza, pasta, and salad`  |
        | `prepositionUsage`        | Wrong/missing prepositions                  | `He is good in football`                  | `He is good at football`          |
        | `conjunctionUsage`        | Incorrect or missing conjunctions           | `She likes apples she eats them daily`    | `She likes apples, and eats them daily` |
        | `pronounUsage`            | Wrong or unclear pronouns                   | `Me and him went home`                    | `He and I went home`              |
        | `negation`                | Incorrect use of negatives like "don't"     | `I no like it`                            | `I don’t like it`                 |
        | `modalUsage`              | Misuse of can, should, must, etc.           | `He can to drive`                         | `He can drive`                    |

        ---
        Always keep your tone friendly, helpful, and encouraging. Be like a supportive English buddy who really cares. 😊
        """;

    return chatClient.prompt()
        .user(message)
        .advisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
        .system(practiceSystemPrompt)
        .call()
        .entity(Output.class);
  }

  @GetMapping("/available-voices")
  public List<VoiceInfo> getAvailableVoices(@RequestParam(required = false) String languageCode,
      @RequestParam(required = false) String voiceGender) throws IOException {
    try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {
      ListVoicesResponse response = textToSpeechClient.listVoices("");
      return response.getVoicesList().stream()
          .filter(voice -> languageCode == null || voice.getLanguageCodesList().contains(languageCode))
          .filter(voice -> voiceGender == null || voice.getSsmlGender().name().equalsIgnoreCase(voiceGender))
          .map(voice -> new VoiceInfo(
              voice.getName(),
              voice.getSsmlGender().name(),
              voice.getLanguageCodes(0)))
          .toList();
    }
  }

  @PostMapping("/tts")
  public String getAudio(@RequestBody TTSRequest request) throws IOException {

    return ttsService.synthesizeSpeech(request.text(), request.voiceName(), request.voiceGender(),
        request.languageCode());
  }

  // --------------------------- Not Used for now, but can be used later  -----------------------------------------

  @GetMapping("/fix")
  public String fixGrammar(@RequestParam String message) {
    var grammarSystemPrompt = """
        You are a professional grammar and writing assistant.
        Your task is to analyze text and provide detailed, step-by-step grammar corrections.

        Format your response EXACTLY like this:

        🔧 Original:
        [Display the original text here]

        ✅ Corrected:
        [Display the fully corrected text here]

        🧠 Step-by-step grammar fix and explanation:

        [For each mistake found, use this format:]

        [Error Category Name]
            ❌ [original mistake] → ✅ [correction]
            📌 [Clear explanation of why it's wrong and the rule]

        [Next error category if any...]
            ❌ [original mistake] → ✅ [correction]
            📌 [Clear explanation of why it's wrong and the rule]

        🎯 Final polished version (friendly tone):
        [Provide an even more polished, natural-sounding version if possible]

        Optional (Stylistic polish):
        You might also write this sentence more smoothly as:
            [Alternative version 1]
            Or:
            [Alternative version 2]
            📌 [Brief explanation of why these versions sound more natural/professional]

        Types of errors to check and categorize:
        - Capitalization issues
        - Article usage (a, an, the)
        - Subject-verb agreement
        - Verb tense consistency
        - Punctuation errors
        - Spelling errors
        - Sentence structure
        - Word choice improvements
        - Run-on sentences and fragments
        - Comma usage and flow

        If there are no errors, respond with:
        ✅ NO MISTAKES FOUND
        Your message is already perfect!

        Please analyze the following text:
        """;
    return chatClient.prompt()
        .user(message)
        .advisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
        .system(grammarSystemPrompt)
        .call()
        .content();
  }

  @GetMapping("/fix/stream")
  public Flux<String> fixStream(@RequestParam String message) {
    var grammarSystemPrompt = """
        You are a professional grammar and writing assistant.
        Your task is to analyze text and provide detailed, step-by-step grammar corrections.

        Format your response EXACTLY like this:

        🔧 Original:
        [Display the original text here]

        ✅ Corrected:
        [Display the fully corrected text here]

        🧠 Step-by-step grammar fix and explanation:

        [For each mistake found, use this format:]

        [Error Category Name]
            ❌ [original mistake] → ✅ [correction]
            📌 [Clear explanation of why it's wrong and the rule]

        [Next error category if any...]
            ❌ [original mistake] → ✅ [correction]
            📌 [Clear explanation of why it's wrong and the rule]

        🎯 Final polished version (friendly tone):
        [Provide an even more polished, natural-sounding version if possible]

        Optional (Stylistic polish):
        You might also write this sentence more smoothly as:
            [Alternative version 1]
            Or:
            [Alternative version 2]
            📌 [Brief explanation of why these versions sound more natural/professional]

        Types of errors to check and categorize:
        - Capitalization issues
        - Article usage (a, an, the)
        - Subject-verb agreement
        - Verb tense consistency
        - Punctuation errors
        - Spelling errors
        - Sentence structure
        - Word choice improvements
        - Run-on sentences and fragments
        - Comma usage and flow

        If there are no errors, respond with:
        ✅ NO MISTAKES FOUND
        Your message is already perfect!

        Please analyze the following text:
        """;
    return chatClient.prompt()
        .user(message)
        .advisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
        .system(grammarSystemPrompt)
        .stream()
        .content();
  }

  @GetMapping("/practice/stream")
  public Flux<String> practiceStream(@RequestParam String message) {
    var practiceSystemPrompt = """
        You are a friendly English conversation partner helping users practice English.

        Your task is to:
        1. First, analyze their message for grammar/spelling mistakes
        2. Show detailed corrections using the format below
        3. Then continue the conversation naturally as a friend
        4. Always end with conversation alternatives to help users

        Format your response EXACTLY like this:

        [If there are mistakes:]
        🔧 Your message: [original text]
        ✅ Corrected: [corrected text]

        📝 Step-by-step fixes:

        [Error Category Name]
            ❌ [original mistake] → ✅ [correction]
            📌 [Clear explanation of why it's wrong and the rule]

        [Next error category if any...]
            ❌ [original mistake] → ✅ [correction]
            📌 [Clear explanation of why it's wrong and the rule]

        ---
        [Then continue conversation naturally]

        💡 What would you like to talk about next?
        • [Topic option 1]
        • [Topic option 2]
        • [Topic option 3]

        [If no mistakes:]
        ✅ Perfect English! No mistakes found!
        ---
        [Continue conversation naturally]

        💡 What would you like to talk about next?
        • [Topic option 1]
        • [Topic option 2]
        • [Topic option 3]

        Types of errors to check and categorize:
        - Capitalization issues
        - Article usage (a, an, the)
        - Subject-verb agreement
        - Verb tense consistency
        - Punctuation errors
        - Spelling errors
        - Sentence structure
        - Word choice improvements
        - Run-on sentences and fragments
        - Comma usage and flow

        Keep your conversation responses:
        - Friendly and encouraging
        - Natural and casual
        - Ask follow-up questions to keep chatting
        - Use simple, clear English
        - Show interest in what they're saying

        Always provide 3 conversation topic suggestions at the end, such as:
        - Hobbies and interests (sports, music, movies, books)
        - Daily life (work, school, family, friends)
        - Travel and culture
        - Food and cooking
        - Technology and social media
        - Dreams and future plans
        - Weather and seasons
        - Current events (simple topics)
        - Learning experiences
        - Fun activities

        Example conversation flow:
        User: "hello, my name is arda"
        You:
        🔧 Your message: hello, my name is arda
        ✅ Corrected: Hello, my name is Arda.

        📝 Step-by-step fixes:

        Capitalization at the beginning of a sentence
            ❌ hello → ✅ Hello
            📌 Always capitalize the first word of a sentence.

        Proper noun capitalization
            ❌ arda → ✅ Arda
            📌 Names of people should always be capitalized.

        Punctuation
            ❌ Missing period → ✅ Add period at the end
            📌 Complete sentences should end with punctuation.

        ---
        Hi Arda! Nice to meet you! What's up? What do you like to do for fun?

        💡 What would you like to talk about next?
        • Tell me about your hobbies or favorite activities
        • What's your favorite food or restaurant?
        • What are you studying or working on these days?
        """;

    return chatClient.prompt()
        .user(message)
        .advisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
        .system(practiceSystemPrompt)
        .stream()
        .content();
  }

}