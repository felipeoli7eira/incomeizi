<template>
    <ClientOnly>
        <div class="flex items-stretch space-x-1">
            <h1 class="text-lg p-2 relative">
                <p>Saldo: {{ formatToCurrency(expensesStore.balance) }}</p>

                <div v-if="!displayBalance" class="backdrop-blur-sm h-full rounded-md bg-white/30 absolute top-0 left-0 right-0 bottom-0"></div>
            </h1>

            <button @click="changeDisplayBalance" type="button" class="btn btn-primary">
                <Icon v-if="!displayBalance" name="lucide:eye" class="icon" />
                <Icon v-else name="lucide:eye-closed" class="icon" />
            </button>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
    import { useExpensesStore } from '~/stores/modules/expenses'
    import nuxtStorage from 'nuxt-storage'

    const displayBalance = ref(false)
    const expensesStore = useExpensesStore()

    const DISPLAY_BALANCE_PREFERENCE_KEY = 'INCOMEIZI_DISPLAY_BALANCE_STATE_PREFERENCE'
    const TWO_YARS = 325 * 2

    const changeDisplayBalance = (): void => {
        displayBalance.value = !displayBalance.value
        saveDisplayBalancePreferenceStateOnLocalStorage()
    }

    function formatToCurrency(value: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value)
    }

    function saveDisplayBalancePreferenceStateOnLocalStorage(): void {
        nuxtStorage
        .localStorage
        .setData(DISPLAY_BALANCE_PREFERENCE_KEY, displayBalance.value, TWO_YARS, 'd')
    }

    onMounted((): void => {
        const displayBalanceSavedPreference = nuxtStorage.localStorage.getData(DISPLAY_BALANCE_PREFERENCE_KEY)

        if (displayBalanceSavedPreference) {
            displayBalance.value = displayBalanceSavedPreference
        // }
    })
</script>
