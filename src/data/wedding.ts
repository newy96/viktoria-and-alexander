import type { FilmFrame, Godparent, GiftIdea, ProgrammeItem } from "../types/wedding";

export const couple = {
  bride: "Виктория",
  groom: "Александър",
  monogram: "V & A",
  dateLabel: "25 · 06 · 2027",
  dateShort: "25.06.2027",
  dateISO: "2027-06-25T16:00:00+03:00",
  rsvpDeadline: "1 март 2027 г.",
  venue: "Pasarel Lake Club",
  venueArea: "Долни Пасарел, София",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Pasarel+Lake+Club"
};

export const images = {
  gates: "/3af548a8-a1ef-482f-8cc2-b622b56492df.jpg",
  coupleNewspaper: "/a201c2ab-332d-4e02-a32b-5b456c9ebf4d.jpg",
  hands: "/e0dff06f-4b7c-42d9-a8e2-386aec3c432c.jpg",
  velvet: "/535e9a26-9f72-42f7-bcca-a01e95780397.jpg",
  venue: "/04705dfe-80c1-4c61-a5be-974909f49451.jpg",
  wine: "/32e3e60f-6b2d-4700-bc12-1ed3e3bcc0cb.jpg",
  table: "/4aeb689a-919b-4230-9814-025447e2714b.jpg",
  seats: "/6f8ec52b-e6ec-4c0e-baa9-fd281a5417f7.jpg",
  stage: "/ff6b3006-16fd-4c4c-96f8-ce934a3cfc49.jpg"
};

export const typedNote =
"Скъпи наши,\n\nимаме новина, която вече не можем да задържим.\n\nСлед десет години заедно решихме да го направим официално.\n\nЗапазете датата —\nи елате да го отпразнуваме заедно.\n\nС обич,\nВ. & А.";


export const filmFrames: FilmFrame[] = [
  { src: "/film_1.jpeg", alt: "Виктория и Александър – снимка 1" },
  { src: "/film_2.jpeg", alt: "Виктория и Александър – снимка 2" },
  { src: "/film_3.jpeg", alt: "Виктория и Александър – снимка 3" },
  { src: "/film_4.jpeg", alt: "Виктория и Александър – снимка 4" },
  { src: "/film_5.jpeg", alt: "Виктория и Александър – снимка 5" },
];



export const storyParagraphs = [
"Имаме удоволствието да споделим този вълшебен ден с вас — в годината, в която отбелязваме 10 години от началото на нашата история.",
"За крехката си възраст можем да се похвалим със сериозен опит — 10 години, изпълнени с любов, смях, приключения, мечти и безброй споделени моменти.",
"След толкова време дойде и нашият момент да си кажем „ДА“ и официално да станем семейство.",
"Всеки един от вас е специален за нас и има своето място в нашата история. Затова бихме искали да споделим този незабравим ден именно с вас — хората, които обичаме и ценим.",
"Очакваме ви, за да отпразнуваме заедно началото на нашето „завинаги“."];


export const godparents: Godparent[] = [
{ name: "Лиана Динкова", role: "Кума", image: "/47efc2e6-5389-4e33-938e-980cc64ee37a.jpg" },
{ name: "Александър Котаров", role: "Кум", image: "/71a3c9f4-6dd4-4b94-a86a-bd28d45366d7.jpg" }];


export const godparentLines = [
"Тя — човекът, който знае всички истории.",
"Той — човекът, който вероятно знае още няколко.",
"Заедно са хората, на които поверяваме една от най-важните роли в този ден.",
"Нашите кумове. Нашата подкрепа по пътя досега и занапред.",
"И, разбира се, официално назначените отговорници за доброто настроение."];


export const programme: ProgrammeItem[] = [
{ time: "16:00", title: "Сватбена церемония", description: "Pasarel Lake Club, Долни Пасарел" },
{ time: "17:00", title: "Сватбена фотосесия", description: "Да запечатаме най-красивите моменти от този ден." },
{ time: "18:00", title: "Сватбена вечеря", description: "Наздравици, вкусна храна и много споделени емоции." },
{ time: "• • •", title: "Парти до зори", description: "Защото 10 години любов заслужават да бъдат отпразнувани подобаващо." }];


export const gifts: GiftIdea[] = [
{ title: "Класиката", caption: "Плик с пожелания — никога не излиза от мода.", image: "/931d8f27-859c-410c-b718-c41caadb68e1.jpg" },
{ title: "Скромна яхта", caption: "За медения месец. Или за следващите десет години.", image: "/0bab07ad-09d4-44e4-b73a-4d445d8caa42.jpg" },
{ title: "Малка вила", caption: "С изглед към морето, ако обичате.", image: "/094cc6ca-b559-4363-baed-de06d4f7f24d.jpg" },
{ title: "Семеен автомобил", caption: "Бял, просторен и с място за бъдещето.", image: "/26e09754-0527-4519-95c4-e446678a0b7d.jpg" }];


export const menuOptions = [
{ value: "meat", label: "Месно" },
{ value: "fish", label: "Рибно" },
{ value: "vegetarian", label: "Вегетарианско" }] as
const;