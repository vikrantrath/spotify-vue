<template>
  <div class="player">
    <div class="now-playing-meta">
      <template v-if="nowPlayingStore.getCurrentPlaying">
        <img :src="nowPlayingStore.getCurrentPlaying.imageUri" alt="now-playing-cover-art" />
        <div class="now-playing-info">
          <span class="now-playing-title">{{ nowPlayingStore.getCurrentPlaying?.name }}</span>
          <span class="now-playing-artist">{{ nowPlayingStore.getCurrentPlaying?.artist }}</span>
        </div>
        <span
          :class="`material-icons ${userPrefStore.isLikedSong ? 'selected' : 'unselected'}`"
          @click="toggleFavorite"
          data-testid="favorite"
        >favorite</span>
      </template>
    </div>
    <div class="player-controls">
      <audio
        ref="audioRef"
        :src="nowPlayingStore.getCurrentPlaying?.uri || '#'"
        preload="metadata"
        hidden
      ></audio>
      <div>
        <span
          class="material-icons playback-icon"
          @click="nowPlayingStore.prev"
          data-testid="prev"
        >skip_previous</span>
        <span
          class="material-icons playback-icon"
          @click="play()"
          data-testid="play"
        >{{ state.isPlaying ? 'pause_circle' : 'play_circle' }}</span>
        <span
          class="material-icons playback-icon"
          @click="nowPlayingStore.next"
          data-testid="next"
        >skip_next</span>
      </div>
      <input
        type="range"
        id="seek-slider"
        class="playback-slider"
        :max="audioRef?.duration"
        :value="state.currentPlaybackTime"
        @change="changeCurrentPlayback"
      />
    </div>
    <div class="now-playing-additional">
      <span class="material-icons unselected">queue_music</span>
      <div class="player-volume">
        <span class="material-icons unselected">volume_up</span>
        <input
          type="range"
          id="volume-slider"
          max="100"
          :value="userPrefStore.getVolumePref * 100"
          @change="changeVolume"
          @mouseenter="toggleShowVolume('enter')"
          @mouseleave="toggleShowVolume('exit')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { useNowPlayingStore } from '@/stores/nowPlaying';
import { useUserPrefStore } from '@/stores/userPref';

const nowPlayingStore = useNowPlayingStore();
const userPrefStore = useUserPrefStore();

interface PlayerState {
  isPlaying: boolean;
  currentPlaybackTime: number;
}

const audioRef = $ref<HTMLAudioElement | null>(null);

const state = reactive<PlayerState>({
  isPlaying: false,
  currentPlaybackTime: 0,
});

const changeCurrentPlayback = (event: Event) => {
  audioRef!.currentTime = parseInt((<HTMLInputElement>event.target).value);
  state.currentPlaybackTime = audioRef!.currentTime
}

const changeVolume = (event: Event) => {
  audioRef!.volume = parseInt((<HTMLInputElement>event.target).value) / 100
  userPrefStore.setVolumePref(audioRef!.volume)
  toggleShowVolume('enter');
}

const toggleShowVolume = (event: string) => {
  document.getElementById('volume-slider')!.style.background = event === 'enter'
    ? 'linear-gradient(to right, #41b883 0%, #41b883 ' + (userPrefStore.getVolumePref * 100) + '%, #fff ' + (userPrefStore.getVolumePref * 100) + '%, white 100%)'
    : '#d3d3d3'
}

const play = () => {
  audioRef?.paused ? audioRef?.play() : audioRef?.pause()
  state.isPlaying = !state.isPlaying;
};

setInterval(() => {
  state.currentPlaybackTime = audioRef?.currentTime || 0
}, 980)

watch(() => nowPlayingStore, () => {
  state.isPlaying = false;
  play();
}, { flush: 'post', deep: true })

watch(() => audioRef, () => (audioRef && (audioRef.volume = userPrefStore.getVolumePref)), { flush: 'post' })

const toggleFavorite = () => userPrefStore.toggleLikedSong(nowPlayingStore.getCurrentPlaying)

</script>

<style lang="scss">
.player {
  grid-area: now-playing-bar;
  height: 100px;
  background-color: var(--vt-c-black);
  border-top: 1px solid var(--vt-c-black-mute);
  z-index: 4;
  display: flex;
  padding: 1rem;
  align-items: center;
  user-select: none;

  .unselected {
    transform: scale(0.75);
  }

  .now-playing-meta {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;

    img {
      height: 56px;
      width: 56px;
    }

    .selected {
      color: var(--color-accent-primary);
      transform: scale(1.1);
    }

    .selected,
    .unselected {
      cursor: pointer;
      transition: color 0.5s ease-out, transform 1s ease-in;
    }

    .now-playing-info {
      display: flex;
      flex-flow: column;
      padding: 0 1rem 0 1rem;

      .now-playing-title {
        color: var(--color-heading);
        font-weight: 600;
      }

      .now-playing-artist {
        font-size: 12px;
        line-height: 0.75rem;
      }
    }
  }

  .player-controls {
    display: flex;
    flex: 1;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .playback-icon {
      transform: scale(1.5);
      padding: 1rem;
      color: var(--color-heading);
      cursor: pointer;
    }

    .playback-slider {
      width: 100%;
    }
  }

  .now-playing-additional {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    grid-column-gap: 0.5rem;

    .player-volume {
      display: flex;
      align-items: center;

      input[type="range" i] {
        -webkit-appearance: none; /* Override default CSS styles */
        appearance: none;
        outline: none;
        background: #d3d3d3;
        -webkit-appearance: none;
        width: 100%;
        height: 0.25rem;
        -webkit-transition: 0.2s;
        transition: opacity 0.2s;
        border-radius: 5px;

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
        }
      }

      input[type="range" i]:hover {
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 0.75rem;
          width: 0.75rem;
          border-radius: 50%;
          background: var(--color-accent-primary);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
