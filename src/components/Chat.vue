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
  () => t("how_can_we.contact_you") + '&nbsp;✉️',
  () => `<ul>
    <li>
      <a href="mailto:contact@blanchardorian.fr">${t("by")} e-mail</a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/dorian-blanchard-hedocode/" target="_blank">${t("on")} LinkedIn</a>
    </li>
  </ul>`,
);

const websites_as_freelance =  new QA(
  () => t("which.websites_you_worked_on_as_a_freelance"),
  () => (
    `
    <ul>
      <li>
        <a href="https://discostar.game" target="_blank">Disco Star</a>
      </li>
      <li>
        <a href="https://sacercode.fr" target="_blank">Sacercode</a>
      </li>
      <li>
        <a href="https://www.jouvency.ch/" target="_blank">Jouvency</a>
      </li>
      <li>
        <a href="#">Ce site web !</a>
      </li>
    </ul>
    `
  )
);

const how_can_we_support_you = new QA(
  () => t("how_can_we.support_you"),
  () => `<div>
    ${t("how_can_we.support_you_answer_part1")}
    <br/>
    <ul>
      <li>
        <a href="https://x.com/hedocode" target="_blank">X</a>
      </li>
      <li>
        <a href="https://www.youtube.com/@hedocode" target="_blank">YouTube</a>
      </li>
      <li>
        <a href="https://www.instagram.com/hedocode/" target="_blank">Instagram</a>
      </li>
      <li>
        <a href="https://www.paypal.com/paypalme/hedocode" target="_blank">Paypal</a>
      </li>
      <li>
        BTC : bc1qgsxs7rwvspku935ddl83j97yrm8tsf33h5d98
      </li>
    </ul>
  </div>`,
  contactQA
);

const project = new QA(
  () => t("what_is_your.project"),
  () => (`
  <div>
    ${t("my.project")}
    <a href="https://github.com/Sacercode" target="_blank">Github</a>.
  </div>
  `),
  [websites_as_freelance, how_can_we_support_you]
);

const debussac_websites = new QA(
  () => t("which.websites_you_worked_on_at_debussac"),
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
          <a href="https://myurban.fr/" target="_blank">My Urban (Soccer)</a>
        </li>
      </ul>
    </div>`
  )
)

const where_did_you_work = new QA(
  () => t("where.did_you_work"),
  () => (
    `<div>
      <ul>
        <li>
          <a href="https://www.cgi.com/france/fr-fr" target="_blank">CGI</a> ${t("where.cgi_answer_part1")} <a href="https://www.michelin.fr/" target="_blank">Michelin</a>${t("where.cgi_answer_part2")}<a href="https://refactoring.guru/fr/design-patterns/composite" target="_blank">Composite</a>).
        </li>
        <li>
          <a href='https://soeman.fr/' target="_blank">Soeman</a>${t("where.soeman_description")}
        </li>
        <li>
          <a href="https://debussac.net" target="_blank">Debussac Multimedia</a>${t("where.debussac_description")}
        </li>
        <li>
          <a href="https://ascnd.fr/abgx/" target="_blank">ASNCD - ABGX</a>${t("where.ascnd_abgx_description")}
        </li>
        <li>
          <a href="https://sacercode.fr" target="_blank">Sacercode</a>${t("where.sacercode_description")}
        </li>
      </ul>
    </div>`
  ), [ debussac_websites ]
);

const technical_stack = new QA(
  () => t("what_is_your.technical_stack"),
  () => t("what_is_your.technical_stack_answer"),
);

const what_music_do_you_like = new QA(
  () => t("what_are_your.listened_music"),
  () => `
    <div>
      ${t("what_are_your.listened_music_answer")}
      <br/><br/>
      <a href="https://open.spotify.com/user/uk3w7lw2yy22qkq5n1x97oer1" target="_blank">${t("my.spotify_library")}</a>
    </div>
  `
)

const which_app_did_you_design = new QA(
  () => t("which.app_did_you_design"),
  () => `
    <ul>
      <li>
        <a href="https://www.figma.com/proto/lBSlScPrZUhnj8zOAzpD7R/Checkpoint?node-id=1-31&starting-point-node-id=1%3A630&scaling=contain&content-scaling=fixed" target="_blank">
          Checkpoint
        </a>
      </li>
      <li>
        <a href="https://www.figma.com/proto/QyOmwQWhFxtZGdsWPxnUIM/Demestre-Photographie?node-id=49-158&p=f&t=CYqyWcWRiYNyFjnL-0&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=49%3A158&show-proto-sidebar=1" target="_blank">
          Demestre Photographie
        </a>
      </li>
      <li>
        <a href="https://www.figma.com/proto/FYIVTHFl0Gadg0v5TbtEvT/A-la-d%C3%A9couverte-de-Ghibli--Copy-?node-id=1-2&t=3Lw77WqMluLMC1aX-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2" target="_blank">
          Ghibli App
        </a>
      </li>
      <li>
        <a href="https://www.figma.com/design/usRwZWb9rcIfWB9vTI4e39/Jouvency-V2" target="_blank">
          Jouvency
        </a>
    </ul>
  `
)

const other_skills = new QA(
  () => t("what_is_your.other_skills"),
  () => `
    <div>
      ${t("what_is_your.other_skills_answer__part1")}
      <br/><br/>
      ${t("what_is_your.other_skills_answer__part2")}
      <br/>
      ${t("what_is_your.other_skills_answer__part3")}
      <a href="https://music.apple.com/us/artist/arilox/1723070791" target="_blank">Apple Music</a>, 
      <a href="https://open.spotify.com/intl-fr/artist/3CgZJvLenXaHb7bwqu6HQa" target="_blank">Spotify</a>, 
      <a href="https://www.deezer.com/fr/artist/248364552" target="_blank">Deezer</a>
      <br/><br/>
      ${t("what_is_your.other_skills_answer__part4")}
    </div>
  `,
  [what_music_do_you_like, which_app_did_you_design]
);

const QandAs = ref([
  new QA(
    () => t("what_is_your.name"),
    "Dorian Blanchard",
    [
      new QA(
        () => t("what_is_your.studies"),
        () => t("what_is_your.studies_answer"),
        [project]
      ),
      new QA(
        () => t("why.edocode"),
        () => `<div>${t("why.edocode_answer_part1")}
                <br/><br/>
                ${t("why.edocode_answer_part2")} <a href="https://github.com/hedocode" target="_blank">${t("why.edocode_answer_part3")}</a> ${t("why.edocode_answer_part4")}
                ${t("why.edocode_answer_part5")} <a href='https://github.com/hedocode/MyMonoGames/releases' target="_blank">${t("why.edocode_answer_part6")}</a>
            </div>`,
        [
            new QA(
            () => t("what_is_your.work"),
            () => t("what_is_your.work_answer") + "&nbsp;🌐",
            [where_did_you_work, new QA(
              () => t("what_is_your.specialty"),
              () => t("what_is_your.specialty_answer") + "&nbsp;! 📱",
              [
                technical_stack,
                other_skills
              ]
            )],
          ),
        ]
      ),
    ]
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
    > * {
      transition: all 0.5s ease-in-out;
      transform-origin: top left;
    }
    
    &.userMsg {
      margin-top: 48px;
      > * {
        transform-origin: bottom right;
      }
    }

    &:has(+.outsideScreen) {
      opacity: 0.6;
      > * {
        transform: scale(0.8);
      }
    }
    &.outsideScreen {
      opacity: 0.3;
      + * + * {
        opacity: 0.9;
        > * {
          transform: scale(0.9);
        }
      }

      + * {
        opacity: 0.6;
        > * {
          transform: scale(0.8);
        }
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
    align-items: flex-end;
    
    overflow: auto;
    > * {
      margin: 0px 12px;
    }
  }
}
</style>
