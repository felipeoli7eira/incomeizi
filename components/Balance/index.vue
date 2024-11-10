<template>
    <div class="flex items-stretch space-x-1">
        <h1 class="text-lg p-2 relative">
            <client-only>
                <p class="m-0 tooltip tooltip-left" data-tip="Saldo">{{ expensesStore.balance }}</p>
            </client-only>

            <div v-if="!displayBalance" data-tip="Saldo" class="tooltip tooltip-left backdrop-blur-sm h-full rounded-md bg-white/30 absolute top-0 left-0 right-0 bottom-0"></div>
        </h1>

        <button @click="setDisplayBalance" type="button" class="btn btn-primary">
            <Icon v-if="!displayBalance" name="lucide:eye" class="icon" />
            <Icon v-else name="lucide:eye-closed" class="icon" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { useExpensesStore } from '~/stores/modules/expenses';

    const displayBalance = ref(false);

    const setDisplayBalance = (): void => {
        displayBalance.value = !displayBalance.value
    };

    const expensesStore = useExpensesStore();
    console.log(typeof expensesStore.balance)
</script>
