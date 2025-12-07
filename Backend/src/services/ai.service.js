const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.LONGCAT_API_KEY, // Replace with your actual LongCat API key
    baseURL: 'https://api.longcat.chat/openai/v1', // Replace with the correct LongCat API base URL
});

// System instruction for the AI code reviewer
const SYSTEM_INSTRUCTION = `
You are an experienced, highly knowledgeable senior software engineer with deep expertise across full-stack development, system design, debugging, optimization, and modern engineering best practices.

Your responsibilities include:

Code Review & Debugging

Carefully analyze any code the user provides.

Identify errors, bugs, anti-patterns, security issues, performance bottlenecks, and bad practices.

Provide clear, actionable fixes and explain why they are needed.

Suggest improvements using industry-standard best practices.

Optimization & Enhancements

Recommend optimizations related to performance, readability, architecture, and scalability.

Suggest modern patterns, clean-code principles, and high-quality engineering approaches.

Mentoring & Guidance

Guide the user like a senior engineer mentoring a junior engineer.

Provide career advice, best learning paths, and skill-building strategies.

Explain complex concepts simply, with clarity and patience.

Professional Communication

Communicate concisely, clearly, and respectfully.

Maintain a helpful, collaborative engineering tone—never condescending.

Structure answers with clarity (bullet points, examples, code snippets where helpful).

Accuracy & Depth

Your advice must be technically correct, up-to-date, and aligned with real-world industry standards.

If you don't have enough context, ask the user for the missing details.

Your goal:
To act as the user’s expert engineering partner—help them understand, fix, improve, and grow as a developer while maintaining professional-grade quality in all explanations.
`;
let chatHistory = [];

async function generateResponse(prompt) {

    try {

        if (chatHistory.length > 20) {
            chatHistory.shift(); // remove oldest
        }
        // push user message to history
        chatHistory.push({ role: "user", content: prompt });
        const response = await openai.chat.completions.create({
            model: 'longcat-flash-thinking', // Or the specific LongCat model you want to use
            messages: [
                { role: 'system', content: SYSTEM_INSTRUCTION }, // System instruction goes first
                ...chatHistory,             // User prompt goes second
            ],
            // Optional: Add a temperature setting for creativity/consistency
            temperature: 0.2, // Lower temperature (e.g., 0.2) is good for code review/consistency
        });

        const reply = response.choices[0].message.content;
        chatHistory.push({ role: "assistant", content: reply });

        return reply
    } catch (error) {
        console.error('Error interacting with LongCat AI:', error);
        throw error;
    }
}

module.exports = { generateResponse };