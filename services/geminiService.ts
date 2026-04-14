
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTravelSuggestions = async (query: string, lang: 'id' | 'en' = 'id') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional travel assistant for "LeFlight". Help the user with this query: "${query}". 
      IMPORTANT: Respond strictly in ${lang === 'id' ? 'Indonesian' : 'English'}. 
      Provide a concise, elegant, and inspiring response. Include a few tips for their destination if mentioned.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return lang === 'id' 
      ? "Maaf, LeFlight AI sedang beristirahat sejenak. Silakan coba beberapa saat lagi."
      : "Sorry, LeFlight AI is taking a short break. Please try again in a few moments.";
  }
};

export const searchFlightsAI = async (origin: string, dest: string, lang: 'id' | 'en' = 'id') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 3-4 realistic mock flight results from ${origin} to ${dest}. 
      Include a realistic status (On Time, Delayed, or Cancelled). 
      Translate statuses to ${lang === 'id' ? 'Indonesian (Tepat Waktu, Terlambat, Dibatalkan)' : 'English (On Time, Delayed, Cancelled)'}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              airline: { type: Type.STRING },
              departureTime: { type: Type.STRING },
              arrivalTime: { type: Type.STRING },
              duration: { type: Type.STRING },
              price: { type: Type.NUMBER },
              stops: { type: Type.INTEGER },
              status: { type: Type.STRING }
            },
            required: ["id", "airline", "departureTime", "arrivalTime", "duration", "price", "stops", "status"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Flight Search Error:", error);
    return [];
  }
};
