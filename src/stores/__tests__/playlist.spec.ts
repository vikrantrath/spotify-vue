import { setActivePinia, createPinia } from "pinia"
import { beforeEach, describe, expect, fn, it, MockedFunction, vi } from "vitest"
import { getAllPlayLists } from '@/services/playListService';
import usePlayListStore from "../playlist";

describe('playlist store', () => {

    vi.mock('@/services/playListService', () => ({
        getAllPlayLists: fn()
    }));

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('calls getAllPlaylists when loadPlaylist is called', async () => {
        const mockPlaylist = [{
            name: 'mockAlbum'
        }];
        (getAllPlayLists as MockedFunction<any>).mockResolvedValue(mockPlaylist)

        const playListStore = usePlayListStore();
        await playListStore.loadPlayLists();
        expect(getAllPlayLists).toHaveBeenCalled();
        expect(playListStore.getPlayLists).toEqual(mockPlaylist);
    })

})
