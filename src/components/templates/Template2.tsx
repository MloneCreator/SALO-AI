import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export const Template2: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="flex min-h-[1123px] w-[794px] bg-white shadow-lg font-sans">
      {/* Sidebar */}
      <div className="w-[35%] bg-[#f5e6e0] p-8 flex flex-col gap-8">
        <div className="flex justify-center mb-4">
          <div className="relative">
            {data.personalInfo.photoUrl ? (
              <img 
                src={data.personalInfo.photoUrl} 
                alt="Profile" 
                className="w-[130px] h-[130px] rounded-full object-cover border-4 border-white shadow-sm"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-[130px] h-[130px] rounded-full bg-white flex items-center justify-center border-4 border-white shadow-sm">
                <Briefcase size={48} className="text-[#f5e6e0]" />
              </div>
            )}
          </div>
        </div>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-gray-400 pb-1">Sobre Mim</h3>
          <p className="text-xs italic leading-relaxed text-gray-700">{data.summary}</p>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-gray-400 pb-1">Contato</h3>
          <div className="space-y-3 text-xs text-gray-700">
            <div className="flex items-center gap-2"><Mail size={12} /> {data.personalInfo.email}</div>
            <div className="flex items-center gap-2"><Phone size={12} /> {data.personalInfo.phone}</div>
            <div className="flex items-center gap-2"><MapPin size={12} /> {data.personalInfo.address}</div>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-gray-400 pb-1">Educação</h3>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="text-xs">
                <p className="font-bold text-gray-800">{edu.course}</p>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-gray-500 italic">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 text-[#333]">
        <header className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-2 uppercase tracking-tight">{data.personalInfo.fullName}</h1>
          <p className="text-sm font-light uppercase tracking-[0.3em] text-gray-500">{data.personalInfo.jobTitle}</p>
          <div className="h-[1px] bg-gray-300 w-full mt-6"></div>
        </header>

        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 border-b border-gray-200 pb-2">Experiência</h2>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-bold text-sm uppercase tracking-wide">{exp.role}</h4>
                  <span className="text-xs text-gray-400 font-medium">{exp.period}</span>
                </div>
                <p className="text-xs font-semibold text-gray-600 mb-2 italic">{exp.company}</p>
                <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 border-b border-gray-200 pb-2">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
