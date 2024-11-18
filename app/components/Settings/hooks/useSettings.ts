import { toast } from '@steveyuowo/vue-hot-toast'
import { moneySettings } from '~/plugins/v-money'
import { ref } from 'vue'
import { useIncomeStore } from '~/stores/modules/income'

export default function useSettings() {
    const incomeErrorMessage = ref('')
    const settingsDialog = ref<HTMLDialogElement | null>(null)
    const incomeStore = useIncomeStore()
    const incomeModelInput = ref('')

    function onSubmit(): void {
        if (incomeModelInput.value === '0,00') {
            incomeErrorMessage.value = 'Renda não pode ser zero'
            return
        }

        let parsedIncome = parseFloat(incomeModelInput.value.replaceAll('.', '').replace(',', '.'))

        if (isNaN(parsedIncome) || parsedIncome < 0) {
            incomeErrorMessage.value = 'Renda inválida'
            return
        }

        incomeStore.income = incomeModelInput.value

        incomeStore.saveIncomeOnLocalStorage()

        toast.success('Renda atualizada com sucesso')

        closeSettingsDialog()
    }

    function reflectIncomeStoreValueOnIncomeModelInput(): void {
        let storedValue = incomeStore.getIncomeFromLocalStorage()

        incomeModelInput.value = incomeStore.formatIncome(storedValue)
    }

    function openSettingsDialog(): void {
        settingsDialog.value?.showModal()
    }

    function closeSettingsDialog(): void {
        settingsDialog.value?.close()
    }

    onMounted((): void => {
        setTimeout((): void => {
            incomeStore.loadIncomeStoreValue()
            reflectIncomeStoreValueOnIncomeModelInput()
        }, 100)
    })

    return {
        moneySettings,
        incomeErrorMessage,
        settingsDialog,
        incomeStore,
        incomeModelInput,
        onSubmit,
        openSettingsDialog
    }
}
