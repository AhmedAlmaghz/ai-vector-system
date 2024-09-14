import { VectorDB } from './vector-db.interface';
import { PineconeDB } from './pinecone-db';
import { SupabaseDB } from './supabase-db';
import { FirebaseDB } from './firebase-db';
// Import more vector database providers here...

export class VectorDBFactory {
  static create(vectorDbType: string): VectorDB {
    switch (vectorDbType.toLowerCase()) {
      case 'pinecone':
        return new PineconeDB();
      case 'supabase':
        return new SupabaseDB();
      case 'firebase':
        return new FirebaseDB();
      // Add more vector databases here...
      default:
        throw new Error(`Unsupported vector database: ${vectorDbType}`);
    }
  }
}