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



    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ai/get-response`, {
                prompt: input,
                model: model,

            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': localStorage.getItem('token') || '',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true
            });

            if (!res.data) throw new Error('Failed to fetch response');

            const data = res.data;
            let aiResponse;
            try {
                const jsonData = JSON.parse(data);
                aiResponse = jsonData.response || jsonData.message || JSON.stringify(jsonData, null, 2);
            } catch {
                aiResponse = data;
            }
            if (res.status == 429) setMessages(prev => [...prev, { role: 'assistant', content: 'You have reached Your limit For today' }]);

            setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Error: ' + error.message }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex h-screen bg-black">
            {/* Sidebar */}
            <div className="w-64 bg-gray-950 p-4 hidden md:block shrink-0">
                <button className="w-full py-3 px-4 rounded-lg border border-slate-700 text-white text-left hover:bg-[#2a2a2a] transition-colors">
                    + New Chat
                </button>
                <div className="mt-6 text-sm text-slate-400">
                    <p>Chat History</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="flex items-center justify-center py-3 border-b border-[#2a2a2a] shrink-0">
                    <Link to={"/"} className="text-white font-medium">Devion</Link>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto pb-32">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-white">
                            <h2 className="text-2xl font-semibold">What can I help with?</h2>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto py-6 px-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`mb-6 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                    <div className={`inline-block max-w-full text-left rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-[#282f41] text-white' : 'text-white'
                                        }`}>
                                        {msg.role === 'assistant' ? (
                                            <div className="prose prose-invert max-w-none">
                                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            <p className="whitespace-pre-wrap">{msg.content}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="mb-6">
                                    <span className="text-white animate-pulse">Thinking...</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input Area - Fixed at bottom */}
                <div className="absolute bottom-0 left-0 right-0 md:left-64 p-4 bg-black">
                    <div className="max-w-3xl mx-auto">
                        <div className="relative bg-gray-900 rounded-2xl">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Message CodeRev..."
                                rows={1}
                                className="w-full h-24 bg-transparent text-white px-4 py-4 pr-12 resize-none outline-none rounded-2xl no-scrollbar"
                            />
                            <select
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="absolute right-12 bottom-3 p-2 rounded-lg cursor-pointer bg-gray-950 mr-2 no-scrollbar"
                            >
                                <option value="gemini-2.5-flash">Quick Assist</option>
                                <option value="longcat-flash-chat">Creative Writer</option>
                                <option value="longcat-flash-thinking">Deep Thinker</option>
                            </select>
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className={`absolute right-3 bottom-3 p-2 rounded-lg ${input.trim() && !loading
                                    ? 'bg-white text-black hover:bg-gray-200'
                                    : 'bg-white text-gray-500 cursor-not-allowed'
                                    } transition-colors`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-xs text-center text-slate-500 mt-2">
                            CodeRev can make mistakes. Review important code carefully.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
