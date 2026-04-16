import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, MapPin, Briefcase, Globe } from 'lucide-react';

export const TemplateJordi: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="flex min-h-[1123px] w-[794px] bg-[#f0f2f1] shadow-lg font-sans">
      {/* Container */}
      <div className="flex flex-col w-full bg-white m-0">
        {/* Header Board */}
        <div className="bg-[#2d3e33] text-white p-10 flex items-center gap-12 h-[220px]">
          <div className="shrink-0">
            {data.personalInfo.photoUrl ? (
              <img 
                src={data.personalInfo.photoUrl} 
                alt="Profile" 
                className="w-[140px] h-[140px] border-4 border-white object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-[140px] h-[140px] bg-white/20 border-4 border-white flex items-center justify-center">
                <Briefcase size={64} className="text-white/50" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-xl font-bold uppercase tracking-[0.3em] opacity-80">{data.personalInfo.jobTitle}</p>
          </div>
        </div>

        {/* content grid */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-[35%] bg-[#eceded] p-8 flex flex-col gap-10">
            <section>
              <h3 className="text-xl font-black uppercase tracking-wider text-[#2d3e33] mb-6 border-b-2 border-[#2d3e33]/20 pb-2">Contacto</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-[#2d3e33]" />
                  <span className="text-xs font-bold text-gray-700">{data.personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-[#2d3e33]" />
                  <span className="text-xs font-bold text-gray-700 truncate">{data.personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={14} className="text-[#2d3e33]" />
                  <span className="text-xs font-bold text-gray-700 leading-tight">{data.personalInfo.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={14} className="text-[#2d3e33]" />
                  <span className="text-xs font-bold text-gray-700">Linkedin Profile</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-black uppercase tracking-wider text-[#2d3e33] mb-6 border-b-2 border-[#2d3e33]/20 pb-2">Idiomas</h3>
              <ul className="space-y-2">
                {data.languages.map((lang, i) => (
                  <li key={i} className="flex justify-between items-center text-xs font-bold text-gray-700">
                    <span>{lang}</span>
                    <span className="text-[10px] text-gray-400 font-normal italic">Nativo/C1</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-black uppercase tracking-wider text-[#2d3e33] mb-6 border-b-2 border-[#2d3e33]/20 pb-2">Informação</h3>
              <ul className="space-y-2 text-xs font-bold text-gray-700 list-disc list-inside">
                {data.certifications.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>
          </div>

          {/* Main Area */}
          <div className="flex-1 p-10 bg-white shadow-inner">
            <section className="mb-12">
              <h3 className="text-xl font-black uppercase tracking-wider text-[#2d3e33] mb-4">Mi Perfil</h3>
              <div className="h-1 w-20 bg-[#2d3e33] mb-6"></div>
              <p className="text-sm leading-relaxed text-gray-600 text-justify">
                {data.summary}
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-xl font-black uppercase tracking-wider text-[#2d3e33] mb-4">Experiencia</h3>
              <div className="h-1 w-20 bg-[#2d3e33] mb-8"></div>
              <div className="space-y-8">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <h4 className="font-black text-sm text-[#2d3e33] uppercase mb-1">{exp.role}</h4>
                    <p className="text-xs font-bold text-gray-400 italic mb-3">{exp.company} ({exp.period})</p>
                    <p className="text-xs leading-relaxed text-gray-500 text-justify">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h3 className="text-xl font-black uppercase tracking-wider text-[#2d3e33] mb-4 text-center">Formación</h3>
              <div className="h-0.5 w-full bg-gray-100 mt-2 mb-8"></div>
              <div className="space-y-6">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <h4 className="font-black text-sm text-[#2d3e33] uppercase">{edu.course}</h4>
                    <p className="text-xs font-bold text-gray-400">{edu.institution} ({edu.period})</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-black uppercase tracking-wider text-[#2d3e33] mb-6 text-center">Herramientas</h3>
              <div className="grid grid-cols-1 gap-y-4">
                {data.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-600">{skill}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#2d3e33]" 
                        style={{ width: `${80 + (i % 3) * 5}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
