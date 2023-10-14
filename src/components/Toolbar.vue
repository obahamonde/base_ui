<script setup lang="ts">
import type { User } from "~/types";
import Chatbot from "~/components/Chatbot.vue";
import Functions from "~/components/Functions.vue";
import Stacks from "~/components/Stacks.vue";
import Settings from "~/components/Settings.vue";
const MAPPING = {
  chatbot: Chatbot,
  functions: Functions,
  stacks: Stacks,
  settings: Settings,
}
const router = useRouter();
const { state } = useStore();
const props = defineProps<{
  user: User;
  token: string;
}>(); 
const modal = ref<string | null>(null);
const tabs = ref([
  {
    name: "Chatbot",
    icon: "mdi-chat",
    key: "chatbot",
  },
  {
    name: "Functions",
    icon: "mdi-function-variant",
    key: "functions",
  },
  {
    name: "Stacks",
    icon: "mdi-cloud",
    key: "stacks",
  },
  {
    name: "Settings",
    icon: "mdi-cog",
    key: "settings",
  },
]);
const logOut = () => {
  state.token = null;
  state.user = null;
  router.push("/");
};
const handleModal = (key: string) => {
  modal.value = modal.value === key ? null : key;
};

</script>
<template>
<Modal v-if="modal" @close="modal = null">
<template #body>
<component :is="MAPPING[modal]" :user="props.user" /> 
</template>
</Modal>
<div class="flex items-start justify-between rounded-full bg-zinc-800 p-2 max-w-max animate-fade-in-up my-8">
  <div class="flex space-x-2 border-r border-zinc-600 px-3">
    <img :src="props.user.picture" width="32" height="32" class="rounded-full border-2 border-green-500 bg-gray-500 x2" alt="Avatar 2" />
    </div>
  <div class="flex space-x-2 border-r border-zinc-600 pr-1">
    <button class="toolbar-btn  cp" :title="tab.name" v-for="tab in tabs">
      <Icon :icon="tab.icon" class="x2" :class="modal === tab.key ? 'text-secondary' : 'text-accent hover:text-secondary'"
     @click="handleModal(tab.key)"
      />
      <span class="sr-only">{{ tab.name }}</span>
    </button>
  </div>
    <button class="toolbar-btn cp" title="Logout">
      <Icon icon="mdi-logout" class="x2 text-gray-500 hover:text-warning"
        @click="logOut()"
      />
      <span class="sr-only">Logout</span>
    </button>
</div>
</template>