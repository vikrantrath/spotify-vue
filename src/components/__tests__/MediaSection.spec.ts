import { VueWrapper, shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, fn, it } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

import MediaCard from '@/components/MediaCard.vue';
import MediaSection, { MediaSectionProps } from '@/components/MediaSection.vue';

import { testSnapShot } from '@/utils/test.utils';
import { Album } from '@/@types';

describe('MediaSection', () => {
  let wrapper: VueWrapper;

  const mockMediaCards: Partial<Album>[] = [
    {
      imageUri: 'mock-url',
      name: 'mock-title',
      description: 'mock-subtitle',
    },
    {
      imageUri: 'mock-url',
      name: 'mock-title',
      description: 'mock-subtitle',
    },
    {
      imageUri: 'mock-url',
      name: 'mock-title',
      description: 'mock-subtitle',
    },
  ];

  const mockMediaSectionProps: MediaSectionProps = {
    sectionTitle: 'mock-section-1',
    albums: (mockMediaCards as Album[]),
  };

  beforeEach(() => {
    wrapper = shallowMount(MediaSection, {
      props: mockMediaSectionProps
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('displays the title of the section', () => {
    expect(wrapper.find('.section-heading').text()).toBe('mock-section-1');
  });

  it('renders media cards for each card passed', () => {
    expect(wrapper.findAllComponents(MediaCard).length).toBe(3);
  });

  testSnapShot(() => wrapper);
});
