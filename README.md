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
- H2 Database
- Maven

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

## 📡 API Endpoints

### Autentykacja
- `POST /api/auth/login` - Logowanie
- `POST /api/auth/register` - Rejestracja
- `POST /api/auth/logout` - Wylogowanie
- `GET /api/auth/me` - Pobieranie aktualnego użytkownika

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
spring.datasource.url=jdbc:h2:mem:mailerdb
spring.datasource.username=sa
spring.datasource.password=password

# JWT
jwt.secret=your-super-secret-jwt-key
jwt.expiration=86400000
jwt.cookie-name=auth-token

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
