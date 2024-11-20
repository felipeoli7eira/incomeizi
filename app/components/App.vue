<template>
    <div class="mt-10 rounded-md">
        <div class="shadow-xl rounded-md hidden md:block">
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
                        <tr v-for="expense in expensesStore.data" :key="expense.id.concat('md')">
                            <td>{{ expense.name }}</td>
                            <td>{{ cutLongDetails(expense?.details) }}</td>
                            <td>{{ formatToMonetaryString(expense.amount) }}</td>
                            <td>{{ Calculate[expense.calculate] }}</td>
                            <td class="md:space-x-1 space-y-1 md:space-y-0">
                                <button class="btn btn-sm" @click="() => openUpdateExpenseFormDialog(expense.id)">
                                    <Icon name="lucide:list-collapse" class="icon" />
                                </button>

                                <button type="button" class="btn btn-sm" @click="() => openDeleteExpenseFormDialog(expense.id)">
                                    <Icon name="lucide:trash" class="icon" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="md:hidden space-y-2">
            <div v-for="expense in expensesStore.data" :key="expense.id.concat('sm')" class="card bg-base-100 w-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title text-base font-normal mb-2 flex justify-between">
                        <span class="text-sm">{{ expense.name }}</span>
                        <div class="badge rounded-md badge-outline p-3" :class="{'badge-success': expense.calculate === 'y', 'badge-error': expense.calculate === 'n'}">
                            <span class="mr-2">{{ formatToMonetaryString(expense.amount) }}</span>
                            <Icon name="lucide:calculator" class="icon" />
                        </div>
                    </h2>

                    <p v-if="expense?.details" class="text-xs font-thin mb-2">{{ cutLongDetails(expense?.details) }}</p>

                    <div class="flex justify-end space-x-1">
                        <button class="btn btn-sm" type="button" @click="() => openUpdateExpenseFormDialog(expense.id)">
                            <Icon name="lucide:list-collapse" class="icon" />
                        </button>

                        <button class="btn btn-sm" type="button" @click="() => openDeleteExpenseFormDialog(expense.id)">
                            <Icon name="lucide:trash" class="icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <DeleteExpenseDialog :ulid="expenseToDeleteUlid" />
        <UpdateExpenseForm :ulid="expenseToUpadeUlid" />
    </div>
</template>

<script lang="ts" setup>
    import { useExpensesStore } from '~/stores/modules/expenses'
    import { Calculate } from '~/Enums/Calculate'
    import { formatToMonetaryString } from '~/helpers/parsers'

    const expensesStore = useExpensesStore()

    const expenseToUpadeUlid = ref('')
    const expenseToDeleteUlid = ref('')

    function openUpdateExpenseFormDialog(expenseUlid: string) {
        expenseToUpadeUlid.value = expenseUlid

        const dialog = document.querySelector('#updateExpenseDialog')

        if (dialog) {
            dialog.open = true
        }
    }

    function openDeleteExpenseFormDialog(expenseUlid: string) {
        expenseToDeleteUlid.value = expenseUlid

        const dialog = document.querySelector('#deleteExpenseDialog')

        if (dialog) {
            dialog.open = true
        }
    }

    function cutLongDetails(details?: string) {
        if (details && details.length > 50) {
            return details.slice(0, 50).concat('...')
        }

        return details
    }
</script>
