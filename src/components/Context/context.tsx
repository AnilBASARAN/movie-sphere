import { createContext, useContext /* useEffect */ } from "react";
import { useState } from "react";

type ThemeContext = {
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
  refreshPage: () => void;
  /*  handleMovies: (genre: any) => Promise<void>;
  genres: {
    id: number;
    name: string;
  }[]; */
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
  const [activeItem, setActiveItem] = useState<string>("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [initialMovieInfo, setInitialMovieInfo] = useState<any>("");

  // Refresh page
  const refreshPage = () => {
    window.location.reload();
  };

  /*   const ResponsiveImage = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      // Function to check the window width
      const checkWidth = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Check the width initially
      checkWidth();

      // Add event listener to update the state on window resize
      window.addEventListener("resize", checkWidth);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", checkWidth);
      };
    }, []);

    return (
      <div>
        {isMobile ? (
          <img src="/favicon.ico" alt="Mobile Image" />
        ) : (
          <img src="/logo.png" alt="Desktop Image" />
        )}
      </div>
    );
  }; */

  // Get All The Data Based On Their Type
  /*  const handleMovies = async (genre: any) => {
    if (genre.preventDefault) {
      genre.preventDefault();
      setActiveItem(genre);
      const searchResults = await getMovies(
        `${searchURL}&query=${searchTerm}&page=${1}`
      );
      setMovies(searchResults);
    } else {
      if (genre?.name) {
        setActiveItem(genre);
        const data = await getMovies(`${GENRE_URL}${genre.id}&page=${1}`);
        setMovies(data);
      } else if (genre) {
        setActiveItem(genre);
        const searchResults = await getMovies(
          `${searchURL}&query=${searchTerm}&page=${1}`
        );
        setMovies(searchResults);
      } else {
        setActiveItem("");
        const data = await getMovies(`${API_URL}&page=${1}`);
        setMovies(data);
      }
    }
  }; */

  // Fetching Datas To Components Via React Context Api
  const fetchToComponents = {
    refreshPage,
    activeItem,
    setActiveItem,
    isUserLoggedIn,
    setIsUserLoggedIn,
    initialMovieInfo,
    setInitialMovieInfo,
    /*     ResponsiveImage, */
  };

  return (
    <MainContext.Provider value={fetchToComponents}>
      {children}
    </MainContext.Provider>
  );
};
