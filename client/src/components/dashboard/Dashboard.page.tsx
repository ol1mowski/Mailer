import { Mail, Users, BarChart3, Settings } from 'lucide-react'

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Wysłane maile</p>
              <p className="text-2xl font-semibold text-gray-900">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <Users className="h-6 w-6 text-cyan-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Kontakty</p>
              <p className="text-2xl font-semibold text-gray-900">567</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Otwarcia</p>
              <p className="text-2xl font-semibold text-gray-900">89%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Settings className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Szablony</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Witaj w systemie zarządzania mailami!
        </h2>
        <p className="text-gray-600 mb-6">
          Użyj nawigacji po lewej stronie, aby przejść do różnych sekcji aplikacji.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Szybkie akcje</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Wyślij nowy mail</li>
              <li>• Zarządzaj kontaktami</li>
              <li>• Sprawdź statystyki</li>
            </ul>
          </div>
          <div className="p-4 bg-cyan-50 rounded-lg">
            <h3 className="font-semibold text-cyan-900 mb-2">Ostatnie aktywności</h3>
            <ul className="text-sm text-cyan-800 space-y-1">
              <li>• Mail wysłany 2 min temu</li>
              <li>• Nowy kontakt dodany</li>
              <li>• Szablon zaktualizowany</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 