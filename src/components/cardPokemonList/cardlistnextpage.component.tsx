'use client'

import { useState, useEffect } from 'react'
import { CardPokemon } from '@/types/pokemonCard'
import CardComponent from '../cardPokemon/cardpokemon.component'
import { getPokemonCards, getPokemonCardsByName } from '@/services/tcg-pokemon.service'
import Loader from '../loader/loader.component'
import SearchBar from '../searchBar/searchbar.component'

interface CardListComponentsProps {
  perPage?: number
}

const CardListNextPageComponent = ({ perPage = 9 }: CardListComponentsProps) => {
  const [cards, setCards] = useState<CardPokemon[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    getCards()
  }, [page, searchQuery]) 

  const getCards = async () => {
    if (loading || !hasMore) {
      return
    }

    setLoading(true)

    try {
      let data
      if (searchQuery.trim()) {
        data = await getPokemonCardsByName(searchQuery, page, perPage)
      } else {
        data = await getPokemonCards(page, perPage)
      }

      if (data?.data?.length) {
        setCards((prevCards) => [...prevCards, ...data.data])
      }
      
      if (data?.data?.length === 0 || data.totalCount <= cards.length) {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error fetching Pokémon cards:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1) 
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPage(1)
    setCards([])
    setHasMore(true)
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {cards.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </section>

      <footer className="container mx-auto p-4 mt-8 text-center col-span-full">
        {loading ? (
          <Loader />
        ) : hasMore ? (
          <button
            onClick={loadMore}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            Load More
          </button>
        ) : (
          <p className="text-gray-600">No more Pokémon cards to load</p>
        )}
      </footer>
    </div>
  )
}

export default CardListNextPageComponent
