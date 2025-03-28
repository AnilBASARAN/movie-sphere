"use client"; // Ensure this runs on the client side

import clsx from "clsx";
import { useRouter } from "next/navigation";

interface UserNavigationProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const allGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const Navigator = ({ selectedTab, setSelectedTab }: UserNavigationProps) => {
  const router = useRouter(); // Use Next.js router

  return (
    <div className="justify-center flex flex-wrap gap-2">
      {allGenres.map(({ id, name }) => (
        <div
          key={id}
          onClick={() => {
            setSelectedTab(name);
            router.push(`/genres/${name}`); // Navigate with Next.js router
          }}
          className={clsx(
            "nav-link text-active-primary ms-0 me-10 cursor-pointer badge mx-1 my-1 badge-secondary",
            { active: selectedTab === name }
          )}
        >
          {name.toLocaleUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default Navigator;
