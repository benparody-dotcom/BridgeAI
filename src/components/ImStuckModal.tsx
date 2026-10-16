import React, { useState } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { X, Volume2, ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { StuckModeOption } from '../types';
import { BridgitAvatar } from './BridgitAvatar';

const STUCK_OPTIONS: StuckModeOption[] = [
  {
    id: 'explain_differently',
    label: 'Explain it differently',
    description: 'Uses an everyday analogy (cooking, organizing, receipt) without any technical jargon.',
  },
  {
    id: 'show_what_to_click',
    label: 'Show me what to click',
    description: 'An exact, visual mouse-navigation trail through menus and ribbons.',
  },
  {
    id: 'break_steps',
    label: 'Break it into smaller steps',
    description: 'Splits the current task into 3 microscopic, easy 10-second actions.',
  },
  {
    id: 'show_answer',
    label: 'Show me the answer',
    description: 'Gives the exact formula or text directly with a clear note on where to put it.',
  },
  {
    id: 'give_example',
    label: 'Give me an example',
    description: 'Shows a 3-row workplace before-and-after example with realistic numbers.',
  },
];

export const ImStuckModal: React.FC = () => {
  const { isStuckModalOpen, closeStuckModal, stuckContextText, speakText } = usePreferences();
  const [selectedMode, setSelectedMode] = useState<StuckModeOption['id']>('explain_differently');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  if (!isStuckModalOpen) return null;

  const handleRequestHelp = async (modeId: StuckModeOption['id']) => {
    setSelectedMode(modeId);
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/companion/stuck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: modeId,
          currentTask: stuckContextText || 'I am learning workplace digital skills and need guidance.',
          stepDetails: 'Working on step-by-step guidance.',
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch help');
      const data = await res.json();
      setResult(data.guidance || 'Here is the help for this step.');
    } catch (err) {
      // Fallback
      const fallbacks: Record<string, string> = {
        explain_differently: "Think of an Excel formula like a helpful kitchen assistant: instead of you adding up numbers by hand, you give them a rule: 'Whenever I hand you price and quantity, multiply them.' The sheet does the heavy lifting.",
        show_what_to_click: "1. Look at the top ribbon.\n2. Click the 'Formulas' tab.\n3. Click the Greek 'Σ AutoSum' button on the left.\n4. Press Enter on your keyboard.",
        break_steps: "Step A: Click cell E2 so it has a dark border.\nStep B: Type an equals sign: =\nStep C: Click cell C2, type an asterisk *, and click cell D2.",
        show_answer: "Paste this directly into your formula bar: =C2*D2 and press Enter.",
        give_example: "If Row 2 has 5 shirts at $20 each, =C2*D2 yields $100. If Row 3 has 2 shirts at $20, it yields $40."
      };
      setResult(fallbacks[modeId] || fallbacks.explain_differently);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stuck-title"
    >
      <div className="bg-white rounded-xl shadow-2xl border-2 border-slate-300 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header with Bridgit */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-slate-200 bg-teal-50">
          <div className="flex items-center gap-3.5">
            <BridgitAvatar size="md" showStatus />
            <div>
              <h2 id="stuck-title" className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
                <span>I'm Stuck — Bridgit is here to help!</span>
              </h2>
              <p className="text-xs font-semibold text-slate-700">
                Take a breath! Choose how you'd like me to explain this step.
              </p>
            </div>
          </div>
          <button
            onClick={closeStuckModal}
            className="p-1.5 text-slate-600 hover:text-slate-950 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Close help modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {stuckContextText && (
            <div className="text-xs text-slate-800 bg-slate-100 border-2 border-slate-300 rounded-lg p-3 font-medium">
              <span className="font-extrabold text-slate-950">Current context:</span> {stuckContextText}
            </div>
          )}

          {/* 5 Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STUCK_OPTIONS.map((opt) => {
              const isCurrent = selectedMode === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleRequestHelp(opt.id)}
                  className={`text-left p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'border-teal-800 bg-teal-100 ring-2 ring-teal-800 text-teal-950'
                      : 'border-slate-300 hover:border-slate-500 hover:bg-slate-50 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-extrabold text-slate-950">{opt.label}</span>
                    {isCurrent && <CheckCircle2 className="w-4 h-4 text-teal-800 shrink-0" />}
                  </div>
                  <span className="text-xs text-slate-700 font-medium line-clamp-2">
                    {opt.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result Area */}
          {loading && (
            <div className="p-6 rounded-lg bg-slate-100 border-2 border-slate-300 flex items-center justify-center gap-3 text-sm text-slate-800 font-bold">
              <Loader2 className="w-5 h-5 animate-spin text-teal-800" />
              <span>Preparing a calm, tailored explanation...</span>
            </div>
          )}

          {result && !loading && (
            <div className="p-5 rounded-xl bg-slate-50 border-2 border-teal-700 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2">
                <span className="text-xs font-black text-teal-950 uppercase tracking-wider">
                  Tailored Assistance
                </span>
                <button
                  onClick={() => speakText(result)}
                  className="inline-flex items-center gap-1.5 text-xs text-teal-950 font-bold px-2.5 py-1 rounded-md border border-teal-300 bg-teal-100 hover:bg-teal-200 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Read aloud</span>
                </button>
              </div>
              <div className="text-sm text-slate-950 leading-relaxed whitespace-pre-line font-medium">
                {result}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t-2 border-slate-200 flex items-center justify-between text-xs text-slate-700 font-medium">
          <span>Remember: Every data specialist once asked these exact same questions.</span>
          <button
            onClick={closeStuckModal}
            className="px-4 py-2 bg-slate-950 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors border border-slate-950"
          >
            Got it, take me back
          </button>
        </div>
      </div>
    </div>
  );
};
