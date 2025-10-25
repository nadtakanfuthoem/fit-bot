# Migration Guide: Serverless Framework to AWS SAM

This guide helps you migrate from Serverless Framework to AWS SAM (Serverless Application Model).

## What Changed?

### Files Added
- `template.yaml` - SAM/CloudFormation template (replaces `serverless.yml`)
- `samconfig.toml` - SAM configuration file
- `env.json` - Local environment variables for SAM local testing
- `env.example.json` - Example environment file
- `.gitignore` - Updated to ignore SAM build artifacts

### Files Removed/Deprecated
- `serverless.yml` - No longer used (replaced by `template.yaml`)
- Serverless Framework dependencies removed from `package.json`

### Handler Code
- **No changes required!** The Lambda handler code remains exactly the same
- Same function signatures and exports work with both frameworks

## Key Differences

### 1. Configuration Format

**Serverless Framework (serverless.yml)**
```yaml
service: fitness-agent-backend
provider:
  name: aws
  runtime: nodejs18.x
functions:
  generateWorkoutPlan:
    handler: handlers/workoutPlan.generate
    events:
      - httpApi:
          path: /api/workout-plan
          method: post
```

**AWS SAM (template.yaml)**
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Resources:
  GenerateWorkoutPlanFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: handlers/workoutPlan.generate
      Runtime: nodejs18.x
      Events:
        WorkoutPlanApi:
          Type: Api
          Properties:
            Path: /api/workout-plan
            Method: POST
```

### 2. Deployment Commands

| Task | Serverless Framework | AWS SAM |
|------|---------------------|---------|
| Deploy | `serverless deploy` | `sam build && sam deploy` |
| Local API | `serverless offline` | `sam local start-api` |
| Invoke function | `serverless invoke local` | `sam local invoke` |
| View logs | `serverless logs` | `sam logs` |
| Remove stack | `serverless remove` | `sam delete` |

### 3. npm Scripts

**Before (Serverless Framework)**
```json
{
  "scripts": {
    "deploy": "serverless deploy",
    "local": "serverless offline"
  }
}
```

**After (AWS SAM)**
```json
{
  "scripts": {
    "build": "sam build",
    "deploy": "sam deploy --guided",
    "deploy:fast": "sam build && sam deploy",
    "local": "sam local start-api --env-vars env.json",
    "validate": "sam validate"
  }
}
```

### 4. Environment Variables

**Serverless Framework**
- Set via shell environment: `export ANTHROPIC_API_KEY=xxx`
- Referenced in `serverless.yml`: `${env:ANTHROPIC_API_KEY}`

**AWS SAM**
- For local: Configure in `env.json`
- For deployment: Pass as parameters during `sam deploy`
- Referenced in `template.yaml` as CloudFormation parameters

## Migration Steps

### Step 1: Remove Old Dependencies

```bash
npm uninstall serverless serverless-offline
```

### Step 2: Install AWS SAM CLI

Follow the official guide: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

Or install via pip:
```bash
pip install aws-sam-cli
```

Verify installation:
```bash
sam --version
```

### Step 3: Configure Local Environment

```bash
cp env.example.json env.json
```

Edit `env.json` and add your Anthropic API key for all functions.

### Step 4: Validate Template

```bash
npm run validate
```

This ensures your `template.yaml` is valid CloudFormation syntax.

### Step 5: Test Locally

```bash
npm run local
```

Test your endpoints at `http://localhost:3000/api/*`

### Step 6: Deploy to AWS

First-time deployment (guided):
```bash
npm run deploy
```

You'll be prompted for:
- Stack name
- AWS Region
- Parameter values (including Anthropic API key)
- Confirmation

The guided deployment creates `samconfig.toml` which stores your preferences.

Subsequent deployments:
```bash
npm run deploy:fast
```

### Step 7: Update Frontend API URL

After deployment, update your frontend's API URL with the new endpoint from SAM deployment outputs.

### Step 8: Clean Up Old Resources (Optional)

If you have an existing Serverless Framework deployment:

```bash
# Using serverless CLI (if still installed)
serverless remove

# Or manually delete the CloudFormation stack
aws cloudformation delete-stack --stack-name fitness-agent-backend-dev
```

## New Features with SAM

### 1. DynamoDB Tables

The SAM template includes pre-configured DynamoDB tables:
- `FitBot-Users-{Stage}` - User profiles
- `FitBot-Workouts-{Stage}` - Workout plans
- `FitBot-Progress-{Stage}` - Progress tracking

These tables are ready to use in your Lambda functions.

### 2. Multi-Environment Support

Deploy to different environments easily:

```bash
# Development (default)
sam deploy --config-env default

# Staging
sam deploy --config-env staging

# Production
sam deploy --config-env prod
```

### 3. CloudFormation Outputs

The template exports useful values:
- API Gateway URL
- DynamoDB table names
- AWS Region

Access them via CloudFormation console or:
```bash
aws cloudformation describe-stacks --stack-name fitbot-backend --query 'Stacks[0].Outputs'
```

### 4. Fast Development with sam sync

Use `sam sync --watch` for rapid development:
```bash
npm run sync
```

This watches for code changes and automatically syncs to AWS.

## Troubleshooting

### Issue: "Template validation error"

**Solution**: Run `sam validate` to see specific errors. Common issues:
- Indentation errors in YAML
- Missing required properties
- Invalid resource types

### Issue: "Unable to upload artifact"

**Solution**: SAM needs an S3 bucket to upload code. Use:
```bash
sam deploy --guided --resolve-s3
```

This automatically creates an S3 bucket for deployments.

### Issue: "Parameter validation failed"

**Solution**: Ensure you provide all required parameters:
```bash
sam deploy --parameter-overrides "AnthropicApiKey=your-key-here"
```

### Issue: Local API not starting

**Solution**:
1. Check if Docker is running (SAM local requires Docker)
2. Verify `env.json` exists with correct structure
3. Ensure no other service is using port 3000

## Benefits of SAM over Serverless Framework

1. **Official AWS Support**: SAM is developed and maintained by AWS
2. **CloudFormation Native**: Direct integration with CloudFormation features
3. **Better Local Testing**: Robust local testing with SAM CLI
4. **No Third-Party Dependency**: No need for Serverless Framework plugins
5. **Infrastructure as Code**: Full CloudFormation capabilities (DynamoDB, S3, Cognito, etc.)
6. **Cost**: Free and open-source, no vendor lock-in
7. **sam sync**: Fast development workflow with watch mode
8. **Better IDE Support**: Built-in support in AWS Toolkit extensions

## Additional Resources

- [AWS SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/)
- [SAM CLI Reference](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html)
- [SAM Template Specification](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification.html)
- [SAM Examples](https://github.com/aws/aws-sam-cli-app-templates)

## Need Help?

If you encounter issues during migration:
1. Check the [SAM GitHub Issues](https://github.com/aws/aws-sam-cli/issues)
2. Review AWS SAM documentation
3. Ensure AWS CLI and SAM CLI are up to date
4. Try the AWS Developer Forums

## Rollback Plan

If you need to rollback to Serverless Framework:
1. Keep `serverless.yml` file for reference
2. Reinstall dependencies: `npm install serverless serverless-offline`
3. Update `package.json` scripts back to serverless commands
4. Deploy using `serverless deploy`

However, we recommend sticking with SAM for better AWS integration and long-term support.
