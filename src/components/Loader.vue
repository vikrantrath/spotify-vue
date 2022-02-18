<template>
    <div class="loader-container">
        <div class="loader"></div>
    </div>
</template>

<script lang="ts">
    export default {

    }
</script>

<style lang="scss">
.loader-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .loader {
        border: 8px solid rgba($color: #1fdf64, $alpha: 0.2); /* Light grey */
        border-top: 8px solid var(--color-accent-primary); /* Blue */
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 2s linear infinite;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>