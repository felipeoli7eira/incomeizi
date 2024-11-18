import { defineStore } from 'pinia'
import { ref } from 'vue'
import nuxtStorage from 'nuxt-storage'

export const useIncomeStore = defineStore('income', () => {

    const LOCALSTORAGE_INCOME_KEY_APP = 'INCOMEIZI_INCOME'

    const income = ref<string>('0,00')

    function getIncomeFromLocalStorage(): number {
        let income = nuxtStorage.localStorage.getData(LOCALSTORAGE_INCOME_KEY_APP)

        if (income) {
            return income
        }

        return 0
    }

    function saveIncomeOnLocalStorage(): void {
        nuxtStorage.localStorage.setData(LOCALSTORAGE_INCOME_KEY_APP, parsedIncome(), 325 * 2, 'd')
    }

    function formatIncome(value: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value)
    }

    function parsedIncome(): number {
        return parseFloat(income.value.replaceAll('.', '').replace(',', '.'))
    }

    function loadIncomeStoreValue(): void {
        let storedIncome = getIncomeFromLocalStorage()
        income.value = formatIncome(storedIncome)
    }

    return {
        income,
        loadIncomeStoreValue,
        saveIncomeOnLocalStorage,
        parsedIncome,
        formatIncome,
        getIncomeFromLocalStorage
    }
})
