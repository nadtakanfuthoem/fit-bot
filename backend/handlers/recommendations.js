const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

module.exports.get = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const {
      currentPlan,
      recentPerformance,
      energyLevels,
      sleepQuality,
      nutrition
    } = body;

    const prompt = `As a holistic fitness advisor, provide recommendations based on:

Current Situation:
- Current Plan: ${currentPlan}
- Recent Performance: ${recentPerformance}
- Energy Levels: ${energyLevels}
- Sleep Quality: ${sleepQuality}
- Nutrition: ${nutrition}

Please provide:
1. Recovery recommendations
2. Nutrition advice to support goals
3. Sleep optimization tips
4. Stress management techniques
5. When to push harder vs. rest
6. Supplementation suggestions (if needed)

Focus on sustainable, evidence-based recommendations.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1536,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const recommendations = message.content[0].text;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        recommendations,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error('Error getting recommendations:', error);
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
