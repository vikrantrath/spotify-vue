import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia, Store } from 'pinia'
import { useNowPlayingStore } from "../nowPlaying";
import { Album, PlayList, Track } from "@/@types";

describe('nowPlayingStore', () => {
    let nowPlayingStore: ReturnType<typeof useNowPlayingStore>;

    const mockPlaylist: Partial<Track>[] = [
        { name: 'mockTrack1' },
        { name: 'mockTrack2' }
    ]

    beforeEach(() => {
        setActivePinia(createPinia())
        nowPlayingStore = useNowPlayingStore();
        nowPlayingStore.setCurrentPlaylist(mockPlaylist as Track[]);
    })

    it('sets the current playlist', () => {
        expect(nowPlayingStore.$state.playQueue).toEqual(mockPlaylist);
    });
    it('changes the track to next track', () => {
        nowPlayingStore.next();
        expect(nowPlayingStore.$state.currentIndex).toEqual(1);
    });
    it('changes the track to previous track', () => {
        nowPlayingStore.next();
        expect(nowPlayingStore.$state.currentIndex).toEqual(1);
        nowPlayingStore.prev();
        expect(nowPlayingStore.$state.currentIndex).toEqual(0);
    });
    it('clears playlist', () => {
        nowPlayingStore.clearPlaylist();
        expect(nowPlayingStore.$state.playQueue).toEqual([]);
    });
})