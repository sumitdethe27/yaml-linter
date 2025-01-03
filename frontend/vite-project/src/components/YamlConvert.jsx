import React, { useState } from 'react';

const Convert = () => {
  // State to manage input and output text
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  
  // State to track if we're loading during API call
  const [isLoading, setIsLoading] = useState(false)
  // State to handle any errors that might occur
  const [error, setError] = useState(null);

  // Handler for input text changes
  const handleInputChange = (event) => {
    setInputText(event.target.value);
    // Clear any previous errors when user starts typing
    if (error) setError(null);
  };

  // Function to handle the conversion
  const handleConvert = async () => {
    // Don't do anything if input is empty
    if (!inputText.trim()) {
      setError('Please enter some text to convert');
      return;
    }

    try {
      setIsLoading(true); // Start loading
      setError(null); // Clear any previous errors
        console.log(inputText)
      // Make API call to backend
      // https://now.sumitdethe.live/api/convert
      const response = await fetch('https://now.sumitdethe.live/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',

        },
        body: JSON.stringify({ input: inputText }),
      });

      // Check if response is ok
      if (!response.ok) {
        throw new Error('Conversion failed. Please check your input format.');
      }

      // Get the converted text from response
      const data = await response.json();
      console.log(data);
      setOutputText(data.output);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    // Main container with gradient background
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            YAML/JSON Converter
          </h1>
          <p className="text-gray-600">
            Convert between YAML and JSON formats instantly
          </p>
        </div>
      </div>

      {/* Main content container */}
      <div className="max-w-7xl mx-auto">
        {/* Text areas container - uses grid for responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Input section */}
          <div className="space-y-2">
            <label 
              htmlFor="input" 
              className="block text-lg font-semibold text-gray-700"
            >
              YAML/JSON Input
            </label>
            <textarea
              id="input"
              value={inputText}
              onChange={handleInputChange}
              className="w-full h-[400px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono"
              placeholder="Paste your YAML or JSON here..."
            />
          </div>

          {/* Output section */}
          <div className="space-y-2">
            <label 
              htmlFor="output" 
              className="block text-lg font-semibold text-gray-700"
            >
              Output
            </label>
            <textarea
              id="output"
              value={outputText}
              readOnly
              className="w-full h-[400px] p-4 border border-gray-300 rounded-lg bg-gray-50 font-mono resize-none"
              placeholder="Converted text will appear here..."
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-600 text-center mb-4">
            {error}
          </div>
        )}

        {/* Convert button */}
        <div className="flex justify-center">
          <button
            onClick={handleConvert}
            disabled={isLoading}
            className={`
              px-6 py-3 rounded-lg font-semibold
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'}
              text-white transition-all duration-200
            `}
          >
            {isLoading ? 'Converting...' : 'Convert'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Convert;
