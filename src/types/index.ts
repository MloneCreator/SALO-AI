export type TemplateId = 'ana-morais' | 'murilo-nascimento' | 'jordi-dalmau' | 'alberto-navarro' | 'ana-paula';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  photoUrl?: string;
}

export interface Education {
  institution: string;
  course: string;
  period: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  languages: string[];
  certifications: string[];
  coverLetterInfo: {
    targetCompany: string;
    targetRole: string;
    motivation: string;
  };
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
