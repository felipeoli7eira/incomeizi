<template>
    <ClientOnly>
        <div class="settings-component">
            <button class="btn btn-primary diver-step-3--register-income-button" type="button" @click="openSettingsDialog">
                <Icon name="lucide:wallet-minimal" class="icon" />
            </button>

            <dialog ref="settingsDialog" id="settingsDialog" class="modal">
                <div class="modal-box">
                    <h3 class="text-lg font-bold">Renda principal</h3>
                    <p class="mb-5 text-sm">Será usada para subtrair os gastos, somar com as receitas e calcular o saldo final.</p>
                    <form @submit.prevent="onSubmit">
                        <input
                            name="amount"
                            v-money="moneySettings"
                            type="text"
                            class="input input-bordered w-full"
                            placeholder="Ex.: 1.200,00"
                            v-model="inputModel"
                        />

                        <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>

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
import useSettings from './useSettings'

import { onMounted } from 'vue'

const {
    moneySettings,
    errorMessage,
    settingsDialog,
    inputModel,

    onSubmit,
    openSettingsDialog,

    onComponentMounted,
} = useSettings()

onMounted(onComponentMounted)
</script>
