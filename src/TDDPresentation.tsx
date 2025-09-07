"use client";
import { useState, useEffect } from 'react';
import { LAYOUT, ANIMATIONS, CONTENT, DEMO_CONFIG } from './constants';
import { Slide, DemoStep, PingPongPhase } from './types';
import DemoSlide from './components/slides/DemoSlide';
import BestPracticesSlide from './components/slides/BestPracticesSlide';
import AnimatedPingPong from './components/slides/AnimatedPingPong';

// All TypeScript interfaces moved to types.ts

// Demo Steps Data
const demoSteps: DemoStep[] = [
  {
    title: "Step 1: Think - Plan Test Scenarios 🧠",
    description: "Before writing any code, let's think about what test scenarios we need for FizzBuzz. This upfront planning helps us understand the full scope.",
    phase: "think",
    allTestsCode: `// Test scenarios to implement:
// ✓ Regular numbers (1, 2, 4) → return as string
// ✓ Numbers divisible by 3 (3, 6, 9) → return "Fizz" 
// ✓ Numbers divisible by 5 (5, 10, 20) → return "Buzz"
// ✓ Numbers divisible by both 3 and 5 (15, 30) → return "FizzBuzz"

// We'll implement these one at a time using Red-Green cycles`,
    productionCode: `// No production code yet - we're still planning!
// 
// The FizzBuzz class will need:
// - A static Convert(int input) method
// - Logic to handle all four scenarios
// - Clean, readable implementation`,
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
    // Slide 4: What is NOT TDD
    {
      id: 'what-is-not-tdd',
      title: 'What is NOT TDD',
      type: 'what-is-not-tdd'
    },
    // Slide 5: Why TDD
    {
      id: 'why-tdd',
      title: 'Why TDD',
      type: 'why-tdd'
    },
    // Slide 6: Disadvantages
    {
      id: 'disadvantages',
      title: 'Disadvantages of TDD',
      type: 'disadvantages'
    },
    // Slide 7: TDD vs BDD
    {
      id: 'tdd-vs-bdd',
      title: 'TDD vs BDD',
      type: 'tdd-vs-bdd'
    },
    // Slide 8: Best Practices
    {
      id: 'best-practices',
      title: 'Best Practices',
      type: 'best-practices'
    },
    // Slide 9: Demo
    {
      id: 'demo',
      title: 'Demo',
      type: 'demo'
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
    <div className="flex flex-col items-center justify-center text-center" style={{minHeight: LAYOUT.SLIDE_MIN_HEIGHT}}>
      <h1 className="text-8xl font-bold mb-8 bg-gradient-to-r from-red-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
        User Group TDD
      </h1>
      <p className="text-4xl text-gray-300 mb-12">Test-Driven Development</p>
      <div className="text-2xl text-gray-400 space-y-4">
        <p>🎯 A Complete Guide to TDD</p>
        <p>📅 30 minutes • 👥 Interactive • 💻 Demo</p>
      </div>
      <div className="mt-16 text-gray-500">
        <p>{CONTENT.NAVIGATION.PRESS_ARROW_TO_START}</p>
      </div>
    </div>
  );

  // Agenda Slide Component
  const AgendaSlide = () => {
    const agendaItems = [
      { title: "History", subtitle: "Origins of TDD", icon: "📚" },
      { title: "What is TDD", subtitle: "Core Concepts", icon: "🔍" },
      { title: "What is NOT TDD", subtitle: "Common Misconceptions", icon: "❌" },
      { title: "Why TDD", subtitle: "Benefits & Value", icon: "💡" },
      { title: "Disadvantages", subtitle: "Honest Assessment", icon: "⚠️" },
      { title: "TDD vs BDD", subtitle: "Comparative Analysis", icon: "⚖️" },
      { title: "Best Practices", subtitle: "Implementation Guide", icon: "⭐" },
      { title: "Demo", subtitle: "Hands-on Practice", icon: "🚀" }
    ];

    return (
      <div className="min-h-full flex flex-col">
        <h1 className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Agenda
        </h1>
        <div className="grid md:grid-cols-2 gap-6 flex-1">
          {agendaItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all cursor-pointer transform hover:scale-105"
              onClick={() => goToSlide(index + 2)}
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.subtitle}</p>
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
          <h1 className="text-5xl font-bold mb-2 text-white">What is TDD?</h1>
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
        description: "Kent Beck formalizes TDD in \"Extreme Programming Explained,\" making \"test before code\" a clear methodology.",
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
          text: 'text-amber-400',
          bg: 'bg-amber-500',
          border: 'border-amber-400',
          bgLight: 'bg-amber-400/10'
        },
        orange: {
          text: 'text-orange-400',
          bg: 'bg-orange-500',
          border: 'border-orange-400', 
          bgLight: 'bg-orange-400/10'
        },
        green: {
          text: 'text-green-400',
          bg: 'bg-green-500',
          border: 'border-green-400',
          bgLight: 'bg-green-400/10'
        },
        purple: {
          text: 'text-purple-400',
          bg: 'bg-purple-500',
          border: 'border-purple-400',
          bgLight: 'bg-purple-400/10'
        }
      };
      return colorMap[color] || colorMap.amber;
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8 overflow-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
            History of TDD
          </h1>
          <p className="text-xl text-gray-300">Evolution of Test-Driven Development</p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-400 via-orange-400 via-green-400 to-purple-400 rounded-full opacity-30"></div>
          
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
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
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

  // TDD vs BDD Slide Component
  const TDDvsBDDSlide = () => {
    const [currentView, setCurrentView] = useState('comparison'); // 'comparison', 'examples', 'decision'
    const [selectedAspect, setSelectedAspect] = useState(0);

    const comparisonAspects = [
      {
        aspect: "Focus",
        tdd: "Technical implementation and design",
        bdd: "Business behavior and user scenarios",
        tddIcon: "🔧",
        bddIcon: "👥"
      },
      {
        aspect: "Language",
        tdd: "Technical: Assert, Mock, Setup",
        bdd: "Natural: Given, When, Then",
        tddIcon: "💻",
        bddIcon: "📝"
      },
      {
        aspect: "Audience",
        tdd: "Developers and technical team",
        bdd: "Developers, QA, Business stakeholders",
        tddIcon: "👨‍💻",
        bddIcon: "🤝"
      },
      {
        aspect: "Scope",
        tdd: "Unit level, method/class behavior",
        bdd: "Feature level, user workflows",
        tddIcon: "🔬",
        bddIcon: "🎯"
      },
      {
        aspect: "Test Structure",
        tdd: "Arrange, Act, Assert",
        bdd: "Given, When, Then",
        tddIcon: "📋",
        bddIcon: "📖"
      }
    ];

    const examples = {
      tdd: {
        title: "TDD Example",
        code: `[TestMethod]
public void AddItemToCart_ItemIsAdded()
{
    // Arrange
    var cart = new Cart();
    var item = new Product("Apple", 1.00m);

    // Act
    cart.Add(item);

    // Assert
    Assert.IsTrue(cart.Contains(item));
}`,
        focus: "Tests the technical implementation of adding items to cart"
      },
      bdd: {
        title: "BDD Example",
        code: `Feature: Shopping Cart

  Scenario: Add item to cart
    Given I have a shopping cart
    And I am on the product page
    When I add an "Apple" to the cart
    Then the cart should contain "Apple"
    And the cart total should reflect the price`,
        focus: "Tests the user behavior and business value of cart functionality"
      }
    };

    const renderComparisonView = () => {
      const current = comparisonAspects[selectedAspect];
      
      return (
        <div className="min-h-full flex flex-col">
          <div className="mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* TDD Side */}
              <div className="bg-gradient-to-br from-green-800 to-green-600 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{current.tddIcon}</div>
                  <h3 className="text-2xl font-bold">TDD</h3>
                  <p className="text-sm text-green-100">Test-Driven Development</p>
                </div>
                <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                  <h4 className="font-bold text-green-200 mb-2">{current.aspect}:</h4>
                  <p className="text-green-100">{current.tdd}</p>
                </div>
              </div>

              {/* BDD Side */}
              <div className="bg-gradient-to-br from-blue-800 to-blue-600 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{current.bddIcon}</div>
                  <h3 className="text-2xl font-bold">BDD</h3>
                  <p className="text-sm text-blue-100">Behavior-Driven Development</p>
                </div>
                <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-200 mb-2">{current.aspect}:</h4>
                  <p className="text-blue-100">{current.bdd}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Aspect Navigation */}
          <div className="mb-4">
            <h4 className="text-xl font-bold text-center mb-4">Compare Different Aspects:</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {comparisonAspects.map((aspect, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAspect(index)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    index === selectedAspect 
                      ? 'bg-purple-600 text-white transform scale-105' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {aspect.aspect}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    };

    const renderExamplesView = () => (
      <div className="flex flex-col h-full">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* TDD Example */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-green-400 mb-4">{examples.tdd.title}</h3>
            <div className="bg-black p-4 rounded-lg mb-4 overflow-auto max-h-64">
              <code className="text-green-300 text-sm whitespace-pre-line">
                {examples.tdd.code}
              </code>
            </div>
            <p className="text-sm text-gray-300 italic">{examples.tdd.focus}</p>
          </div>

          {/* BDD Example */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">{examples.bdd.title}</h3>
            <div className="bg-black p-4 rounded-lg mb-4 overflow-auto max-h-64">
              <code className="text-blue-300 text-sm whitespace-pre-line">
                {examples.bdd.code}
              </code>
            </div>
            <p className="text-sm text-gray-300 italic">{examples.bdd.focus}</p>
          </div>
        </div>

        <div className="text-center bg-purple-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
          <p className="text-xl text-purple-100 font-medium">
            <strong className="text-purple-200">Key Insight:</strong> TDD focuses on "How to build it right" while BDD focuses on "Building the right thing"
          </p>
        </div>
      </div>
    );

    const renderDecisionView = () => (
      <div className="min-h-full flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-purple-400">Which Should You Choose?</h2>
          <p className="text-lg text-gray-300">They're not mutually exclusive!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-900 bg-opacity-50 p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold text-green-400 mb-4">Choose TDD When:</h3>
            <ul className="space-y-2 text-sm text-left">
              <li>• Building internal APIs</li>
              <li>• Complex business logic</li>
              <li>• Developer-focused libraries</li>
              <li>• Refactoring existing code</li>
              <li>• Technical debt reduction</li>
            </ul>
          </div>

          <div className="bg-blue-900 bg-opacity-50 p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Choose BDD When:</h3>
            <ul className="space-y-2 text-sm text-left">
              <li>• User-facing features</li>
              <li>• Cross-team communication needed</li>
              <li>• Business stakeholder involvement</li>
              <li>• Integration testing</li>
              <li>• Requirements clarification</li>
            </ul>
          </div>

          <div className="bg-purple-900 bg-opacity-50 p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Use Both When:</h3>
            <ul className="space-y-2 text-sm text-left">
              <li>• Large, complex systems</li>
              <li>• Mature development teams</li>
              <li>• Strong DevOps culture</li>
              <li>• Long-term products</li>
              <li>• High-quality requirements</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-yellow-900 bg-opacity-50 p-4 rounded-lg inline-block">
            <h4 className="text-lg font-bold text-yellow-200 mb-2">💡 Practical Recommendation</h4>
            <p className="text-sm text-gray-200">
              Start with TDD for technical mastery, add BDD for business alignment. They complement each other perfectly!
            </p>
          </div>
        </div>
      </div>
    );

    return (
      <div className="min-h-full flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-green-400">TDD</span>
            <span className="text-gray-400"> vs </span>
            <span className="text-blue-400">BDD</span>
          </h1>
          <p className="text-lg text-gray-300">Understanding the differences and when to use each</p>
          
          {/* View Toggle */}
          <div className="flex justify-center space-x-2 mt-6">
            {[
              { key: 'comparison', label: '⚖️ Side by Side', color: 'bg-purple-600' },
              { key: 'examples', label: '📝 Code Examples', color: 'bg-gray-600' },
              { key: 'decision', label: '🎯 Which to Choose', color: 'bg-orange-600' }
            ].map(view => (
              <button
                key={view.key}
                onClick={() => setCurrentView(view.key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
                  currentView === view.key 
                    ? `${view.color} text-white` 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Render Current View */}
        <div className="flex-1">
          {currentView === 'comparison' && renderComparisonView()}
          {currentView === 'examples' && renderExamplesView()}
          {currentView === 'decision' && renderDecisionView()}
        </div>
      </div>
    );
  };
  const DisadvantagesSlide = () => {
    const [currentView, setCurrentView] = useState('challenges'); // 'challenges', 'mitigation', 'reality'
    const [currentChallenge, setCurrentChallenge] = useState(0);

    const challenges = [
      {
        title: "Mindset Shift Required",
        icon: "🧠",
        color: "bg-red-500",
        problem: "Requires fundamental change from 'code first' to 'test first' thinking",
        impact: "Developers feel slower and uncomfortable initially",
        detail: "Years of 'write code then test' habits are hard to break. Feels unnatural and counterintuitive at first.",
        mitigation: "Start with simple exercises, pair programming, and gradual adoption. Allow 2-3 months for comfort."
      },
      {
        title: "Test Maintenance Burden",
        icon: "🔧",
        color: "bg-orange-500",
        problem: "Tests become another codebase that needs constant maintenance",
        impact: "Changing requirements means updating both code AND tests",
        detail: "Brittle tests break frequently. Refactoring becomes expensive when tests are tightly coupled to implementation.",
        mitigation: "Focus on testing behavior, not implementation. Write resilient tests. Regular test refactoring sessions."
      },
      {
        title: "Initial Development Slowdown",
        icon: "🐌",
        color: "bg-yellow-500",
        problem: "15-35% longer development time initially (research confirmed)",
        impact: "Pressure from management and tight deadlines create resistance",
        detail: "Writing tests first feels like doing double work. Team velocity appears to drop in early sprints.",
        mitigation: "Educate stakeholders on long-term benefits. Start with non-critical features. Measure defect reduction."
      },
      {
        title: "Legacy Code Integration",
        icon: "🏚️",
        color: "bg-purple-500",
        problem: "Extremely difficult to apply TDD to existing untested codebases",
        impact: "Requires extensive refactoring before TDD can be effective",
        detail: "Tightly coupled legacy code resists testing. Dependencies are hard to mock. Existing architecture fights TDD.",
        mitigation: "Use 'Legacy Code Dilemma' techniques. Create seams. Apply TDD only to new features initially."
      },
      {
        title: "Over-Testing Risk",
        icon: "🎯",
        color: "bg-blue-500",
        problem: "Tendency to test implementation details rather than behavior",
        impact: "Creates fragile test suites that break with every refactor",
        detail: "Developers often write too many low-level tests. Mock-heavy tests become maintenance nightmares.",
        mitigation: "Focus on public interfaces. Use test pyramid. Prefer integration tests over unit tests when appropriate."
      },
      {
        title: "Tool and Infrastructure Overhead",
        icon: "⚙️",
        color: "bg-teal-500",
        problem: "Requires investment in testing frameworks, CI/CD, and tooling",
        impact: "Additional complexity in build pipelines and development environment",
        detail: "Test runners, mocking frameworks, test databases. Slow test suites impact developer productivity.",
        mitigation: "Invest in fast testing infrastructure. Parallel test execution. Proper test categorization (unit/integration)."
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
        <div className="min-h-full flex flex-col">
          <div className={`${current.color} p-6 rounded-2xl mb-6 flex-1 flex flex-col justify-center`}>
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">{current.icon}</div>
              <h3 className="text-3xl font-bold mb-3">{current.title}</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                <h4 className="text-lg font-bold text-red-200 mb-2">🚫 The Problem:</h4>
                <p className="text-lg mb-2">{current.problem}</p>
                <p className="text-sm text-gray-200 italic">{current.detail}</p>
              </div>

              <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                <h4 className="text-lg font-bold text-orange-200 mb-2">💥 The Impact:</h4>
                <p className="text-lg">{current.impact}</p>
              </div>
            </div>
          </div>

          <button
            onClick={nextChallenge}
            className="bg-white text-gray-900 px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition-colors mx-auto mb-4"
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
        <div className="min-h-full overflow-y-auto">
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{challenge.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-orange-400 mb-2">{challenge.title}</h4>
                    <div className="bg-green-900 bg-opacity-50 p-3 rounded-lg">
                      <h5 className="text-sm font-bold text-green-300 mb-1">💡 How to Address:</h5>
                      <p className="text-sm text-gray-200">{challenge.mitigation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    const renderRealityView = () => (
      <div className="min-h-full flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-orange-400">The Honest Truth About TDD</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-900 bg-opacity-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-red-300">❌ TDD is NOT for everyone</h3>
            <ul className="space-y-2 text-sm">
              <li>• Tight deadline projects with no long-term maintenance</li>
              <li>• Prototyping and throw-away code</li>
              <li>• Teams unwilling to invest in learning</li>
              <li>• Heavily UI-focused applications</li>
              <li>• Organizations that don't value code quality</li>
            </ul>
          </div>

          <div className="bg-green-900 bg-opacity-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-green-300">✅ TDD works best when</h3>
            <ul className="space-y-2 text-sm">
              <li>• Long-term maintenance is expected</li>
              <li>• Team commits to learning period</li>
              <li>• Business logic complexity is high</li>
              <li>• Refactoring happens frequently</li>
              <li>• Quality is prioritized over speed</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-yellow-900 bg-opacity-50 p-4 rounded-lg inline-block">
            <h4 className="text-lg font-bold text-yellow-200 mb-2">🎯 Key Success Factors</h4>
            <p className="text-sm text-gray-200">
              Management support • Realistic timeline • Gradual adoption • Team commitment • Proper training
            </p>
          </div>
        </div>
      </div>
    );

    return (
      <div className="min-h-full flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-4 text-orange-400">TDD Challenges</h1>
          <p className="text-lg text-gray-300">Let's be honest about the difficulties</p>
          
          {/* View Toggle */}
          <div className="flex justify-center space-x-2 mt-6">
            {[
              { key: 'challenges', label: '⚠️ Challenges', color: 'bg-red-600' },
              { key: 'mitigation', label: '💡 Solutions', color: 'bg-green-600' },
              { key: 'reality', label: '🎯 Reality Check', color: 'bg-blue-600' }
            ].map(view => (
              <button
                key={view.key}
                onClick={() => setCurrentView(view.key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
                  currentView === view.key 
                    ? `${view.color} text-white` 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
          {currentView === 'reality' && renderRealityView()}
        </div>
      </div>
    );
  };
  const WhyTDDSlide = () => {
    const [currentView, setCurrentView] = useState('daily'); // 'daily', 'research', 'comparison'
    const [currentBenefit, setCurrentBenefit] = useState(0);

    const dailyBenefits = [
      {
        title: "Confidence to Change Code",
        icon: "🛡️",
        color: "bg-green-500",
        description: "No more fear of breaking existing functionality",
        detail: "Tests act as a safety net, allowing bold refactoring and feature additions without anxiety"
      },
      {
        title: "Faster Debugging",
        icon: "🐛",
        color: "bg-blue-500",
        description: "When tests fail, you know exactly what broke",
        detail: "Pinpoint failures instantly instead of hunting through logs and stack traces"
      },
      {
        title: "Better API Design",
        icon: "🎨",
        color: "bg-purple-500",
        description: "Tests force you to think from user's perspective",
        detail: "Writing the test first makes you design more intuitive, testable interfaces"
      },
      {
        title: "Living Documentation",
        icon: "📚",
        color: "bg-orange-500",
        description: "Tests show exactly how your code should work",
        detail: "New team members can read tests to understand system behavior and expectations"
      },
      {
        title: "Incremental Progress",
        icon: "🎯",
        color: "bg-teal-500",
        description: "Small, focused steps reduce overwhelm",
        detail: "Break complex problems into manageable test-driven increments"
      }
    ];

    const researchData = {
      nagappan2008: {
        title: "Microsoft & IBM Study (Nagappan et al., 2008)",
        defectReduction: "40-91%",
        timeIncrease: "15-35%",
        teams: "Four professional teams",
        credibility: "High - published research from major tech companies"
      },
      metaAnalysis: {
        title: "Systematic Review (2016)",
        qualityImprovement: "76% of studies showed significant internal quality increase",
        externalQuality: "88% showed significant external quality increase",
        source: "ScienceDirect systematic review"
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
        <div className="min-h-full flex flex-col">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">Daily Developer Benefits</h2>
            <p className="text-lg text-gray-300">What TDD feels like in practice</p>
          </div>

          <div className={`${current.color} p-8 rounded-2xl mb-6 text-center flex-1 flex flex-col justify-center`}>
            <div className="text-6xl mb-4">{current.icon}</div>
            <h3 className="text-3xl font-bold mb-4">{current.title}</h3>
            <p className="text-xl mb-4 italic">"{current.description}"</p>
            <div className="bg-black bg-opacity-30 p-4 rounded-lg">
              <p className="text-lg">{current.detail}</p>
            </div>
          </div>

          <button
            onClick={nextBenefit}
            className="bg-white text-gray-900 px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition-colors mx-auto"
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
                    ? 'bg-yellow-400 transform scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      );
    };

    const renderResearchView = () => (
      <div className="min-h-full flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-blue-400">Research Evidence</h2>
          <p className="text-lg text-gray-300">What the studies tell us</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">{researchData.nagappan2008.title}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                <h4 className="text-lg font-bold text-green-400 mb-2">🔽 Defect Density Dropped</h4>
                <p className="text-3xl font-bold">{researchData.nagappan2008.defectReduction}</p>
                <p className="text-sm text-gray-200 mt-2">Significantly fewer bugs in production</p>
              </div>
              <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                <h4 className="text-lg font-bold text-orange-400 mb-2">🔼 Initial Dev Time</h4>
                <p className="text-3xl font-bold">+{researchData.nagappan2008.timeIncrease}</p>
                <p className="text-sm text-gray-200 mt-2">Short-term investment for long-term gain</p>
              </div>
            </div>
            <p className="text-sm text-gray-200 mt-4 italic">{researchData.nagappan2008.credibility}</p>
          </div>

          <div className="bg-gradient-to-r from-green-800 to-green-600 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">{researchData.metaAnalysis.title}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-black bg-opacity-30 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-300">{researchData.metaAnalysis.qualityImprovement}</p>
                <p className="text-sm">Internal Quality Improvement</p>
              </div>
              <div className="bg-black bg-opacity-30 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-300">{researchData.metaAnalysis.externalQuality}</p>
                <p className="text-sm">External Quality Improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const renderComparisonView = () => (
      <div className="min-h-full flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-purple-400">The TDD Investment</h2>
          <p className="text-lg text-gray-300">Short-term cost, long-term gain</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-900 bg-opacity-50 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-4 text-red-300">⏳ Initial Cost</h3>
            <ul className="space-y-3 text-lg">
              <li>📈 15-35% longer initial development</li>
              <li>🧠 Learning curve for team</li>
              <li>⚡ Slower start on new features</li>
            </ul>
          </div>

          <div className="bg-green-900 bg-opacity-50 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-4 text-green-300">🎯 Long-term Gains</h3>
            <ul className="space-y-3 text-lg">
              <li>🐛 40-91% fewer defects</li>
              <li>🚀 Faster feature delivery later</li>
              <li>😌 Less debugging stress</li>
              <li>🔄 Easier refactoring</li>
              <li>👥 Better team confidence</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="bg-yellow-900 bg-opacity-50 p-4 rounded-lg inline-block">
            <p className="text-lg font-bold text-yellow-200">
              💰 ROI typically becomes positive after 2-3 months
            </p>
          </div>
        </div>
      </div>
    );

    return (
      <div className="min-h-full flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-4 text-yellow-400">Why TDD?</h1>
          
          {/* View Toggle */}
          <div className="flex justify-center space-x-2 mb-6">
            {[
              { key: 'daily', label: '👨‍💻 Daily Benefits', color: 'bg-green-600' },
              { key: 'research', label: '📊 Research Data', color: 'bg-blue-600' },
              { key: 'comparison', label: '⚖️ Cost vs Benefit', color: 'bg-purple-600' }
            ].map(view => (
              <button
                key={view.key}
                onClick={() => setCurrentView(view.key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
                  currentView === view.key 
                    ? `${view.color} text-white` 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
          {currentView === 'comparison' && renderComparisonView()}
        </div>
      </div>
    );
  };
  const WhatIsNotTDDSlide = () => {
    const [currentMyth, setCurrentMyth] = useState(0);
    const [showAll, setShowAll] = useState(false);

    const myths = [
      {
        myth: "TDD is just a synonym for writing tests",
        reality: "TDD is a design methodology",
        explanation: "TDD uses tests to drive the design of your code. It's about the process and mindset, not just having tests.",
        icon: "🧪",
        color: "bg-red-500"
      },
      {
        myth: "TDD means writing multiple tests upfront before any production code",
        reality: "TDD is about one test at a time",
        explanation: "You write ONE failing test, make it pass, then refactor. It's an incremental, iterative process.",
        icon: "📝",
        color: "bg-orange-500"
      },
      {
        myth: "TDD guarantees zero bugs",
        reality: "TDD reduces bugs, doesn't eliminate them",
        explanation: "TDD significantly reduces bugs and gives confidence, but it's not a silver bullet. Quality still requires good practices.",
        icon: "🐛",
        color: "bg-yellow-500"
      },
      {
        myth: "TDD is good for adding tests to existing production code",
        reality: "TDD is for new code development",
        explanation: "Adding tests to existing code is retrofitting, not TDD. TDD requires writing tests BEFORE the production code exists.",
        icon: "🔧",
        color: "bg-purple-500"
      },
      {
        myth: "TDD slows down development",
        reality: "TDD speeds up development long-term",
        explanation: "While initial development might feel slower, TDD reduces debugging time, refactoring fear, and maintenance costs.",
        icon: "🐌",
        color: "bg-blue-500"
      },
      {
        myth: "TDD replaces other testing practices",
        reality: "TDD complements other testing",
        explanation: "TDD focuses on unit tests. You still need integration tests, UI tests, performance tests, and manual testing.",
        icon: "🎭",
        color: "bg-green-500"
      }
    ];

    const nextMyth = () => {
      setCurrentMyth((prev) => (prev + 1) % myths.length);
    };

    const toggleShowAll = () => {
      setShowAll(!showAll);
    };

    if (showAll) {
      return (
        <div className="min-h-full flex flex-col">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 text-red-400">What is NOT TDD</h1>
            <p className="text-xl text-gray-300">Common Misconceptions Clarified</p>
            <button
              onClick={toggleShowAll}
              className="mt-4 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              ← Back to Interactive View
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 overflow-y-auto">
            {myths.map((item, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-400 mb-2">❌ Myth:</h3>
                    <p className="text-sm text-gray-300 mb-3">{item.myth}</p>
                    <h4 className="text-lg font-bold text-green-400 mb-2">✅ Reality:</h4>
                    <p className="text-sm text-white font-semibold mb-2">{item.reality}</p>
                    <p className="text-xs text-gray-400">{item.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const currentMythData = myths[currentMyth];

    return (
      <div className="min-h-full flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 text-red-400">What is NOT TDD</h1>
          <p className="text-xl text-gray-300 mb-4">Let's bust some common myths</p>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={toggleShowAll}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors"
            >
              📋 Show All Myths
            </button>
            <span className="bg-gray-700 px-4 py-2 rounded-lg text-gray-300">
              {currentMyth + 1} / {myths.length}
            </span>
          </div>
        </div>

        <div className={`${currentMythData.color} p-8 rounded-2xl mb-8 text-center flex-1 flex flex-col justify-center transform transition-all duration-500`}>
          <div className="text-6xl mb-6">{currentMythData.icon}</div>
          
          <div className="bg-black bg-opacity-30 p-6 rounded-xl mb-6">
            <h2 className="text-2xl font-bold text-red-200 mb-3">❌ Common Myth:</h2>
            <p className="text-xl mb-6 italic">"{currentMythData.myth}"</p>
            
            <h3 className="text-2xl font-bold text-green-200 mb-3">✅ The Reality:</h3>
            <p className="text-xl font-semibold mb-4">{currentMythData.reality}</p>
            
            <div className="border-t border-white border-opacity-30 pt-4">
              <p className="text-lg opacity-90">{currentMythData.explanation}</p>
            </div>
          </div>

          <button
            onClick={nextMyth}
            className="bg-white text-gray-900 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-200 transition-colors mx-auto"
          >
            Next Myth →
          </button>
        </div>

        {/* Myth Navigation Dots */}
        <div className="flex justify-center space-x-3 mb-4">
          {myths.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMyth(index)}
              className={`w-4 h-4 rounded-full transition-all ${
                index === currentMyth 
                  ? 'bg-red-400 transform scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
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
        return <WhatIsTDDSlide />;
      case 'what-is-not-tdd':
        return <WhatIsNotTDDSlide />;
      case 'why-tdd':
        return <WhyTDDSlide />;
      case 'disadvantages':
        return <DisadvantagesSlide />;
      case 'tdd-vs-bdd':
        return <TDDvsBDDSlide />;
      case 'best-practices':
        return <BestPracticesSlide />;
      case 'demo':
        return <DemoSlide />;
      case 'kent-beck-quote':
        return <KentBeckQuoteSlide />;
      default:
        return <TitleSlide />;
    }
  };

  const DemoSlide = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const demoSteps: DemoStep[] = [
      {
        title: "Step 1: Think - Plan Test Scenarios 🧠",
        description: "Before writing any code, let's think about what test scenarios we need for FizzBuzz. This upfront planning helps us understand the full scope.",
        phase: "think",
        tddInsight: "Start by identifying all the test scenarios needed. For FizzBuzz: regular numbers, Fizz (÷3), Buzz (÷5), and FizzBuzz (÷15).",
        allTestsCode: `// Test scenarios to implement:
// ✓ Regular numbers (1, 2, 4) → return as string
// ✓ Numbers divisible by 3 (3, 6, 9) → return "Fizz" 
// ✓ Numbers divisible by 5 (5, 10, 20) → return "Buzz"
// ✓ Numbers divisible by both 3 and 5 (15, 30) → return "FizzBuzz"

// We'll implement these one at a time using Red-Green cycles`,
        productionCode: `// No production code yet - we're still planning!
// 
// The FizzBuzz class will need:
// - A static Convert(int input) method
// - Logic to handle all four scenarios
// - Clean, readable implementation`,
        testResults: [],
        testStats: { total: 0, passed: 0, failed: 0 }
      },
      {
        title: "Step 2: Red - Test for Regular Numbers 🔴",
        description: "Write the first failing test for regular numbers (not divisible by 3 or 5). This test will fail because the method doesn't exist yet.",
        phase: "red",
        tddInsight: "Write the simplest failing test first. This test defines our API and expected behavior.",
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
        tddInsight: "Write the simplest code that makes the test pass. Don't overthink it - we're just getting to green!",
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
        tddInsight: "Add the next failing test. This test will drive the next piece of functionality.",
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
        tddInsight: "Make the minimal change to get all tests passing. Just add the logic needed for this specific case.",
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
        tddInsight: "Continue the Red-Green cycle. Add the next failing test for the Buzz requirement.",
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
        tddInsight: "Make all tests pass with the simplest solution. Just add the logic needed for this case.",
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
        tddInsight: "This test reveals a bug in our current logic! The failing test shows exactly what's wrong.",
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
        tddInsight: "Fix the failing test by checking the most specific condition first. Order matters in conditional logic!",
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
        tddInsight: "Now that all tests pass, we can safely refactor to improve code quality. The tests are our safety net!",
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
      },
      {
        title: "Summary: TDD Complete! 🎉",
        description: "We've successfully built FizzBuzz using Test-Driven Development. Let's review what we accomplished and key takeaways.",
        phase: "refactor",
        tddInsight: "TDD gave us confidence, better design, and comprehensive test coverage. We built exactly what was needed, no more, no less.",
        allTestsCode: `// Complete Test Suite - our living documentation!
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
        productionCode: `// Final FizzBuzz.cs - Modern, Clean, Tested, and Extensible!
public class FizzBuzz
{
    public static string Convert(int input) => (input % 3, input % 5) switch
    {
        (0, 0) => "FizzBuzz",
        (0, _) => "Fizz",
        (_, 0) => "Buzz",
        _ => input.ToString()
    };
}

/* ✨ TDD Benefits Achieved:
 * ✅ Comprehensive test coverage
 * ✅ Clean, readable code
 * ✅ Confidence to refactor
 * ✅ Self-documenting behavior
 * ✅ Extensible design
 * ✅ Edge cases handled
 */`,
        testResults: [
          { name: "Convert_Returns_Number_For_NonFizzBuzz_Input", status: "pass", message: "✓ All number conversions work perfectly" },
          { name: "Convert_Returns_Fizz_For_Multiples_Of_Three", status: "pass", message: "✓ Fizz logic is rock solid" },
          { name: "Convert_Returns_Buzz_For_Multiples_Of_Five", status: "pass", message: "✓ Buzz logic works flawlessly" },
          { name: "Convert_Returns_FizzBuzz_For_Multiples_Of_Three_And_Five", status: "pass", message: "✓ FizzBuzz edge cases handled perfectly" }
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
        case 'think': return 'bg-purple-500';
        case 'red': return 'bg-red-500';
        case 'green': return 'bg-green-500';
        case 'refactor': return 'bg-blue-500';
        case 'summary': return 'bg-purple-600';
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
      <div className="min-h-screen bg-gray-900 p-6 overflow-auto">
        {/* Navigation FIRST - At the top where it's always visible */}
        <div className="bg-yellow-500 text-black p-4 rounded-xl mb-6 shadow-lg">
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-lg font-bold ${
                currentStep === 0
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
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
                        ? 'bg-black text-white transform scale-110' 
                        : 'bg-gray-300 text-black hover:bg-gray-100'
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
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              NEXT →
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 text-white">Building FizzBuzz with TDD</h1>
          
          {/* Quick Jump Buttons */}
          <div className="flex justify-center space-x-2 mb-4">
            <button
              onClick={() => jumpToPhase('think')}
              className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white text-sm"
            >
              🧠 Think
            </button>
            <button
              onClick={() => jumpToPhase('red')}
              className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
            >
              🔴 Red
            </button>
            <button
              onClick={() => jumpToPhase('green')}
              className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm"
            >
              🟢 Green
            </button>
            <button
              onClick={() => jumpToPhase('refactor')}
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
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
          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-3">Test Results ({current.testStats.passed}/{current.testStats.total} Pass)</h3>
            <div className="space-y-2">
              {current.testResults.map((test, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg ${
                    test.status === 'pass' 
                      ? 'bg-green-900 border-l-4 border-green-400' 
                      : 'bg-red-900 border-l-4 border-red-400'
                  }`}
                >
                  <div className="font-bold text-white">{test.name}</div>
                  <div className={`text-sm ${test.status === 'pass' ? 'text-green-300' : 'text-red-300'}`}>
                    {test.message}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Code and Production Code Side by Side */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Test Code */}
            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-bold mb-3 text-yellow-400">Test Code (MSTest)</h3>
              <div className="bg-black p-4 rounded-lg overflow-auto" style={{ 
                minHeight: LAYOUT.CODE_BLOCK_MIN_HEIGHT,
                maxHeight: LAYOUT.CODE_BLOCK_MAX_HEIGHT
              }}>
                <pre className="text-yellow-300 text-sm whitespace-pre-wrap">
                  <code>{current.allTestsCode}</code>
                </pre>
              </div>
            </div>

            {/* Production Code */}
            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-bold mb-3 text-blue-400">Production Code (C#)</h3>
              <div className="bg-black p-4 rounded-lg overflow-auto" style={{ 
                minHeight: LAYOUT.CODE_BLOCK_MIN_HEIGHT,
                maxHeight: LAYOUT.CODE_BLOCK_MAX_HEIGHT
              }}>
                <pre className="text-blue-300 text-sm whitespace-pre-wrap">
                  <code>{current.productionCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-8"></div>
      </div>
    );
  };

  // Animated Ping Pong Programming Component
  const AnimatedPingPong = () => {
    const [currentPhase, setCurrentPhase] = useState(0);
    const [ballPosition, setBallPosition] = useState({ x: 20, y: 50 });
    const [ballColor, setBallColor] = useState('red');
    const [isAnimating, setIsAnimating] = useState(false);
    const [showResult, setShowResult] = useState('❌');
    const [animationCycle, setAnimationCycle] = useState(0);

    const phases: PingPongPhase[] = [
      { name: 'Red', player: 'A', color: 'red', position: { x: 20, y: 50 }, result: '❌', text: CONTENT.PING_PONG.WRITE_FAILING_TEST },
      { name: 'Green', player: 'B', color: 'green', position: { x: 80, y: 50 }, result: '✅', text: CONTENT.PING_PONG.MAKE_TEST_PASS },
      { name: 'Refactor', player: 'A', color: 'blue', position: { x: 20, y: 50 }, result: '🔧', text: CONTENT.PING_PONG.REFACTOR_CODE },
      { name: 'Red', player: 'B', color: 'red', position: { x: 80, y: 50 }, result: '❌', text: CONTENT.PING_PONG.WRITE_FAILING_TEST },
      { name: 'Green', player: 'A', color: 'green', position: { x: 20, y: 50 }, result: '✅', text: CONTENT.PING_PONG.MAKE_TEST_PASS },
      { name: 'Refactor', player: 'B', color: 'blue', position: { x: 80, y: 50 }, result: '🔧', text: CONTENT.PING_PONG.REFACTOR_CODE },
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setIsAnimating(true);
        const nextPhase = (currentPhase + 1) % phases.length;
        const phase = phases[nextPhase];
        
        // Update phase data immediately when animation starts
        setCurrentPhase(nextPhase);
        setBallColor(phase.color);
        setShowResult(phase.result);
        
        // Animate ball to new position
        setBallPosition(phase.position);
        
        setTimeout(() => {
          setIsAnimating(false);
          
          // Check if we completed a full cycle
          if (nextPhase === 0) {
            setAnimationCycle(prev => prev + 1);
            if (animationCycle >= DEMO_CONFIG.CYCLES_BEFORE_SUMMARY) {
              clearInterval(interval);
              setTimeout(() => {
                setAnimationCycle(0);
                setCurrentPhase(0);
                setBallPosition(phases[0].position);
                setBallColor(phases[0].color);
                setShowResult(phases[0].result);
              }, ANIMATIONS.BALL_TRANSITION_DURATION);
            }
          }
        }, ANIMATIONS.BALL_TRANSITION_DURATION);
      }, ANIMATIONS.PING_PONG_INTERVAL);

      return () => clearInterval(interval);
    }, [currentPhase, animationCycle]);

    const currentPhaseData = phases[currentPhase];

    return (
      <div className="relative w-full h-96 bg-gray-800 rounded-2xl overflow-hidden">
        {/* TDD Phase Indicator at top */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className={`px-6 py-2 rounded-full text-white font-bold text-lg ${
            currentPhaseData.color === 'red' ? 'bg-red-500' :
            currentPhaseData.color === 'green' ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {currentPhaseData.name} Phase
          </div>
        </div>

        {/* Player A */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-2 ${
            currentPhaseData.player === 'A' ? 'bg-blue-500 animate-pulse' : 'bg-gray-600'
          }`}>
            👨‍💻
          </div>
          <p className="text-white text-sm">Player A</p>
        </div>

        {/* Player B */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-2 ${
            currentPhaseData.player === 'B' ? 'bg-red-500 animate-pulse' : 'bg-gray-600'
          }`}>
            👩‍💻
          </div>
          <p className="text-white text-sm">Player B</p>
        </div>

        {/* Ping Pong Ball with text and trail effect */}
        <div 
          className="absolute ease-in-out"
          style={{ 
            transition: `all ${ANIMATIONS.BALL_TRANSITION_DURATION}ms`,
            left: `${ballPosition.x}%`,
            top: `${ballPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Ball */}
          <div className={`w-8 h-8 rounded-full ${
            ballColor === 'red' ? 'bg-red-400' :
            ballColor === 'green' ? 'bg-green-400' : 'bg-blue-400'
          } ${isAnimating ? 'animate-bounce' : ''}`}
          style={{
            boxShadow: `0 0 20px ${ballColor === 'red' ? '#ef4444' : ballColor === 'green' ? '#22c55e' : '#3b82f6'}`
          }}>
            {/* Ball trail effect */}
            <div className={`absolute inset-0 rounded-full animate-ping ${
              ballColor === 'red' ? 'bg-red-400' :
              ballColor === 'green' ? 'bg-green-400' : 'bg-blue-400'
            }`} />
            
            {/* Result icon on ball */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">
              {showResult}
            </div>
          </div>
          
          {/* Action text below ball */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <div className="bg-black bg-opacity-70 px-2 py-1 rounded text-white text-sm font-semibold">
              {currentPhaseData.text}
            </div>
          </div>
        </div>

        {/* Final Summary */}
        {animationCycle >= 2 && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-4">🏓 Ping-pong Programming</h3>
              <p className="text-xl mb-2">Pair Programming + TDD</p>
              <p className="text-lg">You code, I code, Repeat!</p>
            </div>
          </div>
        )}
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
      <div className="min-h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-4 text-green-400">TDD Best Practices</h1>
          <p className="text-lg text-gray-300">Proven techniques for .NET development success</p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center space-x-2 mb-6">
          {practiceCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => { setCurrentCategory(index); setSelectedPractice(0); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
                index === currentCategory 
                  ? `${category.color} text-white` 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Current Category Header */}
        <div className={`${currentCategoryData.color} p-4 rounded-xl mb-6 text-center`}>
          <div className="text-3xl mb-2">{currentCategoryData.icon}</div>
          <h2 className="text-2xl font-bold mb-2">{currentCategoryData.title}</h2>
          <p className="text-lg opacity-90">{currentCategoryData.description}</p>
        </div>

        {/* Current Practice Content */}
        <div className="bg-gray-800 p-6 rounded-xl mb-6 flex-1 overflow-y-auto">
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-2xl">{currentPractice.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-white">{currentPractice.title}</h3>
              <p className="text-gray-400">{currentPractice.description}</p>
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

          <div className="bg-blue-900 bg-opacity-50 p-3 rounded-lg">
            <div className="flex items-start space-x-2">
              <span className="text-blue-300 font-bold">💡 Pro Tip:</span>
              <p className="text-blue-100 text-sm">{currentPractice.tip}</p>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-6 mb-8">
          <button
            onClick={nextCategory}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white font-bold transition-all"
          >
            Next Category: {practiceCategories[(currentCategory + 1) % practiceCategories.length].title} →
          </button>

          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">
              Practice {selectedPractice + 1} of {currentCategoryData.practices.length}
            </div>
            <div className="flex space-x-1">
              {currentCategoryData.practices.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPractice(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedPractice 
                      ? 'bg-green-400 transform scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={nextPractice}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-bold transition-all"
          >
            Next Practice →
          </button>
        </div>
      </div>
    );
  };

  // Kent Beck Quote Slide Component
  const KentBeckQuoteSlide = () => (
    <div className="min-h-full relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center px-8 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500 opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main Quote - CENTER FOCUS */}
        <div className="relative mb-12">
          {/* Large decorative quote marks */}
          <div className="absolute -top-16 -left-16 text-8xl text-blue-400 opacity-15 font-serif">"</div>
          <div className="absolute -bottom-16 -right-16 text-8xl text-blue-400 opacity-15 font-serif">"</div>
          
          <blockquote className="relative z-10">
            <p className="text-4xl md:text-5xl lg:text-6xl font-light italic text-white leading-tight mb-10">
              I am not a great programmer.
              <br />
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 opacity-10 blur-lg scale-110"></div>
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
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Kent Beck
            </h2>
            <p className="text-base text-gray-300">Creator of Test-Driven Development</p>
            <div className="flex justify-center space-x-2 mt-2">
              <span className="px-2 py-1 bg-blue-500 bg-opacity-20 text-blue-300 rounded-full text-xs border border-blue-500 border-opacity-30">
                Software Pioneer
              </span>
              <span className="px-2 py-1 bg-green-500 bg-opacity-20 text-green-300 rounded-full text-xs border border-green-500 border-opacity-30">
                Agile Methodologist
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-red-400 via-green-400 to-blue-400 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="p-8 pt-12 min-h-screen pb-24">
        <div className="max-w-6xl mx-auto">
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