<template>
    <ClientOnly>
        <div class="settings-component">
            <button class="btn btn-primary" type="button" onclick="settingsDialog.showModal()">
                <Icon name="lucide:settings" class="icon" />
            </button>

            <dialog ref="settingsDialog" id="settingsDialog" class="modal">
                <div class="modal-box">
                    <h3 class="text-lg font-bold mb-5">Configurações</h3>
                    <form @submit.prevent="onSubmit">
                        <p class="mb-2">Defina a renda que será usada para calcular os gastos:</p>
                        <input
                            type="text"
                            v-money="moneySettings"
                            name="income"
                            class="input input-bordered w-full"
                            placeholder="Ex.: 1200,00"
                            v-model="incomeModel"
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
        incomeModel,
        incomeErrorMessage,
        settingsDialog,
        loadIncomeFromLocalStorage,
        onSubmit
    } = useSettings()
</script>
