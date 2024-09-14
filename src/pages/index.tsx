import { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { OutputDisplay } from '../components/OutputDisplay';
import { SettingsManager } from '../components/SettingsManager';

export default function Home() {
  const [output, setOutput] = useState<string>('');

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setOutput('An error occurred while processing the file.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Vector System</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <OutputDisplay output={output} />
      <SettingsManager />
    </div>
  );
}