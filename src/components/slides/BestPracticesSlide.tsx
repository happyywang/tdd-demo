import { useState } from 'react';
import { PracticeCategory } from '../../types';
import AnimatedPingPong from './AnimatedPingPong';
// Updated with Rosen Next brand colors

const BestPracticesSlide = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);

  const practiceCategories: PracticeCategory[] = [
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
Add_Test1()
TestCalculator()

// ✅ Good Names  
ApplyDiscount_WhenCustomerIsPremium_ShouldReduceTotalBy10Percent()
Add_NegativeNumber_ThrowsArgumentException()
GetUser_InvalidId_ReturnsNull()`,
          tip: "Use pattern: MethodUnderTest_Scenario_ExpectedBehavior"
        },
        {
          title: "Use Clear and Purposeful Test Data",
          icon: "📊",
          description: "Make test data meaningful and obvious",
          example: `// ❌ Magic Numbers
Assert.AreEqual(42, Calculate(6, 7));

// ✅ Meaningful Data
const int ValidAge = 25;
const int RetirementAge = 65; 
Assert.AreEqual(40, CalculateYearsToRetirement(ValidAge));

// ✅ Or use Builder Pattern
var user = new UserBuilder()
    .WithAge(25)
    .WithName("John")
    .Build();`,
          tip: "Use constants or builder patterns to make test intent crystal clear"
        },
        {
          title: "Start with Simplest Test Case",
          icon: "🌱",
          description: "Begin with the most basic scenario first",
          example: `// Test progression order:
1. ApplyDiscount_WhenCustomerIsPremium_ShouldReduceTotalBy10Percent()
2. ApplyDiscount_WhenCustomerIsRegular_ShouldNotApplyDiscount()  
3. ApplyDiscount_WhenCartIsEmpty_ShouldKeepTotalZero()
4. ApplyDiscount_WhenDiscountExceedsTotal_ThrowsException()`,
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
[TestMethod] public void CreateUser_ValidData_ReturnsId() { ... }
[TestMethod] public void GetUser_ExistingId_ReturnsUser() { 
    // Depends on CreateUser test running first! 
}

// ✅ Independent Tests  
[TestMethod] 
public void GetUser_ExistingId_ReturnsUser() 
{
    // Arrange - create test data in this test
    var userId = CreateTestUser();
    
    // Act & Assert
    var user = repository.GetUser(userId);
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
          title: "Run Tests Frequently for Fast Feedback",
          icon: "⚡",
          description: "Continuous validation during development",
          example: `// VS Code/Visual Studio shortcuts:
Ctrl+R, A - Run All Tests
Ctrl+R, T - Run Tests in Current Context

// Set up automatic test runs:
- On file save
- On build  
- Pre-commit hooks

// Continuous Integration:
- Run tests on every PR
- Fast feedback on builds`,
          tip: "Tests should run in under 10 seconds for immediate feedback loop"
        },
        {
          title: "End Your Day with a Failing Test",
          icon: "🌙",
          description: "Set yourself up for easy next-morning start",
          example: `// Before leaving work:
1. Write the next test (it will fail)
2. Add TODO comment explaining intent
3. Commit the failing test

[TestMethod]
public void ProcessOrder_MultipleItems_CalculatesTotalWithTax()
{
    // TODO: Implement tax calculation logic
    // This should handle multiple items and apply correct tax rate
    Assert.Fail("Not implemented yet");
}

// Next morning: You know exactly where to start!`,
          tip: "This technique eliminates the 'blank page' problem when resuming work"
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
          description: "A pair programming style where two developers alternate between writing tests and writing production code, like a ping-pong match.",
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
          description: "Align team standards for what makes good tests",
          example: `Team Code Review Checklist:

✅ Test name clearly describes behavior?
✅ Single responsibility per test?
✅ Arrange-Act-Assert structure clear?
✅ No magic numbers or unclear data?
✅ Test runs independently?
✅ Failure message is helpful?

Team Agreements:
- Maximum test execution time: 100ms
- Test naming convention: Method_Scenario_Expected
- When to mock vs use real objects
- Coverage expectations (not 100%!)`,
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
          example: `Speed Guidelines:
🟢 Unit Tests: < 100ms each
🟡 Integration Tests: < 5 seconds  
🔴 End-to-End Tests: < 30 seconds

Speed Optimization Techniques:
- Use in-memory databases for tests
- Mock external dependencies  
- Parallel test execution
- Test categorization ([Category("Fast")])

// Fast test example:
[Test, Category("Fast")]
public void Calculate_ValidInput_ReturnsResult()
{
    var result = calculator.Add(2, 3); // No I/O
    Assert.AreEqual(5, result);
}`,
          tip: "If unit tests take more than 10 seconds total, developers will skip them"
        },
        {
          title: "Avoid Testing Implementation Details",
          icon: "🚫", 
          description: "Test behavior, not internal workings",
          example: `// ❌ Testing Implementation (Brittle)
[TestMethod]
public void ProcessOrder_CallsRepositorySaveMethod()
{
    // Verifying internal method calls
    repository.Verify(r => r.Save(It.IsAny<Order>()), Times.Once);
}

// ✅ Testing Behavior (Robust)  
[TestMethod]
public void ProcessOrder_ValidOrder_OrderIsPersisted()
{
    // Arrange
    var order = new Order { Id = 1, Total = 100 };
    
    // Act
    service.ProcessOrder(order);
    
    // Assert - verify the outcome, not the method
    var savedOrder = repository.GetById(1);
    Assert.IsNotNull(savedOrder);
    Assert.AreEqual(100, savedOrder.Total);
}`,
          tip: "If you refactor and tests break, you're probably testing implementation"
        },
        {
          title: "Refactor Fearlessly but Safely",
          icon: "🛡️",
          description: "Use tests as your safety net for bold changes",
          example: `Fearless Refactoring Process:

1. 🟢 Ensure all tests are GREEN
2. 🔧 Make refactoring changes
3. ⚡ Run tests immediately  
4. 🔴 If ANY test fails:
   - Stop and fix the issue
   - Don't continue refactoring
5. 🟢 All green? Continue refactoring
6. 📝 Commit frequently`,
          tip: "Green tests are your permission to refactor. Red tests mean STOP."
        }
      ]
    }
  ];

  const nextCategory = () => {
    setCurrentCategory((prev) => (prev + 1) % practiceCategories.length);
    setSelectedPractice(0);
  };

  const nextPractice = () => {
    const currentCat = practiceCategories[currentCategory];
    setSelectedPractice((prev) => (prev + 1) % currentCat.practices.length);
  };

  const currentCat = practiceCategories[currentCategory];
  const currentPractice = currentCat.practices[selectedPractice];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">TDD Best Practices</h1>
        <p className="text-xl text-[#50DCE1]">Practical wisdom for successful TDD adoption</p>
      </div>

      {/* Category Navigation */}
      <div className="flex justify-center space-x-2 mb-6">
        {practiceCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentCategory(index);
              setSelectedPractice(0);
            }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
              index === currentCategory
                ? 'bg-[#50DCE1] text-black'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:border-[#50DCE1] border border-transparent'
            }`}
          >
            {category.icon} {category.title}
          </button>
        ))}
      </div>

      {/* Current Category Header */}
      <div className="bg-gradient-to-r from-[#50DCE1] to-cyan-500 p-4 rounded-xl mb-6 text-center">
        <div className="text-4xl mb-2">{currentCat.icon}</div>
        <h2 className="text-2xl font-bold mb-2 text-black">{currentCat.title}</h2>
        <p className="opacity-90 text-black font-semibold">{currentCat.description}</p>
      </div>

      {/* Practice Content */}
      <div className="flex-1 bg-slate-800 border border-[#50DCE1]/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-[#50DCE1] flex items-center">
            <span className="text-3xl mr-3">{currentPractice.icon}</span>
            {currentPractice.title}
          </h3>
          <div className="flex space-x-2">
            {currentCat.practices.map((_, index) => (
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
        </div>

        <p className="text-lg text-gray-300 mb-6">{currentPractice.description}</p>

        {/* Special handling for animation practice */}
        {currentPractice.isAnimation ? (
          <div className="space-y-6">
            <AnimatedPingPong />
            <div className="bg-gray-900 p-4 rounded-lg">
              <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                <code>{currentPractice.example}</code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Code Example */}
            <div className="bg-black p-4 rounded-lg">
              <pre className="text-green-300 text-sm whitespace-pre-wrap overflow-x-auto">
                <code>{currentPractice.example}</code>
              </pre>
            </div>

            {/* Tip */}
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
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={nextPractice}
          className="bg-[#50DCE1] hover:bg-cyan-400 text-black px-6 py-3 rounded-full font-bold transition-colors"
        >
          Next Practice →
        </button>

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

export default BestPracticesSlide;