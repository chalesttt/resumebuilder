
import { ResumeData } from "@/lib/resumeContext";

interface ProfessionalTemplateProps {
  data: ResumeData;
  isDarkMode: boolean;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data, isDarkMode }) => {
  const { personal, skills, experience, education, projects, certifications } = data;
  
  const primaryColor = isDarkMode ? "#3B82F6" : "#2563EB"; // Blue color
  const primaryLight = isDarkMode ? "#93C5FD" : "#BFDBFE";
  
  return (
    <div 
      className={`w-full h-full font-sans ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Header with accent color */}
      <div 
        style={{ backgroundColor: primaryColor }}
        className="px-8 py-6 text-white"
      >
        <h1 className="text-3xl font-bold">{personal.name || "Your Name"}</h1>
        <p className="text-lg opacity-90">{personal.title || "Professional Title"}</p>
      </div>
      
      {/* Contact Information */}
      <div className={`px-8 py-3 text-sm ${isDarkMode ? "bg-slate-800" : "bg-slate-100"} flex flex-wrap justify-between`}>
        {personal.email && <span>{personal.email}</span>}
        {personal.phone && <span>{personal.phone}</span>}
        {personal.website && <span>{personal.website}</span>}
        {personal.location && <span>{personal.location}</span>}
      </div>
      
      {/* Main Content */}
      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - 2/3 width */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* Summary */}
            {personal.summary && (
              <div className="mb-6">
                <h2 
                  style={{ color: primaryColor }}
                  className="text-lg font-bold uppercase mb-3 pb-1 border-b"
                >
                  Professional Summary
                </h2>
                <p className="text-sm">{personal.summary}</p>
              </div>
            )}
            
            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2 
                  style={{ color: primaryColor }}
                  className="text-lg font-bold uppercase mb-4 pb-1 border-b"
                >
                  Work Experience
                </h2>
                <div className="space-y-5">
                  {experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex flex-col md:flex-row justify-between mb-1">
                        <h3 className="font-bold">{exp.title || "Position"}</h3>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {exp.startDate ? exp.startDate : "Start Date"} - {exp.current ? "Present" : exp.endDate || "End Date"}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-2">
                        {exp.company || "Company"}{exp.location ? `, ${exp.location}` : ""}
                      </p>
                      {exp.description && (
                        <p className="text-sm">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 
                  style={{ color: primaryColor }}
                  className="text-lg font-bold uppercase mb-4 pb-1 border-b"
                >
                  Education
                </h2>
                <div className="space-y-5">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <div className="flex flex-col md:flex-row justify-between mb-1">
                        <h3 className="font-bold">{edu.degree || "Degree"}{edu.field ? ` in ${edu.field}` : ""}</h3>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {edu.startDate ? edu.startDate : "Start Date"} - {edu.current ? "Present" : edu.endDate || "End Date"}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-2">{edu.institution || "Institution"}</p>
                      {edu.description && (
                        <p className="text-sm">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - 1/3 width */}
          <div className="w-full md:w-1/3 space-y-6">
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 
                  style={{ color: primaryColor }}
                  className="text-lg font-bold uppercase mb-3 pb-1 border-b"
                >
                  Skills
                </h2>
                <div className="flex flex-col gap-1">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        style={{ backgroundColor: primaryLight }}
                        className="w-2 h-2 rounded-full"
                      ></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h2 
                  style={{ color: primaryColor }}
                  className="text-lg font-bold uppercase mb-3 pb-1 border-b"
                >
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index}>
                      <h3 className="font-bold">{project.title || "Project Title"}</h3>
                      {project.technologies && (
                        <p className="text-xs mt-0.5 mb-1">
                          <span className="font-medium">Technologies:</span> {project.technologies}
                        </p>
                      )}
                      {project.description && <p className="text-sm">{project.description}</p>}
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: primaryColor }}
                          className="text-xs mt-1 inline-block hover:underline"
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
                <h2 
                  style={{ color: primaryColor }}
                  className="text-lg font-bold uppercase mb-3 pb-1 border-b"
                >
                  Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <h3 className="font-bold">{cert.name || "Certification Name"}</h3>
                      <p className="text-sm">{cert.issuer || "Issuer"} | {cert.date || "Date"}</p>
                      {cert.link && (
                        <a 
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: primaryColor }}
                          className="text-xs hover:underline"
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
    </div>
  );
};

export default ProfessionalTemplate;
