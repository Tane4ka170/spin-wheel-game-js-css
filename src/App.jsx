import { useEffect, useState } from "react";
import SpinWheel from "./components/SpinWheel";
import WheelItemEditor from "./components/WheelItemEditor";
import TabsManager from "./components/TabsManager";

const LOCAL_STORAGE_KEY = "spinWheelTabs";

function App() {
  const [tabs, setTabs] = useState([{ name: "Default", items: [] }]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setTabs(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tabs));
  }, [tabs]);

  const currentTab = tabs[currentTabIndex];

  const updateCurrentTabItems = (newItems) => {
    const updatedTabs = [...tabs];
    updatedTabs[currentTabIndex].items = newItems;
    setTabs(updatedTabs);
  };

  const addItem = (item) => {
    updateCurrentTabItems([...currentTab.items, item]);
  };

  const addBulkItems = (itemsArray) => {
    updateCurrentTabItems([...currentTab.items, ...itemsArray]);
  };

  const removeItem = (index) => {
    const newItems = [...currentTab.items];
    newItems.splice(index, 1);
    updateCurrentTabItems(newItems);
  };

  const clearItems = () => {
    updateCurrentTabItems([]);
  };

  const addNewTab = (name) => {
    setTabs([...tabs, { name, items: [] }]);
    setCurrentTabIndex(tabs.length); // switch to new tab
  };

  const renameTab = (index, newName) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].name = newName;
    setTabs(updatedTabs);
  };

  const deleteTab = (index) => {
    if (tabs.length === 1) return;
    const updatedTabs = tabs.filter((_, i) => i !== index);
    setTabs(updatedTabs);
    setCurrentTabIndex(Math.max(0, currentTabIndex - 1));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">🎯 Universal Spin Wheel</h1>

      <TabsManager
        tabs={tabs}
        currentTabIndex={currentTabIndex}
        setCurrentTabIndex={setCurrentTabIndex}
        onAddTab={addNewTab}
        onRenameTab={renameTab}
        onDeleteTab={deleteTab}
      />

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-4 mt-6">
        <WheelItemEditor
          items={currentTab.items}
          onAddItem={addItem}
          onAddBulk={addBulkItems}
          onRemoveItem={removeItem}
          onClearItems={clearItems}
        />

        <div className="flex flex-col items-center gap-4">
          <SpinWheel
            items={currentTab.items}
            onSpinEnd={(item) => alert(`Випало: ${item}`)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
