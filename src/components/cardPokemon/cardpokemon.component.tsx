'use client'

import { CardPokemon } from "@/types/pokemonCard";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface CardProps {
  card: CardPokemon
}

const CardComponent = ({ card: {id, name, hp, types, images} }: CardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id)); 
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updatedFavorites = favorites.filter((favId: string) => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white flex flex-col p-2 rounded-md">
      <figure>
        <Image src={images.large} width={400} height={500} alt={`Card of ${name}`} className="w-full h-fit rounded-lg" />
      </figure>
      <h1 className="text-md font-bold text-neutral-950">#{id} - {name}</h1>
      <div className="flex justify-between">
        <h2 className="text-sm text-neutral-500">HP: {hp}</h2>
        {types.map((type, index) => (
          <div key={index} className="text-black bg-gray-50 rounded-lg p-1">
            {type}
          </div>
        ))}
      </div>
      <button 
        onClick={toggleFavorite}
        className={`mt-2 p-2 rounded-lg ${isFavorite ? 'bg-yellow-500' : 'bg-gray-300'} text-white`}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default CardComponent;
