
import { ResumeData } from "@/lib/resumeContext";
import { Mail, Phone, Globe, MapPin, Calendar, User, Briefcase, GraduationCap, Award, FolderGit2 } from "lucide-react";

interface ModernTemplateProps {
  data: ResumeData;
  isDarkMode: boolean;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, isDarkMode }) => {
  const { personal, skills, experience, education, projects, certifications } = data;

  return (
    <div 
      className={`w-full h-full flex flex-col font-sans ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Header */}
      <div className={`px-8 py-10 ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}>
        <div className="flex flex-col items-center text-center">
          {personal.profileImage && (
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-slate-300 dark:border-slate-700">
              <img 
                src={personal.profileImage} 
                alt={personal.name || "Profile"} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold mb-1">{personal.name || "Your Name"}</h1>
          <p className="text-lg font-medium mb-4 text-slate-500 dark:text-slate-400">{personal.title || "Professional Title"}</p>
          
          {personal.summary && (
            <p className="text-sm max-w-2xl mb-5">{personal.summary}</p>
          )}
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
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
      </div>
      
      {/* Body */}
      <div className="flex-1 flex flex-col md:flex-row p-8 gap-8">
        {/* Left Column */}
        <div className="w-full md:w-2/3 space-y-8">
          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className={`h-5 w-5 ${isDarkMode ? "text-slate-400" : "text-slate-700"}`} />
                <h2 className="text-xl font-bold">Experience</h2>
              </div>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-slate-300 dark:before:bg-slate-700">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{exp.title || "Position"}</h3>
                      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {exp.startDate ? exp.startDate : "Start Date"} - {exp.current ? "Present" : exp.endDate || "End Date"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{exp.company || "Company"}{exp.location ? `, ${exp.location}` : ""}</p>
                    {exp.description && <p className="text-sm">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className={`h-5 w-5 ${isDarkMode ? "text-slate-400" : "text-slate-700"}`} />
                <h2 className="text-xl font-bold">Education</h2>
              </div>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-slate-300 dark:before:bg-slate-700">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{edu.degree || "Degree"}{edu.field ? ` in ${edu.field}` : ""}</h3>
                      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {edu.startDate ? edu.startDate : "Start Date"} - {edu.current ? "Present" : edu.endDate || "End Date"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{edu.institution || "Institution"}</p>
                    {edu.description && <p className="text-sm">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FolderGit2 className={`h-5 w-5 ${isDarkMode ? "text-slate-400" : "text-slate-700"}`} />
                <h2 className="text-xl font-bold">Projects</h2>
              </div>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-slate-300 dark:before:bg-slate-700">
                    <h3 className="font-medium">{project.title || "Project Title"}</h3>
                    {project.technologies && (
                      <p className="text-xs mt-0.5 mb-2">
                        <span className="text-slate-500 dark:text-slate-400">
                          Technologies: {project.technologies}
                        </span>
                      </p>
                    )}
                    {project.description && <p className="text-sm mb-1">{project.description}</p>}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`text-xs inline-block ${
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
        </div>
        
        {/* Right Column */}
        <div className="w-full md:w-1/3 space-y-8">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className={`h-5 w-5 ${isDarkMode ? "text-slate-400" : "text-slate-700"}`} />
                <h2 className="text-xl font-bold">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 text-xs rounded-full ${
                      isDarkMode 
                        ? "bg-slate-800 text-slate-300 border border-slate-700" 
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className={`h-5 w-5 ${isDarkMode ? "text-slate-400" : "text-slate-700"}`} />
                <h2 className="text-xl font-bold">Certifications</h2>
              </div>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="border-l-2 border-slate-300 dark:border-slate-700 pl-4">
                    <h3 className="font-medium">{cert.name || "Certification Name"}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{cert.issuer || "Issuer"}</p>
                    <p className="text-xs mt-1">{cert.date || "Date"}</p>
                    {cert.link && (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`text-xs mt-1 inline-block ${
                          isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
                        }`}
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
