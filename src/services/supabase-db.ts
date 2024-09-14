import { createClient } from '@supabase/supabase-js';
import { VectorDB } from './vector-db.interface';
import { config } from '../config/config';
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage";

export class SupabaseDB implements VectorDB {
  private client: any;
  private vectorStore: SupabaseVectorStore;

  constructor() {
    this.client = createClient(config.supabaseUrl, config.supabaseKey);
    this.vectorStore = new SupabaseVectorStore(this.client, new VoyageEmbeddings({ apiKey: config.voyageApiKey, modelName: config.voyageModel}));
  }

  async initialize() {
    console.log('Supabase initialized');
  }

  async upsert(vectors: { id: string; values: number[] }[]) {
    await this.vectorStore.addDocuments(vectors.map(v => ({ id: v.id, embedding: v.values })));
  }

  async query(vector: number[], topK: number = 5) {
    const results = await this.vectorStore.similaritySearch(vector, topK);
    return results;
  }
}