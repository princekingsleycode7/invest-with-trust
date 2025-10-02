import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  user?: any; // Add proper type from your auth context
}

export function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  return (
    <div className="md:hidden">
      <button
        onClick={onToggle}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.nav
                className="fixed inset-0 pt-20 px-6 pb-6 bg-background z-50 flex flex-col gap-4"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
              >
                <Link
                  to="/how-it-works"
                  className="text-lg font-medium text-foreground py-2 border-b border-muted"
                  onClick={onToggle}
                >
                  How It Works
                </Link>
                <Link
                  to="/projects"
                  className="text-lg font-medium text-foreground py-2 border-b border-muted"
                  onClick={onToggle}
                >
                  Projects
                </Link>
                <Link
                  to="/about"
                  className="text-lg font-medium text-foreground py-2 border-b border-muted"
                  onClick={onToggle}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-lg font-medium text-foreground py-2 border-b border-muted"
                  onClick={onToggle}
                >
                  Contact
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-lg font-medium text-foreground py-2 border-b border-muted"
                      onClick={onToggle}
                    >
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="text-lg font-medium text-primary py-2"
                    onClick={onToggle}
                  >
                    Sign In
                  </Link>
                )}
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}