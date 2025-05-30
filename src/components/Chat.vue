<!-- # Chat -->
<script setup lang="ts">
import { onUpdated, reactive, ref } from "vue";
import Message from "./Message.vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n() // use as global scope


// ## Model
class QA {
  question: string | Function;
  answer: string | Function;
  next?: QA | QA[];
  status?: string;

  constructor(question: string | Function, answer: string | Function, next?: QA | QA[], status?: string) {
    this.question = question;
    this.answer = answer;
    this.next = next;
    this.status = status || "";
  }
}

class MessageObject {
  message: string | Function;
  cls: string;

  constructor(message: string | Function, cls?: string ) {
    this.message = message;
    this.cls = cls || "";
  }
}

// ## Hooks
onUpdated(
  () => {
    const docEl = document.documentElement;
    docEl.scrollTop = docEl.scrollHeight;
  }
);


// ## Data
const contactQA =  new QA(
  () => t("how_can_we.contact_you") + ' ✉️',
  () => `<ul>
    <li>
      <a href="mailto:blanchardorian@gmail.com">${t("by")} e-mail</a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/dorian-blanchard-81528114b/" target="_blank">${t("on")} Linked In</a>
    </li>
  </ul>`,
);

const project = new QA(
  () => t("what_is_your.project"),
  () => t("my.project"),
  new QA(
    () => t("how_can_we.support_you"),
    () => t("how_can_we.support_you_answer") + `
      <ul>
        <li>
            <a href="https://twitter.com/edocode" target="_blank">Twitter</a>
        </li>
        <li>
            <a href="https://instagram.com/hedocode" target="_blank">Instagram</a>
        </li>
        <li>
            <a href="https://youtube.com/channel/UCMa89TFHWeSMLVlvhkvSUqg" target="_blank">YouTube</a>
        </li>
        <li>
            <a href="https://paypal.me/Arilox" target="_blank">Paypal</a>
        </li>
        <li>
            BTC : bc1q gsxs 7rwv spku 935dd l83j 97yr m8ts f33h 5d98g
        </li>
    </ul>
    `
  )
);

const QandAs = ref([
  new QA(
    () => t("what_is_your.name"),
    "Dorian Blanchard",
    [
      new QA(
        () => t("what_is_your.studies"),
        () => t("what_is_your.studies_answer"),
        project
      ),
      new QA(
        () => t("why.edocode"),
        () => `<div>${t("why.edocode_answer_part1")}
                <br/><br/>
                ${t("why.edocode_answer_part2")} <a href="https://github.com/hedocode" target="_blank">${t("why.edocode_answer_part3")}</a> ${t("why.edocode_answer_part4")}
                <br/><br/>
                ${t("why.edocode_answer_part5")} <a href='https://github.com/hedocode/MyMonoGames/releases/download/v0.0.0/win-x64.zip'>${t("why.edocode_answer_part6")}</a>
            </div>`,
        contactQA
      ),
    ]
  ),
  new QA(
    () => t("what_is_your.work"),
    () => t("what_is_your.work_answer") + " 🌐",
    new QA(
      () => t("what_is_your.specialty"),
      () => t("what_is_your.specialty_answer") + " ! 📱",
      [
        new QA(
          () => t("which.language_used"),
          () => `<a href='https://vuejs.org' target='_blank'>VueJS3</a> ${t("with")} <a href='https://www.typescriptlang.org/' target='__blank'>Typescript</a> ${t("and")} <a href='https://sass-lang.com/'>SASS</a>, ${t("language_managed")} ${t("with")} <a href='https://kazupon.github.io/vue-i18n' target='_blank'>vue-i18n</a>`
        ),
        new QA(
          () => t("which.websites_you_worked_on"),
          () => (
            `<div>
              ${t("ofc_list")}
              <ul>
                <li>
                  <a href='https://www.volvic-vvx.com/' target="_blank">Volvic VVX</a>
                </li>
                <li>
                  <a href="https://www.chocolats-bellanger.com/" target="_blank">Chocolats Bellanger</a>
                </li>
                <li>
                  <a href="https://www.columbuscafe.com/la-carte/" target="_blank">Columbus café</a>
                </li>
                <li>
                  <a href="https://myurban.fr/" target="_blank">My Urban (Soccer)</a>
                </li>
                
              </ul>
            </div>`
          ),
          new QA(
            () => t("what_is_your.other_skills"),
            () => t("what_is_your.other_skills_answer"),
            new QA(
              () => t("what_is_your.technical_stack"),
              () => t("what_is_your.technical_stack_answer"),
            )
          ),
        ),
      ]
    ),
  ),
]);

const chat = ref(null);
const chatMessages = reactive([
  new MessageObject(
    () => t("welcome_message"),
  ),
]);
let canSendMessage = ref(true);

// ## Functions
function ask(QandA: QA) {
  if(canSendMessage.value) {
    const nextQandA = QandA.next;
    const match = (x: QA) => x == QandA;
  
    const QAIndex = QandAs.value.findIndex(match);
  
    const appearInChatAndNewQuestions = () => {
      // Appear in Chat
      chatMessages.push(
        new MessageObject(
          QandA.answer,
        )
      );
  
      // New Question
      if (nextQandA) {
        const nextQandAisArray = nextQandA instanceof Array && nextQandA.length;
        const nextQandAisObject = nextQandA instanceof QA;
        if(nextQandAisObject) {
          QandAs.value.splice(QAIndex, 0, nextQandA);
        } else if(nextQandAisArray){
          nextQandA.forEach(
            element => {
              QandAs.value.splice(QAIndex, 0, element);
            }
          );
        }
      }
      canSendMessage.value = true;
    }
    const sendAnimation = () => {
      // Adding the user message to the chat
      chatMessages.push(
        new MessageObject(
          QandA.question,
          "userMsg"
        )
      );
      
      // Removing the clicked QA
      QandAs.value.splice(QAIndex, 1);

      // Add typing indicator with animation
      const typingMessage = new MessageObject(
        "",
        "typing"
      );
      chatMessages.push(typingMessage);

      // Remove typing indicator after a short delay and show the actual response
      setTimeout(() => {
        // Remove typing indicator
        const typingIndex = chatMessages.findIndex(msg => msg.cls === "typing");
        if (typingIndex !== -1) {
          chatMessages.splice(typingIndex, 1);
        }
        
        // Add the actual response
        appearInChatAndNewQuestions();
      }, 1500);
    }
    
    sendAnimation();
    canSendMessage.value = false;
  }
}
</script>

<template>
  <section class="chat__wrapper">
    <section class="chat" ref="chat">
      <Message
        v-for="chatMessage in chatMessages"
        :message="typeof chatMessage.message == 'function' ? chatMessage.message() : chatMessage.message"
        :cls="chatMessage.cls"
      />
    </section>
    <section class="availableQuestions">
      <section class="availableQuestions__wrapper">
        <Message
          v-for="QandA in QandAs"
          :message="typeof QandA.question == 'function' ? QandA.question() : QandA.question"
          :cls="'QandA ' + QandA.status"
          v-on:click="ask(QandA)"
        />
      </section>
    </section>
  </section>
</template>

<style scoped lang="scss">
.chat {  
  margin-top: 24px;
  padding: 0px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    > * {
      width: 100%;
      max-width: 1200px;
    }
  }

  .message__wrapper {
    &.outsideScreen {
      opacity: 0.3;
      + * + * {
        opacity: 0.9;
      }

      + * {
        opacity: 0.6;
      }
    }
  }

  .answer {
    align-self: flex-end;
  }
}


.availableQuestions {
  position: sticky;
  bottom: 0px;

  display: flex;
  justify-content: flex-end;
  width: 100%;
  overflow: auto;
  &__wrapper {
    padding: 12px 0px ;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    
    overflow: auto;
    > * {
      margin: 0px 12px;
    }
  }
}
</style>
