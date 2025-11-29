import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const ChatInterface = () => {
    const [code, setCode] = useState(``);
    const [response, setResponse] = useState("AI response will appear here...");
    const [loading, setLoading] = useState(false);

    const handleReview = async () => {
        setLoading(true);
        setResponse("Analyzing code...");
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/ai/get-response`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: code }),
            });

            if (!res.ok) {
                throw new Error('Failed to fetch response');
            }

            const data = await res.text(); // Backend seems to send text directly or json? Controller says res.send(response).
            // If response is an object, we might need to parse it. 
            // Let's assume it sends the text content directly based on ai.service.js usage.
            // But wait, if it returns JSON, res.text() will be a JSON string.
            // Let's try to parse as JSON first, if fails, use text.

            try {
                const jsonData = JSON.parse(data);
                // If it's an object with a message or similar
                if (typeof jsonData === 'object' && jsonData !== null) {
                    setResponse(jsonData.response || jsonData.message || JSON.stringify(jsonData, null, 2));
                } else {
                    setResponse(jsonData);
                }
            } catch (e) {
                setResponse(data);
            }

        } catch (error) {
            setResponse("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#0f0f12] text-white overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#1a1a1a]/50 backdrop-blur-md">
                <h1 className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Code Review AI
                </h1>
                <button
                    onClick={handleReview}
                    disabled={loading}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 
            ${loading
                            ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/20'
                        }`}
                >
                    {loading ? 'Reviewing...' : 'Review Code'}
                </button>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Side - Code Editor */}
                <div className="w-1/2 border-r border-gray-800 flex flex-col">
                    <div className="bg-[#1e1e1e] px-4 py-2 text-sm text-gray-400 border-b border-gray-800 flex justify-between">
                        <span>Input Code</span>
                        <span className="text-xs opacity-50">JavaScript</span>
                    </div>
                    <div className="flex-1 overflow-auto bg-[#1e1e1e] relative">
                        <Editor
                            value={code}
                            placeholder='// Paste your code here to review...
function example() {
  console.log("Hello World");
}'
                            onValueChange={code => setCode(code)}
                            highlight={code => highlight(code, languages.js)}
                            padding={20}
                            style={{
                                fontFamily: '"Fira Code", "Fira Mono", monospace',
                                fontSize: 14,
                                minHeight: '100%',
                            }}
                            className="min-h-full"
                        />
                    </div>
                </div>

                {/* Right Side - AI Response */}
                <div className="w-1/2 flex flex-col bg-[#0f0f12]">
                    <div className="bg-[#0f0f12] px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
                        <span>AI Feedback</span>
                    </div>
                    <div className="flex-1 text-left overflow-auto p-6 prose prose-invert max-w-none">
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {response}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
