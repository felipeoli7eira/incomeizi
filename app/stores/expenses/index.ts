import { defineStore } from "pinia";
import { type Expense } from "~/types/Expense";
import nuxtStorage from "nuxt-storage";
import { ulid } from "ulid";
import { Calculate } from "~/Enums/Calculate";
import { useIncomeStore } from "../income";

const EXPENSES_KEY_LOCALSTORAGE = "INCOMEIZI_DATA";

export const useExpensesStore = defineStore("expenses", () => {
  const data = ref<Expense[]>([]);
  const read = computed(() => data);
  const incomeStore = useIncomeStore();

  const balance = computed((): number => {
    const expenses = data.value.filter((record) => record?.type === "expense");
    const incomes = data.value.filter((record) => record?.type === "income");

    const expensesSum = expenses.reduce(
      (accumulator: number, currentValue: Expense) => {
        if (Calculate[currentValue.calculate] === Calculate.y) {
          accumulator += currentValue.amount;
        }

        return accumulator;
      },
      0
    );

    const incomesSum = incomes.reduce(
      (accumulator: number, currentValue: Expense) => {
        if (Calculate[currentValue.calculate] === Calculate.y) {
          accumulator += currentValue.amount;
        }

        return accumulator;
      },
      0
    );

    const balance = incomeStore.income;

    return balance + incomesSum - expensesSum;
  });

  function create(payload: Expense) {
    payload.id = ulid();
    data.value.push(payload);
    saveState();
  }

  function update(ulid: string, payload: Expense): void {
    let index = data.value.findIndex((e) => e.id === ulid);

    if (index !== -1) {
      data.value[index] = { ...data.value[index], ...payload };
      saveState();
    }
  }

  function destroy(ulid: string): void {
    let expensesExceptSelectedToDestroy = data.value.filter(
      (expense: Expense) => expense.id !== ulid
    );
    data.value = expensesExceptSelectedToDestroy;
    saveState();
  }

  function saveState(): void {
    nuxtStorage.localStorage.setData(
      EXPENSES_KEY_LOCALSTORAGE,
      data.value,
      325 * 2,
      "d"
    );
  }

  function loadState(): void {
    const storedData = nuxtStorage.localStorage.getData(
      EXPENSES_KEY_LOCALSTORAGE
    );
    if (storedData) {
      data.value = storedData;
    }
  }

  function find(ulid: string): Expense | null {
    return data.value.find((expense: Expense) => expense.id === ulid) || null;
  }

  loadState();

  return {
    create,
    update,
    destroy,
    find,
    read,
    balance,
    data,
  };
});
