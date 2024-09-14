export interface AIProvider {
    generateEmbedding(text: string): Promise<number[]>;
    generateResponse(prompt: string): Promise<string>;
}