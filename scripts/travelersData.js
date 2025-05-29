const travelersData = [
  {
    id: 1,
    name: 'Таня Фирсова',
    photo: 'images/avatars/firsova.webp',
    likes: '1,5 M',
    tags: ['ЗОЖ', 'ПП', 'Фитнес', 'пляж', 'авокадо', 'смузи'],
    destinations: [
      { country: 'ШРИ-ЛАНКА', flag: 'images/flags/SriLanka.webp' },
      { country: 'ТАИЛАНД', flag: 'images/flags/Thailand.webp' },
      { country: 'СЕЙШЕЛЫ', flag: 'images/flags/Seychelles.webp' }
    ],
    transport: ['plane'],
    level: 99,
    nameStatus: 'traveler__name--blue'
  },
  {
    id: 2,
    name: 'Петя Демин',
    photo: 'images/avatars/demin.webp',
    likes: '1500',
    tags: ['бургер', 'бар', 'футбол', 'концерт', 'крафт'],
    destinations: [
      { country: 'БЕЛЬГИЯ', flag: 'images/flags/Belgium.webp' },
      { country: 'ЧЕХИЯ', flag: 'images/flags/Czech.webp' }
    ],
    transport: ['plane', 'car', 'walk'],
    level: 80,
    nameStatus: 'traveler__name--heart'
  },
  {
    id: 3,
    name: 'Марк Смолов',
    photo: 'images/avatars/smolov.webp',
    likes: '170',
    tags: ['рэп', 'тату', 'хайпбист', 'кроссовки', 'суприм'],
    destinations: [
      { country: 'США', flag: 'images/flags/USA.webp' },
      { country: 'АВСТРАЛИЯ', flag: 'images/flags/Australia.webp' },
      { country: 'ДОМИНИКА', flag: 'images/flags/Dominica.webp' }
    ],
    transport: ['plane', 'bike'],
    level: 25,
    nameStatus: 'traveler__name--heart'
  },
  {
    id: 4,
    name: 'Лариса Роговая',
    photo: 'images/avatars/rogovaya.webp',
    likes: '23',
    tags: ['образование', 'карьера', 'учеба', 'линкедин'],
    destinations: [
      { country: 'ВЕЛИКОБРИТАНИЯ', flag: 'images/flags/UK.webp' },
      { country: 'ГЕРМАНИЯ', flag: 'images/flags/Germany.webp' }
    ],
    transport: ['plane', 'car'],
    level: 50,
    nameStatus: 'traveler__name--green'
  }
];

export default travelersData;