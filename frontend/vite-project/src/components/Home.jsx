import React from 'react';
import { Code, FileJson, ArrowLeftRight, CheckCircle } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "YAML Validation",
      description: "Instantly validate your YAML files for syntax errors and formatting issues"
    },
    {
      icon: <ArrowLeftRight className="w-6 h-6" />,
      title: "Format Conversion",
      description: "Seamlessly convert between YAML and JSON formats with a single click"
    },
    {
      icon: <FileJson className="w-6 h-6" />,
      title: "File Comparison",
      description: "Compare multiple YAML files side by side to spot differences"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Real-time Feedback",
      description: "Get instant feedback on your YAML syntax with line-by-line error reporting"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Your Ultimate YAML
            <span className="text-blue-600"> Toolkit</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simplify your YAML workflow with our powerful validation, conversion, and comparison tools
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200">
              Get Started
            </button>
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Streamline Your YAML Workflow?
          </h2>
          <p className="text-lg mb-6">
            Start using our tools today and make YAML handling a breeze
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
            Try It Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;