<template>
  <div
    class="fixed top-0 right-0 z-50 h-full bg-white w-64 md:w-96 shadow-xl transform transition-transform duration-300 translate-x-0 overflow-y-auto"
    ref="slideModalRef"
  >
    <div class="flex justify-end p-4">
      <font-awesome-icon
        :icon="['fas', 'xmark']"
        class="cursor-pointer text-black"
        @click="emit('onClose')"
      />
    </div>

    <div class="p-6 flex-1">
      <slot></slot>
    </div>

    <div class="p-4">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";

const modalRef = useTemplateRef("slideModalRef");

const emit = defineEmits<{
  (e: "onClose"): void;
}>();

onClickOutside(modalRef, () => {
  emit("onClose");
});
</script>
