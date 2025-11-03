"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import UserProfile from "./user-profile";

interface SideMenuProps {
  sections: { id: string; label: string }[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function SideMenu({
  sections,
  activeSection,
  setActiveSection,
}: SideMenuProps) {
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  // Mobil uchun hamburger menu tugmasi
  if (isMobile) {
    return (
      <>
        <motion.button
          className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900/80 text-white backdrop-blur-md"
          onClick={toggleMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 flex flex-col bg-gray-900/95 p-6 backdrop-blur-md"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-16 flex-1">
                <motion.h1
                  className="mb-8 text-2xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  My Portfolio
                </motion.h1>

                <nav>
                  <ul className="space-y-6">
                    {sections.map((section, index) => (
                      <motion.li
                        key={section.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <button
                          onClick={() => handleSectionClick(section.id)}
                          className={`text-left text-xl font-medium ${
                            activeSection === section.id
                              ? "text-purple-400"
                              : "text-gray-400"
                          }`}
                        >
                          {section.label}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>

              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <a
                    href="https://github.com/shohkhanerkhinov"
                    className="hover:text-white"
                  >
                    GitHub
                  </a>
                  <a
                    href="http://www.linkedin.com/in/shohkxan-erkhinov-a69707350"
                    className="hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://t.me/shohjahon_erkinov_a"
                    className="hover:text-white"
                  >
                    Telegram
                  </a>
                </div>
                <UserProfile />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop uchun yon menu
  return (
    <motion.div
      className="flex h-full w-64 flex-col bg-gray-900/50 p-6 backdrop-blur-md"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mb-12">
        <motion.h1
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          My Portfolio
        </motion.h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          {sections.map((section, index) => (
            <motion.li
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <button
                onClick={() => setActiveSection(section.id)}
                className={`group relative w-full text-left text-lg font-medium transition-colors ${
                  activeSection === section.id
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeSection === section.id && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -left-6 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"
                  />
                )}
                {section.label}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Pastki qism (ijtimoiy tarmoqlar + UserProfile) */}
      <div className="mt-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <a
              href="https://github.com/shohkhanerkhinov"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="http://www.linkedin.com/in/shohkxan-erkhinov-a69707350"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://t.me/shohjahon_erkinov_a"
              className="hover:text-white transition-colors"
            >
              Telegram
            </a>
          </div>
          <UserProfile />
        </div>
      </div>
    </motion.div>
  );
}
