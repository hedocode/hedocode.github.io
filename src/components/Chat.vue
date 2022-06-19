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
            <a href="https://twitter.com/hedocode" target="_blank">Twitter</a>
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
        () => t("why.edocode_answer"),
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
                  <a href="https://associations.clermont-ferrand.fr/" target="_blank">Clermont Associations</a>
                </li>
                <li>
                  <a href="https://www.siman-france.com/" target="_blank">Siman France</a>
                </li>
                <li>
                  <a href="https://www.chocolats-bellanger.com/" target="_blank">Chocolats Bellanger</a>
                </li>
                <li>
                  <a href="https://demestre-photographie.fr" target="_blank">Demestre Photographie</a>
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
  
    function appearInChatAndNewQuestions() {
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
  
    function sendAnimation() {
      // const QACopy = {...QandA};
      // QACopy.status = "disappear";
  
      // QandAs.value.splice(QAIndex, 0, QandA);
      // QandA.status = "sending";
  
      // Adding the message to the chat
      chatMessages.push(
        new MessageObject(
          QandA.question,
          "userMsg"
        )
      );
      
      // Removing the clicked QA
      QandAs.value.splice(QAIndex, 1);
    }
    
  
    sendAnimation();
    canSendMessage.value = false;
    setTimeout(
      appearInChatAndNewQuestions, 2000
    );
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
      + * + * {
        opacity: 0.9;
      }

      + * {
        opacity: 0.6;
      }
      opacity: 0.3;
    }
  }

  margin-top: 24px;
  padding: 0px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

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
