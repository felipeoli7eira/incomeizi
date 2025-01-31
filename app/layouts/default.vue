<template>
    <div class="h-screen max-h-screen w-screen overflow-y-auto">
        <Toaster />
        <div class="max-w-screen-2xl mx-auto p-4">
            <Header />

            <NuxtPage />

            <div class="mt-10 flex justify-center">
                <nav>
                    <a href="https://github.com/felipeoli7eira" target="_blank">
                        <Icon name="lucide:github" class="icon" />
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Toaster } from '@steveyuowo/vue-hot-toast'
    import '@steveyuowo/vue-hot-toast/vue-hot-toast.css'
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    * {
        font-family: "Poppins", sans-serif;
    }

    .icon {
        font-size: 1.1rem;
    }
</style>
