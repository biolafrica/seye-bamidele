import * as outline from "@heroicons/react/24/outline";
import * as solid from "@heroicons/react/24/solid";
import Link from "next/link";

interface HeaderProps {
  onMenuClick: () => void;
  currentModule?: string;
}

export default function Header({ onMenuClick, currentModule = "Dashboard" }: HeaderProps) {
  return (
    <header className="border-b border-separator fixed top-0 inset-x-0 z-60 bg-background">
      <div className="flex items-center py-6">
        <Link
          href="/"
          className="hidden lg:flex w-[276px] items-center gap-1 px-20"
          aria-label="Home"
        >
          <solid.CircleStackIcon className="w-6 h-6 text-accent" />
          <h1 className="text-2xl font-bold leading-none text-heading">Seye</h1>
        </Link>

        <button
          aria-label="Open menu"
          className="lg:hidden px-4 text-text hover:text-accent transition-colors"
          onClick={onMenuClick}
        >
          <outline.Bars3Icon className="w-6 h-6" />
        </button>

        {/* Dynamic Module Name Display */}
        <div className="flex flex-1 px-4 items-center">
          <h2 className="text-lg font-semibold text-heading">
            {currentModule}
          </h2>
        </div>

        <div className="flex items-center gap-2 pr-4">
          <Link
            className="flex w-10 h-10 items-center justify-center rounded-full bg-accent/20 text-accent text-base font-bold cursor-pointer hover:bg-accent/30 transition-colors"
            aria-label="User initials"
            href="/settings/account/profile"
          >
            DB
          </Link>

          <div className="hidden lg:flex flex-col leading-snug">
            <span className="text-text text-sm font-normal">
              Deji Badamosi
            </span>
            <span className="text-xs text-secondary">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
