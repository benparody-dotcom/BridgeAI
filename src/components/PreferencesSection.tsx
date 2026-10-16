import React, { useState } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { GuidanceLevel, InstructionDepth, TextSize } from '../types';
import {
  Settings,
  Volume2,
  Eye,
  Type,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Play,
  Check,
  Briefcase
} from 'lucide-react';

export const PreferencesSection: React.FC = () => {
  const {
    preferences,
    updatePreferences,
    resetPreferences,
    speakText,
    openStuckModal,
    openOnboarding,
  } = usePreferences();

  const [testSpeechNotice, setTestSpeechNotice] = useState(false);

  const handleTestSpeech = () => {
    speakText(
      'Welcome to BridgeAI. Your text-to-speech preferences are working cleanly at your chosen speed.'
    );
    setTestSpeechNotice(true);
    setTimeout(() => setTestSpeechNotice(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-300 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
            <span className="font-extrabold text-teal-900">BridgeAI Inclusivity</span>
            <span aria-hidden="true">·</span>
            <span>Personalized Experience</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 tracking-tight">
            Accessibility & Learning Preferences
          </h1>
          <p className="text-sm font-medium text-slate-700 mt-1">
            We never ask you to disclose a diagnosis. Tell us how you prefer to learn and interact.
          </p>
        </div>

        <button
          onClick={resetPreferences}
          className="px-3.5 py-2 text-xs font-bold text-slate-800 hover:text-slate-950 border-2 border-slate-300 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
          <span>Reset to Defaults</span>
        </button>
      </div>

      {/* Preference Groups */}
      <div className="space-y-6">
        {/* 0. Workplace Role Card */}
        <div className="bg-white rounded-xl border-2 border-slate-300 p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-950">
              <Briefcase className="w-4 h-4 text-teal-800" />
              <span>Workplace Role</span>
            </div>
            <p className="text-sm font-medium text-slate-700">
              Your field of work:
            </p>
            <p className="text-lg font-black text-slate-950">
              {preferences.workRole ? (
                <span className="text-teal-950 bg-teal-100 border border-teal-300 px-3 py-1 rounded-lg inline-block">
                  {preferences.workRole}
                </span>
              ) : (
                <span className="text-slate-500 font-semibold italic">Not selected yet</span>
              )}
            </p>
          </div>

          <button
            onClick={openOnboarding}
            className="text-xs font-extrabold text-teal-900 hover:text-teal-950 hover:underline inline-flex items-center gap-1 bg-teal-50 border-2 border-teal-600 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors shrink-0 shadow-xs"
          >
            <span>Change role</span>
          </button>
        </div>

        {/* 1. Learning Pacing & Guidance Level */}
        <div className="bg-white rounded-xl border-2 border-slate-300 p-6 sm:p-7 space-y-4 shadow-sm">
          <div>
            <h2 className="text-base font-extrabold text-slate-950">Learning Guidance Level</h2>
            <p className="text-xs text-slate-700 font-medium mt-0.5">
              Choose how much step-by-step handholding you want when tackling tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'guided' as GuidanceLevel,
                title: 'Guided',
                desc: 'One bite-sized action at a time with supportive checkpoints and visual cues.',
              },
              {
                id: 'flexible' as GuidanceLevel,
                title: 'Flexible',
                desc: 'High-level milestones with on-demand hints, formula breakdowns, and checklists.',
              },
              {
                id: 'fast-track' as GuidanceLevel,
                title: 'Fast Track',
                desc: 'Immediate formulas, direct answers, and copyable results with minimal text.',
              },
            ].map((lvl) => {
              const active = preferences.guidanceLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => updatePreferences({ guidanceLevel: lvl.id })}
                  className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                    active
                      ? 'border-teal-800 bg-teal-50 ring-2 ring-teal-800 shadow-xs'
                      : 'border-slate-300 hover:border-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-black text-xs text-slate-950 mb-1.5">
                    <span>{lvl.title}</span>
                    {active && <Check className="w-4 h-4 text-teal-800 stroke-[3]" />}
                  </div>
                  <span className="text-xs text-slate-800 leading-relaxed font-medium">
                    {lvl.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Instruction Depth */}
        <div className="bg-white rounded-xl border-2 border-slate-300 p-6 sm:p-7 space-y-4 shadow-sm">
          <div>
            <h2 className="text-base font-extrabold text-slate-950">Instruction Length</h2>
            <p className="text-xs text-slate-700 font-medium mt-0.5">
              Control the density of text across tutorials and AI responses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                id: 'short' as InstructionDepth,
                title: 'Short & Direct',
                desc: 'Bullet points, concise phrases, zero walls of text (ideal for ADHD focus).',
              },
              {
                id: 'detailed' as InstructionDepth,
                title: 'Detailed & Comprehensive',
                desc: 'Includes background context, thorough reasoning, and expanded examples.',
              },
            ].map((d) => {
              const active = preferences.instructionDepth === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => updatePreferences({ instructionDepth: d.id })}
                  className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                    active
                      ? 'border-teal-800 bg-teal-50 ring-2 ring-teal-800 shadow-xs'
                      : 'border-slate-300 hover:border-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-black text-xs text-slate-950 mb-1.5">
                    <span>{d.title}</span>
                    {active && <Check className="w-4 h-4 text-teal-800 stroke-[3]" />}
                  </div>
                  <span className="text-xs text-slate-800 leading-relaxed font-medium">
                    {d.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Visual & Text Sizing Preferences */}
        <div className="bg-white rounded-xl border-2 border-slate-300 p-6 sm:p-7 space-y-5 shadow-sm">
          <div>
            <h2 className="text-base font-extrabold text-slate-950">Visual & Reading Comfort</h2>
            <p className="text-xs text-slate-700 font-medium mt-0.5">
              Adjust typography, contrast, and spacing for visual ease or dyslexia comfort.
            </p>
          </div>

          {/* Text Size */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-900">Text Sizing</label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'standard' as TextSize, label: 'Standard (100%)' },
                { id: 'large' as TextSize, label: 'Large (112%)' },
                { id: 'xl' as TextSize, label: 'Extra Large (125%)' },
              ].map((sz) => (
                <button
                  key={sz.id}
                  onClick={() => updatePreferences({ textSize: sz.id })}
                  className={`p-3 rounded-lg border-2 text-xs font-bold transition-colors ${
                    preferences.textSize === sz.id
                      ? 'border-teal-800 bg-teal-100 text-teal-950 ring-1 ring-teal-800'
                      : 'border-slate-300 hover:border-slate-500 text-slate-800'
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles: High Contrast, Dyslexia Font, Reduced Motion */}
          <div className="divide-y-2 divide-slate-100 pt-2 text-xs">
            {/* High Contrast */}
            <div className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-950 text-sm">High-Contrast Mode</p>
                <p className="text-slate-700 font-medium">
                  Deep dark surfaces with stark white text and distinct borders for WCAG AAA
                  legibility.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.highContrast}
                onChange={(e) => updatePreferences({ highContrast: e.target.checked })}
                className="w-5 h-5 accent-teal-800 rounded cursor-pointer"
                aria-label="Toggle high contrast mode"
              />
            </div>

            {/* Dyslexia Friendly */}
            <div className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-950 text-sm">Dyslexia-Friendly Spacing</p>
                <p className="text-slate-700 font-medium">
                  Increases letter spacing, word spacing, and line height to prevent visual crowding
                  and crowding fatigue.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.dyslexiaFriendly}
                onChange={(e) => updatePreferences({ dyslexiaFriendly: e.target.checked })}
                className="w-5 h-5 accent-teal-800 rounded cursor-pointer"
                aria-label="Toggle dyslexia-friendly spacing"
              />
            </div>

            {/* Reduced Motion */}
            <div className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-950 text-sm">Reduced Motion</p>
                <p className="text-slate-700 font-medium">
                  Disables page transitions and interface animations for vestibular comfort.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.reducedMotion}
                onChange={(e) => updatePreferences({ reducedMotion: e.target.checked })}
                className="w-5 h-5 accent-teal-800 rounded cursor-pointer"
                aria-label="Toggle reduced motion"
              />
            </div>

            {/* Persistent Stuck Button */}
            <div className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-950 text-sm">Persistent "I'm Stuck" Action</p>
                <p className="text-slate-700 font-medium">
                  Keeps the one-click help button immediately visible in the top navigation and
                  corner at all times.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.persistentStuckButton}
                onChange={(e) => updatePreferences({ persistentStuckButton: e.target.checked })}
                className="w-5 h-5 accent-teal-800 rounded cursor-pointer"
                aria-label="Toggle persistent stuck button"
              />
            </div>
          </div>
        </div>

        {/* 4. Speech Narration & Read-Aloud */}
        <div className="bg-white rounded-xl border-2 border-slate-300 p-6 sm:p-7 space-y-4 shadow-sm">
          <div>
            <h2 className="text-base font-extrabold text-slate-950">
              Read-Aloud & Audio Narration
            </h2>
            <p className="text-xs text-slate-700 font-medium mt-0.5">
              Listen to step-by-step instructions, definitions, and AI briefings with text-to-speech.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Speech Rate</span>
              <span className="text-teal-950 bg-teal-100 border border-teal-300 px-2 py-0.5 rounded font-black">
                {preferences.speechRate}x speed
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {[0.8, 0.9, 1.0, 1.2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => updatePreferences({ speechRate: rate })}
                  className={`p-2.5 rounded-lg border-2 text-xs font-bold transition-colors ${
                    preferences.speechRate === rate
                      ? 'border-teal-800 bg-teal-100 text-teal-950 ring-1 ring-teal-800'
                      : 'border-slate-300 hover:border-slate-500 text-slate-800'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleTestSpeech}
                className="px-4 py-2.5 bg-slate-950 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors inline-flex items-center gap-2 border border-slate-950 shadow-xs"
              >
                <Volume2 className="w-3.5 h-3.5 text-teal-300" />
                <span>Test speech audio</span>
              </button>
              {testSpeechNotice && (
                <span className="text-xs text-teal-950 font-bold bg-teal-100 border border-teal-300 px-2.5 py-1 rounded">
                  Playing audio sample...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
