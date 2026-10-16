import React, { useState, useEffect } from 'react';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { LearningModule, ActiveSection } from '../types';
import { usePreferences } from '../context/PreferencesContext';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  Volume2,
  ArrowRight,
  SkipForward,
  Award
} from 'lucide-react';

interface LearningPathsSectionProps {
  setActiveSection: (section: ActiveSection) => void;
  onOpenCompanionWithPrompt: (promptText: string) => void;
}

export const LearningPathsSection: React.FC<LearningPathsSectionProps> = ({
  setActiveSection,
  onOpenCompanionWithPrompt,
}) => {
  const { speakText, openStuckModal } = usePreferences();

  // Completed modules tracking with localStorage
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bridgeai_completed_modules');
      return saved ? JSON.parse(saved) : ['shared-principles'];
    } catch {
      return ['shared-principles'];
    }
  });

  const [activeModuleId, setActiveModuleId] = useState<string>('prompt-engineering');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('bridgeai_completed_modules', JSON.stringify(completedModuleIds));
    } catch {
      // ignore
    }
  }, [completedModuleIds]);

  const activeModule =
    CURRICULUM_MODULES.find((m) => m.id === activeModuleId) || CURRICULUM_MODULES[0];

  const categories = [
    'All',
    'AI Skills',
    'Spreadsheets',
    'Design & Visualisation',
    'BI Platforms',
    'Databases & Code',
    'Foundations',
  ];

  const filteredModules =
    selectedCategory === 'All'
      ? CURRICULUM_MODULES
      : CURRICULUM_MODULES.filter((m) => m.category === selectedCategory);

  const toggleModuleComplete = (id: string) => {
    setCompletedModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const handleTestOut = (id: string) => {
    if (!completedModuleIds.includes(id)) {
      setCompletedModuleIds((prev) => [...prev, id]);
    }
    const currentIndex = CURRICULUM_MODULES.findIndex((m) => m.id === id);
    if (currentIndex < CURRICULUM_MODULES.length - 1) {
      setActiveModuleId(CURRICULUM_MODULES[currentIndex + 1].id);
      setQuizSelectedOption(null);
      setQuizSubmitted(false);
    }
  };

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-slate-300 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
            <span className="font-extrabold text-teal-900">BridgeAI Curriculum</span>
            <span aria-hidden="true">·</span>
            <span>Practical Workplace Learning Paths</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 tracking-tight">
            Workplace Digital Skills Curriculum
          </h1>
          <p className="text-sm font-medium text-slate-700 mt-1">
            Master the shared principles first. Learn how tools connect without memorising
            unnecessary software trivia.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right text-xs bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg">
            <span className="text-slate-700 font-semibold">Progress:</span>{' '}
            <strong className="text-teal-950 font-black">
              {completedModuleIds.length} of {CURRICULUM_MODULES.length} modules
            </strong>
          </div>
          <button
            onClick={() =>
              openStuckModal(
                `I am studying the module: "${activeModule.title}" and would like assistance understanding this topic.`
              )
            }
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 border border-teal-900 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-teal-200" />
            <span>I'm Stuck</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3.5 py-2 rounded-lg font-bold whitespace-nowrap transition-colors border-2 ${
              selectedCategory === c
                ? 'bg-slate-950 text-white border-slate-950'
                : 'bg-white text-slate-800 border-slate-300 hover:border-slate-500 hover:bg-slate-100'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Main Grid: Left module list, Right active module reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Module Sidebar List */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-slate-800 block px-1">
            Curriculum Modules ({filteredModules.length})
          </span>
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredModules.map((m) => {
              const isSelected = activeModuleId === m.id;
              const isCompleted = completedModuleIds.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectModule(m.id)}
                  className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-teal-800 bg-teal-50 ring-2 ring-teal-800 shadow-sm'
                      : 'border-slate-300 hover:border-slate-500 bg-white'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleModuleComplete(m.id);
                    }}
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border-2 transition-colors ${
                      isCompleted
                        ? 'bg-teal-800 border-teal-800 text-white'
                        : 'border-slate-400 hover:border-slate-600 bg-white'
                    }`}
                    title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
                    aria-label={`Mark ${m.title} complete`}
                  >
                    {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-slate-600">
                      <span className="truncate">{m.category}</span>
                      <span className="shrink-0">{m.estimatedMinutes}m</span>
                    </div>
                    <p
                      className={`text-xs font-extrabold leading-snug line-clamp-2 ${
                        isSelected ? 'text-teal-950' : 'text-slate-950'
                      }`}
                    >
                      {m.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Module Detail Reader */}
        <div className="lg:col-span-8 bg-white rounded-xl border-2 border-slate-300 p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Module Title & Metadata */}
          <div className="space-y-3 border-b-2 border-slate-200 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="text-teal-900 font-extrabold">{activeModule.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeModule.level}</span>
                <span aria-hidden="true">·</span>
                <span>{activeModule.estimatedMinutes} min read</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    speakText(
                      `${activeModule.title}. Workplace scenario: ${activeModule.workplaceScenario}. Key takeaway: ${activeModule.keyTakeaway}`
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-900 hover:text-teal-950 px-2.5 py-1 rounded-md border border-teal-300 bg-teal-50 hover:bg-teal-100"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Read aloud</span>
                </button>

                <button
                  onClick={() => handleTestOut(activeModule.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-slate-950 border-2 border-slate-300 px-2.5 py-1 rounded-md hover:bg-slate-100"
                  title="Already know this? Test out and mark complete"
                >
                  <SkipForward className="w-3.5 h-3.5 text-slate-700" />
                  <span>Test out of topic</span>
                </button>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold font-display text-slate-950">
              {activeModule.title}
            </h2>

            {/* Workplace Scenario Box */}
            <div className="p-4 rounded-xl bg-teal-50 border-2 border-teal-600 space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-teal-950">
                Workplace Scenario:
              </span>
              <p className="text-sm text-slate-950 leading-relaxed font-semibold">
                "{activeModule.workplaceScenario}"
              </p>
            </div>
          </div>

          {/* Core Concepts */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Core Concepts to Understand
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeModule.coreConcepts.map((cc, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg bg-slate-50 border-2 border-slate-200 text-xs text-slate-900 font-medium leading-relaxed flex items-start gap-2.5"
                >
                  <span className="font-extrabold text-teal-800 text-sm leading-none">•</span>
                  <span>{cc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tool Comparison Matrix */}
          {activeModule.toolComparison && (
            <div className="space-y-3 p-5 rounded-xl bg-slate-950 text-white border-2 border-slate-800 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-teal-300">
                  Shared Principles Comparison
                </span>
                <h4 className="text-base font-extrabold text-white font-display">
                  Power BI vs Tableau vs Looker
                </h4>
                <p className="text-xs text-slate-300 font-medium">
                  Different tools, overlapping principles: Storage, Modeling, Metrics, Canvas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {activeModule.toolComparison.map((tc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-slate-900 border border-slate-700 space-y-2 text-xs"
                  >
                    <p className="font-extrabold text-teal-300 text-sm">{tc.toolName}</p>
                    <p className="text-slate-200 leading-snug">
                      <strong className="text-white">Best For:</strong> {tc.bestFor}
                    </p>
                    <p className="text-slate-300 text-[11px]">
                      <strong className="text-slate-200">Learning Curve:</strong> {tc.learningCurve}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Practical Workplace Guide */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              How to Apply This Step-by-Step
            </h3>
            <div className="space-y-3">
              {activeModule.stepByStepGuide.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border-2 border-slate-300 bg-white space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-teal-900">{step.step}</span>
                  </div>
                  <p className="text-sm text-slate-900 font-medium leading-relaxed">
                    {step.plainEnglish}
                  </p>
                  {step.exampleFormulaOrAction && (
                    <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-teal-200 overflow-x-auto border border-slate-800">
                      <code>{step.exampleFormulaOrAction}</code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Check Knowledge Check */}
          <div className="p-5 rounded-xl bg-slate-100 border-2 border-slate-300 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                Quick Understanding Check
              </span>
              <span className="text-xs font-bold text-slate-700">Test your confidence</span>
            </div>
            <p className="text-sm font-extrabold text-slate-950">
              {activeModule.quickCheckQuestion.question}
            </p>

            <div className="space-y-2">
              {activeModule.quickCheckQuestion.options.map((opt, oIdx) => {
                const isSelected = quizSelectedOption === oIdx;
                const isCorrect = oIdx === activeModule.quickCheckQuestion.correctIndex;
                let btnStyle = 'bg-white border-2 border-slate-300 hover:border-slate-500 text-slate-950 font-medium';

                if (quizSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-100 border-2 border-emerald-700 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-100 border-2 border-rose-500 text-rose-950 font-semibold';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-2 border-teal-800 bg-teal-100 text-teal-950 font-bold ring-2 ring-teal-800';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => {
                      setQuizSelectedOption(oIdx);
                      setQuizSubmitted(true);
                      if (isCorrect && !completedModuleIds.includes(activeModule.id)) {
                        toggleModuleComplete(activeModule.id);
                      }
                    }}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {quizSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div className="p-3.5 rounded-lg bg-white border-2 border-slate-300 text-xs text-slate-900 leading-relaxed font-medium animate-in fade-in">
                <strong className="text-slate-950">Why this is right:</strong>{' '}
                {activeModule.quickCheckQuestion.explanation}
              </div>
            )}
          </div>

          {/* Key Takeaway */}
          <div className="p-4 rounded-xl bg-teal-50 border-2 border-teal-700 flex items-start gap-3">
            <Award className="w-5 h-5 text-teal-800 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs font-black uppercase tracking-wider text-teal-950">
                Key Workplace Takeaway
              </span>
              <p className="text-xs text-slate-950 leading-relaxed font-bold">
                {activeModule.keyTakeaway}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t-2 border-slate-200 pt-5">
            <button
              onClick={() => toggleModuleComplete(activeModule.id)}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors border-2 ${
                completedModuleIds.includes(activeModule.id)
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-600 hover:bg-emerald-200'
                  : 'bg-teal-800 text-white border-teal-900 hover:bg-teal-900 shadow-xs'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {completedModuleIds.includes(activeModule.id)
                  ? 'Completed (Click to unmark)'
                  : 'Mark Module Complete'}
              </span>
            </button>

            <button
              onClick={() => {
                onOpenCompanionWithPrompt(activeModule.workplaceScenario);
                setActiveSection('companion');
              }}
              className="px-5 py-2.5 bg-slate-950 text-white border border-slate-950 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Solve this scenario with AI Companion</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
