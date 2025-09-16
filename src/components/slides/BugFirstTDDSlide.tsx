import { useState } from 'react';

const BugFirstTDDSlide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: '🪲',
      title: 'Bug',
      subtitle: 'Don\'t rush to fix - understand the bug first, then write a test.',
      bgColor: 'from-slate-900 via-slate-700 to-slate-900',
      accentColor: 'text-[#50DCE1]',
      borderColor: 'border-[#50DCE1]/30'
    },
    {
      icon: '📝',
      title: 'Write Failing Test',
      subtitle: 'Write a small test describing the bug behavior, let it fail first.',
      bgColor: 'from-red-900 via-orange-800 to-red-900',
      accentColor: 'text-red-400',
      borderColor: 'border-red-500/30'
    },
    {
      icon: '🔧',
      title: 'Fix Code',
      subtitle: 'Modify code until the test passes, solving the problem.',
      bgColor: 'from-green-900 via-emerald-800 to-green-900',
      accentColor: 'text-green-400',
      borderColor: 'border-green-500/30'
    },
    {
      icon: '♻️',
      title: 'Refactor',
      subtitle: 'Optimize code structure, keep tests passing.',
      bgColor: 'from-blue-900 via-cyan-800 to-blue-900',
      accentColor: 'text-blue-400',
      borderColor: 'border-blue-500/30'
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="h-full relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center px-8 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#50DCE1] opacity-5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-48 h-48 bg-[#50DCE1] opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#50DCE1] opacity-5 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#50DCE1] opacity-10 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">
            TDD From the Trenches
          </h1>
          <h2 className="text-xl text-[#50DCE1]">Recommend: start from a bug fix</h2>
        </div>

        {/* Interactive Flow */}
        <div className="flex flex-col items-center space-y-12">
          {/* Current Step Display */}
          <div className={`relative bg-gradient-to-br ${steps[currentStep].bgColor} rounded-3xl p-12 border-2 ${steps[currentStep].borderColor} shadow-2xl transform transition-all duration-500 max-w-4xl w-full`}>
            <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
            <div className="relative z-10 text-center">
              <div className="text-8xl mb-6 animate-bounce">{steps[currentStep].icon}</div>
              <h3 className={`text-4xl font-bold mb-4 ${steps[currentStep].accentColor}`}>
                {steps[currentStep].title}
              </h3>
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
                {steps[currentStep].subtitle}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-8">
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Previous</span>
            </button>
            
            <div className="text-gray-400 font-mono">
              Step {currentStep + 1} of {steps.length}
            </div>
            
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 group"
            >
              <span>Next</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Flow Visualization */}
          <div className="flex items-center justify-center space-x-4 flex-wrap max-w-5xl">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className={`flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 cursor-pointer border-2 ${
                    index === currentStep 
                      ? `bg-gradient-to-br ${step.bgColor} ${step.borderColor} scale-110` 
                      : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <span className="text-2xl">{step.icon}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-12 h-0.5 bg-gray-600 mx-2"></div>
                )}
                {index === steps.length - 1 && (
                  <>
                    <div className="w-12 h-0.5 bg-gray-600 mx-2"></div>
                    <div className="text-gray-400 text-sm whitespace-nowrap">
                      Loop back to Bug<br/>or New Feature
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BugFirstTDDSlide;