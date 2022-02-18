<template>
  <div class="media-section">
    <div class="media-section-header">
      <div class="section-heading">{{ sectionTitle }}</div>
    </div>
    <div class="media-card-row">
      <template v-for="album in albums" :key="album._id">
        <MediaCard :album="album" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MediaCard from './MediaCard.vue';

import { Album } from '@/@types';

export interface MediaSectionProps {
  sectionTitle: string;
  albums: Album[];
}

defineProps<MediaSectionProps>();
</script>

<style lang="scss">
.media-section {
  width: 100%;
  .media-section-header {
    display: flex;
    .section-heading {
      color: var(--color-heading);
      font-weight: 700;
      font-size: 1.5rem;
      flex: 1;
    }
  }
  .media-card-row {
    display: flex;
    width: 100%;
    padding-top: 1.75rem;
    grid-column-gap: 2rem;
  }
}
</style>
