<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {
  // RouterLink,
  RouterView
} from "vue-router";
import Header from "./components/Header.vue";

const { t } = useI18n() // use as global scope
</script>

<template>
  <Header
    title="edocode"
    :subtitle="t('slogan_part1') + '<br/>' + t('slogan_part2')"
  />

  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.css";

@keyframes background-fade{
  0% {
    background-color: #FFF7E1;
  }
  50% {
    background-color: #E1FFFF;
  }
  100% {
    background-color: #F5E1FF;
  }
}

html {
  scroll-behavior: smooth;
}

body {
  color: black;
  animation: 10s linear 1s infinite alternate background-fade;
}
</style>
