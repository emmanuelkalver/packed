
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { TechPack } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDesign = async (prompt: string, brandContext?: string): Promise<string> => {
  const fullPrompt = brandContext 
    ? `Fashion design based on: ${prompt}. Apply brand DNA: ${brandContext}`
    : `High-quality photorealistic fashion design: ${prompt}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: fullPrompt }],
    },
    config: {
      imageConfig: { aspectRatio: "3:4" }
    }
  });

  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
};

export const editDesign = async (base64Image: string, editPrompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } },
        { text: `Modify this design: ${editPrompt}` }
      ],
    },
  });

  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Modification failed");
};

export const generateTechPack = async (imageUrl: string, prompt: string): Promise<TechPack> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: imageUrl.split(',')[1], mimeType: 'image/png' } },
        { text: `Based on this fashion design (${prompt}), generate a detailed technical production specification (Tech Pack). Include Bill of Materials (BOM), measurement charts for S, M, L, XL, and specific construction notes for a manufacturer.` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bom: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                component: { type: Type.STRING },
                material: { type: Type.STRING },
                details: { type: Type.STRING }
              },
              required: ["component", "material", "details"]
            }
          },
          measurements: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                point: { type: Type.STRING },
                tolerance: { type: Type.STRING },
                sizes: {
                  type: Type.OBJECT,
                  properties: {
                    S: { type: Type.STRING },
                    M: { type: Type.STRING },
                    L: { type: Type.STRING },
                    XL: { type: Type.STRING }
                  }
                }
              },
              required: ["point", "sizes"]
            }
          },
          constructionNotes: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["bom", "measurements", "constructionNotes"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getTrends = async (): Promise<any> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "What are the trending fashion color palettes, silhouettes, and fabric textures for the current season? Provide data suitable for visualization.",
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  return response.text;
};
