import { useState, useEffect, useRef } from 'react';

interface StepType {
  id: string;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
  icon: string;
  position: { x: number; y: number };
  labelPosition: { x: number; y: number };
  isSpecial?: boolean;
}

const TDDCycleSlide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [showExtended, setShowExtended] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const prevStepRef = useRef(0);

  // Traditional 3-step cycle
  const traditionalSteps: StepType[] = [
    {
      id: 'red',
      name: 'Write Failing Test',
      shortName: 'Red',
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-600',
      icon: '🔴',
      position: { x: 50, y: 15 }, // Top - 12 o'clock
      labelPosition: { x: 25, y: 2 } // Left and up
    },
    {
      id: 'green',
      name: 'Make Test Pass',
      shortName: 'Green',
      color: 'from-emerald-600 to-emerald-700',
      bgColor: 'bg-emerald-600',
      icon: '🟢',
      position: { x: 87, y: 55 }, // Right - moved slightly right
      labelPosition: { x: 107, y: 55 } // To the right
    },
    {
      id: 'refactor',
      name: 'Improve Code',
      shortName: 'Refactor',
      color: 'from-slate-600 to-slate-700',
      bgColor: 'bg-slate-600',
      icon: '🔵',
      position: { x: 13, y: 55 }, // Left - moved slightly left
      labelPosition: { x: -7, y: 55 } // To the left
    }
  ];

  // Extended 4-step TRGR cycle - circular layout with all steps on the ring
  const extendedSteps: StepType[] = [
    {
      id: 'think',
      name: 'Think: Break Down Goals, Focus Intent',
      shortName: 'Think',
      color: 'from-[#50DCE1] to-cyan-500',
      bgColor: 'bg-[#50DCE1]',
      icon: '🧠',
      position: { x: 50, y: 15 }, // Top - 12 o'clock
      labelPosition: { x: 50, y: 2 },
      isSpecial: true
    },
    {
      id: 'red',
      name: 'Write Failing Test',
      shortName: 'Red',
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-600',
      icon: '🔴',
      position: { x: 86, y: 50 }, // Right - moved right
      labelPosition: { x: 106, y: 50 }
    },
    {
      id: 'green',
      name: 'Make Test Pass',
      shortName: 'Green',
      color: 'from-emerald-600 to-emerald-700',
      bgColor: 'bg-emerald-600',
      icon: '🟢',
      position: { x: 50, y: 88 }, // Bottom - moved further down
      labelPosition: { x: 25, y: 95 }
    },
    {
      id: 'refactor',
      name: 'Refactor & Optimize',
      shortName: 'Refactor',
      color: 'from-slate-600 to-slate-700',
      bgColor: 'bg-slate-600',
      icon: '🔵',
      position: { x: 14, y: 50 }, // Left - moved left
      labelPosition: { x: -16, y: 50 }
    }
  ];

  const currentSteps = showExtended ? extendedSteps : traditionalSteps;


  // Auto-advance animation with cycle counting
  useEffect(() => {
    if (!isAnimating || !showAnimation) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = (prev + 1) % currentSteps.length;

        // Track previous step and increment cycle count when completing full cycle
        const lastStepIndex = currentSteps.length - 1;
        if (prevStepRef.current === lastStepIndex && nextStep === 0) {
          setCycleCount(count => count + 1);
        }

        prevStepRef.current = nextStep;


        return nextStep;
      });
    }, 2000); // Faster animation - 2 seconds per step

    return () => clearInterval(interval);
  }, [isAnimating, currentSteps.length, showAnimation]);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setIsAnimating(false);
  };

  const toggleExtended = () => {
    setShowExtended(!showExtended);
    setCurrentStep(0);
    setCycleCount(0);
    prevStepRef.current = 0;
  };

  const revealAnimation = () => {
    setShowAnimation(true);
    setIsAnimating(true);
    setCurrentStep(0);
    setCycleCount(0);
    prevStepRef.current = 0;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-[#50DCE1] to-white bg-clip-text text-transparent">What is TDD?</h1>
        <p className="text-xl text-[#50DCE1] font-semibold">Test-Driven Development</p>
        <p className="text-lg text-gray-300 mt-2">A development methodology where tests drive the design of production code</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto relative mt-4">

        {/* Click overlay when animation is hidden */}
        {!showAnimation && (
          <div
            className="absolute inset-x-0 top-16 bottom-0 flex items-center justify-center z-20 cursor-pointer"
            onClick={revealAnimation}
          >
            <div className="text-center px-6 py-4 bg-black/80 rounded-lg border border-[#50DCE1]/50 backdrop-blur-sm">
              <div className="text-3xl mb-2 animate-pulse">👆</div>
              <div className="text-base text-[#50DCE1] font-semibold">Click to show animation</div>
            </div>
          </div>
        )}

        {/* Toggle button aligned with Write Failing Test label height, far right */}
        <div
          className="absolute -right-48"
          style={{
            top: '2%',
            transform: 'translate(-50%, -100%)'
          }}
        >
          <button
            onClick={toggleExtended}
            className="bg-gray-800 hover:bg-[#50DCE1] text-gray-300 hover:text-black px-4 py-2 rounded-md text-sm transition-colors border border-gray-600 hover:border-[#50DCE1] text-right"
          >
            {showExtended ? '3-Step RGR' : '4-Step TRGR'}
          </button>
        </div>

        {/* Main Animation Area - Expanded for outer labels */}
        <div className="flex justify-center">
          <div className={`relative w-[500px] h-[500px] mb-8 transition-opacity duration-500 ${!showAnimation ? 'opacity-30' : 'opacity-100'}`}>

          {/* Floating Bubble Tip for Think step */}
          {showExtended && showAnimation && (
            <div className="absolute top-4 right-4 bg-[#50DCE1] text-black px-3 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce z-10">
              💡 Every cycle starts with Think!
              <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#50DCE1]"></div>
            </div>
          )}

          {/* Central Hub */}
          <div className="absolute inset-16 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center shadow-2xl">
            <div className="text-center">
              <div className="text-4xl mb-2">🔄</div>
              <div className="text-sm font-bold text-white">TDD</div>
              {cycleCount > 0 && showAnimation && (
                <div className="text-xs text-gray-400 mt-1">Cycle {cycleCount}</div>
              )}
            </div>
          </div>

          {/* Dynamic Steps */}
          {currentSteps.map((step, index) => {
            const isActive = index === currentStep && showAnimation;
            const isNext = index === (currentStep + 1) % currentSteps.length;
            const isThinkStep = showExtended && step.isSpecial;

            return (
              <div key={step.id}>

                {/* Step Circle with Embedded Label */}
                <div
                  className={`absolute w-24 h-24 rounded-full border-4 cursor-pointer transition-all duration-700 transform ${
                    isActive
                      ? `bg-gradient-to-br ${step.color} border-white scale-125 shadow-2xl animate-pulse`
                      : `${step.bgColor} border-gray-600 scale-100 opacity-60 hover:opacity-100 hover:scale-110`
                  }`}
                  style={{
                    left: `${step.position.x}%`,
                    top: `${step.position.y}%`,
                    transform: `translate(-50%, -50%) ${isActive ? 'scale(1.25)' : 'scale(1)'}`
                  }}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <span className="text-2xl mb-1">{step.icon}</span>
                    <div className={`text-xs font-bold ${isThinkStep ? 'text-black' : 'text-white'} text-center px-1`}>
                      {step.shortName}
                    </div>
                  </div>

                  {/* Special indicator for Think step */}
                  {isThinkStep && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#50DCE1] to-cyan-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                      💭
                    </div>
                  )}
                </div>

                {/* Outer Position Step Label */}
                <div
                  className={`absolute transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-80 scale-95'
                  }`}
                  style={{
                    left: `${step.labelPosition.x}%`,
                    top: `${step.labelPosition.y}%`,
                    transform: index === 1 ? 'translateY(-50%)' : index === 2 ? 'translate(-100%, -50%)' : 'translate(-50%, -100%)',
                    minWidth: index === 0 ? '160px' : '140px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {/* Elegant Label Card */}
                  <div className={`px-4 py-2 rounded-xl transition-all duration-500 backdrop-blur-sm ${
                    isActive
                      ? `bg-gradient-to-r ${step.color} ${isThinkStep ? 'text-black' : 'text-white'} shadow-xl border border-white/30`
                      : 'bg-gray-800/80 text-gray-300 border border-gray-600/50'
                  }`}>
                    <div className={`text-center ${index === 0 ? 'text-sm' : 'text-xs'} font-semibold`}>
                      {step.name}
                    </div>
                  </div>
                </div>

                {/* Flowing Arrow to Next Step */}
                {isActive && showAnimation && (
                  <div
                    className="absolute animate-bounce"
                    style={{
                      left: `${(step.position.x + currentSteps[(index + 1) % currentSteps.length].position.x) / 2}%`,
                      top: `${(step.position.y + currentSteps[(index + 1) % currentSteps.length].position.y) / 2}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Different arrow directions based on step transition and mode */}
                    <div className="text-2xl font-bold text-black bg-[#50DCE1] rounded w-10 h-10 flex items-center justify-center drop-shadow-lg">
                      {showExtended
                        ? (index === 0 ? '↘' : index === 1 ? '↙' : index === 2 ? '↖' : '↗')
                        : (index === 0 ? '↘' : index === 1 ? '←' : '↗')
                      }
                    </div>
                  </div>
                )}

                {/* Ripple Effect for Active Step */}
                {isActive && showAnimation && (
                  <div
                    className="absolute w-30 h-30 rounded-full border-2 border-white animate-ping opacity-30"
                    style={{
                      left: `${step.position.x}%`,
                      top: `${step.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                )}
              </div>
            );
          })}

        </div>
        </div>

        </div>
      </div>
    </div>
  );
};

export default TDDCycleSlide;