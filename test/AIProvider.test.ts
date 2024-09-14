import { AIProvider } from '../src/services/ai-provider';

describe('AIProvider', () => {
  let aiProvider: AIProvider;

  beforeEach(() => {
    aiProvider = new AIProvider();
  });

  test('generateEmbedding returns an array of numbers', async () => {
    const embedding = await aiProvider.generateEmbedding('Test text');
    expect(Array.isArray(embedding)).toBe(true);
    expect(embedding.every(n => typeof n === 'number')).toBe(true);
  });

  test('generateResponse returns a string', async () => {
    const response = await aiProvider.generateResponse('Test prompt');
    expect(typeof response).toBe('string');
  });
});