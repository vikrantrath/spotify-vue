import { testSnapShot } from "@/utils/test.utils";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, fn, it, vi } from "vitest";
import Favourite from "../Favourite.vue";
import router from '@/router/router';
import { useUserPrefStore } from "@/stores/userPref";
import { Track } from "@/@types";

describe('Favourite', () => {

    vi.mock('@/router/router', () => ({
        default: {
            back: fn()
        }
    }));

    testSnapShot(() => shallowMount(Favourite, {
        global: {
            plugins: [createTestingPinia({
                createSpy: () => fn()
            })]
        }
    }))

    it('calls back when the back icon is clicked', async () => {
        const pinia = createTestingPinia({
            createSpy: () => fn()
        });
        useUserPrefStore().toggleLikedSong((<Partial<Track>>{}) as Track)
        const wrapper = shallowMount(Favourite, {
            global: {
                plugins: [pinia]
            }
        });
        await wrapper.find('[data-testid="back-icon"]').trigger('click');
        expect(router.back).toHaveBeenCalled();
    })
})