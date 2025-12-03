import * as outline from "@heroicons/react/24/outline";
import * as solid from "@heroicons/react/24/solid";
import { Section } from "@/types/layout";

export const SECTIONS: Section[] = [
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
        key: "newsletter",
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