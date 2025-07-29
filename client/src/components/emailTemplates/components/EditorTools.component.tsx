import { useState } from 'react'
import { Button } from '@/components/ui'

interface EditorToolsProps {
  onInsertCode: (code: string) => void
}

const HTML_SNIPPETS = [
  {
    name: 'Nagłówek H1',
    code: '<h1 style="color: #2c3e50; margin-bottom: 20px;">Tytuł główny</h1>'
  },
  {
    name: 'Nagłówek H2',
    code: '<h2 style="color: #34495e; margin-bottom: 15px;">Podtytuł</h2>'
  },
  {
    name: 'Paragraf',
    code: '<p style="margin-bottom: 15px; line-height: 1.6;">Treść paragrafu.</p>'
  },
  {
    name: 'Link',
    code: '<a href="#" style="color: #007bff; text-decoration: underline;">Link tekst</a>'
  },
  {
    name: 'Przycisk',
    code: '<a href="#" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Kliknij tutaj</a>'
  },
  {
    name: 'Lista numerowana',
    code: `<ol style="margin: 15px 0; padding-left: 20px;">
  <li>Pierwszy element</li>
  <li>Drugi element</li>
  <li>Trzeci element</li>
</ol>`
  },
  {
    name: 'Lista punktowana',
    code: `<ul style="margin: 15px 0; padding-left: 20px;">
  <li>Pierwszy element</li>
  <li>Drugi element</li>
  <li>Trzeci element</li>
</ul>`
  },
  {
    name: 'Tabela',
    code: `<table style="border-collapse: collapse; width: 100%; margin: 15px 0;">
  <thead>
    <tr>
      <th style="border: 1px solid #dee2e6; padding: 8px; background-color: #f8f9fa;">Nagłówek 1</th>
      <th style="border: 1px solid #dee2e6; padding: 8px; background-color: #f8f9fa;">Nagłówek 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #dee2e6; padding: 8px;">Komórka 1</td>
      <td style="border: 1px solid #dee2e6; padding: 8px;">Komórka 2</td>
    </tr>
  </tbody>
</table>`
  },
  {
    name: 'Kontener z tłem',
    code: '<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">Treść w kontenerze</div>'
  },
  {
    name: 'Separator',
    code: '<hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">'
  },
  {
    name: 'Cytat',
    code: '<blockquote style="margin: 15px 0; padding: 10px 15px; border-left: 4px solid #007bff; background-color: #f8f9fa; font-style: italic;">Treść cytatu</blockquote>'
  },
  {
    name: 'Kod',
    code: '<code style="background-color: #f8f9fa; padding: 2px 4px; border-radius: 3px; font-family: monospace;">kod</code>'
  }
]

export const EditorTools = ({ onInsertCode }: EditorToolsProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleInsertSnippet = (code: string) => {
    onInsertCode(code)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        🔧 Narzędzia
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Wstaw element HTML</h3>
            <p className="text-sm text-gray-600">Kliknij aby wstawić gotowy kod</p>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {HTML_SNIPPETS.map((snippet, index) => (
              <div
                key={index}
                className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleInsertSnippet(snippet.code)}
              >
                <h4 className="font-medium text-gray-900 text-sm">{snippet.name}</h4>
                <p className="text-xs text-gray-500 mt-1 truncate">{snippet.code}</p>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Zamknij
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}