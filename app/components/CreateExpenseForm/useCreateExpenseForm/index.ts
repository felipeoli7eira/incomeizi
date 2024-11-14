import { useExpensesStore } from '../../../stores/modules/expenses/index';
import { type Expense } from '~/types/Expense'
import { toast } from '@steveyuowo/vue-hot-toast'

export default function useCreateExpenseForm() {
  const expensesStore = useExpensesStore()
  const createExpenseFormDialog = ref<HTMLDialogElement | null>(null)

  const amount = ref('')
  const amountErrorMessage = ref('')

  function create(formData: Expense): void {
    if (validAmount()) {
      formData.amount = parseAmount(amount.value)
      expensesStore.create(formData)
      createExpenseFormDialog.value?.close()
      toast.success('Despesa criada com sucesso')
    }
  }

  function validAmount(): boolean {
    if (amount.value === '0,00') {
      amountErrorMessage.value = 'O valor da despesa deve ser maior que zero'
      return false
    }

    const numericValue = parseAmount(amount.value)

    if (isNaN(numericValue) || numericValue < 0) {
      amountErrorMessage.value = 'O valor da despesa deve ser um valor numérico'
      return false
    }

    return true
  }

  function parseAmount(value: string): number {
    return parseFloat(value.replaceAll('.', '').replace(',', '.'))
  }

  return {
    create,
    amountModel: amount,
    createExpenseFormDialog
  };
}
