import { useEffect, useState } from "react";
import SpinWheel from "./components/SpinWheel";
import WheelItemEditor from "./components/WheelItemEditor";
import TabsManager from "./components/TabsManager";
import toast from "react-hot-toast";

const LOCAL_STORAGE_KEY = "spinWheelTabs";

function App() {
  const [tabs, setTabs] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTabs(parsed);
          return;
        }
      } catch (error) {
        console.error("Failed to parse stored tabs", error);
      }
    }
    // fallback
    setTabs([{ name: "Default", items: [] }]);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (tabs.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tabs));
    }
  }, [tabs]);

  const currentTab = tabs[currentTabIndex] || { name: "", items: [] };

  const updateCurrentTabItems = (newItems) => {
    const updatedTabs = [...tabs];
    updatedTabs[currentTabIndex].items = newItems;
    setTabs(updatedTabs);
  };

  const addBulkItems = (itemsArray) => {
    updateCurrentTabItems([...currentTab.items, ...itemsArray]);
    toast.success("Додано елементи!");
  };

  const removeItem = (index) => {
    const newItems = [...currentTab.items];
    newItems.splice(index, 1);
    updateCurrentTabItems(newItems);
    toast.success("Елемент видалено");
  };

  const clearItems = () => {
    updateCurrentTabItems([]);
    toast.success("Усі елементи очищено");
  };

  const addNewTab = () => {
    const newTabName = `Tab ${tabs.length + 1}`;
    setTabs([...tabs, { name: newTabName, items: [] }]);
    setCurrentTabIndex(tabs.length);
    toast.success("Новий таб створено");
  };

  const renameTab = (index, newName) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].name = newName;
    setTabs(updatedTabs);
    toast.success("Назву таба змінено");
  };

  const deleteTab = (index) => {
    if (tabs.length === 1) return;
    const updatedTabs = tabs.filter((_, i) => i !== index);
    setTabs(updatedTabs);
    setCurrentTabIndex((prev) => (index === prev ? 0 : Math.max(0, prev - 1)));
    toast.success("Таб видалено");
  };

  const handleSpinEnd = (item) => {
    setTimeout(() => {
      toast.success(`🎉 Випало: ${item}`, {
        icon: "🎯",
      });
    }, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">🎯 Spin Wheel</h1>

      <TabsManager
        tabs={tabs}
        activeTabIndex={currentTabIndex}
        onTabChange={setCurrentTabIndex}
        onAddTab={addNewTab}
        onRenameTab={renameTab}
        onRemoveTab={deleteTab}
      />

      <div className="flex flex-col items-center gap-8 mt-10">
        <WheelItemEditor
          items={currentTab.items}
          onAddBulk={addBulkItems}
          onRemoveItem={removeItem}
          onClearItems={clearItems}
        />

        <div className="w-full max-w-md">
          <SpinWheel items={currentTab.items} onSpinEnd={handleSpinEnd} />
        </div>
      </div>
    </div>
  );
}

export default App;
