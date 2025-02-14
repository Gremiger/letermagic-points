
import { Plus, Trash2 } from "lucide-react";
import { PointCategory } from "@/types/points";

interface CategoryManagerProps {
  categories: PointCategory[];
  onAddCategory: (name: string, points: number) => void;
  onRemoveCategory: (id: string) => void;
}

export const CategoryManager = ({ categories, onAddCategory, onRemoveCategory }: CategoryManagerProps) => {
  const [newCategory, setNewCategory] = React.useState({
    name: "",
    points: 0,
  });

  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={newCategory.name}
        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
        placeholder="Nueva categoría (ej: 'Raid Boss 🗡️')"
        className="flex-1 px-4 py-2 rounded-lg border border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white bg-opacity-90"
      />
      <input
        type="number"
        value={newCategory.points || ""}
        onChange={(e) => setNewCategory({ ...newCategory, points: Number(e.target.value) })}
        placeholder="Puntos"
        className="w-24 px-4 py-2 rounded-lg border border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white bg-opacity-90"
      />
      <button
        onClick={() => {
          onAddCategory(newCategory.name, newCategory.points);
          setNewCategory({ name: "", points: 0 });
        }}
        className="flex items-center gap-2 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-opacity-90 transition-all animate-float"
      >
        <Plus size={20} />
        Nueva Categoría
      </button>
    </div>
  );
};
