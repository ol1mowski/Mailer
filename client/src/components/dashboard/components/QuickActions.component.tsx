import { Mail, Users, BarChart3, FileText } from 'lucide-react';
import { Card } from '@/components/ui';
import { Link } from 'react-router-dom';
import type { QuickAction } from '../types/dashboard.types';

interface QuickActionsProps {
  actions: QuickAction[];
}

export const QuickActionsComponent = ({ actions }: QuickActionsProps) => {
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      Mail,
      Users,
      BarChart3,
      FileText
    };
    return iconMap[iconName] || Mail;
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-blue-900 mb-2">Szybkie akcje</h3>
      <ul className="text-sm text-blue-800 space-y-1">
        {actions.map(action => {
          const Icon = getIcon(action.icon);
          return (
            <li 
              key={action.id} 
              className="flex items-center space-x-2 cursor-pointer hover:bg-blue-50 p-2 rounded transition-colors"
            >
              <Link to={action.href} className="flex items-center space-x-2">
                <Icon className="h-4 w-4" />
                <span className="text-blue-800 hover:underline">{action.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}; 