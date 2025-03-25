
import React, { useRef } from "react";
import { useResume } from "@/lib/resumeContext";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import { Download, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const ResumePreview: React.FC = () => {
  const { resumeData, activeTemplate, isDarkMode, isEditing, setIsEditing } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const getTemplateComponent = () => {
    switch (activeTemplate) {
      case "minimalist":
        return <MinimalistTemplate data={resumeData} isDarkMode={isDarkMode} />;
      case "modern":
        return <ModernTemplate data={resumeData} isDarkMode={isDarkMode} />;
      case "professional":
        return <ProfessionalTemplate data={resumeData} isDarkMode={isDarkMode} />;
      default:
        return <MinimalistTemplate data={resumeData} isDarkMode={isDarkMode} />;
    }
  };
  
  const handleDownloadPdf = async () => {
    if (!resumeRef.current) return;
    
    try {
      toast.info("Preparing your PDF...");
      
      const resumeElement = resumeRef.current;
      
      // Save current styles
      const originalWidth = resumeElement.style.width;
      const originalHeight = resumeElement.style.height;
      
      // Set fixed dimensions for PDF export (A4 size)
      resumeElement.style.width = "794px"; // A4 width at 96 DPI
      resumeElement.style.height = "1123px"; // A4 height at 96 DPI
      
      // Convert HTML to Canvas
      const canvas = await html2canvas(resumeElement, {
        scale: 1.5, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      // Restore original styles
      resumeElement.style.width = originalWidth;
      resumeElement.style.height = originalHeight;
      
      // Convert Canvas to PDF (A4 size)
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personal.name || "resume"}.pdf`);
      
      toast.success("PDF Downloaded Successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="font-medium">Preview</h3>
        <div className="flex items-center gap-2 mr-16">
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              <>
                <Maximize2 className="h-4 w-4 mr-2" />
                <span>Expand</span>
              </>
            ) : (
              <>
                <Minimize2 className="h-4 w-4 mr-2" />
                <span>Minimize</span>
              </>
            )}
          </Button>
          
          <Button variant="default" size="sm" onClick={handleDownloadPdf}>
            <Download className="h-4 w-4 mr-2" />
            <span>Download PDF</span>
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl mx-auto shadow-xl rounded-md overflow-hidden bg-white dark:bg-slate-900"
        >
          <div 
            ref={resumeRef}
            className="w-full bg-white dark:bg-slate-900 transform origin-top transition duration-300"
            style={{ aspectRatio: "1/1.414" }} // A4 aspect ratio
          >
            {getTemplateComponent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumePreview;
