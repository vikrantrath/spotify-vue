<template>
    <div class="library-view">
        <div class="playlist-cover-section">
            <div class="playlist-cover">
                <div class="back-icon">
                    <span
                        class="material-icons"
                        @click="router.back()"
                        data-testid="back-icon"
                    >reply_all</span>
                </div>
                <div class="playlist-cover-art">
                    <img :src="getImgUrl(likedAlbums?.[0]?.imageUri)" />
                </div>
            </div>
            <div class="playlist-info">
                <h4>PLAYLIST</h4>
                <h1>Albums You Love</h1>
                <h5>{{ likedAlbums.length }} in List</h5>
            </div>
        </div>
        <template
            v-if="likedAlbums.length"
            v-for="(likedAlbum, index) in likedAlbums"
            :key="likedAlbum._id"
        >
            <MediaCard :album="likedAlbum" />
        </template>
        <template v-else>
            <Loader />
        </template>
    </div>
</template>
  
<script lang="ts" setup>
import { useUserPrefStore } from '@/stores/userPref';
import router from '@/router/router';
import { storeToRefs } from 'pinia';
import MediaCard from '@/components/MediaCard.vue';

const { likedAlbums } = storeToRefs(useUserPrefStore());

const getImgUrl = (uri: string | URL) => new URL(uri, window.location.origin).href

</script>
  
<style lang="scss">
.playlist-cover-section {
    height: 30vh;
    max-height: 500px;
    min-height: 340px;
    padding: 1rem;
    display: flex;
    background-color: red;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6) 0, #121212 100%),
        var(--background-noise);
    .playlist-cover {
        display: flex;
        flex-direction: column;
        height: 100%;

        .back-icon {
            flex-grow: 1;
            span {
                color: white;
            }
        }

        .playlist-cover-art {
            display: flex;
            flex-grow: 2;
            align-items: flex-end;

            img {
                width: 192px;
                height: 192px;
                object-fit: cover;
                overflow: hidden;
            }
        }
    }

    .playlist-info {
        display: flex;
        flex-direction: column;
        padding: 1.5rem 1.5rem 0 1.5rem;
        justify-content: flex-end;
        color: var(--color-heading);

        h1 {
            font-weight: bold;
        }
    }
}
</style>