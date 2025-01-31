<template>
    <dialog ref="deleteExpenseDialog" id="deleteExpenseDialog" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Atenção!</h3>
            <p class="py-4">Quer realmente deletar a despesa <b>"{{ selectedExpense?.name }}"</b> da lista de despesas?</p>

            <button class="btn btn-primary btn-block" @click="() => destroy(selectedExpense.id)">Sim, quero deletar</button>

            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Cancelar</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
    import { useExpensesStore } from '~/stores/modules/expenses'

    const props = defineProps({
        ulid: {
            type: String,
            required: true
        }
    })

    const expensesStore = useExpensesStore()

    const selectedExpense = computed(() => expensesStore.find(props.ulid))

    const deleteExpenseDialog = ref<HTMLDialogElement | null>(null)

    function destroy(ulid: string): void {
        expensesStore.destroy(ulid)
        closeDeleteExpenseDialog()
    }

    function openDeleteExpenseDialog(): void {
        deleteExpenseDialog.value?.showModal()
    }

    function closeDeleteExpenseDialog(): void {
        deleteExpenseDialog.value?.close()
    }
</script>
