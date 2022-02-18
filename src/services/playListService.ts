import { PlayList } from "@/@types";

import SongList from '@/stores/songList.json';

export const getAllPlayLists = async (): Promise<PlayList> => new Promise((resolve, reject) => {
    setTimeout(() => resolve(SongList), Math.random() * 1000)
});