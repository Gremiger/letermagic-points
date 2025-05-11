
import React, { useState, useEffect } from "react";
import { PointsTable } from "@/components/PointsTable";
import { ThemeSelector } from "@/components/ThemeSelector";
import { THEMES, ThemeStyle } from "@/types/theme";

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeStyle>('modern');
  const [showAnimation, setShowAnimation] = useState(false);
  const theme = THEMES.find(t => t.id === currentTheme) || THEMES[0];

  useEffect(() => {
    // Add a subtle animation when theme changes
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, [currentTheme]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} p-8 transition-colors duration-500 ${showAnimation ? 'animate-fadeIn' : ''}`}>
      <ThemeSelector
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <div className={`text-center space-y-2 ${theme.cardBg} backdrop-blur-lg rounded-xl p-6 shadow-lg border-2 ${theme.borderColor} transition-all duration-500`}>
          <h1 className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${theme.titleGradient} transition-colors duration-500`}>
            LeTim Points 🏆
          </h1>
          <p className="text-gray-600">
            El sistema de puntos de LeTim 🌌
          </p>
        </div>
        <PointsTable theme={theme} />
      </div>
    </div>
  );
};

export default Index;
