"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { SiderProps } from "@/types/layout";
import { SECTIONS } from "@/data/layout";
import { createClient } from "@/app/utils/supabase/client";
import { clearAuthCache } from "@/app/utils/supabase/auth-utils";
import { Alert, ConfirmBanner } from "@seye-bamidele/ui";

export default function Sider({ onModuleChange }: SiderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  
  const findMatchingItem = () => {
    return SECTIONS.flatMap((s) => s.items).find((item) => {
      if (item.key === "settings" && pathname.startsWith("/settings")) {
        return true;
      }
      return item.href === pathname;
    });
  };
  
  const defaultItem = findMatchingItem();
  const defaultKey = defaultItem?.key ?? "dashboard";

  const [active, setActive] = useState<string>(defaultKey);
  const [errorMsg,   setErrorMsg]  = useState("");

  useEffect(() => {
    const matchingItem = findMatchingItem();
    const newKey = matchingItem?.key ?? "dashboard";
    
    if (newKey !== active) {
      setActive(newKey);
      if (matchingItem && onModuleChange) {
        onModuleChange(matchingItem.label);
      }
    }
  }, [pathname]); 

  const handleItemClick = (e: React.MouseEvent, key: string, label: string,) => {
    if (key === "logout") {
      e.preventDefault();
      setShowLogoutDialog(true);
      return;
    }
    
    setActive(key);
    if (onModuleChange) {
      onModuleChange(label);
    }
  };

  const handleConfirmLogout = async () => {
    const supabase = createClient();
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error);
        setErrorMsg(error instanceof Error ? error.message : "Error logging out, please try again.");
      } else {
        router.push("/login"); 
      }
      clearAuthCache();
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Error logging out, please try again.");
      console.error("Unexpected error during logout:", error);
    } finally {
      setShowLogoutDialog(false);
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <>
      {errorMsg && (
        <Alert
          type="error"
          heading='Error'
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg("")}
        />
      )}

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
                    onClick={(e) => handleItemClick(e, key, label)}
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

      <ConfirmBanner
        open={showLogoutDialog}
        title="Logout"
        message="Are you sure you want to logout? This action cannot be undone."
        variant="danger"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />

    </>
  );
}
