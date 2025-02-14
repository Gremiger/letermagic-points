import React from "react";
import { UserPlus, UserMinus, Plus, Minus, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Theme } from "@/types/theme";

interface PointCategory {
  id: string;
  name: string;
  points: number;
  backgroundColor: string;
  textColor: string;
}

interface PointHistory {
  id: string;
  timestamp: Date;
  categoryName: string;
  points: number;
}

interface Friend {
  id: string;
  name: string;
  points: number;
  history: PointHistory[];
}

const DEFAULT_CATEGORIES: PointCategory[] = [
  {
    id: "1",
    name: "Discord 🎮",
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
    name: "WhatsApp",
    points: 3,
    backgroundColor: "bg-[#D946EF]",
    textColor: "text-white"
  },
  {
    id: "4",
    name: "Inactividad 💀",
    points: -5,
    backgroundColor: "bg-[#DC2626]",
    textColor: "text-white"
  }
];

interface PointsTableProps {
  theme: Theme;
}

export const PointsTable = ({ theme }: PointsTableProps) => {
  const [friends, setFriends] = React.useState<Friend[]>([]);
  const [newFriendName, setNewFriendName] = React.useState("");
  const [categories, setCategories] = React.useState<PointCategory[]>(DEFAULT_CATEGORIES);
  const [newCategory, setNewCategory] = React.useState({
    name: "",
    points: 0,
  });
  const [selectedFriend, setSelectedFriend] = React.useState<Friend | null>(null);
  const { toast } = useToast();

  const addFriend = () => {
    if (!newFriendName.trim()) {
      toast({
        title: "... 🤦‍♂️",
        description: "¿Cómo vas a agregar alguien sin nombre?",
        variant: "destructive",
      });
      return;
    }
    
    const newFriend: Friend = {
      id: Date.now().toString(),
      name: newFriendName.trim(),
      points: 0,
      history: [],
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
      friends.map((friend) => {
        if (friend.id === id) {
          const newHistory: PointHistory = {
            id: Date.now().toString(),
            timestamp: new Date(),
            categoryName: category.name,
            points: category.points,
          };
          
          return {
            ...friend,
            points: friend.points + category.points,
            history: [newHistory, ...friend.history],
          };
        }
        return friend;
      })
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
            placeholder="Nombre"
            className={`flex-1 px-4 py-2 rounded-lg border ${theme.borderColor} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${theme.cardBg}`}
          />
          <button
            onClick={addFriend}
            className={`flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all animate-float`}
          >
            <UserPlus size={20} />
            Invocar Boludo
          </button>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            placeholder="Nueva categoría (ej: 'Counter 🔫')"
            className={`flex-1 px-4 py-2 rounded-lg border ${theme.borderColor} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${theme.cardBg}`}
          />
          <input
            type="number"
            value={newCategory.points || ""}
            onChange={(e) => setNewCategory({ ...newCategory, points: Number(e.target.value) })}
            placeholder="Puntos"
            className={`w-24 px-4 py-2 rounded-lg border ${theme.borderColor} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${theme.cardBg}`}
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

      <div className={`${theme.cardBg} backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border-2 ${theme.borderColor} transition-colors`}>
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
                  <button
                    onClick={() => setSelectedFriend(friend)}
                    className="hover:text-primary transition-colors hover:underline"
                  >
                    {friend.name}
                  </button>
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
                  No hay boludos todavía, agregá al menos uno, culiao.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog.Root open={!!selectedFriend} onOpenChange={() => setSelectedFriend(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn" />
          <Dialog.Content className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg ${theme.cardBg} rounded-xl shadow-lg p-6 animate-fadeIn border-2 ${theme.borderColor}`}>
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-bold">
                Historial del boludo ({selectedFriend?.name}) 📊
              </Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </Dialog.Close>
            </div>
            
            <ScrollArea className="h-[400px] pr-4">
              {selectedFriend?.history.map((entry, index) => (
                <div key={entry.id}>
                  <div className="py-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                      <span className={`font-semibold ${entry.points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {entry.points >= 0 ? "+" : ""}{entry.points} puntos
                      </span>
                    </div>
                    <div className="text-gray-700 mt-1">
                      {entry.categoryName}
                    </div>
                  </div>
                  {index < selectedFriend.history.length - 1 && (
                    <Separator />
                  )}
                </div>
              ))}
              {selectedFriend?.history.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  El boludo no tiene historial
                </div>
              )}
            </ScrollArea>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
