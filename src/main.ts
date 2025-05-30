import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from "./App.vue"
import router from './router'
import { createI18n } from "vue-i18n";

// 1. Ready translated locale messages
// The structure of the locale message is the hierarchical object structure with each locale as the top property
const messages = {
    en: {
        contact: 'How can we contact you?',
        welcome_message: "Hello! If you have any question, do not hesitate! :)",
        en: "English",
        fr: "French",
        what_is_your: {
            work: "What is your work about?",
            work_answer: "Making websites or webapps on the internet!",
            name: "What is your name?",
            project: "What are your projects?",
            specialty: "What is your specialty?",
            specialty_answer: "Managing the display and user interactions, especially making the website looks exactly like the wanted design, and that it is usable whatever the size of the screen",
            studies: "What did you study?",
            studies_answer: "Science in high School, then Computer Science, specialized in Web",
            other_skills: "What are your other skills?",
            other_skills_answer: "I also do logo creation, graphical charter and user interface design.",
            technical_stack: "And technically how would you build websites?",
            technical_stack_answer: "I use Mongo, Fastify, and React/Vue, so essentially HTML, (S)CSS, et JS(X)",
        },
        which: {
            language_used: "Which languages did you use to realize this website?",
            websites_you_worked_on: "Do you have examples of websites you worked on the display?",
        },
        how_can_we: {
            contact_you: "How can we contact you?",
            support_you: "How can we support you?",
            support_you_answer: "Feel free to subscribe to my social networks, I would also really appreciate financial support :",
        },
        by: "By",
        on: "On",
        with: "with",
        and: "and",
        why: {
            edocode: 'Why "edocode" then?',
            edocode_answer_part1: `That's a nickname meaning "he do code" that I use for my dev activities 👨‍💻`,
            edocode_answer_part2: `As in`,
            edocode_answer_part3: `my Github`,
            edocode_answer_part4: `where I store my software developer projects which also often are palindromes!`,
            edocode_answer_part5: `By the way, you can find my little games / simulations compilations there (for Windows):`,
            edocode_answer_part6: `Download from GitHub`,
        },
        ofc_list: "Of course! Here is a little list: ",
        language_managed: "the different languages are managed",
        my: {
            project: "I plan to do a website to make websites named EditIDE."
        },
        slogan_part1: "Developer by training,",
        slogan_part2: "Designer of passion(s)",
    },
    fr: {
        contact: 'Comment peut on te contacter',
        welcome_message: "Salut ! Si vous avez la moindre question, n'hésitez pas ! :)",
        fr: "Francais",
        en: "Anglais",
        what_is_your: {
            work: "En quoi consiste ton travail&nbsp;?",
            work_answer: "Faire des sites ou des applis sur internet&nbsp;!",
            name: "Comment t'appelles-tu ?",
            project: "Quels sont tes projets&nbsp;?",
            specialty: "Quelle est ta spécialité&nbsp;?",
            specialty_answer: "L'affichage, et gérer les intéractions de l'utilisateur, notamment faire en sorte que le site ressemble exactement au design voulu, et qu'il soit utilisable qu'elle que soit la taille de l'écran",
            studies: "Quelles études as-tu faites&nbsp;?",
            studies_answer: "J'ai fait un Bac S, puis un DUT Informatique ainsi qu'une Licence Pro Web à l'Université Clermont Auvergne, et enfin un Mastère en Architecture des Systèmes d'Information à l'Ecole Hexagone.",
            other_skills: "Tu sais faire autre chose&nbsp;?",
            other_skills_answer: "Je fais également de la créations de logo, charte graphique et design d'interfaces graphiques, comme j'ai pu le faire avec Demestre Photographie",
            technical_stack: "Et niveau technique, comment réaliserai tu un site internet&nbsp;?",
            technical_stack_answer: "J'utiliserai Mongo, Node&Fastify, et React/Vue, donc essentiellement HTML, (S)CSS, JS(X)",
        },
        how_can_we: {
            contact_you: "Comment te contacter&nbsp;?",
            support_you: "Comment te soutenir&nbsp;?",
            support_you_answer: "Abonne toi à mes réseaux sociaux et active les notifications, sinon tu peut également m'aider financierement :",
        },
        which: {
            language_used: "Quels languages as-tu utilisé pour réaliser ce site&nbsp;?",
            websites_you_worked_on: "Aurais-tu des exemples de sites sur lesquels tu as pu coder l'affichage&nbsp;?",
        },
        by: "Par",
        on: "Sur",
        with: "avec",
        and: "et",
        why: {
            edocode: 'Pourquoi "edocode" alors&nbsp;?',
            edocode_answer_part1: `C'est un pseudonyme signifiant "il fait du code" que j'utilise pour mes activités autour du développement 👨‍💻`,
            edocode_answer_part2: `Comme`,
            edocode_answer_part3: `sur mon Github`,
            edocode_answer_part4: `où je stocke mes projets info qui sont souvent des palindromes&nbsp;!`,
            edocode_answer_part5: `Vous pouvez d'ailleurs y retrouver, ma compilation de petits jeux / simulation (pour Windows) :`,
            edocode_answer_part6: `Télécharger depuis Github`,
        },
        ofc_list: "Bien sûr&nbsp;! Voici une petite liste : ",
        language_managed: "les différantes langues sont gérées",
        my: {
            project: "J'ai pour projet de concevoir un site web pour faire des sites webs nommé EditIDE."
        },
        slogan_part1: "Développeur de formation,",
        slogan_part2: "Designer de passion(s)",
    }
}
  
// 2. Create i18n instance with options
const i18n = createI18n({
    legacy: false,
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
