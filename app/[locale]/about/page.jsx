import Link from "next/link";
import { Placeholder, Button } from "../../components/ui";

export const metadata = {
  title: "О нас — Dombyra.kz",
  description:
    "История проекта, философия и мастерская Dombyra.kz — качественные домбры ручной работы и уникальный тренажёр для обучения игре.",
};

// ============================================================
// ВЁРСТКА (цвета, отступы, номера) — общая для всех языков.
// ============================================================

const STYLE_PHILOSOPHY = [
  { numBg: "bg-white text-brand-ink", tagBg: "bg-brand-blue", tagText: "text-white" },
  { numBg: "bg-white text-brand-ink", tagBg: "bg-brand-teal", tagText: "text-white" },
  { numBg: "bg-white text-brand-ink", tagBg: "bg-brand-blue", tagText: "text-white" },
  { numBg: "bg-brand-lime text-brand-ink", tagBg: "bg-brand-lime", tagText: "text-brand-ink" },
  { numBg: "bg-brand-ink text-brand-lime", tagBg: "bg-brand-ink", tagText: "text-brand-lime" },
  { numBg: "bg-brand-lime text-brand-ink", tagBg: "bg-brand-teal", tagText: "text-white" },
];

const STYLE_HISTORY = [
  { tagBg: "bg-brand-blue", tagText: "text-white", card: "border border-brand-border bg-white", body: "text-brand-ink/72", ml: "" },
  { tagBg: "bg-brand-teal", tagText: "text-white", card: "border border-brand-border bg-brand-bg", body: "text-brand-ink/72", ml: "ml-6 lg:ml-14" },
  { tagBg: "bg-brand-blue", tagText: "text-white", card: "border border-brand-border bg-white", body: "text-brand-ink/72", ml: "ml-4 lg:ml-10" },
  { tagBg: "bg-brand-lime", tagText: "text-brand-ink", card: "bg-brand-ink", body: "text-white/80", ml: "ml-3 lg:ml-6" },
];

const STYLE_ACCESS = [
  { style: "border border-brand-border bg-brand-bg", priceSize: "text-[20px]" },
  { style: "bg-brand-lime shadow-lg", priceSize: "text-[24px]" },
  { style: "border border-brand-border bg-brand-bg", priceSize: "text-[24px]" },
];

// Фото-заглушки — рабочие пометки для загрузки реальных фото,
// на сайте не показываются как текст, поэтому не переводятся.
const PHILOSOPHY_PHOTOS = [
  "фото — урок дома",
  "фото — взрослый ученик",
  "фото — одна струна",
  "фото — домбра в интерьере",
  "фото — качественная домбра крупным планом",
  "фото — домбра как символ, национальный орнамент",
];

// Бегущая строка — казахский слоган, оставлен одинаковым на всех языках.
const MARQUEE_TEXT = "НАҒЫЗ ҚАЗАҚ — ҚАЗАҚ ЕМЕС, НАҒЫЗ ҚАЗАҚ — ДОМБЫРА!";

// ============================================================
// ТЕКСТ — переведён на 4 языка. Структура ключей одинаковая
// во всех блоках. Если что-то не устраивает по формулировке —
// правьте прямо здесь, вёрстку трогать не нужно.
// ============================================================

const CONTENT = {
  ru: {
    hero: {
      eyebrow: "О ПРОЕКТЕ",
      titleLine1: "Домбра — это",
      titleItalic: "не только",
      titleLine3: "для профессионалов",
      subtitle:
        "Мы делаем так, чтобы играть на домбре мог каждый — от первой ноты на одной струне до сложных кюев.",
      avatarLine1: "Айым и мастера",
      avatarLine2: "мастерской dombyra.kz",
      photoBadge: "С 2009 ГОДА С ДОМБРОЙ В РУКАХ",
      stat: ["Обучаем.", "Создаём.", "Популяризируем."],
    },
    address: {
      quote:
        "Рада, что вы интересуетесь домброй. У нас вы можете приобрести качественную домбру, настроить её и даже научиться играть на ней — в нашем уникальном тренажёре и караоке.",
      name: "Айым Ернст",
      role: "Основательница dombyra.kz",
    },
    philosophyEyebrow: "НАША ФИЛОСОФИЯ",
    philosophyTitleMain: "Домбра — не экзамен и не сцена.",
    philosophyTitleItalic: " Это способ побыть с собой.",
    philosophy: [
      { title: "Не нужно быть музыкантом", text: "Играть можно просто для себя, для души — без цели выступать.", tag: "Хобби" },
      { title: "Начать никогда не поздно", text: "Важна дисциплина и регулярная практика, а не возраст.", tag: "Любой возраст" },
      { title: "От одной струны до кюев", text: "В тренажёре можно начать даже с одной струны.", tag: "Простота" },
      { title: "Домбра украшает дом", text: "Наполняет пространство светлой энергетикой — как картина.", tag: "Эстетика" },
      { title: "Купить один раз и на всю жизнь", text: "Мы не клепаем дешёвые домбры. Лучше немного доплатить за качественную, профессиональную — играть с удовольствием и передать потомкам.", tag: "Навсегда" },
      { title: "Make Dombyra Great Again", text: "Домбра — один из центральных символов казахской идентичности. Носитель культурного капитала всегда будет положительно выделяться в обществе. Это то, какими нас запомнят наши дети.", tag: "Идентичность" },
    ],
    historyEyebrow: "С 2015 ГОДА",
    historyTitleMain: "Как всё",
    historyTitleItalic: "начиналось",
    history: [
      { tag: "3 КЛАСС", content: "В 3 классе папа принёс Айым домбру и научил играть песню «Дударай». Кстати, многих интересует, почему фамилия Эрнст — так звали её папу. Увидев способности и интерес дочери, родители отдали её в школьный Дом детского творчества." },
      { tag: "ПЕРВАЯ УЧЕНИЦА", content: "Через два года Айым доверили её первую ученицу — талантливую глухонемую девочку. Этот опыт научил объяснять домбру не только словами, но руками, ритмом, показом." },
      { tag: "УНИВЕРСИТЕТ · 2015", content: "Во время учёбы в университете Айым продолжала подрабатывать репетитором — ученики жили в разных концах Алматы, и каждый урок означал дорогу через весь город. Так родилась идея записывать занятия на видео и отправлять ученикам. В 2015 году был качественно отснят базовый курс для YouTube — он стал первым таким курсом домбры в интернете." },
      { tag: "15+ ЛЕТ", content: "С YouTube-канала проект вырос до мастерской и IT-продукта. За более чем 15 лет у Айым было множество учеников — самых разных возрастов, национальностей и профессий." },
    ],
    studentsEyebrow: "УЧЕНИКИ",
    studentsTitleMain: "Мастер-классы",
    studentsTitleItalic: "на трёх языках",
    studentsText: "Мы проводим мастер-классы по домбре на казахском, русском и английском языках. Среди гостей часто бывают иностранцы — многие впервые держат домбру в руках, узнают краткую историю инструмента и интересные факты. Среди наших гостей были и дипломаты с семьями.",
    workshopEyebrow: "МАСТЕРСКАЯ",
    workshopTitleMain: "Курс перерос",
    workshopTitleItalic: "в мастерскую",
    workshopStatBadge: ["работает наш", "топ-мастер"],
    workshopStatValue: "С 1998",
    workshopIntro: "Вокруг образовательного проекта объединились самые опытные мастера домбры Казахстана. У каждого — минимум 10 лет практики, и мы используем только качественные материалы.",
    statLabel1: "опыт мастера",
    statLabel2: "материалы",
    statLabel3: "и зарубежье",
    workshopGeoText: "Наши домбры покупают со всей территории Казахстана и из-за рубежа.",
    galleryLabel: "Из мастерской",
    catalogButton: "Смотреть каталог домбр",
    todayEyebrow: "СЕГОДНЯ",
    todayBadgeYear: "2017",
    todayBadgeLabel: "в IT",
    todayTitleMain: "Домбра",
    todayTitleItalic: "и продакт-менеджмент",
    todayText: "С 2017 года Айым работает в IT, преподаёт продакт-менеджмент студентам — и всё это время параллельно развивала dombyra.kz. Тренажёр стал логичным результатом этого пути.",
    todayMission: "Мы следуем нашей миссии обучения и популяризации — поэтому создали доступный онлайн-тренажёр для обучения игре на домбре.",
    accessBannerMain: "Доступно на dombyra.kz",
    accessBannerSuffix: " — нажмите, чтобы начать заниматься",
    accessTitleMain: "Доступ",
    accessTitleItalic: "к тренажёру",
    tunerLine: "Тюнер — бесплатно всегда, для всех, без исключений",
    access: [
      { title: "Обучение и караоке", price: "Часть бесплатно, часть от 3 500 ₸/мес", desc: "Часть мелодий открыта всем и всегда. Остальные — по подписке." },
      { title: "При покупке домбры", price: "Бесплатно", desc: "Полный доступ ко всем мелодиям и режимам навсегда." },
      { title: "Инвалидам и малообеспеченным семьям", price: "Бесплатно", desc: "Полный доступ. Напишите нам, чтобы оформить." },
    ],
    trainerButton: "Открыть тренажёр",
    footerQuoteLine1: "«Домбра украшает дом",
    footerQuoteLine2: "так же, как музыка — жизнь»",
    footerCaption: "Dombyra.kz — с 2015 года",
  },

  kz: {
    hero: {
      eyebrow: "ЖОБА ТУРАЛЫ",
      titleLine1: "Домбыра —",
      titleItalic: "тек қана",
      titleLine3: "кәсіпқойларға арналмаған",
      subtitle:
        "Біз домбырада әркім ойнай алатындай етіп жасаймыз — бір ішектегі алғашқы дыбыстан күрделі күйлерге дейін.",
      avatarLine1: "Айым және dombyra.kz",
      avatarLine2: "шеберханасының шеберлері",
      photoBadge: "2009 ЖЫЛДАН БЕРІ ҚОЛЫНДА ДОМБЫРА",
      stat: ["Үйретеміз.", "Жасаймыз.", "Насихаттаймыз."],
    },
    address: {
      quote:
        "Домбыраға қызығушылық танытқаныңызға қуаныштымын. Бізден сапалы домбыра сатып алып, оны бап-тап, тіпті бірегей тренажеріміз бен караокемізде ойнауды үйрене аласыз.",
      name: "Айым Ернст",
      role: "dombyra.kz негізін қалаушы",
    },
    philosophyEyebrow: "БІЗДІҢ ФИЛОСОФИЯМЫЗ",
    philosophyTitleMain: "Домбыра — емтихан да, сахна да емес.",
    philosophyTitleItalic: " Бұл өзіңмен жалғыз қалудың тәсілі.",
    philosophy: [
      { title: "Музыкант болудың қажеті жоқ", text: "Ойнауды жай өзің үшін, жан рахаты үшін де жасауға болады — сахнаға шығу мақсатынсыз.", tag: "Хобби" },
      { title: "Бастауға ешқашан кеш емес", text: "Маңыздысы — жас емес, тәртіп пен тұрақты жаттығу.", tag: "Кез келген жаста" },
      { title: "Бір ішектен күйге дейін", text: "Тренажерде тіпті бір ішектен бастауға болады.", tag: "Қарапайымдылық" },
      { title: "Домбыра үйді безендіреді", text: "Кеңістікті жарқын энергиямен толтырады — сурет тәрізді.", tag: "Эстетика" },
      { title: "Бір рет сатып алып, өмір бойы пайдалану", text: "Біз арзан домбыра жасамаймыз. Сапалы, кәсіби домбыраға сәл көбірек төлеп, оны рахаттанып ойнап, ұрпаққа қалдырған дұрыс.", tag: "Мәңгілікке" },
      { title: "Make Dombyra Great Again", text: "Домбыра — қазақ болмысының басты нышандарының бірі. Мәдени капитал иесі қоғамда әрдайым оң жағынан ерекшеленеді. Балаларымыз бізді осылай есте сақтайды.", tag: "Бірегейлік" },
    ],
    historyEyebrow: "2015 ЖЫЛДАН БЕРІ",
    historyTitleMain: "Бәрі қалай",
    historyTitleItalic: "басталды",
    history: [
      { tag: "3-СЫНЫП", content: "3-сыныпта әкесі Айымға домбыра әкеліп, «Дударай» әнін ойнауды үйретті. Айтпақшы, көбі неге тегі Эрнст екенін сұрайды — бұл әкесінің есімі. Қызының қабілеті мен қызығушылығын көрген ата-анасы оны мектептің Балалар шығармашылық үйіне берді." },
      { tag: "АЛҒАШҚЫ ОҚУШЫ", content: "Екі жылдан соң Айымға алғашқы оқушысы — талантты керең-мылқау қыз сеніп тапсырылды. Бұл тәжірибе домбыраны сөзбен ғана емес, қолмен, ырғақпен, көрсету арқылы да түсіндіруге үйретті." },
      { tag: "УНИВЕРСИТЕТ · 2015", content: "Университетте оқып жүргенде Айым репетиторлықпен айналысуын жалғастырды — оқушылары Алматының түкпір-түкпірінде тұратын, сондықтан әр сабақ қала бойлап жол жүруді білдіретін. Осылай сабақтарды видеоға түсіріп, оқушыларға жіберу идеясы туды. 2015 жылы YouTube-ке арналған негізгі курс сапалы түсіріліп, интернеттегі домбыраға арналған алғашқы осындай курс болды." },
      { tag: "15+ ЖЫЛ", content: "YouTube арнасынан жоба шеберхана мен IT-өнімге дейін өсті. 15 жылдан астам уақыт ішінде Айымда әр түрлі жастағы, ұлттағы және мамандықтағы көптеген оқушылар болды." },
    ],
    studentsEyebrow: "ОҚУШЫЛАР",
    studentsTitleMain: "Шеберлік сабақтары",
    studentsTitleItalic: "үш тілде",
    studentsText: "Біз домбыра бойынша шеберлік сабақтарын қазақ, орыс және ағылшын тілдерінде өткіземіз. Қонақтарымыздың арасында шетелдіктер жиі кездеседі — көбісі домбыраны алғаш рет қолына алады, аспаптың қысқаша тарихымен және қызықты деректермен танысады. Қонақтарымыздың арасында отбасыларымен келген дипломаттар да болды.",
    workshopEyebrow: "ШЕБЕРХАНА",
    workshopTitleMain: "Курс ұлғайып",
    workshopTitleItalic: "шеберханаға айналды",
    workshopStatBadge: ["біздің топ-шебер", "жұмыс істейді"],
    workshopStatValue: "1998 жылдан",
    workshopIntro: "Білім беру жобасының айналасында Қазақстанның ең тәжірибелі домбыра шеберлері бірікті. Әрқайсысының тәжірибесі кемінде 10 жыл, біз тек сапалы материалдарды ғана қолданамыз.",
    statLabel1: "шебер тәжірибесі",
    statLabel2: "материалдар",
    statLabel3: "және шетел",
    workshopGeoText: "Біздің домбыраларды Қазақстанның барлық аймақтарынан және шетелден сатып алады.",
    galleryLabel: "Шеберханадан",
    catalogButton: "Домбыралар каталогын қарау",
    todayEyebrow: "БҮГІНДЕ",
    todayBadgeYear: "2017",
    todayBadgeLabel: "IT-да",
    todayTitleMain: "Домбыра",
    todayTitleItalic: "және өнім менеджменті",
    todayText: "2017 жылдан бері Айым IT саласында жұмыс істейді, студенттерге өнім менеджментінен сабақ береді — осы уақыт бойы қатар dombyra.kz жобасын дамытып келді. Тренажер осы жолдың заңды нәтижесі болды.",
    todayMission: "Біз оқыту және насихаттау миссиямызды ұстанамыз — сондықтан домбырада ойнауды үйрететін қолжетімді онлайн-тренажер жасадық.",
    accessBannerMain: "dombyra.kz сайтында қолжетімді",
    accessBannerSuffix: " — жаттығуды бастау үшін басыңыз",
    accessTitleMain: "Тренажерге",
    accessTitleItalic: "қолжетімділік",
    tunerLine: "Тюнер — әрдайым, барлығына, ешбір ерекшеліксіз тегін",
    access: [
      { title: "Үйрену және караоке", price: "Бір бөлігі тегін, бір бөлігі 3 500 ₸/айдан", desc: "Әуендердің бір бөлігі барлығына әрдайым ашық. Қалғаны — жазылым бойынша." },
      { title: "Домбыра сатып алғанда", price: "Тегін", desc: "Барлық әуендер мен режимдерге мәңгілік толық қолжетімділік." },
      { title: "Мүгедектер мен аз қамтылған отбасыларға", price: "Тегін", desc: "Толық қолжетімділік. Рәсімдеу үшін бізге жазыңыз." },
    ],
    trainerButton: "Тренажерді ашу",
    footerQuoteLine1: "«Домбыра үйді әшекейлейді,",
    footerQuoteLine2: "музыка өмірді әшекейлегендей»",
    footerCaption: "Dombyra.kz — 2015 жылдан бері",
  },

  en: {
    hero: {
      eyebrow: "ABOUT US",
      titleLine1: "The dombra is",
      titleItalic: "not only",
      titleLine3: "for professionals",
      subtitle:
        "We make it possible for anyone to play the dombra — from the very first note on a single string to complex kuys.",
      avatarLine1: "Aiym and the masters",
      avatarLine2: "of the dombyra.kz workshop",
      photoBadge: "PLAYING THE DOMBRA SINCE 2009",
      stat: ["We teach.", "We craft.", "We popularize."],
    },
    address: {
      quote:
        "I'm glad you're interested in the dombra. With us, you can buy a quality dombra, tune it, and even learn to play it — in our unique trainer and karaoke.",
      name: "Aiym Ernst",
      role: "Founder of dombyra.kz",
    },
    philosophyEyebrow: "OUR PHILOSOPHY",
    philosophyTitleMain: "The dombra isn't an exam or a stage.",
    philosophyTitleItalic: " It's a way to be with yourself.",
    philosophy: [
      { title: "You don't need to be a musician", text: "You can play just for yourself, for the soul — with no goal of performing.", tag: "Hobby" },
      { title: "It's never too late to start", text: "What matters is discipline and regular practice, not age.", tag: "Any age" },
      { title: "From one string to kuys", text: "In the trainer, you can even start with a single string.", tag: "Simplicity" },
      { title: "The dombra decorates a home", text: "It fills a space with bright energy — like a painting.", tag: "Aesthetics" },
      { title: "Buy once, keep for life", text: "We don't churn out cheap dombras. It's better to pay a little more for a quality, professional instrument — play it with joy and pass it down to your children.", tag: "Forever" },
      { title: "Make Dombyra Great Again", text: "The dombra is one of the central symbols of Kazakh identity. A carrier of cultural capital will always stand out positively in society. It's how our children will remember us.", tag: "Identity" },
    ],
    historyEyebrow: "SINCE 2015",
    historyTitleMain: "How it all",
    historyTitleItalic: "began",
    history: [
      { tag: "3RD GRADE", content: "In 3rd grade, Aiym's father brought her a dombra and taught her to play «Dudarai». People often ask why her surname is Ernst — that was her father's name. Seeing their daughter's ability and interest, her parents enrolled her in the school's House of Children's Creativity." },
      { tag: "FIRST STUDENT", content: "Two years later, Aiym was entrusted with her first student — a talented deaf-mute girl. That experience taught her to explain the dombra not only in words, but with her hands, rhythm, and demonstration." },
      { tag: "UNIVERSITY · 2015", content: "While studying at university, Aiym kept working as a private dombra tutor — her students lived across Almaty, and every lesson meant a trip across the whole city. That's how the idea came to record lessons on video and send them to students. In 2015, a professionally filmed base course for YouTube was released — the first course of its kind on the internet." },
      { tag: "15+ YEARS", content: "From a YouTube channel, the project grew into a workshop and an IT product. Over more than 15 years, Aiym has had many students of very different ages, nationalities, and professions." },
    ],
    studentsEyebrow: "STUDENTS",
    studentsTitleMain: "Masterclasses",
    studentsTitleItalic: "in three languages",
    studentsText: "We run dombra masterclasses in Kazakh, Russian, and English. Our guests often include foreigners — many hold a dombra for the first time, learning a brief history of the instrument and interesting facts. Our guests have also included diplomats and their families.",
    workshopEyebrow: "WORKSHOP",
    workshopTitleMain: "The course grew",
    workshopTitleItalic: "into a workshop",
    workshopStatBadge: ["our top master", "has been working"],
    workshopStatValue: "Since 1998",
    workshopIntro: "The most experienced dombra masters in Kazakhstan came together around the educational project. Each has at least 10 years of practice, and we use only quality materials.",
    statLabel1: "master's experience",
    statLabel2: "materials",
    statLabel3: "and abroad",
    workshopGeoText: "Our dombras are bought from all across Kazakhstan and abroad.",
    galleryLabel: "From the workshop",
    catalogButton: "Browse the dombra catalog",
    todayEyebrow: "TODAY",
    todayBadgeYear: "2017",
    todayBadgeLabel: "in IT",
    todayTitleMain: "Dombra",
    todayTitleItalic: "and product management",
    todayText: "Since 2017, Aiym has worked in IT and taught product management to students — all while developing dombyra.kz in parallel. The trainer became a logical result of that path.",
    todayMission: "We follow our mission of teaching and popularizing — that's why we built an accessible online trainer for learning to play the dombra.",
    accessBannerMain: "Available on dombyra.kz",
    accessBannerSuffix: " — tap to start practicing",
    accessTitleMain: "Access",
    accessTitleItalic: "to the trainer",
    tunerLine: "Tuner — always free, for everyone, no exceptions",
    access: [
      { title: "Learning and karaoke", price: "Some free, some from 3,500 ₸/month", desc: "Some melodies are open to everyone, always. The rest are by subscription." },
      { title: "When you buy a dombra", price: "Free", desc: "Full access to all melodies and modes, forever." },
      { title: "For people with disabilities and low-income families", price: "Free", desc: "Full access. Write to us to arrange it." },
    ],
    trainerButton: "Open the trainer",
    footerQuoteLine1: "«The dombra decorates a home",
    footerQuoteLine2: "the way music decorates a life»",
    footerCaption: "Dombyra.kz — since 2015",
  },

  tr: {
    hero: {
      eyebrow: "PROJE HAKKINDA",
      titleLine1: "Dombra",
      titleItalic: "sadece",
      titleLine3: "profesyoneller için değildir",
      subtitle:
        "Herkesin dombra çalabilmesini sağlıyoruz — tek telde atılan ilk notadan karmaşık küylere kadar.",
      avatarLine1: "Aiym ve dombyra.kz",
      avatarLine2: "atölyesinin ustaları",
      photoBadge: "2009'DAN BERİ ELİNDE DOMBRA",
      stat: ["Öğretiyoruz.", "Üretiyoruz.", "Yaygınlaştırıyoruz."],
    },
    address: {
      quote:
        "Dombraya ilgi duymanıza sevindim. Bizden kaliteli bir dombra satın alabilir, akordunu yapabilir ve hatta eşsiz eğitim aracımız ve karaokemizde çalmayı öğrenebilirsiniz.",
      name: "Aiym Ernst",
      role: "dombyra.kz Kurucusu",
    },
    philosophyEyebrow: "FELSEFEMİZ",
    philosophyTitleMain: "Dombra bir sınav ya da sahne değildir.",
    philosophyTitleItalic: " Kendinle baş başa kalmanın bir yoludur.",
    philosophy: [
      { title: "Müzisyen olmaya gerek yok", text: "Sahne almak amacı olmadan, sadece kendin için, ruhun için çalabilirsin.", tag: "Hobi" },
      { title: "Başlamak için asla geç değil", text: "Önemli olan yaş değil, disiplin ve düzenli pratik.", tag: "Her yaşta" },
      { title: "Tek telden küylere", text: "Eğitim aracında tek bir telle bile başlayabilirsiniz.", tag: "Basitlik" },
      { title: "Dombra evi süsler", text: "Bir tablo gibi mekânı aydınlık bir enerjiyle doldurur.", tag: "Estetik" },
      { title: "Bir kez alın, ömür boyu kullanın", text: "Ucuz dombralar üretmiyoruz. Kaliteli, profesyonel bir enstrüman için biraz daha ödeyip keyifle çalmak ve gelecek kuşaklara bırakmak daha iyidir.", tag: "Sonsuza dek" },
      { title: "Make Dombyra Great Again", text: "Dombra, Kazak kimliğinin en merkezi sembollerinden biridir. Kültürel sermayenin taşıyıcısı toplumda her zaman olumlu şekilde öne çıkar. Çocuklarımızın bizi hatırlayacağı şey budur.", tag: "Kimlik" },
    ],
    historyEyebrow: "2015'TEN BERİ",
    historyTitleMain: "Her şey nasıl",
    historyTitleItalic: "başladı",
    history: [
      { tag: "3. SINIF", content: "3. sınıftayken babası Aiym'a bir dombra getirdi ve ona «Dudarai» şarkısını çalmayı öğretti. Bu arada, birçok kişi soyadının neden Ernst olduğunu merak eder — bu babasının adıydı. Kızlarının yeteneğini ve ilgisini gören ailesi, onu okulun Çocuk Sanat Merkezi'ne verdi." },
      { tag: "İLK ÖĞRENCİ", content: "İki yıl sonra Aiym'a ilk öğrencisi emanet edildi — yetenekli, işitme ve konuşma engelli bir kız. Bu deneyim, dombrayı yalnızca kelimelerle değil, elleriyle, ritimle ve göstererek de anlatmayı öğretti." },
      { tag: "ÜNİVERSİTE · 2015", content: "Üniversitede okurken Aiym özel dombra dersleri vermeye devam etti — öğrencileri Almatı'nın farklı bölgelerinde yaşıyordu ve her ders şehrin bir ucundan diğerine gitmek anlamına geliyordu. Böylece dersleri video olarak kaydedip öğrencilere gönderme fikri doğdu. 2015 yılında YouTube için profesyonelce çekilmiş bir temel kurs yayınlandı — internetteki bu türden ilk dombra kursu oldu." },
      { tag: "15+ YIL", content: "YouTube kanalından proje bir atölyeye ve bir IT ürününe dönüştü. 15 yılı aşkın süre boyunca Aiym'ın çok farklı yaşlardan, milliyetlerden ve mesleklerden pek çok öğrencisi oldu." },
    ],
    studentsEyebrow: "ÖĞRENCİLER",
    studentsTitleMain: "Üç dilde",
    studentsTitleItalic: "atölye çalışmaları",
    studentsText: "Kazakça, Rusça ve İngilizce dillerinde dombra atölyeleri düzenliyoruz. Misafirlerimiz arasında sıkça yabancılar oluyor — birçoğu dombrayı ilk kez elinde tutuyor, enstrümanın kısa tarihini ve ilginç bilgileri öğreniyor. Misafirlerimiz arasında aileleriyle gelen diplomatlar da oldu.",
    workshopEyebrow: "ATÖLYE",
    workshopTitleMain: "Kurs bir",
    workshopTitleItalic: "atölyeye dönüştü",
    workshopStatBadge: ["usta ustamız", "çalışıyor"],
    workshopStatValue: "1998'den beri",
    workshopIntro: "Eğitim projesinin etrafında Kazakistan'ın en deneyimli dombra ustaları bir araya geldi. Her birinin en az 10 yıllık deneyimi var ve yalnızca kaliteli malzemeler kullanıyoruz.",
    statLabel1: "usta deneyimi",
    statLabel2: "malzemeler",
    statLabel3: "ve yurt dışı",
    workshopGeoText: "Dombralarımız Kazakistan'ın her yerinden ve yurt dışından satın alınıyor.",
    galleryLabel: "Atölyeden",
    catalogButton: "Dombra kataloğuna göz atın",
    todayEyebrow: "BUGÜN",
    todayBadgeYear: "2017",
    todayBadgeLabel: "IT'de",
    todayTitleMain: "Dombra",
    todayTitleItalic: "ve ürün yönetimi",
    todayText: "2017'den beri Aiym IT alanında çalışıyor, öğrencilere ürün yönetimi dersi veriyor — ve bu süre boyunca paralel olarak dombyra.kz'i geliştirmeye devam etti. Eğitim aracı bu yolun mantıklı bir sonucu oldu.",
    todayMission: "Eğitim ve yaygınlaştırma misyonumuzu takip ediyoruz — bu yüzden dombra çalmayı öğretmek için erişilebilir bir çevrimiçi eğitim aracı oluşturduk.",
    accessBannerMain: "dombyra.kz'de kullanılabilir",
    accessBannerSuffix: " — çalışmaya başlamak için dokunun",
    accessTitleMain: "Eğitim aracına",
    accessTitleItalic: "erişim",
    tunerLine: "Akort cihazı — her zaman, herkes için, istisnasız ücretsiz",
    access: [
      { title: "Öğrenme ve karaoke", price: "Bir kısmı ücretsiz, bir kısmı aylık 3.500 ₸'den", desc: "Bazı melodiler herkese her zaman açıktır. Diğerleri abonelikle." },
      { title: "Dombra satın alındığında", price: "Ücretsiz", desc: "Tüm melodilere ve modlara sonsuza dek tam erişim." },
      { title: "Engelli ve düşük gelirli ailelere", price: "Ücretsiz", desc: "Tam erişim. Ayarlamak için bize yazın." },
    ],
    trainerButton: "Eğitim aracını aç",
    footerQuoteLine1: "«Dombra evi süsler,",
    footerQuoteLine2: "tıpkı müziğin hayatı süslediği gibi»",
    footerCaption: "Dombyra.kz — 2015'ten beri",
  },
};

export default function AboutPage({ params }) {
  const locale = params?.locale;
  const p = locale ? `/${locale}` : "";
  const t = CONTENT[locale] || CONTENT.ru;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative bg-brand-lime px-6 py-14 lg:px-12 lg:py-20">
          <span className="font-brand text-[11px] font-bold tracking-[0.18em] text-brand-ink/70">
            {t.hero.eyebrow}
          </span>
          <h1 className="mt-4 font-brand text-[38px] font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-brand-ink sm:text-[42px] lg:text-[58px]">
            {t.hero.titleLine1}
            <br />
            <span className="font-display italic normal-case font-normal tracking-normal">
              {t.hero.titleItalic}
            </span>
            <br />
            {t.hero.titleLine3}
          </h1>
          <p className="mt-5 max-w-[380px] font-brand text-[14.5px] font-medium leading-relaxed text-brand-ink/70">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-brand-lime"
                >
                  <Placeholder>фото</Placeholder>
                </div>
              ))}
            </div>
            <span className="font-brand text-[11.5px] font-semibold leading-snug text-brand-ink/75">
              {t.hero.avatarLine1}
              <br />
              {t.hero.avatarLine2}
            </span>
          </div>
        </div>

        <div className="relative h-[320px] overflow-hidden bg-brand-ink sm:h-[360px] lg:h-auto">
          <Placeholder>
            Фото — домбра крупным планом / атмосферный кадр мастерской
          </Placeholder>
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 shadow-lg sm:left-5 sm:top-5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-lime" />
            <span className="font-brand text-[10px] font-bold tracking-[0.08em] text-brand-ink sm:text-[10.5px]">
              {t.hero.photoBadge}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 max-w-[190px] rounded-2xl bg-white/95 p-3.5 shadow-lg sm:bottom-5 sm:right-5 sm:max-w-[220px] sm:p-4">
            <div className="font-brand text-[16px] font-extrabold leading-tight text-brand-blue sm:text-[19px]">
              {t.hero.stat.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < t.hero.stat.length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- бегущая строка ---------- */}
      <div className="flex overflow-hidden bg-brand-ink text-brand-lime">
        <div className="flex w-max gap-5.5 whitespace-nowrap px-3 py-2.5 font-brand text-[10.5px] font-bold tracking-[0.16em]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-5.5">
              {MARQUEE_TEXT} <span className="text-brand-lime">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ================= ОБРАЩЕНИЕ ================= */}
      <section className="bg-white px-5 py-14 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 lg:grid-cols-[240px_1fr] lg:gap-14">
          <div className="mx-auto h-[160px] w-[160px] shrink-0 overflow-hidden rounded-full border-4 border-brand-bg sm:h-[200px] sm:w-[200px] lg:mx-0">
            <Placeholder>фото — портрет Айым</Placeholder>
          </div>
          <div>
            <span className="font-display text-[52px] italic leading-none text-brand-blue sm:text-[64px]">
              "
            </span>
            <p className="-mt-6 max-w-[620px] font-brand text-[17px] font-medium leading-relaxed text-brand-ink sm:text-[19px] lg:text-[21px]">
              {t.address.quote}
            </p>
            <p className="mt-5 font-display text-[18px] italic text-brand-ink">
              {t.address.name}
            </p>
            <p className="font-brand text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-ink/45">
              {t.address.role}
            </p>
          </div>
        </div>
      </section>

      {/* ================= ФИЛОСОФИЯ ================= */}
      <section className="bg-brand-ink px-5 py-14 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <span className="font-brand text-[11px] font-bold tracking-[0.18em] text-brand-lime">
            {t.philosophyEyebrow}
          </span>
          <h2 className="mt-3 max-w-[620px] font-brand text-[28px] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-white sm:text-[30px] lg:text-[42px]">
            {t.philosophyTitleMain}
            <span className="font-display italic normal-case font-normal tracking-normal text-brand-lime">
              {t.philosophyTitleItalic}
            </span>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.philosophy.map((item, i) => {
              const style = STYLE_PHILOSOPHY[i];
              return (
                <div
                  key={i}
                  className="flex h-full flex-col overflow-hidden rounded-2xl bg-white"
                >
                  <div className="relative flex h-[300px] flex-none flex-col gap-1 p-1">
                    <div className="relative h-[190px] overflow-hidden rounded-xl">
                      <Placeholder>{PHILOSOPHY_PHOTOS[i]}</Placeholder>
                      <span
                        className={`absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full font-brand text-[11px] font-extrabold shadow ${style.numBg}`}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex h-[102px] gap-1">
                      <div className="flex-1 overflow-hidden rounded-xl">
                        <Placeholder>фото</Placeholder>
                      </div>
                      <div className="flex-1 overflow-hidden rounded-xl">
                        <Placeholder>фото</Placeholder>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="font-brand text-[13.5px] font-extrabold uppercase leading-snug tracking-[-0.01em]">
                      {item.title}
                    </div>
                    <div className="mt-1.5 font-brand text-[12px] font-medium leading-relaxed text-brand-ink/62">
                      {item.text}
                    </div>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1.5 px-4 py-2 ${style.tagBg}`}
                  >
                    <span
                      className={`font-brand text-[9.5px] font-extrabold uppercase tracking-[0.1em] ${style.tagText}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ИСТОРИЯ ================= */}
      <section className="relative bg-white px-5 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <span className="font-brand text-[11px] font-bold tracking-[0.18em] text-brand-teal">
            {t.historyEyebrow}
          </span>
          <h2 className="mt-3 max-w-[640px] font-brand text-[30px] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] sm:text-[32px] lg:text-[50px]">
            {t.historyTitleMain}{" "}
            <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
              {t.historyTitleItalic}
            </span>
          </h2>

          <div className="relative mt-14 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-10">
            <svg
              className="pointer-events-none absolute -left-4 top-0 hidden h-full w-[52%] lg:block"
              viewBox="0 0 400 900"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M40 0 C 200 100, 20 220, 220 320 S 60 520, 260 620 S 100 800, 300 900"
                stroke="#aaff00"
                strokeWidth="3"
                strokeDasharray="1 14"
                strokeLinecap="round"
              />
            </svg>

            <div className="relative z-10 flex flex-col gap-10">
              {t.history.map((item, i) => {
                const style = STYLE_HISTORY[i];
                return (
                  <div
                    key={i}
                    className={`relative rounded-2xl p-5 shadow-sm ${style.card} ${style.ml}`}
                  >
                    <span
                      className={`absolute -top-3 left-5 rounded-full px-3 py-1 font-brand text-[10px] font-extrabold tracking-[0.08em] ${style.tagBg} ${style.tagText}`}
                    >
                      {item.tag}
                    </span>
                    <p
                      className={`mt-2 font-brand text-[14px] font-medium leading-relaxed ${style.body}`}
                    >
                      {item.content}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="relative z-10 mt-4 lg:mt-16">
              <div className="relative -rotate-2 overflow-hidden rounded-2xl border border-brand-border shadow-xl">
                <div className="aspect-video w-full bg-brand-ink">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/ЗАМЕНИТЕ_НА_ID_ВИДЕО_1"
                    title="Первые уроки домбры — Dombyra.kz"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="relative z-20 -mt-10 w-[calc(100%-1.5rem)] rotate-2 overflow-hidden rounded-2xl border-4 border-white shadow-xl lg:ml-16 lg:w-[85%]">
                <div className="aspect-video w-full bg-brand-ink">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/ЗАМЕНИТЕ_НА_ID_ВИДЕО_2"
                    title="Первый видеокурс домбры — Dombyra.kz"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="absolute -bottom-8 right-0 z-30 max-w-[160px] rounded-2xl bg-brand-lime p-4 shadow-xl sm:max-w-[180px] lg:right-4">
                <div className="font-brand text-[11px] font-extrabold uppercase tracking-[0.06em] text-brand-ink">
                  Мастерская выросла из этого курса
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= УЧЕНИКИ / МАСТЕР-КЛАССЫ ================= */}
      <section className="bg-brand-bg px-5 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <span className="font-brand text-[11px] font-bold tracking-[0.18em] text-brand-teal">
            {t.studentsEyebrow}
          </span>
          <h2 className="mt-3 max-w-[640px] font-brand text-[28px] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] sm:text-[30px] lg:text-[42px]">
            {t.studentsTitleMain}{" "}
            <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
              {t.studentsTitleItalic}
            </span>
          </h2>
          <p className="mt-4 max-w-[680px] font-brand text-[14.5px] font-medium leading-relaxed text-brand-ink/72">
            {t.studentsText}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-2xl"
              >
                <Placeholder>фото ученика</Placeholder>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= МАСТЕРСКАЯ ================= */}
      <section className="bg-white px-5 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <span className="font-brand text-[11px] font-bold tracking-[0.18em] text-brand-teal">
            {t.workshopEyebrow}
          </span>
          <h2 className="mt-3 max-w-[640px] font-brand text-[28px] font-extrabold uppercase leading-[1] tracking-[-0.03em] sm:text-[30px] lg:text-[46px]">
            {t.workshopTitleMain}{" "}
            <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
              {t.workshopTitleItalic}
            </span>
          </h2>

          <div className="relative mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div className="relative h-[320px] overflow-hidden rounded-2xl sm:h-[360px] lg:h-[420px]">
              <Placeholder>фото — руки мастера за работой</Placeholder>
              <div className="absolute bottom-4 left-4 rounded-2xl bg-white p-4 shadow-xl sm:-bottom-6 sm:left-6 sm:p-5">
                <div className="font-brand text-[30px] font-extrabold leading-none text-brand-blue sm:text-[38px]">
                  {t.workshopStatValue}
                </div>
                <div className="mt-1 font-brand text-[11px] font-medium leading-snug text-brand-ink/60 sm:text-[11.5px]">
                  {t.workshopStatBadge[0]}
                  <br />
                  {t.workshopStatBadge[1]}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 lg:pt-0">
              <p className="font-brand text-[14.5px] font-medium leading-relaxed text-brand-ink/72">
                {t.workshopIntro}
              </p>

              <div className="mt-2 grid grid-cols-3 gap-2.5">
                <div className="rounded-2xl border border-brand-border bg-brand-bg p-3.5 text-center sm:p-4">
                  <div className="font-brand text-[19px] font-extrabold text-brand-blue sm:text-[24px]">
                    10+ лет
                  </div>
                  <div className="mt-1 font-brand text-[10px] font-medium text-brand-ink/55 sm:text-[11px]">
                    {t.statLabel1}
                  </div>
                </div>
                <div className="rounded-2xl border border-brand-border bg-brand-bg p-3.5 text-center sm:p-4">
                  <div className="font-brand text-[19px] font-extrabold text-brand-blue sm:text-[24px]">
                    100%
                  </div>
                  <div className="mt-1 font-brand text-[10px] font-medium text-brand-ink/55 sm:text-[11px]">
                    {t.statLabel2}
                  </div>
                </div>
                <div className="rounded-2xl border border-brand-border bg-brand-bg p-3.5 text-center sm:p-4">
                  <div className="font-brand text-[19px] font-extrabold text-brand-blue sm:text-[24px]">
                    KZ+
                  </div>
                  <div className="mt-1 font-brand text-[10px] font-medium text-brand-ink/55 sm:text-[11px]">
                    {t.statLabel3}
                  </div>
                </div>
              </div>

              <p className="mt-1 font-brand text-[12.5px] font-medium leading-relaxed text-brand-ink/60">
                {t.workshopGeoText}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-3 font-brand text-[12px] font-bold uppercase tracking-[0.08em] text-brand-ink/50">
              {t.galleryLabel}
            </div>
            <div data-row className="flex gap-3 overflow-x-auto pb-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[160px] w-[220px] flex-none overflow-hidden rounded-2xl sm:h-[190px] sm:w-[260px]"
                >
                  <Placeholder>{`фото ${i + 1}`}</Placeholder>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href={`${p}/katalog`}>
              <Button variant="secondary">{t.catalogButton} ›</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= АЙЫМ СЕГОДНЯ ================= */}
      <section className="bg-brand-bg px-5 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative">
              <div className="relative h-[300px] overflow-hidden rounded-2xl bg-brand-ink sm:h-[340px] lg:h-[380px]">
                <Placeholder>фото — Айым в офисе / за ноутбуком</Placeholder>
              </div>
              <div className="absolute bottom-3 right-3 flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-white bg-brand-lime text-center shadow-xl sm:-bottom-6 sm:-right-4 sm:h-28 sm:w-28">
                <span className="font-brand text-[15px] font-extrabold leading-none text-brand-ink sm:text-[18px]">
                  {t.todayBadgeYear}
                </span>
                <span className="font-brand text-[7px] font-bold uppercase leading-tight text-brand-ink/70 sm:text-[8px]">
                  {t.todayBadgeLabel}
                </span>
              </div>
            </div>

            <div>
              <span className="font-brand text-[11px] font-bold tracking-[0.18em] text-brand-teal">
                {t.todayEyebrow}
              </span>
              <h2 className="mt-3 font-brand text-[26px] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] sm:text-[28px] lg:text-[40px]">
                {t.todayTitleMain}{" "}
                <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
                  {t.todayTitleItalic}
                </span>
              </h2>
              <p className="mt-4 max-w-[520px] font-brand text-[14.5px] font-medium leading-relaxed text-brand-ink/72">
                {t.todayText}
              </p>

              <p className="mt-3 max-w-[520px] rounded-2xl border border-brand-border bg-white p-4 font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/75">
                {t.todayMission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ДОСТУП ================= */}
      <section className="bg-brand-ink px-5 py-4 text-center">
        <span className="font-brand text-[10px] font-bold uppercase tracking-[0.14em] text-brand-lime sm:text-[10.5px]">
          {t.accessBannerMain}
        </span>
        <span className="font-brand text-[10px] font-medium text-white/60 sm:text-[10.5px]">
          {t.accessBannerSuffix}
        </span>
      </section>

      <section className="bg-white px-5 py-14 text-center lg:px-12 lg:py-20">
        <div className="mx-auto mb-5 h-3 w-3 rotate-45 bg-brand-lime" />
        <h2 className="font-brand text-[28px] font-extrabold uppercase leading-[0.94] tracking-[-0.035em] sm:text-[30px] lg:text-[46px]">
          {t.accessTitleMain}{" "}
          <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
            {t.accessTitleItalic}
          </span>
        </h2>

        <div className="mx-auto mt-8 flex max-w-[1000px] items-center justify-center gap-2.5 rounded-2xl border border-brand-border bg-brand-bg px-5 py-3.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-lime" />
          <span className="font-brand text-[12.5px] font-semibold text-brand-ink">
            {t.tunerLine}
          </span>
        </div>

        <div className="mx-auto mt-4 grid max-w-[1000px] grid-cols-1 gap-5 text-left sm:grid-cols-3">
          {t.access.map((tier, i) => {
            const style = STYLE_ACCESS[i];
            return (
              <div
                key={i}
                className={`flex flex-col rounded-2xl p-6 ${style.style}`}
              >
                <div className="font-brand text-[10.5px] font-bold uppercase tracking-[0.1em] text-brand-ink/60">
                  {tier.title}
                </div>
                <div
                  className={`mt-2 font-brand font-extrabold text-brand-ink ${style.priceSize}`}
                >
                  {tier.price}
                </div>
                <div className="mt-2 font-brand text-[12.5px] font-medium leading-relaxed text-brand-ink/65">
                  {tier.desc}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10">
          <Link href={`${p}/learn`}>
            <Button variant="primary">{t.trainerButton} ›</Button>
          </Link>
        </div>
      </section>

      {/* ================= ФУТЕР-МАНИФЕСТ ================= */}
      <section className="relative overflow-hidden bg-[#111111] px-5 py-20 text-center lg:py-28">
        <div className="absolute inset-0 opacity-30 grayscale">
          <Placeholder>фото — мастерская, ч/б атмосферный кадр</Placeholder>
        </div>
        <div className="relative z-10">
          <h2 className="mx-auto max-w-[820px] font-display text-[28px] italic leading-[1.15] text-white sm:text-[34px] lg:text-[54px]">
            {t.footerQuoteLine1}
            <br />
            {t.footerQuoteLine2}
          </h2>
          <p className="mt-6 font-brand text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
            {t.footerCaption}
          </p>
        </div>
      </section>
    </>
  );
}