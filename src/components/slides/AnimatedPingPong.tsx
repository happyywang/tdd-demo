import { useState, useEffect, memo, useMemo } from 'react';
import { PingPongPhase } from '../../types';
import { ANIMATIONS, CONTENT, DEMO_CONFIG, COLORS, TYPOGRAPHY, SPACING } from '../../constants';

const AnimatedPingPong = memo(() => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [ballPosition, setBallPosition] = useState({ x: 20, y: 50 });
  const [ballColor, setBallColor] = useState('red');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResult, setShowResult] = useState('❌');
  const [animationCycle, setAnimationCycle] = useState(0);

  const phases: PingPongPhase[] = useMemo(() => [
    { name: 'Red', player: 'A', color: 'red', position: { x: 20, y: 50 }, result: '❌', text: CONTENT.PING_PONG.WRITE_FAILING_TEST },
    { name: 'Green', player: 'B', color: 'green', position: { x: 80, y: 50 }, result: '✅', text: CONTENT.PING_PONG.MAKE_TEST_PASS },
    { name: 'Refactor', player: 'A', color: 'blue', position: { x: 20, y: 50 }, result: '🔧', text: CONTENT.PING_PONG.REFACTOR_CODE },
    { name: 'Red', player: 'B', color: 'red', position: { x: 80, y: 50 }, result: '❌', text: CONTENT.PING_PONG.WRITE_FAILING_TEST },
    { name: 'Green', player: 'A', color: 'green', position: { x: 20, y: 50 }, result: '✅', text: CONTENT.PING_PONG.MAKE_TEST_PASS },
    { name: 'Refactor', player: 'B', color: 'blue', position: { x: 80, y: 50 }, result: '🔧', text: CONTENT.PING_PONG.REFACTOR_CODE },
  ], []);

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

  const currentPhaseData = useMemo(() => phases[currentPhase], [phases, currentPhase]);

  return (
    <div className={`relative w-full h-96 ${COLORS.BACKGROUNDS.SECONDARY} rounded-2xl overflow-hidden`}>
      {/* TDD Phase Indicator at top */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className={`${SPACING.PADDING_X.LG} ${SPACING.PADDING_Y.SM} rounded-full ${COLORS.TEXT.PRIMARY} ${TYPOGRAPHY.WEIGHTS.BOLD} ${TYPOGRAPHY.SIZES.LG} ${
          currentPhaseData.color === 'red' ? COLORS.PHASES.RED :
          currentPhaseData.color === 'green' ? COLORS.PHASES.GREEN : COLORS.PHASES.REFACTOR
        }`}>
          {currentPhaseData.name} Phase
        </div>
      </div>

      {/* Player A */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${TYPOGRAPHY.SIZES['4XL']} ${SPACING.MARGIN_B.SM} ${
          currentPhaseData.player === 'A' ? `${COLORS.PRIMARY[500]} animate-pulse` : COLORS.BACKGROUNDS.SECONDARY
        }`}>
          👨‍💻
        </div>
        <p className={`${COLORS.TEXT.PRIMARY} ${TYPOGRAPHY.SIZES.SM}`}>Player A</p>
      </div>

      {/* Player B */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${TYPOGRAPHY.SIZES['4XL']} ${SPACING.MARGIN_B.SM} ${
          currentPhaseData.player === 'B' ? `${COLORS.ERROR[500]} animate-pulse` : COLORS.BACKGROUNDS.SECONDARY
        }`}>
          👩‍💻
        </div>
        <p className={`${COLORS.TEXT.PRIMARY} ${TYPOGRAPHY.SIZES.SM}`}>Player B</p>
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
          <div className={`${COLORS.BACKGROUNDS.OVERLAY} ${SPACING.PADDING_X.SM} ${SPACING.PADDING_Y.SM} rounded ${COLORS.TEXT.PRIMARY} ${TYPOGRAPHY.SIZES.SM} ${TYPOGRAPHY.WEIGHTS.SEMIBOLD}`}>
            {currentPhaseData.text}
          </div>
        </div>
      </div>

      {/* Final Summary */}
      {animationCycle >= 2 && (
        <div className={`absolute inset-0 ${COLORS.BACKGROUNDS.OVERLAY} flex items-center justify-center`}>
          <div className={`text-center ${COLORS.TEXT.PRIMARY}`}>
            <h3 className={`${TYPOGRAPHY.SIZES['3XL']} ${TYPOGRAPHY.WEIGHTS.BOLD} ${SPACING.MARGIN_B.MD}`}>
              🏓 Ping-pong Programming
            </h3>
            <p className={`${TYPOGRAPHY.SIZES.XL} ${SPACING.MARGIN_B.SM}`}>
              {CONTENT.PING_PONG.FINAL_MESSAGE}
            </p>
            <p className={TYPOGRAPHY.SIZES.LG}>You code, I code, Repeat!</p>
          </div>
        </div>
      )}
    </div>
  );
});

AnimatedPingPong.displayName = 'AnimatedPingPong';

export default AnimatedPingPong;