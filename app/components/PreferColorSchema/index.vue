<template>
    <ClientOnly>
        <div id="colorMode-component">
            <button class="btn btn-primary" type="button" onclick="preferColorScheaDialog.showModal()">
                <Icon name="lucide:sun" class="icon" />
            </button>

            <dialog id="preferColorScheaDialog" class="modal">
                <div class="modal-box">
                    <h3 class="text-lg font-bold">Tema do aplicativo</h3>
                    <p class="mb-5">Selecione entre os temas disponíveis</p>

                    <div class="flex items-center justify-center gap-2">
                        <button class="btn" type="button" :class="{'btn-active': colorMode.preference === 'light'}" @click="setPreferColorSchema('light')">
                            <Icon name="lucide:sun" class="icon" /> Claro
                        </button>
                        <button class="btn" :class="{'btn-active': colorMode.preference === 'dark'}" type="button" @click="setPreferColorSchema('dark')">
                            <Icon name="lucide:moon" class="icon" /> Escuro
                        </button>
                        <button class="btn" :class="{'btn-active': colorMode.preference === 'system'}" type="button" @click="setPreferColorSchema('system')">
                            <Icon name="lucide:user" class="icon" /> Sistema
                        </button>
                    </div>

                    <div class="modal-action">
                        <form method="dialog">
                            <button type="submit" class="btn btn-ghost">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
    import nuxtStorage from 'nuxt-storage'

    const LOCALSTORAGE_PREFER_COLOR_SCHEMA_KEY_APP = 'INCOMEIZI_COLOR_SCHEMA_PREFERENCE'
    const colorMode = useColorMode()

    function onMountedHandler(): void {
        let storedPreference = nuxtStorage.localStorage.getData(LOCALSTORAGE_PREFER_COLOR_SCHEMA_KEY_APP)

        if (storedPreference === null) {
            storedPreference = 'system'
        }

        setPreferColorSchema(storedPreference)
    }

    function setPreferColorSchema(preference: string): void {
        colorMode.preference = preference

        const html = document.querySelector('html')

        if (html) {
            html.dataset.theme = preference
        }

        nuxtStorage.localStorage.setData(LOCALSTORAGE_PREFER_COLOR_SCHEMA_KEY_APP, preference, 325 * 2, 'd')
    }

    onMounted(onMountedHandler)
</script>
