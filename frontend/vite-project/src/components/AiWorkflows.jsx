import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const ComingSoonModal = ({ onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prevProgress - 5;
      });
    }, 250);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          AI Workflows for YAML
        </h2>
        <p className="text-gray-600 mb-6">
          Exciting new features are coming soon!
        </p>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin mr-2 text-blue-600" />
          <span className="text-gray-700">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal;