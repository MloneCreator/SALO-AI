import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap } from 'lucide-react';

export const Template1: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="flex min-h-[1123px] w-[794px] bg-white shadow-lg font-serif">
      {/* Sidebar */}
      <div className="w-[35%] bg-[#2d5a27] text-white p-8 flex flex-col gap-8">
        <div className="flex justify-center">
          {data.personalInfo.photoUrl ? (
            <img 
              src={data.personalInfo.photoUrl} 
              alt="Profile" 
              className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white/20"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-[120px] h-[120px] rounded-full bg-white/10 flex items-center justify-center border-4 border-white/20">
              <Briefcase size={48} />
            </div>
          )}
        </div>

        <section>
          <h3 className="font-bold uppercase tracking-wider mb-4 border-b border-white/30 pb-1">Habilidades</h3>
          <ul className="text-sm space-y-2 list-disc list-inside">
            {data.skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </section>

        <section>
          <h3 className="font-bold uppercase tracking-wider mb-4 border-b border-white/30 pb-1">Idiomas</h3>
          <ul className="text-sm space-y-2">
            {data.languages.map((lang, i) => <li key={i}>{lang}</li>)}
          </ul>
        </section>

        {data.certifications.length > 0 && (
          <section>
            <h3 className="font-bold uppercase tracking-wider mb-4 border-b border-white/30 pb-1">Cursos Livres</h3>
            <ul className="text-sm space-y-2">
              {data.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
            </ul>
          </section>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 text-[#333]">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#2d5a27] mb-1 uppercase">{data.personalInfo.fullName}</h1>
          <p className="text-xl text-[#2d5a27] font-medium mb-4">{data.personalInfo.jobTitle}</p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <span className="flex items-center gap-1"><Mail size={12} /> {data.personalInfo.email}</span>
            <span className="flex items-center gap-1"><Phone size={12} /> {data.personalInfo.phone}</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> {data.personalInfo.address}</span>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-bold text-[#2d5a27] uppercase border-b-2 border-[#2d5a27] mb-4">Perfil Profissional</h2>
          <p className="text-sm leading-relaxed text-justify">{data.summary}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold text-[#2d5a27] uppercase border-b-2 border-[#2d5a27] mb-4">Experiência</h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-sm">{exp.role}</h4>
                  <span className="text-xs text-gray-500 italic">{exp.period}</span>
                </div>
                <p className="text-xs font-medium text-[#2d5a27] mb-2">{exp.company}</p>
                <p className="text-xs leading-relaxed text-justify">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#2d5a27] uppercase border-b-2 border-[#2d5a27] mb-4">Formação Académica</h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-sm">{edu.course}</h4>
                  <span className="text-xs text-gray-500 italic">{edu.period}</span>
                </div>
                <p className="text-xs text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
