
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, Check, Layout, Download, FileImage } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Beautiful Templates",
    description: "Choose from multiple professionally designed resume templates.",
    icon: <Layout className="h-6 w-6" />,
  },
  {
    title: "Real-time Preview",
    description: "See your changes instantly as you build your resume.",
    icon: <FileImage className="h-6 w-6" />,
  },
  {
    title: "Easy Export",
    description: "Download your resume as a PDF with one click.",
    icon: <Download className="h-6 w-6" />,
  },
];

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 -z-10" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                className="flex-1 max-w-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span 
                  className="inline-block px-3 py-1 mb-4 text-sm font-medium text-slate-700 bg-slate-200 rounded-full dark:bg-slate-700 dark:text-slate-200"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  Craft your professional story
                </motion.span>
                
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Create stunning resumes in minutes
                </motion.h1>
                
                <motion.p 
                  className="text-lg text-slate-600 dark:text-slate-300 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Design a professional resume that stands out with our intuitive builder. 
                  Choose from elegant templates, customize with ease, and download as PDF.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Link to="/builder">
                    <Button size="lg" className="group">
                      Start Building
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex-1 w-full max-w-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-xl opacity-20 -z-10" />
                  <div className="relative bg-white dark:bg-slate-800 shadow-xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div className="p-1">
                      <img 
                        src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop" 
                        alt="Resume preview" 
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
                Everything you need to create the perfect resume
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Our resume builder gives you all the tools to craft a professional resume 
                that showcases your skills and experience.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-6 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 sm:p-12 border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
                    Ready to build your professional resume?
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Get started in minutes with our easy-to-use resume builder.
                  </p>
                  <Link to="/builder">
                    <Button size="lg" className="w-full md:w-auto">
                      Build Your Resume
                    </Button>
                  </Link>
                </div>
                
                <div className="flex-1 md:border-l md:border-slate-200 md:dark:border-slate-700 md:pl-8">
                  <ul className="space-y-4">
                    {[
                      "Professional templates",
                      "Real-time preview",
                      "PDF download",
                      "Save and edit later",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-lg font-medium text-slate-900 dark:text-white">Resumé</span>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} Lester Nacino | Resume Builder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
