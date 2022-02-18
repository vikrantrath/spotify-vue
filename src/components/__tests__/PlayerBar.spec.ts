import { Track } from "@/@types";
import { useNowPlayingStore } from "@/stores/nowPlaying";
import { useUserPrefStore } from "@/stores/userPref";
import { testSnapShot } from "@/utils/test.utils";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import { VueNode } from "@vue/test-utils/dist/types";
import { afterEach, beforeEach, describe, expect, fn, it } from "vitest";
import PlayerBar from "../PlayerBar.vue";

describe('PlayerBar', () => {
    let wrapper: VueWrapper;

    describe('When no playlist is selected', () => {
        beforeEach(() => {
            wrapper = shallowMount(PlayerBar, {
                global: {
                    plugins: [createTestingPinia({ createSpy: () => fn() })]
                }
            });
        });

        afterEach(() => {
            wrapper.unmount();
        });

        it('does not render the song details', () => {
            expect(wrapper.find('.now-playing-info').exists()).toBeFalsy();
        });

        testSnapShot(() => wrapper);
    });

    describe('When a playlist is selected', () => {
        const mockPlayList: Partial<Track>[] = [
            { _id: "0", name: "mockSong1", artist: "mockArtist1", uri: "mockUri1" }
        ];


        beforeEach(() => {
            const pinia = createTestingPinia({
                createSpy: () => fn(),
                stubActions: false
            });
            useNowPlayingStore().setCurrentPlaylist(mockPlayList as Track[]);
            useNowPlayingStore().next = fn();
            useNowPlayingStore().prev = fn();

            wrapper = shallowMount(PlayerBar, {
                global: {
                    plugins: [pinia]
                },
            })
        })

        afterEach(() => wrapper.unmount());

        it('renders the song details when song info is present', async () => {
            expect(wrapper.find('.now-playing-info').exists()).toBeTruthy();
        });

        it('calls next when next icon is clicked', async () => {
            const store = useNowPlayingStore();
            await wrapper.find('[data-testid="next"]').trigger('click');
            expect(store.next).toBeCalled();
        });

        it('calls prev when prev icon is clicked', async () => {
            const store = useNowPlayingStore();
            await wrapper.find('[data-testid="prev"]').trigger('click');
            expect(store.prev).toBeCalled();
        });

        it('calls toggleFavorite when favorite icon is clicked', async () => {
            const store = useUserPrefStore();
            await wrapper.find('[data-testid="favorite"]').trigger('click');
            expect(store.toggleLikedSong).toBeCalled();
        });

        it('calls play when the play icon is clicked', async () => {
            (wrapper.vm as { [key: string]: any }).audioRef = {
                play: fn(),
                pause: fn()
            }
            await wrapper.find('[data-testid="play"]').trigger('click');
            expect((wrapper.vm as any).state.isPlaying).toBeTruthy();
        })

        it('changes current playback time when playback slider is changed', async () => {
            (wrapper.find('.playback-slider').element as VueNode<HTMLInputElement>).value = '80'
            wrapper.find('.playback-slider').trigger('change');
        })

        it('changes current volume when volume slider is changed', async () => {
            document.getElementById = fn().mockImplementation(() => ({
                style: {
                    background: ''
                }
            }))
            const store = useUserPrefStore();
            (wrapper.find('#volume-slider').element as VueNode<HTMLInputElement>).value = '80'
            wrapper.find('#volume-slider').trigger('change');
            expect(store.setVolumePref).toHaveBeenCalledWith(0.8);
        });
        testSnapShot(() => wrapper);

    });
})

