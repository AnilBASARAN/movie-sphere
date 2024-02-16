import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MainContext } from "./context.js";
import {
  API_URL,
  IMG_URL,
  searchURL,
  getMovies,
  Movie,
  genres,
  GENRE_URL,
} from "@/pages/api/api";

const data = "";

function Movies() {
  return (
    <MainContext.Provider value={""}>
      <Header />

      <Footer />
    </MainContext.Provider>
  );
}

export default Movies;
