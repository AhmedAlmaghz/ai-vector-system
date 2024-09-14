import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { GoogleGenerativeAIEmbeddings,ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatCohere,CohereEmbeddings } from "@langchain/cohere";
import { ChatGroq } from "@langchain/groq";

import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage";

import { config } from "../config/config";

export class AIProvider {
  private model: OpenAI | ChatGoogleGenerativeAI | ChatCohere | ChatGroq;
  private embeddingsModel: OpenAIEmbeddings | GoogleGenerativeAIEmbeddings |CohereEmbeddings | VoyageEmbeddings;

  constructor() {
    if (config.aiProvider === 'openai') {
      this.model = new OpenAI({ openAIApiKey: config.openaiApiKey, model:config.openaiModel });
      this.embeddingsModel = new OpenAIEmbeddings({ openAIApiKey: config.openaiApiKey });
    } else if (config.aiProvider === 'gemini') {
      this.model= new ChatGoogleGenerativeAI({apiKey:config.genApiKey, model:config.genModel});
      this.embeddingsModel = new GoogleGenerativeAIEmbeddings({ apiKey: config.genApiKey });
    } else if (config.aiProvider === 'cohere') {
      this.model= new ChatCohere({apiKey:config.cohereApiKey,model: config.cohereModel});
      this.embeddingsModel = new CohereEmbeddings({ apiKey: config.cohereApiKey });
    } else if (config.aiProvider === 'groq') {
      this.model= new ChatGroq({apiKey:config.genApiKey, model:config.groqModel});
      this.embeddingsModel = new VoyageEmbeddings({ apiKey: config.genApiKey,modelName:config.voyageModel });
    } else {
      throw new Error(`Unsupported AI provider: ${config.aiProvider}`);
    }
  }

  async generateEmbedding(text: string | string[] , isDocs:boolean=false): Promise<number[]> {
    if(isDocs){
      const result = await this.embeddingsModel.embedDocuments(text);
      return result;
    } else{
      const result = await this.embeddingsModel.embedQuery(text);
      return result;
    }
  }

  async generateResponse(prompt: string): Promise<string> {
    const result = await this.model.generate(prompt);
    return result;
  }
}