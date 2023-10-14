<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

const { modelValue } = defineModels<{
	modelValue: string;
}>();

const editor= useEditor({
  extensions: [
    StarterKit,
    Link.configure({ openOnClick: true }),
    Image.configure(),
  ],
  content: modelValue.value,
});


const onTab = (e: KeyboardEvent) => {
  e.preventDefault();
  if (!editor.value) return;
  editor.value.chain().insertContent("\t").run();
};

const handleKeyDown = async(e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === "Enter") {
    e.preventDefault();
    const context = editor.value?.getText()
    const { data } = await useFetch("/api/blog/"+context).text()
    editor.value?.chain().insertContent(data.value).run();
}
}

</script>
<template>
<div class="min-w-128 w-full">
    <EditorContent
       class="tiptap bg-transparent h-full p-2 rounded sh no-outline markdown-body"
      :editor="editor"
      @keydown.tab="onTab"
      @keydown="handleKeyDown"
      />

  </div>
</template>
<style lang="scss">

/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
    @apply outline-none;
    
    
  }

  img {
    max-width: 20%;
  }

  div {
    @apply bg-transparent;
    @apply outline-none;
    @apply markdown-body;
    
  }
}
</style>