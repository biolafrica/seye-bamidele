import { ElementType, ReactNode } from "react";

export interface NavItem {
  key: string;
  label: string;
  href: string;
  icon: ElementType;
  activeIcon: ElementType;
}

export interface Section {
  title: string;
  items: NavItem[];
}

export interface SiderProps {
  onModuleChange?: (moduleName: string) => void;
}

export interface HeaderProps {
  onMenuClick: () => void;
  currentModule?: string;
}

export interface DashboardLayoutProps {
  children: ReactNode;
}
