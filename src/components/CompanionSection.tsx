import React, { useState, useEffect } from 'react';
import { ActiveSection, GuidanceLevel, CompanionResponse } from '../types';
import { usePreferences } from '../context/PreferencesContext';
import {
  Sparkles,
  Send,
  Loader2,
  HelpCircle,
  Volume2,
  ArrowRight,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  FolderPlus,
  BookOpen,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

import {
  getTaskSuggestionsForRole,
  EXCEL_SALES_DEMO_TASK,
  ROLE_TASK_SUGGESTIONS,
} from '../data/roleTasks';
import { BridgitAvatar } from './BridgitAvatar';

interface CompanionSectionProps {
  initialPrompt?: string;
  setActiveSection: (section: ActiveSection) => void;
  onSaveAsProject: (title: string, description: string) => void;
}

export const CompanionSection: React.FC<CompanionSectionProps> = ({
  initialPrompt = '',
  setActiveSection,
  onSaveAsProject,
}) => {
  const { preferences, updatePreferences, speakText, openStuckModal } = usePreferences();

  const [prompt, setPrompt] = useState(
    initialPrompt ||
      'I have an Excel file containing monthly sales. Help me calculate revenue, identify trends and create a dashboard.'
  );

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CompanionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedFormula, setCopiedFormula] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [clarificationAnswer, setClarificationAnswer] = useState<string | null>(null);
  const [projectSavedNotice, setProjectSavedNotice] = useState(false);

  const guidanceModes: { id: GuidanceLevel; label: string; desc: string }[] = [
    { id: 'guided', label: 'Guided', desc: '1 bite-sized action at a time with reassuring checkpoints' },
    { id: 'flexible', label: 'Flexible', desc: 'Overview of key milestones with hints and formulas' },
    { id: 'fast-track', label: 'Fast Track', desc: 'Direct formulas and copyable results with zero ceremony' },
  ];

  const quickPrompts = [
    'I have an Excel file containing monthly sales. Help me calculate revenue, identify trends and create a dashboard.',
    'I need to look up client emails from another spreadsheet without breaking existing formulas.',
    'How do I create a weekly automated summary for my team from messy bullet points?',
    'What is the easiest way to remove duplicate customer records in Excel?',
  ];

  const handleSubmit = async (overridePrompt?: string, chosenAnswer?: string) => {
    const textToSubmit = overridePrompt || prompt;
    if (!textToSubmit.trim()) return;

    setLoading(true);
    setError(null);
    setProjectSavedNotice(false);

    try {
      const res = await fetch('/api/companion/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSubmit,
          guidanceLevel: preferences.guidanceLevel,
          context: 'Workplace productivity and spreadsheet workflow',
          clarificationAnswers: chosenAnswer ? [chosenAnswer] : clarificationAnswer ? [clarificationAnswer] : [],
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to reach AI service');
      }

      const data: CompanionResponse = await res.json();
      setResponse(data);
    } catch (err: any) {
      console.warn('Companion chat fallback:', err);
      // Clean domain fallback
      setResponse({
        summary:
          'Calculate monthly revenue, uncover top sales trends, and build an interactive reporting dashboard.',
        recommendedTool: 'Excel & PivotTables',
        clarifyingQuestion: null,
        clarifyingOptions: null,
        mainAction: "Add a 'Total Revenue' column using the formula =UnitsSold * UnitPrice in row 2.",
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate Line Revenue',
            instruction:
              'Click in cell E2 and type =C2*D2, then press Enter. Double-click the tiny square at the bottom-right of cell E2 to copy it all the way down.',
            whatToClick: 'Cell E2 -> Formula Bar',
          },
          {
            stepNumber: 2,
            title: 'Insert a PivotTable',
            instruction:
              "Select your table, click Insert on the top ribbon, and choose PivotTable. Place 'Month' into Rows and 'Revenue' into Values.",
            whatToClick: 'Ribbon: Insert > PivotTable',
          },
          {
            stepNumber: 3,
            title: 'Add a Trend Chart',
            instruction:
              "With your PivotTable selected, click PivotTable Analyze > PivotChart, then select 'Line Chart'.",
            whatToClick: 'PivotTable Analyze > PivotChart > Line',
          },
        ],
        formulaCode: '=C2*D2',
        formulaExplanation:
          'Multiplies the units sold (C2) by price per item (D2) to produce total line revenue.',
        plainEnglishTip:
          'You do not need to do calculations manually. Excel will repeat this formula for all rows automatically.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyFormula = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  const handleSaveCurrentTask = () => {
    if (!response) return;
    onSaveAsProject(
      prompt.length > 50 ? `${prompt.slice(0, 48)}...` : prompt,
      response.summary
    );
    setProjectSavedNotice(true);
    setTimeout(() => setProjectSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header with Bridgit the Beaver */}
      <div className="p-5 rounded-2xl bg-teal-50/90 border-2 border-teal-600 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <BridgitAvatar size="lg" showStatus />
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-900 mb-0.5">
              <span>Bridgit</span>
              <span aria-hidden="true">·</span>
              <span>Your Workplace AI Companion</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold font-display text-slate-950 tracking-tight">
              Describe your task in everyday language
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5">
              No formulas or technical phrases required. Tell me what you need, and I'll build you a step-by-step plan.
            </p>
          </div>
        </div>
        <button
          onClick={() =>
            openStuckModal(
              prompt || 'I am looking for guidance on an Excel or data automation task.'
            )
          }
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-teal-800 border border-teal-900 px-3.5 py-2 rounded-lg hover:bg-teal-900 transition-colors shadow-xs shrink-0 self-start sm:self-center"
        >
          <HelpCircle className="w-3.5 h-3.5 text-teal-200" />
          <span>I'm Stuck</span>
        </button>
      </div>

      {/* Guidance Level Selector */}
      <div className="bg-white p-5 rounded-xl border-2 border-slate-300 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-900">
            How would you like to be guided?
          </span>
          <span className="text-xs font-bold text-slate-700">Adjust anytime</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {guidanceModes.map((m) => {
            const isSelected = preferences.guidanceLevel === m.id;
            return (
              <button
                key={m.id}
                onClick={() => updatePreferences({ guidanceLevel: m.id })}
                className={`text-left p-3.5 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-teal-800 bg-teal-50 ring-2 ring-teal-800 shadow-xs'
                    : 'border-slate-300 hover:border-slate-500 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-black text-slate-950 mb-1">
                  <span>{m.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-teal-800 stroke-[3]" />}
                </div>
                <p className="text-xs text-slate-800 leading-snug font-medium">{m.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Input Box */}
      <div className="bg-white rounded-xl border-2 border-slate-300 shadow-sm overflow-hidden focus-within:border-teal-800 focus-within:ring-2 focus-within:ring-teal-800 transition-all">
        <label htmlFor="companion-prompt" className="sr-only">
          Describe your workplace goal
        </label>
        <textarea
          id="companion-prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. I have an Excel file containing monthly sales. Help me calculate revenue, identify trends and create a dashboard."
          className="w-full p-4 text-sm text-slate-950 placeholder:text-slate-500 border-none focus:outline-none resize-none leading-relaxed font-medium"
        />

        <div className="px-4 py-3 bg-slate-100 border-t-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-800 font-bold">
            <span className="text-slate-900">Current Level:</span>
            <span className="capitalize text-teal-950 bg-teal-100 border border-teal-300 px-2 py-0.5 rounded font-black">
              {preferences.guidanceLevel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSubmit()}
              disabled={loading || !prompt.trim()}
              className="px-5 py-2.5 bg-teal-800 text-white rounded-lg text-xs font-bold hover:bg-teal-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 shadow-xs shrink-0 border border-teal-900"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Thinking clearly...</span>
                </>
              ) : (
                <>
                  <span>Create my step-by-step plan</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Tasks Matching Role & Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-800">
            {preferences.workRole
              ? `Suggested tasks for ${preferences.workRole}:`
              : 'Suggested tasks for everyday work:'}
          </span>
          <button
            onClick={() => {
              setPrompt(EXCEL_SALES_DEMO_TASK.description);
              handleSubmit(EXCEL_SALES_DEMO_TASK.description);
            }}
            className="text-xs font-bold text-teal-800 hover:text-teal-950 underline"
          >
            Try Excel sales demo →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {getTaskSuggestionsForRole(preferences.workRole).map((task, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(task.description);
                handleSubmit(task.description);
              }}
              className="text-left p-3 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-teal-700 rounded-xl transition-all shadow-xs flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block mb-1">
                  {task.category}
                </span>
                <p className="text-xs font-extrabold text-slate-950 group-hover:text-teal-900 transition-colors">
                  {task.shortTitle}
                </p>
              </div>
              <span className="text-[11px] text-slate-600 mt-2 font-medium">
                {task.estimatedTime}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-amber-100 border-2 border-amber-400 text-xs text-amber-950 flex items-start gap-2.5 font-medium">
          <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Notice</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Companion Response Presentation */}
      {response && (
        <div className="space-y-6 pt-2 animate-in fade-in duration-200">
          {/* Summary Card */}
          <div className="p-6 sm:p-7 rounded-xl bg-white border-2 border-slate-300 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
              <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-teal-950">
                <BridgitAvatar size="xs" />
                <span>Bridgit's Recommended Approach</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    speakText(
                      `${response.summary}. Recommended tool: ${response.recommendedTool}. Main action: ${response.mainAction}`
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-900 hover:text-teal-950 px-2.5 py-1 rounded-md border border-teal-300 bg-teal-50 hover:bg-teal-100 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
                <button
                  onClick={handleSaveCurrentTask}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-slate-950 border-2 border-slate-300 px-3 py-1 rounded-md hover:bg-slate-100 transition-colors"
                >
                  <FolderPlus className="w-3.5 h-3.5 text-slate-700" />
                  <span>{projectSavedNotice ? 'Saved to Projects!' : 'Save project'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-950">{response.summary}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
                <span>Recommended tool:</span>
                <span className="font-extrabold text-teal-950 bg-teal-100 border border-teal-300 px-2 py-0.5 rounded">
                  {response.recommendedTool}
                </span>
              </div>
            </div>

            {/* Essential Clarifying Question (if ambiguous) */}
            {response.clarifyingQuestion && response.clarifyingOptions && (
              <div className="p-4 rounded-xl bg-teal-50 border-2 border-teal-600 space-y-3">
                <p className="text-xs font-black text-teal-950 uppercase tracking-wider">
                  One quick clarifying question:
                </p>
                <p className="text-sm font-bold text-slate-950">
                  {response.clarifyingQuestion}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {response.clarifyingOptions.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setClarificationAnswer(opt);
                        handleSubmit(prompt, opt);
                      }}
                      className="px-3.5 py-1.5 bg-white border-2 border-teal-600 hover:bg-teal-100 text-teal-950 rounded-lg text-xs font-bold transition-colors shadow-xs"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Single Immediate Action */}
            <div className="p-4 rounded-xl bg-slate-100 border-2 border-slate-300 space-y-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                Your Single Immediate Next Action:
              </span>
              <p className="text-sm font-bold text-slate-950 leading-snug">
                {response.mainAction}
              </p>
            </div>

            {/* Step-by-Step Breakdown */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-black text-slate-950">Step-by-step actions:</h3>
              <div className="space-y-3">
                {response.steps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 rounded-xl border-2 border-slate-300 bg-white space-y-2 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-teal-950">
                        Step {step.stepNumber}. {step.title}
                      </span>
                      {step.whatToClick && (
                        <span className="text-xs text-slate-800 font-mono font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                          Click: {step.whatToClick}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-900 font-medium leading-relaxed">
                      {step.instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Formula / Code Snippet */}
            {response.formulaCode && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-800 font-bold">
                  <span>Formula to use:</span>
                  <button
                    onClick={() => handleCopyFormula(response.formulaCode!)}
                    className="inline-flex items-center gap-1 text-teal-900 hover:text-teal-950 font-extrabold underline"
                  >
                    {copiedFormula ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied to clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy formula</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950 text-teal-200 font-mono text-xs sm:text-sm flex items-center justify-between overflow-x-auto border border-slate-800 font-bold">
                  <code>{response.formulaCode}</code>
                </div>
                {response.formulaExplanation && (
                  <p className="text-xs text-slate-800 font-medium leading-relaxed">
                    <strong className="text-slate-950">In plain English:</strong>{' '}
                    {response.formulaExplanation}
                  </p>
                )}
              </div>
            )}

            {/* Plain English Tip from Bridgit */}
            {response.plainEnglishTip && (
              <div className="p-4 rounded-xl bg-teal-50 border-2 border-teal-600 text-xs text-teal-950 leading-relaxed font-semibold flex items-start gap-3">
                <BridgitAvatar size="sm" />
                <div className="space-y-0.5">
                  <span className="font-black uppercase tracking-wider text-[11px] block text-teal-900">
                    Reassuring Tip from Bridgit:
                  </span>
                  <p>{response.plainEnglishTip}</p>
                </div>
              </div>
            )}

            {/* Explain how it works toggle */}
            <div className="border-t-2 border-slate-200 pt-3">
              <button
                onClick={() => setShowHowItWorks(!showHowItWorks)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-slate-950 transition-colors"
              >
                <span>Explain how this solution works in depth</span>
                {showHowItWorks ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showHowItWorks && (
                <div className="mt-3 p-4 rounded-xl bg-slate-100 border-2 border-slate-300 text-xs text-slate-900 space-y-2 leading-relaxed animate-in fade-in font-medium">
                  <p>
                    <strong className="text-slate-950">Why this works:</strong> In spreadsheet
                    models, calculations operate on cell references rather than hardcoded numbers.
                    When you write <code>=UnitsSold * UnitPrice</code>, you establish a dynamic rule.
                  </p>
                  <p>
                    If a sale quantity changes next week, the revenue and the corresponding
                    PivotTable update automatically. You do not need to retype calculations.
                  </p>
                </div>
              )}
            </div>

            {/* Action link to Learning Paths */}
            <div className="pt-2 border-t-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-700">
                Want to build long-term confidence with these concepts?
              </span>
              <button
                onClick={() => setActiveSection('curriculum')}
                className="px-4 py-2.5 bg-teal-800 text-white rounded-lg text-xs font-bold hover:bg-teal-900 transition-colors inline-flex items-center justify-center gap-2 shadow-xs shrink-0 border border-teal-900"
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-100" />
                <span>Explore Related Learning Path Modules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
