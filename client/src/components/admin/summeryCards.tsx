import { Card, CardContent } from "@components/ui/card";
import { Users, UserCheck, UserX } from "lucide-react";

interface StatCardsProps {
  stats: {
    total: number;
    active: number;
    blocked: number;
  };
}

const StatCards = ({ stats }: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Users Card */}
      <Card className="border-l-4 border-l-blue-500 shadow-sm m-3">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <h3 className="text-2xl font-bold text-slate-900">{stats.total}</h3>
          </div>
        </CardContent>
      </Card>

      {/* Active Users Card */}
      <Card className="border-l-4 border-l-green-500 shadow-sm m-3">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Users</p>
            <h3 className="text-2xl font-bold text-slate-900">{stats.active}</h3>
          </div>
        </CardContent>
      </Card>

      {/* Blocked Users Card */}
      <Card className="border-l-4 border-l-red-500 shadow-sm m-3">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Blocked Users</p>
            <h3 className="text-2xl font-bold text-slate-900">{stats.blocked}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;