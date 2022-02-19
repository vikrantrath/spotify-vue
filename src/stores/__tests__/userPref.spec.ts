import { Track } from "@/@types"
import { setActivePinia, createPinia } from "pinia"
import { beforeEach, describe, expect, fn, it, MockedFunction, vi } from "vitest"
import { useNowPlayingStore } from "../nowPlaying"
import { useUserPrefStore } from "../userPref"

describe('playlist store', () => {
    let userPrefStore: ReturnType<typeof useUserPrefStore>

    const mockLikedSong = (<Partial<Track>>{
        _id: 'mockId1'
    } as Track)

    beforeEach(() => {
        setActivePinia(createPinia())
        userPrefStore = useUserPrefStore();
        useNowPlayingStore().setCurrentPlaylist([mockLikedSong])
    })

    it('returns default volume as 0.6', () => {
        expect(userPrefStore.getVolumePref).toEqual(0.6);
    })

    it('sets volume pref', () => {
        userPrefStore.setVolumePref(0.9);
        expect(userPrefStore.getVolumePref).toEqual(0.9);
    })

    it('sets liked song', () => {
        userPrefStore.toggleLikedSong(mockLikedSong);
        expect(userPrefStore.getLikedSongs).toContain(mockLikedSong);
    })

    it('unsets liked song if already present', () => {
        userPrefStore.toggleLikedSong(mockLikedSong);
        expect(userPrefStore.getLikedSongs).toContain(mockLikedSong);
        userPrefStore.toggleLikedSong(mockLikedSong);
        expect(userPrefStore.getLikedSongs).not.toContain(mockLikedSong);
    })

})
