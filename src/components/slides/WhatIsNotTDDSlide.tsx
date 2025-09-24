import { useState } from 'react';

interface Myth {
  myth: string;
  reality: string;
  explanation: string;
  icon: string;
}

const WhatIsNotTDDSlide = () => {
  const [currentMyth, setCurrentMyth] = useState(0);

  const myths: Myth[] = [
    {
      myth: "TDD is just a synonym for writing tests",
      reality: "TDD is a design methodology",
      explanation: "TDD uses tests to drive the design of your code. It's about the process and mindset, not just having tests.",
      icon: "🧪"
    },
    {
      myth: "TDD means writing multiple tests upfront before any production code",
      reality: "TDD is about one test at a time",
      explanation: "You write ONE failing test, make it pass, then refactor. It's an incremental, iterative process.",
      icon: "📝"
    },
    {
      myth: "TDD guarantees zero bugs",
      reality: "TDD reduces bugs, doesn't eliminate them",
      explanation: "TDD significantly reduces bugs and gives confidence, but it's not a silver bullet. Quality still requires good practices.",
      icon: "🐛"
    },
    {
      myth: "TDD is good for adding tests to existing production code",
      reality: "TDD is for new code development",
      explanation: "Adding tests to existing code is retrofitting, not TDD. TDD requires writing tests BEFORE the production code exists.",
      icon: "🔧"
    },
    {
      myth: "TDD slows down development",
      reality: "TDD speeds up development long-term",
      explanation: "While initial development might feel slower, TDD reduces debugging time, refactoring fear, and maintenance costs.",
      icon: "🐌"
    },
    {
      myth: "TDD replaces other testing practices",
      reality: "TDD complements other testing",
      explanation: "TDD focuses on unit tests. You still need integration tests, UI tests, performance tests, and manual testing.",
      icon: "🎭"
    }
  ];

  const handleNextMyth = () => {
    setCurrentMyth((prev) => (prev + 1) % myths.length);
  };

  const handleMythSelect = (index: number) => {
    setCurrentMyth(index);
  };

  const currentMythData = myths[currentMyth];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <Header currentIndex={currentMyth} totalCount={myths.length} />

      <div className="flex-1 flex items-center justify-center">
        <MythCard myth={currentMythData} onNext={handleNextMyth} />
      </div>

      <NavigationDots
        totalCount={myths.length}
        currentIndex={currentMyth}
        onSelect={handleMythSelect}
      />
    </div>
  );
};

const Header = ({ currentIndex, totalCount }: { currentIndex: number; totalCount: number }) => (
  <div className="text-center mb-8">
    <h1 className="text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">
      What is NOT TDD
    </h1>
    <p className="text-xl text-[#50DCE1] font-semibold">Common Misconceptions Clarified</p>
    <div className="mt-4">
      <span className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300 border border-gray-600">
        {currentIndex + 1} / {totalCount}
      </span>
    </div>
  </div>
);

const MythCard = ({ myth, onNext }: { myth: Myth; onNext: () => void }) => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-[#50DCE1] transition-all">
      <div className="flex items-start space-x-6">
        <div className="text-6xl flex-shrink-0">{myth.icon}</div>
        <div className="flex-1">
          <MythSection title="❌ Myth:" content={myth.myth} isQuoted />
          <RealitySection title="✅ Reality:" content={myth.reality} />
          <ExplanationSection content={myth.explanation} />
        </div>
      </div>
    </div>

    <div className="flex justify-center mt-8">
      <button
        onClick={onNext}
        className="bg-[#50DCE1] hover:bg-cyan-400 text-black px-8 py-3 rounded-lg text-lg font-bold transition-colors"
      >
        Next Myth →
      </button>
    </div>
  </div>
);

const MythSection = ({ title, content, isQuoted = false }: { title: string; content: string; isQuoted?: boolean }) => (
  <div className="mb-6">
    <h3 className="text-2xl font-bold text-red-400 mb-4">{title}</h3>
    <p className="text-xl text-gray-300 leading-relaxed italic">
      {isQuoted ? `"${content}"` : content}
    </p>
  </div>
);

const RealitySection = ({ title, content }: { title: string; content: string }) => (
  <div className="mb-4">
    <h4 className="text-2xl font-bold text-[#50DCE1] mb-4">{title}</h4>
    <p className="text-xl text-white font-semibold">{content}</p>
  </div>
);

const ExplanationSection = ({ content }: { content: string }) => (
  <div className="border-t border-gray-600 pt-4">
    <p className="text-lg text-gray-400 leading-relaxed">{content}</p>
  </div>
);

const NavigationDots = ({
  totalCount,
  currentIndex,
  onSelect
}: {
  totalCount: number;
  currentIndex: number;
  onSelect: (index: number) => void;
}) => (
  <div className="flex justify-center space-x-3 mt-6">
    {Array.from({ length: totalCount }).map((_, index) => (
      <button
        key={index}
        onClick={() => onSelect(index)}
        className={`w-4 h-4 rounded-full transition-all ${
          index === currentIndex
            ? 'bg-[#50DCE1] transform scale-125'
            : 'bg-gray-600 hover:bg-gray-500'
        }`}
      />
    ))}
  </div>
);

export default WhatIsNotTDDSlide;