// https://github.com/vuejs-tips/v-money

import money from 'v-money'

export const moneySettings = {
  decimal: ',',
  thousands: '.',
  precision: 2,
  masked: true
}

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(money, moneySettings)
})
