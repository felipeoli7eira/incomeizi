<template>
    <div class="mt-5 rounded-md">

        <p v-if="!data.length" class="text-center text-sm">Nenhuma despesa cadastrada.</p>

        <div class="shadow-xl rounded-md hidden md:block">
            <div v-if="data.length" class="overflow-x-auto">
                <table class="table table-xs diver-step-5--list-expenses-table">
                    <thead class="text-base">
                        <tr class="bg-base-200">
                            <th class="font-normal py-4 rounded-s-xs">Nome</th>
                            <th class="font-normal py-4">Descrição</th>
                            <th class="font-normal py-4">Valor</th>
                            <th class="font-normal py-4">Calculando</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody class="text-sm">
                        <tr v-for="expense in data" :key="expense.id.concat('md')">
                            <td>
                                <Icon v-if="expense?.type === 'income'" name="lucide:arrow-up-to-line" class="icon text-success" />
                                <Icon v-else-if="expense?.type === 'expense'" name="lucide:arrow-down-to-line" class="icon text-error" />
                                <Icon v-else name="lucide:asterisk" class="icon text-gray-500" />

                                <span class="px-3 d-inline-block">{{ expense.name }}</span>
                            </td>
                            <td>{{ cutLongDetails(expense?.details) }}</td>
                            <td>{{ formatToMonetaryString(expense.amount) }}</td>
                            <td>
                                <span v-if="expense?.type === undefined" class="text-sm badge badge-ghost">Não classificado</span>

                                <span v-else class="text-sm badge" :class="{ 'badge-success': expense.calculate === 'y', 'badge-error': expense.calculate === 'n' }">
                                    {{ Calculate[expense.calculate] }}
                                </span>
                            </td>
                            <td class="md:space-x-1 space-y-1 md:space-y-0">
                                <button class="btn btn-sm" @click="() => openUpdateExpenseFormDialog(expense.id)">
                                    <Icon name="lucide:list-collapse" class="icon" />
                                </button>

                                <button type="button" class="btn btn-sm"
                                    @click="() => openDeleteExpenseFormDialog(expense.id)">
                                    <Icon name="lucide:trash" class="icon" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="data.length" class="md:hidden space-y-2">
            <div v-for="expense in data" :key="expense.id.concat('sm')" class="card bg-base-200 w-100 shadow-xl">
                <div class="card-body p-3">
                    <div class="flex items-center gap-1 justify-between">
                        <h2 class="text-sm font-medium">{{ expense.name }}</h2>

                        <span
                        class="text-sm badge"
                        :class="{
                            'badge-outline badge-ghost': expense?.type === undefined,
                            'badge-success': expense?.type !== undefined && expense.calculate === 'y',
                            'badge-error': expense?.type !== undefined && expense.calculate === 'n'
                        }">calculando</span>
                    </div>

                    <p v-if="expense?.details" class="text-xs font-normal">{{ cutLongDetails(expense?.details) }}</p>

                    <footer class="flex justify-between items-center">
                        <p class="font-normal text-sm flex gap-2">
                            <Icon v-if="expense?.type === 'income'" name="lucide:arrow-up-to-line" class="icon text-success" />
                            <Icon v-else-if="expense?.type === 'expense'" name="lucide:arrow-down-to-line" class="icon text-error" />
                            <Icon v-else name="lucide:asterisk" class="icon text-gray-500" />

                            {{ formatToMonetaryString(expense.amount) }}
                        </p>

                        <div class="space-x-1">
                            <button class="btn btn-sm shadow-none" type="button"
                                @click="openUpdateExpenseFormDialog(expense.id)">
                                <Icon name="lucide:list-collapse" class="icon" />
                            </button>

                            <button class="btn btn-sm shadow-none" type="button"
                                @click="openDeleteExpenseFormDialog(expense.id)">
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
import { type Expense } from '~/types/Expense'

const expensesStore = useExpensesStore()

const expenseToUpdateUlid = ref('')
const expenseToDeleteUlid = ref('')

const data = computed(() => [...expensesStore.data].sort((a: Expense, b: Expense) => a.calculate === 'y' ? -1 : 1))

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

onMounted(useTour)
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
