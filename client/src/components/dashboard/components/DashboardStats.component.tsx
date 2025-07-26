import { Mail, Users, BarChart3, Settings } from 'lucide-react';
import { Card } from '@/components/ui';
import type { DashboardStats } from '../types/dashboard.types';
import { formatNumber, formatPercentage } from '../utils/dashboardUtils.utils';

interface DashboardStatsProps {
  stats: DashboardStats | null;
  isLoading?: boolean;
}

export const DashboardStatsComponent = ({ stats, isLoading = false }: DashboardStatsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <div className="h-6 w-6 bg-gray-300 rounded" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Brak danych</p>
                <p className="text-2xl font-semibold text-gray-300">-</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Wysłane maile</p>
            <p className="text-2xl font-semibold text-gray-900">{formatNumber(stats.sentEmails)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <Users className="h-6 w-6 text-cyan-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Kontakty</p>
            <p className="text-2xl font-semibold text-gray-900">{formatNumber(stats.contacts)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BarChart3 className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Otwarcia</p>
            <p className="text-2xl font-semibold text-gray-900">{formatPercentage(stats.openRate)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Settings className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Szablony</p>
            <p className="text-2xl font-semibold text-gray-900">{formatNumber(stats.templates)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}; 