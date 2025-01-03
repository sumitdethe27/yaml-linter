import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const YamlEditor = ({ initialValue = '', language = 'yaml', label = 'YAML/JSON Input' }) => {
  const [editorValue, setEditorValue] = useState(initialValue);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Handler for editor changes
  const handleEditorChange = (value) => {
    setEditorValue(value);
    // Clear previous results when editor content changes
    setResults(null);
    setError(null);
  };

  // Function to send data to the backend
  const sendDataToBackend = async () => {
    try {
      // Add '---' at the start if not already present
      const contentToSend = editorValue.trim().startsWith('---') 
        ? editorValue 
        : `---\n${editorValue}`;
  
      const response = await fetch('https://now.sumitdethe.live/api/fix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: contentToSend }),
      });
  
      const data = await response.json();
      
      if (response.ok && data.success) {
        setResults(data);
        setError(null);
      } else {
        setError(data.error || 'Failed to process YAML');
        setResults(null);
      }
    } catch (error) {
      setError('Error connecting to server');
      setResults(null);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Label matching the existing app style */}
      <label className="block text-lg font-semibold text-gray-700">
        {label}
      </label>

      {/* Editor container with responsive sizing */}
      <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <Editor
          height="100%"
          width="100%"
          language={language}
          theme="vs-light"
          value={editorValue}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            wordWrap: 'on',
          }}
        />
      </div>

      {/* Button to send data to backend */}
      <button
        onClick={sendDataToBackend}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center "
      >
        Submit
      </button>

      {/* Results Display Section */}
      {(results || error) && (
        <div className="mt-4 p-4 rounded-lg border">
          {error ? (
            <div className="flex items-start space-x-2 text-red-600">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <span>{error}</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">YAML Validation Results</span>
              </div>
              
              {results.lint_results && results.lint_results.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Lint Results:</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {results.lint_results.map((result, index) => (
                      <li key={index} className="pl-4 border-l-2 border-gray-300">
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {results.parsed_data && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Parsed Data:</h3>
                  <pre className="bg-gray-50 p-3 rounded-md text-sm overflow-auto max-h-60">
                    {JSON.stringify(results.parsed_data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YamlEditor;