<script setup lang="ts">
const { state } = useStore();
</script>
<template>   
 
    <Landing v-if="!state.user" />                          

    <TipTap class="h-full w-full" v-else/>
        
</template>
<route lang="yaml">
  meta:
    layout: 'home'
</route>w