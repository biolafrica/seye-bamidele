"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const footerLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Speaking", href: "/speaking" },
    { name: "Contact", href: "/contact" },
  ];

  const currentYear = new Date().getFullYear();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <footer className="border-t border-separator mt-28">
      <div className="px-4 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Navigation Links */}
          <nav className="order-2 sm:order-1">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isActive(link.href)
                        ? "text-accent font-medium"
                        : "text-secondary hover:text-text"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <div className="order-1 sm:order-2">
            <p className="text-sm text-disabled">
              © {currentYear} Seye Bamidele. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}