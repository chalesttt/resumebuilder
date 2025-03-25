
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FileText, Download, Home } from "lucide-react";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const location = useLocation();
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-black/50 border-b border-slate-200/50 dark:border-slate-800/50",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-medium text-slate-900 dark:text-white"
            >
              <FileText className="h-6 w-6" />
              <span className="font-display">Resumé</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === "/"
                  ? "text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/builder"
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === "/builder"
                  ? "text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <FileText className="h-4 w-4" />
              <span>Resume Builder</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
