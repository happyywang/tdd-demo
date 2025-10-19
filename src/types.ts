// Core Data Types
export interface Slide {
  id: string;
  title: string;
  type: 'title' | 'agenda' | 'history' | 'what-is-tdd' | 'what-to-test-with-tdd' | 'what-is-not-tdd' | 'why-tdd' |
        'disadvantages' | 'tdd-vs-bdd' | 'best-practices' | 'tdd-best-practices' | 'demo' | 'kent-beck-quote' | 'bug-first-tdd';
}

export interface TestStats {
  passed: number;
  total: number;
  failed: number;
}

export interface TestResult {
  name: string;
  status: 'pass' | 'fail';
  message: string;
}

export interface DemoStep {
  title: string;
  description: string;
  phase: 'think' | 'red' | 'green' | 'refactor' | 'summary';
  testStats: TestStats;
  testResults: TestResult[];
  allTestsCode: string;
  productionCode: string;
  tddInsight?: string;
  testScenarios?: TestScenario[];
  productionGoals?: string[];
}

export interface TestScenario {
  id: string;
  description: string;
  examples: string;
  isCompleted?: boolean;
}

export interface PingPongPhase {
  name: string;
  color: string;
  result: string;
  playerA: {
    role: 'active' | 'observing' | 'collaborating';
    text: string;
  };
  playerB: {
    role: 'active' | 'observing' | 'collaborating';
    text: string;
  };
  notes: string;
}

// Component Props Types
export interface Position {
  x: number;
  y: number;
}

export interface Practice {
  title: string;
  icon: string;
  description: string;
  example: string;
  tip: string;
  isAnimation?: boolean;
}

export interface PracticeCategory {
  title: string;
  icon: string;
  color: string;
  description: string;
  practices: Practice[];
}

export interface Challenge {
  title: string;
  icon: string;
  color: string;
  problem: string;
  impact: string;
  detail: string;
  mitigation: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface TDDStep {
  name: string;
  color: string;
  title: string;
  description: string;
  code: string;
}