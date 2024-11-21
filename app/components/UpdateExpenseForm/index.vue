<template>
    <dialog ref="updateExpenseDialog" id="updateExpenseDialog" class="modal">
        <div class="modal-box">
            <h3 class="text-lg m-0 font-bold">Atualização de dados</h3>
            <p class="pb-4 mt-0 text-sm">Atualize as informações da sua despesa</p>

            <label class="mt-3 input input-bordered flex items-center gap-2 text-sm">
                Valor: <input
                    v-model="expenseForm.amount"
                    v-money="moneySettings"
                    type="text"
                    class="grow text-sm"
                    placeholder="Ex.: 1200,00"
                />
            </label>

            <p v-if="amountErrorMessage.length" class="m-0 text-red-500 text-sm">{{ amountErrorMessage }}</p>

            <VeeForm @submit="onSubmit" class="">
                <label class="input input-bordered flex items-center gap-2 text-sm mt-3">
                    Depesa: <input
                        type="text"
                        @input="({ target }) => setFieldValue('name', target?.value ?? '')"
                        v-model="expenseForm.name"
                    />
                </label>

                <p v-if="errors.name" class="m-0 text-red-500 text-sm">{{ errors.name }}</p>

                <label class="mt-3 input input-bordered flex items-center gap-2 text-sm">
                    Anotação: <input
                        type="text"
                        v-model="expenseForm.details"
                        class="grow text-sm"
                        @input="({ target }) => setFieldValue('details', target?.value ?? '')"
                    />
                </label>

                <p v-if="errors.details" class="m-0 text-red-500 text-sm">{{ errors.details }}</p>

                <VeeField @change="({ target }) => setFieldValue('calculate', target?.value)" as="select" v-model="expenseForm.calculate" name="calculate" class="mt-3 select select-bordered w-full text-sm">
                    <option value="y">Sim</option>
                    <option value="n">Não</option>
                </VeeField>

                <p v-if="errors.calculate" class="m-0 text-red-500 text-sm">{{ errors.calculate }}</p>

                <p v-if="selectedExpense === null" class="m-0 text-red-400">Desculpe, os dados da despesa selecionada não puderam ser carregados</p>

                <button v-else type="submit" class="btn btn-primary w-full mt-3">Salvar</button>
            </VeeForm>

            <div class="modal-action">
                <form method="dialog">
                    <button type="submit" class="btn btn-ghost">Fechar</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script setup lang="ts">
    import { defineProps } from 'vue'
    import { moneySettings } from '~/plugins/v-money'
    import { useExpensesStore } from '~/stores/modules/expenses'
    import { toast } from '@steveyuowo/vue-hot-toast'
    import { z } from 'zod'
    import { type Expense } from '~/types/Expense'
    import { useForm } from 'vee-validate'
    import { formatToMonetaryString, parseMonetaryString } from '~/helpers/parsers'
    import { toTypedSchema } from '@vee-validate/zod'
    import { isZeroNumberValue, isZeroStringValue } from '~/helpers/validators'

    const props = defineProps({
        ulid: {
            type: String,
            required: true
        }
    })

    const dialog = useTemplateRef('updateExpenseDialog')
    const expensesStore = useExpensesStore()
    const expenseForm = reactive({
        name: '',
        details: '',
        amount: '0,00',
        calculate: '',
        id: ''
    })
    const amountErrorMessage = ref('')

    const selectedExpense = computed(() => expensesStore.find(props.ulid))

    const { handleSubmit, setValues, setFieldValue, errors } = useForm({
        validationSchema: toTypedSchema(z.object({
            name: z
                .string({message: 'Este campo deve ser um texto'})
                .min(3, {message: 'Este campo deve ter no mínimo 3 letras'})
                .max(20, {message: 'Este campo deve ter no máximo 20 letras'}),
            details: z.optional(z.string()),
            calculate: z.enum(['y', 'n'], {message: 'Escolha entre as opções disponíveis'})
        }))
    })

    watch(selectedExpense, (selected: Expense|null): void => {
        if (selected) {
            setValues({
                name: selected.name,
                details: selected.details,
                calculate: selected.calculate
            })

            expenseForm.name = selected.name
            expenseForm.details = selected.details
            expenseForm.amount = formatToMonetaryString(selected.amount)
            expenseForm.calculate = selected.calculate
            expenseForm.id = selected.id
        }
    })

    function closeDialog(): void {
        if (dialog.value) {
            dialog.value.open = false
        }
    }

    const onSubmit = handleSubmit((formData: Expense) => {
        if (selectedExpense.value?.id) {
            if (isZeroStringValue(expenseForm.amount) || isZeroNumberValue(parseMonetaryString(expenseForm.amount))) {
                amountErrorMessage.value = 'O campo valor não pode ser zero'
                return
            }

            formData.amount = parseMonetaryString(expenseForm.amount)
            expensesStore.update(selectedExpense.value.id, formData)
            toast.success('Despesa atualizada')
            closeDialog()
        }

    })
</script>
