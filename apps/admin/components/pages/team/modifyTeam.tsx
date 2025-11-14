"use client";

interface Team {
  id: number;
  name: string;
  email: string;
  dateRegistered: string;
}

interface ModifyArticleProps {
  onClose: () => void;
  row?: Team | null;
}

export default function ModifyTeam({ onClose, row }: ModifyArticleProps) {
  return (
    <div className="w-screen lg:w-1/2 fixed right-0 top-0 h-screen bg-white overflow-y-auto shadow-lg border-l border-gray-200">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">
          {row ? "Edit Team Member" : "Add New Team Member"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ✕
        </button>
      </div>

      <div className="p-6">
        {row ? (
          <p className="text-gray-700">Editing: {row.name}</p>
        ) : (
          <p className="text-gray-700">Create a new team member</p>
        )}
      </div>
    </div>
  );
}