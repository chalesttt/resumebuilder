
import React, { useState } from "react";
import { useResume } from "@/lib/resumeContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { X, Plus, Trash2, Save, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const FormSection = () => {
  const {
    resumeData,
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
  } = useResume();

  const [newSkill, setNewSkill] = useState("");

  const handleSkillAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill(newSkill);
      setNewSkill("");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 11 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
    updatePersonal({ phone: value });
  };

  const handleSave = () => {
    saveResume();
    toast.success("Resume data saved");
  };

  const handleReset = () => {
    resetForm();
    toast.info("Form has been reset");
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6">
      <div className="max-w-[900px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 className="text-2xl font-display font-bold">Resume Builder</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Fill out the form to create your resume
            </p>
          </div>
          
          <div className="flex items-center gap-2">            
            <Button variant="default" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              <span>Save</span>
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              <span>Reset</span>
            </Button>
          </div>
        </div>
        
        <Accordion
          type="multiple"
          defaultValue={["personal"]}
          className="w-full"
        >
          {/* Personal Information */}
          <AccordionItem value="personal" className="border rounded-lg p-2 mb-4">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <span className="text-lg font-medium">Personal Information</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={resumeData.personal.name}
                    onChange={(e) => updatePersonal({ name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    placeholder="Software Engineer"
                    value={resumeData.personal.title}
                    onChange={(e) => updatePersonal({ title: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={resumeData.personal.email}
                    onChange={(e) => updatePersonal({ email: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone (11 digits)</Label>
                  <Input
                    id="phone"
                    placeholder="12345678901"
                    value={resumeData.personal.phone}
                    onChange={handlePhoneChange}
                    className="mt-1"
                    maxLength={11}
                    inputMode="numeric"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {resumeData.personal.phone.length}/11 digits
                  </p>
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://johndoe.com"
                    value={resumeData.personal.website}
                    onChange={(e) => updatePersonal({ website: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="New York, NY"
                    value={resumeData.personal.location}
                    onChange={(e) => updatePersonal({ location: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="summary">Objectives</Label>
                <Textarea
                  id="summary"
                  placeholder="A brief summary of your professional background and goals"
                  value={resumeData.personal.summary}
                  onChange={(e) => updatePersonal({ summary: e.target.value })}
                  className="mt-1 h-24"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Skills */}
          <AccordionItem value="skills" className="border rounded-lg p-2 mb-4">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <span className="text-lg font-medium">Skills</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="mb-4">
                <form onSubmit={handleSkillAdd} className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Add</Button>
                </form>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {resumeData.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center gap-2"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {resumeData.skills.length === 0 && (
                <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                  No skills added yet. Add some skills to get started.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
          
          {/* Experience */}
          <AccordionItem value="experience" className="border rounded-lg p-2 mb-4">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <span className="text-lg font-medium">Experience</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="mb-4">
                <Button onClick={addExperience} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>
              
              <AnimatePresence>
                {resumeData.experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">Experience {index + 1}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExperience(index)}
                            className="h-8 w-8 p-0 text-slate-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`exp-title-${index}`}>Title</Label>
                            <Input
                              id={`exp-title-${index}`}
                              placeholder="Senior Developer"
                              value={exp.title}
                              onChange={(e) =>
                                updateExperience(index, { title: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`exp-company-${index}`}>Company</Label>
                            <Input
                              id={`exp-company-${index}`}
                              placeholder="Acme Inc."
                              value={exp.company}
                              onChange={(e) =>
                                updateExperience(index, { company: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`exp-location-${index}`}>Location</Label>
                            <Input
                              id={`exp-location-${index}`}
                              placeholder="San Francisco, CA"
                              value={exp.location}
                              onChange={(e) =>
                                updateExperience(index, { location: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div className="flex items-center mt-4">
                            <Switch
                              id={`exp-current-${index}`}
                              checked={exp.current}
                              onCheckedChange={(checked) =>
                                updateExperience(index, { current: checked })
                              }
                            />
                            <Label htmlFor={`exp-current-${index}`} className="ml-2">
                              Current Position
                            </Label>
                          </div>
                          <div>
                            <Label htmlFor={`exp-start-${index}`}>Start Date</Label>
                            <Input
                              id={`exp-start-${index}`}
                              placeholder="Jan 2020"
                              value={exp.startDate}
                              onChange={(e) =>
                                updateExperience(index, { startDate: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          {!exp.current && (
                            <div>
                              <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                              <Input
                                id={`exp-end-${index}`}
                                placeholder="Dec 2022"
                                value={exp.endDate}
                                onChange={(e) =>
                                  updateExperience(index, { endDate: e.target.value })
                                }
                                className="mt-1"
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <Label htmlFor={`exp-description-${index}`}>Description</Label>
                          <Textarea
                            id={`exp-description-${index}`}
                            placeholder="Describe your responsibilities and achievements"
                            value={exp.description}
                            onChange={(e) =>
                              updateExperience(index, { description: e.target.value })
                            }
                            className="mt-1 h-24"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {resumeData.experience.length === 0 && (
                <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                  No experience added yet. Add your work experience to get started.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
          
          {/* Education */}
          <AccordionItem value="education" className="border rounded-lg p-2 mb-4">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <span className="text-lg font-medium">Education</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="mb-4">
                <Button onClick={addEducation} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>
              
              <AnimatePresence>
                {resumeData.education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">Education {index + 1}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEducation(index)}
                            className="h-8 w-8 p-0 text-slate-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`edu-institution-${index}`}>Institution</Label>
                            <Input
                              id={`edu-institution-${index}`}
                              placeholder="Stanford University"
                              value={edu.institution}
                              onChange={(e) =>
                                updateEducation(index, { institution: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                            <Input
                              id={`edu-degree-${index}`}
                              placeholder="Bachelor's"
                              value={edu.degree}
                              onChange={(e) =>
                                updateEducation(index, { degree: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edu-field-${index}`}>Field of Study</Label>
                            <Input
                              id={`edu-field-${index}`}
                              placeholder="Computer Science"
                              value={edu.field}
                              onChange={(e) =>
                                updateEducation(index, { field: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div className="flex items-center mt-4">
                            <Switch
                              id={`edu-current-${index}`}
                              checked={edu.current}
                              onCheckedChange={(checked) =>
                                updateEducation(index, { current: checked })
                              }
                            />
                            <Label htmlFor={`edu-current-${index}`} className="ml-2">
                              Current Student
                            </Label>
                          </div>
                          <div>
                            <Label htmlFor={`edu-start-${index}`}>Start Date</Label>
                            <Input
                              id={`edu-start-${index}`}
                              placeholder="Sep 2016"
                              value={edu.startDate}
                              onChange={(e) =>
                                updateEducation(index, { startDate: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          {!edu.current && (
                            <div>
                              <Label htmlFor={`edu-end-${index}`}>End Date</Label>
                              <Input
                                id={`edu-end-${index}`}
                                placeholder="Jun 2020"
                                value={edu.endDate}
                                onChange={(e) =>
                                  updateEducation(index, { endDate: e.target.value })
                                }
                                className="mt-1"
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <Label htmlFor={`edu-description-${index}`}>Description</Label>
                          <Textarea
                            id={`edu-description-${index}`}
                            placeholder="Relevant coursework, achievements, or activities"
                            value={edu.description}
                            onChange={(e) =>
                              updateEducation(index, { description: e.target.value })
                            }
                            className="mt-1 h-24"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {resumeData.education.length === 0 && (
                <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                  No education added yet. Add your educational background to get started.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
          
          {/* Projects */}
          <AccordionItem value="projects" className="border rounded-lg p-2 mb-4">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <span className="text-lg font-medium">Projects</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="mb-4">
                <Button onClick={addProject} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
              
              <AnimatePresence>
                {resumeData.projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">Project {index + 1}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProject(index)}
                            className="h-8 w-8 p-0 text-slate-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor={`project-title-${index}`}>Title</Label>
                          <Input
                            id={`project-title-${index}`}
                            placeholder="E-commerce Website"
                            value={project.title}
                            onChange={(e) =>
                              updateProject(index, { title: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`project-tech-${index}`}>Technologies</Label>
                          <Input
                            id={`project-tech-${index}`}
                            placeholder="React, Node.js, MongoDB"
                            value={project.technologies}
                            onChange={(e) =>
                              updateProject(index, { technologies: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                          <Input
                            id={`project-link-${index}`}
                            placeholder="https://github.com/yourusername/project"
                            value={project.link}
                            onChange={(e) =>
                              updateProject(index, { link: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`project-desc-${index}`}>Description</Label>
                          <Textarea
                            id={`project-desc-${index}`}
                            placeholder="Describe the project, your role, and its impact"
                            value={project.description}
                            onChange={(e) =>
                              updateProject(index, { description: e.target.value })
                            }
                            className="mt-1 h-24"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {resumeData.projects.length === 0 && (
                <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                  No projects added yet. Add your portfolio projects to get started.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
          
          {/* Certifications */}
          <AccordionItem value="certifications" className="border rounded-lg p-2 mb-4">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <span className="text-lg font-medium">Certifications</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="mb-4">
                <Button onClick={addCertification} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certification
                </Button>
              </div>
              
              <AnimatePresence>
                {resumeData.certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">Certification {index + 1}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCertification(index)}
                            className="h-8 w-8 p-0 text-slate-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor={`cert-name-${index}`}>Name</Label>
                          <Input
                            id={`cert-name-${index}`}
                            placeholder="AWS Certified Solutions Architect"
                            value={cert.name}
                            onChange={(e) =>
                              updateCertification(index, { name: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`cert-issuer-${index}`}>Issuer</Label>
                          <Input
                            id={`cert-issuer-${index}`}
                            placeholder="Amazon Web Services"
                            value={cert.issuer}
                            onChange={(e) =>
                              updateCertification(index, { issuer: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`cert-date-${index}`}>Date</Label>
                          <Input
                            id={`cert-date-${index}`}
                            placeholder="May 2023"
                            value={cert.date}
                            onChange={(e) =>
                              updateCertification(index, { date: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`cert-link-${index}`}>Certificate Link</Label>
                          <Input
                            id={`cert-link-${index}`}
                            placeholder="https://www.credential.net/..."
                            value={cert.link}
                            onChange={(e) =>
                              updateCertification(index, { link: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {resumeData.certifications.length === 0 && (
                <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                  No certifications added yet. Add your professional certifications to get started.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FormSection;
