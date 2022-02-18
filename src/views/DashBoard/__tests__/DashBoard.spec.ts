import { testSnapShot } from "@/utils/test.utils";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { describe, fn } from "vitest";
import DashBoardVue from "../DashBoard.vue";

describe('DashBoard', () => {
    testSnapShot(() => shallowMount(DashBoardVue, {
        global: {
            plugins: [createTestingPinia({ createSpy: () => fn() })]
        }
    }))
})