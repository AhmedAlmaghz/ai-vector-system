import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { AIProvider } from './ai-provider.interface';
import { config } from '../config/config';

export class GeminiProvider implements AIProvider {
  private model: GoogleGenerativeAIEmbeddings;

  constructor() {
    this.model = new GoogleGenerativeAIEmbeddings({ apiKey: config.genApiKey });
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const result = await this.model.embed(text);
    return result;
  }

  async generateResponse(prompt: string): Promise<string> {
    const result = await this.model.generate(prompt);
    return result;
  }
}