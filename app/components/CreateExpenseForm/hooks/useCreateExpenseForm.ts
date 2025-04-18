import { useExpensesStore } from "../../../stores/modules/expenses/index";
import { type Expense } from "~/types/Expense";
import { toast } from "@steveyuowo/vue-hot-toast";
import { parseMonetaryString } from "~/helpers/parsers";
import { isZeroNumberValue, isZeroStringValue } from "~/helpers/validators";

export default function useCreateExpenseForm() {
  const expensesStore = useExpensesStore();
  const formDialog = ref<HTMLDialogElement | null>(null);

  const amountModelInput = ref("");
  const amountErrorMessage = ref("");

  function create(formData: Expense): void {
    console.log(formData);

    if (!validAmount()) {
      amountErrorMessage.value = "Defina um valor para esse item";
      return;
    }

    formData.amount = parseMonetaryString(amountModelInput.value);
    expensesStore.create(formData);
    formDialog.value?.close();
    toast.success("Ok");
    resetForm();
  }

  function validAmount(): boolean {
    if (isZeroStringValue(amountModelInput.value)) {
      displayErrorMessage("O valor da despesa deve ser maior que zero");
      return false;
    }

    const numericValue = parseMonetaryString(amountModelInput.value);

    if (isZeroNumberValue(numericValue)) {
      displayErrorMessage("O valor da despesa deve ser um valor numérico");
      return false;
    }

    return true;
  }

  function displayErrorMessage(message: string): void {
    amountErrorMessage.value = message;
  }

  function openFormDialog(): void {
    resetForm();
    formDialog.value?.showModal();
  }

  function closeFormDialog(): void {
    formDialog.value?.close();
  }

  function resetForm(): void {
    const form = document.querySelector("#createExpenseDialog form");

    if (form) {
      amountErrorMessage.value = "";
      form.reset();
    }

    amountModelInput.value = "0,00";
    amountErrorMessage.value = "";
  }

  return {
    amountModelInput,
    formDialog,
    create,
    openFormDialog,
    closeFormDialog,
    amountErrorMessage,
  };
}
