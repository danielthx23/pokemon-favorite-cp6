import { CardPokemon } from "./pokemonCard";

export interface PokemonCardsResponse {
    data: CardPokemon[];
    page: number,
    pageSize: number,
    count: number,
    totalCount: number
  }