
import React from "react";
import { UserPlus, UserMinus, Plus, Minus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PointCategory {
  id: string;
  name: string;
  points: number;
  backgroundColor: string;
  textColor: string;
}

interface Friend {
  id: string;
  name: string;
  points: number;
}

const DEFAULT_CATEGORIES: PointCategory[] = [
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

export const PointsTable = () => {
  const [friends, setFriends] = React.useState<Friend[]>([]);
  const [newFriendName, setNewFriendName] = React.useState("");
  const [categories, setCategories] = React.useState<PointCategory[]>(DEFAULT_CATEGORIES);
  const [newCategory, setNewCategory] = React.useState({
    name: "",
    points: 0,
  });
  const { toast } = useToast();

  const addFriend = () => {
    if (!newFriendName.trim()) {
      toast({
        title: "Bruh... 🤦‍♂️",
        description: "¿Cómo vas a agregar alguien sin nombre?",
        variant: "destructive",
      });
      return;
    }
    
    const newFriend: Friend = {
      id: Date.now().toString(),
      name: newFriendName.trim(),
      points: 0,
    };
    
    setFriends([...friends, newFriend]);
    setNewFriendName("");
    toast({
      title: "¡GO GO GO! 🚀",
      description: `${newFriend.name} ha sido invocado a la tabla`,
    });
  };

  const addCategory = () => {
    if (!newCategory.name.trim() || !newCategory.points) {
      toast({
        title: "Error 404: Cerebro no encontrado",
        description: "Necesitas un nombre y puntos para la categoría",
        variant: "destructive",
      });
      return;
    }

    const randomColors = [
      { bg: "bg-[#8B5CF6]", text: "text-white" },
      { bg: "bg-[#F97316]", text: "text-white" },
      { bg: "bg-[#D946EF]", text: "text-white" },
      { bg: "bg-[#0EA5E9]", text: "text-white" },
    ];
    
    const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    
    const newCat: PointCategory = {
      id: Date.now().toString(),
      name: newCategory.name.trim(),
      points: newCategory.points,
      backgroundColor: randomColor.bg,
      textColor: randomColor.text,
    };
    
    setCategories([...categories, newCat]);
    setNewCategory({ name: "", points: 0 });
    toast({
      title: "¡Nueva categoría desbloqueada! 🎉",
      description: `${newCat.name} ahora es parte del multiverso`,
    });
  };

  const removeCategory = (id: string) => {
    const category = categories.find(c => c.id === id);
    if (categories.length <= 1) {
      toast({
        title: "¡No no no! 🙅‍♂️",
        description: "Necesitas al menos una categoría, ¡no seas así!",
        variant: "destructive",
      });
      return;
    }
    setCategories(categories.filter(c => c.id !== id));
    if (category) {
      toast({
        title: "F en el chat",
        description: `${category.name} ha sido enviado al shadow realm`,
      });
    }
  };

  const removeFriend = (id: string) => {
    const friend = friends.find(f => f.id === id);
    setFriends(friends.filter((f) => f.id !== id));
    if (friend) {
      toast({
        title: "RIP 💀",
        description: `${friend.name} ha sido eliminado de la existencia`,
      });
    }
  };

  const updatePoints = (id: string, categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    setFriends(
      friends.map((friend) =>
        friend.id === id
          ? { ...friend, points: friend.points + category.points }
          : friend
      )
    );
    
    const friend = friends.find(f => f.id === id);
    if (friend) {
      toast({
        title: category.points > 0 ? "¡STONKS! 📈" : "NOT STONKS 📉",
        description: `${category.points} puntos para ${friend.name} por ${category.name}`,
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
            placeholder="Nombre del amigo"
            className="flex-1 px-4 py-2 rounded-lg border border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white bg-opacity-90"
          />
          <button
            onClick={addFriend}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all animate-float"
          >
            <UserPlus size={20} />
            Invocar Amigo
          </button>
        </div>

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
            onClick={addCategory}
            className="flex items-center gap-2 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-opacity-90 transition-all animate-float"
          >
            <Plus size={20} />
            Nueva Categoría
          </button>
        </div>
      </div>

      <div className="bg-white bg-opacity-75 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border-2 border-primary hover:border-[#D946EF] transition-colors">
        <table className="w-full">
          <thead className="bg-primary bg-opacity-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Puntos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {friends.map((friend) => (
              <tr key={friend.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {friend.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`font-bold ${friend.points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {friend.points}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center gap-1">
                        <button
                          onClick={() => updatePoints(friend.id, category.id)}
                          className={`px-3 py-1 ${category.backgroundColor} ${category.textColor} rounded-full text-xs hover:opacity-90 transition-all transform hover:scale-105`}
                        >
                          {category.name} {category.points >= 0 ? "+" : ""}{category.points}
                        </button>
                        <button
                          onClick={() => removeCategory(category.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => removeFriend(friend.id)}
                    className="text-red-600 hover:text-red-900 transition-colors transform hover:scale-110"
                  >
                    <UserMinus size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {friends.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  ¡Forever Alone! 🥺 Agrega amigos para empezar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
