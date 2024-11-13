import { toast } from '@steveyuowo/vue-hot-toast'
import { moneySettings } from '~/plugins/v-money'
import nuxtStorage from 'nuxt-storage'
import { onMounted, ref } from 'vue'

export default function useSettings() {
    const incomeModel = ref<string>('0,00')
    const incomeErrorMessage = ref<string>('')
    const LOCALSTORAGE_INCOME_KEY_APP = 'INCOMEIZI_INCOME'
    const settingsDialog = ref<HTMLDialogElement | null>(null)

    function saveIncome(income: number): void {
        nuxtStorage.localStorage.setData(LOCALSTORAGE_INCOME_KEY_APP, income, 325 * 2, 'd')
        toast.success('Renda atualizada com sucesso')
        settingsDialog.value?.close()
    }

    function onSubmit(): void {
        if (incomeModel.value === '0,00') {
            incomeErrorMessage.value = 'Renda não pode ser zero'
            return
        }

        const income = parseFloat(incomeModel.value.replaceAll('.', '').replace(',', '.'))

        if (isNaN(income) || income < 0) {
            incomeErrorMessage.value = 'Renda inválida'
            return
        }

        saveIncome(income)
    }

    function loadIncomeFromLocalStorage(): void {
        const income = nuxtStorage.localStorage.getData(LOCALSTORAGE_INCOME_KEY_APP)

        if (income) {
            incomeModel.value = new Intl.NumberFormat('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(income)
        }
    }

    onMounted(() => {
        loadIncomeFromLocalStorage()
    })

    return {
        moneySettings,
        incomeModel,
        incomeErrorMessage,
        settingsDialog,
        loadIncomeFromLocalStorage,
        onSubmit
    };
}
