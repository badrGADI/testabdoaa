export enum ConservationStatus {
  LeastConcern = 'Least Concern',
  NearThreatened = 'Near Threatened',
  Vulnerable = 'Vulnerable',
  Endangered = 'Endangered',
  CriticallyEndangered = 'Critically Endangered',
  ExtinctInWild = 'Extinct in the Wild',
  Extinct = 'Extinct',
  DataDeficient = 'Data Deficient'
}

export interface BirdSpecies {
  id: string;
  slug: string;
  commonName: string;
  scientificName: string;
  order: string;
  family: string;
  description: string;
  identification: string;
  habitat: string;
  diet: string;
  conservationStatus: ConservationStatus;
  region: string[];
  funFact: string;
  imageUrl?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
}

export interface TaxonomyNode {
  name: string;
  type: 'Order' | 'Family' | 'Species';
  children?: TaxonomyNode[];
  count?: number;
}
