<template>
    <ClientOnly>
        <div id="balance-component" class="w-full flex items-center gap-2">
            <h1 class="text-lg">
                {{ showBalance ? formatToMonetaryString(expensesStore.balance) :
                    maskMonetaryString(expensesStore.balance) }}
            </h1>

            <button @click="toggleShowBalance" type="button"
                class="btn shadow-none border-none hover:bg-inherit bg-inherit btn-sm p-0">
                <Icon v-if="showBalance" name="lucide:eye-closed" class="icon" />
                <Icon v-else name="lucide:eye" class="icon" />
            </button>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { useExpensesStore } from '~/stores/expenses'
import { formatToMonetaryString, maskMonetaryString } from '~/helpers/parsers'
const expensesStore = useExpensesStore()

import useBalance from "~/components/Balance/useBalance";
import { useIncomeStore } from "~/stores/income";

import { onMounted } from "vue";

const {
    showBalance,
    toggleShowBalance,
    onComponentMounted,
} = useBalance()

const { income, formatIncome } = useIncomeStore()

onMounted(onComponentMounted)
</script>
