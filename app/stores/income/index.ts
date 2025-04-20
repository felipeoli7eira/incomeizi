import { defineStore } from "pinia";
import { ref } from "vue";
import { INCOME_LS_KEY } from "~/constants/keys";
import nuxtStorage from "nuxt-storage";

export const useIncomeStore = defineStore("income", () => {
  const income = ref(0);

  function update(newValue: number): void {
    income.value = newValue;
  }

  /**
   * Metodo que carrega o valor do localStorage ou retorna 0, que significa que
   * nenhuma renda foi cadastrada
   *
   * @returns number O valor carregado
   */
  function fromStorageOrDefault(): number {
    let data = nuxtStorage.localStorage.getData(INCOME_LS_KEY);

    if (data !== null) {
      return data;
    }

    return 0;
  }

  function saveOnLocalStorage(income: number): void {
    nuxtStorage.localStorage.setData(INCOME_LS_KEY, income, 365, "d");
  }

  /**
   * Metodo que formata um número para o padrão brasileiro de moeda
   *
   * @param value number O número a ser formatado
   * @returns string O número formatado (ex: 1000 -> 1.000,00)
   */
  function formatIncome(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  function load(): void {
    income.value = fromStorageOrDefault();
  }

  watch(income, (value: number): void => {
    saveOnLocalStorage(value);
    income.value = value;
  });

  return {
    income,
    load,
    saveOnLocalStorage,
    formatIncome,
    fromStorageOrDefault,
    update,
  };
});
