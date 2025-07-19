import { useState } from "react";

const WheelItemEditor = ({
  items,
  onAddItem,
  onAddBulk,
  onRemoveItem,
  onClearItems,
}) => {
  const [newItem, setNewItem] = useState("");
  const [bulkText, setBulkText] = useState("");

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      onAddItem(newItem.trim());
      setNewItem("");
    }
  };

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
      {/* Add single item */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add item"
          className="w-full px-3 py-1 border rounded"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* Add bulk items */}
      <div>
        <textarea
          value={bulkText}
          onChange={(e) => setBulkText(e.target.value)}
          placeholder="Paste multiple items (one per line)"
          rows={4}
          className="w-full px-3 py-2 border rounded"
        ></textarea>
        <button
          onClick={handleBulkAdd}
          className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
        >
          Add Bulk Items
        </button>
      </div>

      {/* Show items with delete option */}
      {items.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Current Items</h4>
            <button
              onClick={onClearItems}
              className="text-sm text-red-500 hover:underline"
            >
              Clear All
            </button>
          </div>
          <ul className="space-y-1 max-h-40 overflow-y-auto border rounded p-2 bg-white">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-1"
              >
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
