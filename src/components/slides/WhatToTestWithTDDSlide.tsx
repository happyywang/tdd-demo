import { useState } from 'react';

interface Section {
  id: string;
  title: string;
  icon: string;
}

// Simple C# syntax highlighter component
const CSharpCode = ({ code }: { code: string }) => {
  const highlightSyntax = (text: string) => {
    const keywords = [
      'using', 'namespace', 'public', 'private', 'class', 'void', 'var', 'new', 'return',
      'if', 'else', 'for', 'while', 'foreach', 'static', 'const', 'readonly'
    ];
    const attributes = ['TestClass', 'TestMethod'];

    // Split by lines
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => {
      const parts: JSX.Element[] = [];
      let remaining = line;
      let partIndex = 0;

      // Check for comments
      if (remaining.trim().startsWith('//')) {
        return (
          <div key={lineIndex}>
            <span className="text-gray-500">{line}</span>
          </div>
        );
      }

      // Check for attributes
      if (remaining.trim().startsWith('[')) {
        const attrMatch = remaining.match(/\[(\w+)\]/);
        if (attrMatch) {
          return (
            <div key={lineIndex}>
              <span className="text-cyan-400">{line}</span>
            </div>
          );
        }
      }

      // Highlight keywords, strings, and types
      let lastIndex = 0;
      const tokens: { start: number; end: number; type: string; text: string }[] = [];

      // Find strings
      const stringRegex = /"([^"]*)"/g;
      let match;
      while ((match = stringRegex.exec(line)) !== null) {
        tokens.push({ start: match.index, end: match.index + match[0].length, type: 'string', text: match[0] });
      }

      // Find keywords
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        while ((match = regex.exec(line)) !== null) {
          tokens.push({ start: match.index, end: match.index + keyword.length, type: 'keyword', text: keyword });
        }
      });

      // Find numbers
      const numberRegex = /\b\d+m?\b/g;
      while ((match = numberRegex.exec(line)) !== null) {
        tokens.push({ start: match.index, end: match.index + match[0].length, type: 'number', text: match[0] });
      }

      // Sort tokens by position
      tokens.sort((a, b) => a.start - b.start);

      // Remove overlapping tokens
      const validTokens = tokens.filter((token, index) => {
        if (index === 0) return true;
        return token.start >= tokens[index - 1].end;
      });

      // Build highlighted line
      let currentPos = 0;
      const highlightedParts: JSX.Element[] = [];

      validTokens.forEach((token, idx) => {
        // Add text before token
        if (token.start > currentPos) {
          highlightedParts.push(
            <span key={`text-${idx}`}>{line.substring(currentPos, token.start)}</span>
          );
        }

        // Add highlighted token
        const colorClass =
          token.type === 'keyword' ? 'text-purple-400' :
          token.type === 'string' ? 'text-green-400' :
          token.type === 'number' ? 'text-orange-400' :
          '';

        highlightedParts.push(
          <span key={`token-${idx}`} className={colorClass}>{token.text}</span>
        );

        currentPos = token.end;
      });

      // Add remaining text
      if (currentPos < line.length) {
        highlightedParts.push(
          <span key="remaining">{line.substring(currentPos)}</span>
        );
      }

      return <div key={lineIndex}>{highlightedParts.length > 0 ? highlightedParts : line}</div>;
    });
  };

  return <>{highlightSyntax(code)}</>;
};

const WhatToTestWithTDDSlide = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections: Section[] = [
    { id: 'questions', title: 'Key Questions for Scope', icon: '❓' },
    { id: 'pyramid', title: 'Testing Pyramid', icon: '🔺' },
    { id: 'granularity', title: 'Granularity of TDD', icon: '🎯' },
    { id: 'comparison', title: 'TDD vs Traditional Tests', icon: '⚖️' }
  ];

  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <Header />

      <SectionTabs
        sections={sections}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />

      <div className="flex-1 flex items-center justify-center">
        <SectionContent sectionId={sections[currentSection].id} />
      </div>

      <NavigationDots
        totalCount={sections.length}
        currentIndex={currentSection}
        onSelect={handleSectionChange}
      />
    </div>
  );
};

const Header = () => (
  <div className="text-center mb-8">
    <h1 className="text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">
      What to Test with TDD
    </h1>
    <p className="text-xl text-[#50DCE1] font-semibold">Knowing Where and How to Apply TDD</p>
  </div>
);

const SectionTabs = ({
  sections,
  currentSection,
  onSectionChange
}: {
  sections: Section[];
  currentSection: number;
  onSectionChange: (index: number) => void;
}) => (
  <div className="flex justify-center space-x-4 mb-8">
    {sections.map((section, index) => (
      <button
        key={section.id}
        onClick={() => onSectionChange(index)}
        className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
          index === currentSection
            ? 'bg-[#50DCE1] text-black'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
        }`}
      >
        <span className="text-xl">{section.icon}</span>
        <span>{section.title}</span>
      </button>
    ))}
  </div>
);

const SectionContent = ({ sectionId }: { sectionId: string }) => {
  switch (sectionId) {
    case 'questions':
      return <KeyQuestionsSection />;
    case 'pyramid':
      return <TestingPyramidSection />;
    case 'granularity':
      return <GranularitySection />;
    case 'comparison':
      return <ComparisonSection />;
    default:
      return <KeyQuestionsSection />;
  }
};

const TestingPyramidSection = () => (
  <div className="max-w-7xl mx-auto flex justify-center">
    {/* Testing Pyramid with Side Labels */}
    <div className="relative" style={{ width: '800px', height: '420px' }}>

      {/* Top Triangle - E2E */}
      <div
        className="absolute flex items-center justify-center text-white font-bold"
        style={{
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '110px',
          height: '80px',
          backgroundColor: '#f87171', // 柔和红色
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
      >
        <div className="text-xl mt-5">E2E</div>
      </div>

      {/* E2E Side Text */}
      <div className="absolute" style={{ top: '50px', right: '120px' }}>
        <div className="text-gray-300 text-lg">Few, Slow</div>
        <div className="text-red-400 font-semibold">❌ Not suitable for TDD</div>
      </div>

      {/* Middle Trapezoid - Integration */}
      <div
        className="absolute flex items-center justify-center text-gray-900 font-bold"
        style={{
          top: '130px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '260px',
          height: '100px',
          backgroundColor: '#fde047', // 柔和黄色
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)'
        }}
      >
        <div className="text-2xl mt-4">Integration</div>
      </div>

      {/* Integration Side Text */}
      <div className="absolute" style={{ top: '160px', right: '100px' }}>
        <div className="text-gray-300 text-lg">Some, Medium</div>
        <div className="text-yellow-400 font-semibold">⚠️ Limited TDD use</div>
      </div>

      {/* Bottom Trapezoid - Unit */}
      <div
        className="absolute flex items-center justify-center text-white font-bold"
        style={{
          top: '250px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '420px',
          height: '120px',
          backgroundColor: '#4ade80', // 舒服的绿色
          clipPath: 'polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)'
        }}
      >
        <div className="text-3xl mt-6">Unit Tests</div>
      </div>

      {/* Unit Tests Side Text */}
      <div className="absolute" style={{ top: '290px', right: '10px' }}>
        <div className="text-gray-300 text-lg">Many, Fast, Cheap</div>
        <div className="text-green-400 font-semibold text-xl">✅ Perfect for TDD</div>
      </div>
    </div>
  </div>
);

const GranularitySection = () => (
  <div className="max-w-5xl mx-auto">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <div className="space-y-6">
          <PrincipleCard
            title="Test Behavior, not Implementation"
            description="Focus on what the code should do, not how it does it"
            icon="🎯"
          />
          <PrincipleCard
            title="Focus on interfaces, not internal steps"
            description="Test the public API and contracts, not private methods"
            icon="🔌"
          />
          <PrincipleCard
            title="Tests don't break when 'how' changes"
            description="Refactoring should not require test changes"
            icon="🔄"
          />
          <PrincipleCard
            title="Tests help team understand code intent"
            description="Tests serve as living documentation"
            icon="📚"
          />
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="text-center mb-4">
          <span className="text-3xl">💡</span>
          <h4 className="text-xl font-bold text-[#50DCE1] mt-2">Think of it as:</h4>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-[#50DCE1]">
          <p className="text-lg text-gray-300 leading-relaxed">
            Testing a restaurant's service (order → meal delivered) rather than testing each individual cooking step in the kitchen.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const PrincipleCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div className="flex items-start space-x-4 bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-[#50DCE1] transition-colors">
    <div className="text-2xl flex-shrink-0">{icon}</div>
    <div>
      <div className="font-semibold text-white text-lg">{title}</div>
      <div className="text-gray-400 text-sm">{description}</div>
    </div>
  </div>
);

const KeyQuestionsSection = () => (
  <div className="max-w-4xl mx-auto">
    <div className="space-y-4">
      <QuestionCard
        question="What behavior am I protecting?"
        description="Identify the specific business rule or functionality that must work correctly."
        icon="🛡️"
        color="text-blue-400"
      />

      <QuestionCard
        question="Will this test survive refactoring?"
        description="If you change the implementation tomorrow, should this test still pass?"
        icon="🔄"
        color="text-green-400"
      />

      <QuestionCard
        question="Is this test too 'big'?"
        description="Does it test too many things at once, making it hard to maintain?"
        icon="📏"
        color="text-yellow-400"
      />

      <QuestionCard
        question="Is this test too 'small'?"
        description="Does it only verify internal implementation rather than meaningful behavior?"
        icon="🔍"
        color="text-red-400"
      />
    </div>
  </div>
);

const QuestionCard = ({
  question,
  description,
  icon,
  color
}: {
  question: string;
  description: string;
  icon: string;
  color: string;
}) => (
  <div className="flex items-start space-x-4 bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-[#50DCE1] transition-colors">
    <div className="text-2xl flex-shrink-0">{icon}</div>
    <div>
      <div className={`font-semibold text-white text-lg ${color}`}>{question}</div>
      <div className="text-gray-400 text-sm">{description}</div>
    </div>
  </div>
);

const ComparisonSection = () => (
  <div className="w-full flex flex-col justify-center space-y-8">
    <div className="max-w-6xl mx-auto">

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-lg font-bold text-[#50DCE1] border-b border-gray-600 w-1/4">
              Aspect
            </th>
            <th className="px-6 py-4 text-left text-lg font-bold text-green-400 border-b border-gray-600 w-3/8">
              TDD-Style Test
            </th>
            <th className="px-6 py-4 text-left text-lg font-bold text-yellow-400 border-b border-gray-600 w-3/8">
              Traditional Unit Test
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700 hover:bg-gray-750">
            <td className="px-6 py-4 font-semibold text-white">Focus</td>
            <td className="px-6 py-4 text-gray-300">
              Observable behavior and business rules (what the system should do)
            </td>
            <td className="px-6 py-4 text-gray-300">
              Implementation correctness and internal logic (how the system does it)
            </td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-750">
            <td className="px-6 py-4 font-semibold text-white">Naming</td>
            <td className="px-6 py-4 text-gray-300">
              Describe behavior or requirements (e.g., Should_X_When_Y)
            </td>
            <td className="px-6 py-4 text-gray-300">
              Describe methods or logic (e.g., TestMethod_XYZ)
            </td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-750">
            <td className="px-6 py-4 font-semibold text-white">Granularity</td>
            <td className="px-6 py-4 text-gray-300">
              Very small, single behavior per test
            </td>
            <td className="px-6 py-4 text-gray-300">
              May test multiple paths or internal states
            </td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-750">
            <td className="px-6 py-4 font-semibold text-white">Dependency</td>
            <td className="px-6 py-4 text-gray-300">
              Only public interfaces (black-box style)
            </td>
            <td className="px-6 py-4 text-gray-300">
              Often white-box, internal details
            </td>
          </tr>
          <tr className="hover:bg-gray-750">
            <td className="px-6 py-4 font-semibold text-white">Readability</td>
            <td className="px-6 py-4 text-gray-300">
              Like specifications ("what should happen")
            </td>
            <td className="px-6 py-4 text-gray-300">
              Like verifications ("does this code return the right value")
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>

    {/* Code Comparison Section */}
    <div className="max-w-7xl mx-auto w-full">
      <h3 className="text-2xl font-bold text-[#50DCE1] mb-6 text-center flex items-center justify-center gap-3">
        <span className="bg-blue-600 text-white px-2 py-1 rounded text-lg font-bold">VS</span>
        Code Example: Discount Calculator
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* TDD-Style Test Code */}
        <section className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-bold mb-4 text-green-400">
            TDD-Style Test
          </h4>
          <div
            className="bg-black p-4 rounded-lg overflow-auto font-mono text-sm text-gray-300"
            style={{
              minHeight: '350px',
              maxHeight: '500px'
            }}
          >
            <pre className="whitespace-pre-wrap">
              <code><CSharpCode code={`using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class DiscountCalculatorTests
{
    [TestMethod]
    public void Should_ApplyTenPercentDiscount_When_AmountIs100OrMore()
    {
        // Arrange
        var calculator = new DiscountCalculator();

        // Act
        var result = calculator.Calculate(120);

        // Assert
        Assert.AreEqual(108m, result);
    }

    [TestMethod]
    public void Should_NotApplyDiscount_When_AmountIsBelow100()
    {
        // Arrange
        var calculator = new DiscountCalculator();

        // Act
        var result = calculator.Calculate(80);

        // Assert
        Assert.AreEqual(80m, result);
    }
}`} /></code>
            </pre>
          </div>
        </section>

        {/* Traditional Unit Test Code */}
        <section className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-bold mb-4 text-yellow-400">
            Traditional Unit Test
          </h4>
          <div
            className="bg-black p-4 rounded-lg overflow-auto font-mono text-sm text-gray-300"
            style={{
              minHeight: '350px',
              maxHeight: '500px'
            }}
          >
            <pre className="whitespace-pre-wrap">
              <code><CSharpCode code={`using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class DiscountCalculatorTests
{
    [TestMethod]
    public void Calculate_ReturnsExpectedResults()
    {
        // Arrange
        var calculator = new DiscountCalculator();

        // Act
        var result1 = calculator.Calculate(80);
        var result2 = calculator.Calculate(120);
        var result3 = calculator.Calculate(200);

        // Assert
        Assert.AreEqual(80m, result1);
        Assert.AreEqual(108m, result2);
        Assert.AreEqual(180m, result3);
    }
}`} /></code>
            </pre>
          </div>
        </section>
      </div>
    </div>
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
  <div className="flex justify-center space-x-3 mt-8">
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

export default WhatToTestWithTDDSlide;