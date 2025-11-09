import { useState, useEffect, memo, useMemo } from 'react';
import { PingPongPhase } from '../../types';
import { ANIMATIONS, CONTENT } from '../../constants';

const AnimatedPingPong = memo(() => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const phases: PingPongPhase[] = useMemo(() => [
    // Cycle 1: Developer A writes test, Developer B implements
    {
      name: 'Think',
      color: 'cyan',
      result: '🧠',
      playerA: {
        role: 'collaborating',
        text: CONTENT.PING_PONG.THINK_LEAD
      },
      playerB: {
        role: 'collaborating',
        text: CONTENT.PING_PONG.THINK_CHALLENGE
      },
      notes: 'Both agree on one clear example'
    },
    {
      name: 'Red (Test)',
      color: 'red',
      result: '❌',
      playerA: {
        role: 'active',
        text: CONTENT.PING_PONG.WRITE_FAILING_TEST
      },
      playerB: {
        role: 'observing',
        text: CONTENT.PING_PONG.OBSERVES
      },
      notes: 'Defines desired behavior (spec)'
    },
    {
      name: 'Green (Code)',
      color: 'green',
      result: '✅',
      playerA: {
        role: 'observing',
        text: CONTENT.PING_PONG.WATCHES
      },
      playerB: {
        role: 'active',
        text: CONTENT.PING_PONG.MAKE_TEST_PASS
      },
      notes: 'Ensures test passes quickly'
    },
    {
      name: 'Refactor',
      color: 'blue',
      result: '🔧',
      playerA: {
        role: 'collaborating',
        text: CONTENT.PING_PONG.GIVES_FEEDBACK
      },
      playerB: {
        role: 'collaborating',
        text: CONTENT.PING_PONG.REFACTOR_CODE
      },
      notes: CONTENT.PING_PONG.DISCUSS
    },
    {
      name: 'Switch Roles',
      color: 'purple',
      result: '🔄',
      playerA: {
        role: 'collaborating',
        text: 'Next implementer'
      },
      playerB: {
        role: 'collaborating',
        text: 'Next test writer'
      },
      notes: CONTENT.PING_PONG.SWITCH_ROLES
    },
    // Cycle 2: Developer B writes test, Developer A implements
    {
      name: 'Think',
      color: 'cyan',
      result: '🧠',
      playerA: {
        role: 'collaborating',
        text: CONTENT.PING_PONG.THINK_CHALLENGE
      },
      playerB: {
        role: 'collaborating',
        text: CONTENT.PING_PONG.THINK_LEAD
      },
      notes: 'Both agree on one clear example'
    },
    {
      name: 'Red (Test)',
      color: 'red',
      result: '❌',
      playerA: {
        role: 'observing',
        text: CONTENT.PING_PONG.OBSERVES
      },
      playerB: {
        role: 'active',
        text: CONTENT.PING_PONG.WRITE_FAILING_TEST
      },
      notes: 'Defines desired behavior (spec)'
    },
    {
      name: 'Green (Code)',
      color: 'green',
      result: '✅',
      playerA: {
        role: 'active',
        text: CONTENT.PING_PONG.MAKE_TEST_PASS
      },
      playerB: {
        role: 'observing',
        text: CONTENT.PING_PONG.WATCHES
      },
      notes: 'Ensures test passes quickly'
    },
    {
      name: 'Refactor',
      color: 'blue',
      result: '🔧',
      playerA: {
        role: 'collaborating',
        text: CONTENT.PING_PONG.REFACTOR_CODE
      },
      playerB: {
        role: 'collaborating',
        text: CONTENT.PING_PONG.GIVES_FEEDBACK
      },
      notes: CONTENT.PING_PONG.DISCUSS
    },
    {
      name: 'Switch Roles',
      color: 'purple',
      result: '🔄',
      playerA: {
        role: 'collaborating',
        text: 'Next test writer'
      },
      playerB: {
        role: 'collaborating',
        text: 'Next implementer'
      },
      notes: CONTENT.PING_PONG.SWITCH_ROLES
    },
  ], []);

  const revealAnimation = () => {
    setShowAnimation(true);
  };

  const nextPhase = () => {
    const next = (currentPhase + 1) % phases.length;
    setCurrentPhase(next);

    // Check if we completed a full cycle (10 phases = 2 complete ping-pong cycles)
    if (next === 0) {
      setCycleCount(prev => prev + 1);
    }
  };

  const prevPhase = () => {
    const prev = (currentPhase - 1 + phases.length) % phases.length;
    setCurrentPhase(prev);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(prev => !prev);
  };

  useEffect(() => {
    if (!showAnimation || !isAutoPlay) return;

    const interval = setInterval(() => {
      const next = (currentPhase + 1) % phases.length;
      setCurrentPhase(next);

      // Check if we completed a full cycle (10 phases = 2 complete ping-pong cycles)
      if (next === 0) {
        setCycleCount(prev => prev + 1);
        if (cycleCount >= 1) { // Show 2 complete cycles
          clearInterval(interval);
          setIsAutoPlay(false);
        }
      }
    }, ANIMATIONS.PING_PONG_INTERVAL);

    return () => clearInterval(interval);
  }, [currentPhase, cycleCount, showAnimation, isAutoPlay, phases.length]);

  const currentPhaseData = useMemo(() => phases[currentPhase], [phases, currentPhase]);

  const getPhaseColor = (color: string) => {
    switch (color) {
      case 'red':
        return { bg: 'bg-red-500', border: 'border-red-400', text: 'text-white', glow: 'shadow-red-500/50' };
      case 'green':
        return { bg: 'bg-green-500', border: 'border-green-400', text: 'text-white', glow: 'shadow-green-500/50' };
      case 'blue':
        return { bg: 'bg-blue-500', border: 'border-blue-400', text: 'text-white', glow: 'shadow-blue-500/50' };
      case 'cyan':
        return { bg: 'bg-[#50DCE1]', border: 'border-cyan-400', text: 'text-black', glow: 'shadow-cyan-500/50' };
      case 'purple':
        return { bg: 'bg-purple-500', border: 'border-purple-400', text: 'text-white', glow: 'shadow-purple-500/50' };
      default:
        return { bg: 'bg-gray-500', border: 'border-gray-400', text: 'text-white', glow: 'shadow-gray-500/50' };
    }
  };

  const phaseColors = getPhaseColor(currentPhaseData.color);

  return (
    <div className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg overflow-hidden border border-gray-700">
      {/* Click overlay when animation is hidden */}
      {!showAnimation && (
        <div
          className="absolute inset-0 flex items-center justify-center z-30 cursor-pointer bg-gray-900/70 backdrop-blur-sm"
          onClick={revealAnimation}
        >
          <div className="text-center px-5 py-3 bg-black/80 rounded-lg border border-[#50DCE1]/50 hover:border-[#50DCE1] transition-all">
            <div className="text-2xl mb-1 animate-bounce">👆</div>
            <div className="text-sm text-[#50DCE1] font-semibold">Click to start demo</div>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Main Stage - Developers Fixed Position */}
        <div className="relative h-64 mb-4">
          {/* Phase Title - Moves to active developer */}
          <div className={`absolute top-0 transition-all duration-[2500ms] ease-in-out ${
            currentPhaseData.playerA.role === 'active'
              ? 'left-[25%] -translate-x-1/2'
              : currentPhaseData.playerB.role === 'active'
              ? 'left-[75%] -translate-x-1/2'
              : 'left-1/2 -translate-x-1/2'
          }`}>
            <div className={`inline-block px-6 py-2 rounded-full ${phaseColors.bg} ${phaseColors.text} font-bold text-lg shadow-lg ${phaseColors.glow}`}>
              {currentPhaseData.result} {currentPhaseData.name}
            </div>
          </div>

          {/* Developer A - Fixed at 25% */}
          <div className="absolute left-[25%] -translate-x-1/2 top-24 flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 transition-all duration-500 ${
              currentPhaseData.playerA.role === 'active'
                ? 'bg-cyan-500 ring-4 ring-cyan-300 scale-125 animate-pulse'
                : currentPhaseData.playerA.role === 'observing'
                ? 'bg-gray-700 opacity-40 scale-90'
                : 'bg-cyan-500 ring-2 ring-cyan-300 scale-105'
            }`}>
              👨‍💻
            </div>
            <div className="text-white font-semibold text-sm mb-3">Developer A</div>
            <div className={`text-center text-xs px-2 py-1 rounded whitespace-nowrap ${
              currentPhaseData.playerA.role === 'active'
                ? 'bg-cyan-900/70 text-cyan-200 font-bold'
                : currentPhaseData.playerA.role === 'observing'
                ? 'bg-gray-800/50 text-gray-400'
                : 'bg-cyan-900/50 text-cyan-200'
            }`}>
              {currentPhaseData.playerA.text}
            </div>
          </div>

          {/* Developer B - Fixed at 75% */}
          <div className="absolute left-[75%] -translate-x-1/2 top-24 flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 transition-all duration-500 ${
              currentPhaseData.playerB.role === 'active'
                ? 'bg-cyan-500 ring-4 ring-cyan-300 scale-125 animate-pulse'
                : currentPhaseData.playerB.role === 'observing'
                ? 'bg-gray-700 opacity-40 scale-90'
                : 'bg-cyan-500 ring-2 ring-cyan-300 scale-105'
            }`}>
              👩‍💻
            </div>
            <div className="text-white font-semibold text-sm mb-3">Developer B</div>
            <div className={`text-center text-xs px-2 py-1 rounded whitespace-nowrap ${
              currentPhaseData.playerB.role === 'active'
                ? 'bg-cyan-900/70 text-cyan-200 font-bold'
                : currentPhaseData.playerB.role === 'observing'
                ? 'bg-gray-800/50 text-gray-400'
                : 'bg-cyan-900/50 text-cyan-200'
            }`}>
              {currentPhaseData.playerB.text}
            </div>
          </div>
        </div>

        {/* Manual Controls */}
        {showAnimation && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevPhase}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              title="Previous phase"
            >
              <span>←</span>
              <span>Previous</span>
            </button>

            <button
              onClick={toggleAutoPlay}
              className={`${
                isAutoPlay
                  ? 'bg-yellow-600 hover:bg-yellow-500'
                  : 'bg-[#50DCE1] hover:bg-cyan-400'
              } text-black px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2`}
              title={isAutoPlay ? 'Pause auto-play' : 'Start auto-play'}
            >
              <span className="text-xl">{isAutoPlay ? '⏸' : '▶'}</span>
              <span>{isAutoPlay ? 'Pause' : 'Auto Play'}</span>
            </button>

            <button
              onClick={nextPhase}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              title="Next phase"
            >
              <span>Next</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

AnimatedPingPong.displayName = 'AnimatedPingPong';

export default AnimatedPingPong;
