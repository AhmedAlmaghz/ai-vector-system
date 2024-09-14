import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";

import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
// import { MarkdownLoader } from "langchain/document_loaders/fs/markdown";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { Document } from "langchain/document";

// import { HTMLLoader } from "langchain/document_loaders/fs/html";
import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url"; 
import { compile } from "html-to-text";
import { URL } from "url";

export async function processFile(file: File| URL): Promise<Document[]> {
  let loader;

  switch (file.type) {
    case 'application/pdf':
      loader = new PDFLoader(file.path);
      break;
    case 'text/plain':
      loader = new TextLoader(file.path);
      break;
    // case 'text/html':
    //   loader = new HTMLLoader(file.path);
    //   break;
    case 'text/html':
      const compiledConvert = compile({ wordwrap: 130 }); // returns (text: string) => string;

      loader = new RecursiveUrlLoader(url, {
        extractor: compiledConvert,
        maxDepth: 1,
        // excludeDirs: ["/docs/api/"],
      });
      break;

    case 'text/csv':
      loader = new CSVLoader(file.path);
      break;
    case 'application/json':
      loader = new JSONLoader(file.path);
      break;
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      loader = new DocxLoader(file.path);
      break;
    // case 'text/markdown':
    //   loader = new MarkdownLoader(file.path);
    //   break;
    default:
      throw new Error('Unsupported file type');
  }

  const documents = await loader.load();
  return documents;
}