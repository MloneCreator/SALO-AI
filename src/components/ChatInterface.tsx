import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Camera, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Message } from '../types';
import { chatWithSalo } from '../services/geminiService';

interface ChatInterfaceProps {
  onComplete: (chatHistory: string) => void;
  onPhotoUpload: (photo: string) => void;
  photo: string | null;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onComplete, onPhotoUpload, photo }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o SALO AI, o teu assistente para criar um CV profissional de excelência. Vamos começar? Qual é o teu nome completo?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatWithSalo([...messages, { role: 'user', content: userMessage }]);
      const assistantMessage = response || 'Desculpa, tive um problema. Podes repetir?';
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
      
      // Much more robust check for completion - broader range of success keywords
      const lowerMsg = assistantMessage.toLowerCase();
      const completionKeywords = [
        "tudo pronto", "gerar o teu cv", "gerar agora", "pronto para gerar", 
        "vou gerar", "posso gerar", "currículo agora", "finalizar", "concluído"
      ];
      
      const isComplete = completionKeywords.some(keyword => lowerMsg.includes(keyword));

      if (isComplete) {
        handleManualComplete();
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ocorreu um erro na comunicação. Tenta novamente.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualComplete = () => {
    const fullHistory = messages
      .map(m => `${m.role === 'assistant' ? 'SALO AI' : 'Utilizador'}: ${m.content}`)
      .join('\n');
    
    // Give the user a moment to read the final message before switching steps
    setTimeout(() => onComplete(fullHistory), 1500);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] sm:h-[calc(100vh-120px)] md:h-[600px] w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-[#534AB7] p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold">SALO AI</h2>
            <p className="text-xs text-white/70">Assistente de Carreira</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {messages.length > 4 && (
            <button 
              onClick={handleManualComplete}
              className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-purple-900 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all shadow-lg animate-pulse"
            >
              Finalizar CV
            </button>
          )}
          <div className="relative">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors overflow-hidden"
            >
              {photo ? (
                <img src={photo} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <Camera size={20} />
              )
            }
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handlePhotoUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#EEEDFE]/30">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-[#534AB7] text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-[#534AB7]" />
              <span className="text-xs text-gray-400 italic">SALO está a pensar...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escreve a tua resposta..."
          className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#534AB7] text-sm outline-none transition-all"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="w-12 h-12 bg-[#534AB7] text-white rounded-xl flex items-center justify-center hover:bg-[#4339a0] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#534AB7]/20"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};
