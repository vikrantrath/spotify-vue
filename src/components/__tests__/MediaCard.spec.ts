import { beforeEach, describe, expect, fn, it } from 'vitest';
import { shallowMount, VueWrapper, } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'

import MediaCard from '@/components/MediaCard.vue';

import { testSnapShot } from '@/utils/test.utils';
import { useNowPlayingStore } from '@/stores/nowPlaying';
import { Album } from '@/@types';

describe('MediaCard', () => {
  let wrapper: VueWrapper;
  const mockMediaCardProps: Partial<Album> = {
    imageUri: 'mock-url',
    name: 'mock-title',
    description: 'mock-subtitle',
    tracks: []
  };

  beforeEach(() => {
    wrapper = shallowMount(MediaCard, {
      props: { album: (mockMediaCardProps as Album) },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: () => fn()
          })
        ]
      }
    });
  });

  it('displays the details passed', () => {
    expect(wrapper.find('.media-card img').attributes('src')).toBe('mock-url');
    expect(wrapper.find('.media-title').text()).toBe('mock-title');
    expect(wrapper.find('.media-subtitle').text()).toBe('mock-subtitle');
  });

  it('calls the loadPlaylist from store when play button is clicked', async () => {
    const store = useNowPlayingStore();
    await wrapper.find('.play-icon').trigger('click');

    expect(store.setCurrentPlaylist).toBeCalledWith(mockMediaCardProps.tracks);
  })

  testSnapShot(() => wrapper);
});
