const OpenAI = require("openai");

exports.handler = async (event) => {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { pergunta } = JSON.parse(event.body);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Você é Zyphor..."
      },
      {
        role: "user",
        content: pergunta
      }
    ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      resposta: completion.choices[0].message.content
    })
  };
};