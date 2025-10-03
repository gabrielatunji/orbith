export interface Domain {
  id: number;
  name: string;
  rating: number;   // e.g. 9.5
  domain: string;   // ".eth" | ".sol"
  rarity: number;   // e.g. 95 (means 95%)
  length: number;   // number of characters
  age: number;      // number of years
  owner: string;
  price: number;    // e.g. 125.5
  coin: string;     // "ETH" | "SOL"
}
