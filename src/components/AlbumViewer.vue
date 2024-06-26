<template>
    <div class="favourite" v-if="album.tracks.length > 0">
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
                    <img :src="getImgUrl(album.tracks?.[0]?.imageUri)" />
                </div>
            </div>
            <div class="playlist-info">
                <h4>PLAYLIST</h4>
                <h1>{{ album.name }}</h1>
                <h5>{{ album.tracks.length }} in List</h5>
            </div>
        </div>
        <div class="action-bar">
            <div class="favorite-icon-container">
                <span
                    :class="`material-icons ${userPrefStore.isLikedAlbum(album) ? 'selected' : 'unselected'}`"
                    @click="userPrefStore.toggleLikedAlbum(album)"
                    data-testid="favorite"
                >favorite</span>
            </div>
            <div class="play-icon" @click="playCurrentAlbum">
                <div class="play-icon-circle">
                    <span class="material-icons">play_arrow</span>
                </div>
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
                    <tr v-for="(song, index) in album.tracks" :key="song._id">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <div class="song-info">
                                <img :src="getImgUrl(song.imageUri)" width="25px" height="25px" />
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
import { Album } from '@/@types';
import router from '@/router/router';
import { useNowPlayingStore } from '@/stores/nowPlaying';
import { useUserPrefStore } from '@/stores/userPref';

const { album } = defineProps<{ album: Album }>()

const getImgUrl = (uri: string | URL) => new URL(uri, window.location.origin).href

const userPrefStore = useUserPrefStore();
const nowPlayingStore = useNowPlayingStore();

const playCurrentAlbum = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    nowPlayingStore.setCurrentPlaylist(album.tracks)
}
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

    .action-bar {
        padding: 2rem;
        display: flex;

        .favorite-icon-container {
            height: 50px;
            width: 50px;
            display: flex;
            align-items: center;
            .selected {
                color: #1fdf64;
            }

            .selected,
            .unselected {
                cursor: pointer;
                transform: scale(2);
            }
        }

        .play-icon {
            cursor: pointer;

            .play-icon-circle {
                border-radius: 50%;
                background: #1fdf64;
                height: 50px;
                width: 50px;
                span {
                    transition: transform 0.5s ease-out;
                    color: white;
                    transform: translate(13px, 13px) scale(1.5);
                }
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