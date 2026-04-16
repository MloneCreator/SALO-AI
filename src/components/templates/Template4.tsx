import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export const Template4: React.FC<{ data: CVData }> = ({ data }) => {
  const [firstName, ...lastNameParts] = data.personalInfo.fullName.split(' ');
  const lastName = lastNameParts.join(' ');

  return (
    <div className="flex min-h-[1123px] w-[794px] bg-[#f5f5f5] shadow-lg font-sans">
      {/* Sidebar */}
      <div className="w-[30%] bg-[#2b2b2b] text-white p-8 flex flex-col gap-8">
        <div className="flex justify-center mb-4">
          {data.personalInfo.photoUrl ? (
            <img 
              src={data.personalInfo.photoUrl} 
              alt="Profile" 
              className="w-[120px] h-[120px] rounded-lg object-cover border-2 border-white/20"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-[120px] h-[120px] rounded-lg bg-white/10 flex items-center justify-center border-2 border-white/20">
              <Briefcase size={48} />
            </div>
          )}
        </div>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-1">Contacto</h3>
          <div className="space-y-3 text-xs text-gray-300">
            <div className="flex items-center gap-2"><Mail size={12} /> {data.personalInfo.email}</div>
            <div className="flex items-center gap-2"><Phone size={12} /> {data.personalInfo.phone}</div>
            <div className="flex items-center gap-2"><MapPin size={12} /> {data.personalInfo.address}</div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-1">Formación</h3>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="text-xs">
                <p className="font-bold text-white uppercase">{edu.course}</p>
                <p className="text-gray-400">{edu.institution}</p>
                <p className="text-gray-500 italic">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-1">Idiomas</h3>
          <ul className="text-xs space-y-2 text-gray-300">
            {data.languages.map((lang, i) => <li key={i}>{lang}</li>)}
          </ul>
        </section>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-0 flex flex-col">
        <header className="p-10 pb-6 bg-white">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-5xl font-bold text-[#2b2b2b]">{firstName}</span>
            <span className="text-5xl font-light text-[#2b2b2b] uppercase">{lastName}</span>
          </div>
          <div className="bg-[#2b2b2b] text-white px-4 py-2 inline-block text-sm font-bold tracking-widest uppercase">
            {data.personalInfo.jobTitle}
          </div>
        </header>

        <div className="p-10 pt-4 space-y-10">
          <section>
            <p className="text-sm leading-relaxed text-gray-700 italic border-l-4 border-[#2b2b2b] pl-4">
              {data.summary}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2b2b2b] uppercase tracking-widest mb-4 flex items-center gap-2">
              Experiencia <div className="flex-1 h-[1px] bg-[#2b2b2b]/20"></div>
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1.5 w-2 h-2 bg-[#2b2b2b] flex-shrink-0"></div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-sm uppercase">{exp.company}</h4>
                      <span className="text-xs font-bold text-gray-500">{exp.period}</span>
                    </div>
                    <p className="text-xs font-bold text-[#2b2b2b] mb-2">{exp.role}</p>
                    <p className="text-xs leading-relaxed text-gray-600">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2b2b2b] uppercase tracking-widest mb-4 flex items-center gap-2">
              Habilidades <div className="flex-1 h-[1px] bg-[#2b2b2b]/20"></div>
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                  <div className="w-1 h-1 bg-[#2b2b2b] rounded-full"></div>
                  {skill}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
