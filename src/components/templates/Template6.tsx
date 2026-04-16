import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export const Template6: React.FC<{ data: CVData }> = ({ data }) => {
  const [firstName, ...lastNameParts] = data.personalInfo.fullName.split(' ');
  const lastName = lastNameParts.join(' ');

  return (
    <div className="flex min-h-[1123px] w-[794px] bg-white shadow-lg font-sans">
      {/* Sidebar */}
      <div className="w-[35%] bg-[#7a8fa0] text-white p-8 flex flex-col gap-8">
        <div className="flex justify-center mb-4">
          {data.personalInfo.photoUrl ? (
            <img 
              src={data.personalInfo.photoUrl} 
              alt="Profile" 
              className="w-[140px] h-[140px] rounded-full object-cover border-4 border-white shadow-sm"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-[140px] h-[140px] rounded-full bg-white/20 flex items-center justify-center border-4 border-white shadow-sm">
              <Briefcase size={56} />
            </div>
          )}
        </div>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-white/30 pb-1">Educación</h3>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="text-xs">
                <p className="font-bold text-white uppercase">{edu.course}</p>
                <p className="text-white/80">{edu.institution}</p>
                <p className="text-white/60 italic">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-white/30 pb-1">Idiomas</h3>
          <ul className="text-xs space-y-2 text-white/80">
            {data.languages.map((lang, i) => <li key={i}>{lang}</li>)}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b border-white/30 pb-1">Contacto</h3>
          <div className="space-y-3 text-xs text-white/80">
            <div className="flex items-center gap-2"><Mail size={12} /> {data.personalInfo.email}</div>
            <div className="flex items-center gap-2"><Phone size={12} /> {data.personalInfo.phone}</div>
            <div className="flex items-center gap-2"><MapPin size={12} /> {data.personalInfo.address}</div>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 text-[#333]">
        <header className="mb-10">
          <div className="text-6xl font-black text-gray-900 leading-none mb-4">
            <p>{firstName}</p>
            <p className="text-gray-400">{lastName}</p>
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-gray-500 mb-6">{data.personalInfo.jobTitle}</p>
          <p className="text-sm italic leading-relaxed text-gray-600 border-l-2 border-[#7a8fa0] pl-6 py-1">
            {data.summary}
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-[#7a8fa0]">Experiencia Laboral</h2>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-bold text-sm uppercase tracking-wide">{exp.role}</h4>
                  <span className="text-xs text-gray-400 font-medium">{exp.period}</span>
                </div>
                <p className="text-xs font-semibold text-gray-500 mb-2 italic">{exp.company}</p>
                <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-[#7a8fa0]">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="text-xs border border-gray-200 px-3 py-1 text-gray-600">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {data.certifications.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-[#7a8fa0]">Outros Conhecimentos</h2>
            <ul className="text-xs space-y-2 text-gray-600 grid grid-cols-2 gap-2">
              {data.certifications.map((cert, i) => <li key={i} className="flex items-center gap-2"><span className="w-1 h-1 bg-[#7a8fa0] rounded-full"></span>{cert}</li>)}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
