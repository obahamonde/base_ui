<script setup lang="ts">
useHead({
  title: "AWS UG Peru: Development platform powered by ChatGPT",
  meta: [
    { name: "description", content: "This is a Demo of an MVP IDP powered by the large language model GPT-4" },
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
