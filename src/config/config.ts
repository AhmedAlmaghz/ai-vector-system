export const config = {
  aiProvider: process.env.AI_PROVIDER || 'gemini',
  vectorDb: process.env.VECTOR_DB || 'pinecone',

  openaiApiKey: process.env.OPENAI_API_KEY,
  openaiModel: process.env.OPENAI_MODEl,

  cohereApiKey: process.env.COHERE_API_KEY,
  cohereModel: process.env.COHERE_MODEL,

  voyageApiKey: process.env.VOYAGEAI_API_KEY,
  voyageModel: process.env.VOYAGEAI_MODEL,

  genApiKey: process.env.GEMINI_API_KEY,
  genModel: process.env.GEMINI_MODEL,
  
  groqApiKey: process.env.GROQ_API_KEY,
  groqModel: process.env.GROQ_MODEL,

  pineconeApiKey: process.env.PINECONE_API_KEY,
  pineconeIndex: process.env.PINECONE_INDEX,
  pineconeEnvironment: process.env.PINECONE_ENVIRONMENT,

  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
  
  firebaseConfig: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  },
};