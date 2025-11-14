"use client";

import { ReactNode } from 'react';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function SidePanel({ isOpen, onClose, title, children }: SidePanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />
      <div className="relative z-65 w-screen lg:w-1/2 right-0 top-0 h-screen bg-white overflow-y-auto shadow-lg border-l border-gray-200">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}