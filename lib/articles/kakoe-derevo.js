// lib/articles/kakoe-derevo.js
//
// Содержание перенесено из презентации-гайда Айым (4 слайда):
// задний корпус, верхняя дека, "почему две домбры стоят по-разному",
// пример комплектации. Использует три новых типа блоков
// (partShowcase/priceBreakdown/comparisonCards), которые понимает
// app/[locale]/blog/[slug]/page.jsx — структура и порядок элементов
// сохранены такими же, как в презентации, цвета — фирменные сайта.
export default {
  slug: "kakoe-derevo",
  category_key: "guide",
  read_minutes: 6,
  cover_url: null,
  title: {
    ru: "Из какого дерева домбра лучше?",
    kz: "Домбыраға қандай ағаш жақсы?",
    en: "What wood makes the best dombra?",
    tr: "Dombra için en iyi ağaç hangisi?",
  },
  excerpt: {
    ru: "Разбираем по частям: задний корпус, верхняя дека, и почему две похожие на вид домбры стоят по-разному.",
    kz: "Бөлшектеп қарастырамыз: артқы корпус, үстіңгі дека, және сырты бірдей екі домбыра неге түрлі бағада тұрады.",
    en: "A part-by-part breakdown: the back body, the soundboard, and why two similar-looking dombras cost differently.",
    tr: "Parça parça inceliyoruz: arka gövde, üst tabla ve görünüşte benzer iki dombranın neden farklı fiyatlandığı.",
  },
  content: {
    ru: [
      {
        type: "p",
        text: "«Какое дерево лучше для домбры?» — вопрос, который нам задают чаще всего. Короткого ответа нет: разные части инструмента делают из разных пород, и каждая порода решает свою задачу — от звучания до долговечности. Разберём по частям.",
      },
      {
        type: "priceBreakdown",
        title: "Почему две похожие домбры",
        titleAccent: "стоят по-разному?",
        description:
          "Цена зависит не от дизайна, а от мастера, дерева и дополнительных украшений. Наши мастера имеют опыт работы от 10 лет, а старший мастер изготавливает домбры с 1998 года.",
        thesis:
          "Профессиональная домбра никогда не изготавливается из одной породы дерева — каждая часть решает свою задачу, поэтому для неё подбирается своё дерево.",
        statPercent: {
          value: "80%",
          label: "качества звучания зависит от мастерства изготовления и только 20% — от породы дерева",
          note: "Даже бук великолепно звучит в руках мастера. И наоборот — палисандр не раскроется при плохом изготовлении.",
        },
        statFloor: {
          value: "от 120 000 ₸",
          label: "Стартовая стоимость профессиональной домбры",
          note: "В эту цену входит инструмент из базовых пород дерева, без декоративных боковых узоров и серебряной накладки. После выбора модели вы можете подобрать материалы и украшения по своему вкусу и бюджету.",
        },
        callouts: [
          { label: "Гриф — стабильность", note: "Делается из очень твёрдой породы, потому что мягкое дерево со временем продавливается под пальцами и деформируется." },
          { label: "Накладка — долговечность", note: "Шпон с орнаментами из твёрдой породы защищает мягкую деку от стирания — без него мягкое дерево деки быстро изнашивается от постоянных ударов пальцев при игре." },
          { label: "Корпус — формирует тембр", note: "Делается из твёрдой плотной породы, которая отражает звук внутри корпуса и формирует тембр инструмента." },
          { label: "Дека — передаёт вибрацию", note: "Делается из мягкой резонирующей породы с равномерной структурой, которая хорошо передаёт и усиливает вибрацию струн." },
        ],
        formula: ["Стоимость модели", "Породы дерева", "Украшения", "Итоговая стоимость"],
        varietyScale: {
          labels: ["Простые", "Средние", "Редкие", "Экзотические"],
          note: "Отличаются стоимостью, временем сушки, сложностью обработки и акустикой — более 40 пород дерева.",
        },
      },
      {
        type: "partShowcase",
        partLabel: "Верхняя дека",
        title: "Верхняя",
        titleAccent: "дека",
        description:
          "Дека передаёт вибрацию струн и во многом определяет характер, мягкость и глубину звучания. Верхняя дека с пружинкой внутри считается самой важной частью домбры. На деку наносят декоративный шпон из твёрдых пород дерева — он одновременно украшает инструмент орнаментом и защищает деку от стирания при игре.",
        cheapLabel: "дешевле",
        expensiveLabel: "дороже",
        ladder: [
          { name: "Ангарская сосна", note: "доступная сибирская порода с равномерной структурой, даёт тёплый насыщенный звук с выраженными низами" },
          { name: "Канадская ель", note: "лёгкая и жёсткая одновременно, эталонный материал для дек мировых производителей струнных инструментов, даёт яркий прозрачный звук" },
          { name: "Тянь-Шаньская ель", note: "редкая горная порода с узкими годичными кольцами, выращенная в суровых условиях Казахстана, даёт глубокий насыщенный звук с долгим сустейном" },
        ],
        extraBox: {
          title: "Гриф, накладка, головка и колки",
          groups: [
            { label: "Основа", options: ["Бук", "Клён"] },
            { label: "Второй слой накладки на гриф", options: ["Граб", "Эбен"] },
          ],
        },
      },
      {
        type: "partShowcase",
        partLabel: "Задний корпус",
        title: "Задний",
        titleAccent: "корпус",
        description:
          "Корпус формирует тембр инструмента — от мягкого и тёплого до яркого и звонкого. Нужный цвет можно вывести морилкой.",
        cheapLabel: "дешевле",
        expensiveLabel: "дороже",
        ladder: [
          { name: "Берёза" },
          { name: "Бук" },
          { name: "Клён" },
          { name: "Орех" },
          { name: "Кудрявая берёза" },
          { name: "Красное дерево" },
          { name: "Палисандр" },
        ],
      },
      ,
      {
        type: "comparisonCards",
        title: "Вы сами определяете",
        titleAccent: "итоговую стоимость",
        modelLabel: "Модель · Бастау",
        cards: [
          {
            price: "120 000 ₸",
            tier: "Базовая",
            specs: [
              { label: "Верхняя дека: Ангарская сосна", included: true },
              { label: "Задний корпус: Бук / Берёза / Клён", included: true },
              { label: "Без боковых узоров", included: false },
              { label: "Без узоров на грифе", included: false },
              { label: "Без серебряной накладки", included: false },
            ],
          },
          {
            price: "155 000 ₸",
            tier: "Средняя",
            specs: [
              { label: "Верхняя дека: Ангарская сосна", included: true },
              { label: "Задний корпус: Клён", included: true },
              { label: "Есть боковые узоры", included: true },
              { label: "Без узоров на грифе", included: false },
              { label: "Без серебряной накладки", included: false },
            ],
          },
          {
            price: "275 000 ₸",
            tier: "Премиальная",
            premium: true,
            specs: [
              { label: "Верхняя дека: Тянь-Шаньская ель", included: true },
              { label: "Задний корпус: Палисандр", included: true },
              { label: "Есть боковые узоры", included: true },
              { label: "Есть узор на грифе", included: true },
              { label: "Есть накладка из серебра 925 пробы", included: true },
            ],
          },
        ],
        note: "Любую домбру можно собрать под ваш вкус и бюджет. Доступны десятки разных комбинаций.",
        tags: ["Красное дерево без украшений", "Базовая версия с серебряной накладкой", "Дорогие породы без декора", "Индивидуальная комбинация"],
      },
    ],
    kz: [
      {
        type: "p",
        text: "«Домбыраға қандай ағаш жақсы?» — бізге ең жиі қоятын сұрақ. Қысқа жауабы жоқ: аспаптың әртүрлі бөліктері әртүрлі тұқымдардан жасалады, әр тұқым өз міндетін атқарады — дыбысынан беріктігіне дейін. Бөлшектеп қарастырайық.",
      },
      {
        type: "priceBreakdown",
        title: "Неге сырты ұқсас екі домбыра",
        titleAccent: "түрлі бағада тұрады?",
        description:
          "Баға дизайнға емес, шеберге, ағашқа және қосымша әшекейлерге байланысты. Шеберлеріміздің тәжірибесі 10 жылдан бастап, ал бас шебер домбыра жасаумен 1998 жылдан бері айналысады.",
        thesis:
          "Кәсіби домбыра ешқашан бір тұқымнан жасалмайды — әр бөлік өз міндетін атқарады, сондықтан оған өз ағашы таңдалады.",
        statPercent: {
          value: "80%",
          label: "дыбыс сапасы жасау шеберлігіне байланысты, тек 20% — ағаш тұқымына",
          note: "Тіпті бук та шебердің қолында керемет естіледі. Керісінше — палисандр нашар жасалса да ашылмайды.",
        },
        statFloor: {
          value: "120 000 ₸-ден",
          label: "Кәсіби домбыраның бастапқы бағасы",
          note: "Бұл бағаға базалық тұқымдардан жасалған, бүйіріндегі сәндік өрнексіз және күміс қаптамасыз аспап кіреді. Модельді таңдағаннан кейін материалдар мен әшекейді талғамыңыз бен бюджетіңізге қарай таңдай аласыз.",
        },
        callouts: [
          { label: "Гриф — тұрақтылық", note: "Өте қатты тұқымнан жасалады, өйткені жұмсақ ағаш уақыт өте саусақ астында басылып, деформацияланады." },
          { label: "Жапсырма — беріктік", note: "Қатты тұқымнан жасалған өрнекті шпон жұмсақ деканы үйкелуден қорғайды — онсыз деканың жұмсақ ағашы ойнау кезіндегі үздіксіз саусақ соғуынан тез тозады." },
          { label: "Корпус — тембрді қалыптастырады", note: "Корпус ішінде дыбысты шағылыстыратын және аспаптың тембрін қалыптастыратын қатты, тығыз тұқымнан жасалады." },
          { label: "Дека — дірілді береді", note: "Ішектердің дірілін жақсы беретін және күшейтетін, құрылымы біркелкі жұмсақ резонансты тұқымнан жасалады." },
        ],
        formula: ["Модель құны", "Ағаш тұқымдары", "Әшекейлер", "Түпкілікті құн"],
        varietyScale: {
          labels: ["Қарапайым", "Орташа", "Сирек", "Экзотикалық"],
          note: "Бағасымен, кебу уақытымен, өңдеу күрделілігімен және акустикасымен ерекшеленеді — 40-тан астам ағаш тұқымы.",
        },
      },
      {
        type: "partShowcase",
        partLabel: "Үстіңгі дека",
        title: "Үстіңгі",
        titleAccent: "дека",
        description:
          "Дека ішектердің дірілін береді және дыбыстың сипатын, жұмсақтығын және тереңдігін көбіне анықтайды. Ішінде серіппесі бар үстіңгі дека домбыраның ең маңызды бөлігі саналады. Декаға қатты тұқымнан жасалған сәндік шпон жағылады — ол аспапты өрнекпен әсемдейді әрі ойнау кезінде декамен үйкелуден қорғайды.",
        cheapLabel: "арзан",
        expensiveLabel: "қымбат",
        ladder: [
          { name: "Ангар қарағайы", note: "құрылымы біркелкі, қолжетімді сібір тұқымы, төмен жиіліктер айқын шығатын жылы, қанық дыбыс береді" },
          { name: "Канада шыршасы", note: "бір мезгілде жеңіл әрі қатты, ішекті аспаптардың әлемдік өндірушілері үшін эталонды материал, ашық, айқын дыбыс береді" },
          { name: "Тянь-Шань шыршасы", note: "Қазақстанның қатал жағдайында өскен, жылдық сақиналары тар сирек тау тұқымы, ұзақ сустейнмен терең, қанық дыбыс береді" },
        ],
        extraBox: {
          title: "Гриф, жапсырма, басы және құлақшалар",
          groups: [
            { label: "Негізі", options: ["Бук", "Үйеңкі"] },
            { label: "Грифтегі жапсырманың екінші қабаты", options: ["Граб", "Абанос"] },
          ],
        },
      },
      {
        type: "partShowcase",
        partLabel: "Артқы корпус",
        title: "Артқы",
        titleAccent: "корпус",
        description: "Корпус аспаптың тембрін қалыптастырады — жұмсақ әрі жылыдан бастап ашық және сыңғырлыға дейін. Керекті түсті морилкамен шығаруға болады.",
        cheapLabel: "арзан",
        expensiveLabel: "қымбат",
        ladder: [
          { name: "Қайың" },
          { name: "Бук" },
          { name: "Үйеңкі" },
          { name: "Жаңғақ" },
          { name: "Бұйра қайың" },
          { name: "Қызыл ағаш" },
          { name: "Палисандр" },
        ],
      },
      ,
      {
        type: "comparisonCards",
        title: "Түпкілікті құнды",
        titleAccent: "өзіңіз анықтайсыз",
        modelLabel: "Модель · Бастау",
        cards: [
          {
            price: "120 000 ₸",
            tier: "Базалық",
            specs: [
              { label: "Үстіңгі дека: Ангар қарағайы", included: true },
              { label: "Артқы корпус: Бук / Қайың / Үйеңкі", included: true },
              { label: "Бүйір өрнегі жоқ", included: false },
              { label: "Грифте өрнек жоқ", included: false },
              { label: "Күміс қаптама жоқ", included: false },
            ],
          },
          {
            price: "155 000 ₸",
            tier: "Орташа",
            specs: [
              { label: "Үстіңгі дека: Ангар қарағайы", included: true },
              { label: "Артқы корпус: Үйеңкі", included: true },
              { label: "Бүйір өрнегі бар", included: true },
              { label: "Грифте өрнек жоқ", included: false },
              { label: "Күміс қаптама жоқ", included: false },
            ],
          },
          {
            price: "275 000 ₸",
            tier: "Премиум",
            premium: true,
            specs: [
              { label: "Үстіңгі дека: Тянь-Шань шыршасы", included: true },
              { label: "Артқы корпус: Палисандр", included: true },
              { label: "Бүйір өрнегі бар", included: true },
              { label: "Грифте өрнек бар", included: true },
              { label: "925 сынаптағы күміс қаптама бар", included: true },
            ],
          },
        ],
        note: "Кез келген домбыраны талғамыңыз бен бюджетіңізге қарай жинауға болады. Ондаған түрлі комбинация қолжетімді.",
        tags: ["Әшекейсіз қызыл ағаш", "Күміс қаптамалы базалық нұсқа", "Декорсыз қымбат тұқымдар", "Жеке комбинация"],
      },
    ],
    en: [
      {
        type: "p",
        text: "\"What's the best wood for a dombra?\" is the question we hear most often. There's no short answer: different parts of the instrument are made from different woods, and each wood solves its own problem — from sound to durability. Let's go part by part.",
      },
      {
        type: "priceBreakdown",
        title: "Why do two similar dombras",
        titleAccent: "cost differently?",
        description:
          "The price doesn't depend on the design, but on the master, the wood, and any extra decorations. Our masters have at least 10 years of experience, and our senior master has been making dombras since 1998.",
        thesis:
          "A professional dombra is never made from a single type of wood — each part has its own job, so its own wood is chosen for it.",
        statPercent: {
          value: "80%",
          label: "of sound quality depends on the master's craftsmanship, only 20% — on the wood",
          note: "Even beech can sound wonderful in a master's hands. And the reverse is true too — rosewood won't shine if poorly made.",
        },
        statFloor: {
          value: "from 120,000 ₸",
          label: "The starting price of a professional dombra",
          note: "This price includes an instrument made from base woods, without decorative side patterns or a silver plate. Once you've chosen a model, you can pick materials and decorations to fit your taste and budget.",
        },
        callouts: [
          { label: "Neck — stability", note: "Made from a very hard wood, because soft wood gets pressed and deformed by the fingers over time." },
          { label: "Fretboard — durability", note: "A hardwood veneer with ornaments protects the soft soundboard from wear — without it, the soundboard's soft wood wears down quickly from constant finger strikes while playing." },
          { label: "Body — shapes the timbre", note: "Made from a hard, dense wood that reflects sound inside the body and shapes the instrument's timbre." },
          { label: "Soundboard — carries the vibration", note: "Made from a soft, resonant, evenly structured wood that transmits and amplifies the strings' vibration well." },
        ],
        formula: ["Model price", "Wood types", "Decorations", "Final price"],
        varietyScale: {
          labels: ["Basic", "Mid-range", "Rare", "Exotic"],
          note: "They differ in price, drying time, difficulty to work with, and acoustics — over 40 types of wood in total.",
        },
      },
      {
        type: "partShowcase",
        partLabel: "Soundboard",
        title: "The",
        titleAccent: "soundboard",
        description:
          "The soundboard carries the strings' vibration and largely defines the character, softness and depth of the sound. The top plate with an internal brace is considered the most important part of the dombra. A decorative veneer of hardwood is applied to it — it both decorates the instrument with a pattern and protects the soundboard from wear during play.",
        cheapLabel: "cheaper",
        expensiveLabel: "pricier",
        ladder: [
          { name: "Angara pine", note: "an accessible Siberian wood with an even structure, gives a warm, rich sound with pronounced lows" },
          { name: "Canadian spruce", note: "light and stiff at once, the benchmark material for soundboards among the world's string-instrument makers, gives a bright, clear sound" },
          { name: "Tian Shan spruce", note: "a rare mountain wood with narrow growth rings, grown in Kazakhstan's harsh conditions, gives a deep, rich sound with a long sustain" },
        ],
        extraBox: {
          title: "Neck, fretboard, headstock and pegs",
          groups: [
            { label: "Base", options: ["Beech", "Maple"] },
            { label: "Second fretboard layer", options: ["Hornbeam", "Ebony"] },
          ],
        },
      },
      {
        type: "partShowcase",
        partLabel: "Back body",
        title: "The back",
        titleAccent: "body",
        description: "The body shapes the instrument's timbre — from soft and warm to bright and ringing. The desired color can be achieved with stain.",
        cheapLabel: "cheaper",
        expensiveLabel: "pricier",
        ladder: [
          { name: "Birch" },
          { name: "Beech" },
          { name: "Maple" },
          { name: "Walnut" },
          { name: "Curly birch" },
          { name: "Mahogany" },
          { name: "Rosewood" },
        ],
      },
      ,
      {
        type: "comparisonCards",
        title: "You decide",
        titleAccent: "the final price",
        modelLabel: "Model · Bastau",
        cards: [
          {
            price: "120,000 ₸",
            tier: "Basic",
            specs: [
              { label: "Soundboard: Angara pine", included: true },
              { label: "Back body: beech / birch / maple", included: true },
              { label: "No side patterns", included: false },
              { label: "No neck patterns", included: false },
              { label: "No silver plate", included: false },
            ],
          },
          {
            price: "155,000 ₸",
            tier: "Mid-tier",
            specs: [
              { label: "Soundboard: Angara pine", included: true },
              { label: "Back body: maple", included: true },
              { label: "Side patterns included", included: true },
              { label: "No neck patterns", included: false },
              { label: "No silver plate", included: false },
            ],
          },
          {
            price: "275,000 ₸",
            tier: "Premium",
            premium: true,
            specs: [
              { label: "Soundboard: Tian Shan spruce", included: true },
              { label: "Back body: rosewood", included: true },
              { label: "Side patterns included", included: true },
              { label: "Neck pattern included", included: true },
              { label: "925 silver plate included", included: true },
            ],
          },
        ],
        note: "Any dombra can be put together to fit your taste and budget. Dozens of combinations are available.",
        tags: ["Mahogany, no decoration", "Basic version with silver plate", "Premium woods without decor", "Custom combination"],
      },
    ],
    tr: [
      {
        type: "p",
        text: "\"Dombra için en iyi ağaç hangisi?\" en sık duyduğumuz soru. Kısa bir cevabı yok: enstrümanın farklı parçaları farklı ağaçlardan yapılır ve her ağaç sesten dayanıklılığa kadar kendi görevini üstlenir. Parça parça inceleyelim.",
      },
      {
        type: "priceBreakdown",
        title: "Neden birbirine benzeyen iki dombra",
        titleAccent: "farklı fiyatlanır?",
        description:
          "Fiyat tasarıma değil, ustaya, ağaca ve ek süslemelere bağlıdır. Ustalarımızın deneyimi en az 10 yıldan başlar, baş ustamız ise 1998'den beri dombra yapmaktadır.",
        thesis:
          "Profesyonel bir dombra asla tek bir ağaç türünden yapılmaz — her parça kendi görevini üstlenir, bu yüzden her biri için ayrı bir ağaç seçilir.",
        statPercent: {
          value: "%80",
          label: "ses kalitesi ustanın becerisine, sadece %20'si ağaç türüne bağlıdır",
          note: "Kayın bile bir ustanın elinde harika ses verebilir. Tersi de doğrudur — gül ağacı kötü yapılırsa parlayamaz.",
        },
        statFloor: {
          value: "120.000 ₸'den",
          label: "Profesyonel bir dombranın başlangıç fiyatı",
          note: "Bu fiyata, dekoratif yan desenler ve gümüş kaplama olmadan, temel ağaçlardan yapılmış bir enstrüman dahildir. Modeli seçtikten sonra malzemeleri ve süslemeleri zevkinize ve bütçenize göre seçebilirsiniz.",
        },
        callouts: [
          { label: "Sap — kararlılık", note: "Çok sert bir ağaçtan yapılır, çünkü yumuşak ağaç zamanla parmakların altında ezilip deforme olur." },
          { label: "Klavye — dayanıklılık", note: "Sert ağaçtan desenli kaplama, yumuşak tablayı aşınmaya karşı korur — bu olmadan tablanın yumuşak ağacı çalarken sürekli parmak vuruşlarından hızla yıpranır." },
          { label: "Gövde — tınıyı şekillendirir", note: "Gövde içinde sesi yansıtan ve enstrümanın tınısını şekillendiren sert, yoğun bir ağaçtan yapılır." },
          { label: "Tabla — titreşimi taşır", note: "Tellerin titreşimini iyi ileten ve güçlendiren, eşit yapılı yumuşak, rezonanslı bir ağaçtan yapılır." },
        ],
        formula: ["Model fiyatı", "Ağaç türleri", "Süslemeler", "Son fiyat"],
        varietyScale: {
          labels: ["Basit", "Orta", "Nadir", "Egzotik"],
          note: "Fiyat, kuruma süresi, işleme zorluğu ve akustik açısından farklılık gösterir — 40'tan fazla ağaç türü.",
        },
      },
      {
        type: "partShowcase",
        partLabel: "Üst tabla",
        title: "Üst",
        titleAccent: "tabla",
        description:
          "Tabla tellerin titreşimini taşır ve sesin karakterini, yumuşaklığını ve derinliğini büyük ölçüde belirler. İçinde bir gergi çubuğu bulunan üst tabla, dombranın en önemli parçası sayılır. Tablaya sert ağaçtan dekoratif bir kaplama uygulanır — bu hem enstrümanı bir desenle süsler hem de çalarken tablayı aşınmaya karşı korur.",
        cheapLabel: "ucuz",
        expensiveLabel: "pahalı",
        ladder: [
          { name: "Angara çamı", note: "eşit yapılı, ulaşılabilir bir Sibirya ağacı, belirgin bas tonlarla sıcak, dolgun bir ses verir" },
          { name: "Kanada ladini", note: "hem hafif hem sert, dünya telli çalgı üreticileri için standart tabla malzemesi, parlak ve net bir ses verir" },
          { name: "Tanrı Dağları ladini", note: "Kazakistan'ın zorlu koşullarında yetişen, dar büyüme halkalı nadir bir dağ ağacı, uzun sustainli derin, dolgun bir ses verir" },
        ],
        extraBox: {
          title: "Sap, klavye, kafa ve burgular",
          groups: [
            { label: "Temel", options: ["Kayın", "Akçaağaç"] },
            { label: "Klavyenin ikinci katmanı", options: ["Gürgen", "Abanoz"] },
          ],
        },
      },
      {
        type: "partShowcase",
        partLabel: "Arka gövde",
        title: "Arka",
        titleAccent: "gövde",
        description: "Gövde, enstrümanın tınısını şekillendirir — yumuşak ve sıcaktan parlak ve çınlayana kadar. İstenen renk vernikle elde edilebilir.",
        cheapLabel: "ucuz",
        expensiveLabel: "pahalı",
        ladder: [
          { name: "Huş" },
          { name: "Kayın" },
          { name: "Akçaağaç" },
          { name: "Ceviz" },
          { name: "Kıvrımlı huş" },
          { name: "Maun" },
          { name: "Gül ağacı" },
        ],
      },
      ,
      {
        type: "comparisonCards",
        title: "Son fiyatı",
        titleAccent: "siz belirlersiniz",
        modelLabel: "Model · Bastau",
        cards: [
          {
            price: "120.000 ₸",
            tier: "Temel",
            specs: [
              { label: "Üst tabla: Angara çamı", included: true },
              { label: "Arka gövde: kayın / huş / akçaağaç", included: true },
              { label: "Yan desen yok", included: false },
              { label: "Sap deseni yok", included: false },
              { label: "Gümüş kaplama yok", included: false },
            ],
          },
          {
            price: "155.000 ₸",
            tier: "Orta",
            specs: [
              { label: "Üst tabla: Angara çamı", included: true },
              { label: "Arka gövde: akçaağaç", included: true },
              { label: "Yan desen var", included: true },
              { label: "Sap deseni yok", included: false },
              { label: "Gümüş kaplama yok", included: false },
            ],
          },
          {
            price: "275.000 ₸",
            tier: "Premium",
            premium: true,
            specs: [
              { label: "Üst tabla: Tanrı Dağları ladini", included: true },
              { label: "Arka gövde: gül ağacı", included: true },
              { label: "Yan desen var", included: true },
              { label: "Sap deseni var", included: true },
              { label: "925 ayar gümüş kaplama var", included: true },
            ],
          },
        ],
        note: "Herhangi bir dombra, zevkinize ve bütçenize göre birleştirilebilir. Onlarca farklı kombinasyon mevcuttur.",
        tags: ["Süslemesiz maun", "Gümüş kaplamalı temel versiyon", "Dekorsuz pahalı ağaçlar", "Özel kombinasyon"],
      },
    ],
  },
};
