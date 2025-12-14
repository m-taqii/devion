import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState('gemini-2.5-flash');
    const messagesEndRef = useRef(null);



    const textareaRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        setMessages(prev => [...prev, { role: "user", content: input }]);
        setInput("");
        // Reset height
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
        setLoading(true);

        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/ai/get-response`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    prompt: input,
                    model
                })
            }
        );

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let aiMessage = "";

        setMessages(prev => [...prev, { role: "assistant", content: "" }]);

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n\n");

            for (const line of lines) {
                if (line.startsWith("data: ")) {
                    const token = line.replace("data: ", "");
                    if (token === "[DONE]") {
                        setLoading(false);
                        return;
                    }

                    aiMessage += token;
                    setMessages(prev => {
                        const updated = [...prev];
                        updated[updated.length - 1].content = aiMessage;
                        return updated;
                    });
                }
            }
        }

        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed inset-0 flex bg-black text-white overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-neutral-950 p-4 hidden md:block shrink-0 border-r border-[#2a2a2a]">
                <button onClick={() => { setMessages([]); setInput(''); }} className="w-full py-3 px-4 rounded-lg border border-slate-700 text-white text-left hover:bg-[#2a2a2a] transition-colors">
                    + New Chat
                </button>
                <div className="mt-6 text-sm text-slate-400">
                    <p>Chat History</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full min-w-0 z-70">
                {/* Header */}
                <header className="flex items-center justify-center py-3 border-b border-[#2a2a2a] shrink-0 bg-black/50 backdrop-blur-sm z-10">
                    <Link to={"/"} className="text-white font-medium">Devion</Link>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto min-h-0 container-scroll">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-white p-4 text-center">
                            <h2 className="text-2xl font-semibold mb-2">What can I help with?</h2>
                            <p className="text-gray-400 text-sm">Start a conversation or ask for code review.</p>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto py-6 px-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`mb-6 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                    <div className={`inline-block max-w-[85%] text-left rounded-2xl px-5 py-3 ${msg.role === 'user' ? 'bg-neutral-900 text-white' : 'text-gray-100'
                                        }`}>
                                        {msg.role === 'assistant' ? (
                                            <div className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed wrap-break-words">
                                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            <p className="whitespace-pre-wrap text-sm md:text-base wrap-break-words">{msg.content}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="mb-6">
                                    <span className="text-white/50 text-sm animate-pulse ml-2">Thinking...</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-1" />
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-black shrink-0 border-t border-[#2a2a2a]">
                    <div className="max-w-3xl mx-auto">
                        <div className="relative bg-neutral-900 rounded-2xl flex items-end p-2 border border-[#2a2a2a] hover:border-gray-700 transition-colors">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Message Devion..."
                                rows={1}
                                className="w-full bg-transparent text-white px-4 py-3 pr-48 resize-none outline-none max-h-[200px] min-h-[50px] no-scrollbar text-sm md:text-base"
                            />
                            <select
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="absolute right-12 bottom-3 p-1.5 rounded-md cursor-pointer bg-neutral-950 mr-1 text-xs text-gray-300 border border-gray-800 outline-none hover:bg-gray-800 hover:text-white transition-all uppercase tracking-wide"
                            >
                                <option value="gemini-2.5-flash">Quick</option>
                                <option value="longcat-flash-chat">Pro</option>
                                <option value="longcat-flash-thinking">Deep</option>
                            </select>
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className={`absolute right-3 bottom-3 p-2 rounded-lg ${input.trim() && !loading
                                    ? 'bg-white text-black hover:bg-gray-200 shadow-lg'
                                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                    } transition-all duration-200`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-slate-600 mt-2 font-medium">
                            AI can make mistakes. Please check important info.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
