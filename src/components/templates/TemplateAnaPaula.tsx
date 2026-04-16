import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, MapPin, Globe, Briefcase } from 'lucide-react';

export const TemplateAnaPaula: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="flex min-h-[1123px] w-[794px] bg-white shadow-lg font-sans">
      {/* Sidebar */}
      <div className="w-[35%] bg-[#2d3e33] text-white flex flex-col pt-0">
        {/* Arched Background for Photo */}
        <div className="relative w-full h-[320px] bg-white p-6 overflow-hidden">
            {/* The arch effect using border radius */}
            <div className="absolute inset-0 bg-[#2d3e33] rounded-b-full scale-150 transform -translate-y-1/2"></div>
            
            <div className="relative z-10 flex justify-center h-full">
              {data.personalInfo.photoUrl ? (
                <div className="w-full h-full rounded-t-full overflow-hidden border-8 border-[#2d3e33]">
                  <img 
                    src={data.personalInfo.photoUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="w-full h-full rounded-t-full bg-gray-100 flex items-center justify-center border-8 border-[#2d3e33]">
                  <Briefcase size={80} className="text-[#2d3e33]/20" />
                </div>
              )}
            </div>
        </div>

        <div className="p-10 flex flex-col gap-12">
          <section>
            <h3 className="text-xl font-bold uppercase tracking-[0.2em] mb-4 border-b-2 border-white/20 pb-2">Habilidades</h3>
            <ul className="text-sm space-y-2 font-medium opacity-90 list-disc list-inside">
              {data.skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold uppercase tracking-[0.2em] mb-4 border-b-2 border-white/20 pb-2">Softwares</h3>
             <ul className="text-sm space-y-2 font-medium opacity-90 list-disc list-inside">
              {data.certifications.slice(0, 5).map((soft, i) => <li key={i}>{soft}</li>)}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold uppercase tracking-[0.2em] mb-4 border-b-2 border-white/20 pb-2">Idiomas</h3>
            <ul className="text-sm space-y-3 font-medium opacity-90">
              {data.languages.map((lang, i) => (
                <li key={i} className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                   {lang}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-14 flex flex-col gap-14 bg-white">
        <header className="flex flex-col gap-4">
          <h1 className="text-6xl font-black text-[#2d3e33] tracking-tighter leading-none">{data.personalInfo.fullName}</h1>
          <p className="text-2xl font-bold text-[#2d3e33] uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
          
          <div className="flex flex-col gap-2 mt-4 text-[#2d3e33]">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-[#2d3e33]" />
              <span className="text-sm font-bold tracking-wide">{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-[#2d3e33]" />
              <span className="text-sm font-bold tracking-wide break-all">{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={16} className="text-[#2d3e33]" />
              <span className="text-sm font-bold tracking-wide">www.seusite.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-[#2d3e33]" />
              <span className="text-sm font-bold tracking-wide font-medium leading-tight">{data.personalInfo.address}</span>
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-[#2d3e33] mb-6">Perfil Profissional</h2>
          <div className="h-1.5 w-full bg-gray-100 mb-8"></div>
          <p className="text-sm leading-relaxed text-gray-600 font-medium text-justify">
            {data.summary}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-[#2d3e33] mb-6">Experiência</h2>
          <div className="h-1.5 w-full bg-gray-100 mb-8"></div>
          <div className="space-y-10 text-[#2d3e33]">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <h4 className="font-black text-lg mb-1">{exp.role}</h4>
                <p className="font-bold text-gray-800 mb-1">{exp.company} | {exp.period}</p>
                <p className="text-sm leading-relaxed text-gray-500 font-medium text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-[#2d3e33] mb-6">Formação Académica</h2>
          <div className="h-1.5 w-full bg-gray-100 mb-8"></div>
          <div className="space-y-8 text-[#2d3e33]">
            {data.education.map((edu, i) => (
              <div key={i}>
                <h4 className="font-black text-lg mb-1 leading-tight">{edu.course}</h4>
                <p className="font-bold text-gray-800 mb-1 tracking-wider uppercase text-xs">{edu.period}</p>
                <p className="text-sm font-bold text-gray-500">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
