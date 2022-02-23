import { Album, PlayList, Track } from '@/@types';
import { defineStore } from 'pinia';
import { useNowPlayingStore } from './nowPlaying'

export const useUserPrefStore = defineStore({
    id: 'user-preferences',
    state: () => ({
        likedSongs: ([] as Track[]),
        likedAlbums: ([] as PlayList),
        volumePref: 0.6
    }),
    getters: {
        getLikedSongs: ({ likedSongs }) => likedSongs,
        isLikedSong: ({ likedSongs }) => {
            const playbackStore = useNowPlayingStore();
            return playbackStore.getCurrentPlaying && likedSongs.find(({ _id }) => _id === playbackStore.getCurrentPlaying._id)
        },
        getLikedAlbums: ({ likedAlbums }) => likedAlbums,
        isLikedAlbum: ({ likedAlbums }) => {
            return ({ _id: albumId }: Album) => likedAlbums.find(({ _id }) => _id === albumId);
        },
        getVolumePref: ({ volumePref }) => volumePref
    },
    actions: {
        toggleLikedSong(track: Track) {
            this.likedSongs = this.isLikedSong
                ? this.likedSongs.filter(({ _id }) => _id !== track._id)
                : [...this.likedSongs, track]
        },
        toggleLikedAlbum(album: Album) {
            this.likedAlbums = this.isLikedAlbum(album)
                ? this.likedAlbums.filter(({ _id }) => _id !== album._id)
                : [...this.likedAlbums, album]
        },
        setVolumePref(volumePref: number) {
            this.volumePref = volumePref;
        }
    },
});

function usePlayListStore() {
    throw new Error('Function not implemented.');
}
