<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";

import NavBar from "@/components/NavBar.vue";
import PlayerBar from "@/components/PlayerBar.vue";

import usePlayListStore from "@/stores/playlist";

onMounted(() => usePlayListStore().loadPlayLists());

</script>

<template>
  <NavBar />
  <div class="main-view">
    <RouterView></RouterView>
  </div>
  <PlayerBar />
</template>

<style>
@import "./assets/base.css";

#app {
  font-weight: normal;
  height: 100%;
  display: grid;
  grid-template-areas:
    "nav-bar main-view"
    "now-playing-bar now-playing-bar";
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
}

.main-view {
  display: flex;
  grid-area: main-view;
  flex: 6;
  flex-direction: column;
}
</style>
