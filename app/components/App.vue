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
                <div class="card-body p-4">
                    <div class="mb-2 flex items-center justify-between">
                        <div class="flex items-center gap-1">
                            <span :class="{'badge-success': expense.calculate === 'y', 'badge-error': expense.calculate === 'n'}" class="circle-status"></span>
                            <h2 class="text-sm font-normal">{{ expense.name }}</h2>
                        </div>
                        <p class="font-semibold text-sm text-right">{{ formatToMonetaryString(expense.amount) }}</p>
                    </div>

                    <p v-if="expense?.details" class="text-xs font-normal mb-2">{{ cutLongDetails(expense?.details) }}</p>

                    <footer class="flex justify-end gap-5 items-center">
                        <!-- <div class="badge rounded-md p-3" :class="{'badge-success': expense.calculate === 'y', 'badge-error': expense.calculate === 'n'}">
                            <Icon name="lucide:calculator" class="icon" />
                        </div> -->

                        <!-- <div class="space-x-1"> -->
                            <button class="btn btn-sm shadow-none hover:bg-inherit bg-inherit border-0 p-0" type="button" @click="() => openUpdateExpenseFormDialog(expense.id)">
                                <Icon name="lucide:list-collapse" class="icon" />
                            </button>

                            <button class="btn btn-sm shadow-none bg-inherit border-0 p-0" type="button" @click="() => openDeleteExpenseFormDialog(expense.id)">
                                <Icon name="lucide:trash" class="icon" />
                            </button>
                        <!-- </div> -->
                    </footer>
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


<style>
    .circle-status {
        width: 5px !important;
        height: 5px;
        border-radius: 50%;
    }
</style>
