import { AIProvider } from './ai-provider.interface';
import { OpenAIProvider } from './openai-provider';
import { CohereProvider } from './cohere-provider';
import { GeminiProvider } from './gemini-provider';

export class AIProviderFactory {
    static create(aiProviderType: string): AIProvider {
        switch (aiProviderType.toLowerCase()) {
            case 'openai':
                return new OpenAIProvider();
            case 'cohere':
                return new CohereProvider();
            case 'gemini':
                return new GeminiProvider();
            default:
                throw new Error(`Unsupported AI provider: ${aiProviderType}`);
        }
    }
}