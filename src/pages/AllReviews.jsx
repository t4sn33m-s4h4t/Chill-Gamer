import React, { useState, useEffect } from 'react';
import GameCards from '../components/GameCards/GameCards';
import Loading from '../pages/Loading';
import { useLoaderData } from 'react-router-dom';
import Title from '../components/title/Title';

export default function AllReviews() {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const data = useLoaderData();
  const [games, setGames] = useState(data);
  const [sortOption, setSortOption] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSort = async () => {
    if (!sortOption) return;
    setIsLoading(true);
    try {
      const routeAddress = `${VITE_BACKEND_URL}reviews/sort?field=${sortOption}`;
      const response = await fetch(routeAddress);
      const data = await response.json();
      
      setGames(data);
    } catch (error) {
      console.error('Error fetching sorted data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = async () => {
    if (!genreFilter) return
    setIsLoading(true);
    try {
      const routeAddress = `${VITE_BACKEND_URL}reviews/filter?genre=${genreFilter}`;
      console.log(routeAddress)
      const response = await fetch(routeAddress);
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    } finally {
      setIsLoading(false);

    }
  };
  useEffect(() => {
    if (sortOption && sortOption != "All") {
      handleSort();
    } else if (genreFilter && genreFilter != "All") {
      handleFilter();
    } else {
      setGames(data);
    }
  }, [sortOption, genreFilter]);

  const clearFilters = () => {
    setSortOption('');
    setGenreFilter('');
    setGames(data);
  };

  return (
    <div className="p-5 font-sans">
      <Title text={"All Reviews"} />
      <div className="flex flex-col flex-wrap justify-between items-end gap-4 mb-5 w-[80%] mx-auto">
        <div className="w-full">
          <label htmlFor="sort" className="block font-bold mb-2">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => {
              setGenreFilter('')
              setSortOption(e.target.value)
            }}
            className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none"
          >
            <option value="All">Select</option>
            <option value="rating-ascending">Rating (Ascending)</option>
            <option value="rating-descending">Rating (Descending)</option>
            <option value="publishingYear-ascending">Year (Ascending)</option>
            <option value="publishingYear-descending">Year (Descending)</option>
          </select>
        </div>

        <div className="w-full">
          <label htmlFor="filter" className="block font-bold mb-2">
            Filter By Genre:
          </label>
          <select
            id="filter"
            value={genreFilter}
            onChange={(e) => {
              setSortOption('')
              setGenreFilter(e.target.value)
            }}
            className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none"
          >
            <option value="All">All Genres</option>
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Adventure">Adventure</option>
            <option value="Strategy">Strategy</option>
            <option value="Simulation">Simulation</option>
            <option value="Sports">Sports</option>
            <option value="Horror">Horror</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Fighting">Fighting</option>
            <option value="Racing">Racing</option>
          </select>
        </div>

        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200"
        >
          Clear Filters
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <GameCards games={games} />
      )}
    </div>
  );
}
