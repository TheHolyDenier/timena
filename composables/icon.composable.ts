import flatten from 'lodash/flatten';

export const useIcon = () => {
  const credits = [
    { author: 'Faithtoken', icons: ['card-discard'] },
    {
      author: 'Delapouite',
      icons: [
        'card-joker',
        'wood-cabin',
        'barbarian',
        'dwarf-face',
        'female-vampire',
        'vampire-dracula',
        'fish-monster',
        'goblin-head',
        'goblin-camp',
        'golem-head',
        'ogre',
        'orc-head',
        'wizard-face',
        'woman-elf-face',
        'dagger-rose',
        'trash-can',
        'pencil'
      ]
    },
    { author: 'Kier Heyl', icons: ['dwarf-helmet', 'elf-helmet'] },
    { author: 'Skoll', icons: ['troll', 'hearts'] },
    {
      author: 'Lorc',
      icons: ['diablo-skull', 'dragon-head', 'visored-helm', 'carrion']
    },
    { author: 'sbed', icons: ['cancel'] }
  ];

  const icons = flatten(credits.map((credit) => credit.icons));

  return { credits, icons };
};
