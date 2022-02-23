<template>
    <AlbumViewer v-if="album" :album="album" />
    <div v-else>404 Not Found</div>
</template>
  
<script lang="ts" setup>
import usePlayListStore from '@/stores/playlist';
import { useRoute } from 'vue-router';
import AlbumViewer from '@/components/AlbumViewer.vue';

const playListStore = usePlayListStore();

const album = playListStore.getPlayLists.find(({ _id }) => _id === useRoute().params._id)
</script>
  
<style lang="scss">
</style>