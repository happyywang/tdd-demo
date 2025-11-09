import { DemoStep } from './types';

export const bankAccountDemoSteps: DemoStep[] = [
  {
    title: "Step 1: Think - Deposit (The simplest possible behavior) 🧠",
    description: "I need a bank account that can accept deposits. If the client deposits 100, the balance should become 100. Smallest possible test case - no need to think about withdraw or limits yet.",
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
    title: "Step 2: Red - Write the failing test 🔴",
    description: "Write a test for deposit functionality. This test will fail because the BankAccount class and Deposit method don't exist yet.",
    phase: "red",
    allTestsCode: `[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Should_IncreaseBalance_When_Deposit()
    {
        var account = new BankAccount();
        account.Deposit(100m);
        Assert.AreEqual(100m, account.Balance);
    }
}`,
    productionCode: `// BankAccount.cs
public class BankAccount
{
    // No method yet!
}`,
    testResults: [
      {
        name: "Should_IncreaseBalance_When_Deposit",
        status: "fail",
        message: "'BankAccount' does not contain a definition for 'Deposit'"
      }
    ],
    testStats: { total: 1, passed: 0, failed: 1 }
  }
];
