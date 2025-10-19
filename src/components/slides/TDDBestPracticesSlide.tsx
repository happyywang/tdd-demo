import { useState } from 'react';
import AnimatedPingPong from './AnimatedPingPong';

interface BestPractice {
  title: string;
  description: string;
  icon: string;
  isAnimation?: boolean;
}

const TDDBestPracticesSlide = () => {
  const [currentPractice, setCurrentPractice] = useState(0);

  const bestPractices: BestPractice[] = [
    {
      title: "Follow TDD Cycle Strictly",
      description: "Red → Green → Refactor, always in order. Never skip a step. Each phase has a different mindset and purpose.",
      icon: "🔄"
    },
    {
      title: "Only Write Production Code to Satisfy a Failing Test",
      description: "Let the tests drive the code, not the other way around. This ensures every line of code has a purpose and is tested.",
      icon: "🎯"
    },
    {
      title: "Refactor Only When Tests Are Green",
      description: "Green tests give you a safety net for improving code quality. Red tests mean STOP - fix the issue before continuing.",
      icon: "🟢"
    },
    {
      title: "Focus on Behavior, Not Implementation",
      description: "Tests should verify what the code does, not how it does it. Avoid tightly coupling tests to internal implementation, or refactoring becomes difficult.",
      icon: "🎭"
    },
    {
      title: "Keep Tests Small and Focused",
      description: "Each test should verify a single behavior or functionality. Avoid tests that cover too much logic at once, as failures become harder to diagnose.",
      icon: "🔍"
    },
    {
      title: "Keep Tests Fast",
      description: "Slow tests kill the TDD feedback loop. Unit tests should run in under 100ms each. If tests take more than 10 seconds total, developers will skip them.",
      icon: "⚡"
    },
    {
      title: "Ping Pong Programming",
      description: "A pair programming style where two developers alternate between writing tests and writing production code, like a ping-pong match.",
      icon: "🏓",
      isAnimation: true
    }
  ];

  const nextPractice = () => {
    setCurrentPractice((prev) => (prev + 1) % bestPractices.length);
  };

  const prevPractice = () => {
    setCurrentPractice((prev) => (prev - 1 + bestPractices.length) % bestPractices.length);
  };

  const currentPracticeData = bestPractices[currentPractice];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">
          TDD Best Practices
        </h1>
        <p className="text-xl text-[#50DCE1]">Essential practices for successful TDD adoption</p>
      </div>

      {/* Practice Counter */}
      <div className="text-center mb-6">
        <span className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300 border border-gray-600">
          {currentPractice + 1} / {bestPractices.length}
        </span>
      </div>

      {/* Current Practice */}
      <div className={`${currentPracticeData.isAnimation ? 'flex-1' : 'flex-1 flex items-center justify-center'}`}>
        <div className={`${currentPracticeData.isAnimation ? 'max-w-6xl' : 'max-w-4xl'} mx-auto w-full`}>
          <div className={`bg-gray-800 ${currentPracticeData.isAnimation ? 'p-6' : 'p-8'} rounded-xl border border-gray-700 hover:border-[#50DCE1] transition-all`}>
            <div className="flex items-start space-x-6">
              <div className="text-6xl flex-shrink-0">{currentPracticeData.icon}</div>
              <div className="flex-1">
                {/* Practice Title */}
                <h3 className="text-3xl font-bold text-[#50DCE1] mb-4">
                  {currentPracticeData.title}
                </h3>

                {/* Practice Description */}
                <p className={`text-lg text-gray-300 leading-relaxed ${currentPracticeData.isAnimation ? 'mb-3' : 'mb-6'}`}>
                  {currentPracticeData.description}
                </p>

                {/* Special handling for ping pong animation */}
                {currentPracticeData.isAnimation && (
                  <div className="mt-2">
                    <AnimatedPingPong />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevPractice}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-bold transition-colors flex items-center space-x-2 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Previous</span>
            </button>

            <button
              onClick={nextPractice}
              className="bg-[#50DCE1] hover:bg-cyan-400 text-black px-6 py-3 rounded-lg text-lg font-bold transition-colors flex items-center space-x-2 group"
            >
              <span>Next</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className={`flex justify-center space-x-3 ${currentPracticeData.isAnimation ? 'mt-3' : 'mt-6'}`}>
        {bestPractices.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPractice(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              index === currentPractice
                ? 'bg-[#50DCE1] transform scale-125'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TDDBestPracticesSlide;