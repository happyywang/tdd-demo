"use client";
import { useState, useEffect } from 'react';
import { LAYOUT, ANIMATIONS, CONTENT, DEMO_CONFIG } from './constants';
import { Slide, DemoStep, PingPongPhase } from './types';
import DemoSlide from './components/slides/DemoSlide';
import TDDBestPracticesSlide from './components/slides/TDDBestPracticesSlide';
import BugFirstTDDSlide from './components/slides/BugFirstTDDSlide';
import AnimatedPingPong from './components/slides/AnimatedPingPong';
import TDDCycleSlide from './components/slides/TDDCycleSlide';
import WhatToTestWithTDDSlide from './components/slides/WhatToTestWithTDDSlide';
import WhatIsNotTDDSlide from './components/slides/WhatIsNotTDDSlide';

// All TypeScript interfaces moved to types.ts

// Demo Steps Data
const demoSteps: DemoStep[] = [
  {
    title: "Step 1: Think - Deposit (The simplest possible behavior) 🧠",
    description: "The client needs a bank account that can accept deposits. If the client deposits 100, the balance should become 100. Smallest possible test case - no need to think about withdraw or limits yet.",
    phase: "think",
    testScenarios: [
      {
        id: "deposit",
        description: "Deposit money → balance increases",
        examples: "Deposit(100) → Balance = 100",
        isCompleted: false
      }
    ],
    productionGoals: [
      "BankAccount class with Balance property",
      "Deposit(decimal amount) method",
      "Balance tracks total deposits"
    ],
    allTestsCode: `// Starting with the simplest behavior:
// - Deposit money into account
// - Check balance reflects the deposit`,
    productionCode: `// Goal: Build a simple bank account system
// Starting with deposit functionality - the most basic operation`,
    testResults: [],
    testStats: { total: 0, passed: 0, failed: 0 }
  },
  {
    title: "Step 2: Red - Test for Regular Numbers 🔴",
    description: "Write the first failing test for regular numbers (not divisible by 3 or 5). This test will fail because the method doesn't exist yet.",
    phase: "red",
    allTestsCode: `[TestMethod]
public void Convert_Returns_Number_For_NonFizzBuzz_Input()
{
    Assert.AreEqual("1", FizzBuzz.Convert(1));
}`,
    productionCode: `// FizzBuzz.cs
public class FizzBuzz
{
    // No method yet!
}`,
    testResults: [
      { name: "Convert_Returns_Number_For_NonFizzBuzz_Input", status: "fail", message: "'FizzBuzz.Convert(int)' does not exist" }
    ],
    testStats: { total: 1, passed: 0, failed: 1 }
  },
  {
    title: "Step 3: Green - Make it Pass 🟢",
    description: "Write the absolute minimum code to make the test pass. A simple `ToString()` conversion is all we need.",
    phase: "green",
    allTestsCode: `[TestMethod]
public void Convert_Returns_Number_For_NonFizzBuzz_Input()
{
    Assert.AreEqual("1", FizzBuzz.Convert(1));
}`,
    productionCode: `// FizzBuzz.cs
public class FizzBuzz
{
    public static string Convert(int input)
    {
        return input.ToString();
    }
}`,
    testResults: [
      { name: "Convert_Returns_Number_For_NonFizzBuzz_Input", status: "pass", message: "✓ Test passed" }
    ],
    testStats: { total: 1, passed: 1, failed: 0 }
  },
  {
    title: "Step 4: Red - Test for 'Fizz' 🔴",
    description: "Add a new failing test for numbers divisible by 3. The existing code will fail this new test.",
    phase: "red",
    allTestsCode: `[TestMethod]
public void Convert_Returns_Number_For_NonFizzBuzz_Input()
{
    Assert.AreEqual("1", FizzBuzz.Convert(1));
}

[TestMethod]
public void Convert_Returns_Fizz_For_Multiples_Of_Three()
{
    Assert.AreEqual("Fizz", FizzBuzz.Convert(3));
}`,
    productionCode: `// FizzBuzz.cs - existing code will fail new test
public class FizzBuzz
{
    public static string Convert(int input)
    {
        return input.ToString();
    }
}`,
    testResults: [
      { name: "Convert_Returns_Number_For_NonFizzBuzz_Input", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_Fizz_For_Multiples_Of_Three", status: "fail", message: 'Expected "Fizz" but was "3"' }
    ],
    testStats: { total: 2, passed: 1, failed: 1 }
  },
  {
    title: "Step 5: Green - Make Fizz Test Pass 🟢",
    description: "Add a simple `if` statement to handle the Fizz case. Make both tests pass.",
    phase: "green",
    allTestsCode: `[TestMethod]
public void Convert_Returns_Number_For_NonFizzBuzz_Input()
{
    Assert.AreEqual("1", FizzBuzz.Convert(1));
}

[TestMethod]
public void Convert_Returns_Fizz_For_Multiples_Of_Three()
{
    Assert.AreEqual("Fizz", FizzBuzz.Convert(3));
}`,
    productionCode: `// FizzBuzz.cs
public class FizzBuzz
{
    public static string Convert(int input)
    {
        if (input % 3 == 0)
        {
            return "Fizz";
        }
        return input.ToString();
    }
}`,
    testResults: [
      { name: "Convert_Returns_Number_For_NonFizzBuzz_Input", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_Fizz_For_Multiples_Of_Three", status: "pass", message: "✓ Test passed" }
    ],
    testStats: { total: 2, passed: 2, failed: 0 }
  },
  {
    title: "Step 6: Red - Test for 'Buzz' 🔴",
    description: "Add a failing test for numbers divisible by 5. This new test will fail.",
    phase: "red",
    allTestsCode: `[TestMethod]
public void Convert_Returns_Number_For_NonFizzBuzz_Input()
{
    Assert.AreEqual("1", FizzBuzz.Convert(1));
}

[TestMethod]
public void Convert_Returns_Fizz_For_Multiples_Of_Three()
{
    Assert.AreEqual("Fizz", FizzBuzz.Convert(3));
}

[TestMethod]
public void Convert_Returns_Buzz_For_Multiples_Of_Five()
{
    Assert.AreEqual("Buzz", FizzBuzz.Convert(5));
}`,
    productionCode: `// FizzBuzz.cs - existing code will fail new test
public class FizzBuzz
{
    public static string Convert(int input)
    {
        if (input % 3 == 0)
        {
            return "Fizz";
        }
        return input.ToString();
    }
}`,
    testResults: [
      { name: "Convert_Returns_Number_For_NonFizzBuzz_Input", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_Fizz_For_Multiples_Of_Three", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_Buzz_For_Multiples_Of_Five", status: "fail", message: 'Expected "Buzz" but was "5"' }
    ],
    testStats: { total: 3, passed: 2, failed: 1 }
  },
  {
    title: "Step 7: Green - Make Buzz Test Pass 🟢",
    description: "Add another `if` statement to handle the Buzz case. Make all tests pass.",
    phase: "green",
    allTestsCode: `[TestMethod]
public void Convert_Returns_Number_For_NonFizzBuzz_Input()
{
    Assert.AreEqual("1", FizzBuzz.Convert(1));
}

[TestMethod]
public void Convert_Returns_Fizz_For_Multiples_Of_Three()
{
    Assert.AreEqual("Fizz", FizzBuzz.Convert(3));
}

[TestMethod]
public void Convert_Returns_Buzz_For_Multiples_Of_Five()
{
    Assert.AreEqual("Buzz", FizzBuzz.Convert(5));
}`,
    productionCode: `// FizzBuzz.cs
public class FizzBuzz
{
    public static string Convert(int input)
    {
        if (input % 3 == 0) return "Fizz";
        if (input % 5 == 0) return "Buzz";
        return input.ToString();
    }
}`,
    testResults: [
      { name: "Convert_Returns_Number_For_NonFizzBuzz_Input", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_Fizz_For_Multiples_Of_Three", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_Buzz_For_Multiples_Of_Five", status: "pass", message: "✓ Test passed" }
    ],
    testStats: { total: 3, passed: 3, failed: 0 }
  },
  {
    title: "Step 8: Red - Test for 'FizzBuzz' 🔴",
    description: "The final test: numbers divisible by both 3 and 5 should return 'FizzBuzz'. Our current logic incorrectly returns 'Fizz'.",
    phase: "red",
    allTestsCode: `[TestMethod]
public void Convert_Returns_Number_For_NonFizzBuzz_Input()
{
    Assert.AreEqual("1", FizzBuzz.Convert(1));
}

[TestMethod]
public void Convert_Returns_Fizz_For_Multiples_Of_Three()
{
    Assert.AreEqual("Fizz", FizzBuzz.Convert(3));
}

[TestMethod]
public void Convert_Returns_Buzz_For_Multiples_Of_Five()
{
    Assert.AreEqual("Buzz", FizzBuzz.Convert(5));
}

[TestMethod]
public void Convert_Returns_FizzBuzz_For_Multiples_Of_Three_And_Five()
{
    Assert.AreEqual("FizzBuzz", FizzBuzz.Convert(15));
}`,
    productionCode: `// FizzBuzz.cs - current logic has a bug!
public class FizzBuzz
{
    public static string Convert(int input)
    {
        if (input % 3 == 0) return "Fizz";  // This runs first!
        if (input % 5 == 0) return "Buzz";
        return input.ToString();
    }
}`,
    testResults: [
      { name: "Convert_Returns_Number_For_NonFizzBuzz_Input", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_Fizz_For_Multiples_Of_Three", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_Buzz_For_Multiples_Of_Five", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_FizzBuzz_For_Multiples_Of_Three_And_Five", status: "fail", message: 'Expected "FizzBuzz" but was "Fizz"' }
    ],
    testStats: { total: 4, passed: 3, failed: 1 }
  },
  {
    title: "Step 9: Green - Make FizzBuzz Test Pass 🟢",
    description: "To fix this, we must check for the 'FizzBuzz' case first. Now all tests pass, and our logic is complete.",
    phase: "green",
    allTestsCode: `[TestMethod]
public void Convert_Returns_Number_For_NonFizzBuzz_Input()
{
    Assert.AreEqual("1", FizzBuzz.Convert(1));
}

[TestMethod]
public void Convert_Returns_Fizz_For_Multiples_Of_Three()
{
    Assert.AreEqual("Fizz", FizzBuzz.Convert(3));
}

[TestMethod]
public void Convert_Returns_Buzz_For_Multiples_Of_Five()
{
    Assert.AreEqual("Buzz", FizzBuzz.Convert(5));
}

[TestMethod]
public void Convert_Returns_FizzBuzz_For_Multiples_Of_Three_And_Five()
{
    Assert.AreEqual("FizzBuzz", FizzBuzz.Convert(15));
}`,
    productionCode: `// FizzBuzz.cs - Fixed!
public class FizzBuzz
{
    public static string Convert(int input)
    {
        if (input % 3 == 0 && input % 5 == 0) return "FizzBuzz";
        if (input % 3 == 0) return "Fizz";
        if (input % 5 == 0) return "Buzz";
        return input.ToString();
    }
}`,
    testResults: [
      { name: "Convert_Returns_Number_For_NonFizzBuzz_Input", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_Fizz_For_Multiples_Of_Three", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_Buzz_For_Multiples_Of_Five", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_FizzBuzz_For_Multiples_Of_Three_And_Five", status: "pass", message: "✓ Test passed" }
    ],
    testStats: { total: 4, passed: 4, failed: 0 }
  },
  {
    title: "Step 10: Refactor - Clean Up the Code 🔵",
    description: "The code works, but it's not elegant. We can refactor it to remove the nested `if` conditions. Our tests give us the confidence to make these changes without breaking anything.",
    phase: "refactor",
    allTestsCode: `// All tests remain unchanged - they're our safety net!
[TestMethod]
public void Convert_Returns_Number_For_NonFizzBuzz_Input()
{
    Assert.AreEqual("1", FizzBuzz.Convert(1));
}

[TestMethod]
public void Convert_Returns_Fizz_For_Multiples_Of_Three()
{
    Assert.AreEqual("Fizz", FizzBuzz.Convert(3));
}

[TestMethod]
public void Convert_Returns_Buzz_For_Multiples_Of_Five()
{
    Assert.AreEqual("Buzz", FizzBuzz.Convert(5));
}

[TestMethod]
public void Convert_Returns_FizzBuzz_For_Multiples_Of_Three_And_Five()
{
    Assert.AreEqual("FizzBuzz", FizzBuzz.Convert(15));
}`,
    productionCode: `// FizzBuzz.cs - Modern C# with switch expressions!
public class FizzBuzz
{
    public static string Convert(int input) => (input % 3, input % 5) switch
    {
        (0, 0) => "FizzBuzz",
        (0, _) => "Fizz",
        (_, 0) => "Buzz",
        _ => input.ToString()
    };
}`,
    testResults: [
      { name: "Convert_Returns_Number_For_NonFizzBuzz_Input", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_Fizz_For_Multiples_Of_Three", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_Buzz_For_Multiples_Of_Five", status: "pass", message: "✓ Test passed" },
      { name: "Convert_Returns_FizzBuzz_For_Multiples_Of_Three_And_Five", status: "pass", message: "✓ Test passed" }
    ],
    testStats: { total: 4, passed: 4, failed: 0 }
  }
];

const TDDPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define all slides/sections
  const slides: Slide[] = [
    // Slide 0: Title/Home
    {
      id: 'home',
      title: 'User Group TDD',
      type: 'title'
    },
    // Slide 1: Agenda
    {
      id: 'agenda',
      title: 'Agenda',
      type: 'agenda'
    },
    // Slide 2: History
    {
      id: 'history',
      title: 'History of TDD',
      type: 'history'
    },
    // Slide 3: What is TDD
    {
      id: 'what-is-tdd',
      title: 'What is TDD',
      type: 'what-is-tdd'
    },
    // Slide 4: Why TDD
    {
      id: 'why-tdd',
      title: 'Why TDD',
      type: 'why-tdd'
    },
    // Slide 5: What to Test with TDD
    {
      id: 'what-to-test-with-tdd',
      title: 'What to Test with TDD',
      type: 'what-to-test-with-tdd'
    },
    // Slide 6: What is NOT TDD
    {
      id: 'what-is-not-tdd',
      title: 'What is NOT TDD',
      type: 'what-is-not-tdd'
    },
    // Slide 6: Disadvantages
    {
      id: 'disadvantages',
      title: 'Disadvantages of TDD',
      type: 'disadvantages'
    },
    // Slide 7: TDD Best Practices
    {
      id: 'tdd-best-practices',
      title: 'TDD Best Practices',
      type: 'tdd-best-practices'
    },
    // Slide 8: Demo
    {
      id: 'demo',
      title: 'Demo',
      type: 'demo'
    },
    // Slide 9: Bug-First TDD
    {
      id: 'bug-first-tdd',
      title: 'TDD From the Trenches: Bug-Driven Development',
      type: 'bug-first-tdd'
    },
    // Slide 10: Kent Beck Quote
    {
      id: 'kent-beck-quote',
      title: 'Kent Beck Quote',
      type: 'kent-beck-quote'
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Home') {
        setCurrentSlide(0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Title Slide Component
  const TitleSlide = () => (
    <div className="relative flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" style={{minHeight: LAYOUT.SLIDE_MIN_HEIGHT}}>
      {/* Company Logo - Top Left */}
      <div className="absolute top-8 left-8">
        <img
          src="https://contenthub.rosen-nxt.com/api/public/content/2e51318a231c4dfdaf772eb018039c48?v=bd2b3919"
          alt="inqu company logo"
          className="h-16 w-auto"
        />
      </div>

      <h1 className="text-8xl font-bold mb-8 leading-tight bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">
        User Group TDD
      </h1>
      <p className="text-4xl text-[#50DCE1] font-semibold mb-6">Test-Driven Development</p>
      <p className="text-2xl text-gray-300 mt-4">Yan Wang</p>
    </div>
  );

  // Agenda Slide Component
  const AgendaSlide = () => {
    const agendaItems = [
      { title: "History", subtitle: "Origins of TDD", icon: "📚" },
      { title: "What is TDD", subtitle: "Core Concepts", icon: "🔍" },
      { title: "Why TDD", subtitle: "Benefits & Value", icon: "💡" },
      { title: "What to Test with TDD", subtitle: "Testing Pyramid & Scope", icon: "🎯" },
      { title: "What is NOT TDD", subtitle: "Common Misconceptions", icon: "❌" },
      { title: "Disadvantages", subtitle: "Honest Assessment", icon: "⚠️" },
      { title: "TDD Best Practices", subtitle: "Essential Practices", icon: "🎯" },
      { title: "Demo", subtitle: "Hands-on Practice", icon: "🚀" }
    ];

    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <h1 className="text-6xl font-bold mb-12 leading-tight text-center bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">
          Agenda
        </h1>
        <div className="grid md:grid-cols-2 gap-6 flex-1">
          {agendaItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 border border-gray-700 hover:border-[#50DCE1] transition-all cursor-pointer transform hover:scale-105"
              onClick={() => goToSlide(index + 2)}
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  <p className="text-[#50DCE1]">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // What is TDD Slide (Progressive TDD Cycles)
  const WhatIsTDDSlide = () => {
    const [showExtended, setShowExtended] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // Traditional 3-step cycle
    const traditionalSteps = [
      {
        name: "Red",
        color: "bg-red-500",
        title: "Write Failing Test",
        description: "Write a test first, it will fail",
        code: `[TestMethod]
public void IsEven_GivenOddNumber_ReturnsFalse()
{
    var checker = new NumberChecker();
    var result = checker.IsEven(3);
    Assert.IsFalse(result); // ❌ Fails – method not implemented
}`
      },
      {
        name: "Green", 
        color: "bg-green-500",
        title: "Make Test Pass",
        description: "Write simplest code to pass the test",
        code: `public class NumberChecker
{
    public bool IsEven(int number)
    {
        return false; // 💡 Hard-coded ， passes current test
    }
}
// ✅ Test passes!`
      },
      {
        name: "Refactor",
        color: "bg-blue-500", 
        title: "Improve Code",
        description: "Optimize code quality while keeping tests green",
        code: `public class NumberChecker
{
    public bool IsEven(int number)
    {
        return number % 2 == 0; // 💡 Generalized solution
    }
}`
      }
    ];

    // Extended 4-step cycle (TRGR)
    const extendedSteps = [
      {
        name: "Think",
        color: "bg-purple-500",
        title: "Identify Next Small Behavior",
        description: "Identify the next small behavior or feature you want to implement. Think about what test will best guide that implementation.",
        code: `// What does “even” mean for integers?
// What should the method return for odd numbers?
// Should zero be considered even?
// Are negative numbers supported?`
      },
      ...traditionalSteps
    ];

    const currentSteps = showExtended ? extendedSteps : traditionalSteps;
    const currentStepData = currentSteps[currentStep];

    const nextStep = () => {
      setCurrentStep((prev) => (prev + 1) % currentSteps.length);
    };

    const toggleExtended = () => {
      setShowExtended(!showExtended);
      setCurrentStep(0);
    };

    return (
      <div className="min-h-screen bg-gray-900 p-8 overflow-auto flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-2 leading-tight text-white">What is TDD?</h1>
          <p className="text-xl text-gray-300 mb-2">A development methodology where tests drive the design of production code</p>
          <p className="text-lg text-gray-400">Tests are written before the production code</p>
        </div>

        {/* Toggle between 3-step and 4-step */}
        <div className="text-center mb-6">
          <button
            onClick={toggleExtended}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-full text-white font-bold transition-all transform hover:scale-105"
          >
            {showExtended ? 'Show Traditional 3-Step TDD' : 'Show Enhanced 4-Step TRGR Cycle'}
          </button>
        </div>

        {/* Main content area with flex-grow */}
        <div className="flex-grow flex flex-col">
          <div className={`${currentStepData.color} p-6 rounded-2xl mb-6 text-center flex flex-col`}>
            <h2 className="text-3xl font-bold mb-3">
              {showExtended ? `${currentStep + 1}. ` : ''}{currentStepData.name}: {currentStepData.title}
            </h2>
            <p className="text-lg mb-3">{currentStepData.description}</p>
            
            <div className="bg-gray-900 rounded-lg p-3 mb-4 text-left max-h-40 overflow-auto">
              <pre className="text-sm">
                <code className="text-gray-100 font-mono whitespace-pre">
{currentStepData.code}
                </code>
              </pre>
            </div>

            <button
              onClick={nextStep}
              className="bg-white text-gray-900 px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition-colors mx-auto"
            >
              Next: {currentSteps[(currentStep + 1) % currentSteps.length].name}
            </button>
          </div>

          {/* Bottom cycle overview - ensures visibility */}
          <div className="mt-auto">
            <h3 className="text-xl font-bold mb-4 text-center text-white">
              {showExtended ? 'The 4-Step TRGR Cycle' : 'The Traditional 3-Step TDD Cycle'}
            </h3>
            <div className={`grid gap-4 ${showExtended ? 'grid-cols-4' : 'grid-cols-3'} max-w-4xl mx-auto`}>
              {currentSteps.map((step, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    index === currentStep
                      ? `${step.color} border-white scale-105 shadow-lg`
                      : 'bg-gray-800 border-gray-600 opacity-70 hover:opacity-100 hover:scale-102'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <h4 className="text-lg font-bold mb-2 text-white">
                    {showExtended ? `${index + 1}. ` : ''}{step.name}
                  </h4>
                  <p className="text-sm text-gray-300">{step.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom spacer */}
        <div className="h-8"></div>
      </div>
    );
  };

  // History Slide Component
  const HistorySlide = () => {
    const timelineEvents = [
      {
        year: "1980s",
        description: "Early academic pioneers plant the seeds of \"test first,\" challenging traditional workflows.",
        icon: "🌱",
        color: "amber",
        avatar: null
      },
      {
        year: "1999",
        description: "Kent Beck formalizes TDD in \"Extreme Programming Explained: Embrace Change,\" making \"test before code\" a clear methodology.",
        icon: "📘",
        color: "orange",
        avatar: "/kent-beck.webp"
      },
      {
        year: "2000s",
        description: "xUnit frameworks (SUnit, JUnit, NUnit) bring TDD to mainstream developers; Agile teams begin to adopt.",
        icon: "🔧",
        color: "green",
        avatar: null
      },
      {
        year: "2010s–Now",
        description: "TDD is woven into Agile, CI/CD, and enhanced by cloud & AI testing tools. It's moved from a controversial idea to a daily best practice.",
        icon: "🚀",
        color: "purple",
        avatar: null
      }
    ];

    const getColorClasses = (color: string) => {
      const colorMap: { [key: string]: { text: string; bg: string; border: string; bgLight: string } } = {
        amber: {
          text: 'text-[#50DCE1]',
          bg: 'bg-gradient-to-br from-slate-600 to-slate-700',
          border: 'border-[#50DCE1]',
          bgLight: 'bg-slate-800/50'
        },
        orange: {
          text: 'text-[#50DCE1]',
          bg: 'bg-gradient-to-br from-[#50DCE1] to-cyan-500',
          border: 'border-[#50DCE1]',
          bgLight: 'bg-[#50DCE1]/10'
        },
        green: {
          text: 'text-[#50DCE1]',
          bg: 'bg-gradient-to-br from-slate-500 to-slate-600',
          border: 'border-[#50DCE1]',
          bgLight: 'bg-slate-700/50'
        },
        purple: {
          text: 'text-[#50DCE1]',
          bg: 'bg-gradient-to-br from-[#50DCE1] to-slate-500',
          border: 'border-[#50DCE1]',
          bgLight: 'bg-slate-800/30'
        }
      };
      return colorMap[color] || colorMap.amber;
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 overflow-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">
            History of TDD
          </h1>
          <p className="text-xl text-[#50DCE1]">Evolution of Test-Driven Development</p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#50DCE1] via-slate-400 to-[#50DCE1] rounded-full opacity-30"></div>
          
          {timelineEvents.map((event, index) => {
            const colors = getColorClasses(event.color);
            
            return (
              <div key={index} className="relative flex items-center mb-16 last:mb-8">
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`${colors.bg} rounded-full w-20 h-20 flex items-center justify-center shadow-xl border-4 border-white`}>
                    {event.avatar ? (
                      <img 
                        src={event.avatar} 
                        alt="Kent Beck"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white"
                      />
                    ) : (
                      <span className="text-2xl text-white">{event.icon}</span>
                    )}
                  </div>
                </div>
                
                {/* Content card - alternating left/right */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'ml-0 mr-auto pr-12' : 'ml-auto mr-0 pl-12'}`}>
                  <div className={`${colors.bgLight} backdrop-blur-sm p-6 rounded-2xl border ${colors.border} border-opacity-30 shadow-xl transform hover:scale-105 transition-all duration-300`}>
                    {/* Year badge */}
                    <div className={`inline-block ${colors.bg} text-white px-4 py-2 rounded-full font-bold text-lg mb-4 shadow-lg`}>
                      {event.year}
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-200 text-lg leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom summary */}
        <div className="text-center mt-16 max-w-3xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-[#50DCE1]/30 hover:border-[#50DCE1] transition-all">
            <p className="text-xl text-gray-300 italic leading-relaxed">
              "TDD's journey is a story of challenging habits, proving value, and shaping how modern software is built."
            </p>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-16"></div>
      </div>
    );
  };

  const DisadvantagesSlide = () => {
    const [currentView, setCurrentView] = useState('challenges'); // 'challenges', 'mitigation', 'reality'
    const [currentChallenge, setCurrentChallenge] = useState(0);

    const challenges = [
      {
        title: "Unclear or Unstable Requirements",
        icon: "🔧",
        color: "bg-gradient-to-br from-slate-700 to-slate-800",
        problem: "TDD relies on precise, testable specifications.",
        impact: "Teams either skip the TDD cycle or waste time rewriting tests after each requirement change.",
        detail: "If requirements are vague or frequently changing, it's hard to define \"the failing test\".",
        mitigation: "Collaborate closely with product owners to clarify expected behaviors before writing tests",
        practicalTip: "Use short example-based discussions (\"Given–When–Then\") to turn vague requirements into concrete test cases."
      },
      {
        title: "Mindset Shift",
        icon: "🧠",
        color: "bg-gradient-to-br from-slate-700 to-slate-800",
        problem: "Requires fundamental change from 'code first' to 'test first' thinking",
        impact: "Developers feel slower and uncomfortable initially",
        detail: "Years of 'write code then test' habits are hard to break. Feels unnatural and counterintuitive at first.",
        mitigation: "Gradual adoption, promote a test-first culture through pair programming.",
        practicalTip: "Begin each feature by writing one small failing test before implementing any code."
      },
      {
        title: "Writing High-Quality, Behavior-Focused Tests",
        icon: "🎯",
        color: "bg-gradient-to-br from-slate-800 to-slate-700",
        problem: "TDD requires more than just having tests — it demands tests that express business intent, boundaries, and expected behavior.",
        impact: "Poorly written tests fail to guide design and reduce TDD's real value.",
        detail: "Many existing tests verify internal logic or code paths rather than user-facing outcomes.",
        mitigation: "Focus tests on observable business outcomes rather than internal logic.",
        practicalTip: "Use expressive test names and scenarios to describe business intent, not technical details."
      },
      {
        title: "Initial Slowdown",
        icon: "🐌",
        color: "bg-gradient-to-br from-slate-600 to-slate-700",
        problem: "15-35% longer development time initially (research confirmed)",
        impact: "Pressure from management and tight deadlines create resistance",
        detail: "Writing tests first feels like doing double work. Team velocity appears to drop in early sprints.",
        mitigation: "Set realistic expectations: TDD feels slower initially but accelerates long-term quality and refactoring.",
        practicalTip: "Compare defect rates, debugging hours, and maintenance costs."
      }
    ];

    const nextChallenge = () => {
      if (currentView === 'challenges') {
        setCurrentChallenge((prev) => (prev + 1) % challenges.length);
      }
    };

    const renderChallengesView = () => {
      const current = challenges[currentChallenge];
      
      return (
        <div className="h-full flex flex-col py-2">
          <div className={`${current.color} p-3 rounded-xl mb-2 flex-1 flex flex-col justify-center overflow-y-auto`}>
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">{current.icon}</div>
              <h3 className="text-3xl font-bold mb-3">{current.title}</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                <h4 className="text-lg font-bold text-red-200 mb-2">🚫 The Problem:</h4>
                <p className="text-lg mb-2">{current.problem}</p>
                <p className="text-base text-gray-200 italic">{current.detail}</p>
              </div>

              <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                <h4 className="text-lg font-bold text-orange-200 mb-2">💥 The Impact:</h4>
                <p className="text-lg">{current.impact}</p>
              </div>
            </div>
          </div>

          <button
            onClick={nextChallenge}
            className="bg-white text-gray-900 px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition-colors mx-auto mb-3"
          >
            Next Challenge →
          </button>

          <div className="flex justify-center space-x-2">
            {challenges.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentChallenge(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentChallenge 
                    ? 'bg-orange-400 transform scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      );
    };

    const renderMitigationView = () => {
      return (
        <div className="h-full flex flex-col justify-start pt-4">
          <div className="max-w-7xl mx-auto w-full">

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-lg font-bold text-red-400 border-b border-gray-600 w-1/3">
                      Challenge
                    </th>
                    <th className="px-4 py-3 text-left text-lg font-bold text-green-400 border-b border-gray-600 w-1/3">
                      Solution
                    </th>
                    <th className="px-4 py-3 text-left text-lg font-bold text-blue-400 border-b border-gray-600 w-1/3">
                      Practical Tip
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {challenges.map((challenge, index) => (
                    <tr key={index} className={`border-b border-gray-700 hover:bg-gray-750 ${index === challenges.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{challenge.icon}</span>
                          <span className="font-semibold text-white text-sm">{challenge.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-base">
                        {challenge.mitigation}
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-base">
                        {challenge.practicalTip}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };


    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">TDD Challenges</h1>
          <p className="text-xl text-gray-300">Let's be honest about the difficulties</p>

          {/* View Toggle */}
          <div className="flex justify-center space-x-2 mt-6">
            {[
              { key: 'challenges', label: '⚠️ Challenges', color: 'bg-[#50DCE1]' },
              { key: 'mitigation', label: '💡 Solutions', color: 'bg-[#50DCE1]' }
            ].map(view => (
              <button
                key={view.key}
                onClick={() => setCurrentView(view.key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
                  currentView === view.key
                    ? `${view.color} text-black`
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:border-[#50DCE1] border border-transparent'
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Render Current View */}
        <div className="flex-1">
          {currentView === 'challenges' && renderChallengesView()}
          {currentView === 'mitigation' && renderMitigationView()}
        </div>
      </div>
    );
  };
  const WhyTDDSlide = () => {
    const [currentView, setCurrentView] = useState('daily'); // 'daily', 'research', 'comparison'
    const [currentBenefit, setCurrentBenefit] = useState(0);

    const dailyBenefits = [
      {
        title: "Confidence to Refactor & Change Code",
        icon: "🛡️",
        color: "bg-gradient-to-br from-slate-700 to-slate-800",
        description: "No more fear of breaking existing functionality",
        detail: "Tests act as a safety net, allowing bold refactoring and feature additions without anxiety"
      },
      {
        title: "Better Code Design & Architecture",
        icon: "🎨",
        color: "bg-gradient-to-br from-slate-600 to-slate-700",
        description: "Tests force you to think from user's perspective",
        detail: "Writing the test first makes you design more intuitive, testable interfaces"
      },
      {
        title: "Fast Feedback Loop",
        icon: "⚡",
        color: "bg-gradient-to-br from-cyan-300 to-cyan-400",
        description: "Know immediately when something breaks",
        detail: "Instant validation of code changes, help team spot defects early and isolate problems"
      },
      {
        title: "Faster Debugging",
        icon: "🐛",
        color: "bg-gradient-to-br from-[#50DCE1] to-cyan-500",
        description: "When tests fail, you know exactly what broke",
        detail: "Pinpoint issues to specific behavior. Less time spent hunting for problems"
      },
      {
        title: "Living Documentation",
        icon: "📚",
        color: "bg-gradient-to-br from-[#50DCE1] to-slate-500",
        description: "Tests show exactly what the system should behave",
        detail: "Tests evolve with the product and always stay current as features change"
      }
    ];

    const researchData = {
      nagappan2008: {
        title: "Microsoft & IBM Study (Nagappan et al., 2008)",
        defectReduction: "40-91%",
        timeIncrease: "15-35%",
        teams: "Four professional teams",
        credibility: "High - published research from major tech companies",
        sourceLink: "https://www.microsoft.com/en-us/research/wp-content/uploads/2009/10/Realizing-Quality-Improvement-Through-Test-Driven-Development-Results-and-Experiences-of-Four-Industrial-Teams-nagappan_tdd.pdf"
      },
      metaAnalysis: {
        title: "Systematic Review (2016)",
        qualityImprovement: "76% of studies showed significant internal quality increase",
        externalQuality: "88% showed significant external quality increase",
        source: "ScienceDirect systematic review",
        sourceLink: "https://www.sciencedirect.com/science/article/abs/pii/S0950584916300222"
      }
    };

    const nextBenefit = () => {
      if (currentView === 'daily') {
        setCurrentBenefit((prev) => (prev + 1) % dailyBenefits.length);
      }
    };

    const renderDailyView = () => {
      const current = dailyBenefits[currentBenefit];
      
      return (
        <div className="h-full flex flex-col">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-4 leading-tight text-[#50DCE1]">Daily Developer Benefits</h2>
            <p className="text-lg text-gray-300">What TDD feels like in practice</p>
          </div>

          <div className={`${current.color} p-8 rounded-2xl mb-6 text-center flex-1 flex flex-col justify-center`}>
            <div className="text-6xl mb-4">{current.icon}</div>
            <h3 className={`text-3xl font-bold mb-4 ${current.title === 'Faster Debugging' || current.title === 'Fast Feedback Loop' || current.title === 'Living Documentation' ? 'text-black' : ''}`}>{current.title}</h3>
            <p className={`text-xl mb-4 italic ${current.title === 'Faster Debugging' || current.title === 'Fast Feedback Loop' || current.title === 'Living Documentation' ? 'text-black' : ''}`}>"{current.description}"</p>
            <div className="bg-black bg-opacity-30 p-4 rounded-lg">
              <p className="text-lg">{current.detail}</p>
            </div>
          </div>

          <button
            onClick={nextBenefit}
            className="bg-[#50DCE1] text-black px-6 py-3 rounded-full text-lg font-bold hover:bg-cyan-400 transition-colors mx-auto"
          >
            Next Benefit →
          </button>

          <div className="flex justify-center space-x-2 mt-4">
            {dailyBenefits.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBenefit(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentBenefit
                    ? 'bg-[#50DCE1] transform scale-125'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      );
    };

    const renderResearchView = () => (
      <div className="h-full flex flex-col">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold mb-4 leading-tight text-[#50DCE1]">Research Evidence</h2>
          <p className="text-lg text-gray-300">What the studies tell us</p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto w-full">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-[#50DCE1]/30 p-4 rounded-xl">
            <h3 className="text-lg font-bold mb-2">{researchData.nagappan2008.title}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                <h4 className="text-sm font-bold text-[#50DCE1] mb-1">🔽 Defect Density Dropped</h4>
                <p className="text-2xl font-bold">{researchData.nagappan2008.defectReduction}</p>
                <p className="text-xs text-gray-200 mt-1">Significantly fewer bugs in production</p>
              </div>
              <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                <h4 className="text-sm font-bold text-[#50DCE1] mb-1">🔼 Initial Dev Time</h4>
                <p className="text-2xl font-bold">+{researchData.nagappan2008.timeIncrease}</p>
                <p className="text-xs text-gray-200 mt-1">Short-term investment for long-term gain</p>
              </div>
            </div>
            <div className="mt-2 text-center">
              <a
                href={researchData.nagappan2008.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#50DCE1] hover:text-cyan-400 underline transition-colors font-bold"
              >
                📄 View Paper
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#50DCE1] to-cyan-500 p-4 rounded-xl">
            <h3 className="text-lg font-bold mb-2 text-black">{researchData.metaAnalysis.title}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-black bg-opacity-30 p-4 rounded-lg text-center">
                <p className="text-xl font-bold text-black">{researchData.metaAnalysis.qualityImprovement}</p>
              </div>
              <div className="bg-black bg-opacity-30 p-4 rounded-lg text-center">
                <p className="text-xl font-bold text-black">{researchData.metaAnalysis.externalQuality}</p>
              </div>
            </div>
            <div className="mt-2 text-center">
              <a
                href={researchData.metaAnalysis.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-black hover:text-gray-800 underline transition-colors font-bold"
              >
                📄 View Study
              </a>
            </div>
          </div>
        </div>
      </div>
    );


    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">Why TDD?</h1>
          
          {/* View Toggle */}
          <div className="flex justify-center space-x-2 mb-6">
            {[
              { key: 'daily', label: '👨‍💻 Daily Benefits', color: 'bg-[#50DCE1]' },
              { key: 'research', label: '📊 Research Data', color: 'bg-[#50DCE1]' }
            ].map(view => (
              <button
                key={view.key}
                onClick={() => setCurrentView(view.key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
                  currentView === view.key
                    ? `${view.color} text-black`
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:border-[#50DCE1] border border-transparent'
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Render Current View */}
        <div className="flex-1">
          {currentView === 'daily' && renderDailyView()}
          {currentView === 'research' && renderResearchView()}
        </div>
      </div>
    );
  };

  // Render current slide
  const renderSlide = () => {
    const slide = slides[currentSlide];
    
    switch (slide.type) {
      case 'title':
        return <TitleSlide />;
      case 'agenda':
        return <AgendaSlide />;
      case 'history':
        return <HistorySlide />;
      case 'what-is-tdd':
        return <TDDCycleSlide />;
      case 'what-to-test-with-tdd':
        return <WhatToTestWithTDDSlide />;
      case 'what-is-not-tdd':
        return <WhatIsNotTDDSlide />;
      case 'why-tdd':
        return <WhyTDDSlide />;
      case 'disadvantages':
        return <DisadvantagesSlide />;
      case 'tdd-best-practices':
        return <TDDBestPracticesSlide />;
      case 'demo':
        return <DemoSlide />;
      case 'bug-first-tdd':
        return <BugFirstTDDSlide />;
      case 'kent-beck-quote':
        return <KentBeckQuoteSlide />;
      default:
        return <TitleSlide />;
    }
  };

  const DemoSlide = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    // Copy to clipboard function
    const copyToClipboard = async (code: string, id: string) => {
      try {
        await navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    };

    // Syntax highlighting for C# code - using React elements instead of HTML strings
    const renderCSharpCode = (code: string) => {
      const lines = code.split('\n');
      return lines.map((line, lineIndex) => {
        const tokens: JSX.Element[] = [];
        let currentIndex = 0;
        const lineText = line;

        // Simple tokenizer
        const addToken = (text: string, className?: string) => {
          if (text.length > 0) {
            tokens.push(
              <span key={`${lineIndex}-${tokens.length}`} className={className || 'text-gray-200'}>
                {text}
              </span>
            );
          }
        };

        // Process the line
        let remaining = lineText;

        // Check for comments
        if (remaining.includes('//')) {
          const commentIndex = remaining.indexOf('//');
          const beforeComment = remaining.substring(0, commentIndex);
          const comment = remaining.substring(commentIndex);

          // Process before comment
          addToken(beforeComment);
          addToken(comment, 'text-gray-500');
        } else {
          // Process keywords, strings, etc.
          const parts = remaining.split(/(\[TestMethod\]|"[^"]*"|\b(?:public|class|void|static|string|int|Assert\.AreEqual|return|FizzBuzz|Convert)\b)/);

          parts.forEach((part, partIndex) => {
            if (part === '[TestMethod]') {
              addToken(part, 'text-purple-400');
            } else if (part.match(/^"[^"]*"$/)) {
              addToken(part, 'text-yellow-300');
            } else if (part.match(/^(public|class|void|static|string|int)$/)) {
              addToken(part, 'text-blue-400');
            } else if (part.match(/^(Assert\.AreEqual|return)$/)) {
              addToken(part, 'text-green-400');
            } else if (part.match(/^(FizzBuzz|Convert)$/)) {
              addToken(part, 'text-cyan-400');
            } else {
              addToken(part);
            }
          });
        }

        return (
          <div key={lineIndex}>
            {tokens.length > 0 ? tokens : <span className="text-gray-200">{lineText}</span>}
          </div>
        );
      });
    };

    // CodeBlock component
    const CodeBlock = ({ title, code, language, theme }: {
      title: string;
      code: string;
      language: string;
      theme: 'test' | 'production';
    }) => {
      const themeColors = {
        test: {
          title: 'text-yellow-400',
          border: 'border-yellow-400/30',
          background: 'bg-gray-800'
        },
        production: {
          title: 'text-blue-400',
          border: 'border-blue-400/30',
          background: 'bg-gray-800'
        }
      };

      const colors = themeColors[theme];
      const codeId = `${theme}-${title}`;

      return (
        <div className={`${colors.background} border ${colors.border} p-4 rounded-xl`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className={`text-lg font-bold ${colors.title}`}>{title}</h3>
            <button
              onClick={() => copyToClipboard(code, codeId)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                copiedCode === codeId
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              {copiedCode === codeId ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          <div className="bg-black p-4 rounded-lg overflow-auto" style={{
            minHeight: LAYOUT.CODE_BLOCK_MIN_HEIGHT,
            maxHeight: LAYOUT.CODE_BLOCK_MAX_HEIGHT
          }}>
            <pre className="text-sm whitespace-pre-wrap">
              <code>
                {language === 'csharp' ? renderCSharpCode(code) : (
                  <span className="text-gray-200">{code}</span>
                )}
              </code>
            </pre>
          </div>
        </div>
      );
    };

    const demoSteps: DemoStep[] = [
      {
        title: "Step 1: Think - Deposit (The simplest possible behavior) 🧠",
        description: "Before writing any test code, think about what to build. Start with the simplest possible behavior.",
        phase: "think",
        testScenarios: [
          {
            id: "deposit",
            description: "Deposit money → balance increases",
            examples: "Deposit(100) → Balance = 100",
            isCompleted: false
          }
        ],
        productionGoals: [
          "The client needs a bank account that can accept deposits",
          "If the client deposits 100, the balance should become 100",
          "Smallest possible test case - no need to think about withdraw or limits yet"
        ],
        allTestsCode: `// Starting with the simplest behavior:
// - Deposit money into account
// - Check balance reflects the deposit`,
        productionCode: `// Goal: Build a simple bank account system
// Starting with deposit functionality - the most basic operation`,
        testResults: [],
        testStats: { total: 0, passed: 0, failed: 0 }
      },
      {
        title: "Step 2: Red - Write the failing test 🔴",
        description: "Write a test for deposit functionality. Add minimal production code to compile, then watch the test fail.",
        phase: "red",
        allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Deposit_ShouldIncreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }
}`,
        productionCode: `// BankAccount.cs - Just enough to compile
public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        // Empty - does nothing yet!
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "fail", message: "Expected: 100, Actual: 0" }
        ],
        testStats: { total: 1, passed: 0, failed: 1 }
      },
      {
        title: "Step 3: Green - Implement just enough to pass 🟢",
        description: "Write the minimum code to make the test pass.",
        phase: "green",
        allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Deposit_ShouldIncreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }
}`,
        productionCode: `// BankAccount.cs
public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        Balance += amount;
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" }
        ],
        testStats: { total: 1, passed: 1, failed: 0 }
      },
      {
        title: "Step 4: Refactor 🔵",
        description: "The design is still clean and minimal. No refactor needed yet, but we've established our first working unit.",
        phase: "refactor",
        allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Deposit_ShouldIncreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }
}`,
        productionCode: `// BankAccount.cs
public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        Balance += amount;
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" }
        ],
        testStats: { total: 1, passed: 1, failed: 0 }
      },
      {
        title: "Step 5: Think - Withdraw (The next simplest possible behavior) 🧠",
        description: "Deposit works. Now think about the next behavior: withdrawing money.",
        phase: "think",
        testScenarios: [
          {
            id: "withdraw",
            description: "Withdraw money → balance decreases",
            examples: "Deposit(100), Withdraw(40) → Balance = 60",
            isCompleted: false
          }
        ],
        productionGoals: [
          "Now the account should allow withdrawals",
          "If client deposits 100 and withdraws 40, the balance should be 60",
          "That's a new behavior — time for a new test"
        ],
        allTestsCode: `// Adding withdrawal capability:
// - Withdraw money from account
// - Balance should decrease accordingly`,
        productionCode: `// BankAccount.cs - Current implementation
public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        Balance += amount;
    }

    // Need to add Withdraw method
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" }
        ],
        testStats: { total: 1, passed: 1, failed: 0 }
      },
      {
        title: "Step 6: Red - Writing another failing test 🔴",
        description: "Write a test for withdraw functionality. Add minimal production code to compile, then watch the test fail.",
        phase: "red",
        allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Deposit_ShouldIncreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }

    [TestMethod]
    public void Withdraw_ShouldDecreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        account.Withdraw(40m);
        Assert.AreEqual(60m, account.Balance);
    }
}`,
        productionCode: `// BankAccount.cs - Just enough to compile
public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        // Empty - does nothing yet!
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldDecreaseBalance", status: "fail", message: "Expected: 60, Actual: 100" }
        ],
        testStats: { total: 2, passed: 1, failed: 1 }
      },
      {
        title: "Step 7: Green - Implement Withdraw 🟢",
        description: "Write the minimum code to make the test pass.",
        phase: "green",
        allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Deposit_ShouldIncreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }

    [TestMethod]
    public void Withdraw_ShouldDecreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        account.Withdraw(40m);
        Assert.AreEqual(60m, account.Balance);
    }
}`,
        productionCode: `// BankAccount.cs
public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        Balance -= amount;
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldDecreaseBalance", status: "pass", message: "✓ Test passed" }
        ],
        testStats: { total: 2, passed: 2, failed: 0 }
      },
      {
        title: "Step 8: Refactor 🔵",
        description: "Deposit and Withdraw both manipulate the balance. Let's prevent invalid inputs (negative amounts).",
        phase: "refactor",
        allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Deposit_ShouldIncreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }

    [TestMethod]
    public void Withdraw_ShouldDecreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        account.Withdraw(40m);
        Assert.AreEqual(60m, account.Balance);
    }
}`,
        productionCode: `// BankAccount.cs - Refactored with validation
public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Deposit must be positive");
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Withdraw must be positive");
        Balance -= amount;
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldDecreaseBalance", status: "pass", message: "✓ Test passed" }
        ],
        testStats: { total: 2, passed: 2, failed: 0 }
      },
      {
        title: "Step 9: Think - Prevent Overdraw 🧠",
        description: "Basic operations work. Now think about business rules: what should happen if someone tries to withdraw more than they have?",
        phase: "think",
        testScenarios: [
          {
            id: "overdraw",
            description: "Withdraw more than balance → throw exception",
            examples: "Balance = 50, Withdraw(100) → Exception",
            isCompleted: false
          }
        ],
        productionGoals: [
          "A real bank doesn't allow overdrawing",
          "If client tries to withdraw more than the balance, an exception should be thrown"
        ],
        allTestsCode: `// Adding overdraw protection:
// - Check if withdraw amount exceeds balance
// - Throw exception if insufficient funds`,
        productionCode: `// BankAccount.cs - Current implementation
public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Deposit must be positive");
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Withdraw must be positive");
        Balance -= amount;
        // Need to add overdraw protection
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldDecreaseBalance", status: "pass", message: "✓ Test passed" }
        ],
        testStats: { total: 2, passed: 2, failed: 0 }
      },
      {
        title: "Step 10: Red - Test for overdraw protection 🔴",
        description: "Add a test that expects an exception when withdrawing more than the balance. This test will fail because we don't have overdraw protection yet.",
        phase: "red",
        allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Deposit_ShouldIncreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }

    [TestMethod]
    public void Withdraw_ShouldDecreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        account.Withdraw(40m);
        Assert.AreEqual(60m, account.Balance);
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidOperationException))]
    public void Withdraw_ShouldThrow_WhenInsufficientBalance()
    {
        var account = new BankAccount();
        account.Deposit(50m);
        account.Withdraw(100m);
    }
}`,
        productionCode: `// BankAccount.cs - current implementation
public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Deposit must be positive");
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Withdraw must be positive");
        Balance -= amount;
        // No overdraw check yet!
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldDecreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldThrow_WhenInsufficientBalance", status: "fail", message: "Expected InvalidOperationException but no exception was thrown" }
        ],
        testStats: { total: 3, passed: 2, failed: 1 }
      },
      {
        title: "Step 11: Green - Add overdraw protection 🟢",
        description: "Add a balance check in the Withdraw method. Now all three tests pass.",
        phase: "green",
        allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Deposit_ShouldIncreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }

    [TestMethod]
    public void Withdraw_ShouldDecreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        account.Withdraw(40m);
        Assert.AreEqual(60m, account.Balance);
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidOperationException))]
    public void Withdraw_ShouldThrow_WhenInsufficientBalance()
    {
        var account = new BankAccount();
        account.Deposit(50m);
        account.Withdraw(100m);
    }
}`,
        productionCode: `// BankAccount.cs
public class BankAccount
{
    public decimal Balance { get; private set; }

    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Deposit must be positive");
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Withdraw must be positive");
        if (amount > Balance)
            throw new InvalidOperationException("Insufficient funds");

        Balance -= amount;
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldDecreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldThrow_WhenInsufficientBalance", status: "pass", message: "✓ Test passed" }
        ],
        testStats: { total: 3, passed: 3, failed: 0 }
      },
      {
        title: "Step 12: Refactor 🔵",
        description: "Our validation logic is growing — time to extract helper methods.",
        phase: "refactor",
        allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Deposit_ShouldIncreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }

    [TestMethod]
    public void Withdraw_ShouldDecreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        account.Withdraw(40m);
        Assert.AreEqual(60m, account.Balance);
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidOperationException))]
    public void Withdraw_ShouldThrow_WhenInsufficientBalance()
    {
        var account = new BankAccount();
        account.Deposit(50m);
        account.Withdraw(100m);
    }
}`,
        productionCode: `// BankAccount.cs - Refactored with helper methods
public class BankAccount
{
    public decimal Balance { get; private set; }

    private void EnsurePositiveAmount(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be positive");
    }

    private void EnsureSufficientFunds(decimal amount)
    {
        if (amount > Balance)
            throw new InvalidOperationException("Insufficient funds");
    }

    public void Deposit(decimal amount)
    {
        EnsurePositiveAmount(amount);
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        EnsurePositiveAmount(amount);
        EnsureSufficientFunds(amount);
        Balance -= amount;
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldDecreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldThrow_WhenInsufficientBalance", status: "pass", message: "✓ Test passed" }
        ],
        testStats: { total: 3, passed: 3, failed: 0 }
      },
      {
        title: "Step 13: Think - Transfer with Fee 🧠",
        description: "Single account operations work. Now think about a more complex feature: transferring money between accounts with fees.",
        phase: "think",
        testScenarios: [
          {
            id: "transfer",
            description: "Transfer between accounts → deduct from source + fee, add to destination",
            examples: "Deposit 100, then transfer 50 with 5 fee → Source: 45, Destination: 50",
            isCompleted: false
          }
        ],
        productionGoals: [
          "Client now needs to transfer money between two accounts",
          "Transfers include a transaction fee",
          "Don't hardcode the fee logic — inject a fee calculator instead"
        ],
        allTestsCode: `// Adding transfer capability:
// - Transfer between two accounts
// - Apply transaction fee
// - Use dependency injection for fee calculator`,
        productionCode: `// BankAccount.cs - Current implementation
public class BankAccount
{
    public decimal Balance { get; private set; }
    // Need to add Transfer method with fee calculator
}

// IFeeCalculator.cs - Interface to inject
public interface IFeeCalculator
{
    decimal CalculateFee(decimal amount);
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldDecreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldThrow_WhenInsufficientBalance", status: "pass", message: "✓ Test passed" }
        ],
        testStats: { total: 3, passed: 3, failed: 0 }
      },
      {
        title: "Step 14: Red - Test for transfer with fee 🔴",
        description: "Write a test for transfer with fee. Add minimal production code to compile, then watch the test fail.",
        phase: "red",
        allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Deposit_ShouldIncreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }

    [TestMethod]
    public void Withdraw_ShouldDecreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        account.Withdraw(40m);
        Assert.AreEqual(60m, account.Balance);
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidOperationException))]
    public void Withdraw_ShouldThrow_WhenInsufficientBalance()
    {
        var account = new BankAccount();
        account.Deposit(50m);
        account.Withdraw(100m);
    }
}

[TestClass]
public class TransferServiceTests
{
    [TestMethod]
    public void Transfer_ShouldMoveMoneyWithFee()
    {
        var source = new BankAccount();
        var target = new BankAccount();
        var service = new TransferService(new FixedFeeCalculator(5m));

        source.Deposit(100m);
        service.Transfer(source, target, 50m);

        Assert.AreEqual(45m, source.Balance); // 100 - 50 - 5 (fee)
        Assert.AreEqual(50m, target.Balance);
    }
}`,
        productionCode: `// BankAccount.cs - existing implementation
public class BankAccount
{
    public decimal Balance { get; private set; }

    private void EnsurePositiveAmount(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be positive");
    }

    private void EnsureSufficientFunds(decimal amount)
    {
        if (amount > Balance)
            throw new InvalidOperationException("Insufficient funds");
    }

    public void Deposit(decimal amount)
    {
        EnsurePositiveAmount(amount);
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        EnsurePositiveAmount(amount);
        EnsureSufficientFunds(amount);
        Balance -= amount;
    }
}

// IFeeCalculator.cs - Just enough to compile
public interface IFeeCalculator
{
    decimal Calculate(decimal amount);
}

// FixedFeeCalculator.cs - Just enough to compile
public class FixedFeeCalculator : IFeeCalculator
{
    public FixedFeeCalculator(decimal fee) { }
    public decimal Calculate(decimal amount) => 0; // Wrong implementation!
}

// TransferService.cs - Just enough to compile
public class TransferService
{
    public TransferService(IFeeCalculator feeCalculator) { }
    public void Transfer(BankAccount from, BankAccount to, decimal amount)
    {
        // Empty - does nothing yet!
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldDecreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldThrow_WhenInsufficientBalance", status: "pass", message: "✓ Test passed" },
          { name: "Transfer_ShouldMoveMoneyWithFee", status: "fail", message: "Expected source.Balance: 45, Actual: 100" }
        ],
        testStats: { total: 4, passed: 3, failed: 1 }
      },
      {
        title: "Step 15: Green - Implement TransferService with dependency injection 🟢",
        description: "Write the minimum code to make the test pass.",
        phase: "green",
        allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Deposit_ShouldIncreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }

    [TestMethod]
    public void Withdraw_ShouldDecreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        account.Withdraw(40m);
        Assert.AreEqual(60m, account.Balance);
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidOperationException))]
    public void Withdraw_ShouldThrow_WhenInsufficientBalance()
    {
        var account = new BankAccount();
        account.Deposit(50m);
        account.Withdraw(100m);
    }
}

[TestClass]
public class TransferServiceTests
{
    [TestMethod]
    public void Transfer_ShouldMoveMoneyWithFee()
    {
        var source = new BankAccount();
        var target = new BankAccount();
        var service = new TransferService(new FixedFeeCalculator(5m));

        source.Deposit(100m);
        service.Transfer(source, target, 50m);

        Assert.AreEqual(45m, source.Balance);
        Assert.AreEqual(50m, target.Balance);
    }
}`,
        productionCode: `// BankAccount.cs
public class BankAccount
{
    public decimal Balance { get; private set; }

    private void EnsurePositiveAmount(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be positive");
    }

    private void EnsureSufficientFunds(decimal amount)
    {
        if (amount > Balance)
            throw new InvalidOperationException("Insufficient funds");
    }

    public void Deposit(decimal amount)
    {
        EnsurePositiveAmount(amount);
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        EnsurePositiveAmount(amount);
        EnsureSufficientFunds(amount);
        Balance -= amount;
    }
}

// IFeeCalculator.cs
public interface IFeeCalculator
{
    decimal Calculate(decimal amount);
}

// FixedFeeCalculator.cs
public class FixedFeeCalculator : IFeeCalculator
{
    private readonly decimal _fee;
    public FixedFeeCalculator(decimal fee) => _fee = fee;
    public decimal Calculate(decimal amount) => _fee;
}

// TransferService.cs
public class TransferService
{
    private readonly IFeeCalculator _feeCalculator;

    public TransferService(IFeeCalculator feeCalculator)
    {
        _feeCalculator = feeCalculator;
    }

    public void Transfer(BankAccount from, BankAccount to, decimal amount)
    {
        var fee = _feeCalculator.Calculate(amount);
        from.Withdraw(amount + fee);
        to.Deposit(amount);
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldDecreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldThrow_WhenInsufficientBalance", status: "pass", message: "✓ Test passed" },
          { name: "Transfer_ShouldMoveMoneyWithFee", status: "pass", message: "✓ Test passed" }
        ],
        testStats: { total: 4, passed: 4, failed: 0 }
      },
      {
        title: "Step 16: Refactor - Add null checks and improve clarity 🔵",
        description: "Let's improve clarity and guard against invalid dependencies.",
        phase: "refactor",
        allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Deposit_ShouldIncreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }

    [TestMethod]
    public void Withdraw_ShouldDecreaseBalance()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        account.Withdraw(40m);
        Assert.AreEqual(60m, account.Balance);
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidOperationException))]
    public void Withdraw_ShouldThrow_WhenInsufficientBalance()
    {
        var account = new BankAccount();
        account.Deposit(50m);
        account.Withdraw(100m);
    }
}

[TestClass]
public class TransferServiceTests
{
    [TestMethod]
    public void Transfer_ShouldMoveMoneyWithFee()
    {
        var source = new BankAccount();
        var target = new BankAccount();
        var service = new TransferService(new FixedFeeCalculator(5m));

        source.Deposit(100m);
        service.Transfer(source, target, 50m);

        Assert.AreEqual(45m, source.Balance);
        Assert.AreEqual(50m, target.Balance);
    }
}`,
        productionCode: `// BankAccount.cs
public class BankAccount
{
    public decimal Balance { get; private set; }

    private void EnsurePositiveAmount(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be positive");
    }

    private void EnsureSufficientFunds(decimal amount)
    {
        if (amount > Balance)
            throw new InvalidOperationException("Insufficient funds");
    }

    public void Deposit(decimal amount)
    {
        EnsurePositiveAmount(amount);
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        EnsurePositiveAmount(amount);
        EnsureSufficientFunds(amount);
        Balance -= amount;
    }
}

// IFeeCalculator.cs
public interface IFeeCalculator
{
    decimal Calculate(decimal amount);
}

// FixedFeeCalculator.cs
public class FixedFeeCalculator : IFeeCalculator
{
    private readonly decimal _fee;
    public FixedFeeCalculator(decimal fee) => _fee = fee;
    public decimal Calculate(decimal amount) => _fee;
}

// TransferService.cs - Refactored with null checks
public class TransferService
{
    private readonly IFeeCalculator _feeCalculator;

    public TransferService(IFeeCalculator feeCalculator)
        => _feeCalculator = feeCalculator ?? throw new ArgumentNullException(nameof(feeCalculator));

    public void Transfer(BankAccount source, BankAccount target, decimal amount)
    {
        if (source == null || target == null)
            throw new ArgumentNullException("Accounts cannot be null");

        var fee = _feeCalculator.Calculate(amount);
        source.Withdraw(amount + fee);
        target.Deposit(amount);
    }
}`,
        testResults: [
          { name: "Deposit_ShouldIncreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldDecreaseBalance", status: "pass", message: "✓ Test passed" },
          { name: "Withdraw_ShouldThrow_WhenInsufficientBalance", status: "pass", message: "✓ Test passed" },
          { name: "Transfer_ShouldMoveMoneyWithFee", status: "pass", message: "✓ Test passed" }
        ],
        testStats: { total: 4, passed: 4, failed: 0 }
      }
    ];

    const nextStep = () => {
      setCurrentStep((prev) => Math.min(prev + 1, demoSteps.length - 1));
    };

    const prevStep = () => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    };


    const jumpToPhase = (phase: string) => {
      const stepIndex = demoSteps.findIndex(step => step.phase === phase);
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex);
      }
    };

    const getPhaseColor = (phase: string) => {
      switch (phase) {
        case 'think': return 'bg-slate-700';
        case 'red': return 'bg-red-500';
        case 'green': return 'bg-green-500';
        case 'refactor': return 'bg-blue-500';
        case 'summary': return 'bg-slate-700';
        default: return 'bg-gray-500';
      }
    };

    const getPhaseEmoji = (phase: string) => {
      switch (phase) {
        case 'think': return '🧠';
        case 'red': return '🔴';
        case 'green': return '🟢';
        case 'refactor': return '🔵';
        case 'summary': return '🎉';
        default: return '⚪';
      }
    };

    const current = demoSteps[currentStep];

    // Safety check to prevent crashes
    if (!current) {
      return (
        <div className="min-h-screen bg-gray-900 p-6 overflow-auto">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold">Loading demo...</h2>
            <p>Step {currentStep + 1} of {demoSteps.length}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 overflow-auto">
        {/* Navigation FIRST - At the top where it's always visible */}
        <div className="bg-[#50DCE1] text-black p-4 rounded-xl mb-6 shadow-lg">
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-lg font-bold ${
                currentStep === 0
                  ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              ← PREV
            </button>
            
            <div className="text-center flex-1">
              <div className="text-2xl font-black mb-2">
                STEP {currentStep + 1} of {demoSteps.length}
              </div>
              <div className="flex space-x-1 justify-center">
                {demoSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-8 h-8 rounded-full font-bold transition-all ${
                      index === currentStep
                        ? 'bg-slate-800 text-white transform scale-110'
                        : 'bg-slate-300 text-black hover:bg-slate-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={currentStep === demoSteps.length - 1}
              className={`px-4 py-2 rounded-lg font-bold ${
                currentStep === demoSteps.length - 1
                  ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              NEXT →
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">Building a Bank Account System with TDD</h1>

          {/* Quick Jump Buttons */}
          <div className="flex justify-center space-x-2 mb-4">
            <button
              onClick={() => jumpToPhase('think')}
              className="px-3 py-1 rounded bg-[#50DCE1] hover:bg-cyan-400 text-black text-sm font-semibold"
            >
              🧠 Think
            </button>
            <button
              onClick={() => jumpToPhase('red')}
              className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-sm"
            >
              🔴 Red
            </button>
            <button
              onClick={() => jumpToPhase('green')}
              className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-sm"
            >
              🟢 Green
            </button>
            <button
              onClick={() => jumpToPhase('refactor')}
              className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-sm"
            >
              🔵 Refactor
            </button>
          </div>
        </div>

        {/* Current Step */}
        <div className={`${getPhaseColor(current.phase)} p-4 rounded-xl mb-6 text-center`}>
          <h2 className="text-2xl font-bold mb-2">{current.title}</h2>
          <p className="opacity-90">{current.description}</p>
        </div>

        {/* Content - Simple vertical layout */}
        <div className="space-y-6">
          {/* Test Results */}
          <div className="bg-slate-800 border border-[#50DCE1]/30 p-4 rounded-xl">
            <h3 className="text-lg font-bold text-[#50DCE1] mb-3">Test Results ({current.testStats.passed}/{current.testStats.total} Pass)</h3>
            <div className="space-y-2">
              {current.testResults.map((test, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    test.status === 'pass'
                      ? 'bg-gradient-to-r from-[#50DCE1]/20 to-transparent border-l-4 border-[#50DCE1]'
                      : 'bg-slate-700/50 border-l-4 border-red-400'
                  }`}
                >
                  <div className="font-bold text-white">{test.name}</div>
                  <div className={`text-sm ${test.status === 'pass' ? 'text-[#50DCE1]' : 'text-red-300'}`}>
                    {test.message}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Scenarios and Production Goals - Only for Think phase */}
          {current.phase === 'think' && (current.testScenarios || current.productionGoals) && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Production Goals */}
              {current.productionGoals && (
                <div className="bg-slate-800 border border-purple-400/30 p-4 rounded-xl">
                  <h3 className="text-lg font-bold text-purple-400 mb-3">🧠 Think</h3>
                  <div className="space-y-3">
                    {current.productionGoals.map((goal, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <div className="text-purple-400 text-xl flex-shrink-0">•</div>
                        <div className="text-white">{goal}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Test Scenarios Checklist */}
              {current.testScenarios && (
                <div className="bg-slate-800 border border-blue-400/30 p-4 rounded-xl">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🎯 Test Scenarios to Implement</h3>
                  <div className="space-y-3">
                    {current.testScenarios.map((scenario) => (
                      <div key={scenario.id} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <div className="text-2xl flex-shrink-0">
                          {scenario.isCompleted ? '✅' : '⏳'}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">
                            {scenario.description}
                          </div>
                          <div className="text-gray-400 text-sm">
                            Examples: {scenario.examples}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Test Code and Production Code Side by Side - Hide for Think phase */}
          {current.phase !== 'think' && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Test Code */}
              <CodeBlock
                title="Test Code (MSTest)"
                code={current.allTestsCode}
                language="csharp"
                theme="test"
              />

              {/* Production Code */}
              <CodeBlock
                title="Production Code (C#)"
                code={current.productionCode}
                language="csharp"
                theme="production"
              />
            </div>
          )}
        </div>

        {/* Bottom spacer */}
        <div className="h-8"></div>
      </div>
    );
  };

  const BestPracticesSlide = () => {
    const [currentCategory, setCurrentCategory] = useState(0);
    const [selectedPractice, setSelectedPractice] = useState(0);

    const practiceCategories = [
      {
        title: "Write Effective Tests",
        icon: "🎯",
        color: "bg-green-500",
        description: "Quality fundamentals for meaningful tests",
        practices: [
          {
            title: "Write Small, Focused Tests",
            icon: "🔍",
            description: "Each test should verify one specific behavior",
            example: `[TestMethod]
public void ApplyDiscount_WhenCustomerIsPremium_ShouldReduceTotalBy10Percent()
{
    // Arrange
    var cart = new ShoppingCart();
    cart.AddItem(price: 100);
    var customer = new Customer { IsPremium = true };

    // Act
    cart.ApplyDiscount(customer);

    // Assert
    Assert.AreEqual(90, cart.Total);
}`,
            tip: "One assertion per test when possible. If testing multiple outcomes, use descriptive test names."
          },
          {
            title: "Name Tests to Describe Behavior",
            icon: "📝",
            description: "Test names should read like specifications",
            example: `// ❌ Bad Names
DiscountTest()                   // Vague, doesn't explain scenario or expectation
CheckEven()                      // Too generic, doesn't specify odd/even behavior

// ✅ Good Names  
ApplyDiscount_WhenCustomerIsPremium_ShouldReduceTotalBy10Percent()
IsEven_OddNumber_ReturnsFalse()`,
            tip: "Use pattern: MethodUnderTest_Scenario_ExpectedBehavior"
          },
          {
            title: "Use Clear and Purposeful Test Data",
            icon: "📊",
            description: "Make test data meaningful and obvious",
            example: `// ❌ Magic Numbers
Assert.AreEqual(5.4m, CalculateTotalPrice(3, 1.8m)); // ❌ What are 3 and 1.8?

// ✅ Meaningful Data
const int AppleCount = 3;
const decimal ApplePrice = 1.8m; // Price per apple
const decimal ExpectedTotalPrice = 5.4m;

Assert.AreEqual(ExpectedTotalPrice, CalculateTotalPrice(AppleCount, ApplePrice));`,
            tip: "Use constants to make test intent crystal clear"
          },
          {
            title: "Start with Simplest Test Case",
            icon: "🌱",
            description: "Begin with the most basic scenario first",
            example: `// Test progression order:
1. ApplyDiscount_WhenCustomerIsPremium_ShouldReduceTotalBy10Percent()
2. ApplyDiscount_WhenCustomerIsRegular_ShouldNotApplyDiscount()  
3. ApplyDiscount_WhenCartIsEmpty_ShouldKeepTotalZero()
4. ApplyDiscount_WhenDiscountIsNegative_ShouldThrowException`,
            tip: "Happy path first, then edge cases. Build complexity gradually."
          }
        ]
      },
      {
        title: "Follow TDD Discipline",
        icon: "🔄",
        color: "bg-blue-500", 
        description: "Process adherence and workflow discipline",
        practices: [
          {
            title: "Isolate Tests to Avoid Dependencies",
            icon: "🏝️",
            description: "Each test should run independently",
            example: `// ❌ Dependent Tests
[TestMethod]
public void GetUser_ExistingId_ReturnsUser()
{
    // Depends on another test to create a user first!
    var user = repository.GetUser(1);
    Assert.IsNotNull(user);
}

// ✅ Independent Test
[TestMethod]
public void GetUser_ExistingId_ReturnsUser()
{
    // Arrange - create test data locally
    var testUser = repository.CreateUser("Alice");

    // Act
    var user = repository.GetUser(testUser.Id);

    // Assert
    Assert.IsNotNull(user);
}`,
            tip: "Use [TestInitialize] for setup, avoid test execution order dependencies"
          },
          {
            title: "Follow TDD Cycle Strictly",
            icon: "🎡",
            description: "Red → Green → Refactor, always in order",
            example: `1. 🔴 RED: Write failing test
   - Test should fail for RIGHT reason
   - Verify the test actually fails
   
2. 🟢 GREEN: Make it pass (simplest way)
   - Don't overthink the solution
   - Hardcoded values are OK initially
   
3. 🔵 REFACTOR: Improve code quality
   - Both production AND test code
   - Keep tests green throughout`,
            tip: "Never skip a step. Each phase has a different mindset and purpose."
          },
          {
            title: "Only write Production Code to satisfy a Failing Test",
            icon: "⚡",
            description: "Let the tests drive the code, not the other way around",
            example: `
🔵 You should never write new production code without having a failing test that requires it.

🔵 This ensures every piece of code is necessary and covered by tests.  

🔵 Prevents over-engineering and keeps focus on the current requirement.

`,
            tip: "No failing test, no new code"
          },
          {
            title: "Refactor Only When Tests Are Green",
            icon: "🌙",
            description: "Green tests give you a safety net for improving code quality",
            example: `
🔵 Don’t refactor when tests are failing — you risk introducing new bugs.

🔵 Once tests pass (green state), you can safely clean up code.

🔵 This step improves maintainability without breaking functionality.

`,
            tip: "Green first, then clean"
          }
        ]
      },
      {
        title: "Team Collaboration", 
        icon: "👥",
        color: "bg-purple-500",
        description: "Working effectively together with TDD",
        practices: [
          {
            title: "Ping Pong Programming Animation",
            icon: "🏓",
            description: "Interactive visual demonstration of ping pong TDD process",
            isAnimation: true,
            example: `Ping-pong Programming = Pair Programming + TDD
You code, I code, Repeat!

🎯 "Watch this test fail spectacularly!"
💡 "Now I'll make it pass with the simplest hack"
🎨 "Let's refactor this beautiful mess"
🚀 "Your turn - surprise me with the next test!"

Celebration moments:
✅ "Green! High five!"
🔥 "That refactor was smooth!"
💪 "We just crushed that edge case!"`,
            tip: "Enthusiasm is contagious. Make TDD sessions energetic and collaborative."
          },
          {
            title: "Shared Understanding of Test Quality",
            icon: "🤝",
            description: "Treat tests as First-class Code",
            example: `Team Code Review Checklist:

✅ Review tests with the same standard as production code
✅ Test name clearly describes behavior?
✅ Is the test independent, reliable and fast?
✅ Is failure output meaningful?

Shared style:
- Follow consistent naming: Method_Scenario_ExpectedResult
- Use Arrange-Act-Assert for clarity
- Avoid magic numbers and unclear data`,
            tip: "Document team agreements. Review and update standards regularly."
          }
        ]
      },
      {
        title: "Maintain Sustainability",
        icon: "♻️", 
        color: "bg-orange-500",
        description: "Long-term practices for healthy test suites",
        practices: [
          {
            title: "Keep Tests Fast",
            icon: "🏃‍♂️",
            description: "Slow tests kill the TDD feedback loop",
            example: `
Speed Optimization Techniques:
- Use in-memory databases for tests
- Mock external dependencies  
- Parallel test execution
- Test categorization ([Category("Plausibility")])

`,
            tip: "If unit tests take more than 10 seconds total, developers will skip them"
          },
          {
            title: "Mock External Dependencies",
            icon: "🚫", 
            description: "Use Mocks or stubs instead of calling external systems like databases, APIs or file systems",
            example: `
🔵 Mock an API client instead of making real HTTP calls

🔵 Use in-memory storage instead of file system operations

🔵 Use a fake repository instead of querying a real database
`,
            tip: "Replace slow or unstable systems"
          },
          {
            title: "Refactor Test code",
            icon: "🛡️",
            description: "Tests are code too, regularly improve structure, remove deuuplication and enhance readability",
            example: `
🔵 Reduce duplication: Extract shared setup into a base class or helper methods.

🔵 Improve readability: Use descriptive test names and organize tests logically.

🔵 Keep tests up-to-date: Refactor tests promptly when requirements or behavior change.
`,
            tip: "Keep test code clean and readable, and aligned with requirement"
          },
          {
            title: "Automate with CI",
            icon: "🧹",
            description: "Automate running tests so that every commit or merge request is verified",
            example: `
🔵 Integrate tests into GitHub Actions / Azure DevOps / Jenkins

🔵 Prevent merging if tests fail

🔵 Automatically generate test coverage reports
`,
            tip: "Make tests part of continuous quanlity assurance."
          }
        ]
      }
    ];

    const currentCategoryData = practiceCategories[currentCategory];
    const currentPractice = currentCategoryData.practices[selectedPractice];

    const nextCategory = () => {
      setCurrentCategory((prev) => (prev + 1) % practiceCategories.length);
      setSelectedPractice(0);
    };

    const nextPractice = () => {
      const maxPractices = currentCategoryData.practices.length;
      setSelectedPractice((prev) => (prev + 1) % maxPractices);
    };

    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">TDD Best Practices</h1>
          <p className="text-xl text-[#50DCE1]">Practical wisdom for successful TDD adoption</p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center space-x-2 mb-6">
          {practiceCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => { setCurrentCategory(index); setSelectedPractice(0); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
                index === currentCategory
                  ? 'bg-[#50DCE1] text-black'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:border-[#50DCE1] border border-transparent'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Current Category Header */}
        <div className="bg-gradient-to-r from-[#50DCE1] to-cyan-500 p-4 rounded-xl mb-6 text-center">
          <div className="text-4xl mb-2">{currentCategoryData.icon}</div>
          <h2 className="text-2xl font-bold mb-2 text-black">{currentCategoryData.title}</h2>
          <p className="opacity-90 text-black font-semibold">{currentCategoryData.description}</p>
        </div>

        {/* Current Practice Content */}
        <div className="flex-1 bg-slate-800 border border-[#50DCE1]/30 rounded-xl p-6 mb-6 overflow-y-auto">
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-3xl">{currentPractice.icon}</div>
            <div>
              <h3 className="text-2xl font-bold text-[#50DCE1]">{currentPractice.title}</h3>
              <p className="text-lg text-gray-300">{currentPractice.description}</p>
            </div>
          </div>

          {currentPractice.isAnimation ? (
            <div className="mb-4">
              <AnimatedPingPong />
            </div>
          ) : (
            <div className="bg-black p-4 rounded-lg mb-4">
              <code className="text-green-300 text-sm whitespace-pre-line font-mono">
                {currentPractice.example}
              </code>
            </div>
          )}

          <div className="bg-yellow-900 bg-opacity-50 p-4 rounded-lg">
            <div className="flex items-start">
              <span className="text-2xl mr-3">💡</span>
              <div>
                <h4 className="font-bold text-yellow-200 mb-1">Pro Tip:</h4>
                <p className="text-yellow-100 text-sm">{currentPractice.tip}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={nextPractice}
            className="bg-[#50DCE1] hover:bg-cyan-400 text-black px-6 py-3 rounded-full font-bold transition-colors"
          >
            Next Practice →
          </button>

          <div className="flex space-x-2">
            {currentCategoryData.practices.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedPractice(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedPractice
                    ? 'bg-[#50DCE1] transform scale-125'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCategory}
            className="bg-slate-700 hover:bg-slate-600 hover:border-[#50DCE1] border border-transparent text-white px-6 py-3 rounded-full font-bold transition-colors"
          >
            Next Category: {practiceCategories[(currentCategory + 1) % practiceCategories.length].title} →
          </button>
        </div>
      </div>
    );
  };

  // Kent Beck Quote Slide Component
  const KentBeckQuoteSlide = () => (
    <div className="h-full relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center px-8 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#50DCE1] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#50DCE1] opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main Quote - CENTER FOCUS */}
        <div className="relative mb-12">
          {/* Large decorative quote marks */}
          <div className="absolute -top-16 -left-16 text-8xl text-[#50DCE1] opacity-15 font-serif">"</div>
          <div className="absolute -bottom-16 -right-16 text-8xl text-[#50DCE1] opacity-15 font-serif">"</div>
          
          <blockquote className="relative z-10">
            <p className="text-4xl md:text-5xl lg:text-6xl font-light italic text-white leading-tight mb-10">
              I am not a great programmer.
              <br />
              <span className="bg-gradient-to-r from-[#50DCE1] via-cyan-400 to-[#50DCE1] bg-clip-text text-transparent font-semibold">
                I am a good programmer with great habits
              </span>
            </p>
            <cite className="text-2xl md:text-3xl text-gray-400 not-italic font-medium">— Kent Beck</cite>
          </blockquote>
        </div>

        {/* Kent Beck Info - Secondary - MOVED HIGHER */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative inline-block mb-4">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#50DCE1] via-cyan-400 to-[#50DCE1] opacity-10 blur-lg scale-110"></div>
            <div className="relative w-32 h-32 mx-auto overflow-hidden rounded-full border-2 border-gray-500 bg-gray-700 shadow-xl">
              <img 
                src="/kent-beck.webp" 
                alt="Kent Beck" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="text-4xl flex items-center justify-center h-full">👨‍💻</div>';
                }}
              />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#50DCE1] to-cyan-400 bg-clip-text text-transparent">
              Kent Beck
            </h2>
            <p className="text-base text-gray-300">Creator of Test-Driven Development</p>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-red-400 via-green-400 to-blue-400 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 pt-12 pb-24 flex flex-col">
        <div className="max-w-6xl mx-auto flex-1 flex flex-col w-full">
          {renderSlide()}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 bg-opacity-95 border-t border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              currentSlide === 0 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
            }`}
          >
            ← Previous
          </button>

          {/* Slide Indicator */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">
              {currentSlide + 1} / {slides.length}
            </span>
            <span className="text-lg font-semibold">{slides[currentSlide].title}</span>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              currentSlide === slides.length - 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105'
            }`}
          >
            Next →
          </button>
        </div>

        {/* Slide Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-blue-400 transform scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Keyboard Hints */}
      <div className="fixed top-4 right-4 text-xs text-gray-500 bg-gray-800 p-2 rounded">
        ← → Space: Navigate | Home: First slide
      </div>
    </div>
  );
};

export default TDDPresentation;