
export interface Images {
  small: string,
  large: string
}

export interface CardPokemon {
    id: string;
    name: string;
    hp: number;
    types: string[];
    images: Images
  }