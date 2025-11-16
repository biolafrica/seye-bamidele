import * as outline from "@heroicons/react/24/outline";
import * as solid from "@heroicons/react/24/solid";

import { NavItem } from "@/types/settingsLayout";

export const defaultItems: NavItem[] = [
  {
    key: "Profile",
    label: "Profile Settings",
    href: "/settings/profile",
    outlineIcon: outline.UserIcon,
    solidIcon: solid.UserIcon,
  },
  {
    key: "Password",
    label: "Password",
    href: "/settings/password",
    outlineIcon: outline.LockClosedIcon,
    solidIcon: solid.LockClosedIcon,
  },
];