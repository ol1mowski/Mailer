import { Info } from 'lucide-react'

export const SecurityInfo = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-blue-900 mb-2">🔒 Bezpieczeństwo XSS</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>Wszystkie emaile są automatycznie zabezpieczane przed atakami XSS:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Dozwolone są tylko bezpieczne tagi HTML</li>
              <li>Wszystkie skrypty JavaScript są blokowane</li>
              <li>Atrybuty on* (onclick, onload, etc.) są usuwane</li>
              <li>Linki są sprawdzane pod kątem bezpieczeństwa</li>
              <li>Treść jest sanityzowana przed wyświetleniem</li>
            </ul>
            <p className="mt-2 text-xs opacity-75">
              Używamy biblioteki DOMPurify do zapewnienia maksymalnego bezpieczeństwa.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}