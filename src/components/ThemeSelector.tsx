
import React from 'react';
import { THEMES, ThemeStyle } from '@/types/theme';

interface ThemeSelectorProps {
  currentTheme: ThemeStyle;
  onThemeChange: (theme: ThemeStyle) => void;
}

export const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  return (
    <div className="absolute top-4 right-4 flex gap-2">
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onThemeChange(theme.id)}
          className={`p-2 rounded-full transition-all transform hover:scale-110 ${
            currentTheme === theme.id
              ? 'bg-white shadow-lg scale-110'
              : 'bg-white/50 hover:bg-white/80'
          }`}
          title={theme.name}
        >
          <span className="text-2xl">{theme.icon}</span>
        </button>
      ))}
    </div>
  );
};
