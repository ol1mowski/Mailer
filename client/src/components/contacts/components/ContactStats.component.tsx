import { User, Mail, Tag, UserX } from 'lucide-react';
import { Card } from '@/components/ui';
import type { ContactStats } from '../types/contact.types';

interface ContactStatsProps {
  stats: ContactStats;
  isLoading?: boolean;
}

export const ContactStatsComponent = ({ stats, isLoading = false }: ContactStatsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-200 rounded mr-3 animate-pulse" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center">
          <User className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Wszystkie</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Mail className="h-8 w-8 text-green-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Aktywne</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <UserX className="h-8 w-8 text-red-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Nieaktywne</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.inactive}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Tag className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">VIP</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.vip}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}; 