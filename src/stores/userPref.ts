import { Track } from '@/@types';
import { defineStore } from 'pinia';
import { useNowPlayingStore } from './nowPlaying'

export const useUserPrefStore = defineStore({
    id: 'user-preferences',
    state: () => ({
        likedSongs: ([] as Track[]),
        volumePref: 0.6
    }),
    getters: {
        getLikedSongs: ({ likedSongs }) => likedSongs,
        isLikedSong: ({ likedSongs }) => {
            const playbackStore = useNowPlayingStore();
            return playbackStore.getCurrentPlaying && likedSongs.find(({ _id }) => _id === playbackStore.getCurrentPlaying._id)
        },
        getVolumePref: ({ volumePref }) => volumePref
    },
    actions: {
        toggleLikedSong(track: Track) {
            this.likedSongs = this.isLikedSong
                ? this.likedSongs.filter(({ _id }) => _id !== track._id)
                : [...this.likedSongs, track]
        },

        setVolumePref(volumePref: number) {
            this.volumePref = volumePref;
        }
    },
});
