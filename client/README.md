# Mailer Dashboard - System zarządzania mailami

Nowoczesna aplikacja do zarządzania listami mailingowymi zbudowana w React 19, TypeScript i TailwindCSS.

## 🚀 Funkcjonalności

- **Nowoczesny system logowania** z walidacją Zod
- **Responsywny dashboard** z statystykami
- **Animowany background** z efektami wizualnymi
- **Kompletna obsługa błędów** formularzy
- **Testy TDD** z Vitest i React Testing Library
- **TypeScript** z pełnym typowaniem
- **TailwindCSS** z shadcn/ui komponentami

## 🛠️ Technologie

- **React 19** - Najnowsza wersja React
- **TypeScript 4** - Typowanie statyczne
- **Vite** - Szybki bundler i dev server
- **TailwindCSS 3.3.5** - Utility-first CSS framework
- **Zod** - Walidacja schematów
- **React Hook Form** - Zarządzanie formularzami
- **Lucide React** - Ikony
- **Vitest** - Framework testowy
- **React Testing Library** - Testowanie komponentów

## 📦 Instalacja

```bash
# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev

# Uruchom testy
npm run test

# Uruchom testy w trybie watch
npm run test:ui

# Uruchom testy z coverage
npm run test:coverage
```

## 🔐 Dane testowe

Aby przetestować system logowania, użyj następujących danych:

- **Email:** `admin@mailer.com`
- **Hasło:** `password123`

## 🏗️ Struktura projektu

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx      # Formularz logowania
│   │   ├── LoginCard.tsx      # Karta logowania
│   │   ├── LoginPage.tsx      # Strona logowania
│   │   └── __tests__/         # Testy komponentów auth
│   ├── dashboard/
│   │   └── Dashboard.tsx      # Dashboard po zalogowaniu
│   └── ui/                    # Komponenty UI (shadcn style)
│       ├── button.tsx
│       ├── input.tsx
│       └── label.tsx
├── hooks/
│   ├── useAuth.ts             # Custom hook autoryzacji
│   └── __tests__/             # Testy hooków
├── constants/
│   └── auth.ts                # Stałe autoryzacji
├── types/
│   └── auth.ts                # Typy TypeScript
├── schemas/
│   └── auth.ts                # Schematy walidacji Zod
├── lib/
│   └── utils.ts               # Utility functions
└── test/
    └── setup.ts               # Setup testów
```

## 🧪 Testy (TDD Approach)

Projekt wykorzystuje podejście Test-Driven Development (TDD):

```bash
# Uruchom wszystkie testy
npm run test

# Uruchom testy w trybie watch z UI
npm run test:ui

# Uruchom testy jednorazowo
npm run test:run

# Sprawdź coverage
npm run test:coverage
```

### Przykład testu:

```typescript
describe('LoginForm', () => {
  it('should show validation error for invalid email', async () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.blur(emailInput)
    
    await waitFor(() => {
      expect(screen.getByText(/email jest wymagany/i)).toBeInTheDocument()
    })
  })
})
```

## 🎨 Styling

Aplikacja używa TailwindCSS z custom design system:

- **CSS Variables** dla spójnych kolorów
- **Shadcn/ui** komponenty
- **Responsive design** dla wszystkich urządzeń
- **Dark mode ready** (przygotowane zmienne)

## 🔧 Konfiguracja

### Path Mapping
Projekt używa aliasów TypeScript:
```typescript
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
```

### TailwindCSS
Konfiguracja w `tailwind.config.ts` z custom colors i design tokens.

### Vite
Konfiguracja w `vite.config.ts` z aliasami i pluginami React.

## 📱 Responsywność

Aplikacja jest w pełni responsywna i działa na:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

```bash
# Build produkcyjny
npm run build

# Preview build
npm run preview
```

## 🤝 Contributing

1. Fork projektu
2. Stwórz feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit zmiany (`git commit -m 'Add some AmazingFeature'`)
4. Push do branch (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📄 Licencja

Ten projekt jest dostępny na licencji MIT.
