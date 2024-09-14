import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { VectorDB } from './vector-db.interface';
import { config } from '../config/config';
import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage";

export class PineconeDB implements VectorDB {
  private client: PineconeClient;
  private indexName:string= config.pineconeIndex;

  constructor() {
    this.client = new PineconeClient({
      apiKey: config.pineconeApiKey,
      environment: config.pineconeEnvironment,
    });
  }

  async initialize() {
     console.log('Pinecone initialized');
  }

  async upsert(vectors: { id: string; values: number[] }[]) {
    const index = this.client.Index(this.indexName);
    await index.upsert({ vectors });
  }

  async query(vector: number[], topK: number = 5) {
    const index = this.client.Index(this.indexName);
    const queryResponse = await index.query({
      vector,
      topK,
      includeMetadata: true,
    });
    return queryResponse.matches;
  }
}