<template>
    <ClientOnly>
        <div class="settings-component">
            <button class="btn btn-primary" type="button" @click="openSettingsDialog">
                <Icon name="lucide:settings" class="icon" />
            </button>

            <dialog ref="settingsDialog" id="settingsDialog" class="modal">
                <div class="modal-box">
                    <h3 class="text-lg font-bold">Configurações</h3>
                    <p class="mb-5">Defina a renda que será usada para calcular os gastos</p>
                    <form @submit.prevent="onSubmit">
                        <input
                            v-money="moneySettings"
                            type="text"
                            class="input input-bordered w-full"
                            placeholder="Ex.: 1200,00"
                            v-model="incomeModelInput"
                        />

                        <p class="text-red-500" v-if="incomeErrorMessage">{{ incomeErrorMessage }}</p>

                        <button type="submit" class="btn btn-primary w-full mt-5">Salvar</button>
                    </form>

                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn" type="submit">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    </ClientOnly>
</template>


<script lang="ts" setup>
    import useSettings from './hooks/useSettings'

    const {
        moneySettings,
        incomeErrorMessage,
        incomeStore,
        settingsDialog,
        incomeModelInput,

        onSubmit,
        openSettingsDialog
    } = useSettings()
</script>
