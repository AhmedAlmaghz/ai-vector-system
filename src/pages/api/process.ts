import type { NextApiRequest, NextApiResponse } from 'next';
import { AIProviderFactory } from '../../services/ai-provider-factory';
import { VectorDBFactory } from '../../services/vector-db-factory';
import { processFile } from '../../utils/fileProcessing';
import { config } from '../../config/config';
import { handleError, AppError } from '../../utils/errorHandling';
import formidable, { File } from 'formidable';
import { Document } from "langchain/document";

export const apiConfig = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable({ multiples: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Parsing form...');
      const { files } = await parseForm(req);
      const file = files.file as File;
      if (!file) {
        throw new AppError(400, 'No file uploaded');
      }

      console.log('File uploaded:', file);

      const documents: Document[] = await processFile(file);
      console.log('File processed into documents:', documents);

      const aiProvider = AIProviderFactory.create(config.aiProvider);
      const vectorDb = VectorDBFactory.create(config.vectorDb);

      console.log('Initializing vector database...');
      await vectorDb.initialize();
      console.log('Vector database initialized');

      console.log('Generating embeddings...');
      const embeddingsPromises = documents.map(doc => aiProvider.generateEmbedding(doc.pageContent));
      const embeddings = await Promise.all(embeddingsPromises);
      console.log('Embeddings generated:', embeddings);

      console.log('Upserting embeddings into vector database...');
      await vectorDb.upsert(
        embeddings.map((embedding, index) => ({
          id: `${Date.now()}-${index}`,
          values: embedding,
        }))
      );
      console.log('Embeddings upserted into vector database');

      console.log('Querying vector database...');
      const queryResults = await Promise.all(embeddings.map(embedding => vectorDb.query(embedding)));
      console.log('Query results:', queryResults);

      console.log('Generating AI response...');
      const response = await aiProvider.generateResponse(documents.map(doc => doc.pageContent).join(' '));
      console.log('AI response generated:', response);

      res.status(200).json({ embeddings, queryResults, response });
    } catch (error) {
      console.error('Error processing request:', error);
      const { statusCode, message } = handleError(error);
      res.status(statusCode).json({ error: message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}