<template>
    <div id="colorMode-component">
        <button class="btn btn-primary" type="button" onclick="colorModeDialog.showModal()">
            <Icon name="lucide:sun" class="icon" />
        </button>

        <dialog id="colorModeDialog" class="modal">
            <div class="modal-box">
                <h3 class="text-lg font-bold">Tema do aplicativo</h3>
                <p class="py-4">Selecione entre os temas disponíveis</p>

                <div class="flex items-center justify-center gap-2">
                    <button class="btn" type="button" @click="reflectColorMode('light')">Claro</button>
                    <button class="btn" type="button" @click="reflectColorMode('dark')">Escuro</button>
                    <button class="btn" type="button" @click="reflectColorMode('system')">Sistema</button>
                </div>

                <div class="modal-action">
                    <form method="dialog">
                        <button type="submit" class="btn btn-ghost">Fechar</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script lang="ts" setup>
    import nuxtStorage from "nuxt-storage";

    const KEY_UI_COLORMODE_APP = "INCOMEIZI_COLORMODE_PREFERENCE";
    const colorMode = useColorMode();

    function onMountedHandler(): void {
        let savedPreference = nuxtStorage.localStorage.getData(KEY_UI_COLORMODE_APP);

        if (savedPreference === null) {
            savedPreference = "system";
        }

        reflectColorMode(savedPreference);
    }

    function reflectColorMode(mode: string): void {
        colorMode.preference = mode;

        const html = document.querySelector("html");

        if (html) {
            html.dataset.theme = mode;
        }

        nuxtStorage.localStorage.setData(KEY_UI_COLORMODE_APP, mode);
    }

    onMounted(onMountedHandler);
</script>
