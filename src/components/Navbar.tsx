import React from 'react';
import { ActiveSection } from '../types';
import { usePreferences } from '../context/PreferencesContext';
import { HelpCircle, Volume2, VolumeX, Settings, Sparkles } from 'lucide-react';

import { BridgitAvatar } from './BridgitAvatar';

interface NavbarProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  activeTaskTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  activeTaskTitle,
}) => {
  const { openStuckModal, isSpeaking, stopSpeaking, preferences } = usePreferences();

  const navItems: { id: ActiveSection; label: string }[] = [
    { id: 'curriculum', label: 'Learning Paths' },
    { id: 'companion', label: 'AI Companion' },
    { id: 'projects', label: 'My Projects' },
    { id: 'progress', label: 'My Progress' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark with Bridgit avatar */}
          <button
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-2.5 text-slate-950 hover:text-teal-900 transition-colors shrink-0 group"
            aria-label="BridgeAI Home with Bridgit"
          >
            <BridgitAvatar size="sm" showStatus />
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold tracking-tight font-display whitespace-nowrap text-slate-950 leading-none">
                BridgeAI
              </span>
              <span className="text-[10px] font-black text-teal-800 tracking-wide mt-0.5">with Bridgit</span>
            </div>
          </button>

          {/* Zone 2: Clean single-line nav links with Learning Paths first */}
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 font-semibold ${
                    isActive
                      ? 'text-teal-900 border-teal-800 font-bold'
                      : 'border-transparent text-slate-700 hover:text-slate-950 hover:border-slate-400'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action cluster with high contrast */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="px-2.5 py-1.5 text-xs font-bold text-amber-950 bg-amber-100 border border-amber-300 rounded-lg hover:bg-amber-200 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                title="Stop audio reading"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mute speech</span>
              </button>
            )}

            <button
              onClick={() => openStuckModal()}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 border border-teal-900 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs"
              aria-label="Open I'm Stuck help"
            >
              <HelpCircle className="w-3.5 h-3.5 text-teal-200" />
              <span>I'm Stuck</span>
            </button>

            <button
              onClick={() => setActiveSection('preferences')}
              className={`p-2 rounded-lg border transition-colors shrink-0 ${
                activeSection === 'preferences'
                  ? 'bg-slate-950 text-white border-slate-950'
                  : 'text-slate-800 border-slate-300 hover:bg-slate-100 hover:text-slate-950'
              }`}
              aria-label="Learning and Accessibility Preferences"
              title="Preferences"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto py-2.5 border-t border-slate-200 no-scrollbar text-xs font-bold text-slate-700">
          <button
            onClick={() => setActiveSection('home')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg border ${
              activeSection === 'home'
                ? 'bg-slate-950 text-white border-slate-950'
                : 'bg-white text-slate-800 border-slate-300'
            }`}
          >
            Home
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg border ${
                activeSection === item.id
                  ? 'bg-teal-800 text-white border-teal-800'
                  : 'bg-white text-slate-800 border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resume Task Banner */}
      {activeTaskTitle && activeSection !== 'home' && (
        <div className="bg-slate-100 border-t border-slate-300 px-4 py-2 text-xs text-slate-800 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-slate-950 shrink-0">Current focus:</span>
            <span className="truncate font-medium text-slate-800">{activeTaskTitle}</span>
          </div>
          <button
            onClick={() => setActiveSection('home')}
            className="text-teal-900 hover:text-teal-950 underline font-bold shrink-0 ml-4"
          >
            Back to Home
          </button>
        </div>
      )}
    </header>
  );
};
