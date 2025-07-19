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
    <div className="flex items-center flex-wrap gap-2 mb-4">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`relative px-3 py-1 rounded-md cursor-pointer text-sm font-medium
            ${
              activeTabIndex === index
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }
            hover:bg-blue-500 hover:text-white transition`}
          onClick={() => onTabChange(index)}
        >
          {editingIndex === index ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={() => {
                onRenameTab(index, newName);
                setEditingIndex(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onRenameTab(index, newName);
                  setEditingIndex(null);
                }
              }}
              autoFocus
              className="bg-white text-black border px-1 rounded"
            />
          ) : (
            <span
              onDoubleClick={() => {
                setEditingIndex(index);
                setNewName(tab.name);
              }}
            >
              {tab.name}
            </span>
          )}

          {/* Remove tab button (optional) */}
          {tabs.length > 1 && (
            <button
              className="ml-2 text-xs text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveTab(index);
              }}
              title="Remove Tab"
            >
              ×
            </button>
          )}
        </div>
      ))}

      <button
        onClick={onAddTab}
        className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600 transition"
      >
        + Add Tab
      </button>
    </div>
  );
};

export default TabsManager;
