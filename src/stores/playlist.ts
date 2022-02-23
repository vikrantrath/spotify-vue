import { PlayList } from '@/@types';
import { getAllPlayLists } from '@/services/playListService';
import { defineStore } from 'pinia';

export const usePlayListStore = defineStore({
    id: 'playlists',
    state: () => ({
        playlists: ([] as PlayList),
    }),
    getters: {
        getPlayLists: ({ playlists }) => playlists,
    },
    actions: {
        async loadPlayLists() {
            this.playlists = await getAllPlayLists();
        }
    },
});

export default usePlayListStore;