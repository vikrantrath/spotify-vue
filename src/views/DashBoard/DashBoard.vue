<script setup lang="ts">
import MediaSection from '@/components/MediaSection.vue';
import usePlayListStore from '@/stores/playlist';
import { chunk } from 'lodash-es';
import Loader from '@/components/Loader.vue';

const playListStore = usePlayListStore();

const sections = $computed(() => chunk(playListStore.getPlayLists, 6))
</script>

<template>
  <div class="home-view">
    <template v-if="playListStore.getPlayLists.length" v-for="(sectionPlayList, index) in sections">
      <MediaSection :section-title="`Custom Playlist ${index}`" :albums="sectionPlayList" />
    </template>
    <template v-else>
      <Loader />
    </template>
  </div>
</template>

<style>
.home-view {
  padding: 2rem;
  overflow-y: scroll;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  grid-row-gap: 3rem;
}
</style>
