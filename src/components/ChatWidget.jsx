import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Trash2 } from 'lucide-react';
import '../styles/ChatWidget.css';

const ChatWidget = () => {
  const [chatOpen, setChatOpen] = useState(false);

  // Initial message updated for Vansh
  const [chatMessages, setChatMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hi! I'm Vansh's AI assistant. How can I help you today?"
    }
  ]);

  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // DARK MODE DETECTION (unchanged)
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) setIsDark(savedTheme === 'dark');
      else setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    };

    window.addEventListener('storage', handleThemeChange);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ---------------------------------------
  // 🔥 Dummy AI Responses (Frontend Only)
  // ---------------------------------------
  const generateDummyAIReply = (userMessage) => {
    const responses = [
      "That's interesting! Tell me more.",
      "Great question! Let me help you with that.",
      "Here's something you might like.",
      "Absolutely! I can guide you.",
      "Sounds good! What else would you like to know?",
      "I'm here to help. Ask me anything!",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  // ---------------------------------------
  // SEND MESSAGE (Frontend Only)
  // ---------------------------------------
  const sendChatMessage = () => {
    if (!chatInput.trim() || isTyping) return;

    const userMessage = { role: 'user', content: chatInput };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = generateDummyAIReply(userMessage.content);

      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', content: aiReply }
      ]);

      setIsTyping(false);
    }, 1000);
  };

  // ---------------------------------------
  // CLEAR CHAT — frontend only
  // ---------------------------------------
  const clearChat = () => {
    if (window.confirm('Clear chat history?')) {
      setChatMessages([
        { 
          role: 'assistant', 
          content: "Chat history cleared. How can I help you?"
        }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  return (
    <div className="chat-widget-container">
      {chatOpen ? (
        <div className={`chat-window ${isDark ? 'chat-window-dark' : 'chat-window-light'}`}>

          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="chat-status-indicator"></div>
              <MessageSquare className="chat-header-icon" size={20} />
              <span className="chat-header-title">AI Assistant</span>
            </div>
            <div className="chat-header-actions">
              <button 
                onClick={clearChat} 
                className="chat-header-btn"
                title="Clear chat history"
              >
                <Trash2 size={18} />
              </button>
              <button 
                onClick={() => setChatOpen(false)} 
                className="chat-header-btn"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="chat-messages">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${msg.role === 'user' ? 'chat-message-user' : 'chat-message-assistant'}`}
              >
                <div
                  className={`chat-bubble ${
                    msg.role === 'user'
                      ? 'chat-bubble-user'
                      : isDark ? 'chat-bubble-assistant-dark' : 'chat-bubble-assistant-light'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-message chat-message-assistant">
                <div
                  className={`chat-bubble ${isDark ? 'chat-bubble-assistant-dark' : 'chat-bubble-assistant-light'}`}
                >
                  <div className="typing-indicator">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className={`chat-input-area ${!isDark ? 'chat-input-area-light' : ''}`}>
            <div className="chat-input-wrapper">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isTyping}
                className={`chat-input ${!isDark ? 'chat-input-light' : ''}`}
              />
              <button
                onClick={sendChatMessage}
                disabled={!chatInput.trim() || isTyping}
                className="chat-send-btn"
              >
                <Send size={20} />
              </button>
            </div>

            <p className="chat-footer-text">
              AI Assistant (Demo Mode)
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setChatOpen(true)}
          className="chat-float-btn"
        >
          <MessageSquare size={28} />
          <span className="chat-float-pulse"></span>
          <div className="chat-tooltip">Chat with AI Assistant</div>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
