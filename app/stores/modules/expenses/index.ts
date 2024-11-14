import { defineStore } from 'pinia'
import { type Expense } from '~/types/Expense'
import nuxtStorage from 'nuxt-storage'
import { ulid } from 'ulid'
import { Calculate } from '~/Enums/Calculate'
import { useIncomeStore } from './../income'

const EXPENSES_KEY_LOCALSTORAGE = "INCOMEIZI_DATA";
const TWO_YARS = 325 * 2;

export const useExpensesStore = defineStore("expenses", () => {
  const data = ref<Expense[]>([]);
  const read = computed(() => data);
  const incomeStore = useIncomeStore()

  const balance = computed((): number => {
    const expensesSum = data.value.reduce((accumulator: number, currentValue: Expense) => {
      if (Calculate[currentValue.calculate] === Calculate.y) {
        accumulator += currentValue.amount
      }

      return accumulator
    }, 0)

    const income = incomeStore.parsedIncome()

    return income - expensesSum
  });

  function create(payload: Expense) {
    payload.id = ulid();

    data.value.push(payload);

    saveState();
  }

  function update(ulid: string, payload: Expense) {
    let index = data.value.findIndex(e => e.id === ulid);

    if (index !== -1) {
      data.value[index] = { ...data.value[index], ...payload };
      saveState();
    }
  }

  function destroy() {}

  function saveState(): void {
    nuxtStorage.localStorage.setData(EXPENSES_KEY_LOCALSTORAGE, data.value, TWO_YARS, 'd')
  }

  function loadState(): void {
    const storedData = nuxtStorage.localStorage.getData(EXPENSES_KEY_LOCALSTORAGE)
    if (storedData) {
      data.value = storedData
    }
  }

  function find(ulid: string): Expense|null {
    const expense = data.value.find((expense) => expense.id === ulid);
    return expense || null;
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
    formatFromNummberToCurrencyBrlString: incomeStore.formatIncome
  };
});
