import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { TemplateGallery } from './components/TemplateGallery';
import { CVPreview } from './components/CVPreview';
import { CVData, TemplateId } from './types';
import { extractCVData, generateCoverLetter } from './services/geminiService';
import { Briefcase, Loader2, Sparkles } from 'lucide-react';

type Step = 'chat' | 'template-selection' | 'preview';

export default function App() {
  const [step, setStep] = useState<Step>('chat');
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('ana-morais');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChatComplete = async (chatHistory: string) => {
    setIsProcessing(true);
    try {
      const data = await extractCVData(chatHistory);
      const letter = await generateCoverLetter(data);
      
      // Merge photo if uploaded
      if (photo) {
        data.personalInfo.photoUrl = photo;
      }
      
      setCvData(data);
      setCoverLetter(letter);
      setStep('template-selection');
    } catch (error) {
      console.error("Error processing CV data:", error);
      alert("Houve um erro ao processar os teus dados. Por favor, tenta novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTemplateSelect = (id: TemplateId) => {
    setSelectedTemplate(id);
    setStep('preview');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#534AB7] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#534AB7]/20">
              <Briefcase size={24} />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-[#534AB7]">SALO AI</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Sparkles size={14} className="text-[#534AB7]" />
              AI-Powered Career Assistant
            </div>
          </div>
        </div>
      </header>

      <main className="py-4 md:py-8 px-2 md:px-4 min-h-[calc(100vh-73px)] flex flex-col">
        {isProcessing ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <Loader2 size={48} className="animate-spin text-[#534AB7]" />
              <Sparkles size={20} className="absolute -top-2 -right-2 text-[#534AB7] animate-pulse" />
            </div>
            <div className="text-center px-4">
              <h2 className="text-xl font-bold text-gray-900">A processar o teu futuro...</h2>
              <p className="text-gray-500 text-sm">O SALO AI está a organizar os teus dados e a criar a tua carta.</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 w-full max-w-7xl mx-auto">
            {step === 'chat' && (
              <div className="h-full flex items-center justify-center">
                <ChatInterface 
                  onComplete={handleChatComplete} 
                  onPhotoUpload={setPhoto}
                  photo={photo}
                />
              </div>
            )}

            {step === 'template-selection' && (
              <TemplateGallery 
                onSelect={handleTemplateSelect} 
                selectedId={selectedTemplate} 
              />
            )}

            {step === 'preview' && cvData && (
              <CVPreview 
                data={cvData} 
                templateId={selectedTemplate} 
                coverLetter={coverLetter}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">© 2026 SALO AI. Feito para o mercado Angolano.</p>
          <div className="flex gap-6 text-xs font-medium text-gray-500">
            <a href="#" className="hover:text-[#534AB7] transition-colors">Termos</a>
            <a href="#" className="hover:text-[#534AB7] transition-colors">Privacidade</a>
            <a href="#" className="hover:text-[#534AB7] transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
