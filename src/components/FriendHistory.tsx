
import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Friend } from "@/types/points";

interface FriendHistoryProps {
  friend: Friend | null;
  onClose: () => void;
}

export const FriendHistory = ({ friend, onClose }: FriendHistoryProps) => {
  if (!friend) return null;

  return (
    <Dialog.Root open={!!friend} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">
              Historial de {friend.name} 📊
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </Dialog.Close>
          </div>
          
          <ScrollArea className="h-[400px] pr-4">
            {friend.history.map((entry, index) => (
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
                {index < friend.history.length - 1 && (
                  <Separator />
                )}
              </div>
            ))}
            {friend.history.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No hay historial todavía 😴
              </div>
            )}
          </ScrollArea>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
