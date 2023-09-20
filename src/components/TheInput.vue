<script setup lang="ts">
const { modelValue } = defineModels<{
  modelValue: string;
}>();
const props = defineProps<{
  onEnter: () => Promise<void> | void;
}>();
</script>

<template>
  <input
    id="input"
    v-model="modelValue"
    v-bind="$attrs"
    type="text"
    p="x-4 y-2"
    w="250px"
    text="center"
    bg="transparent"
    border="~ rounded gray-200 dark:gray-700"
    outline="none active:none"
    placeholder="Enter your name"
    @keydown.enter="props.onEnter"
  />
</template>
