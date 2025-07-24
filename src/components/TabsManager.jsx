import { useState } from "react";

const TabsManager = ({
  tabs,
  activeTabIndex,
  onTabChange,
  onAddTab,
  onRenameTab,
  onRemoveTab,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState("");

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tabs.map((currentTab, index) => (
        <div
          key={index}
          className={`flex items-center px-3 py-1 rounded-lg cursor-pointer transition-all
            ${
              activeTabIndex === index
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-blue-100"
            }`}
          onClick={() => onTabChange(index)} // ✅ Виправлення тут
        >
          {editingIndex === index ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={() => {
                if (newName.trim()) onRenameTab(index, newName.trim());
                setEditingIndex(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (newName.trim()) onRenameTab(index, newName.trim());
                  setEditingIndex(null);
                }
              }}
              autoFocus
              className="w-24 px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          ) : (
            <span
              className="text-sm font-medium"
              onDoubleClick={() => {
                setEditingIndex(index);
                setNewName(currentTab.name);
              }}
            >
              {currentTab.name}
            </span>
          )}

          {tabs.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveTab(index);
              }}
              title="Remove Tab"
              className="ml-2 text-xs bg-red-500 hover:bg-red-600 text-white rounded px-2 py-0.5"
            >
              ×
            </button>
          )}
        </div>
      ))}

      <button
        onClick={onAddTab}
        className="text-sm font-semibold bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition"
      >
        + Add Tab
      </button>
    </div>
  );
};

export default TabsManager;
