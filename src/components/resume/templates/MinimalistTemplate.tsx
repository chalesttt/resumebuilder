
import { ResumeData } from "@/lib/resumeContext";
import { motion } from "framer-motion";
import { Mail, Phone, Globe, MapPin, Calendar } from "lucide-react";

interface MinimalistTemplateProps {
  data: ResumeData;
  isDarkMode: boolean;
}

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ data, isDarkMode }) => {
  const { personal, skills, experience, education, projects, certifications } = data;

  return (
    <div 
      className={`w-full h-full p-8 font-sans ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl font-bold mb-1">{personal.name || "Your Name"}</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-3">{personal.title || "Professional Title"}</p>
        
        <div className="flex flex-wrap gap-3 text-sm">
          {personal.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              <span>{personal.email}</span>
            </div>
          )}
          
          {personal.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              <span>{personal.phone}</span>
            </div>
          )}
          
          {personal.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              <span>{personal.website}</span>
            </div>
          )}
          
          {personal.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{personal.location}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Profile */}
      {personal.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b border-slate-200 dark:border-slate-700">Objectives</h2>
          <p className="text-sm">{personal.summary}</p>
        </div>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b border-slate-200 dark:border-slate-700">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className={`px-3 py-1 text-xs rounded-full ${
                  isDarkMode 
                    ? "bg-slate-800 text-slate-300" 
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b border-slate-200 dark:border-slate-700">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium">{exp.title || "Position"}</h3>
                    <p className="text-sm">{exp.company || "Company"}{exp.location ? `, ${exp.location}` : ""}</p>
                  </div>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {exp.startDate ? exp.startDate : "Start Date"} - {exp.current ? "Present" : exp.endDate || "End Date"}
                    </span>
                  </div>
                </div>
                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b border-slate-200 dark:border-slate-700">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium">{edu.degree || "Degree"}{edu.field ? ` in ${edu.field}` : ""}</h3>
                    <p className="text-sm">{edu.institution || "Institution"}</p>
                  </div>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {edu.startDate ? edu.startDate : "Start Date"} - {edu.current ? "Present" : edu.endDate || "End Date"}
                    </span>
                  </div>
                </div>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b border-slate-200 dark:border-slate-700">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-medium">{project.title || "Project Title"}</h3>
                {project.technologies && (
                  <p className="text-xs mt-0.5 mb-1">
                    <span className={`${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      Technologies: {project.technologies}
                    </span>
                  </p>
                )}
                {project.description && <p className="text-sm">{project.description}</p>}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`text-xs mt-1 inline-block ${
                      isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
                    }`}
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b border-slate-200 dark:border-slate-700">Certifications</h2>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <h3 className="font-medium">{cert.name || "Certification Name"}</h3>
                  <p className="text-sm">{cert.issuer || "Issuer"}</p>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {cert.date || "Date"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalistTemplate;
