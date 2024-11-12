<template>
    <dialog ref="updateExpenseDialog" id="updateExpenseDialog" class="modal">
        <div class="modal-box">
            <h3 class="text-lg m-0 font-bold">Atualização de dados</h3>
            <p class="pb-4 mt-0 text-sm">Atualize as informações da sua despesa</p>

            <VeeForm @submit="onSubmit" class="grid">
                <label class="input input-bordered flex items-center gap-2 text-sm">
                    Depesa: <input
                        type="text"
                        @input="({ target }) => setFieldValue('name', target?.value ?? '')"
                        v-model="expenseForm.name"
                        placeholder="Ex.: Prestação do apartamento"
                    />
                </label>

                <p v-if="errors.name" class="m-0 text-red-500 text-sm">{{ errors.name }}</p>

                <label class="mt-3 input input-bordered flex items-center gap-2 text-sm">
                    Anotação (opcional): <input
                        type="text"
                        v-model="expenseForm.details"
                        class="grow text-sm"
                        @input="({ target }) => setFieldValue('details', target?.value ?? '')"
                    />
                </label>

                <p v-if="errors.details" class="m-0 text-red-500 text-sm">{{ errors.details }}</p>

                <label class="mt-3 input input-bordered flex items-center gap-2 text-sm">
                    Valor: <input
                        type="text"
                        class="grow text-sm"
                        v-model="expenseForm.amount"
                        placeholder="Ex.: 1200,00"
                        @input="({ target }) => setFieldValue('amount', target?.value ?? '')"
                    />
                </label>

                <p v-if="errors.amount" class="m-0 text-red-500 text-sm">{{ errors.amount }}</p>

                <VeeField @change="({ target }) => setFieldValue('calculate', target?.value)" as="select" v-model="expenseForm.calculate" name="calculate" class="mt-3 select select-bordered w-full text-sm">
                    <option value="y">Sim</option>
                    <option value="n">Não</option>
                </VeeField>

                <p v-if="errors.calculate" class="m-0 text-red-500 text-sm">{{ errors.calculate }}</p>

                <p v-if="selectedExpense === null" class="m-0 text-red-400">Desculpe, os dados da despesa selecionada não puderam ser carregados</p>

                <button v-else type="submit" class="btn btn-primary mt-3">Salvar</button>
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
    import { defineProps } from "vue";
    import { useExpensesStore } from "~/stores/modules/expenses";
    import { z } from "zod";
    import { type Expense } from "~/types/Expense";
    import { useForm } from "vee-validate";

    const dialog = useTemplateRef("updateExpenseDialog");

    const props = defineProps({
        ulid: {
            type: String,
            required: true
        }
    });

    const expensesStore = useExpensesStore();

    const expenseForm = reactive({
        name: "",
        details: "",
        amount: 0,
        calculate: "",
        id: ""
    });

    const selectedExpense = computed(() => expensesStore.find(props.ulid));

    const { handleSubmit, setValues, setFieldValue, errors } = useForm({
        validationSchema: toTypedSchema(z.object({
            name: z
                .string({message: "Este campo deve ser um texto."})
                .min(3, {message: "Este campo deve ter no mínimo 3 letras."})
                .max(20, {message: "Este campo deve ter no máximo 20 letras."}),
            details: z.optional(z.string()),
            amount: z.string({message: "Este campo deve ter um valor válido"}),
            calculate: z.enum(["y", "n"], {message: "Escolha entre as opções disponíveis"})
        }))
    });

    watch(selectedExpense, (selected: Expense | null) => {
        if (selected) {
            setValues({
                name: selected.name || "",
                details: selected.details || "",
                amount: selected.amount.toString() || "",
                calculate: selected.calculate || ""
            });

            expenseForm.name = selected.name;
            expenseForm.details = selected.details;
            expenseForm.amount = selected.amount;
            expenseForm.calculate = selected.calculate;
            expenseForm.id = selected.id;
        }
    });

    function closeDialog(): void {
        if (dialog.value) {
            dialog.value.open = false;
        }
    }

    const onSubmit = handleSubmit((formData: Expense) => {
        if (selectedExpense.value?.id) {
            expensesStore.update(selectedExpense.value.id, formData);
        }

        closeDialog();
    });
</script>
