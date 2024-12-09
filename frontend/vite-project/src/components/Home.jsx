import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Code, FileJson, ArrowLeftRight, CheckCircle, Zap, Cpu, CloudCog, Terminal } from 'lucide-react';
import ComingSoonModal from './AiWorkflows';

const Home = () => {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const quickActionsRef = useRef(null);

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

  const upcomingFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fix Your YAMLs",
      description: "Automatic suggestions and quick fixes for common YAML configuration errors"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Generate K8s Manifests",
      description: "AI-powered Kubernetes manifest generation tailored to your application needs"
    },
    {
      icon: <CloudCog className="w-6 h-6" />,
      title: "Cloud Configuration Wizard",
      description: "Guided tool to create optimal cloud infrastructure configurations"
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Advanced Linting",
      description: "Comprehensive linting with custom rule support and deep configuration checks"
    }
  ];
  
  const handleGetStarted = () => {
    // Show quick actions section
    setShowQuickActions(true);
    
    // Scroll to quick actions
    setTimeout(() => {
      if (quickActionsRef.current) {
        quickActionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleLearnMore = () => {
    // Open GitHub repository in a new tab
    window.open('https://github.com/sumitdethe27/yaml-linter', '_blank');
  };

  const handleTryItNow = () => {
    // Show the Coming Soon modal
    setShowComingSoon(true);
  };

  const handleCloseComingSoon = () => {
    setShowComingSoon(false);
  };

  const QuickActionButton = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 
        bg-white 
        text-blue-600 
        rounded-lg 
        border 
        border-blue-600 
        hover:bg-blue-50 
        transform 
        hover:scale-105 
        transition-all 
        duration-300 
        animate-glow 
        shadow-lg 
        hover:shadow-xl 
        ${className}
      `}
    >
      {children}
    </button>
  );

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
            <button 
              onClick={handleGetStarted}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
            >
              Get Started
            </button>
            <button 
              onClick={handleLearnMore}
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Current Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Current <span className="text-blue-600">Features</span>
        </h2>
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

      {/* Upcoming Features Section */}
      <div className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          <span className="text-blue-600">Upcoming</span> Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {upcomingFeatures.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 relative"
            >
              <span className="absolute top-4 right-4 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                Coming Soon
              </span>
              <div className="text-blue-600 mb-4 opacity-75">
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

      {/* Quick Actions Section */}
      {showQuickActions && (
        <div 
          ref={quickActionsRef}
          className="container mx-auto px-4 py-16 transition-all duration-700 ease-in-out"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Choose Your <span className="text-blue-600">YAML Action</span>
            </h2>
            <div className="flex justify-center gap-8">
              <QuickActionButton 
                onClick={() => navigate('/convert')}
                className="animate-glow-1"
              >
                Convert YAML
              </QuickActionButton>
              <QuickActionButton 
                onClick={() => navigate('/compare')}
                className="animate-glow-2"
              >
                Compare YAML
              </QuickActionButton>
              <QuickActionButton 
                onClick={() => navigate('/fix')}
                className="animate-glow-3"
              >
                Fix YAML
              </QuickActionButton>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Streamline Your YAML Workflow?
          </h2>
          <p className="text-lg mb-6">
            Start using our tools today and make YAML handling a breeze
          </p>
          <button 
            onClick={handleTryItNow}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
          >
            Try It Now
          </button>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <ComingSoonModal onClose={handleCloseComingSoon} />
      )}
    </div>
  );
};

export default Home;