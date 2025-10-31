import { useState } from 'react';
import AnimatedPingPong from './AnimatedPingPong';

interface BestPractice {
  title: string;
  description: string;
  icon: string;
  isAnimation?: boolean;
}

const TDDBestPracticesSlide = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const bestPractices: BestPractice[] = [
    {
      title: "Start with Business Value, Not Code Structure",
      description: "Don't start by testing classes or methods — start from the most valuable user behavior. Let the tests express the system's intent, not internal logic.",
      icon: "💼"
    },
    {
      title: "Write the Simplest Failing Test That Proves Progress",
      description: "Each test should push the design one clear step forward — Simplicity keeps feedback fast and cognitive load low.",
      icon: "🎯"
    },
    {
      title: "Refactor Relentlessly — But Only on Green",
      description: "The real power of TDD is not tests — it's safe, continuous refactoring. Keep design clean and flexible after every green cycle.",
      icon: "🟢"
    },
    {
      title: "Refactor Both Production and Test Code",
      description: "Improve both your code under test and the test code itself after each cycle, ensuring clarity, reuse, and elimination of duplication.",
      icon: "♻️"
    },
    {
      title: "Keep Tests Fast and Independent",
      description: "Slow tests kill the TDD feedback loop. Mock I/O, isolate dependencies, and ensure tests run in seconds.",
      icon: "⚡"
    },
    {
      title: "End Your Day with a Failing Test",
      description: "A great productivity trick — you'll know exactly where to start the next morning, and it keeps you in the TDD rhythm.",
      icon: "🌙"
    },
    {
      title: "Ping Pong Programming",
      description: "A pair programming style where two developers alternate between writing tests and writing production code, like a ping-pong match.",
      icon: "🏓",
      isAnimation: true
    }
  ];

  const practicesPerPage = 2;
  const totalPages = Math.ceil(bestPractices.length / practicesPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * practicesPerPage;
  const endIndex = Math.min(startIndex + practicesPerPage, bestPractices.length);
  const currentPractices = bestPractices.slice(startIndex, endIndex);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">
          TDD Best Practices
        </h1>
        <p className="text-xl text-[#50DCE1]">Essential practices for successful TDD adoption</p>
      </div>

      {/* Page Counter */}
      <div className="text-center mb-6">
        <span className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300 border border-gray-600">
          Page {currentPage + 1} / {totalPages}
        </span>
      </div>

      {/* Current Practices - Show 2 per page vertically */}
      <div className="flex-1 flex flex-col justify-center space-y-6 max-w-6xl mx-auto w-full">
        {currentPractices.map((practice, idx) => (
          <div
            key={startIndex + idx}
            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-[#50DCE1] transition-all shadow-lg"
          >
            <div className="flex items-start space-x-6">
              <div className="text-6xl flex-shrink-0">{practice.icon}</div>
              <div className="flex-1">
                {/* Practice Title */}
                <h3 className="text-3xl font-bold text-[#50DCE1] mb-4">
                  {practice.title}
                </h3>

                {/* Practice Description */}
                <p className="text-lg text-gray-300 leading-relaxed">
                  {practice.description}
                </p>

                {/* Special handling for ping pong animation */}
                {practice.isAnimation && (
                  <div className="mt-4">
                    <AnimatedPingPong />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevPage}
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-bold transition-colors flex items-center space-x-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Previous</span>
        </button>

        <button
          onClick={nextPage}
          className="bg-[#50DCE1] hover:bg-cyan-400 text-black px-6 py-3 rounded-lg text-lg font-bold transition-colors flex items-center space-x-2 group"
        >
          <span>Next</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-3 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              index === currentPage
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