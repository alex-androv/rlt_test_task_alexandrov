<template>
  <div class="item-details">
    <div class="item-details__content">
      <div
        class="item-details__preview"
        :style="{ backgroundColor: item.color }"
      ></div>
      <div class="item-details__info">
        <p>{{ item.description }}</p>
        <button
          class="item-details__delete"
          @click="emit('delete', item.id)"
        >
          Удалить предмет
        </button>
      </div>
      <button
        class="item-details__close"
        @click="emit('close')"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InventoryItem } from "@/types";

defineProps<{
  item: InventoryItem;
}>();

const emit = defineEmits<{
  close: [];
  delete: [id: string];
}>();
</script>

<style lang="scss">
.item-details {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background-color: rgba(0, 0, 0, 0.9);
  animation: slide-in 0.3s ease-out;

  &__content {
    padding: 20px;
    height: 100%;
    position: relative;
  }

  &__preview {
    width: 200px;
    height: 200px;
    margin: 0 auto 20px;
    border-radius: 8px;
  }

  &__info {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__delete {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #ff4444;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #ff6666;
    }
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
