# Husky Git Hooks Configuration

## Skonfigurowane hooks:

### Pre-commit
- Uruchamia `lint-staged` dla zmienionych plików
- Sprawdza linting i typy TypeScript dla frontendu
- Kompiluje kod Java dla backendu (tylko zmienione pliki)

### Pre-push
- Buduje i testuje frontend (React + Vite)
- Buduje i testuje backend (Spring Boot + Maven)
- Blokuje push jeśli którykolwiek test się nie powiedzie

## Dostępne komendy:

```bash
# Testowanie tylko frontendu
npm run test:client

# Testowanie tylko backendu  
npm run test:server

# Testowanie wszystkiego
npm run test:all

# Budowanie wszystkiego
npm run build:all

# Pełne sprawdzenie (lint + typy + build + testy)
npm run check:all
```

## Jak ominąć hooki (nie zalecane):

```bash
# Omiń pre-commit
git commit --no-verify -m "message"

# Omiń pre-push
git push --no-verify
```
