import { useExpensesStore } from "../../../stores/modules/expenses/index";
import { type Expense } from "~/types/Expense";

export default function useCreateExpenseForm() {
  const expensesStore = useExpensesStore();

  function create(formData: Expense) {
    formData.amount = parseFloat(formData.amount);
    expensesStore.create(formData);
  }

  return {
    create,
  };
}
