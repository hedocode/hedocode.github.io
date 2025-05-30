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
    >
      <div v-if="cls.includes('typing')" class="typing-animation">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
      <div v-else v-html="message"></div>
    </article>
  </section>
</template>

<style lang="scss">
.message {
  background-color: #404040;
  color: white;
  border-radius: 10px;
  padding: 10px 16px;

  min-width: 150px;
  max-width: 500px;

  &__wrapper {
    transition: all 0.4s ease-in-out;
    padding: 12px 12px 12px 0px;
    margin-right: 24px;
    &.userMsg {
      align-self: flex-end;
      margin-left: 24px;
      margin-right: 0px;
    }    
    &.typing {
      .message {
        background-color: #565656;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
      }
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

  ul {
    padding-left: 12px;
  }

  a {
    &, :visited {
      color: white;
    }
  }
}

.typing-animation {
  display: flex;
  align-items: center;
  gap: 4px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  transform-origin: center;
  animation: typingBounce 1.4s infinite ease-in-out;
  
  &:nth-child(1) {
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
}

@keyframes typingBounce {
  0%, 80%, 100% {
    transform: scale(0.8) translateY(5px);
    opacity: 0.7;
  }
  40% {
    transform: scale(1.2) translateY(-5px);
    opacity: 1;
  }
}
</style>