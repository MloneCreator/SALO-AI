import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export const Template3: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="relative flex min-h-[1123px] w-[794px] bg-white shadow-lg font-sans overflow-hidden">
      {/* Decorative shape */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#f0f0f0] -mr-24 -mt-24 rotate-45 z-0"></div>

      {/* Sidebar */}
      <div className="w-[30%] bg-[#f0f0f0] p-8 flex flex-col gap-8 z-10">
        <div className="flex justify-start mb-4">
          {data.personalInfo.photoUrl ? (
            <img 
              src={data.personalInfo.photoUrl} 
              alt="Profile" 
              className="w-[110px] h-[110px] rounded-full object-cover border-4 border-white shadow-sm"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-[110px] h-[110px] rounded-full bg-white flex items-center justify-center border-4 border-white shadow-sm">
              <Briefcase size={40} className="text-gray-300" />
            </div>
          )}
        </div>

        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 border-l-4 border-gray-400 pl-2">Formação Acadêmica</h3>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="text-xs">
                <p className="font-bold text-gray-700">{edu.course}</p>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-gray-500">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 border-l-4 border-gray-400 pl-2">Habilidades</h3>
          <ul className="text-xs space-y-2 text-gray-600">
            {data.skills.map((skill, i) => <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>{skill}</li>)}
          </ul>
        </section>

        {data.certifications.length > 0 && (
          <section>
            <h3 className="text-sm font-bold text-gray-800 mb-4 border-l-4 border-gray-400 pl-2">Cursos</h3>
            <ul className="text-xs space-y-2 text-gray-600">
              {data.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
            </ul>
          </section>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 text-[#333] z-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-1">{data.personalInfo.fullName}</h1>
          <p className="text-lg text-gray-500 font-medium mb-4">{data.personalInfo.jobTitle}</p>
          <p className="text-sm leading-relaxed text-gray-600 mb-6">{data.summary}</p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 border-t border-b border-gray-100 py-3">
            <span className="flex items-center gap-1"><Mail size={12} /> {data.personalInfo.email}</span>
            <span className="flex items-center gap-1"><Phone size={12} /> {data.personalInfo.phone}</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> {data.personalInfo.address}</span>
          </div>
        </header>

        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wider">Experiência Profissional</h2>
          <div className="relative ml-2 border-l-2 border-gray-200 pl-8 space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[37px] top-1 w-4 h-4 bg-white border-2 border-gray-400 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                </div>
                
                <div className="mb-1">
                  <span className="text-xs font-bold text-gray-800">{exp.company}</span>
                  <span className="text-xs text-gray-400 mx-2">|</span>
                  <span className="text-xs font-bold text-gray-500">{exp.period}</span>
                </div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">{exp.role}</h4>
                <p className="text-xs leading-relaxed text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
