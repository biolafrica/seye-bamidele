"use client"

import { useState, useEffect, useRef } from "react";
import { Twitter, Linkedin, Facebook } from 'lucide-react';
import { ShareIcon, LinkIcon, CheckIcon } from "@heroicons/react/24/outline";

interface Blog {
  id?: string;
  title?: string;
  excerpt?: string;
  [key: string]: any; // Allow for additional properties
}

interface SharePostProps {
  blog: Blog;
}

export default function SharePost({ blog }: SharePostProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Get current URL (works in all scenarios)
  const postUrl = typeof window !== "undefined" ? window.location.href : "";
  
  const title = blog?.title || "Check this out!";
  const excerpt = blog?.excerpt || "";

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  // Copy link to clipboard
  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Social Media Share Handlers
  const shareOnTwitter = (): void => {
    const text = `${title}${excerpt ? '\n\n' + excerpt.substring(0, 100) + '...' : ''}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer,width=550,height=420");
    setShowMenu(false);
  };

  const shareOnLinkedIn = (): void => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer,width=550,height=420");
    setShowMenu(false);
  };

  const shareOnFacebook = (): void => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(facebookUrl, "_blank", "noopener,noreferrer,width=550,height=420");
    setShowMenu(false);
  };

  // Native Web Share API (mobile-friendly)
  const handleNativeShare = async (): Promise<void> => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt,
          url: postUrl,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Main Share Button */}
      <button 
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        aria-label="Share this post"
      >
        <ShareIcon className="w-4 h-4" />
        <span>Share</span>
      </button>

      {/* Share Menu (shows when native share not available) */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-slideDown">
          <div className="py-1">
            {/* Twitter Option */}
            <button 
              onClick={shareOnTwitter} 
              className="flex items-center w-full gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <Twitter className="w-5 h-5 text-blue-400" />
              <span>Twitter</span>
            </button>

            {/* LinkedIn Option */}
            <button 
              onClick={shareOnLinkedIn} 
              className="flex items-center w-full gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <Linkedin className="w-5 h-5 text-blue-700" />
              <span>LinkedIn</span>
            </button>

            {/* Facebook Option */}
            <button 
              onClick={shareOnFacebook} 
              className="flex items-center w-full gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span>Facebook</span>
            </button>

            {/* Divider */}
            <div className="border-t border-gray-100 my-1"></div>

            {/* Copy Link Option */}
            <button 
              onClick={copyToClipboard} 
              className="flex items-center w-full gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-5 h-5 text-gray-500" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}