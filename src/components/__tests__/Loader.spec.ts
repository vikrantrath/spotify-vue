import Loader from "@/components/Loader.vue";
import { testSnapShot } from "@/utils/test.utils";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe } from "vitest";

describe('Loader', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = shallowMount(Loader)
    })

    afterEach(() => wrapper.unmount())

    testSnapShot(() => wrapper);
});