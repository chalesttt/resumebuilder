
import React, { useState, useEffect } from "react";
import { useResume } from "@/lib/resumeContext";
import Navbar from "@/components/Navbar";
import FormSection from "@/components/resume/FormSection";
import ResumePreview from "@/components/resume/ResumePreview";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";

const Builder = () => {
  const { isEditing, setIsEditing, isDarkMode, setIsDarkMode } = useResume();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  
  useEffect(() => {
    // Set edit mode based on screen size
    if (isMobile) {
      setIsEditing(activeTab === "edit");
    }
    
    // Update document class based on dark mode setting
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isMobile, activeTab, setIsEditing, isDarkMode]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // For desktop view, handle side-by-side edit and preview
  if (!isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 pt-16 flex">
          <div className="absolute top-20 right-6 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Form Section */}
          <motion.div
            initial={{ width: "50%" }}
            animate={{ width: isEditing ? "50%" : "0%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`h-full overflow-hidden ${!isEditing ? "hidden" : ""}`}
          >
            <FormSection />
          </motion.div>
          
          {/* Preview Section */}
          <motion.div
            initial={{ width: "50%" }}
            animate={{ width: isEditing ? "50%" : "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full bg-white dark:bg-slate-900"
          >
            <ResumePreview />
          </motion.div>
        </div>
      </div>
    );
  }
  
  // For mobile view, show tabs to switch between edit and preview
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 pt-16 flex flex-col">
        {/* Tab Navigation */}
        <div className="flex items-center justify-between p-2 gap-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === "edit" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("edit")}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant={activeTab === "preview" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("preview")}
            >
              Preview
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "edit" ? <FormSection /> : <ResumePreview />}
        </div>
      </div>
    </div>
  );
};

export default Builder;
