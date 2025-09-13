import { useState, useEffect, useRef } from 'react';

const TDDCycleSlide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);
  const [showExtended, setShowExtended] = useState(false);
  const prevStepRef = useRef(0);

  // Traditional 3-step cycle
  const traditionalSteps = [
    {
      id: 'red',
      name: 'Write Failing Test',
      shortName: 'Red',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500',
      icon: '🔴',
      position: { x: 50, y: 15 }, // Top - 12 o'clock
      labelPosition: { x: 25, y: 2 }, // Left and up
      sound: 'error'
    },
    {
      id: 'green',
      name: 'Make Test Pass',
      shortName: 'Green',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500',
      icon: '🟢',
      position: { x: 87, y: 55 }, // Right - moved slightly right
      labelPosition: { x: 107, y: 55 }, // To the right
      sound: 'success'
    },
    {
      id: 'refactor',
      name: 'Improve Code',
      shortName: 'Refactor',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500',
      icon: '🔵',
      position: { x: 13, y: 55 }, // Left - moved slightly left
      labelPosition: { x: -7, y: 55 }, // To the left
      sound: 'refactor'
    }
  ];

  // Extended 4-step TRGR cycle - circular layout with all steps on the ring
  const extendedSteps = [
    {
      id: 'think',
      name: 'Think: Break Down Goals, Focus Intent',
      shortName: 'Think',
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'bg-yellow-500',
      icon: '🧠',
      position: { x: 50, y: 15 }, // Top - 12 o'clock
      labelPosition: { x: 50, y: 2 },
      sound: 'think',
      isSpecial: true
    },
    {
      id: 'red',
      name: 'Write Failing Test',
      shortName: 'Red',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500',
      icon: '🔴',
      position: { x: 86, y: 50 }, // Right - moved right
      labelPosition: { x: 106, y: 50 },
      sound: 'error'
    },
    {
      id: 'green',
      name: 'Make Test Pass',
      shortName: 'Green',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500',
      icon: '🟢',
      position: { x: 50, y: 88 }, // Bottom - moved further down
      labelPosition: { x: 50, y: 105 },
      sound: 'success'
    },
    {
      id: 'refactor',
      name: 'Refactor & Optimize',
      shortName: 'Refactor',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500',
      icon: '🔵',
      position: { x: 14, y: 50 }, // Left - moved left
      labelPosition: { x: -16, y: 50 },
      sound: 'refactor'
    }
  ];

  const currentSteps = showExtended ? extendedSteps : traditionalSteps;

  // Sound effects (web audio API)
  const playSound = (type: string) => {
    if (!isAnimating) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for different phases
      switch (type) {
        case 'think':
          oscillator.frequency.value = 300; // Medium-low pitch for Think
          break;
        case 'error':
          oscillator.frequency.value = 200; // Lower pitch for Red
          break;
        case 'success':
          oscillator.frequency.value = 800; // Higher pitch for Green
          break;
        case 'refactor':
          oscillator.frequency.value = 400; // Medium pitch for Refactor
          break;
      }

      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Silently handle audio context errors
    }
  };

  // Auto-advance animation with cycle counting
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = (prev + 1) % currentSteps.length;

        // Track previous step and increment cycle count when completing full cycle
        const lastStepIndex = currentSteps.length - 1;
        if (prevStepRef.current === lastStepIndex && nextStep === 0) {
          setCycleCount(count => count + 1);
        }

        prevStepRef.current = nextStep;

        // Play sound for new step
        playSound(currentSteps[nextStep].sound);

        return nextStep;
      });
    }, 2000); // Faster animation - 2 seconds per step

    return () => clearInterval(interval);
  }, [isAnimating, currentSteps.length]);

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

  return (
    <div className="min-h-full flex flex-col bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 text-white">What is TDD?</h1>
        <p className="text-xl text-gray-300">Test-Driven Development</p>
        <p className="text-lg text-gray-400 mt-2">A development methodology where tests drive the design of production code</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto relative">

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
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm transition-colors border border-gray-600 text-right"
          >
            {showExtended ? '3-Step' : '4-Step TRGR'}
          </button>
        </div>

        {/* Main Animation Area - Expanded for outer labels */}
        <div className="flex justify-center">
          <div className="relative w-[500px] h-[500px] mb-8">

          {/* Floating Bubble Tip for Think step */}
          {showExtended && (
            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce z-10">
              💡 Every cycle starts with Think!
              <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-400"></div>
            </div>
          )}

          {/* Central Hub */}
          <div className="absolute inset-16 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center shadow-2xl">
            <div className="text-center">
              <div className="text-4xl mb-2">🔄</div>
              <div className="text-sm font-bold text-white">TDD</div>
              {cycleCount > 0 && (
                <div className="text-xs text-gray-400 mt-1">Cycle {cycleCount}</div>
              )}
            </div>
          </div>

          {/* Dynamic Steps */}
          {currentSteps.map((step, index) => {
            const isActive = index === currentStep;
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
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
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
                      ? `bg-gradient-to-r ${step.color} text-white shadow-xl border border-white/30`
                      : 'bg-gray-800/80 text-gray-300 border border-gray-600/50'
                  }`}>
                    <div className={`text-center ${index === 0 ? 'text-sm' : 'text-xs'} font-semibold`}>
                      {step.name}
                    </div>
                  </div>
                </div>

                {/* Flowing Arrow to Next Step */}
                {isActive && (
                  <div
                    className="absolute animate-bounce"
                    style={{
                      left: `${(step.position.x + currentSteps[(index + 1) % currentSteps.length].position.x) / 2}%`,
                      top: `${(step.position.y + currentSteps[(index + 1) % currentSteps.length].position.y) / 2}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Different arrow directions based on step transition and mode */}
                    <div className="text-2xl font-bold text-white bg-blue-500 rounded w-10 h-10 flex items-center justify-center drop-shadow-lg">
                      {showExtended
                        ? (index === 0 ? '↘' : index === 1 ? '↙' : index === 2 ? '↖' : '↗')
                        : (index === 0 ? '↘' : index === 1 ? '←' : '↗')
                      }
                    </div>
                  </div>
                )}

                {/* Ripple Effect for Active Step */}
                {isActive && (
                  <div
                    className="absolute w-24 h-24 rounded-full border-2 border-white animate-ping opacity-30"
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