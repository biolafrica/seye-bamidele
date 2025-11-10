"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, SunIcon, MoonIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Articles", href: "/articles" },
    { name: "Projects", href: "/projects" },
    { name: "Speaking", href: "/speaking" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    // Check initial theme state
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  // Theme toggle handler
  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Prevent hydration mismatch - don't render icon until mounted
  if (!mounted) {
    return (
      <header className="mb-20">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Avatar */}
          <div className="flex items-center">
            <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-border">
              <Image
                src="/seye.png"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1 bg-card rounded-full shadow-md px-3 py-2 border border-border">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-accent"
                        : "text-text hover:text-accent"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center gap-2 bg-card rounded-full shadow-md px-4 py-2 border border-border text-sm font-medium text-text hover:bg-hover transition-colors"
            >
              Menu
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Theme Toggle Button - Placeholder during SSR */}
            <button
              onClick={handleThemeToggle}
              className="bg-card rounded-full shadow-md p-3 border border-border hover:bg-hover transition-colors"
              aria-label="Toggle theme"
            >
              <div className="w-5 h-5" /> {/* Placeholder to prevent layout shift */}
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="mb-20">
      <div className="flex items-center justify-between py-4">
        {/* Logo/Avatar */}
        <div className="flex items-center">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-border">
            <Image
              src="/seye.png"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 bg-card rounded-full shadow-md px-3 py-2 border border-border">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-accent"
                      : "text-text hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center gap-2 bg-card rounded-full shadow-md px-4 py-2 border border-border text-sm font-medium text-text hover:bg-hover transition-colors"
          >
            Menu
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            className="bg-card rounded-full shadow-md p-3 border border-border hover:bg-hover transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <MoonIcon className="w-5 h-5 text-accent" />
            ) : (
              <SunIcon className="w-5 h-5 text-accent" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50">
          <div className="absolute top-8 left-8 right-8 bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
            <div className="flex items-center justify-between px-8 py-6 border-b border-separator">
              <h2 className="text-xl font-medium text-secondary">
                Navigation
              </h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl border-2 border-accent text-accent hover:bg-hover transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <nav className="py-4">
              <ul>
                {navLinks.map((link, index) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`block px-8 py-5 text-2xl font-normal transition-colors ${
                        isActive(link.href)
                          ? "text-accent bg-accent/10"
                          : "text-text hover:bg-hover"
                      } ${
                        index !== navLinks.length - 1
                          ? "border-b border-separator"
                          : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}