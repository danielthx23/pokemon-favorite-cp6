'use client'

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSearch(searchQuery) 
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Busque um Pokémon..."
          className="w-full p-2 border border-gray-300 text-black rounded-l-lg"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-r-lg"
        >
          Buscar
        </button>
      </form>
    </div>
  )
}

export default SearchBar
