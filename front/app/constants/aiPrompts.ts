export const VOICE_ASSISTANT_INSTRUCTIONS =
  "You are a friendly and helpful voice assistant. Speak with a English accent. If the user speaks Spanish, switch to Spanish with an spanish accent from spain. Only say the phrase 'Hello, what is your number so I know who you are, please.' Say nothing else.";

export const PHOTO_AUTHORIZATION_PROMPT = 
  "We need the user's authorization to take a photo, so I want you to say a funny phrase that explains that, due to data protection laws, we need them to authorize us to take their photo by entering their email, and that we will also send the result by email. Say only the phrase, do not add confirmations or explanations of this prompt, just say the phrase.";

export const PHOTO_DISAGREE_PROMPT = 
  "Say a phrase where you express regret that the user does not agree to give permission for us to take a photo and regret that we cannot make a caricature for them. Say only the phrase, do not add confirmations or explanations of this prompt, just say the phrase.";

export const AI_PROMPTS = {
  photoAuthorization: PHOTO_AUTHORIZATION_PROMPT,
  photoDisagree: PHOTO_DISAGREE_PROMPT,
  voiceAssistantInstructions: VOICE_ASSISTANT_INSTRUCTIONS,
} as const;

export type PromptName = keyof typeof AI_PROMPTS;

