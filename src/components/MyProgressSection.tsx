import React from 'react';
import { ActiveSection } from '../types';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { usePreferences } from '../context/PreferencesContext';
import {
  Award,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Download,
  HelpCircle,
  FileCheck2,
  Star
} from 'lucide-react';

interface MyProgressSectionProps {
  completedModuleIds: string[];
  setActiveSection: (section: ActiveSection) => void;
}

export const MyProgressSection: React.FC<MyProgressSectionProps> = ({
  completedModuleIds,
  setActiveSection,
}) => {
  const { openStuckModal } = usePreferences();

  const totalModules = CURRICULUM_MODULES.length;
  const completedCount = completedModuleIds.length;
  const percentage = Math.round((completedCount / totalModules) * 100);

  const skillDomains = [
    {
      domain: 'Spreadsheets & Formulas',
      proficiency: 'Practiced',
      description: 'Tabular structure, XLOOKUP, dynamic cell multiplication, sum aggregations.',
      progress: 85,
    },
    {
      domain: 'Reporting & PivotTables',
      proficiency: 'Practiced',
      description: 'Grouping rows, summarising metrics without manual code, multi-territory breakdowns.',
      progress: 75,
    },
    {
      domain: 'Data Visualisation & BI',
      proficiency: 'Developing',
      description: 'Shared BI architecture across Power BI, Tableau and Looker, clean visual hierarchy.',
      progress: 60,
    },
    {
      domain: 'Workplace AI & Automation',
      proficiency: 'Developing',
      description: 'Role-context-constraint prompting, verification safeguards, human-in-the-loop approvals.',
      progress: 65,
    },
    {
      domain: 'SQL & Database Queries',
      proficiency: 'Introductory',
      description: 'SELECT, FROM, WHERE clauses and relational table IDs in plain English.',
      progress: 40,
    },
  ];

  const milestones = [
    {
      title: 'First Dynamic Revenue Calculation',
      description: 'Calculated =Units * Price across all rows automatically in workplace tasks.',
      date: 'Completed',
    },
    {
      title: 'PivotTable Multi-Dimensional Breakdown',
      description: 'Aggregated revenue by Month and Territory without writing code.',
      date: 'Completed',
    },
    {
      title: 'Executive Briefing AI Generation',
      description: 'Generated plain-English takeaways and reviewed verification risks.',
      date: 'Completed',
    },
    {
      title: 'Shared BI Principles Mastery',
      description: 'Understood the 4-layer model common to Power BI, Tableau and Looker.',
      date: 'In Progress',
    },
  ];

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-300 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
            <span className="font-extrabold text-teal-900">BridgeAI Growth</span>
            <span aria-hidden="true">·</span>
            <span>Workplace Digital Skill Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 tracking-tight">
            My Progress & Workplace Skills
          </h1>
          <p className="text-sm font-medium text-slate-700 mt-1">
            Track tangible capabilities you can showcase on your resume or use in your daily role.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() =>
              openStuckModal(
                'I want to review which workplace skills to focus on next for my career goals.'
              )
            }
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 border border-teal-900 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-teal-200" />
            <span>I'm Stuck</span>
          </button>

          <button
            onClick={handlePrintCertificate}
            className="px-4 py-2 bg-slate-950 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs border border-slate-950"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Skill Summary</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-white border-2 border-slate-300 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Curriculum Completion</span>
            <span className="font-extrabold text-teal-950 bg-teal-100 border border-teal-300 px-2 py-0.5 rounded">
              {percentage}%
            </span>
          </div>
          <p className="text-3xl font-black text-slate-950 tabular-nums">
            {completedCount}{' '}
            <span className="text-base font-semibold text-slate-700">/ {totalModules} modules</span>
          </p>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
            <div
              className="h-full bg-teal-800 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white border-2 border-slate-300 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Estimated Learning Invested</span>
            <span className="text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded font-bold">
              Bite-sized
            </span>
          </div>
          <p className="text-3xl font-black text-slate-950 tabular-nums">
            1.8 <span className="text-base font-semibold text-slate-700">hours</span>
          </p>
          <p className="text-xs text-slate-700 font-medium">Self-paced, zero anxiety</p>
        </div>

        <div className="p-6 rounded-xl bg-white border-2 border-slate-300 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Workplace Ready Milestones</span>
            <span className="text-teal-950 bg-teal-100 border border-teal-300 px-2 py-0.5 rounded font-bold">
              Verified
            </span>
          </div>
          <p className="text-3xl font-black text-slate-950 tabular-nums">
            3 <span className="text-base font-semibold text-slate-700">achieved</span>
          </p>
          <p className="text-xs text-slate-700 font-medium">Spreadsheets, Pivots & Briefings</p>
        </div>
      </div>

      {/* Digital Workplace Skills Matrix */}
      <div className="bg-white rounded-xl border-2 border-slate-300 p-6 sm:p-7 space-y-6 shadow-sm">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-teal-950">
            Competency Profile
          </span>
          <h2 className="text-xl font-extrabold text-slate-950 mt-0.5">
            Demonstrated Workplace Digital Skills
          </h2>
          <p className="text-xs text-slate-700 font-medium">
            Skills developed through practical interactive exercises in BridgeAI.
          </p>
        </div>

        <div className="space-y-4">
          {skillDomains.map((sk, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-slate-50 border-2 border-slate-200 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <span className="font-extrabold text-slate-950 text-sm">{sk.domain}</span>
                <span className="text-teal-950 font-black bg-teal-100 border border-teal-300 px-2 py-0.5 rounded">
                  {sk.proficiency}
                </span>
              </div>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">{sk.description}</p>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                <div
                  className="h-full bg-teal-800 rounded-full transition-all"
                  style={{ width: `${sk.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Milestones */}
      <div className="bg-white rounded-xl border-2 border-slate-300 p-6 sm:p-7 space-y-4 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-950">Practical Workplace Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border-2 border-slate-300 bg-white space-y-1.5 flex items-start gap-3 shadow-xs"
            >
              <CheckCircle2 className="w-5 h-5 text-teal-800 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-extrabold text-slate-950">{m.title}</p>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {m.description}
                </p>
                <span className="inline-block pt-1 text-[11px] font-black text-teal-950">
                  {m.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume CTA */}
      <div className="p-6 sm:p-7 rounded-xl bg-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800 shadow-md">
        <div className="space-y-1">
          <p className="text-xs font-black text-teal-300 uppercase tracking-wider">
            Continue Growing
          </p>
          <p className="text-base font-extrabold text-white">Ready for your next skill module?</p>
          <p className="text-xs text-slate-300 font-medium">
            Pick up right where you left off in the Learning Paths curriculum.
          </p>
        </div>
        <button
          onClick={() => setActiveSection('curriculum')}
          className="px-5 py-2.5 bg-teal-800 text-white rounded-lg text-xs font-bold hover:bg-teal-900 transition-colors flex items-center justify-center gap-2 shrink-0 border border-teal-900 shadow-xs"
        >
          <BookOpen className="w-4 h-4 text-teal-100" />
          <span>Resume Learning Paths</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
