<template>
    <div id="add-expense-form-component">
        <button type="button" class="btn btn-primary diver-step-2--register-expense-button" @click="openFormDialog">
            <Icon name="lucide:plus" class="icon" />
        </button>

        <dialog ref="formDialog" id="createExpenseDialog" class="modal">
            <div class="modal-box">
                <h3 class="text-lg font-bold">Nova despesa</h3>
                <p class="pb-4">Cadastre uma nova despesa</p>

                <label class="mt-3 input input-bordered flex items-center gap-2 text-sm mb-3">
                    Valor: <input v-model="amountModelInput" v-money="moneySettings" type="text" name="amount" class="grow text-sm" placeholder="Ex.: 1200,00" />
                </label>

                <VeeForm @submit="create" :validation-schema="validationSchema" class="">
                    <label class="input input-bordered flex items-center gap-2 text-sm">
                        Depesa: <VeeField name="name" type="text" class="grow text-sm" />
                    </label>

                    <VeeErrorMessage name="name" class="m-0 text-red-500 text-sm" />

                    <label class="mt-3 input input-bordered flex items-center gap-2 text-sm">
                        Anotação: <VeeField name="details" type="text" class="grow text-sm w-full" />
                    </label>

                    <VeeErrorMessage name="details" class="m-0 text-red-500 text-sm" />

                    <VeeField as="select" name="calculate" class="mt-3 select select-bordered w-full text-sm">
                        <option disabled selected value="">Incluir nos calculos? selecione</option>
                        <option value="y">Sim</option>
                        <option value="n">Não</option>
                    </VeeField>

                    <VeeErrorMessage name="calculate" class="m-0 text-red-500 text-sm" />

                    <button type="submit" class="btn btn-primary w-full mt-3">Salvar</button>
                </VeeForm>

                <div class="modal-action">
                    <form method="dialog" class="space-x-1">
                        <button type="submit" class="btn btn-ghost">Fechar</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script setup lang="ts">
    import { moneySettings } from '~/plugins/v-money'
    import { validationSchema } from "./schema";
    import useCreateExpenseForm from "./hooks/useCreateExpenseForm";

    const {
        amountModelInput,
        formDialog,
        create,
        openFormDialog,
        closeFormDialog,
    } = useCreateExpenseForm();
</script>
