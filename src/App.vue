<script setup lang="ts">
useHead({
  title: "AI Agents",
  meta: [
    { name: "description", content: "This is a Demo of an MVP of Natural Language agents that automate, generate content and perform complex tasks with a single prompt input" },
    {
      name: "theme-color",
      content: () => (isDark.value ? "#0c0c0c" : "#ffffff"),
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/aiofauna.png",
    },
  ],
});
</script>

<template>
  <RouterView />
</template>
