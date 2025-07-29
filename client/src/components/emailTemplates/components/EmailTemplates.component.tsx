import { useState } from 'react'
import { Button } from '@/components/ui'

interface EmailTemplatesProps {
  onSelectTemplate: (template: string) => void
}

const HTML_TEMPLATES = [
  {
    name: 'Podstawowy email',
    description: 'Prosty szablon z nagłówkiem i treścią',
    content: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
        <h1 style="color: #2c3e50; margin-bottom: 20px;">Witamy!</h1>
        <p>To jest przykładowa treść emaila.</p>
        <p>Możesz tutaj dodać więcej tekstu i elementów HTML.</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="font-size: 14px; color: #6c757d;">Pozdrawiamy,<br>Zespół Mailer</p>
        </div>
    </div>
</body>
</html>`
  },
  {
    name: 'Newsletter',
    description: 'Szablon newslettera z kolumnami',
    content: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #ffffff; border: 1px solid #dee2e6; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background-color: #007bff; color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Newsletter</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Najnowsze informacje i aktualności</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 20px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">Temat główny</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            
            <!-- Two columns -->
            <div style="display: flex; gap: 20px; margin: 30px 0;">
                <div style="flex: 1; background-color: #f8f9fa; padding: 20px; border-radius: 6px;">
                    <h3 style="color: #495057; margin-top: 0;">Sekcja 1</h3>
                    <p>Treść pierwszej sekcji.</p>
                </div>
                <div style="flex: 1; background-color: #f8f9fa; padding: 20px; border-radius: 6px;">
                    <h3 style="color: #495057; margin-top: 0;">Sekcja 2</h3>
                    <p>Treść drugiej sekcji.</p>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="#" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Czytaj więcej</a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #dee2e6;">
            <p style="margin: 0; font-size: 14px; color: #6c757d;">
                © 2024 Mailer. Wszystkie prawa zastrzeżone.<br>
                <a href="#" style="color: #007bff;">Wypisz się</a> | <a href="#" style="color: #007bff;">Ustawienia</a>
            </p>
        </div>
    </div>
</body>
</html>`
  },
  {
    name: 'Promocyjny',
    description: 'Szablon emaila promocyjnego z CTA',
    content: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oferta specjalna</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; border-radius: 12px; text-align: center;">
        <h1 style="margin: 0 0 20px 0; font-size: 32px;">🎉 Oferta specjalna!</h1>
        <p style="font-size: 18px; margin-bottom: 30px; opacity: 0.9;">Nie przegap tej wyjątkowej okazji!</p>
        
        <div style="background-color: rgba(255,255,255,0.1); padding: 30px; border-radius: 8px; margin: 30px 0;">
            <h2 style="margin: 0 0 15px 0; font-size: 24px;">-50% na wszystko</h2>
            <p style="font-size: 16px; margin-bottom: 25px;">Tylko przez ograniczony czas możesz skorzystać z naszej specjalnej oferty.</p>
            
            <div style="background-color: #ff6b6b; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0; font-weight: bold; font-size: 18px;">Oferta ważna do: 31.12.2024</p>
            </div>
            
            <a href="#" style="background-color: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; margin: 20px 0;">Skorzystaj z oferty</a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">
                * Oferta ważna tylko dla zarejestrowanych użytkowników<br>
                <a href="#" style="color: white; text-decoration: underline;">Regulamin</a> | <a href="#" style="color: white; text-decoration: underline;">Wypisz się</a>
            </p>
        </div>
    </div>
</body>
</html>`
  },
  {
    name: 'Potwierdzenie',
    description: 'Szablon emaila potwierdzającego',
    content: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Potwierdzenie</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #ffffff; border: 1px solid #dee2e6; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background-color: #28a745; color: white; padding: 30px 20px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">✓</div>
            <h1 style="margin: 0; font-size: 24px;">Potwierdzenie</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 20px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">Dziękujemy!</h2>
            <p>Twoja operacja została pomyślnie zrealizowana.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #28a745;">
                <h3 style="margin: 0 0 10px 0; color: #495057;">Szczegóły:</h3>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Data: <strong>${new Date().toLocaleDateString('pl-PL')}</strong></li>
                    <li>Status: <strong style="color: #28a745;">Zatwierdzony</strong></li>
                    <li>Numer referencyjny: <strong>#${Math.random().toString(36).substr(2, 9).toUpperCase()}</strong></li>
                </ul>
            </div>
            
            <p>Jeśli masz pytania, skontaktuj się z naszym zespołem wsparcia.</p>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="#" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Przejdź do panelu</a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #dee2e6;">
            <p style="margin: 0; font-size: 14px; color: #6c757d;">
                Ten email został wysłany automatycznie.<br>
                Nie odpowiadaj na ten adres email.
            </p>
        </div>
    </div>
</body>
</html>`
  }
]

export const EmailTemplates = ({ onSelectTemplate }: EmailTemplatesProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectTemplate = (template: string) => {
    onSelectTemplate(template)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        📋 Szablony HTML
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Wybierz szablon</h3>
            <p className="text-sm text-gray-600">Kliknij na szablon aby go załadować</p>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {HTML_TEMPLATES.map((template, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleSelectTemplate(template.content)}
              >
                <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.description}</p>
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