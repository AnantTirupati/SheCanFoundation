'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste! I am the She Can Support Assistant. 🌸 How can I help you support women empowerment, menstrual hygiene drives, or educational campaigns today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'How do I volunteer?',
    'Where do my donations go?',
    'Menstrual Hygiene Camps info',
    '80G Tax Exemption status',
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      let botResponse = '';
      const query = text.toLowerCase();

      if (query.includes('volunteer')) {
        botResponse = 'Applying is easy! You can head over to our "Volunteer" page and submit the application form. We match volunteers based on skills (rural training, event coordination, clinical guidance) and provide verified experience certificates!';
      } else if (query.includes('donation') || query.includes('donate') || query.includes('money')) {
        botResponse = 'We stand for 100% financial transparency. 92% of your donation directly funds active on-ground programs (free distribution of eco-friendly pads, school kits, clinical camps). The remaining 8% is used for volunteer coordination and administrative operations.';
      } else if (query.includes('hygiene') || query.includes('camp') || query.includes('pad')) {
        botResponse = 'Our flagship Menstrual Hygiene Awareness program distributes bio-degradable pads and holds education workshops in village schools across West Bengal, Bihar, and Maharashtra. We also break menstrual taboos by educating young students and families.';
      } else if (query.includes('tax') || query.includes('80g') || query.includes('receipt')) {
        botResponse = 'Yes, absolutely! The She Can Foundation is registered under Section 80G of the Income Tax Act, 1961. Every Indian donor receives a tax exemption receipt via email immediately after a successful donation!';
      } else {
        botResponse = "Thank you for reaching out! We are dedicated to uplifting underprivileged women across India through medical, educational, and vocational empowerment. Is there any particular program or donation structure you'd like to explore?";
      }

      const botMsg: Message = {
        id: Math.random().toString(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary-royal to-secondary-pink flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group focus:outline-none cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-royal to-secondary-pink opacity-50 blur-md group-hover:opacity-100 transition-opacity" />
          <MessageSquare className="w-6 h-6 relative z-10 animate-bounce" />
        </button>
      )}

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] rounded-2xl glass border border-white/10 flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary-royal/20 to-secondary-pink/20 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-royal to-secondary-pink flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm tracking-wide text-neutral-white font-sora flex items-center gap-1.5">
                  She Can Assistant
                  <Sparkles className="w-3.5 h-3.5 text-secondary-peach fill-secondary-peach/20" />
                </h4>
                <span className="text-[10px] text-green-400 font-medium">Online & Ready</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-neutral-white/60 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[360px]">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div key={msg.id} className={`flex items-start gap-2.5 ${!isBot ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white ${
                    isBot ? 'bg-primary-royal' : 'bg-secondary-pink'
                  }`}>
                    {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                    isBot 
                      ? 'bg-white/5 border border-white/5 text-neutral-white/95 rounded-tl-none' 
                      : 'bg-gradient-to-br from-primary-royal to-secondary-pink text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
            
            {/* Typing Loader */}
            {isTyping && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary-royal flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white/5 border border-white/5 text-neutral-white/70 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Board */}
          <div className="px-4 py-2 bg-black/10 border-t border-white/5 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="flex items-center gap-1 py-1.5 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-neutral-white/80 hover:text-white transition-all focus:outline-none cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-secondary-pink" />
                {q}
              </button>
            ))}
          </div>

          {/* Input Panel */}
          <div className="p-3 bg-black/20 border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder="Ask anything about She Can..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-secondary-pink/60 transition-colors"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              className="p-2.5 rounded-xl bg-gradient-to-tr from-primary-royal to-secondary-pink text-white hover:scale-105 active:scale-95 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
