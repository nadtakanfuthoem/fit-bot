# FitBot Frontend

Angular-based frontend for the FitBot AI Fitness Coach application.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Update API URL in `src/app/services/fitness.service.ts`

3. Run development server:
```bash
npm start
```

4. Navigate to `http://localhost:4200`

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## Components

- **Dashboard**: Overview of fitness stats and activities
- **Workout Plan**: Generate AI-powered workout plans
- **Progress Tracker**: Track and analyze fitness progress
- **Recommendations**: Get personalized fitness tips
- **Chat**: Interactive chat with FitBot AI

## Configuration

Update the API endpoint in `src/app/services/fitness.service.ts`:

```typescript
private apiUrl = 'YOUR_API_GATEWAY_URL';
```

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.
