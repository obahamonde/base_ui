
import { use } from 'matter';
<template>
  
  <Auth>
   <template #default="{ user, token }">
      <Navbar />
    <main class="row center">
    <RouterView />
    </main>
    <Toolbar :user="user" :token="token" />
    </template>
  </Auth>
</template>
