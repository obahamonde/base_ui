
import { use } from 'matter';
<template>

  <Auth>
   <template #default="{ user, token }">
   <main class="h-screen w-full col center">   
      <Navbar />
   
      <RouterView />
    
    <Toolbar :user="user" :token="token" />
    </main>
    <SideBar/>
  
    </template>
  </Auth>
   
</template>
