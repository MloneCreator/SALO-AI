import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export const Template5: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="flex min-h-[1123px] w-[794px] bg-white shadow-lg font-sans">
      {/* Sidebar */}
      <div className="w-[35%] bg-[#1a3c3c] text-white flex flex-col">
        <div className="w-full aspect-[13/15]">
          {data.personalInfo.photoUrl ? (
            <img 
              src={data.personalInfo.photoUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-white/10 flex items-center justify-center">
              <Briefcase size={64} className="text-white/20" />
            </div>
          )}
        </div>

        <div className="p-8 space-y-8">
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-1">Contacto</h3>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-center gap-2"><Mail size={12} /> {data.personalInfo.email}</div>
              <div className="flex items-center gap-2"><Phone size={12} /> {data.personalInfo.phone}</div>
              <div className="flex items-center gap-2"><MapPin size={12} /> {data.personalInfo.address}</div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-1">Idiomas</h3>
            <div className="space-y-3">
              {data.languages.map((lang, i) => (
                <div key={i} className="text-xs">
                  <p className="text-gray-300 mb-1">{lang}</p>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/60" style={{ width: '85%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-1">Información</h3>
            <ul className="text-xs space-y-2 text-gray-300">
              {data.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
            </ul>
          </section>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="p-10 pb-0">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{data.personalInfo.fullName}</h1>
          <div className="bg-[#1a3c3c] text-white px-6 py-3 w-full text-sm font-bold tracking-[0.3em] uppercase">
            {data.personalInfo.jobTitle}
          </div>
        </header>

        <div className="p-10 space-y-10">
          <section>
            <h2 className="text-lg font-bold text-[#1a3c3c] uppercase tracking-widest mb-4">Mi Perfil</h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a3c3c] uppercase tracking-widest mb-4">Experiencia</h2>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-sm text-gray-900">{exp.role}</h4>
                    <span className="text-xs font-bold text-gray-500 italic">{exp.period}</span>
                  </div>
                  <p className="text-xs font-medium text-[#1a3c3c] mb-2">{exp.company}</p>
                  <p className="text-xs leading-relaxed text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a3c3c] uppercase tracking-widest mb-4">Formación</h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <h4 className="font-bold text-sm text-gray-900">{edu.course}</h4>
                  <p className="text-xs text-gray-600">{edu.institution} | {edu.period}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a3c3c] uppercase tracking-widest mb-4">Herramientas</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {data.skills.map((skill, i) => (
                <div key={i} className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-gray-700">{skill}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1a2b4a]" style={{ width: `${80 - (i * 5)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
