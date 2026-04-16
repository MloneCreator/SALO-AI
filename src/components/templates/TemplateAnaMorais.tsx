import React from 'react';
import { CVData } from '../../types';
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';

export const TemplateAnaMorais: React.FC<{ data: CVData }> = ({ data }) => {
  return (
    <div className="flex min-h-[1123px] w-[794px] bg-white shadow-lg font-serif">
      {/* Sidebar */}
      <div className="w-[35%] p-8 flex flex-col gap-10 overflow-hidden" style={{ width: '35%', backgroundColor: '#e7cdcd', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div className="flex justify-center mb-4 shrink-0" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div 
            className="rounded-full border-4 border-white shadow-xl relative" 
            style={{ 
              width: '180px', 
              height: '180px', 
              borderRadius: '9999px', 
              overflow: 'hidden', 
              border: '4px solid #ffffff', 
              backgroundColor: '#ffffff',
              display: 'block'
            }}
          >
            {data.personalInfo.photoUrl ? (
              <img 
                src={data.personalInfo.photoUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={64} style={{ color: '#a58484' }} />
              </div>
            )}
          </div>
        </div>

        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', color: '#2d2d2d', borderBottom: '2px solid rgba(45,45,45,0.1)', paddingBottom: '0.5rem' }}>Sobre Mim</h3>
          <p style={{ fontSize: '0.875rem', lineHeight: '1.625', color: '#4a4a4a', fontStyle: 'italic', textAlign: 'justify', margin: 0 }}>
            {data.summary}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', color: '#2d2d2d', borderBottom: '2px solid rgba(45,45,45,0.1)', paddingBottom: '0.5rem' }}>Contato</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', backgroundColor: '#2d2d2d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <Phone size={14} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{data.personalInfo.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', backgroundColor: '#2d2d2d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <Mail size={14} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{data.personalInfo.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', backgroundColor: '#2d2d2d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <MapPin size={14} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{data.personalInfo.address}</span>
            </div>
          </div>
        </section>

        <section>
          <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', color: '#2d2d2d', borderBottom: '2px solid rgba(45,45,45,0.1)', paddingBottom: '0.5rem' }}>Educação</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {data.education.map((edu, i) => (
              <div key={i}>
                <p style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem', opacity: 0.6, fontStyle: 'italic' }}>{edu.period}</p>
                <h4 style={{ fontFamily: 'serif', fontSize: '1.125rem', fontWeight: 'bold', color: '#2d2d2d', margin: '0 0 0.25rem 0' }}>{edu.course}</h4>
                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 bg-white flex flex-col gap-12 min-w-0" style={{ backgroundColor: '#ffffff' }}>
        <header className="mb-4 block" style={{ display: 'block', marginBottom: '1.5rem' }}>
          <h1 
            className="text-5xl font-serif font-light mb-4 uppercase tracking-tighter break-words" 
            style={{ 
              fontSize: '3rem', 
              lineHeight: '1.2', 
              color: '#2d2d2d', 
              margin: '0 0 1rem 0',
              fontFamily: 'serif'
            }}
          >
            <span className="block" style={{ display: 'block' }}>{data.personalInfo.fullName.split(' ')[0]}</span>
            <span className="block font-bold" style={{ display: 'block', fontWeight: 'bold' }}>{data.personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
          </h1>
          <div className="h-[2px] w-full mb-6" style={{ height: '2px', width: '100%', backgroundColor: '#e7cdcd', marginBottom: '1.5rem' }}></div>
          <p 
            className="text-xl font-sans font-light uppercase tracking-[0.2em] leading-relaxed"
            style={{ 
              fontSize: '1.25rem', 
              letterSpacing: '0.2em', 
              color: '#444444',
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            {data.personalInfo.jobTitle}
          </p>
        </header>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-serif text-3xl uppercase tracking-widest text-[#2d2d2d]">Experiência</h2>
            <div className="h-[1px] flex-1 bg-[#2d2d2d]/10"></div>
          </div>
          <div className="space-y-10">
            {data.experience.map((exp, i) => (
              <div key={i} className="relative pl-0">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-sans text-lg font-black text-[#2d2d2d] uppercase">{exp.role}</h4>
                  <span className="text-xs font-bold font-sans text-[#2d2d2d] px-3 py-1 bg-[#e7cdcd]/30 rounded-full">{exp.period}</span>
                </div>
                <p className="font-sans text-sm font-bold text-[#2d2d2d]/70 mb-3 tracking-wide">{exp.company}</p>
                <p className="font-sans text-sm leading-relaxed text-[#4a4a4a] text-justify whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-serif text-3xl uppercase tracking-widest text-[#2d2d2d]">Habilidades</h2>
            <div className="h-[1px] flex-1 bg-[#2d2d2d]/10"></div>
          </div>
          <ul className="grid grid-cols-2 gap-y-3 font-sans">
            {data.skills.map((skill, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-[#4a4a4a] font-medium uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-[#e7cdcd]"></div>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
