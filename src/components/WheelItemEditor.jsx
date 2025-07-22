import { useState } from "react";

const WheelItemEditor = ({
  items,

  onAddBulk,
  onRemoveItem,
  onClearItems,
}) => {
  const [bulkText, setBulkText] = useState("");

  const handleBulkAdd = () => {
    const lines = bulkText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
    if (lines.length) {
      onAddBulk(lines);
      setBulkText("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Add bulk items */}
      <div>
        <textarea
          value={bulkText}
          onChange={(e) => setBulkText(e.target.value)}
          placeholder="Paste multiple items (one per line)"
          rows={4}
          className="w-full px-4 py-2 border rounded"
        ></textarea>
        <button
          onClick={handleBulkAdd}
          className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Items
        </button>
      </div>

      {/* Show items with delete option */}
      {items.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-medium">Current Items</h4>
            <button
              onClick={onClearItems}
              className="text-xs text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item}</span>
                <button
                  onClick={() => onRemoveItem(index)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WheelItemEditor;
