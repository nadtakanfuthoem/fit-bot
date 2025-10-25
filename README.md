# FitBot - AI-Powered Fitness Program

A comprehensive fitness application with an AI agent backend powered by Claude AI and a modern Angular frontend. FitBot provides personalized workout plans, progress tracking, smart recommendations, and interactive coaching.

## Features

- **AI-Powered Workout Plans**: Generate personalized workout plans based on fitness level, goals, and available equipment
- **Progress Tracking**: Track weight, body measurements, and workout completion with AI-powered analysis
- **Smart Recommendations**: Get holistic fitness advice covering nutrition, recovery, and training optimization
- **Interactive Chat**: Chat with FitBot for real-time fitness guidance and form tips
- **Modern UI**: Beautiful, responsive Angular interface with gradient designs

## Architecture

### Backend (Serverless)
- **Technology**: AWS Lambda + API Gateway
- **Runtime**: Node.js 18.x
- **AI Model**: Claude 3.5 Sonnet (Anthropic)
- **Framework**: AWS SAM (Serverless Application Model)
- **Database**: DynamoDB (for user data, workouts, progress)

### Frontend
- **Framework**: Angular 17
- **Styling**: Custom CSS with gradients
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router

## Project Structure

```
fitness-app/
├── backend/
│   ├── handlers/
│   │   ├── workoutPlan.js      # Workout plan generation
│   │   ├── progress.js          # Progress tracking
│   │   ├── recommendations.js   # Fitness recommendations
│   │   └── chat.js              # Interactive chat
│   ├── template.yaml            # SAM/CloudFormation template
│   ├── samconfig.toml           # SAM configuration
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── workout-plan/
│   │   │   │   ├── progress-tracker/
│   │   │   │   ├── recommendations/
│   │   │   │   └── chat/
│   │   │   ├── services/
│   │   │   │   └── fitness.service.ts
│   │   │   ├── app.component.*
│   │   │   ├── app.module.ts
│   │   │   └── app-routing.module.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- AWS Account (for backend deployment)
- Anthropic API Key (for Claude AI)
- Angular CLI (`npm install -g @angular/cli`)
- AWS CLI configured with your credentials
- AWS SAM CLI (`pip install aws-sam-cli` or see [SAM Installation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))

### Backend Setup

1. Navigate to the backend directory:
```bash
cd fitness-app/backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up local environment:
```bash
# Copy the example environment file
cp env.example.json env.json

# Edit env.json and add your Anthropic API key
```

4. Validate the SAM template:
```bash
npm run validate
```

5. Build the application:
```bash
npm run build
```

6. Deploy to AWS (first-time guided deployment):
```bash
npm run deploy
```

Follow the prompts to:
- Confirm stack name (default: fitbot-backend)
- Confirm AWS region (default: us-east-1)
- Enter your Anthropic API key when prompted
- Accept the deployment

7. Note the API Gateway URL from the deployment output (FitBotApiUrl)

For subsequent deployments:
```bash
npm run deploy:fast
```

#### Running Backend Locally

Start the local API server:
```bash
npm run local
```

This runs the backend at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd fitness-app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update the API URL in `src/app/services/fitness.service.ts`:
```typescript
// For production (after deploying backend)
private apiUrl = 'https://your-api-gateway-url.amazonaws.com/dev/api';

// For local development
// private apiUrl = 'http://localhost:3000/api';
```

4. Start the development server:
```bash
npm start
```

5. Open your browser to `http://localhost:4200`

## Usage Guide

### 1. Dashboard
View your fitness stats, recent activities, and upcoming workouts at a glance.

### 2. Generate Workout Plan
- Select your fitness level (beginner/intermediate/advanced)
- Enter your fitness goals
- Specify available equipment
- Choose training frequency
- Get an AI-generated personalized plan

### 3. Track Progress
- Enter current and target weight
- Record completed workouts
- Add body measurements
- Get AI-powered progress analysis and motivation

### 4. Get Recommendations
- Describe your current training plan
- Report recent performance
- Share energy levels, sleep quality, and nutrition habits
- Receive holistic recommendations for optimization

### 5. Chat with FitBot
- Ask questions about exercises, form, nutrition
- Get real-time fitness coaching
- Receive motivational support
- Learn about training methodologies

## API Endpoints

### POST /api/workout-plan
Generate personalized workout plan

### POST /api/progress
Track and analyze fitness progress

### POST /api/recommendations
Get personalized fitness recommendations

### POST /api/chat
Interactive chat with AI fitness coach

## Environment Variables

### Backend
- `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude AI access

### Frontend
- Update `apiUrl` in `fitness.service.ts` with your deployed API Gateway URL

## Technologies Used

### Backend
- AWS Lambda (Serverless compute)
- API Gateway (REST API)
- DynamoDB (NoSQL database)
- Node.js 18.x
- Anthropic Claude 3.5 Sonnet
- AWS SAM / CloudFormation (Infrastructure as Code)

### Frontend
- Angular 17
- TypeScript
- RxJS
- Angular Router
- Angular Forms

## Customization

### Adding New Features

1. **Backend**: Add new handlers in `backend/handlers/` and register them in `serverless.yml`
2. **Frontend**: Create new components and add routes in `app-routing.module.ts`
3. **Service**: Extend `fitness.service.ts` with new API methods

### Styling

Modify `frontend/src/styles.css` for global styles or individual component CSS files for specific styling.

## Deployment

### Backend Deployment

First-time deployment:
```bash
cd backend
npm run build
npm run deploy
```

Subsequent deployments:
```bash
cd backend
npm run deploy:fast
```

Deploy to specific environment:
```bash
sam deploy --config-env prod
```

### Frontend Deployment
Build the Angular app:
```bash
cd frontend
npm run build
```

Deploy the `dist/` folder to your hosting provider (AWS S3, Netlify, Vercel, etc.)

## Cost Considerations

- **AWS Lambda**: Pay per request (generous free tier)
- **API Gateway**: Pay per API call (generous free tier)
- **Anthropic API**: Pay per token (pricing varies by model)

## Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Implement authentication/authorization for production
- Add rate limiting to prevent abuse
- Validate all user inputs

## Future Enhancements

- [ ] User authentication and profiles (Cognito)
- [x] Data persistence (DynamoDB tables provisioned)
- [ ] Connect Lambda functions to DynamoDB for data persistence
- [ ] Workout history and analytics
- [ ] Social features and community
- [ ] Mobile app (React Native / Ionic)
- [ ] Integration with fitness trackers (Apple Health, Google Fit)
- [ ] Meal planning feature
- [ ] Video exercise demonstrations
- [ ] Progress photos and comparisons with S3 storage

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or contributions, please open an issue or pull request on the project repository.

---

Built with Claude AI by Anthropic
