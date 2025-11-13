"use client";

import * as outline from "@heroicons/react/24/outline";
import * as solid from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface NavItem {
  key: string;
  label: string;
  href: string;
  outlineIcon: IconType;
  solidIcon: IconType;
}

interface SettingsNavProps {
  items?: NavItem[];
  defaultActiveKey?: string;
}

const defaultItems: NavItem[] = [
  {
    key: "Profile",
    label: "Profile Settings",
    href: "/settings/profile",
    outlineIcon: outline.UserIcon,
    solidIcon: solid.UserIcon,
  },
  {
    key: "Password",
    label: "Password & Terminals",
    href: "/settings/password",
    outlineIcon: outline.LockClosedIcon,
    solidIcon: solid.LockClosedIcon,
  },
];

export default function SettingsNav({
  items = defaultItems,
  defaultActiveKey = "general",
}: SettingsNavProps) {
  const pathname = usePathname();

  // Check if any route matches current path
  const isAnyMatched = items.some((item) => item.href === pathname);

  return (
    <nav className="flex flex-col gap-3 lg:border lg:border-border px-5 py-7 lg:rounded-md text-sm font-medium bg-white rounded-t-2xl h-fit ">
      {items.map(({ key, label, href, outlineIcon: OutlineIcon, solidIcon: SolidIcon }) => {
        const isActive = isAnyMatched ? pathname === href : key === defaultActiveKey;
        const Icon = isActive ? SolidIcon : OutlineIcon;

        const baseClasses =
          "rounded-md flex items-center justify-between px-4 py-3 transition-colors";
        const activeClasses = "bg-blue-200 text-accent-hover";
        const inactiveClasses = "text-accent-hover hover:bg-blue-200";

        return (
          <Link
            key={key}
            href={href}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
          >
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{label}</span>
            </div>
            <outline.ChevronRightIcon className="w-5 h-5 lg:hidden" aria-hidden="true" />
          </Link>
        );
      })}
    </nav>
  );
}
