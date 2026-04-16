import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export const TemplateMurilo: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="flex flex-col min-h-[1123px] w-[794px] bg-white shadow-lg font-sans text-gray-800">
      {/* Header with curve */}
      <div className="relative h-[280px] w-full overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-[#eaeaeb] rounded-bl-[100%] z-0"></div>
        <div className="absolute top-0 left-0 w-full h-[80px] bg-[#cbcbcb] opacity-20 transform -skew-y-3 z-0"></div>

        <div className="relative z-10 flex items-center h-full px-16 gap-10">
          <div className="shrink-0">
            {data.personalInfo.photoUrl ? (
              <img
                src={data.personalInfo.photoUrl}
                alt="Profile"
                className="w-[180px] h-[180px] rounded-full object-cover border-8 border-white shadow-xl"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-[180px] h-[180px] rounded-full bg-gray-200 flex items-center justify-center border-8 border-white shadow-xl">
                <Briefcase size={64} className="text-gray-400" />
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-2xl font-medium text-gray-600 mb-4">{data.personalInfo.jobTitle}</p>
            <p className="max-w-[400px] text-sm leading-relaxed text-gray-500 line-clamp-3">
              {data.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-1 px-16 py-10 gap-12">
        {/* Left Column */}
        <div className="w-[35%] flex flex-col gap-10">
          <section>
            <h3 className="text-xl font-bold border-b-2 border-gray-900 pb-2 mb-4 uppercase tracking-tighter">Formação Académica</h3>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <h4 className="font-bold text-sm text-gray-900 leading-tight">{edu.course}</h4>
                  <p className="text-xs text-gray-600 mb-1">{edu.institution}</p>
                  <p className="text-[10px] font-bold text-gray-400">{edu.period}</p>
                </div>
              ))}
            </div>
          </section>

          {data.certifications.length > 0 && (
            <section>
              <h3 className="text-xl font-bold border-b-2 border-gray-900 pb-2 mb-4 uppercase tracking-tighter">Cursos Complementares</h3>
              <div className="space-y-4">
                {data.certifications.map((cert, i) => (
                  <div key={i} className="text-xs">
                    <p className="font-medium text-gray-800">{cert}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-xl font-bold border-b-2 border-gray-900 pb-2 mb-4 uppercase tracking-tighter">Habilidades</h3>
            <ul className="space-y-1.5 list-disc list-inside text-xs text-gray-700">
              {data.skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold border-b-2 border-gray-900 pb-2 mb-4 uppercase tracking-tighter">Idiomas</h3>
            <ul className="space-y-1 text-xs text-gray-700">
              {data.languages.map((lang, i) => <li key={i} className="font-medium">{lang}</li>)}
            </ul>
          </section>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-10">
          <section className="bg-gray-50 p-4 rounded-lg flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-gray-900" />
              <span className="text-xs font-bold">{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={14} className="text-gray-900" />
              <span className="text-xs font-bold">{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-gray-900" />
              <span className="text-xs font-bold leading-tight">{data.personalInfo.address}</span>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              Experiência Profissional
            </h3>
            <div className="relative ml-2 border-l-2 border-gray-200 pl-8 space-y-8">
              {data.experience.map((exp, i) => (
                <div key={i} className="relative">
                  {/* Dot */}
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-2 border-white bg-gray-400 z-10"></div>

                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-base text-gray-900">{exp.company}</h4>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{exp.period}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-700 mb-2">{exp.role}</p>
                  <p className="text-xs leading-relaxed text-gray-500 whitespace-pre-wrap">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="h-[60px] w-full bg-[#eaeaeb] mt-auto rounded-tl-[100%] opacity-50"></div>
    </div>
  );
};
