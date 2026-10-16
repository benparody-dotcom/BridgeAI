import React from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { Check, X } from 'lucide-react';
import { BridgitAvatar } from './BridgitAvatar';

const WORK_ROLES = [
  'HR',
  'Marketing',
  'Operations',
  'Customer Support',
  'Education',
  'Other',
];

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, closeOnboarding, preferences, updatePreferences } = usePreferences();

  if (!isOnboardingOpen) return null;

  const handleSelectRole = (role: string) => {
    updatePreferences({
      workRole: role,
      hasCompletedOnboarding: true,
    });
    closeOnboarding();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-300 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header with Bridgit the Beaver */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-slate-200 bg-teal-50">
          <div className="flex items-center gap-3.5">
            <BridgitAvatar size="md" showStatus />
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                <span>Meet Bridgit</span>
                <span aria-hidden="true">·</span>
                <span>Your BridgeAI Guide</span>
              </p>
              <h2 id="onboarding-title" className="text-xl font-extrabold text-slate-950">
                What kind of work do you do?
              </h2>
            </div>
          </div>
          <button
            onClick={closeOnboarding}
            className="p-1.5 text-slate-600 hover:text-slate-950 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Skip question"
            title="Skip for now"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm font-medium text-slate-700">
            This helps us tailor workplace examples and suggestions to your daily tasks. You can
            change this anytime in Preferences.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {WORK_ROLES.map((role) => {
              const isSelected = preferences.workRole === role;
              return (
                <button
                  key={role}
                  onClick={() => handleSelectRole(role)}
                  className={`p-3.5 rounded-xl border-2 font-bold text-sm transition-all flex items-center justify-between shadow-xs ${
                    isSelected
                      ? 'border-teal-800 bg-teal-100 text-teal-950 ring-2 ring-teal-800'
                      : 'border-slate-300 bg-white hover:border-slate-500 hover:bg-slate-50 text-slate-950'
                  }`}
                >
                  <span>{role}</span>
                  {isSelected && <Check className="w-4 h-4 text-teal-800 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t-2 border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>You can always update this in Preferences.</span>
          <button
            onClick={closeOnboarding}
            className="text-slate-600 hover:text-slate-950 underline font-bold"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};
