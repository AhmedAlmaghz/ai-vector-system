export interface VectorDB {
    initialize() : Promise<void>;
    upsert(vectors: { id: string; values: number[] }[]): Promise<void>;
    query(vector: number[], topK?: number): Promise<any>;
}