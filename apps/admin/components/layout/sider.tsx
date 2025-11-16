"use client";

import * as outline from "@heroicons/react/24/outline";
import * as solid from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect, ElementType } from "react";
import { usePathname } from "next/navigation";

interface NavItem {
  key: string;
  label: string;
  href: string;
  icon: ElementType;
  activeIcon: ElementType;
}

interface Section {
  title: string;
  items: NavItem[];
}

interface SiderProps {
  onModuleChange?: (moduleName: string) => void;
}

const SECTIONS: Section[] = [
  {
    title: "MAIN",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        href: "/",
        icon: outline.Squares2X2Icon,
        activeIcon: solid.Squares2X2Icon,
      },
      {
        key: "article",
        label: "Article",
        href: "/articles",
        icon: outline.ArchiveBoxIcon,
        activeIcon: solid.ArchiveBoxIcon,
      },
      {
        key: "event",
        label: "Event",
        href: "/events",
        icon: outline.UsersIcon,
        activeIcon: solid.UsersIcon,
      },
      {
        key: "  newsletter",
        label: "Newsletters",
        href: "/newsletter",
        icon: outline.UserGroupIcon,
        activeIcon: solid.UserGroupIcon,
      },
      {
        key: "team",
        label: "Team",
        href: "/team",
        icon: outline.UserGroupIcon,
        activeIcon: solid.UserGroupIcon,
      },
    ],
  },
  {
    title: "OTHERS",
    items: [
      {
        key: "settings",
        label: "Settings",
        href: "/settings",
        icon: outline.Cog6ToothIcon,
        activeIcon: solid.Cog6ToothIcon,
      },
      {
        key: "logout",
        label: "Logout",
        href: "/",
        icon: outline.ArrowLeftEndOnRectangleIcon,
        activeIcon: solid.ArrowLeftEndOnRectangleIcon,
      },
    ],
  },
];

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
