/* import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import {
  API_URL,
  IMG_URL,
  searchURL,
  getMovies,
  Movie,
  genres,
  GENRE_URL,
} from "@/pages/api/api";

type ThemeContext = {
  movies: Movie;
  setMovies: React.Dispatch<React.SetStateAction<Movie>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
  handleToggle: () => void;
  handleAnimations: () => void;
  handleSearch: (e: any) => void;
  handleGenres: (e: any) => void;
  increaseCount: () => void;
  decreaseCount: () => void;
  refreshPage: () => void;
  handleMovies: (genre: any) => Promise<void>;
  genres: {
    id: number;
    name: string;
  }[];
};

export function useThemeContent() {
  const context = useContext(MainContext);
  if (!context) {
    console.log(context);
  }
  return context;
}

export const MainContext = createContext<ThemeContext | null>(null);

export const MainProvider = ({ children }: any) => {
  const [movies, setMovies] = useState<Movie>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("");

  // Toggle Functionality
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Get Animations
  const handleAnimations = () => {
    handleMovies({
      id: 16,
      name: "Animation",
    });
    setCount(1);
  };

  // Search Functionality
  const handleSearch = (e: any) => {
    handleMovies(e);
    setCount(1);
  };

  // Get Genres
  const handleGenres = (e: any) => {
    handleMovies(e);
    setCount(1);
  };

  // Get All The Data Based On Their Type
  const handleMovies = async (genre: any) => {
    if (genre.preventDefault) {
      genre.preventDefault();
      setActiveItem(genre);
      const searchResults = await getMovies(
        `${searchURL}&query=${searchTerm}&page=${count}`
      );
      setMovies(searchResults);
    } else {
      if (genre?.name) {
        setActiveItem(genre);
        const data = await getMovies(`${GENRE_URL}${genre.id}&page=${count}`);
        setMovies(data);
      } else if (genre) {
        setActiveItem(genre);
        const searchResults = await getMovies(
          `${searchURL}&query=${searchTerm}&page=${count}`
        );
        setMovies(searchResults);
      } else {
        setActiveItem("");
        const data = await getMovies(`${API_URL}&page=${count}`);
        setMovies(data);
      }
    }
  };

  useEffect(() => {
    handleMovies(activeItem);
  }, [count]);

  // Refresh page
  const refreshPage = () => {
    window.location.reload();
  };

  // Pagination
  const increaseCount = () => {
    if (movies.total_pages > count) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  // Fetching Datas To Components Via React Context Api
  const fetchToComponents = {
    movies,
    setMovies,
    searchTerm,
    setSearchTerm,
    count,
    setCount,
    isOpen,
    setIsOpen,
    handleToggle,
    handleSearch,
    API_URL,
    IMG_URL,
    searchURL,
    getMovies,
    genres,
    GENRE_URL,
    refreshPage,
    handleMovies,
    handleGenres,
    handleAnimations,
    increaseCount,
    decreaseCount,
    activeItem,
    setActiveItem,
  };

  return (
    <MainContext.Provider value={fetchToComponents}>
      {children}
    </MainContext.Provider>
  );
}; */

import { createContext, useContext } from "react";

const MainContext = createContext();

export { MainContext, useContext };
