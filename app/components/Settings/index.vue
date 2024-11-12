<template>
    <div class="settings-component">
        <button class="btn btn-primary" type="button" onclick="settingsDialog.showModal()">
            <Icon name="lucide:settings" class="icon" />
        </button>

        <dialog id="settingsDialog" class="modal">
            <div class="modal-box">
                <h3 class="text-lg font-bold mb-5">Configurações</h3>
                <VeeForm @submit.prevent="submit" :validation-schema="schema">
                    <p class="mb-2">Defina a renda que será usada para calcular os gastos:</p>

                    <VeeField name="income" v-slot="{field}">
                        <input name="income" v-bind="field" type="text" class="w-full input input-bordered" v-money="moneySettings" />
                    </VeeField>

                    <ErrorMessage name="income" />

                    <button type="submit" @click="submit" class="btn btn-primary w-full mt-5">Salvar</button>
                </VeeForm>

                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn" type="submit">Fechar</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</template>


<script lang="ts" setup>
    import { useForm } from 'vee-validate'
    import { Field, Form, ErrorMessage } from 'vee-validate'
    import { toTypedSchema } from '@vee-validate/zod'
    import * as zod from 'zod'
    import { moneySettings } from '~/plugins/v-money'

    const schema = toTypedSchema(zod.object({
        income: zod.string({
            required_error: 'Renda é obrigatória',
            invalid_type_error: 'Renda está inválida'
        }),
    }))

    function submit(formData) {
        console.log(formData)
    }
</script>
