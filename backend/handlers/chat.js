const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

module.exports.interact = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { message, conversationHistory, userContext } = body;

    const systemPrompt = `You are FitBot, an AI fitness coach and personal trainer. You have expertise in:
- Exercise science and biomechanics
- Nutrition and meal planning
- Recovery and injury prevention
- Motivation and habit building
- Various training methodologies (strength, HIIT, endurance, flexibility)

User Context: ${JSON.stringify(userContext || {})}

Be friendly, motivating, and provide evidence-based advice. Ask clarifying questions when needed.`;

    const messages = conversationHistory && conversationHistory.length > 0
      ? conversationHistory
      : [];

    messages.push({
      role: 'user',
      content: message
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages
    });

    const botReply = response.content[0].text;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        reply: botReply,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error('Error in chat interaction:', error);
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
