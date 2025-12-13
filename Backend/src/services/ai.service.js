const OpenAI = require('openai');

let openai;
let modelNameForAPI;

// System instruction for the AI code reviewer
const SYSTEM_INSTRUCTION = `You are Devion AI, an AI code reviewer and debugger.
You are an experienced, highly knowledgeable senior software engineer with deep expertise across full-stack development, system design, debugging, optimization, and modern engineering best practices. Developed by Muhammad Taqi.

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

async function generateResponse(prompt, model) {

    switch (model) {
        case 'gemini-2.5-flash':
            openai = new OpenAI({
                apiKey: process.env.GEMINI_API_KEY,
                baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
            });
            modelNameForAPI = "gemini-2.5-flash";
            break;

        case 'longcat-flash-chat':
            openai = new OpenAI({
                apiKey: process.env.LONGCAT_API_KEY,
                baseURL: "https://api.longcat.chat/openai/v1"
            });
            modelNameForAPI = "longcat-flash-chat";
            break;

        case 'longcat-flash-thinking':
            openai = new OpenAI({
                apiKey: process.env.LONGCAT_API_KEY,
                baseURL: "https://api.longcat.chat/openai/v1"
            });
            modelNameForAPI = "longcat-flash-thinking";
            break;

        default:
            throw new Error(`Invalid model selected: ${model}`);
    }

    try {

        if (chatHistory.length > 10) {
            chatHistory.shift(); // remove oldest
        }
        // push user message to history
        chatHistory.push({ role: "user", content: prompt });
        const response = await openai.chat.completions.create({
            model: modelNameForAPI,
            messages: [
                { role: 'system', content: SYSTEM_INSTRUCTION },
                ...chatHistory,
            ],
            temperature: 0.2, // Lower temperature (e.g., 0.2) is good for code review/consistency
        });

        const reply = response.choices[0].message.content;
        chatHistory.push({ role: "assistant", content: reply });

        return reply
    } catch (error) {
        console.error('Error interacting with AI:', error);
        throw error;
    }
}

module.exports = { generateResponse };