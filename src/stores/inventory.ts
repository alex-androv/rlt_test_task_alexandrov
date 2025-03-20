import { defineStore } from "pinia";
import { ref } from "vue";
import type { InventoryItem } from "@/types";

export const useInventoryStore = defineStore("inventory", () => {
  const items = ref<InventoryItem[]>([]);
  const theme = ref<"light" | "dark">("dark");

  const initializeItems = (initialItems: InventoryItem[]) => {
    items.value = [...initialItems];
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("inventory", JSON.stringify(items.value));
    localStorage.setItem("theme", theme.value);
  };

  const loadFromLocalStorage = () => {
    const savedItems = localStorage.getItem("inventory");
    const savedTheme = localStorage.getItem("theme");

    if (savedItems) {
      items.value = JSON.parse(savedItems);
    }

    if (savedTheme) {
      theme.value = savedTheme as "light" | "dark";
    }
  };

  const removeItem = (id: string) => {
    items.value = items.value.filter((item) => item.id !== id);
    saveToLocalStorage();
  };

  const updateItemPosition = (id: string, position: number) => {
    const item = items.value.find((item) => item.id === id);
    if (item) {
      item.position = position;
      saveToLocalStorage();
    }
  };

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    saveToLocalStorage();
  };

  return {
    items,
    theme,
    initializeItems,
    removeItem,
    updateItemPosition,
    toggleTheme,
    loadFromLocalStorage,
  };
});
