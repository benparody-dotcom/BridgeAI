import React, { useState } from 'react';
import { ProjectItem, ActiveSection } from '../types';
import { usePreferences } from '../context/PreferencesContext';
import {
  FolderGit2,
  Plus,
  Play,
  Copy,
  Trash2,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface MyProjectsSectionProps {
  projects: ProjectItem[];
  setActiveSection: (section: ActiveSection) => void;
  onOpenProject: (projectId: string) => void;
  onDuplicateProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onCreateProject: (title: string, category: string, description: string) => void;
}

export const MyProjectsSection: React.FC<MyProjectsSectionProps> = ({
  projects,
  setActiveSection,
  onOpenProject,
  onDuplicateProject,
  onDeleteProject,
  onCreateProject,
}) => {
  const { openStuckModal } = usePreferences();
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Spreadsheets & Reporting');
  const [newDescription, setNewDescription] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onCreateProject(newTitle, newCategory, newDescription || 'Workplace task and data project');
    setNewTitle('');
    setNewDescription('');
    setShowNewModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-300 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
            <span className="font-extrabold text-teal-900">BridgeAI Workspace</span>
            <span aria-hidden="true">·</span>
            <span>Saved Workplace Projects</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 tracking-tight">
            My Projects
          </h1>
          <p className="text-sm font-medium text-slate-700 mt-1">
            Resume saved analyses, review automated workflows, and export reports for your team.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() =>
              openStuckModal(
                'I have a question about organizing, exporting, or opening one of my workplace projects.'
              )
            }
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 border border-teal-900 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-teal-200" />
            <span>I'm Stuck</span>
          </button>

          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2 bg-slate-950 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs border border-slate-950"
          >
            <Plus className="w-3.5 h-3.5 text-teal-300" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-xl border-2 border-slate-300 hover:border-slate-500 p-5 flex flex-col justify-between space-y-4 shadow-sm transition-all"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
                <span className="text-teal-950 font-extrabold truncate">{proj.category}</span>
                <span className="bg-slate-100 border border-slate-300 px-2 py-0.5 rounded text-[11px] font-black text-slate-900">
                  {proj.status}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-950 leading-snug">{proj.title}</h3>

              <p className="text-xs text-slate-800 leading-relaxed font-medium line-clamp-3">
                {proj.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t-2 border-slate-200 text-xs">
              <div className="flex items-center justify-between text-slate-700 font-semibold text-[11px]">
                <span>Last active: {proj.lastUpdated}</span>
                {proj.datasetRowsCount && <span>{proj.datasetRowsCount} records</span>}
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => onOpenProject(proj.id)}
                  className="flex-1 px-3 py-2.5 bg-teal-800 text-white rounded-lg font-bold hover:bg-teal-900 transition-colors flex items-center justify-center gap-1.5 shadow-xs border border-teal-900"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-200" />
                  <span>Resume in Companion</span>
                </button>

                <button
                  onClick={() => onDuplicateProject(proj.id)}
                  className="p-2 border-2 border-slate-300 rounded-lg text-slate-800 hover:bg-slate-100 hover:text-slate-950 transition-colors"
                  title="Duplicate project"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeleteProject(proj.id)}
                  className="p-2 border-2 border-slate-300 rounded-lg text-slate-700 hover:bg-rose-100 hover:text-rose-900 hover:border-rose-400 transition-colors"
                  title="Delete project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {showNewModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl shadow-2xl border-2 border-slate-300 w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-extrabold text-slate-950">
              Start a New Workplace Project
            </h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-900 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Regional Sales Audit"
                  className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-xs font-semibold text-slate-950"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Category</label>
                <select
                  className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-xs font-semibold text-slate-950"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option value="Spreadsheets & Reporting">Spreadsheets & Reporting</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="BI Dashboards">BI Dashboards</option>
                  <option value="Data Cleaning">Data Cleaning</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  What is the outcome you want to achieve?
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Summarize weekly customer feedback and highlight any shipping complaints."
                  className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-xs font-semibold text-slate-950 resize-none"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t-2 border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-3.5 py-2 text-slate-800 hover:text-slate-950 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-800 text-white rounded-lg text-xs font-bold hover:bg-teal-900 transition-colors border border-teal-900"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
