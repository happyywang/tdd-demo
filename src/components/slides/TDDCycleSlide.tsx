import { useState, useEffect, useRef } from 'react';

const TDDCycleSlide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);
  const prevStepRef = useRef(0);

  const steps = [
    {
      id: 'red',
      name: 'Write Failing Test',
      shortName: 'Red',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500',
      icon: '🔴',
      position: { x: 50, y: 15 }, // Top - 12 o'clock
      labelPosition: { x: 25, y: 2 }, // Further left and slightly down
      sound: 'error'
    },
    {
      id: 'green',
      name: 'Make Test Pass',
      shortName: 'Green',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500',
      icon: '🟢',
      position: { x: 85, y: 50 }, // Right - 3 o'clock
      labelPosition: { x: 105, y: 50 }, // To the right of the circle
      sound: 'success'
    },
    {
      id: 'refactor',
      name: 'Improve Code',
      shortName: 'Refactor',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500',
      icon: '🔵',
      position: { x: 15, y: 50 }, // Left - 9 o'clock
      labelPosition: { x: -5, y: 50 }, // To the left of the circle
      sound: 'refactor'
    }
  ];

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
        const nextStep = (prev + 1) % steps.length;

        // Track previous step and increment cycle count only when going from 2 to 0
        if (prevStepRef.current === 2 && nextStep === 0) {
          setCycleCount(count => count + 1);
        }

        prevStepRef.current = nextStep;

        // Play sound for new step
        playSound(steps[nextStep].sound);

        return nextStep;
      });
    }, 2000); // Faster animation - 2 seconds per step

    return () => clearInterval(interval);
  }, [isAnimating, steps.length]);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setIsAnimating(false);
  };

  return (
    <div className="min-h-full flex flex-col bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 text-white">What is TDD?</h1>
        <p className="text-xl text-gray-300">Test-Driven Development</p>
        <p className="text-lg text-gray-400 mt-2">A development methodology where tests drive the design of production code</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto">

        {/* Main Animation Area - Expanded for outer labels */}
        <div className="flex justify-center">
          <div className="relative w-[500px] h-[500px] mb-8">

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
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isNext = index === (currentStep + 1) % steps.length;

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
                    <div className="text-xs font-bold text-white text-center px-1">
                      {step.shortName}
                    </div>
                  </div>
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
                      left: `${(step.position.x + steps[(index + 1) % steps.length].position.x) / 2}%`,
                      top: `${(step.position.y + steps[(index + 1) % steps.length].position.y) / 2}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Different arrow directions based on step transition */}
                    <div className="text-3xl text-yellow-400 drop-shadow-lg">
                      {index === 0 ? '↘️' : index === 1 ? '↙️' : '↗️'}
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

          {/* Progress Ring */}
          <div className="absolute inset-0 w-[500px] h-[500px]">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="rgba(75, 85, 99, 0.2)"
                strokeWidth="1"
              />
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray={`${((currentStep + 1) + cycleCount * steps.length) * (295 / steps.length)} 295`}
                className="transition-all duration-1000 ease-in-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        </div>

        </div>
      </div>
    </div>
  );
};

export default TDDCycleSlide;