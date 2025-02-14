
import React from "react";
import { UserPlus, UserMinus, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Friend {
  id: string;
  name: string;
  points: number;
}

export const PointsTable = () => {
  const [friends, setFriends] = React.useState<Friend[]>([]);
  const [newFriendName, setNewFriendName] = React.useState("");
  const { toast } = useToast();

  const addFriend = () => {
    if (!newFriendName.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un nombre",
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
      title: "¡Amigo agregado!",
      description: `${newFriend.name} ha sido agregado a la tabla`,
    });
  };

  const removeFriend = (id: string) => {
    const friend = friends.find(f => f.id === id);
    setFriends(friends.filter((f) => f.id !== id));
    if (friend) {
      toast({
        title: "Amigo eliminado",
        description: `${friend.name} ha sido eliminado de la tabla`,
      });
    }
  };

  const updatePoints = (id: string, amount: number, reason: string) => {
    setFriends(
      friends.map((friend) =>
        friend.id === id
          ? { ...friend, points: friend.points + amount }
          : friend
      )
    );
    
    const friend = friends.find(f => f.id === id);
    if (friend) {
      toast({
        title: `Puntos ${amount > 0 ? "agregados" : "restados"}`,
        description: `${amount} puntos ${amount > 0 ? "agregados" : "restados"} a ${friend.name} por ${reason}`,
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 animate-fadeIn">
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={newFriendName}
          onChange={(e) => setNewFriendName(e.target.value)}
          placeholder="Nombre del amigo"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        <button
          onClick={addFriend}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
        >
          <UserPlus size={20} />
          Agregar
        </button>
      </div>

      <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {friend.points}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updatePoints(friend.id, 5, "Discord")}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs hover:bg-green-200 transition-colors"
                    >
                      Discord +5
                    </button>
                    <button
                      onClick={() => updatePoints(friend.id, 10, "Juntada")}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200 transition-colors"
                    >
                      Juntada +10
                    </button>
                    <button
                      onClick={() => updatePoints(friend.id, 3, "WhatsApp")}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs hover:bg-purple-200 transition-colors"
                    >
                      WhatsApp +3
                    </button>
                    <button
                      onClick={() => updatePoints(friend.id, -5, "Inactividad")}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs hover:bg-red-200 transition-colors"
                    >
                      Inactivo -5
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => removeFriend(friend.id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                  >
                    <UserMinus size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {friends.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No hay amigos en la tabla todavía. ¡Agrega algunos!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
