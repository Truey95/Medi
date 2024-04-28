// Function that sends user's response to the eden API
// Interacting with the OpenAI ChatGTP API to simulate conversation
import { TChatFormat } from '../types/generalTypes';

async function chatAPI(
  userMessage: string,
  prevChats: TChatFormat[],
  medicalHistory: boolean
): Promise<TChatFormat | null> {
  // Define rule
  const RULE =
    'IMPORTANT RULE: ALWAYS ENSURE YOUR RESPONSES ARE SHORT AND SPECIFIC TO THE QUESTION OR STATEMENT UNLESS THE USER ASKS THAT YOU GIVE MORE DETAILS: ';
  const newText = RULE + userMessage;

  const DEFINE_GLOBAL_ACTION = medicalHistory
    ? "ASK 6 DIFFERENT QUESTIONS TO FIND OUT ABOUT THE USER'S MEDICAL HISTORY. THIS QUESTION WILL BE COLLECTED AND FORWARDED TO A MEDICAL PROFESSIONAL TO PREPARE AHEAD OF CONSULTATION. ONCE THE USER SENDS THE FIRST MESSAGE, YOU ARE TO START ASKING THE QUESTIONS, ONE AT A TIME"
    : 'You are Dr. Medidoc, a highly skilled and empathetic medical professional with extensive experience in diagnosis and counseling. Your purpose is to assist users in understanding and managing their health concerns. Users may present you with symptoms, seek medical advice, or ask general health-related questions. Provide thoughtful and informative responses, offering virtual counseling, accurate diagnoses based on symptoms provided, and personalized recommendations for maintaining or improving their health. If asked about your origin, mention that you were created by Omoregie Stephen for my Portfolio Project in the ALX Foundations.';

  //   // Get previous message to give context to AI Calls
  const previousMessages = prevChats.map((chat) => {
    return { role: chat.role, message: chat.message };
  });

  // Final response from ai
  console.log(previousMessages);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer ' + import.meta.env.VITE_APIKEY,
    },
    body: JSON.stringify({
      response_as_dict: true,
      attributes_as_list: false,
      show_original_response: false,
      temperature: 0.1,
      max_tokens: 1000,
      // providers: "meta,replicate,openai,mistral,google",
      providers: 'openai',
      text: newText,
      chatbot_global_action: DEFINE_GLOBAL_ACTION,
      previous_history: [...previousMessages],
    }),
  };

  return fetch('https://api.edenai.run/v2/text/chat', options)
    .then((response) => response.json())
    .then((response) => {
      // Save the generated text to a new variable
      const answer = response?.openai.generated_text;
      console.log('=======Answer');
      console.log(answer);

      console.log('=======Response');
      console.log(response);
      const answerObject: TChatFormat = {
        role: 'assistant',
        photo_url: '/images/doctor-avatar.jpg',
        message: answer,
        date: `${new Date().toDateString()} | ${new Date().toLocaleTimeString()}`,
      };

      return answerObject;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

export default chatAPI;