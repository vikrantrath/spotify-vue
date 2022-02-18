import { defineStore } from 'pinia';

import { Track } from '@/@types';

export const useNowPlayingStore = defineStore({
  id: 'playback-queue',
  state: () => ({
    playQueue: ([] as Track[]),
    currentIndex: (undefined as unknown as number),
  }),
  getters: {
    getCurrentPlaylist: ({ playQueue }) => playQueue,
    getCurrentPlaying: ({ playQueue, currentIndex }) => currentIndex !== undefined ? playQueue?.[currentIndex] : (undefined as unknown as Track),
  },
  actions: {
    setCurrentPlaylist(newPlayQueue: Track[]) {
      this.$patch({ playQueue: newPlayQueue, currentIndex: 0 });
    },
    next() {
      (this.currentIndex < (this.playQueue.length - 1)) && this.currentIndex++;
    },
    prev() {
      this.currentIndex > 0 && this.currentIndex--;
    },
    clearPlaylist() {
      this.playQueue = [];
      this.currentIndex = (undefined as unknown as number);
    }
  },
});
