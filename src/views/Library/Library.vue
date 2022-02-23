<template>
    <div class="library-view">
        <template v-if="likedAlbums.length" v-for="(likedAlbum, index) in likedAlbums" :key="likedAlbum._id">
            <MediaCard :album="likedAlbum" />
        </template>
        <template v-else>
            <Loader />
        </template>
    </div>
</template>
  
<script lang="ts" setup>
import { useUserPrefStore } from '@/stores/userPref';
import { storeToRefs } from 'pinia';
import MediaCard from '@/components/MediaCard.vue';

const { likedAlbums } = storeToRefs(useUserPrefStore());
</script>
  
<style lang="scss">
</style>