import { ref, watch } from "vue";
import nuxtStorage from "nuxt-storage";

import { DISPLAY_BALANCE_STATE_PREFERENCE_LS_KEY } from "~/constants/keys";

export default function useBalance() {
  const showBalance = ref<boolean>(false);

  watch(showBalance, (value: boolean): void => {
    saveVisibilityBalancePreferenceOnLocalStorage(value);
  });

  function toggleShowBalance() {
    showBalance.value = !showBalance.value;
  }

  function saveVisibilityBalancePreferenceOnLocalStorage(
    preference: boolean
  ): void {
    nuxtStorage.localStorage.setData(
      DISPLAY_BALANCE_STATE_PREFERENCE_LS_KEY,
      preference, // show = true, hide = false
      365,
      "d"
    );
  }

  function loadDisplayBalancePreferenceFromLocalStorage(): boolean {
    const preference = nuxtStorage.localStorage.getData(
      DISPLAY_BALANCE_STATE_PREFERENCE_LS_KEY
    );

    if (preference === null) {
      return showBalance.value;
    }

    return preference;
  }

  function onComponentMounted(): void {
    const showBalancePreference =
      loadDisplayBalancePreferenceFromLocalStorage();

    showBalance.value = showBalancePreference;

    saveVisibilityBalancePreferenceOnLocalStorage(showBalancePreference);
  }

  return {
    showBalance,
    toggleShowBalance,
    loadDisplayBalancePreferenceFromLocalStorage,
    onComponentMounted,
  };
}
