<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import colors from "../data/colors.json";
import useColorStore from "../stores/color";

const { t, locale } = useI18n() // use as global scope
const color = useColorStore()

defineProps<{
  title: string;
  subtitle: string;
}>();


const langs = ["en", "fr"];
const colorKeys = Object.keys(colors);
const colorValues = Object.values(colors);

function changeColor(c: string) {
  if(c === "blue") {
    color.setBlue()
  } else if(c === "red") {
    color.setRed();
  } else if(c === "green") {
    color.setGreen();
  } else {
    color.setDefaultColor();
  }
}
</script>

<template>
  <header>
    <h1>
      {{ title }}
    </h1>
    <section class="colors">
      <div
        v-for="(c, i) in colorKeys"
        v-on:click="() => changeColor(c)"
        :key="`Color${i}`"
        class="circle"
        :class="[colors[c] === color.color ? 'active' : '']"
        :style="colors[c] === color.color ? {backgroundColor: colors[c], boxShadow: `0px 0px 0px 5px ${colors[c]}`} : { backgroundColor: colors[c] }"
        :title="c"
      >
      </div>
    </section>
    <h2 v-html="subtitle"></h2>
  </header>
  <div class="locale-changer">
    <select
      v-model="locale"
      :style="{
        border: `3px solid ${color.color}`,
        borderRadius: '10px',
        padding: '5px',
        backgroundColor: '#FEFEFE'
      }"
    >
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ t(lang) }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
$circle-size: 35px;
$gutter: 5px;
.circle {
  width: $circle-size;
  height: $circle-size;
  border-radius: 50%;
  margin: $gutter;

  &:not(.active) {
    cursor: pointer;
  }

  &.active {
    border: 1px solid white;
  }
}

.colors {
  position: fixed;
  top: 24px;
  left: 24px;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: $circle-size * 2 + $gutter * 4;
  transform: rotateZ(45deg);
  z-index: 30;

  @media screen and (max-width: 525px) {
    position: static;
    top: 12px;
    left: 12px;
    width: $circle-size * 4 + $gutter * 8;
    transform: rotate(0);
  }
}

.locale-changer {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 30;

  select {
    cursor: pointer;
  }
}

header {
  position: sticky;
  top: 0px;
  z-index: 10;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;

  text-shadow: 0px 0px 8px white, 0px 0px 5px white, 0px 0px 3px white;
  @media screen and (max-width: 525px) {
    h2 {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 320px) {
    h2 {
      font-size: 16px;
    }
  }
}

h2 {
  text-align: center;
}
</style>
