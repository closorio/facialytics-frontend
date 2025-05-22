# React + TypeScript + Vite + Tailwind

## Expanding the ESLint configuration

  npm install

  npm run dev
  npm run mock-api
  npm run dev-with-mock

```js
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "mock-api": "npx json-server mock-api/db.json --port 3001",
    "dev-with-mock": "concurrently \"npm run mock-api\" \"vite\""
```
