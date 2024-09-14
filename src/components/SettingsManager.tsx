import React, { useState, useEffect } from 'react';

export const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState({});
  const [newSettings, setNewSettings] = useState({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const response = await fetch('/api/settings');
    const data = await response.json();
    setSettings(data);
    setNewSettings(data);
  };

  const updateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings),
    });
    if (response.ok) {
      setMessage('Settings updated successfully');
      fetchSettings();
    } else {
      setMessage('Failed to update settings');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setNewSettings({ ...newSettings, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={updateSettings} className="space-y-4">
        <div>
          <label htmlFor="aiProvider" className="block text-sm font-medium text-gray-700">AI Provider</label>
          <select
            id="aiProvider"
            name="aiProvider"
            value={newSettings["aiProvider"] || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="openai">OpenAI</option>
            <option value="cohere">Cohere</option>
            <option value="gemini">Google Gemini</option>
            {/* Add more AI providers here */}
          </select>
        </div>

        <div>
          <label htmlFor="vectorDb" className="block text-sm font-medium text-gray-700">Vector Database</label>
          <select
            id="vectorDb"
            name="vectorDb"
            value={newSettings["vectorDb"] || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="pinecone">Pinecone</option>
            <option value="supabase">Supabase</option>
            <option value="firebase">Firebase</option>
            {/* Add more vector databases here */}
          </select>
        </div>

        {Object.entries(settings).map(([key, value]) => {
          if (key !== "aiProvider" && key !== "vectorDb") {
            return (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700">{key}</label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={newSettings[key] || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            );
          }
          return null;
        })}

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update Settings
        </button>
      </form>
    </div>
  );
};