const { ToolNode } = require("@langchain/langgraph/prebuilt");
const { TavilySearch } = require("@langchain/tavily");
const { ChatOpenAI } = require("@langchain/openai");
const { MessagesAnnotation, StateGraph, MemorySaver } = require("@langchain/langgraph");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

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

// Global checkpointer to persist state across requests (mimicking previous behavior)
const checkPointer = new MemorySaver();

const SearchTool = new TavilySearch({
    maxResults: 5,
    topic: "general",
});
const tools = [SearchTool];
const toolNode = new ToolNode(tools);

async function* generateResponse(prompt, modelKey) {
    let model;

    // 1. Initialize the correct model based on selection
    switch (modelKey) {
        case 'gemini-2.5-flash':
            model = new ChatOpenAI({
                model: "gemini-2.5-flash",
                apiKey: process.env.GEMINI_API_KEY,
                configuration: {
                    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
                },
                streaming: true
            });
            break;

        case 'longcat-flash-chat':
            model = new ChatOpenAI({
                model: "LongCat-Flash-Chat",
                apiKey: process.env.LONGCAT_API_KEY,
                configuration: {
                    baseURL: "https://api.longcat.chat/openai",
                },
                streaming: true
            });
            break;

        case 'longcat-flash-thinking':
            model = new ChatOpenAI({
                model: "LongCat-Flash-Thinking",
                apiKey: process.env.LONGCAT_API_KEY,
                configuration: {
                    baseURL: "https://api.longcat.chat/openai",
                },
                streaming: true
            });
            break;

        default:
            throw new Error(`Invalid model selected: ${modelKey}`);
    }

    // Bind tools to the model
    const modelWithTools = model.bindTools(tools);

    // 2. Define the Agent Node function (closes over modelWithTools)
    async function callModel(state) {
        const { messages } = state;
        // Prepend system message for the specific call (not added to persistent state)
        const messagesWithSystem = [new SystemMessage(SYSTEM_INSTRUCTION), ...messages];
        const response = await modelWithTools.invoke(messagesWithSystem);
        return { messages: [response] };
    }

    // 3. Define Conditional Logic
    function shouldContinue(state) {
        const lastMessage = state.messages[state.messages.length - 1];
        if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
            return "tools";
        }
        return "__end__";
    }

    // 4. Construct the Graph
    const workflow = new StateGraph(MessagesAnnotation)
        .addNode("agent", callModel)
        .addNode("tools", toolNode)
        .addEdge("__start__", "agent")
        .addConditionalEdges("agent", shouldContinue, {
            tools: "tools",
            __end__: "__end__"
        })
        .addEdge("tools", "agent");

    // 5. Compile the Graph
    const app = workflow.compile({ checkpointer: checkPointer });

    try {
        const input = {
            messages: [new HumanMessage(prompt)],
        };

        const config = {
            configurable: { thread_id: "1" }, // Keeping single thread as per original intent
            version: "v2" // Ensure we use v2 for streamEvents if using newer LangGraph
        };

        // 6. Stream Events to yield tokens
        // streamEvents allows us to see internal steps, including the LLM streaming tokens
        const eventStream = await app.streamEvents(input, config);

        for await (const event of eventStream) {
            // Check for 'on_chat_model_stream' events from the 'agent' node
            if (event.event === "on_chat_model_stream" && event.metadata?.langgraph_node === "agent") {
                const chunk = event.data.chunk;
                // Yield the content string if present
                if (chunk && chunk.content) {
                    yield chunk.content;
                }
            }
        }

    } catch (error) {
        console.error('Error interacting with AI:', error);
        throw error;
    }
}

module.exports = { generateResponse };