# Fitness Agent Backend

AWS SAM-based serverless backend for the AI-powered fitness program application using AWS Lambda and Claude AI.

## Features

- **Workout Plan Generation**: AI-generated personalized workout plans
- **Progress Tracking**: Analyze user progress and provide insights
- **Smart Recommendations**: Holistic fitness advice including nutrition and recovery
- **Interactive Chat**: Chat with FitBot for real-time fitness guidance
- **DynamoDB Integration**: Ready-to-use tables for users, workouts, and progress tracking

## Prerequisites

- [AWS CLI](https://aws.amazon.com/cli/) configured with your credentials
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) installed
- Node.js 18+ and npm
- Anthropic API Key

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Local Environment
Copy the example environment file and add your Anthropic API key:
```bash
cp env.example.json env.json
```

Edit `env.json` and replace `your-anthropic-api-key-here` with your actual API key.

### 3. Validate Template
```bash
npm run validate
```

### 4. Build the Application
```bash
npm run build
```

### 5. Deploy to AWS

First-time deployment (guided):
```bash
npm run deploy
```

This will prompt you for:
- Stack name (default: fitbot-backend)
- AWS Region (default: us-east-1)
- Parameter values (Anthropic API Key)
- Confirmation before deployment

Subsequent deployments (fast):
```bash
npm run deploy:fast
```

### 6. Run Locally

Start local API server:
```bash
npm run local
```

The API will be available at `http://localhost:3000`

## AWS SAM Commands

- `npm run build` - Build the application
- `npm run deploy` - Deploy with guided prompts
- `npm run deploy:fast` - Quick deploy after first setup
- `npm run local` - Run API Gateway locally
- `npm run invoke <FunctionName>` - Invoke a specific function locally
- `npm run logs` - Tail CloudWatch logs
- `npm run validate` - Validate SAM template
- `npm run sync` - Sync local changes to AWS (watch mode)

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
- **Framework**: AWS SAM (Serverless Application Model)
- **AI**: Claude 3.5 Sonnet (Anthropic)
- **Cloud**: AWS Lambda + API Gateway
- **Database**: DynamoDB (ready for integration)
- **IaC**: CloudFormation

## Infrastructure

The SAM template provisions:

- **4 Lambda Functions**:
  - `GenerateWorkoutPlanFunction` - Workout plan generation
  - `TrackProgressFunction` - Progress tracking
  - `GetRecommendationsFunction` - Fitness recommendations
  - `ChatWithAgentFunction` - Interactive chat

- **API Gateway**: REST API with CORS enabled

- **3 DynamoDB Tables** (pre-configured for future use):
  - `FitBot-Users-{Stage}` - User profiles and settings
  - `FitBot-Workouts-{Stage}` - Workout plans and history
  - `FitBot-Progress-{Stage}` - Progress tracking data

- **IAM Roles**: Properly scoped permissions for Lambda to access DynamoDB

## Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude AI

## Deployment Environments

The template supports multiple environments via the `Stage` parameter:
- `dev` (default) - Development environment
- `staging` - Staging environment
- `prod` - Production environment

Deploy to a specific stage:
```bash
sam deploy --config-env prod
```

## Project Structure

```
backend/
├── handlers/
│   ├── workoutPlan.js      # Workout plan generation handler
│   ├── progress.js          # Progress tracking handler
│   ├── recommendations.js   # Recommendations handler
│   └── chat.js              # Chat interaction handler
├── template.yaml            # SAM template (CloudFormation)
├── samconfig.toml           # SAM configuration
├── package.json             # Dependencies and scripts
├── env.json                 # Local environment variables (gitignored)
├── env.example.json         # Example environment file
└── README.md                # This file
```

## Cost Considerations

- **Lambda**: First 1M requests/month free, then $0.20 per 1M requests
- **API Gateway**: First 1M requests/month free (12 months), then $1.00 per 1M requests
- **DynamoDB**: 25GB storage free, PAY_PER_REQUEST billing mode
- **Anthropic API**: Pay per token (varies by model)

## Monitoring

View CloudWatch logs:
```bash
npm run logs
```

Or view logs for a specific function:
```bash
sam logs -n GenerateWorkoutPlanFunction --tail
```

## Cleanup

To delete all AWS resources:
```bash
sam delete --stack-name fitbot-backend
```
