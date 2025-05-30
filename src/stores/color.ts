import { defineStore } from 'pinia'
import {
  defaultColor,
  blue,
  green,
  red
} from "../data/colors.json";

const useColorStore = defineStore('color', {
  state: () => ({
    color: defaultColor,
  }),
  getters: {
    isDefault: (state) => state.color === defaultColor,
    isRed: (state) => state.color === red,
    isBlue: (state) => state.color === blue,
    isGreen: (state) => state.color === green,
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