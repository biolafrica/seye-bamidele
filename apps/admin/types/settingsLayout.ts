type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface NavItem {
  key: string;
  label: string;
  href: string;
  outlineIcon: IconType;
  solidIcon: IconType;
}

export interface SettingsNavProps {
  items?: NavItem[];
  defaultActiveKey?: string;
}