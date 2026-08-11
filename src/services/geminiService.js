/**
 * Gemini AI Service — Handles communication with the Google Gemini API
 * for the AI Tutor chat feature. Never exposes the API key publicly.
 */

const getApiKey = () => (import.meta.env.VITE_GEMINI_API_KEY || "").trim();

const MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
];

/**
 * Build a kid-safe, course-contextual system instruction for the tutor.
 */
export const buildSystemPrompt = (tutor, course, currentModule) => {
  const moduleContext = currentModule
    ? `The student is currently working on: "${currentModule.title}" — ${currentModule.desc}`
    : "";

  return `You are "${tutor.name}", a friendly and encouraging AI tutor for kids and teens (ages 7–16) on the learning platform Learntopia.

YOUR PERSONA:
- Name: ${tutor.name}
- Role: ${tutor.role}
- Personality: Warm, patient, playful, and super encouraging. Use simple language. Add the occasional emoji to keep things fun.

COURSE CONTEXT:
- Course: "${course.title}"
- Subject: ${course.category}
- Difficulty: ${course.difficulty}
- Course Description: ${course.desc}
${moduleContext ? `- Current Module: ${moduleContext}` : ""}

RULES (STRICTLY FOLLOW):
1. ONLY answer questions related to the course subject (${course.category}). If asked about something off-topic, gently redirect: "Great question! But I'm your ${course.category} buddy — let's stick to our topic! 😊"
2. Keep responses SHORT (2-4 paragraphs max). Kids lose attention with long walls of text.
3. Use simple, age-appropriate language. Explain complex concepts with fun analogies and real-world examples.
4. NEVER provide harmful, violent, sexual, or inappropriate content. This is a kids' platform.
5. NEVER share personal opinions on politics, religion, or controversial topics.
6. Encourage the student frequently. Use phrases like "Great question!", "You're doing amazing!", "That's a smart way to think about it!"
7. If the student seems stuck, give hints rather than full answers — help them learn by discovery.
8. Use code blocks (\`\`\`) when showing code examples (for programming courses).
9. If you don't know something, say so honestly: "Hmm, I'm not 100% sure about that! Let's figure it out together."
10. Respond in the same language the student writes in.`;
};

/**
 * Send a message to Gemini and get the AI response.
 */
export const sendMessageToGemini = async (chatHistory, userMessage, systemPrompt) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error("VITE_GEMINI_API_KEY is missing in import.meta.env");
    throw new Error(
      "Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file and restart your Vite dev server."
    );
  }

  // Build the contents array for the Gemini API
  const contents = [];
  for (const msg of chatHistory) {
    contents.push({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    });
  }
  contents.push({
    role: "user",
    parts: [{ text: userMessage }],
  });

  const requestBody = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ],
  };

  let lastError = null;

  for (const modelName of MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`Gemini API error with model ${modelName}:`, response.status, errorData);
        if (response.status === 429) {
          throw new Error("RATE_LIMIT");
        }
        lastError = new Error(errorData?.error?.message || `API returned status ${response.status}`);
        continue; // Try next model
      }

      const data = await response.json();
      const candidate = data?.candidates?.[0];
      if (!candidate) {
        if (data?.promptFeedback?.blockReason) {
          return "I can't answer that question. Let me help you with something related to our course! 😊";
        }
        continue;
      }

      const text = candidate.content?.parts?.[0]?.text;
      if (!text) {
        if (candidate.finishReason === "SAFETY") {
          return "I can't answer that question. Let's focus on our course topic! 😊";
        }
        continue;
      }

      return text;
    } catch (err) {
      if (err.message === "RATE_LIMIT") {
        throw err;
      }
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to get response from Gemini AI.");
};
