import React from 'react';
import { TemplateId } from '../types';
import { Check } from 'lucide-react';

interface TemplateGalleryProps {
  onSelect: (id: TemplateId) => void;
  selectedId: TemplateId;
}

const templates: { id: TemplateId; name: string; color: string; description: string }[] = [
  { id: 'ana-morais', name: 'Ana Morais', color: '#e7cdcd', description: 'Elegante e profissional com toque blush' },
  { id: 'murilo-nascimento', name: 'Murilo Nascimento', color: '#eaeaeb', description: 'Moderno e técnico com timeline' },
  { id: 'jordi-dalmau', name: 'Jordi Dalmau', color: '#2d3e33', description: 'Executivo com visualização de métricas' },
  { id: 'alberto-navarro', name: 'Alberto Navarro', color: '#3d3d3d', description: 'Minimalista de alto contraste' },
  { id: 'ana-paula', name: 'Ana Paula', color: '#2d3e33', description: 'Natural e estruturado com foto em arco' },
];

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelect, selectedId }) => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Escolhe o teu Template</h2>
        <p className="text-gray-500">Seleciona o estilo que melhor combina com a tua área profissional.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {templates.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`relative cursor-pointer group rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
              selectedId === t.id ? 'border-[#534AB7] ring-4 ring-[#534AB7]/10' : 'border-gray-200'
            }`}
          >
            <div className="aspect-[3/4] p-4 bg-gray-50 flex flex-col gap-2">
              <div className="flex-1 bg-white shadow-sm rounded-lg overflow-hidden flex">
                <div className="w-1/3 h-full" style={{ backgroundColor: t.color }}></div>
                <div className="flex-1 p-2 space-y-1">
                  <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-1 w-1/2 bg-gray-100 rounded"></div>
                  <div className="mt-4 space-y-1">
                    <div className="h-1 w-full bg-gray-50 rounded"></div>
                    <div className="h-1 w-full bg-gray-50 rounded"></div>
                    <div className="h-1 w-full bg-gray-50 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white">
              <h3 className="font-bold text-gray-900">{t.name}</h3>
              <p className="text-xs text-gray-500">{t.description}</p>
            </div>

            {selectedId === t.id && (
              <div className="absolute top-4 right-4 w-8 h-8 bg-[#534AB7] text-white rounded-full flex items-center justify-center shadow-lg">
                <Check size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
