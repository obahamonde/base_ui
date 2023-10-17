<script setup lang="ts">
import { useStorage } from "@vueuse/core";
	import Split from "split.js";
import * as monaco from "monaco-editor";

const StorageName = {
	ACTIVE_TAB: "active-tab",
};


const iframe = ref<HTMLIFrameElement>();

const generateHTML = (
  payload: Record<string, any>,
  isDark?: boolean,
) => {
  return `<html class="${isDark ? "dark" : ""}">
        <head>
            <style id="_style">${payload.css}</style>
            <script type="module" id="_script">
                ${payload.javascript}

                window.addEventListener('message', function(event) {
                    console.log(event)
                    if (event.data === 'theme-dark') {
                        document.documentElement.classList.add('dark')
                    } else if (event.data === 'theme-light') {
                        document.documentElement.classList.remove('dark')
                    }
                })
            </\script>
        </head>
        <body>
            ${payload.html}
        </body>
    </html>`;
};

const items = ref([
  { text: "logos:html-5", value: "html" },
  { text: "logos:css-3", value: "css" },
  { text: "logos:javascript", value: "javascript" },
  {text:"logos:python",value:"python"}
]);

const currentTab = useStorage(StorageName.ACTIVE_TAB, items.value[0].value);

watch(isDark, (value) => {
  iframe.value?.contentWindow?.postMessage(
    `theme-${value ? "dark" : "light"}`,
    "*",
  );
});

const onChange = (payload: Record<string, any>) => {
  iframe.value!.srcdoc = generateHTML(payload, isDark.value);
};

const onComplete = async (editor: monaco.editor.IStandaloneCodeEditor) => {
  const payload = editor.getValue();
  const lang = currentTab.value;
  const response = await fetch("/api/copilot/"+lang , {
    method: "POST",
    body: JSON.stringify({ code: payload }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.text();

  editor.setValue(payload + "\n" + data);
};

onMounted(() => {
  Split(["#split-0", "iframe"]);
});
</script>

<template>
  <main class="border-t border-gray-200 dark:border-gray-700 w-full">
    <div class="flex flex-row h-full">
      <div id="split-0" class="w-full">
        <Tabs v-model="currentTab" :items="items" />
        <MonacoInput
          :active-tab="currentTab"
          @send="onChange"
          @call="onComplete"
        />
      </div>
      <iframe
        ref="iframe"
        class="h-full w-full"
        sandbox="allow-scripts"
        frameBorder="0"
      />
    </div>
  </main>
</template>

<style>
main {
  height: calc(100vh - var(--nav-height));
  width: 100%;
}

.gutter {
  @apply dark:bg-gray-900 bg-no-repeat;
  background-position: 50%;
}

.gutter.gutter-horizontal {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");
  cursor: col-resize;
}

*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: var(--scrollbar-thumb);
}
body {
  --nav-height: 4.2rem;
}
</style>
