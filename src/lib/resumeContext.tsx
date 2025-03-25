
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the interface for form data
export interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    website: string;
    location: string;
    profileImage: string | null;
    summary: string;
  };
  skills: string[];
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    technologies: string;
    link: string;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    link: string;
  }[];
}

// Create a default empty resume state
export const defaultResumeData: ResumeData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    profileImage: null,
    summary: '',
  },
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certifications: [],
};

// Define the interface for the context type
type ResumeContextType = {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updatePersonal: (personal: Partial<ResumeData['personal']>) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  addExperience: () => void;
  updateExperience: (index: number, experience: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (index: number) => void;
  addEducation: () => void;
  updateEducation: (index: number, education: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (index: number) => void;
  addProject: () => void;
  updateProject: (index: number, project: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (index: number) => void;
  addCertification: () => void;
  updateCertification: (index: number, certification: Partial<ResumeData['certifications'][0]>) => void;
  removeCertification: (index: number) => void;
  saveResume: () => void;
  resetForm: () => void;
  activeTemplate: string;
  setActiveTemplate: (template: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

// Create the context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Generate unique ID for items
const generateId = () => Math.random().toString(36).substring(2, 11);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  // Load data from localStorage on initial render
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('resumeData');
      return savedData ? JSON.parse(savedData) : defaultResumeData;
    }
    return defaultResumeData;
  });

  const [activeTemplate, setActiveTemplate] = useState<string>('minimalist');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(true);

  // Save to localStorage on state changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonal = (personal: Partial<ResumeData['personal']>) => {
    setResumeData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        ...personal,
      },
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };

  const removeSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: generateId(),
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    }));
  };

  const updateExperience = (index: number, experience: Partial<ResumeData['experience'][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, ...experience } : exp
      ),
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: generateId(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    }));
  };

  const updateEducation = (index: number, education: Partial<ResumeData['education'][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, ...education } : edu
      ),
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: generateId(),
          title: '',
          description: '',
          technologies: '',
          link: '',
        },
      ],
    }));
  };

  const updateProject = (index: number, project: Partial<ResumeData['projects'][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj, i) =>
        i === index ? { ...proj, ...project } : proj
      ),
    }));
  };

  const removeProject = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const addCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: generateId(),
          name: '',
          issuer: '',
          date: '',
          link: '',
        },
      ],
    }));
  };

  const updateCertification = (index: number, certification: Partial<ResumeData['certifications'][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? { ...cert, ...certification } : cert
      ),
    }));
  };

  const removeCertification = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const saveResume = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  };

  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset all form data? This cannot be undone.')) {
      setResumeData(defaultResumeData);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updatePersonal,
        addSkill,
        removeSkill,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        updateCertification,
        removeCertification,
        saveResume,
        resetForm,
        activeTemplate,
        setActiveTemplate,
        isDarkMode,
        setIsDarkMode,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
