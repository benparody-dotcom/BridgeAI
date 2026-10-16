import React, { useState, useMemo } from 'react';
import { ActiveSection } from '../types';
import { usePreferences } from '../context/PreferencesContext';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  FolderGit2,
  CheckCircle2,
  Volume2,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';

import {
  getTaskSuggestionsForRole,
  EXCEL_SALES_DEMO_TASK,
  ROLE_TASK_SUGGESTIONS,
  WORKPLACE_DAY_TO_DAY_TIPS,
  RoleTaskSuggestion,
} from '../data/roleTasks';
import { BridgitAvatar } from './BridgitAvatar';

interface HomeSectionProps {
  setActiveSection: (section: ActiveSection) => void;
  onSelectPrompt: (promptText: string) => void;
  activeTaskTitle?: string;
  onOpenProject: (projectId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  setActiveSection,
  onSelectPrompt,
  activeTaskTitle,
  onOpenProject,
}) => {
  const { speakText, preferences } = usePreferences();
  const [activeView, setActiveView] = useState<'tasks' | 'tips'>('tasks');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Categories available for filtering
  const availableCategories = useMemo(() => {
    const base = ['All', 'Marketing', 'Sales', 'Operations', 'Organisation'];
    if (
      preferences.workRole &&
      !['Marketing', 'Sales', 'Operations', 'Organisation'].includes(preferences.workRole)
    ) {
      return [...base, preferences.workRole];
    }
    return base;
  }, [preferences.workRole]);

  // Tasks to display based on selected category
  const displayedTasks = useMemo(() => {
    if (selectedCategory === 'All') {
      const userRoleTasks =
        preferences.workRole && ROLE_TASK_SUGGESTIONS[preferences.workRole]
          ? ROLE_TASK_SUGGESTIONS[preferences.workRole]
          : [];
      const mkt = ROLE_TASK_SUGGESTIONS.Marketing?.[0];
      const sales = ROLE_TASK_SUGGESTIONS.Sales?.[0];
      const ops = ROLE_TASK_SUGGESTIONS.Operations?.[0];
      const org = ROLE_TASK_SUGGESTIONS.Organisation?.[0];

      const combined = [...userRoleTasks, mkt, sales, ops, org].filter(
        Boolean
      ) as RoleTaskSuggestion[];

      const seen = new Set<string>();
      return combined
        .filter((t) => {
          if (seen.has(t.shortTitle)) return false;
          seen.add(t.shortTitle);
          return true;
        })
        .slice(0, 6);
    }

    if (ROLE_TASK_SUGGESTIONS[selectedCategory]) {
      return ROLE_TASK_SUGGESTIONS[selectedCategory];
    }
    return getTaskSuggestionsForRole(selectedCategory);
  }, [selectedCategory, preferences.workRole]);

  // Tips to display based on selected category
  const displayedTips = useMemo(() => {
    if (selectedCategory === 'All') {
      return WORKPLACE_DAY_TO_DAY_TIPS;
    }
    return WORKPLACE_DAY_TO_DAY_TIPS.filter(
      (tip) => tip.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory]);

  return (
    <div className="space-y-8 sm:space-y-9 pb-12 pt-1 sm:pt-2">
      {/* Resume Active Task Callout (if any) */}
      {activeTaskTitle && (
        <section aria-label="Resume unfinished task" className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="p-3.5 sm:p-4 rounded-xl bg-teal-100/90 border-2 border-teal-600 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                <CheckCircle2 className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <p className="text-xs font-bold text-teal-950 uppercase tracking-wider">
                  Unfinished task in progress
                </p>
                <p className="text-sm font-bold text-slate-950 line-clamp-1">{activeTaskTitle}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveSection('curriculum')}
              className="px-4 py-2 bg-teal-900 text-white rounded-lg text-xs font-bold hover:bg-slate-950 transition-colors inline-flex items-center justify-center gap-2 shrink-0 shadow-xs"
            >
              <span>Resume Learning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-1">
        <div className="max-w-3xl space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <span className="font-extrabold text-teal-900">BridgeAI Platform</span>
            <span aria-hidden="true">·</span>
            <span>Built for workplace confidence</span>
            <button
              onClick={() =>
                speakText(
                  'BridgeAI: Making AI, automation, and digital skills accessible to everyone. Built for people with ADHD, dyslexia, older adults, and complete beginners.'
                )
              }
              className="inline-flex items-center gap-1 text-teal-900 hover:text-teal-950 ml-2 font-bold"
              title="Read aloud intro"
            >
              <Volume2 className="w-4 h-4" />
              <span className="sr-only">Read intro aloud</span>
            </button>
          </div>

          {/* Bridgit Welcome Card */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/90 border-2 border-amber-300 flex items-center gap-3.5 shadow-xs">
            <BridgitAvatar size="md" showStatus />
            <div className="text-xs">
              <p className="font-extrabold text-slate-950 flex items-center gap-1.5">
                <span>Hi! I'm Bridgit</span>
                <span className="text-[10px] bg-teal-100 text-teal-950 px-1.5 py-0.5 rounded font-black">Your Beaver Guide</span>
              </p>
              <p className="text-slate-700 font-medium mt-0.5">
                I translate tech jargon into plain English and help you build practical workplace skills at your own pace.
              </p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 font-display text-balance leading-tight">
            Making AI, automation and digital skills accessible to everyone.
          </h1>

          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
            No computer science degree required. Describe what you want to achieve in everyday
            English, learn at the pace that suits your mind, and build verifiable skills for your
            career.
          </p>

          {/* The 3 Prominent User Actions - Learning Paths First */}
          <div className="pt-1 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setActiveSection('curriculum')}
              className="px-5 py-3.5 bg-teal-800 text-white rounded-xl font-bold text-sm hover:bg-teal-900 transition-colors shadow-sm flex items-center justify-center gap-2 border border-teal-900"
            >
              <BookOpen className="w-4 h-4 text-teal-100" />
              <span>Teach me a skill (Learning Paths)</span>
            </button>

            <button
              onClick={() => setActiveSection('companion')}
              className="px-5 py-3.5 bg-white text-slate-950 border-2 border-slate-400 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-teal-800" />
              <span>Help me do something</span>
            </button>

            <button
              onClick={() => setActiveSection('projects')}
              className="px-5 py-3.5 bg-white text-slate-950 border-2 border-slate-400 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <FolderGit2 className="w-4 h-4 text-slate-700" />
              <span>My projects</span>
            </button>
          </div>

          {/* Inclusive Design Reassurance */}
          <div className="flex items-center gap-3 pt-1 text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-5 h-5 text-teal-800 shrink-0" />
            <span>
              Designed for ADHD, dyslexia, visual comfort, and neurodivergent pacing. High-contrast,
              generous spacing, and zero unexplained jargon.
            </span>
          </div>
        </div>
      </section>

      {/* The Core Three Promises */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-t-2 border-slate-300 pt-6 sm:pt-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-display">
              Our Core Promise to You
            </h2>
            <p className="text-sm font-medium text-slate-700 mt-1">
              Three pillars that guide every interaction inside BridgeAI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-xl bg-white border-2 border-slate-300 hover:border-teal-700 transition-colors space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-teal-100 border border-teal-300 text-teal-950 flex items-center justify-center font-extrabold text-base">
                1
              </div>
              <h3 className="text-base font-extrabold text-slate-950">Teach me a skill</h3>
              <p className="text-sm text-slate-800 leading-relaxed">
                Learn at the pace that suits you. Choose between Guided (one step at a time),
                Flexible (hints and milestones), or Fast Track. Short, bite-sized workplace modules.
              </p>
              <button
                onClick={() => setActiveSection('curriculum')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-900 hover:text-teal-950 pt-2 underline"
              >
                <span>Browse Learning Paths</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-xl bg-white border-2 border-slate-300 hover:border-teal-700 transition-colors space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-teal-100 border border-teal-300 text-teal-950 flex items-center justify-center font-extrabold text-base">
                2
              </div>
              <h3 className="text-base font-extrabold text-slate-950">Help me do something</h3>
              <p className="text-sm text-slate-800 leading-relaxed">
                Complete a practical workplace task right now. Whether it is calculating revenue,
                merging spreadsheets, or formatting an executive briefing, we guide you to a real result.
              </p>
              <button
                onClick={() => setActiveSection('companion')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-900 hover:text-teal-950 pt-2 underline"
              >
                <span>Launch Work Companion</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-xl bg-white border-2 border-slate-300 hover:border-teal-700 transition-colors space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-teal-100 border border-teal-300 text-teal-950 flex items-center justify-center font-extrabold text-base">
                3
              </div>
              <h3 className="text-base font-extrabold text-slate-950">Help me grow</h3>
              <p className="text-sm text-slate-800 leading-relaxed">
                Develop durable skills you can put on your resume and use every day: Excel, Power
                BI, SQL, data visualisation, and prompt engineering for workplace automation.
              </p>
              <button
                onClick={() => setActiveSection('progress')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-900 hover:text-teal-950 pt-2 underline"
              >
                <span>View Skill Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Everyday Workplace Tasks & Day-to-Day Tips Section in Blue */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-blue-950 via-slate-950 to-blue-950 text-white space-y-6 border-2 border-blue-800 shadow-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-900/80 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                <p className="text-xs font-black uppercase tracking-wider text-teal-300">
                  {preferences.workRole
                    ? `Everyday Workplace Tasks · Personalised for ${preferences.workRole}`
                    : 'Everyday Workplace Tasks & Day-to-Day Tips'}
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white mt-1">
                Everyday Workplace Tasks & Quick AI Guidance
              </h2>
              <p className="text-xs sm:text-sm text-blue-200/90 font-medium mt-1">
                Hands-on practical suggestions and everyday AI tips across Marketing, Sales, Operations, and Organisation.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  onSelectPrompt(EXCEL_SALES_DEMO_TASK.description);
                  setActiveSection('companion');
                }}
                className="text-xs font-bold text-teal-200 hover:text-white bg-blue-900/60 hover:bg-blue-800 border-2 border-blue-700 px-3.5 py-2 rounded-xl transition-colors text-left flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                <span>Excel sales demo →</span>
              </button>
            </div>
          </div>

          {/* Section Mode Toggle: Task Suggestions vs Day-to-Day Tips */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="inline-flex rounded-xl p-1 bg-blue-900/60 border border-blue-700/80">
              <button
                onClick={() => setActiveView('tasks')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeView === 'tasks'
                    ? 'bg-teal-400 text-slate-950 shadow-md font-black'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                <span>Task Suggestions</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeView === 'tasks' ? 'bg-teal-600/30 text-slate-950 font-black' : 'bg-blue-800 text-blue-200'
                }`}>
                  {displayedTasks.length}
                </span>
              </button>
              <button
                onClick={() => setActiveView('tips')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeView === 'tips'
                    ? 'bg-teal-400 text-slate-950 shadow-md font-black'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Day-to-Day Tips</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeView === 'tips' ? 'bg-teal-600/30 text-slate-950 font-black' : 'bg-blue-800 text-blue-200'
                }`}>
                  {displayedTips.length}
                </span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {availableCategories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-blue-500 text-white border-blue-300 ring-2 ring-blue-400/50 shadow-xs'
                        : 'bg-blue-900/40 text-blue-200 border-blue-800/80 hover:bg-blue-900 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* VIEW 1: Task Suggestions Grid */}
          {activeView === 'tasks' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
              {displayedTasks.map((task, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectPrompt(task.description);
                    setActiveSection('companion');
                  }}
                  className="text-left p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/95 border-2 border-blue-900/70 hover:border-teal-400 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="px-2 py-0.5 rounded bg-blue-900/70 text-teal-300 border border-blue-700/60 font-black text-[11px]">
                        {task.category}
                      </span>
                      <span className="text-slate-400 text-[11px] font-semibold">{task.estimatedTime}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-teal-200 transition-colors leading-snug">
                      {task.shortTitle}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">{task.description}</p>
                  </div>
                  <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-teal-300 group-hover:text-teal-200">
                    <span>Start in Companion</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* VIEW 2: Day-to-Day Tips & AI Shortcuts Grid */}
          {activeView === 'tips' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
              {displayedTips.map((tip) => (
                <div
                  key={tip.id}
                  className="p-5 rounded-xl bg-slate-900/95 border-2 border-blue-900/70 space-y-3 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-blue-900/70 text-teal-300 border border-blue-700/60 font-black text-[11px]">
                        {tip.category} Tip
                      </span>
                      <button
                        onClick={() => speakText(`${tip.title}. ${tip.tip}`)}
                        className="p-1 rounded text-blue-300 hover:text-white hover:bg-blue-800 transition-colors"
                        title="Listen to tip"
                        aria-label={`Listen to ${tip.title}`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>{tip.title}</span>
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {tip.tip}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-blue-900/60 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-blue-300 font-medium">Ready to try this?</span>
                    <button
                      onClick={() => {
                        onSelectPrompt(tip.promptToTry);
                        setActiveSection('companion');
                      }}
                      className="px-3 py-1.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black rounded-lg text-xs transition-colors inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Try in Companion</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Curriculum Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-6 rounded-2xl bg-white border-2 border-slate-300 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-900">
              Structured Curriculum
            </span>
            <h3 className="text-xl font-extrabold text-slate-950 font-display">
              10 Practical Workplace Digital Skill Paths
            </h3>
            <p className="text-sm text-slate-800 leading-relaxed">
              Explore foundational data skills, PivotTables, Power BI, Tableau, Looker, SQL, Python,
              and AI automation. Complete exercises and test out of familiar topics.
            </p>
          </div>
          <button
            onClick={() => setActiveSection('curriculum')}
            className="px-6 py-3.5 bg-teal-800 text-white rounded-xl text-sm font-bold hover:bg-teal-900 transition-colors inline-flex items-center gap-2 shrink-0 border border-teal-900 shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-teal-100" />
            <span>Open Learning Paths</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
