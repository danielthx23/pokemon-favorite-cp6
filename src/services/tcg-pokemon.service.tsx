
import { PokemonCardsResponse } from "@/types/pokemonCards.type";

const getApiUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_DECK_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_DECK_API_URL is not defined");
  }
  return url;
};

export async function getPokemonCards(page: number, perPage: number): Promise<PokemonCardsResponse> {
  try {
    const url = `${getApiUrl()}/cards?page=${page}&pageSize=${perPage}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch cards: ${response.statusText}`);
    }

    const data: PokemonCardsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon cards:", error);
    throw error;
  }
}

export async function getPokemonCardsById(pokemonId: string, page: number, perPage: number): Promise<PokemonCardsResponse> {
  try {
    const query = encodeURIComponent(pokemonId);
    const url = `${getApiUrl()}/cards?q=id:${query}&page=${page}&pageSize=${perPage}&orderby=number,name`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch card by ID: ${res.statusText}`);
    }

    const data: PokemonCardsResponse = await res.json();

    console.log("Response from getPokemonCardsById:", data);

    return data;  

  } catch (error) {
    console.error(`Error fetching Pokémon card by ID: ${pokemonId}`, error);
    return { data: [], page: 0, pageSize: 0, count: 0, totalCount: 0 }; 
  }
}

export async function getPokemonCardsByName(name: string, page: number = 1, perPage: number): Promise<PokemonCardsResponse> {
  try {
    const url = `${getApiUrl()}/cards?q=name:${name}&page=${page}&pageSize=${perPage}&orderby=number,name`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch card by name: ${res.statusText}`);
    }

    const data: PokemonCardsResponse = await res.json();

    return data; 

  } catch (error) {
    console.error(`Error fetching Pokémon card by name: ${name}`, error);
    return { data: [], page: 0, pageSize: 0, count: 0, totalCount: 0 };  
  }
}
