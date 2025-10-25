const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

module.exports.track = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const {
      currentWeight,
      targetWeight,
      completedWorkouts,
      startDate,
      measurements,
      photos
    } = body;

    const prompt = `As a fitness coach, analyze this progress data and provide insights:

Current Progress:
- Current Weight: ${currentWeight} kg
- Target Weight: ${targetWeight} kg
- Workouts Completed: ${completedWorkouts}
- Start Date: ${startDate}
- Body Measurements: ${JSON.stringify(measurements || {})}

Please provide:
1. Progress assessment (on track, ahead, or behind schedule)
2. Motivational feedback
3. Adjustments needed to the current plan
4. Celebration of milestones achieved
5. Next week's focus areas

Be encouraging but realistic.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const progressAnalysis = message.content[0].text;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        progressAnalysis,
        progressData: body,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error('Error tracking progress:', error);
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
