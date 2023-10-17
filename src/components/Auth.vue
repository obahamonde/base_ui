<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import type { User } from "~/types";
const { state } = useStore();
const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, logout } =
  useAuth0();

onMounted(async () => {
  await authorize();
});

const authorize = async () => {
  const token = await getAccessTokenSilently();
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  state.user = data;
	state.token = token;
  state.notifications.push({
    message: "Welcome " + state.user!.name + "!",
    status: "success",
  });
  return data as User;
};

watch(isAuthenticated, async (isAuthenticated) => {
  if (isAuthenticated) {
    state.user = await authorize();
  }
});
</script>
<template>
  <Notifier />
  <div v-if="isAuthenticated && state.user && state.token" class="col center h-screen w-full pb-24">
    <slot :user="state.user" :token="state.token" :logout="logout" />	
  </div>
  <div v-else class="col center h-screen w-full">
    <img src="/aiofauna.png" class="h-24 w-24 mt-32" />
    <h1 class="text-4xl font-bold mt-4">AI Agents</h1>
    <div class="col center h-screen">
      <button class="btn-get" @click="loginWithRedirect()">Login</button>
    </div>
  </div>
</template>
