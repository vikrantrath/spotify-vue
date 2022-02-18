import { describe, beforeEach } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';

import NavBar from '@/components/NavBar.vue';

import { testSnapShot } from '@/utils/test.utils';

describe('NavBar', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(NavBar);
  });

  testSnapShot(() => wrapper);
});
