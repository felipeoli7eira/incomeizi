import { toast } from '@steveyuowo/vue-hot-toast'
import { moneySettings } from '~/plugins/v-money'
import { ref } from 'vue'
import { useIncomeStore } from '~/stores/modules/income'

export default function useSettings() {
    const incomeErrorMessage = ref('')
    const settingsDialog = ref<HTMLDialogElement | null>(null)
    const incomeStore = useIncomeStore()

    function onSubmit(): void {
        if (incomeStore.income === '0,00') {
            incomeErrorMessage.value = 'Renda não pode ser zero'
            return
        }

        let parsedIncome = parseFloat(incomeStore.income.replaceAll('.', '').replace(',', '.'))

        if (isNaN(parsedIncome) || parsedIncome < 0) {
            incomeErrorMessage.value = 'Renda inválida'
            return
        }

        incomeStore.saveIncomeOnLocalStorage()

        toast.success('Renda atualizada com sucesso')

        settingsDialog.value?.close()
    }

    onMounted(() => setTimeout(
        () => incomeStore.loadIncomeStoreValue(), 1
    ))

    return {
        moneySettings,
        incomeErrorMessage,
        settingsDialog,
        incomeStore,
        onSubmit
    }
}
