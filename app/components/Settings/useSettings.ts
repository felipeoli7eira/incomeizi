import { toast } from "@steveyuowo/vue-hot-toast";
import { moneySettings } from "~/plugins/v-money";
import { ref } from "vue";
import { useIncomeStore } from "~/stores/income";
import { parseMonetaryString } from "~/helpers/parsers";

export default function useSettings() {
  const errorMessage = ref("");
  const settingsDialog = ref<HTMLDialogElement | null>(null);
  const { income, formatIncome, update } = useIncomeStore();

  const inputModel = ref("");

  function onSubmit(): void {
    if (inputModel.value === "0,00") {
      errorMessage.value = "Renda não pode ser zero";
      return;
    }

    let parsed = parseFloat(
      inputModel.value.replaceAll(".", "").replace(",", ".")
    );

    if (isNaN(parsed)) {
      errorMessage.value = "Renda inválida";
      return;
    }

    update(parsed);

    toast.success("Renda principal atualizada");

    closeSettingsDialog();
  }

  function openSettingsDialog(): void {
    settingsDialog.value?.showModal();
  }

  function closeSettingsDialog(): void {
    settingsDialog.value?.close();
  }

  async function onComponentMounted(): Promise<void> {
    inputModel.value = await formatIncome(income);
  }

  return {
    moneySettings,
    errorMessage,
    settingsDialog,
    inputModel,
    onSubmit,
    openSettingsDialog,

    onComponentMounted,
  };
}
