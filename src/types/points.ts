
export interface PointCategory {
  id: string;
  name: string;
  points: number;
  backgroundColor: string;
  textColor: string;
}

export interface PointHistory {
  id: string;
  timestamp: Date;
  categoryName: string;
  points: number;
}

export interface Friend {
  id: string;
  name: string;
  points: number;
  history: PointHistory[];
}

export const DEFAULT_CATEGORIES: PointCategory[] = [
  {
    id: "1",
    name: "Discord Gaming 🎮",
    points: 5,
    backgroundColor: "bg-[#8B5CF6]",
    textColor: "text-white"
  },
  {
    id: "2",
    name: "Juntada IRL 🍺",
    points: 10,
    backgroundColor: "bg-[#F97316]",
    textColor: "text-white"
  },
  {
    id: "3",
    name: "WhatsApp Memes 🤣",
    points: 3,
    backgroundColor: "bg-[#D946EF]",
    textColor: "text-white"
  },
  {
    id: "4",
    name: "F por Inactividad 💀",
    points: -5,
    backgroundColor: "bg-[#DC2626]",
    textColor: "text-white"
  }
];
