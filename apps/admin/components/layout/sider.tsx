"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SiderProps } from "@/types/layout";
import { SECTIONS } from "@/data/layout";

export default function Sider({ onModuleChange }: SiderProps) {
  const pathname = usePathname();
  const defaultItem = SECTIONS.flatMap((s) => s.items).find((i) => i.href === pathname);
  const defaultKey = defaultItem?.key ?? "dashboard";

  const [active, setActive] = useState<string>(defaultKey);

  useEffect(() => {
    if (defaultKey && defaultKey !== active) {
      setActive(defaultKey);
      const activeItem = SECTIONS.flatMap((s) => s.items).find((i) => i.key === defaultKey);
      if (activeItem && onModuleChange) {
        onModuleChange(activeItem.label);
      }
    }
  }, [defaultKey, active, onModuleChange]);

  const handleItemClick = (key: string, label: string) => {
    setActive(key);
    if (onModuleChange) {
      onModuleChange(label);
    }
  };

  return (
    <aside className="fixed left-0 h-screen w-[276px] bg-background border-r border-separator z-auto py-6 pt-30">
      {SECTIONS.map(({ title, items }) => (
        <div key={title} className="px-5 mb-6 last:mb-0">
          <h4 className="pl-2 mb-1 text-xs text-secondary">{title}</h4>
          <nav className="flex flex-col gap-1">
            {items.map(({ key, label, href, icon: OutlineIcon, activeIcon: SolidIcon }) => {
              const isActive = active === key;
              const Icon = isActive ? SolidIcon : OutlineIcon;
              return (
                <Link
                  key={key}
                  href={href}
                  className={`sider-item ${isActive ? "sider-item--active" : ""}`}
                  onClick={() => handleItemClick(key, label)}
                >
                  <Icon className="w-5 h-5" />
                  <h2 className="text-text">{label}</h2>
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
}
