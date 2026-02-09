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
            name: "Hello! What is your name?",
            project: "What are your projects?",
            specialty: "What is your expertise?",
            specialty_answer: "Managing the display and user interactions, especially making the website looks exactly like the wanted design, and that it is usable whatever the size of the screen",
            studies: "What did you study?",
            studies_answer: "Science in high School, then Computer Science, specialized in Web",
            other_skills: "What are your other skills?",
            other_skills_answer__part1: "Yes, a lot&nbsp;! About my work, I especially do website creation and maintenance. I also know how to code server-side information management and manage its secure access on the internet. 🌐🔒",
            other_skills_answer__part2: "I also do musics ! 🎶",
            other_skills_answer__part3: "You can find me under the name Arilox, on the platform of your choice: ",
            other_skills_answer__part4: "Finally, I also create logos, graphic charters, and user interface designs.",
            technical_stack: "And technically how would you build websites?",
            technical_stack_answer: "I use Mongo, Fastify, and React/Vue, so essentially HTML, (S)CSS, and JS(X)",
        },
        what_are_your: {
            listened_music: "What music do you listen to&nbsp;?",
            listened_music_answer: "I listen to music of all genres, but especially electronic music, pop-rock, and rap.",
        },
        which: {
            language_used: "Which languages did you use to realize this website?",
            websites_you_worked_on_at_debussac: "Do you have examples of websites you worked on the display when you worked at Debussac Multimedia&nbsp;?",
            websites_you_worked_on_as_a_freelance: "Do you have examples of websites you worked on as a freelance&nbsp;?",
            app_did_you_design: "Any applications you designed&nbsp;?",
        },
        where: {
            did_you_work: "In which companies did you work&nbsp;?",
            did_you_work_answer: "I worked at Debussac Multimedia, a digital communication agency, and at the Ecole Hexagone, a computer science school.",
            cgi_answer_part1: "two-year university degree final internship as a mission for",
            cgi_answer_part2: " (software architecture design for complex data hierarchies, using the design pattern named ",
            soeman_description: ", a French customer relationship manager for small and medium-sized enterprises.",
            debussac_description: " a web agency specializing in custom showcase and e-commerce sites.",
            ascnd_abgx_description: " a radiation protection management software for professionals exposed to radioactive sources.",
            sacercode_description: " my IT development company.",
        },
        how_can_we: {
            contact_you: "How can we contact you?",
            support_you: "How can we support you?",
            support_you_answer_part1: "Feel free to subscribe to my social networks, I would also really appreciate financial support :",
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
            project: "For now I am a Freelance Developer, but I plan to market a web application for making websites, called EditIDE. It will be composed of several tools, some of which have their source code available on ",
            spotify_library: "My Spotify music library",
        },
        slogan_part1: "CEO & Freelance",
        slogan_part2: "Creative Web Developer",
        home: {
            welcome: "Welcome to my developer portfolio!",
            explore: "Discover who I am and what I do by clicking the below sections.",
            chat_title: "Chat",
            chat_description: "Chat with my interactive text responder directly via the chat.",
            contact_title: "Contact",
            contact_description: "Call me directly for your projects",
            music_title: "Music",
            music_description: "Discover my musical creations on Spotify",
            professional_title: "Professional",
            professional_description: "Check out my LinkedIn profile"
        },
    },
    fr: {
        contact: 'Comment peut on te contacter',
        welcome_message: "Salut ! Si vous avez la moindre question, n'hésitez pas ! :)",
        fr: "Francais",
        en: "Anglais",
        what_is_your: {
            work: "En quoi consiste ton travail&nbsp;?",
            work_answer: "Faire des sites ou des applis sur internet&nbsp;!",
            name: "Bonjour ! Comment t'appelles-tu&nbsp;?",
            project: "Quels sont tes projets&nbsp;?",
            specialty: "Quelle est ta spécialité&nbsp;?",
            specialty_answer: "L'affichage, et gérer les intéractions de l'utilisateur, notamment faire en sorte que le site ressemble exactement au design voulu, et qu'il soit utilisable qu'elle que soit la taille de l'écran",
            studies: "Quelles études as-tu faites&nbsp;?",
            studies_answer: "J'ai fait un Bac S, puis un DUT Informatique ainsi qu'une Licence Pro Web à l'Université Clermont Auvergne, et enfin un Mastère en Architecture des Systèmes d'Information à l'Ecole Hexagone.",
            other_skills: "Tu sais faire autre chose&nbsp;?",
            other_skills_answer__part1: "Oui plein&nbsp;! Au niveau professionnel, je fais surtout de la création et de la maintenance de sites internet. Je sais donc également coder la gestion de l'information côté serveur, et gérer son accès de manière sécurisée sur internet.&nbsp;🌐🔒",
            other_skills_answer__part2: "Je fais également de la musique ! 🎶",
            other_skills_answer__part3: "Vous me retrouverez sous le nom d'Arilox, sur la plateforme de votre choix : ",
            other_skills_answer__part4: "Pour finir, je fais aussi de la créations de logo, des chartes graphiques et du design d'interfaces.",
            technical_stack: "Techniquement quels sont les outils que tu utilises&nbsp;?",
            technical_stack_answer: "En général j'utilise beaucoup Javascript et JSON avec des bases de données Mongo. Côté serveur je maitrise aussi bien Node avec Fastify que PHP/MySQL avec Wordpress ou Symfony. Côté client mon expertise est en React, mais je maitrise également Vue et Angular. Enfin, j'entretiens surtout les bases, que ce soit HTML, (S)CSS, JS(X), les protocoles HTTP et autres standards du web.",
        },
        what_are_your: {
            listened_music: "Quelles musiques écoutes-tu&nbsp;?",
            listened_music_answer: "J'écoute de la musique de tout genre, mais surtout de la musique électronique, de la pop-rock, et du rap.",
        },
        how_can_we: {
            contact_you: "Comment te contacter&nbsp;?",
            support_you: "Comment te soutenir&nbsp;?",
            support_you_answer_part1: "Abonne toi à mes réseaux sociaux et active les notifications, sinon tu peut également m'aider financièrement :",
        },
        which: {
            language_used: "Quels languages as-tu utilisé pour réaliser ce site&nbsp;?",
            websites_you_worked_on_at_debussac: "Aurais-tu des exemples de sites sur lesquels tu as pu coder l'affichage quand tu travaillais à Debussac Multimedia&nbsp;?",
            websites_you_worked_on_as_a_freelance: "Sur quels projets as-tu travaillé en tant que freelance&nbsp;?",
            app_did_you_design: "Quelles applications as-tu pu designer&nbsp;?",
        },
        where: {
            did_you_work: "Dans quelles entreprises as-tu travaillé&nbsp;?",
            did_you_work_answer: "J'ai travaillé à Debussac Multimedia, une agence de communication digitale, et à l'Ecole Hexagone, une école d'informatique.",
            cgi_answer_part1: "stage de fin d'études de deux ans en tant que mission pour",
            cgi_answer_part2: " (conception d'architecture logicielle pour des hiérarchies de données complexes, en utilisant le design pattern nommé Composite)",
            soeman_description: ", un gestionnaire de relations clients français à destination des petites et moyennes entreprises.",
            debussac_description: " agence web réalisant des sites vitrine et e-commerce sur mesure.",
            ascnd_abgx_description: " un logiciel de gestion de la radioprotection pour les professionnels exposés à des sources radioactives.",
            sacercode_description: " ma société de développement informatique.",
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
            edocode_answer_part5: `Vous pouvez d'ailleurs y retrouver ma compilation de petits jeux / simulation (pour Windows) :`,
            edocode_answer_part6: `Télécharger depuis Github`,
        },
        ofc_list: "Bien sûr&nbsp;! Voici une petite liste : ",
        language_managed: "les différantes langues sont gérées",
        my: {
            project: "Pour l'instant je suis développeur Freelance, mais j'ai pour projet de commercialiser un application web pour faire des sites webs, nommé EditIDE. Il sera composé de plusieurs outils, certains ont leur code source de disponible sur ",
            spotify_library: "Ma bibliothèque musicale Spotify",
        },
        slogan_part1: "Fondateur & Freelance",
        slogan_part2: "Développeur Web Créatif",
        home: {
            welcome: "Bienvenue sur mon portfolio développeur !",
            explore: "Découvrez qui je suis et mon activité en cliquant sur une des sections ci-dessous.",
            chat_title: "Chat",
            chat_description: "Discutez avec mon répondeur textuel interactif directement via le chat.",
            contact_title: "Contact",
            contact_description: "Appelez-moi directement pour vos projets",
            music_title: "Musique",
            music_description: "Découvrez mes créations musicales sur Spotify",
            professional_title: "Professionnel",
            professional_description: "Consultez mon profil LinkedIn"
        },
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
