# Fitness Agent Backend

Serverless backend for the AI-powered fitness program application using AWS Lambda and Claude AI.

## Features

- **Workout Plan Generation**: AI-generated personalized workout plans
- **Progress Tracking**: Analyze user progress and provide insights
- **Smart Recommendations**: Holistic fitness advice including nutrition and recovery
- **Interactive Chat**: Chat with FitBot for real-time fitness guidance

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
export ANTHROPIC_API_KEY=your_api_key_here
```

3. Deploy to AWS:
```bash
npm run deploy
```

4. Run locally:
```bash
npm run local
```

## API Endpoints

### POST /api/workout-plan
Generate a personalized workout plan.

**Request:**
```json
{
  "fitnessLevel": "beginner|intermediate|advanced",
  "goals": "weight loss, muscle gain, etc.",
  "equipment": "dumbbells, resistance bands, etc.",
  "daysPerWeek": 3,
  "medicalConditions": "optional"
}
```

### POST /api/progress
Track and analyze fitness progress.

**Request:**
```json
{
  "currentWeight": 75,
  "targetWeight": 70,
  "completedWorkouts": 12,
  "startDate": "2025-01-01",
  "measurements": { "chest": 100, "waist": 85 }
}
```

### POST /api/recommendations
Get personalized recommendations.

**Request:**
```json
{
  "currentPlan": "strength training",
  "recentPerformance": "good",
  "energyLevels": "moderate",
  "sleepQuality": "7 hours",
  "nutrition": "balanced diet"
}
```

### POST /api/chat
Chat with the fitness AI agent.

**Request:**
```json
{
  "message": "How can I improve my squat form?",
  "conversationHistory": [],
  "userContext": { "fitnessLevel": "intermediate" }
}
```

## Technology Stack

- **Runtime**: Node.js 18.x
- **Framework**: Serverless Framework
- **AI**: Claude 3.5 Sonnet (Anthropic)
- **Cloud**: AWS Lambda + API Gateway

## Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude AI
