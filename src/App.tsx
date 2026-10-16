import React, { useState, useEffect } from 'react';
import { ActiveSection, ProjectItem } from './types';
import { PreferencesProvider, usePreferences } from './context/PreferencesContext';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { CompanionSection } from './components/CompanionSection';
import { LearningPathsSection } from './components/LearningPathsSection';
import { MyProjectsSection } from './components/MyProjectsSection';
import { MyProgressSection } from './components/MyProgressSection';
import { PreferencesSection } from './components/PreferencesSection';
import { ImStuckModal } from './components/ImStuckModal';
import { OnboardingModal } from './components/OnboardingModal';
import { INITIAL_PROJECTS } from './data/sampleProjects';
import { HelpCircle, Sparkles, BookOpen } from 'lucide-react';

function AppContent() {
  const { preferences, openStuckModal } = usePreferences();

  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');

  // Projects state synchronized with localStorage
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('bridgeai_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Completed modules tracking
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bridgeai_completed_modules');
      return saved ? JSON.parse(saved) : ['shared-principles'];
    } catch {
      return ['shared-principles'];
    }
  });

  // Active task tracker
  const [activeTaskTitle, setActiveTaskTitle] = useState<string>(
    'Writing better prompts'
  );

  // Synchronize projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bridgeai_projects', JSON.stringify(projects));
    } catch {
      // ignore
    }
  }, [projects]);

  // Global Keyboard shortcuts (e.g. '?' opens stuck modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '?' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        openStuckModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openStuckModal]);

  const handleSelectPrompt = (promptText: string) => {
    setSelectedPrompt(promptText);
    setActiveSection('companion');
  };

  const handleCreateProject = (title: string, category: string, description: string) => {
    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title,
      category,
      description,
      lastUpdated: 'Just now',
      status: 'In Progress',
      guidanceLevel: preferences.guidanceLevel,
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleDuplicateProject = (projectId: string) => {
    const orig = projects.find((p) => p.id === projectId);
    if (!orig) return;
    const duplicated: ProjectItem = {
      ...orig,
      id: `proj-${Date.now()}`,
      title: `${orig.title} (Copy)`,
      lastUpdated: 'Just now',
      status: 'Draft',
    };
    setProjects((prev) => [duplicated, ...prev]);
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    }
  };

  const handleOpenProject = (projectId: string) => {
    const proj = projects.find((p) => p.id === projectId);
    if (proj) {
      setActiveTaskTitle(`${proj.title} · ${proj.category}`);
      setSelectedPrompt(proj.description);
      setActiveSection('companion');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-teal-200 selection:text-teal-950">
      {/* Top Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeTaskTitle={activeTaskTitle}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeSection === 'home' && (
          <HomeSection
            setActiveSection={setActiveSection}
            onSelectPrompt={handleSelectPrompt}
            activeTaskTitle={activeTaskTitle}
            onOpenProject={handleOpenProject}
          />
        )}

        {activeSection === 'curriculum' && (
          <LearningPathsSection
            setActiveSection={setActiveSection}
            onOpenCompanionWithPrompt={(scenario) => {
              setActiveTaskTitle(scenario);
              setSelectedPrompt(scenario);
              setActiveSection('companion');
            }}
          />
        )}

        {activeSection === 'companion' && (
          <CompanionSection
            initialPrompt={selectedPrompt}
            setActiveSection={setActiveSection}
            onSaveAsProject={(title, desc) =>
              handleCreateProject(title, 'AI Assisted Workflow', desc)
            }
          />
        )}

        {activeSection === 'projects' && (
          <MyProjectsSection
            projects={projects}
            setActiveSection={setActiveSection}
            onOpenProject={handleOpenProject}
            onDuplicateProject={handleDuplicateProject}
            onDeleteProject={handleDeleteProject}
            onCreateProject={handleCreateProject}
          />
        )}

        {activeSection === 'progress' && (
          <MyProgressSection
            completedModuleIds={completedModuleIds}
            setActiveSection={setActiveSection}
          />
        )}

        {activeSection === 'preferences' && <PreferencesSection />}
      </main>

      {/* Persistent Stuck Modal */}
      <ImStuckModal />

      {/* Onboarding Modal */}
      <OnboardingModal />

      {/* Persistent Floating "I'm Stuck" Action Button (User Controlled) */}
      {preferences.persistentStuckButton && (
        <div className="fixed bottom-5 right-5 z-30">
          <button
            onClick={() => openStuckModal()}
            className="px-4 py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 text-xs font-bold border-2 border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500/50"
            aria-label="I'm Stuck - Get immediate help"
            title="Press '?' on keyboard anytime for help"
          >
            <HelpCircle className="w-4 h-4 text-teal-200" />
            <span>I'm Stuck</span>
            <span className="text-[10px] bg-teal-700 text-teal-200 px-1.5 py-0.5 rounded font-mono hidden sm:inline">
              ?
            </span>
          </button>
        </div>
      )}

      {/* Footer with High Contrast */}
      <footer className="bg-white border-t-2 border-slate-300 py-8 px-4 sm:px-6 lg:px-8 mt-auto shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-slate-950 text-sm">BridgeAI</span>
            <span aria-hidden="true">·</span>
            <span>Making AI, automation and digital skills accessible to everyone.</span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setActiveSection('curriculum')}
              className="hover:text-teal-950 hover:underline transition-colors"
            >
              Learning Paths (10 Modules)
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveSection('companion')}
              className="hover:text-teal-950 hover:underline transition-colors"
            >
              AI Companion
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveSection('preferences')}
              className="hover:text-teal-950 hover:underline transition-colors"
            >
              Accessibility & Preferences
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <PreferencesProvider>
      <AppContent />
    </PreferencesProvider>
  );
}
