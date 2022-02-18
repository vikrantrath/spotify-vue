import { shallowMount, VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, fn } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

import App from '@/App.vue';

import { testSnapShot } from '@/utils/test.utils';

describe('App', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, { global: { plugins: [createTestingPinia({ createSpy: () => fn() })] } });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  testSnapShot(() => wrapper);
});
