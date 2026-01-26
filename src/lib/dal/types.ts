// se definió el contrato de datos para `game` usado por el dal
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

// se definió el contrato de datos para `sponsor` usado por el dal
export interface Sponsor {
  id: string;
  name: string;
  logo: { src: string; alt: string };
  websiteUrl?: string;
  tagline?: string;
  priority?: number;
}

// se definió el contrato de datos para `promotion` usado por el dal
export interface Promotion {
  id: string;
  gameId: string;
  label:  "Promocionado" ;
  weight?: number;
  reason?: string;
  startsAt?: string;
  endsAt?: string;
}

// se definió la forma del objeto `database` que fue cargado desde db.json
export interface Database {
  games: Game[];
  sponsors: Sponsor[];
  promotions: Promotion[];
}
