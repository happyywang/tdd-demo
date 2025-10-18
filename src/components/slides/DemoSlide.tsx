import { useState, useEffect, memo, useCallback } from 'react';
import { DemoStep } from '../../types';
import { LAYOUT, COLORS, TYPOGRAPHY, SPACING, UI_COMPONENTS } from '../../constants';

interface DemoSlideProps {
  demoSteps: DemoStep[];
}

const DemoSlide = memo(({ demoSteps }: DemoSlideProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = useCallback(() => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, demoSteps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const jumpToPhase = useCallback((phase: 'think' | 'red' | 'green' | 'refactor') => {
    const phaseStep = demoSteps.findIndex(step => step.phase === phase);
    if (phaseStep !== -1) {
      setCurrentStep(phaseStep);
    }
  }, [demoSteps]);

  const getPhaseColor = useCallback((phase: 'think' | 'red' | 'green' | 'refactor' | 'summary'): string => {
    switch (phase) {
      case 'think': return COLORS.PHASES.THINK;
      case 'red': return COLORS.PHASES.RED;
      case 'green': return COLORS.PHASES.GREEN;
      case 'refactor': return COLORS.PHASES.REFACTOR;
      case 'summary': return COLORS.PHASES.REFACTOR; // Use same as refactor
      default: return COLORS.BACKGROUNDS.SECONDARY;
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextStep();
      if (e.key === 'ArrowLeft') prevStep();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextStep, prevStep]);

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
    <div className={`min-h-screen ${COLORS.BACKGROUNDS.PRIMARY} ${SPACING.PADDING.LG} overflow-auto`} role="main" aria-label="TDD Demo Presentation">
      {/* Navigation FIRST - At the top where it's always visible */}
      <nav className={`${COLORS.BACKGROUNDS.NAVIGATION} text-black ${SPACING.PADDING.MD} rounded-xl ${SPACING.MARGIN_B.LG} shadow-lg`} role="navigation" aria-label="Slide navigation">
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`${UI_COMPONENTS.BUTTONS.NAVIGATION} ${
              currentStep === 0
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
            aria-label="Previous step"
            aria-disabled={currentStep === 0}
          >
            ← PREV
          </button>
          
          <div className="text-center flex-1">
            <div className={`${TYPOGRAPHY.SIZES['2XL']} ${TYPOGRAPHY.WEIGHTS.BLACK} ${SPACING.MARGIN_B.SM}`} aria-live="polite">
              STEP {currentStep + 1} of {demoSteps.length}
            </div>
            <div className="flex space-x-1 justify-center" role="group" aria-label="Step navigation">
              {demoSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`${UI_COMPONENTS.BUTTONS.ICON} ${
                    index === currentStep 
                      ? 'bg-black text-white transform scale-110' 
                      : 'bg-gray-300 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                  aria-current={index === currentStep ? 'step' : undefined}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === demoSteps.length - 1}
            className={`${UI_COMPONENTS.BUTTONS.NAVIGATION} ${
              currentStep === demoSteps.length - 1
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
            aria-label="Next step"
            aria-disabled={currentStep === demoSteps.length - 1}
          >
            NEXT →
          </button>
        </div>
      </nav>

      {/* Header */}
      <div className={`text-center ${SPACING.MARGIN_B.LG}`}>
        <h1 className={`${TYPOGRAPHY.SIZES['3XL']} ${TYPOGRAPHY.WEIGHTS.BOLD} ${SPACING.MARGIN_B.SM} ${COLORS.TEXT.PRIMARY}`}>
          Building a Bank Account System with TDD
        </h1>
        
        {/* Quick Jump Buttons */}
        <div className={`flex justify-center ${SPACING.GAP.SM} ${SPACING.MARGIN_B.MD}`} role="group" aria-label="Jump to TDD phase">
          <button
            onClick={() => jumpToPhase('think')}
            className={`${SPACING.PADDING_X.SM} ${SPACING.PADDING_Y.SM} rounded ${COLORS.SECONDARY[600]} hover:${COLORS.SECONDARY[700]} ${COLORS.TEXT.PRIMARY} ${TYPOGRAPHY.SIZES.SM} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300`}
            aria-label="Jump to Think phase"
          >
            🧠 Think
          </button>
          <button
            onClick={() => jumpToPhase('red')}
            className={`${SPACING.PADDING_X.SM} ${SPACING.PADDING_Y.SM} rounded ${COLORS.ERROR[600]} hover:${COLORS.ERROR[700]} ${COLORS.TEXT.PRIMARY} ${TYPOGRAPHY.SIZES.SM} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300`}
            aria-label="Jump to Red phase"
          >
            🔴 Red
          </button>
          <button
            onClick={() => jumpToPhase('green')}
            className={`${SPACING.PADDING_X.SM} ${SPACING.PADDING_Y.SM} rounded ${COLORS.SUCCESS[600]} hover:${COLORS.SUCCESS[700]} ${COLORS.TEXT.PRIMARY} ${TYPOGRAPHY.SIZES.SM} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-300`}
            aria-label="Jump to Green phase"
          >
            🟢 Green
          </button>
          <button
            onClick={() => jumpToPhase('refactor')}
            className={`${SPACING.PADDING_X.SM} ${SPACING.PADDING_Y.SM} rounded ${COLORS.PRIMARY[600]} hover:${COLORS.PRIMARY[700]} ${COLORS.TEXT.PRIMARY} ${TYPOGRAPHY.SIZES.SM} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300`}
            aria-label="Jump to Refactor phase"
          >
            🔵 Refactor
          </button>
        </div>
      </div>

      {/* Current Step */}
      <section className={`${getPhaseColor(current.phase)} ${SPACING.PADDING.MD} rounded-xl ${SPACING.MARGIN_B.LG} text-center`} aria-labelledby="current-step-title">
        <h2 id="current-step-title" className={`${TYPOGRAPHY.SIZES['2XL']} ${TYPOGRAPHY.WEIGHTS.BOLD} ${SPACING.MARGIN_B.SM}`}>
          {current.title}
        </h2>
        <p className="opacity-90">{current.description}</p>
      </section>

      {/* Content - Simple vertical layout */}
      <div className={`${SPACING.GAP.LG} space-y-6`}>
        {/* Test Scenarios and Production Goals - Only for Think phase */}
        {current.phase === 'think' && (current.testScenarios || current.productionGoals) && (
          <div className={`grid md:grid-cols-2 ${SPACING.GAP.MD}`}>
            {/* Test Scenarios Checklist */}
            {current.testScenarios && (
              <section className={`${UI_COMPONENTS.CARDS.DEFAULT}`} aria-labelledby="test-scenarios-title">
                <h3 id="test-scenarios-title" className={`${TYPOGRAPHY.SIZES.LG} ${TYPOGRAPHY.WEIGHTS.BOLD} ${SPACING.MARGIN_B.SM} text-purple-400`}>
                  🎯 Test Scenarios to Implement
                </h3>
                <div className="space-y-3">
                  {current.testScenarios.map((scenario, index) => (
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
              </section>
            )}

            {/* Production Goals */}
            {current.productionGoals && (
              <section className={`${UI_COMPONENTS.CARDS.DEFAULT}`} aria-labelledby="production-goals-title">
                <h3 id="production-goals-title" className={`${TYPOGRAPHY.SIZES.LG} ${TYPOGRAPHY.WEIGHTS.BOLD} ${SPACING.MARGIN_B.SM} text-blue-400`}>
                  📦 What We'll Build
                </h3>
                <div className="space-y-3">
                  {current.productionGoals.map((goal, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg border border-gray-600">
                      <div className="text-blue-400 text-xl flex-shrink-0">•</div>
                      <div className="text-white">{goal}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Test Results */}
        <section className={`${UI_COMPONENTS.CARDS.DEFAULT}`} aria-labelledby="test-results-title">
          <h3 id="test-results-title" className={`${TYPOGRAPHY.SIZES.LG} ${TYPOGRAPHY.WEIGHTS.BOLD} ${COLORS.TEXT.PRIMARY} ${SPACING.MARGIN_B.SM}`}>
            Test Results ({current.testStats.passed}/{current.testStats.total} Pass)
          </h3>
          <div className={`${SPACING.GAP.SM} space-y-2`} role="list" aria-label="Test results list">
            {current.testResults.map((test, index) => (
              <div 
                key={index}
                role="listitem"
                className={`${SPACING.PADDING.SM} rounded-lg ${
                  test.status === 'pass' 
                    ? `${COLORS.SUCCESS[900]} border-l-4 ${COLORS.BORDERS.SUCCESS}` 
                    : `${COLORS.ERROR[900]} border-l-4 ${COLORS.BORDERS.ERROR}`
                }`}
                aria-label={`Test ${test.status}: ${test.name}`}
              >
                <div className={`${TYPOGRAPHY.WEIGHTS.BOLD} ${COLORS.TEXT.PRIMARY}`}>
                  {test.name}
                </div>
                <div className={`${TYPOGRAPHY.SIZES.SM} ${test.status === 'pass' ? COLORS.TEXT.SUCCESS : COLORS.TEXT.ERROR}`}>
                  {test.message}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Test Code and Production Code Side by Side */}
        <div className={`grid md:grid-cols-2 ${SPACING.GAP.MD}`}>
          {/* Test Code */}
          <section className={`${UI_COMPONENTS.CARDS.DEFAULT}`} aria-labelledby="test-code-title">
            <h3 id="test-code-title" className={`${TYPOGRAPHY.SIZES.LG} ${TYPOGRAPHY.WEIGHTS.BOLD} ${SPACING.MARGIN_B.SM} text-yellow-400`}>
              Test Code (MSTest)
            </h3>
            <div 
              className={`${UI_COMPONENTS.CODE_BLOCKS.DEFAULT}`} 
              role="code" 
              aria-label="MSTest test code"
              tabIndex={0}
              style={{ 
                minHeight: LAYOUT.CODE_BLOCK_MIN_HEIGHT,
                maxHeight: LAYOUT.CODE_BLOCK_MAX_HEIGHT
              }}
            >
              <pre className="text-yellow-300 whitespace-pre-wrap">
                <code>{current.allTestsCode}</code>
              </pre>
            </div>
          </section>

          {/* Production Code */}
          <section className={`${UI_COMPONENTS.CARDS.DEFAULT}`} aria-labelledby="production-code-title">
            <h3 id="production-code-title" className={`${TYPOGRAPHY.SIZES.LG} ${TYPOGRAPHY.WEIGHTS.BOLD} ${SPACING.MARGIN_B.SM} text-blue-400`}>
              Production Code (C#)
            </h3>
            <div 
              className={`${UI_COMPONENTS.CODE_BLOCKS.DEFAULT}`} 
              role="code" 
              aria-label="C# production code"
              tabIndex={0}
              style={{ 
                minHeight: LAYOUT.CODE_BLOCK_MIN_HEIGHT,
                maxHeight: LAYOUT.CODE_BLOCK_MAX_HEIGHT
              }}
            >
              <pre className="text-blue-300 whitespace-pre-wrap">
                <code>{current.productionCode}</code>
              </pre>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className={SPACING.MARGIN_B.XL}></div>
    </div>
  );
});

DemoSlide.displayName = 'DemoSlide';

export default DemoSlide;