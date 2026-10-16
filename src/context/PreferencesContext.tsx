import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserPreferences, GuidanceLevel, InstructionDepth, TextSize } from '../types';

interface PreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isStuckModalOpen: boolean;
  openStuckModal: (contextText?: string) => void;
  closeStuckModal: () => void;
  stuckContextText: string;
  isOnboardingOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
}

const defaultPreferences: UserPreferences = {
  guidanceLevel: 'guided',
  instructionDepth: 'short',
  textSize: 'standard',
  highContrast: false,
  dyslexiaFriendly: false,
  reducedMotion: false,
  readAloudEnabled: false,
  speechRate: 1.0,
  persistentStuckButton: true,
  workRole: undefined,
  hasCompletedOnboarding: false,
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('bridgeai_preferences');
      if (saved) {
        return { ...defaultPreferences, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return defaultPreferences;
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isStuckModalOpen, setIsStuckModalOpen] = useState(false);
  const [stuckContextText, setStuckContextText] = useState('');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => {
    return !preferences.hasCompletedOnboarding && !preferences.workRole;
  });

  const openOnboarding = () => setIsOnboardingOpen(true);
  const closeOnboarding = () => setIsOnboardingOpen(false);

  // Synchronize DOM attributes with accessibility preferences
  useEffect(() => {
    try {
      localStorage.setItem('bridgeai_preferences', JSON.stringify(preferences));
    } catch {
      // ignore
    }

    const root = document.documentElement;
    root.setAttribute('data-text-size', preferences.textSize);
    root.setAttribute('data-contrast', preferences.highContrast ? 'high' : 'standard');
    root.setAttribute('data-dyslexia', preferences.dyslexiaFriendly ? 'true' : 'false');
  }, [preferences]);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean markdown asterisks or special characters for pleasant speech
    const clean = text
      .replace(/[*_#`]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .trim();

    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = preferences.speechRate;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const openStuckModal = (contextText?: string) => {
    if (contextText) setStuckContextText(contextText);
    setIsStuckModalOpen(true);
  };

  const closeStuckModal = () => {
    setIsStuckModalOpen(false);
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        resetPreferences,
        speakText,
        stopSpeaking,
        isSpeaking,
        isStuckModalOpen,
        openStuckModal,
        closeStuckModal,
        stuckContextText,
        isOnboardingOpen,
        openOnboarding,
        closeOnboarding,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
