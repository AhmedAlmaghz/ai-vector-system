import { OpenAI } from '@langchain/openai';
import { AIProvider } from './ai-provider.interface';
import { config } from '../config/config';

export class OpenAIProvider implements AIProvider {
  private model: OpenAI;

  constructor() {
    this.model = new OpenAI({ openAIApiKey: config.openaiApiKey });
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const result = await this.model.embeddings.embed(text);
    return result;
  }

  async generateResponse(prompt: string): Promise<string> {
    const result = await this.model.invoke(prompt);
    return result;
  }
}