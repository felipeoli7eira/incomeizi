<template>
    <div class="h-screen max-h-screen w-screen overflow-y-auto">
        <Toaster />
        <div class="max-w-screen-2xl mx-auto p-4">
            <Header />

            <NuxtPage />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Toaster } from '@steveyuowo/vue-hot-toast'
    import '@steveyuowo/vue-hot-toast/vue-hot-toast.css'
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC:wght@300;400;700&family=Playwrite+GB+S:ital,wght@0,100..400;1,100..400&family=Satisfy&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap');

    * {
        font-family: "Sour Gummy", sans-serif;
    }

    .icon {
        font-size: 1.1rem;
    }
</style>
