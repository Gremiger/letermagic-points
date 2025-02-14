
export type ThemeStyle = 'meme' | 'modern' | 'minecraft' | 'batman';

export interface Theme {
  id: ThemeStyle;
  name: string;
  icon: string;
  bgGradient: string;
  cardBg: string;
  borderColor: string;
  titleGradient: string;
}

export const THEMES: Theme[] = [
  {
    id: 'meme',
    name: 'Modo Memero',
    icon: '🤣',
    bgGradient: 'from-[#9b87f5] via-[#D946EF] to-[#F97316]',
    cardBg: 'bg-white bg-opacity-90',
    borderColor: 'border-primary hover:border-[#D946EF]',
    titleGradient: 'from-primary to-[#D946EF]'
  },
  {
    id: 'modern',
    name: 'Sobrio y Moderno',
    icon: '🎯',
    bgGradient: 'from-[#F1F0FB] via-[#F2FCE2] to-[#8E9196]',
    cardBg: 'bg-white bg-opacity-95',
    borderColor: 'border-gray-200 hover:border-gray-300',
    titleGradient: 'from-gray-700 to-gray-900'
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    icon: '⛏️',
    bgGradient: 'from-[#7FB238] via-[#5C4033] to-[#4A7023]',
    cardBg: 'bg-[#8B8B8B] bg-opacity-90',
    borderColor: 'border-[#373737] hover:border-[#7FB238]',
    titleGradient: 'from-[#7FB238] to-[#4A7023]'
  },
  {
    id: 'batman',
    name: 'Batman',
    icon: '🦇',
    bgGradient: 'from-[#1A1F2C] via-[#403E43] to-black',
    cardBg: 'bg-[#2D2D2D] bg-opacity-95',
    borderColor: 'border-yellow-500 hover:border-yellow-400',
    titleGradient: 'from-yellow-500 to-yellow-400'
  }
];
