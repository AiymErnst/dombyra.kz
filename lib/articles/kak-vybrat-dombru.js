// lib/kak-vybrat-dombru.js
//
// Статьи блога — теперь прямо в коде, без Supabase. Раньше жили в
// таблице posts с JSONB-полями title_i18n/excerpt_i18n/content_i18n —
// заполнять такую вложенную структуру через Table Editor в Supabase
// было неудобно. Теперь статья — это обычный объект в этом файле,
// правится через GitHub-редактор, как и весь остальной сайт.
//
// Формат каждой статьи такой же по смыслу, как было в базе:
// • title/excerpt — объект {ru, kz, en, tr}
// • content — объект {ru: [...блоки], kz: [...], ...}, где блок —
//   { type: "h2" | "p", text: "..." }. Если для языка блоков нет —
//   статья на этом языке считается ненаписанной (не показываем
//   наполовину переведённую статью — лучше честно 404).

export const ARTICLES = [
  {
    slug: "kak-vybrat-dombru",
    category_key: "guide",
    read_minutes: 6,
    cover_url: null,
    title: {
      ru: "Как выбрать домбру новичку",
      kz: "Жаңадан бастаушыға домбыраны қалай таңдау керек",
      en: "How to choose a dombra as a beginner",
      tr: "Yeni başlayan biri dombrayı nasıl seçmeli",
    },
    excerpt: {
      ru: "Размер, порода дерева, украшения и бюджет — разбираем по порядку, чтобы первая домбра не разочаровала.",
      kz: "Өлшем, ағаш түрі, әшекейлер және бюджет — алғашқы домбыра көңіліңізден шықпасын деп ретімен түсіндіреміз.",
      en: "Size, wood, decorations and budget — a step-by-step guide so your first dombra doesn't disappoint.",
      tr: "Ölçü, ağaç türü, süslemeler ve bütçe — ilk dombranız sizi hayal kırıklığına uğratmasın diye adım adım anlatıyoruz.",
    },
    content: {
      ru: [
        { type: "p", text: "Домбра — инструмент простой на вид, но выбор первой домбры легко превращается в путаницу: размеры, породы дерева, украшения, разброс цен от 65 до 500 тысяч тенге. Разберём по порядку, на что реально стоит обращать внимание." },
        { type: "h2", text: "Размер — начинайте отсюда" },
        { type: "p", text: "Размеры домбры принято обозначать числами вроде 42, 44, 46, 48 — это примерная длина корпуса. Меньший размер (42) удобнее для детей и людей с небольшой кистью руки, легче держать и прижимать лады. Больший размер (48) даёт более глубокий, насыщенный звук, но требует более широкого хвата. Если сомневаетесь — берите средний размер (44–46): для взрослого новичка это почти всегда комфортный выбор." },
        { type: "h2", text: "Порода дерева влияет и на звук, и на цену" },
        { type: "p", text: "Дека (верхняя часть корпуса) обычно делается из ели — она лёгкая и хорошо резонирует, поэтому звук получается ярким. Задний корпус и гриф чаще из ореха или клёна: они прочнее и добавляют инструменту глубины звучания. Дорогие породы (например, палисандр для накладки на гриф) звучат чуть иначе, но для новичка разница будет не критична — переплачивать за экзотическое дерево на первом инструменте обычно не имеет смысла." },
        { type: "h2", text: "Украшения — это красиво, но не обязательно" },
        { type: "p", text: "Серебряная накладка на голову, резные узоры сбоку корпуса, гравировка — всё это влияет на внешний вид и на цену, но не на звук и не на удобство игры. Для первой домбры разумно взять базовую версию: научиться играть, привыкнуть к инструменту, а уже потом, если появится желание, заказать что-то более украшенное — на смену или в дополнение." },
        { type: "h2", text: "Бюджет: от чего зависит итоговая цена" },
        { type: "p", text: "Цена растёт вместе с размером и сложностью отделки: базовые модели без украшений начинаются от 65 000 ₸ (42 размер), доходя до 100 000 ₸ и выше на 48 размере. Модели с серебряной накладкой, резьбой или эксклюзивным дизайном стоят дороже — это уже не про звук, а про то, насколько особенным должен быть именно ваш инструмент." },
        { type: "h2", text: "Прежде чем купить — послушайте" },
        { type: "p", text: "Если есть возможность — попросите видео или аудиозапись конкретного инструмента: у разных экземпляров даже одной модели звук может немного отличаться. И не забудьте: после покупки понадобится тюнер, чтобы настроить домбру — на dombyra.kz он бесплатный и работает прямо в браузере, через микрофон." },
      ],
      kz: [
        { type: "p", text: "Домбыра сырт көзге қарапайым көрінгенімен, алғашқы домбыраны таңдау оңай шатасуға айналады: өлшемдер, ағаш түрлері, әшекейлер, 65-тен 500 мың теңгеге дейінгі баға айырмасы. Нақты неге назар аудару керегін ретімен қарастырайық." },
        { type: "h2", text: "Өлшемнен бастаңыз" },
        { type: "p", text: "Домбыра өлшемдері әдетте 42, 44, 46, 48 сияқты сандармен белгіленеді — бұл корпустың шамамен ұзындығы. Кіші өлшем (42) балаларға және қолы кіші адамдарға ыңғайлы, ұстауы және пернелерді басу жеңіл. Үлкен өлшем (48) тереңірек, байыраң дыбыс береді, бірақ ұстауы кеңірек болады. Күмәндансаңыз — орташа өлшемді (44–46) алыңыз: ересек жаңадан бастаушыға бұл әдетте ыңғайлы таңдау болады." },
        { type: "h2", text: "Ағаш түрі дыбысқа да, бағаға да әсер етеді" },
        { type: "p", text: "Дека (корпустың үстіңгі бөлігі) әдетте шыршадан жасалады — ол жеңіл әрі жақсы резонанс береді, сондықтан дыбыс ашық шығады. Артқы корпус пен гриф көбіне жаңғақтан немесе үйеңкіден жасалады: олар мықтырақ және аспапқа терең дыбыс қосады. Қымбат тұқымдар (мысалы, гриф жапсырмасына палисандр) сәл басқаша естіледі, бірақ жаңадан бастаушы үшін бұл айырмашылық онша маңызды емес — бірінші аспапқа сирек кездесетін ағаш үшін артық төлеудің қажеті жоқ." },
        { type: "h2", text: "Әшекейлер — әдемі, бірақ міндетті емес" },
        { type: "p", text: "Басына күміс қаптама, корпустың бүйіріндегі ойма өрнектер, гравировка — бәрі сыртқы түрі мен бағасына әсер етеді, бірақ дыбысқа немесе ойнау ыңғайлылығына әсер етпейді. Алғашқы домбыра үшін базалық нұсқаны алған дұрыс: ойнауды үйреніп, аспапқа үйреніп алыңыз, ал кейін қаласаңыз, әшекейлірек нұсқаны ауыстыруға немесе қосымша тапсырыс беруге болады." },
        { type: "h2", text: "Бюджет: түпкілікті баға неге байланысты" },
        { type: "p", text: "Баға өлшем мен әрлеудің күрделілігіне қарай өседі: әшекейсіз базалық модельдер 65 000 ₸-ден басталады (42 өлшем), 48 өлшемде 100 000 ₸ және одан жоғары жетеді. Күміс қаптамасы, ойма немесе эксклюзивті дизайны бар модельдер қымбатырақ тұрады — бұл енді дыбыс туралы емес, дәл сіздің аспабыңыздың қаншалықты ерекше болуы керегі туралы." },
        { type: "h2", text: "Сатып алу алдында тыңдап көріңіз" },
        { type: "p", text: "Мүмкіндік болса — нақты аспаптың видеосын немесе аудиожазбасын сұраңыз: бір модельдің әр данасының дыбысы сәл өзгеше болуы мүмкін. Және ұмытпаңыз: сатып алғаннан кейін домбыраны бұрайтын тюнер керек болады — dombyra.kz-те ол тегін және тікелей браузерде, микрофон арқылы жұмыс істейді." },
      ],
      en: [
        { type: "p", text: "The dombra looks simple, but choosing your first one can easily turn confusing: sizes, wood types, decorations, prices ranging from 65,000 to 500,000 tenge. Let's go through what actually matters." },
        { type: "h2", text: "Start with the size" },
        { type: "p", text: "Dombra sizes are usually labeled with numbers like 42, 44, 46, 48 — roughly the body length. A smaller size (42) is easier for children and people with smaller hands — easier to hold and press the frets. A larger size (48) gives a deeper, richer sound but needs a wider grip. If unsure, go with a medium size (44–46) — a comfortable choice for most adult beginners." },
        { type: "h2", text: "Wood affects both sound and price" },
        { type: "p", text: "The soundboard (top of the body) is usually spruce — light and resonant, giving a bright sound. The back and neck are more often walnut or maple, which are sturdier and add depth to the tone. Pricier woods (like rosewood for the fretboard) sound slightly different, but for a beginner the difference rarely matters — paying extra for an exotic wood on a first instrument usually isn't worth it." },
        { type: "h2", text: "Decorations are nice, but not essential" },
        { type: "p", text: "A silver headstock plate, carved patterns on the sides, engraving — all of this affects the look and the price, not the sound or how comfortable it is to play. For a first dombra, the base version is a sensible choice: learn to play, get used to the instrument, and later, if you want, order something more decorated." },
        { type: "h2", text: "Budget: what drives the final price" },
        { type: "p", text: "Price rises with size and finishing complexity: basic undecorated models start around 65,000 ₸ (size 42), reaching 100,000 ₸ and up at size 48. Models with a silver plate, carving, or an exclusive design cost more — that's no longer about sound, but about how special your particular instrument should be." },
        { type: "h2", text: "Listen before you buy" },
        { type: "p", text: "If possible, ask for a video or audio recording of the specific instrument — even copies of the same model can sound a little different. And don't forget: after buying, you'll need a tuner — on dombyra.kz it's free and works right in the browser through the microphone." },
      ],
      tr: [
        { type: "p", text: "Dombra dışarıdan basit görünür, ama ilk dombrayı seçmek kolayca kafa karıştırabilir: ölçüler, ağaç türleri, süslemeler, 65 binden 500 bin tenge'ye kadar değişen fiyatlar. Gerçekten nelere dikkat etmeniz gerektiğini sırayla ele alalım." },
        { type: "h2", text: "Ölçüden başlayın" },
        { type: "p", text: "Dombra ölçüleri genellikle 42, 44, 46, 48 gibi sayılarla belirtilir — bu, gövdenin yaklaşık uzunluğudur. Küçük ölçü (42) çocuklar ve eli küçük olanlar için daha uygundur, tutması ve perdelere basması kolaydır. Büyük ölçü (48) daha derin ve dolgun bir ses verir, ama daha geniş bir kavrama gerektirir. Emin değilseniz orta ölçüyü (44–46) tercih edin — yetişkin bir yeni başlayan için genellikle rahat bir seçimdir." },
        { type: "h2", text: "Ağaç türü hem sesi hem fiyatı etkiler" },
        { type: "p", text: "Tabla (gövdenin üst kısmı) genellikle ladindir — hafif ve iyi rezonans verir, bu yüzden ses parlak çıkar. Arka gövde ve sap daha çok ceviz veya akçaağaçtan yapılır: bunlar daha sağlamdır ve enstrümana derinlik katar. Daha pahalı ağaçlar (örneğin klavye için gül ağacı) biraz farklı ses verir, ama yeni başlayan biri için bu fark genellikle önemli değildir — ilk enstrümanda egzotik bir ağaç için fazla ödeme yapmak çoğu zaman gerekmez." },
        { type: "h2", text: "Süslemeler güzeldir ama şart değildir" },
        { type: "p", text: "Gümüş baş kaplaması, gövde yanlarındaki oyma desenler, gravür — bunların hepsi görünümü ve fiyatı etkiler, sesi veya çalma rahatlığını değil. İlk dombra için temel versiyonu almak mantıklıdır: çalmayı öğrenin, enstrümana alışın, sonra isterseniz daha süslü bir versiyon sipariş edebilirsiniz." },
        { type: "h2", text: "Bütçe: son fiyatı ne belirler" },
        { type: "p", text: "Fiyat, ölçü ve işçilik karmaşıklığıyla birlikte artar: süslemesiz temel modeller yaklaşık 65.000 ₸'den başlar (42 ölçü), 48 ölçüde 100.000 ₸ ve üzerine çıkar. Gümüş kaplama, oyma veya özel tasarımlı modeller daha pahalıdır — bu artık sesle değil, enstrümanınızın ne kadar özel olması gerektiğiyle ilgilidir." },
        { type: "h2", text: "Satın almadan önce dinleyin" },
        { type: "p", text: "Mümkünse belirli enstrümanın video veya ses kaydını isteyin — aynı modelin farklı örnekleri bile biraz farklı ses verebilir. Ve unutmayın: satın aldıktan sonra bir akort aletine ihtiyacınız olacak — dombyra.kz'de bu ücretsizdir ve doğrudan tarayıcıda, mikrofon aracılığıyla çalışır." },
      ],
    },
  },
];

// ── помощники — те же имена/поведение, что были в lib/posts.js ──

export function getArticles() {
  return ARTICLES;
}

export function getArticle(slug) {
  return ARTICLES.find((a) => a.slug === slug) || null;
}

export function pick(map, locale) {
  if (!map || typeof map !== "object") return "";
  if (map[locale]) return map[locale];
  for (const code of ["ru", "kz", "en", "tr"]) if (map[code]) return map[code];
  return "";
}

export function articleBlocks(article, locale) {
  const c = article?.content;
  if (!c || typeof c !== "object") return [];
  return Array.isArray(c[locale]) ? c[locale] : [];
}

export function firstParagraph(article, locale) {
  const b = articleBlocks(article, locale).find((x) => x.type === "p");
  return b ? b.text : pick(article.excerpt, locale);
}

export function availableLocales(article) {
  const c = article?.content;
  if (!c || typeof c !== "object") return [];
  return Object.keys(c).filter((l) => Array.isArray(c[l]) && c[l].length > 0);
}
