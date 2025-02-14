
import { PointsTable } from "@/components/PointsTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5] via-[#D946EF] to-[#F97316] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2 bg-white bg-opacity-90 backdrop-blur-lg rounded-xl p-6 shadow-lg border-2 border-primary hover:border-[#D946EF] transition-colors">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#D946EF]">
            LeTim Points 🏆
          </h1>
          <p className="text-gray-600">
            El sistema de puntos más memero del multiverso 🌌
          </p>
        </div>
        <PointsTable />
      </div>
    </div>
  );
};

export default Index;
