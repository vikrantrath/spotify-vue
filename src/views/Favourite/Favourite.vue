<template>
    <AlbumViewer :album="likedSongsAlbum" />
</template>
  
<script lang="ts" setup>
import { useUserPrefStore } from '@/stores/userPref';
import { storeToRefs } from 'pinia';
import AlbumViewer from '@/components/AlbumViewer.vue';
import { Album } from '@/@types';

const { getLikedSongs } = storeToRefs(useUserPrefStore());
const likedSongsAlbum: Album = $computed(() => ({
    name: 'Liked Songs',
    type: 'album',
    _id: 'likedPlaylist',
    year: 2022,
    total_tracks: getLikedSongs.value.length,
    description: 'Your Liked Songs',
    imageUri: getLikedSongs.value?.[0]?.imageUri ?? '#',
    tracks: getLikedSongs.value
}))
</script>
<style lang="scss">
</style>