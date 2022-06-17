import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from "./App.vue"
import router from './router'
import { createI18n } from "vue-i18n";

// 1. Ready translated locale messages
// The structure of the locale message is the hierarchical object structure with each locale as the top property
const messages = {
    en: {
        contact: 'How can we contact you ?',
        welcome_message: "Hello ! If you have any question, do not hesitate ! :)",
        en: "English",
        fr: "French",
        what_is_your: {
            work: "What is your work about ?",
            work_answer: "Making websites or webapps on the internet !",
            name: "What is your name ?",
            project: "What are your projects ?",
            specialty: "What is your specialty ?",
            specialty_answer: "Managing the display and user interactions, especially making the website looks exactly like the wanted design, and that it is usable whatever the size of the screen",
            studies: "What did you study ?",
            studies_answer: "Science in high School, then Computer Science, specialized in Web",
            other_skills: "What are your other skills ?",
            other_skills_answer: "I also do logo creation, graphical charter and user interface design, as on my work with Demestre Photographie",
            technical_stack: "And technically how would you build websites ?",
            technical_stack_answer: "I use Mongo, Fastify, and React/Vue, so essentially HTML, (S)CSS, et JS(X)",
        },
        which: {
            language_used: "Which languages did you use to realize this website ?",
            websites_you_worked_on: "Do you have examples of websites you worked on the display ?",
        },
        how_can_we: {
            contact_you: "How can we contact you ?",
            support_you: "How can we support you ?",
            support_you_answer: "Feel free to subscribe to my social networks, I would also really appreciate financial support :",
        },
        by: "By",
        on: "On",
        with: "with",
        and: "and",
        why: {
            edocode: 'Why "edocode" then ?',
            edocode_answer: `<div>That's a nickname meaning "he do code" that I use for my dev activities 👨‍💻
                <br/><br/>
                As in <a href="https://github.com/hedocode" target="_blank">my Github</a> where I store my software developer projects which also often are palindromes !
                <br/><br/>
                By the way, you can find my little games / simulations compilations there (for Windows) : <a href='https://github.com/hedocode/MyMonoGames/releases/download/v0.0.0/win-x64.zip'>Download from GitHub</a>
            </div>`,
        },
        ofc_list: "Of course ! Here is a little list : ",
        language_managed: "the different languages are managed",
        my: {
            project: "I plan to do a website to make websites (IDE/CMS), named EditIDE"
        },
        slogan: "<div>Developer by training,<br/>Designer of passion(s)</div>",
    },
    fr: {
        contact: 'Comment peut on te contacter',
        welcome_message: "Salut ! Si vous avez la moindre question, n'hésitez pas ! :)",
        fr: "Francais",
        en: "Anglais",
        what_is_your: {
            work: "En quoi consiste ton travail ?",
            work_answer: "Faire des sites ou des applis sur internet !",
            name: "Comment t'appelles-tu ?",
            project: "Quels sont tes projets ?",
            specialty: "Quelle est ta spécialité ?",
            specialty_answer: "L'affichage, et gérer les intéractions de l'utilisateur, notamment faire en sorte que le site ressemble exactement au design voulu, et qu'il soit utilisable qu'elle que soit la taille de l'écran",
            studies: "Quelles études as-tu faites ?",
            studies_answer: "Bac S, puis DUT Informatique et Licence Pro Web",
            other_skills: "Tu sais faire autre chose ?",
            other_skills_answer: "Je fais également de la créations de logo, charte graphique et design d'interfaces graphiques, comme j'ai pu le faire avec Demestre Photographie",
            technical_stack: "Et niveau technique, comment réaliserai tu un site internet ?",
            technical_stack_answer: "J'utiliserai Mongo, Node&Fastify, et React/Vue, donc essentiellement HTML, (S)CSS, JS(X)",
        },
        how_can_we: {
            contact_you: "Comment peut-on te contacter ?",
            support_you: "Comment peut-on te soutenir ?",
            support_you_answer: "Abonne toi à mes réseaux sociaux et active les notifications, sinon tu peut également m'aider financierement :",
        },
        which: {
            language_used: "Quels languages as-tu utilisé pour réaliser ce site ?",
            websites_you_worked_on: "Aurais-tu des exemples de sites sur lesquels tu as pu coder l'affichage ?",
        },
        by: "Par",
        on: "Sur",
        with: "avec",
        and: "et",
        why: {
            edocode: 'Pourquoi "edocode" alors ?',
            edocode_answer: `<div>C'est un pseudonyme signifiant "il fait du code" que j'utilise pour mes activités autour du développement 👨‍💻
                <br/><br/>
                Comme <a href="https://github.com/hedocode" target="_blank">sur mon Github</a> où je stocke mes projets info qui sont souvent des palindromes !
                <br/><br/>
                Vous pouvez d'ailleurs y retrouver, ma compilation de petits jeux / simulation (pour Windows) : <a href='https://github.com/hedocode/MyMonoGames/releases/download/v0.0.0/win-x64.zip'>Télécharger depuis Github</a>
            </div>`,
        },
        ofc_list: "Bien sûr ! Voici une petite liste : ",
        language_managed: "les différantes langues sont gérées",
        my: {
            project: "J'ai pour projet de concevoir un site web pour faire des sites webs (IDE/CMS), nommé EditIDE"
        },
        slogan: "<div>Développeur de formation,<br/>Designer de passion(s)</div>",
    }
}
  
// 2. Create i18n instance with options
const i18n = createI18n({
    locale: 'fr', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
    allowComposition: true,
    // If you need to specify other options, you can set other options
    // ...
})

// 3. Create App
const app = createApp(App)

app.use(createPinia())
app.use(router)
  
  
// 4. Install i18n instance to make the whole app i18n-aware
app.use(i18n)

app.mount('#app')
