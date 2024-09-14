import { Cohere } from 'cohere-ai';
import { AIProvider } from './ai-provider.interface';
import { config } from '../config/config';

export class CohereProvider implements AIProvider {
  private model: Cohere;

  constructor() {
    this.model = new Cohere({ apiKey: config.cohereApiKey });
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const result = await this.model.embed(text);
    return result.embeddings[0]; // Assuming the API returns an array of embeddings
  }

  async generateResponse(prompt: string): Promise<string> {
    const result = await this.model.generate(prompt);
    return result.text; // Assuming the API returns a text response
  }
}