<template>
  <v-app>
    <NavDrawer />
    <v-main>
      <AppBar />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from './components/AppBar.vue';
import NavDrawer from './components/NavDrawer.vue';
</script>
