import { PlayList } from "@/@types";

import SongList from '@/stores/songList.json';

export const getAllPlayLists = async (): Promise<PlayList> => {
    if (process.env.NODE_ENV !== 'production') {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(SongList), Math.random() * 1000)
        });
    } else {
        return fetch('/api/getAllPlaylists').then(res => res.json());
    }
}