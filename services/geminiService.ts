import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BirdSpecies, ConservationStatus, NewsArticle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Schema Definitions for Gemini
const birdSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    commonName: { type: Type.STRING },
    scientificName: { type: Type.STRING },
    order: { type: Type.STRING },
    family: { type: Type.STRING },
    description: { type: Type.STRING, description: "A comprehensive 2-paragraph description of the bird." },
    identification: { type: Type.STRING, description: "Key physical features to identify the bird." },
    habitat: { type: Type.STRING },
    diet: { type: Type.STRING },
    conservationStatus: { type: Type.STRING, enum: Object.values(ConservationStatus) },
    region: { type: Type.ARRAY, items: { type: Type.STRING } },
    funFact: { type: Type.STRING },
  },
  required: ["commonName", "scientificName", "order", "family", "description", "identification", "habitat", "diet", "conservationStatus", "region", "funFact"]
};

const newsSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      title: { type: Type.STRING },
      summary: { type: Type.STRING },
      content: { type: Type.STRING, description: "A 300 word article formatted with markdown." },
      author: { type: Type.STRING },
      date: { type: Type.STRING },
      category: { type: Type.STRING },
    },
    required: ["id", "title", "summary", "content", "author", "date", "category"]
  }
};

export const getBirdDetails = async (slug: string): Promise<BirdSpecies | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a detailed ornithological encyclopedia entry for the bird with the slug/name: "${slug}". Ensure scientific accuracy.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: birdSchema,
        systemInstruction: "You are an expert ornithologist writing for a scientific encyclopedia. Be precise, academic but accessible.",
      },
    });

    const text = response.text;
    if (!text) return null;

    const data = JSON.parse(text);
    
    return {
      id: slug,
      slug: slug,
      ...data,
      imageUrl: `https://picsum.photos/seed/${slug}/800/600` // Placeholder as we can't generate real bird URLs consistently without search
    };
  } catch (error) {
    console.error("Error fetching bird details:", error);
    return null;
  }
};

export const getRecentNews = async (): Promise<NewsArticle[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 4 realistic, fictional or real recent news headlines and articles related to ornithology, bird conservation, or new species discoveries.",
      config: {
        responseMimeType: "application/json",
        responseSchema: newsSchema,
      },
    });

    const text = response.text;
    if (!text) return [];
    
    const data = JSON.parse(text);
    return data.map((item: any, index: number) => ({
        ...item,
        imageUrl: `https://picsum.photos/seed/news${index}/600/400`
    }));

  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export const searchBirds = async (query: string): Promise<{commonName: string, slug: string, scientificName: string}[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Search for bird species matching the query: "${query}". Return a list of up to 5 matches.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            commonName: { type: Type.STRING },
                            scientificName: { type: Type.STRING },
                            slug: { type: Type.STRING, description: "hyphenated-lowercase-name"}
                        }
                    }
                }
            }
        });
        
        const text = response.text;
        if(!text) return [];
        return JSON.parse(text);
    } catch (error) {
        return [];
    }
}
