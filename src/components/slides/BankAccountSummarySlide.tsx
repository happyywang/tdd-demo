import { memo } from 'react';

const BankAccountSummarySlide = memo(() => {
  return (
    <div className="min-h-screen bg-gray-900 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent">
            Bank Account Demo Summary
          </h1>
          <p className="text-xl text-gray-300">
            Building a Bank Account System using Test-Driven Development
          </p>
        </div>

        {/* TDD Loop Section */}
        <div className="bg-slate-800 border border-cyan-400/30 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
            The TDD Loop
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Think */}
            <div className="bg-purple-900/30 border border-purple-400/50 rounded-lg p-6">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="text-xl font-bold text-purple-400 mb-3">Think</h3>
              <p className="text-gray-300 text-sm mb-2">What's the next behavior?</p>
              <p className="text-cyan-400 text-sm">→ Focus on behavior, not structure</p>
            </div>

            {/* Red */}
            <div className="bg-red-900/30 border border-red-400/50 rounded-lg p-6">
              <div className="text-4xl mb-3">🔴</div>
              <h3 className="text-xl font-bold text-red-400 mb-3">Red</h3>
              <p className="text-gray-300 text-sm mb-2">Write a failing test</p>
              <p className="text-cyan-400 text-sm">→ Specify intent clearly</p>
            </div>

            {/* Green */}
            <div className="bg-green-900/30 border border-green-400/50 rounded-lg p-6">
              <div className="text-4xl mb-3">🟢</div>
              <h3 className="text-xl font-bold text-green-400 mb-3">Green</h3>
              <p className="text-gray-300 text-sm mb-2">Write minimal code to pass</p>
              <p className="text-cyan-400 text-sm">→ Deliver working code fast</p>
            </div>

            {/* Refactor */}
            <div className="bg-blue-900/30 border border-blue-400/50 rounded-lg p-6">
              <div className="text-4xl mb-3">🔵</div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">Refactor</h3>
              <p className="text-gray-300 text-sm mb-2">Improve design</p>
              <p className="text-cyan-400 text-sm">→ Cleaner, more extensible code</p>
            </div>
          </div>
        </div>

        {/* Journey Summary Section */}
        <div className="bg-slate-800 border border-cyan-400/30 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
            Journey Summary
          </h2>

          <div className="space-y-4">
            {/* Steps 1-4 */}
            <div className="bg-slate-700 border border-purple-400/30 rounded-lg p-6 flex items-center gap-6">
              <div className="text-2xl font-bold text-purple-400 min-w-[120px]">
                Steps 1-4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Deposit</h3>
                <p className="text-cyan-400">💡 Start small, simplest test</p>
              </div>
            </div>

            {/* Steps 5-8 */}
            <div className="bg-slate-700 border border-green-400/30 rounded-lg p-6 flex items-center gap-6">
              <div className="text-2xl font-bold text-green-400 min-w-[120px]">
                Steps 5-8
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Withdraw</h3>
                <p className="text-cyan-400">💡 Add validation early</p>
              </div>
            </div>

            {/* Steps 9-12 */}
            <div className="bg-slate-700 border border-blue-400/30 rounded-lg p-6 flex items-center gap-6">
              <div className="text-2xl font-bold text-blue-400 min-w-[120px]">
                Steps 9-12
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Overdraw Rule</h3>
                <p className="text-cyan-400">💡 Express business rules in tests</p>
              </div>
            </div>

            {/* Steps 13-16 */}
            <div className="bg-slate-700 border border-yellow-400/30 rounded-lg p-6 flex items-center gap-6">
              <div className="text-2xl font-bold text-yellow-400 min-w-[120px]">
                Steps 13-16
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Transfer + Fee</h3>
                <p className="text-cyan-400">💡 Design emerges via dependency injection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

BankAccountSummarySlide.displayName = 'BankAccountSummarySlide';

export default BankAccountSummarySlide;
