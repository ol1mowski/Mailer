# Mailer - System Zarządzania Emailami

Kompletny system zarządzania emailami z autentykacją JWT i HTTP-only cookies.

## Dashboard
<img width="1916" height="942" alt="1" src="https://github.com/user-attachments/assets/690643fa-6039-47eb-b035-74e97dfb54ba" />

## System zarządzania kampaniami
<img width="1901" height="942" alt="2" src="https://github.com/user-attachments/assets/0faf3f67-80b8-48c0-9d83-e0a845fa0846" />

## System edycji maila
<img width="1227" height="874" alt="3" src="https://github.com/user-attachments/assets/d3eb9440-7408-44b6-9512-89b168a0add5" />


## 🚀 Funkcjonalności

- **Autentykacja JWT** z HTTP-only cookies dla bezpieczeństwa
- **Spring Boot Backend** z bazą H2
- **React Frontend** z TypeScript i TailwindCSS
- **React Query** do zarządzania stanem i cache'owaniem
- **Walidacja** po stronie serwera i klienta
- **Obsługa błędów** z powiadomieniami toast

## 🛠️ Technologie

### Backend
- Spring Boot 3.5.3
- Spring Security z JWT
- Spring Data JPA
- PostgreSQL Database
- Maven
- Springdoc OpenAPI (Swagger) - Dokumentacja API

### Frontend
- React 19.1
- TypeScript
- TailwindCSS
- React Query (TanStack Query)
- React Hot Toast
- Lucide React (ikony)

## 📋 Wymagania

- Java 17+
- Node.js 20+
- npm lub yarn

## 🚀 Uruchomienie

### 1. Backend (Spring Boot)

```bash
cd server
./mvnw spring-boot:run
```

Backend będzie dostępny pod adresem: `http://localhost:8080`

### 2. Frontend (React)

```bash
cd client
npm install
npm run dev
```

Frontend będzie dostępny pod adresem: `http://localhost:5173` (lub 5174 jeśli 5173 jest zajęty)

## 🔐 Dane testowe

System automatycznie tworzy testowych użytkowników przy pierwszym uruchomieniu:

- **Admin**: `admin@mailer.com` / `password123`
- **User**: `user@mailer.com` / `password123`

## 📚 Dokumentacja API (Swagger)

System posiada kompletną dokumentację API wykorzystującą Swagger/OpenAPI 3.0. Dokumentacja umożliwia interaktywne testowanie wszystkich endpointów bezpośrednio z przeglądarki.

### Dostęp do dokumentacji Swagger

Po uruchomieniu serwera backend, dokumentacja jest dostępna pod adresami:

- **Swagger UI**: `http://localhost:8080/api/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/api/docs`

### Funkcjonalności dokumentacji

- **Interaktywne testowanie** wszystkich endpointów
- **Autoryzacja JWT** bezpośrednio z interfejsu
- **Kompletne opisy** parametrów i odpowiedzi
- **Grupowanie** endpointów według funkcjonalności
- **Przykładowe wartości** dla wszystkich struktur danych

### Jak korzystać ze Swagger UI

1. Uruchom serwer backend (`./mvnw spring-boot:run`)
2. Otwórz `http://localhost:8080/api/swagger-ui.html`
3. Zarejestruj się lub zaloguj przez endpoint `/api/auth/register` lub `/api/auth/login`
4. Skopiuj otrzymany JWT token
5. Kliknij przycisk **"Authorize"** w górnej części strony
6. Wprowadź token w formacie: `Bearer <your-jwt-token>`
7. Teraz możesz testować wszystkie chronione endpointy

## 📡 API Endpoints

### Autentykacja (`/api/auth`)
- `POST /api/auth/register` - Rejestracja nowego użytkownika
- `POST /api/auth/login` - Logowanie użytkownika
- `POST /api/auth/logout` - Wylogowanie użytkownika
- `GET /api/auth/me` - Pobieranie danych aktualnego użytkownika

### Zarządzanie Kontaktami (`/api/contacts`)
- `GET /api/contacts` - Lista wszystkich kontaktów
- `POST /api/contacts` - Tworzenie nowego kontaktu
- `PUT /api/contacts/{id}` - Aktualizacja kontaktu
- `DELETE /api/contacts/{id}` - Usuwanie kontaktu
- `GET /api/contacts/stats` - Statystyki kontaktów
- `GET /api/contacts/tags` - Dostępne tagi
- `POST /api/contacts/import` - Import wielu kontaktów

### Kampanie Emailowe (`/api/campaigns`)
- `GET /api/campaigns` - Lista kampanii
- `POST /api/campaigns` - Tworzenie nowej kampanii
- `PUT /api/campaigns/{id}` - Aktualizacja kampanii
- `DELETE /api/campaigns/{id}` - Usuwanie kampanii
- `POST /api/campaigns/{id}/start` - Uruchamianie kampanii
- `POST /api/campaigns/{id}/pause` - Wstrzymywanie kampanii
- `POST /api/campaigns/{id}/complete` - Kończenie kampanii

### Szablony Email (`/api/email-templates`)
- `GET /api/email-templates` - Lista szablonów
- `POST /api/email-templates` - Tworzenie szablonu
- `PUT /api/email-templates/{id}` - Aktualizacja szablonu
- `DELETE /api/email-templates/{id}` - Usuwanie szablonu

### Przykłady użycia

#### Logowanie
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mailer.com","password":"password123"}'
```

#### Sprawdzanie aktualnego użytkownika
```bash
curl -X GET http://localhost:8080/api/auth/me \
  -H "Cookie: auth-token=YOUR_JWT_TOKEN"
```

## 🔧 Konfiguracja

### Backend (application.properties)
```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/mailerdb
spring.datasource.driver-class-name=org.postgresql.Driver

# JWT
jwt.secret=your-super-secret-jwt-key
jwt.expiration=86400000
jwt.cookie-name=auth-token

# Swagger/OpenAPI Configuration
springdoc.api-docs.path=/api/docs
springdoc.swagger-ui.path=/api/swagger-ui.html
springdoc.swagger-ui.operationsSorter=method
springdoc.swagger-ui.tagsSorter=alpha
springdoc.swagger-ui.tryItOutEnabled=true

# CORS
spring.web.cors.allowed-origins=http://localhost:5173
```

### Frontend (lib/api.ts)
```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

## 🏗️ Architektura

### Backend
```
src/main/java/maile/com/example/mailer/
├── config/
│   ├── SecurityConfig.java          # Konfiguracja Spring Security
│   ├── OpenApiConfig.java           # Konfiguracja Swagger/OpenAPI
│   └── DataInitializer.java         # Inicjalizacja danych testowych
├── controller/
│   └── AuthController.java          # Endpointy autentykacji
├── dto/
│   ├── LoginRequest.java            # DTO logowania
│   ├── RegisterRequest.java         # DTO rejestracji
│   └── AuthResponse.java            # DTO odpowiedzi
├── entity/
│   └── User.java                    # Encja użytkownika
├── repository/
│   └── UserRepository.java          # Repository użytkowników
├── security/
│   └── JwtAuthenticationFilter.java # Filtr JWT
├── service/
│   ├── AuthService.java             # Serwis autentykacji
│   ├── JwtService.java              # Serwis JWT
│   └── CustomUserDetailsService.java # Serwis użytkowników
└── exception/
    └── GlobalExceptionHandler.java  # Globalny handler błędów
```

### Frontend
```
src/
├── components/
│   ├── auth/
│   │   ├── LoginPage.page.tsx       # Strona logowania
│   │   └── components/
│   │       └── LoginForm.component.tsx
│   └── dashboard/
│       └── Dashboard.page.tsx       # Panel główny
├── hooks/
│   └── useAuth.hook.ts              # Hook autentykacji
├── lib/
│   ├── api.ts                       # Klient API
│   └── queryClient.ts               # Konfiguracja React Query
├── providers/
│   └── AuthProvider.tsx             # Provider autentykacji
└── App.tsx                          # Główny komponent
```

## 🔒 Bezpieczeństwo

- **JWT Tokens** - Bezpieczne tokeny z określonym czasem wygaśnięcia
- **HTTP-only Cookies** - Tokeny przechowywane w bezpiecznych cookies
- **CORS** - Skonfigurowany dla localhost
- **Walidacja** - Walidacja danych wejściowych po stronie serwera
- **BCrypt** - Hasła hashowane z solą

## 🧪 Testowanie

### Backend
```bash
cd server
./mvnw test
```

### Frontend
```bash
cd client
npm test
```

## 📝 Logi

Backend loguje:
- Operacje autentykacji
- Błędy walidacji
- Informacje o użytkownikach

Frontend wyświetla:
- Powiadomienia o sukcesie/błędach
- Stan ładowania
- Informacje o użytkowniku

## 🚀 Rozwój

### Dodawanie nowych endpointów
1. Utwórz DTO w `dto/`
2. Dodaj metodę w serwisie
3. Utwórz endpoint w kontrolerze
4. Dodaj testy

### Dodawanie nowych komponentów
1. Utwórz komponent w `components/`
2. Dodaj hook jeśli potrzebny
3. Zintegruj z React Query
4. Dodaj obsługę błędów

## 📄 Licencja

MIT License
