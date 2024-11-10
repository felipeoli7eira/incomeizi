import { useExpensesStore } from "../../../stores/modules/expenses/index";
import { type Expense } from "~/types/Expense";

import {
  handleSubmit,
  errors,
  defaultResetedFormValues
} from "./../schema";

export default function useUpdateExpenseForm(selectedExpense) {
  const expensesStore = useExpensesStore();
  const expenseForm = reactive(defaultResetedFormValues);

  function update(formData: Expense) {
  }

  const onSubmit = handleSubmit((formData: Expense) => {
      if (selectedExpense.value?.id) {
          expensesStore.update(selectedExpense.value?.id, formData);
      }
  });

  return {
    update,
    onSubmit,
    errors,
    expenseForm
  };
}
