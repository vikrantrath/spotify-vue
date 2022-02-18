<template>
  <div class="side-nav">
    <div class="logo">
      <img :src="Logo" />
      <span>Spotify-Vue</span>
    </div>

    <ul class="nav-links">
      <router-link to="/">
        <span class="material-icons">home</span>
        <span>Home</span>
      </router-link>
      <router-link to="/">
        <span class="material-icons">library_music</span>
        <span>Library</span>
      </router-link>
      <router-link to="/favourite">
        <span class="material-icons">favorite</span>
        <span>Favourites</span>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';

import Logo from "@/assets/logo.svg";
</script>

<style lang="scss">
.side-nav {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  grid-area: nav-bar;
  background-color: var(--vt-c-black-dark);
  padding: 1.5rem;
  height: 100%;

  .nav-links {
    list-style: none;
    padding-top: 2rem;
    padding-left: 0;

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0.5rem;
      text-decoration: none;
      color: inherit;
      padding-left: 0;

      &.router-link-active {
        color: var(--color-heading);
      }

      span {
        padding: 0.25rem;
      }

      &:hover {
        color: var(--color-heading);
        cursor: pointer;
      }
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    img {
      height: 40px;
      max-width: 131px;
    }

    span {
      color: var(--color-heading);
      font-size: 2rem;
      padding-left: 0.5rem;
      letter-spacing: -2px;
    }
  }
}
</style>
