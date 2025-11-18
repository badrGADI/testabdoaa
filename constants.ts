import { BirdSpecies, ConservationStatus } from './types';

export const MOCK_FEATURED_BIRDS: BirdSpecies[] = [
  {
    id: 'harpy-eagle',
    slug: 'harpy-eagle',
    commonName: 'Harpy Eagle',
    scientificName: 'Harpia harpyja',
    order: 'Accipitriformes',
    family: 'Accipitridae',
    description: 'The Harpy Eagle is a neotropical species of eagle. It is also called the American harpy eagle to distinguish it from the Papuan eagle.',
    identification: 'Massive size, double crest features.',
    habitat: 'Tropical rainforest',
    diet: 'Mammals',
    conservationStatus: ConservationStatus.NearThreatened,
    region: ['South America', 'Central America'],
    funFact: 'Its talons are as large as grizzly bear claws.',
    imageUrl: 'https://picsum.photos/seed/harpy/800/600'
  },
  {
    id: 'snowy-owl',
    slug: 'snowy-owl',
    commonName: 'Snowy Owl',
    scientificName: 'Bubo scandiacus',
    order: 'Strigiformes',
    family: 'Strigidae',
    description: 'The Snowy Owl is a large, white owl of the true owl family. Snowy owls are native to Arctic regions.',
    identification: 'Mostly white plumage, yellow eyes.',
    habitat: 'Tundra',
    diet: 'Lemmings',
    conservationStatus: ConservationStatus.Vulnerable,
    region: ['North America', 'Eurasia'],
    funFact: 'Males are almost pure white, while females have more dark spots.',
    imageUrl: 'https://picsum.photos/seed/snowy/800/600'
  },
  {
    id: 'resplendent-quetzal',
    slug: 'resplendent-quetzal',
    commonName: 'Resplendent Quetzal',
    scientificName: 'Pharomachrus mocinno',
    order: 'Trogoniformes',
    family: 'Trogonidae',
    description: 'Known for its colorful plumage and long tail covert feathers.',
    identification: 'Green body, red breast, extremely long tail streamers.',
    habitat: 'Cloud forest',
    diet: 'Fruit, Insects',
    conservationStatus: ConservationStatus.NearThreatened,
    region: ['Central America'],
    funFact: 'Considered divine by Aztec and Maya civilizations.',
    imageUrl: 'https://picsum.photos/seed/quetzal/800/600'
  }
];

export const NAVIGATION_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Species', path: '/species/harpy-eagle' }, // Example link
  { name: 'Taxonomy', path: '/taxonomy' },
  { name: 'News', path: '/news' },
];
