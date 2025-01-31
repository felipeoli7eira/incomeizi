<template>
    <ClientOnly>
        <div class="flex items-center space-x-1 w-full justify-between md:justify-start">
            <h1 class="text-lg p-2 relative rounded-full diver-step-1--balance">
                <p>Saldo: {{ formatToMonetaryString(expensesStore.balance) }}</p>

                <div v-if="!displayBalance" class="backdrop-blur-sm h-full rounded-full bg-white/30 absolute top-0 left-0 right-0 bottom-0"></div>
            </h1>

            <button @click="changeDisplayBalance" type="button" class="btn shadow-none border-none hover:bg-inherit bg-inherit btn-sm p-0">
                <Icon v-if="!displayBalance" name="lucide:eye" class="icon" />
                <Icon v-else name="lucide:eye-closed" class="icon" />
            </button>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
    import { useExpensesStore } from '~/stores/modules/expenses'
    import nuxtStorage from 'nuxt-storage'
    import { formatToMonetaryString } from '~/helpers/parsers'

    const displayBalance = ref(false)
    const expensesStore = useExpensesStore()

    const DISPLAY_BALANCE_PREFERENCE_KEY = 'INCOMEIZI_DISPLAY_BALANCE_STATE_PREFERENCE'

    function changeDisplayBalance(): void {
        displayBalance.value = !displayBalance.value
        saveDisplayBalancePreferenceStateOnLocalStorage()
    }

    function saveDisplayBalancePreferenceStateOnLocalStorage(): void {
        nuxtStorage.localStorage.setData(DISPLAY_BALANCE_PREFERENCE_KEY, displayBalance.value, 325 * 2, 'd')
    }

    onMounted((): void => {
        const displayBalanceSavedPreference = nuxtStorage.localStorage.getData(DISPLAY_BALANCE_PREFERENCE_KEY)

        if (displayBalanceSavedPreference) {
            displayBalance.value = displayBalanceSavedPreference
        }
    })
</script>
