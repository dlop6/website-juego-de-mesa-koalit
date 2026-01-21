export interface Game {
  id: string;
  name: string;
  price: { amount: number; currency: "GTQ" };
  rating: { value: number; scale: 5; count?: number };
  themes: string[];
  shortDescription: string;
  image: { src: string; alt: string };
  purchaseUrl?: string;
  players?: { min: number; max: number };
  durationMinutes?: { min: number; max?: number };
  age?: { min: number };
  complexity?: 1 | 2 | 3 | 4 | 5;
  mechanics?: string[];
  publisher?: string;
  releaseYear?: number;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: { src: string; alt: string };
  websiteUrl?: string;
  tagline?: string;
  priority?: number;
}

export interface Promotion {
  id: string;
  gameId: string;
  label:  "Promocionado" ;
  weight?: number;
  reason?: string;
  startsAt?: string;
  endsAt?: string;
}

export interface Database {
  games: Game[];
  sponsors: Sponsor[];
  promotions: Promotion[];
}
