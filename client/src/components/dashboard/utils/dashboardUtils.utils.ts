
export const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

export const formatPercentage = (num: number): string => {
  return `${num}%`
}

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return 'teraz';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min temu`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} godz. temu`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} dni temu`;
  }
}

export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    success: 'text-green-600',
    info: 'text-blue-600',
    warning: 'text-yellow-600',
    error: 'text-red-600'
  }
  return colorMap[status] || 'text-gray-600'
}

export const getStatusBgColor = (status: string): string => {
  const bgColorMap: Record<string, string> = {
    success: 'bg-green-50',
    info: 'bg-blue-50',
    warning: 'bg-yellow-50',
    error: 'bg-red-50'
  }
  return bgColorMap[status] || 'bg-gray-50'
}

export const getStatusBorderColor = (status: string): string => {
  const borderColorMap: Record<string, string> = {
    success: 'border-green-200',
    info: 'border-blue-200',
    warning: 'border-yellow-200',
    error: 'border-red-200'
  }
  return borderColorMap[status] || 'border-gray-200'
} 