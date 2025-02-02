<template>
    <div class="mt-5 rounded-md">

        <p v-if="!expensesStore.data.length" class="text-center text-sm">Nenhuma despesa cadastrada.</p>

        <div class="shadow-xl rounded-md hidden md:block">
            <div v-if="expensesStore.data.length" class="overflow-x-auto">
                <table class="table table-xs diver-step-5--list-expenses-table">
                    <thead class="text-base">
                        <tr class="bg-base-200">
                            <th class="font-normal py-4 rounded-s-xs">Despesa</th>
                            <th class="font-normal py-4">Descrição</th>
                            <th class="font-normal py-4">Valor</th>
                            <th class="font-normal py-4">Calculado</th>
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

        <div v-if="expensesStore.data.length" class="md:hidden space-y-2">
            <div v-for="expense in expensesStore.data" :key="expense.id.concat('sm')" class="card bg-base-200 w-100 shadow-xl">
                <div class="card-body p-3">
                    <div class="flex items-center gap-1">
                        <span :class="{'badge-success': expense.calculate === 'y', 'badge-error': expense.calculate === 'n'}" class="circle-status rounded-full"></span>
                        <h2 class="text-sm font-medium">{{ expense.name }}</h2>
                    </div>

                    <p v-if="expense?.details" class="text-xs font-normal">{{ cutLongDetails(expense?.details) }}</p>

                    <footer class="flex justify-between items-center">
                        <p class="font-normal text-sm">{{ formatToMonetaryString(expense.amount) }}</p>

                        <div class="space-x-1">
                            <button class="btn btn-sm" type="button" @click="() => openUpdateExpenseFormDialog(expense.id)">
                                <Icon name="lucide:list-collapse" class="icon" />
                            </button>

                            <button class="btn btn-sm" type="button" @click="() => openDeleteExpenseFormDialog(expense.id)">
                                <Icon name="lucide:trash" class="icon" />
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>

        <DeleteExpenseDialog :ulid="expenseToDeleteUlid" />
        <UpdateExpenseForm :ulid="expenseToUpdateUlid" />
    </div>
</template>

<script lang="ts" setup>
    import { useExpensesStore } from '~/stores/modules/expenses'
    import { Calculate } from '~/Enums/Calculate'
    import { formatToMonetaryString } from '~/helpers/parsers'
    import useTour from '~/hooks/useTour'

    const expensesStore = useExpensesStore()

    const expenseToUpdateUlid = ref('')
    const expenseToDeleteUlid = ref('')

    function openUpdateExpenseFormDialog(expenseUlid: string) {
        expenseToUpdateUlid.value = expenseUlid

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

    onMounted(() => {
        useTour()
    })
</script>


<style>
    .circle-status {
        width: 7px;
        height: 7px;
    }

    table thead tr th:first-child {
        border-start-start-radius: 5px !important;
    }

    table thead tr th:last-child {
        border-start-end-radius: 5px !important;
    }

    /* driver overrides */

    /* Class assigned to popover wrapper */
    /* .driver-popover {} */

    /* Arrow pointing towards the highlighted element */
    /* .driver-popover-arrow {} */

    /* Title and description */
    /* .driver-popover-title {}
    .driver-popover-description {} */

    /* Close button displayed on the top right corner */
    /* .driver-popover-close-btn {} */

    /* Footer of the popover displaying progress and navigation buttons */
    /* .driver-popover-footer {}
    .driver-popover-progress-text {}
    .driver-popover-prev-btn {}
    .driver-popover-next-btn {} */
</style>
