<template>
  <div class="media-card" @click="goto(album._id)">
    <div class="img-overlay">
      <img :src="album.imageUri" alt="cover-art" />
    </div>
    <div class="play-icon" @click="playCurrentAlbum">
      <div class="play-icon-circle">
        <span class="material-icons">play_arrow</span>
      </div>
    </div>
    <div class="media-title">{{ album.name }}</div>
    <span class="media-subtitle">{{ album.description }}</span>
  </div>
</template>

<script lang="ts" setup>
import { Album } from '@/@types';
import { useNowPlayingStore } from '@/stores/nowPlaying';
import Router from '@/router/router'

const nowPlayingStore = useNowPlayingStore();
const { album } = defineProps<{ album: Album }>();

const playCurrentAlbum = (event: { stopPropagation: () => void; }) => {
  event.stopPropagation();
  nowPlayingStore.setCurrentPlaylist(album.tracks)
}

const goto = (_id: string) => Router.push(`/album/${_id}`);
</script>

<style lang="scss">
.media-card {
  background-color: var(--color-background-soft);
  height: 250px;
  width: 185px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: flex-start;
  transition: all 0.5s ease;
  z-index: 1;

  .img-overlay {
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0.9;
    height: 150px;
    width: 100%;
    border-radius: 5px;
  }

  img {
    height: 150px;
    width: 100%;
    border-radius: 5px;
    object-fit: cover;
  }

  .media-title {
    padding: 1rem 0.5rem 0.25rem 0;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: normal;
    line-height: 24px;
    text-transform: none;
    color: var(--color-heading);
  }

  .play-icon {
    visibility: hidden;
    transform: translate(110px, 110px);
    position: absolute;
    opacity: 0;
    cursor: pointer;
    transition: visibility 0.5s ease, opacity 0.5s ease-in-out;
    z-index: 4;

    .play-icon-circle {
      border-radius: 50%;
      background: #1fdf64;
      height: 50px;
      width: 50px;
      box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);

      transform: translate(-10px, -15px);
      span {
        transition: transform 0.5s ease-out;
        color: black;
        transform: translate(13px, 13px) scale(1);
      }
    }
  }

  &:hover {
    background-color: #252424;
    transform: scale(1.05);
    .play-icon {
      visibility: visible;
      opacity: 1;
      span {
        transform: translate(13px, 13px) scale(2);
      }
    }
  }
}
</style>
