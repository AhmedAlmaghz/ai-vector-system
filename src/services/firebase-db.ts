import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { VectorDB } from './vector-db.interface';
import { config } from '../config/config';

export class FirebaseDB implements VectorDB {
  private db: any;

  constructor() {
    const firebaseApp = initializeApp(config.firebaseConfig);
    this.db = getFirestore(firebaseApp);
  }

  async initialize() {
    console.log('Firebase initialized');
  }

  async upsert(vectors: { id: string; values: number[] }[]) {
    const batch = writeBatch(this.db);
    for (const vector of vectors) {
      const docRef = collection(this.db, 'vectors');
      batch.set(docRef, vector);
    }
    await batch.commit();
  }

  async query(vector: number[], topK: number = 5) {
    // Implement search queries in Firebase here
    const q = query(collection(this.db, 'vectors'), where('values', 'array-contains-any', vector));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data()).slice(0, topK);
  }
}