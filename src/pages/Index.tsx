
import { PointsTable } from "@/components/PointsTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">LeTim Points</h1>
          <p className="text-gray-600">
            Lleva el registro de puntos con tus amigos
          </p>
        </div>
        <PointsTable />
      </div>
    </div>
  );
};

export default Index;
