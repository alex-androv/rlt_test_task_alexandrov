<template>
  <div
    class="inventory"
    :class="{ 'inventory--light': store.theme === 'light' }"
  >
    <div class="inventory__header">
      <button
        class="inventory__theme-toggle"
        @click="store.toggleTheme"
      >
        {{ store.theme === "light" ? "🌙" : "☀️" }}
      </button>
    </div>

    <div class="inventory__grid">
      <div
        v-for="index in 16"
        :key="index - 1"
        class="inventory__cell"
        @dragover.prevent
        @drop="handleDrop($event, index - 1)"
      >
        <div
          v-if="getItemAtPosition(index - 1)"
          class="inventory__item"
          :style="{ backgroundColor: getItemAtPosition(index - 1)?.color }"
          draggable="true"
          @dragstart="handleDragStart($event, getItemAtPosition(index - 1)!)"
          @click="showDetails(getItemAtPosition(index - 1)!)"
        ></div>
      </div>
    </div>

    <ItemDetails
      v-if="selectedItem"
      :item="selectedItem"
      @close="selectedItem = null"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useInventoryStore } from "@/stores/inventory";
import type { InventoryItem } from "@/types";
import ItemDetails from "./ItemDetails.vue";

const initialItems: InventoryItem[] = [
  {
    id: "item-1",
    color: "#4CAF50",
    position: 0,
    description: "Зеленый квадрат",
  },
  {
    id: "item-2",
    color: "#2196F3",
    position: 2,
    description: "Синий квадрат",
  },
  {
    id: "item-3",
    color: "#FFC107",
    position: 5,
    description: "Желтый квадрат",
  },
];

const store = useInventoryStore();
const selectedItem = ref<InventoryItem | null>(null);

onMounted(() => {
  store.loadFromLocalStorage();
  if (store.items.length === 0) {
    store.initializeItems(initialItems);
  }
});

const getItemAtPosition = (position: number): InventoryItem | undefined => {
  return store.items.find((item) => item.position === position);
};

const handleDragStart = (event: DragEvent, item: InventoryItem) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData("text/plain", item.id);
  }
};

const handleDrop = (event: DragEvent, position: number) => {
  const id = event.dataTransfer?.getData("text/plain");
  if (id) {
    store.updateItemPosition(id, position);
  }
};

const showDetails = (item: InventoryItem) => {
  selectedItem.value = item;
};

const handleDelete = (id: string) => {
  store.removeItem(id);
  selectedItem.value = null;
};
</script>

<style lang="scss">
.inventory {
  background-color: #1a1a1a;
  color: #fff;
  padding: 20px;
  min-height: 100vh;
  &--light {
    background-color: #fff;
    color: #000;

    .inventory__cell {
      border-color: #ddd;
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  &__header {
    margin-bottom: 20px;
    text-align: right;
  }

  &__theme-toggle {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: transparent;
    font-size: 1.5rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    max-width: 600px;
    margin: 0 auto;
  }

  &__cell {
    aspect-ratio: 1;
    border: 1px solid #333;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.05);
  }

  &__item {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    cursor: move;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
