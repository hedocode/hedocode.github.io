<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useColorStore from "../stores/color";

// import { ref } from "vue";
export interface Props {
  message: string;
  cls: string;
}

const {
  message = "edocode",
} = defineProps<Props>();

const color = useColorStore()

function fadeOnScreenIntersect(
  entries: any,
  observer: any
) {
  entries.forEach(
    (entry: any) => {
      // chaque élément de entries correspond à une variation
      // d'intersection pour un des éléments cible:
      // console.log("");
      // console.log("entry.boundingClientRect : %o", entry.boundingClientRect);
      // console.log("entry.intersectionRatio : %o", entry.intersectionRatio);
      // console.log("entry.intersectionRect : %o", entry.intersectionRect);
      // console.log("entry.isIntersecting : %o", entry.isIntersecting);
      // console.log("entry.rootBounds : %o", entry.rootBounds);
      // console.log("entry.target : %o", entry.target);
      // console.log("entry.time : %o", entry.time);
      if (entry.intersectionRatio > prevRatio) {
        entry.target.classList.remove(outsideScreenCls);
      } else {
        entry.target.classList.add(outsideScreenCls);
      }

      prevRatio = entry.intersectionRatio;
    }
  );
}

// # Script

var numSteps = 20.0;

var prevRatio = 0.0;
var outsideScreenCls = "outsideScreen";

var options = {
  // root: document.querySelector('#scrollArea'),
  // rootMargin: '0px',
  threshold: 1.0
}
var observer = new IntersectionObserver(fadeOnScreenIntersect, options);
var thisMessage = ref(null);

onMounted(
  () => {
    if(thisMessage.value) {
      observer.observe(thisMessage.value);
    }
  }
);
</script>

<template>
  <section
    class="message__wrapper"
    :class="cls"
    ref="thisMessage"
  >
    <article
      class="message"
      :style="[(cls.includes('userMsg') || cls.includes('QandA')) ? 'background-color: ' + color.color + ';' : '']"
      v-html="message"
    ></article>
  </section>
</template>

<style lang="scss">
.message {
  &__wrapper {
    transition: all 0.4s ease-in-out;
    padding: 12px 12px 12px 0px;
    margin-right: 24px;
    &.userMsg {
      align-self: flex-end;
      margin-left: 24px;
      margin-right: 0px;
    }

    &.QandA {
      .message {
        opacity: 0.75;
        cursor: pointer;
      }

      &:hover {
        @media (pointer: fine) {
          opacity: 1;
          .message {
            opacity: 0.95;
          }
        }
      }
    }

  }

  background-color: #404040;
  color: white;
  border-radius: 10px;
  padding: 10px 16px;

  min-width: 150px;
  max-width: 500px;

  ul {
    padding-left: 12px;
  }

  a {
    &, :visited {
      color: white;
    }
  }
}
</style>
