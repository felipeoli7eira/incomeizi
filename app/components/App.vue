<template>
    <div class="mt-10 rounded-md">
        <div class="shadow-xl p-5 rounded-md">
            <div class="overflow-x-auto">
                <table class="table">
                    <thead class="text-base">
                        <tr>
                            <th>Despesa</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Calcular</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody class="text-sm">
                        <tr v-for="expense in expensesStore.data" :key="expense.id">
                            <td>{{ expense.name }}</td>
                            <td>{{ expense?.details }}</td>
                            <td>{{ formatToMonetaryString(expense.amount) }}</td>
                            <td>{{ Calculate[expense.calculate] }}</td>
                            <td class="space-x-1">
                                <button class="btn btn-sm" @click="() => openUpdateExpenseFormDialog(expense.id)">
                                    <Icon name="lucide:chart-bar-decreasing" class="icon" />
                                </button>

                                <button type="button" class="btn btn-sm">
                                    <Icon name="lucide:trash" class="icon" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- <div class="flex items-center justify-center mt-5">
                    <div class="join">
                        <button class="join-item btn">«</button>
                        <button class="join-item btn">Página 1</button>
                        <button class="join-item btn">»</button>
                    </div>
                </div> -->
            </div>
        </div>

        <UpdateExpenseForm :ulid="expenseToUpadeUlid" />
    </div>
</template>

<script lang="ts" setup>
    import { useExpensesStore } from '~/stores/modules/expenses'
    import { Calculate } from '~/Enums/Calculate'
    import { formatToMonetaryString } from '~/helpers/parsers'

    const expensesStore = useExpensesStore()
    const expenseToUpadeUlid = ref('')

    function openUpdateExpenseFormDialog(expenseUlid: string) {
        expenseToUpadeUlid.value = expenseUlid

        const dialog = document.querySelector('#updateExpenseDialog')

        if (dialog) {
            dialog.open = true
        }
    }
</script>
