
import { Badge } from "@components/ui/badge";

interface StatusBadgeProps {
  status: 'Active' | 'Blocked';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const isActive = status === 'Active';

  return (
    <Badge 
      variant="outline" 
      className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 w-max
        ${isActive 
          ? 'bg-green-50 text-green-700 border-green-200' 
          : 'bg-red-50 text-red-700 border-red-200'
        }`}
    >
      {/* The little colored dot */}
      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-600' : 'bg-red-600'}`} />
      {status.toUpperCase()}
    </Badge>
  );
};

export default StatusBadge;