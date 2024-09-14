import React from 'react';

interface OutputDisplayProps {
  output: string;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  return (
    <div className="mt-4 p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-semibold mb-2">Output:</h2>
      <pre className="whitespace-pre-wrap">{output}</pre>
    </div>
  );
};