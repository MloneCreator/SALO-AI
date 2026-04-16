import React, { useState } from 'react';
import { CVData, TemplateId } from '../types';
import { TemplateAnaMorais } from './templates/TemplateAnaMorais';
import { TemplateMurilo } from './templates/TemplateMurilo';
import { TemplateJordi } from './templates/TemplateJordi';
import { TemplateAlberto } from './templates/TemplateAlberto';
import { TemplateAnaPaula } from './templates/TemplateAnaPaula';
import { Download, FileText, Loader2, Mail, Printer, Archive } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
  templateId: TemplateId;
  coverLetter: string;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data, templateId, coverLetter }) => {
  const [isGenerating, setIsGenerating] = useState<'pdf' | 'docx' | 'package' | null>(null);
  const [view, setView] = useState<'cv' | 'letter'>('cv');

  const renderTemplate = () => {
    switch (templateId) {
      case 'ana-morais': return <TemplateAnaMorais data={data} />;
      case 'murilo-nascimento': return <TemplateMurilo data={data} />;
      case 'jordi-dalmau': return <TemplateJordi data={data} />;
      case 'alberto-navarro': return <TemplateAlberto data={data} />;
      case 'ana-paula': return <TemplateAnaPaula data={data} />;
      default: return <TemplateAnaMorais data={data} />;
    }
  };

  const generatePDFBlob = async (html: string) => {
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { background: white !important; margin: 0; padding: 0; }
            #cv-render-area, #letter-render-area { box-shadow: none !important; margin: 0 !important; width: 794px !important; }
            .page-break { page-break-after: always !important; break-after: page !important; }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: fullHtml }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.blob();
  };

  const handleDownloadPDF = async () => {
    setIsGenerating('pdf');
    try {
      const element = document.getElementById('cv-render-area');
      if (!element || !element.innerHTML) {
        alert("Erro: Template não loaded correctly.");
        return;
      }

      const blob = await generatePDFBlob(`<div id="cv-render-area">${element.innerHTML}</div>`);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CV_${data.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert(`Erro ao gerar PDF: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsGenerating(null);
    }
  };

  const handleDownloadPackage = async () => {
    setIsGenerating('package');
    try {
      const cvElement = document.getElementById('cv-render-area');
      const letterElement = document.getElementById('letter-render-area');
      
      if (!cvElement || !cvElement.innerHTML || !letterElement || !letterElement.innerHTML) {
        alert("Para gerar o pacote, certifique-se de que os dados foram carregados.");
        return;
      }

      const html = `
        <div id="cv-render-area">${cvElement.innerHTML}</div>
        <div class="page-break"></div>
        <div id="letter-render-area" style="padding: 80px; font-family: serif; color: #1a1a1a; line-height: 1.6;">
          ${letterElement.innerHTML}
        </div>
      `;

      const blob = await generatePDFBlob(html);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Pacote_Completo_${data.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert(`Erro ao gerar pacote: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsGenerating(null);
    }
  };

  const handleDownloadDOCX = async () => {
    setIsGenerating('docx');
    try {
      const response = await fetch('/api/generate-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('wordprocessingml')) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `CV_${data.personalInfo.fullName.replace(/\s+/g, '_')}.docx`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        } else {
          const text = await response.text();
          console.error("Server returned non-DOCX content:", text);
          alert("Erro ao gerar DOCX: O servidor não retornou um ficheiro válido.");
        }
      } else {
        const errorText = await response.text();
        console.error("DOCX generation failed:", errorText);
        alert(`Erro ao gerar DOCX: ${errorText}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro de rede ao tentar gerar o ficheiro DOCX.");
    } finally {
      setIsGenerating(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto p-2 md:p-8 flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Controls */}
      <div className="w-full lg:w-80 flex flex-col gap-4 lg:gap-6 no-print">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-bold text-gray-900">Visualização</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setView('cv')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                view === 'cv' ? 'bg-[#534AB7] text-white shadow-lg shadow-[#534AB7]/20' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText size={18} /> Currículo (CV)
            </button>
            <button
              onClick={() => setView('letter')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                view === 'letter' ? 'bg-[#534AB7] text-white shadow-lg shadow-[#534AB7]/20' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Mail size={18} /> Carta de Apresentação
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-bold text-gray-900">Exportar</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleDownloadPackage}
              disabled={isGenerating !== null}
              className="flex items-center justify-center gap-3 px-4 py-3 bg-[#534AB7] text-white rounded-xl text-sm font-bold hover:bg-[#4339a7] transition-all disabled:opacity-50 shadow-lg shadow-[#534AB7]/20"
            >
              {isGenerating === 'package' ? <Loader2 className="animate-spin" size={18} /> : <Archive size={18} />}
              Pacote Completo (CV + Carta)
            </button>
            <div className="h-px bg-gray-100 my-1"></div>
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating !== null}
              className="flex items-center justify-center gap-3 px-4 py-3 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all disabled:opacity-50"
            >
              {isGenerating === 'pdf' ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
              Apenas PDF
            </button>
            <button
              onClick={handleDownloadDOCX}
              disabled={isGenerating !== null}
              className="flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {isGenerating === 'docx' ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
              Apenas DOCX
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition-all"
            >
              <Printer size={18} /> Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col gap-2 lg:gap-4 overflow-x-auto pb-4 lg:pb-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-2 no-print bg-white p-2 rounded-xl border border-gray-100 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 lg:px-3">Visualização</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <button
              onClick={handleDownloadPackage}
              disabled={isGenerating !== null}
              className="flex items-center gap-2 px-4 py-2 bg-[#534AB7]/10 text-[#534AB7] rounded-lg text-xs font-bold hover:bg-[#534AB7]/20 transition-all disabled:opacity-50"
              title="Descarregar Tudo"
            >
              {isGenerating === 'package' ? <Loader2 className="animate-spin" size={14} /> : <Archive size={14} />}
              <span className="hidden sm:inline">Pacote Completo</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating !== null}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-all disabled:opacity-50"
              title="Descarregar PDF"
            >
              {isGenerating === 'pdf' ? <Loader2 className="animate-spin" size={14} /> : <Download size={14} />}
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-200 transition-all"
              title="Imprimir"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Imprimir</span>
            </button>
          </div>
        </div>
        
        {/* Hidden Render Areas for package extraction */}
        <div className="hidden">
           <div id="cv-render-area-hidden">{renderTemplate()}</div>
           <div id="letter-render-area-hidden">
                <div className="mb-12">
                  <p className="font-bold">{data.personalInfo.fullName}</p>
                  <p>{data.personalInfo.address}</p>
                  <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>
                </div>
                <div className="mb-12">
                  <p>Para:</p>
                  <p className="font-bold">Recursos Humanos</p>
                  <p>{data.coverLetterInfo.targetCompany}</p>
                </div>
                <div className="whitespace-pre-wrap font-serif">
                  {coverLetter}
                </div>
                <div className="mt-12">
                  <p>Atenciosamente,</p>
                  <p className="mt-8 font-bold">{data.personalInfo.fullName}</p>
                </div>
           </div>
        </div>

        {view === 'cv' ? (
          <div className="min-w-[794px] lg:min-w-0 scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 origin-top transition-transform duration-300">
            <div id="cv-render-area" className="shadow-2xl">
              {renderTemplate()}
            </div>
          </div>
        ) : (
          <div id="letter-render-area" className="bg-white w-full max-w-[794px] min-h-[1123px] p-8 md:p-16 shadow-2xl font-serif text-gray-800 leading-relaxed overflow-x-auto">
            <div className="mb-12">
              <p className="font-bold">{data.personalInfo.fullName}</p>
              <p>{data.personalInfo.address}</p>
              <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>
            </div>
            <div className="mb-12">
              <p>Para:</p>
              <p className="font-bold">Recursos Humanos</p>
              <p>{data.coverLetterInfo.targetCompany}</p>
            </div>
            <div className="whitespace-pre-wrap">
              {coverLetter}
            </div>
            <div className="mt-12">
              <p>Atenciosamente,</p>
              <p className="mt-8 font-bold">{data.personalInfo.fullName}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
