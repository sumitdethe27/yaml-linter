import React from 'react';
import { FileText } from 'lucide-react';
import MergelyView from 'mergely-react'

const Compare = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            Real-time YAML Comparison
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare your YAML files side by side with instant visual feedback. 
            Perfect for spotting differences and validating changes.
          </p>
        </div>
      </div>

      {/* Mergely Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4">
        <div id="mergely-container">
        <MergelyView max-w-6xl h-full  />
        </div>
      </div>
    </div>
  );
};

export default Compare;