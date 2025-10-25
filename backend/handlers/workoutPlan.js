const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

module.exports.generate = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { fitnessLevel, goals, equipment, daysPerWeek, medicalConditions } = body;

    const prompt = `You are a certified fitness trainer and nutritionist. Generate a personalized workout plan based on:
- Fitness Level: ${fitnessLevel}
- Goals: ${goals}
- Available Equipment: ${equipment || 'bodyweight only'}
- Days Per Week: ${daysPerWeek}
- Medical Conditions/Limitations: ${medicalConditions || 'none'}

Please provide:
1. A detailed weekly workout schedule
2. Specific exercises with sets, reps, and rest periods
3. Progressive overload recommendations
4. Safety tips and form guidance
5. Expected timeline for results

Format the response in a structured way with clear sections.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const workoutPlan = message.content[0].text;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        workoutPlan,
        timestamp: new Date().toISOString(),
        userProfile: { fitnessLevel, goals, equipment, daysPerWeek }
      }),
    };
  } catch (error) {
    console.error('Error generating workout plan:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
};
