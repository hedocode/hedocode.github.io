import { defineStore } from 'pinia'
import colors from "../data/colors";

const useColorStore = defineStore('color', {
  state: () => ({
    color: colors.defaultColor,
  }),
  getters: {
    isDefault: (state) => state.color === colors.defaultColor,
    isRed: (state) => state.color === colors.red,
    isBlue: (state) => state.color === colors.blue,
    isGreen: (state) => state.color === colors.green,
  },
  actions: {
    setDefaultColor() {
      this.color = "#404040";
    },
    setRed() {
      this.color = "#5f2548";
    },
    setBlue() {
      this.color = "#25275f";
    },
    setGreen() {
      this.color = "#255f37";
    }
  }
})


export default useColorStore;