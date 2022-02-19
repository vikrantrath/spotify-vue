<template>
    <div class="favourite" v-if="getLikedSongs.length > 0">
        <div class="playlist-cover-section">
            <div class="playlist-cover">
                <div class="back-icon">
                    <span class="material-icons" @click="router.back()" data-testid="back-icon">reply_all</span>
                </div>
                <div class="playlist-cover-art">
                    <img :src="getLikedSongs?.[0]?.imageUri" />
                </div>
            </div>
            <div class="playlist-info">
                <h4>PLAYLIST</h4>
                <h1>Liked Songs</h1>
                <h5>{{ getLikedSongs.length }} in List</h5>
            </div>
        </div>
        <div class="playlist">
            <table>
                <thead>
                    <th>#</th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>
                        <span class="material-icons">schedule</span>
                    </th>
                </thead>
                <div></div>
                <tbody>
                    <tr v-for="(song, index) in getLikedSongs" :key="song._id">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <div class="song-info">
                                <img :src="song.imageUri" width="25px" height="25px" />
                                <div class="artist-info">
                                    <span class="heading">{{ song.name }}</span>
                                    <span class="subtitle">{{ song.artist }}</span>
                                </div>
                            </div>
                        </td>
                        <td>{{ song.artist }}</td>
                        <td>{{ `${(song.duration_s / 60) | 0}:${(song.duration_s | 0) % 60}` }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { useUserPrefStore } from '@/stores/userPref';
import router from '@/router/router';
import { storeToRefs } from 'pinia';
const { getLikedSongs } = storeToRefs(useUserPrefStore());
</script>
<style lang="scss">
.favourite {
    height: 100%;
    width: 100%;
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

    .playlist {
        table {
            width: 100%;
            table-layout: auto;
            border-collapse: collapse;

            thead {
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);

                th {
                    padding: 0.5rem;
                    text-align: left;
                }
            }

            td {
                padding: 0.5rem;
            }

            .song-info {
                display: flex;
                align-items: center;
                grid-column-gap: 1rem;
                img {
                    height: 40px;
                    width: 40px;
                    object-fit: cover;
                }

                .artist-info {
                    display: flex;
                    flex-direction: column;

                    .subtitle {
                        font-size: small;
                    }
                }
            }
        }
    }
}
</style>