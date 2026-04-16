import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export const TemplateAlberto: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="flex min-h-[1123px] w-[794px] bg-white shadow-lg font-sans">
      {/* Sidebar */}
      <div className="w-[30%] bg-[#3d3d3d] text-white p-8 flex flex-col gap-10">
        <div className="flex justify-center -mt-4 mb-4">
          {data.personalInfo.photoUrl ? (
            <img 
              src={data.personalInfo.photoUrl} 
              alt="Profile" 
              className="w-[180px] h-[180px] object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-[180px] h-[180px] bg-white/10 flex items-center justify-center border-4 border-white/20">
              <Briefcase size={64} className="text-white/30" />
            </div>
          )}
        </div>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/20 pb-2">Contacto</h3>
          <div className="space-y-5 text-gray-300">
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-white" />
              <span className="text-[11px] font-medium">{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={14} className="text-white" />
              <span className="text-[11px] font-medium truncate">{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-white" />
              <span className="text-[11px] font-medium leading-tight">{data.personalInfo.address}</span>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/20 pb-2">Formación</h3>
          <div className="space-y-6">
            {data.education.map((edu, i) => (
              <div key={i}>
                <h4 className="text-[11px] font-bold text-white uppercase leading-tight mb-1">{edu.institution}</h4>
                <p className="text-[11px] text-gray-400 font-bold italic mb-1">{edu.period}</p>
                <p className="text-[11px] text-white font-medium opacity-80">{edu.course}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/20 pb-2">Informática</h3>
          <ul className="space-y-2 text-[11px] text-gray-300">
            {data.skills.map((skill, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/20 pb-2">Idiomas</h3>
          <div className="space-y-2">
            {data.languages.map((lang, i) => (
              <div key={i} className="flex justify-between text-[11px] text-gray-300">
                <span className="font-bold">{lang}</span>
                <span className="opacity-50 italic">Nativo</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 bg-white">
        <header className="mb-14 flex flex-col items-end text-right">
          <h1 className="text-6xl font-black text-[#3d3d3d] uppercase tracking-tighter mb-2 leading-none">
            {data.personalInfo.fullName.split(' ')[0]} <span className="text-gray-400 font-light">{data.personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
          </h1>
          <div className="bg-[#3d3d3d] text-white py-1 px-4 inline-block tracking-widest font-bold uppercase text-[10px] mb-6">
            {data.personalInfo.jobTitle}
          </div>
          <p className="max-w-[450px] text-xs leading-relaxed text-gray-500 font-medium">
            {data.summary}
          </p>
        </header>

        <section className="mb-12">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#3d3d3d] mb-8 flex items-center gap-4">
            Experiencia
            <div className="h-[1px] flex-1 bg-gray-200"></div>
          </h3>
          <div className="relative border-l border-gray-200 ml-2 pl-10 space-y-12">
            {data.experience.map((exp, i) => (
              <div key={i} className="relative">
                {/* Square marker */}
                <div className="absolute -left-[45px] top-1.5 w-2.5 h-2.5 bg-[#3d3d3d] z-10 transition-transform group-hover:scale-125"></div>
                
                <h4 className="text-sm font-black text-[#3d3d3d] uppercase mb-1">{exp.company} ({exp.period})</h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{exp.role}</p>
                
                <p className="text-xs leading-relaxed text-gray-500 font-medium whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {data.certifications.length > 0 && (
          <section>
            <h3 className="text-sm font-black uppercase tracking-widest text-[#3d3d3d] mb-8 flex items-center gap-4">
              Formación Complementaria
              <div className="h-[1px] flex-1 bg-gray-200"></div>
            </h3>
            <div className="space-y-6">
              {data.certifications.map((cert, i) => (
                <div key={i} className="flex gap-4 items-start">
                   <div className="w-1.5 h-1.5 bg-[#3d3d3d] mt-1.5 shrink-0"></div>
                   <p className="text-xs font-bold text-gray-600 uppercase tracking-widest leading-relaxed">{cert}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
