import React from "react";

function Pagination({ movies, currentPage, goToPage }: any) {
  return (
    <div className="flex justify-center gap-3 mb-3 text-lg lg:text-base ">
      {currentPage == 1 ? (
        <div
          className={`flex justify-center items-center  w-11 text-gray-600 mr-5  `}
        >
          <button disabled>Previous</button>
        </div>
      ) : (
        <div
          className={`flex justify-center items-center  w-11 mr-5  hover:text-green-400 `}
        >
          <button onClick={() => goToPage(currentPage - 1)}>Previous</button>
        </div>
      )}
      {currentPage > 2 && (
        <div className="flex justify-center items-center hover:text-green-400 ">
          <button onClick={() => goToPage(1)}>1</button>
        </div>
      )}
      {currentPage > 3 && (
        <div className="flex justify-center items-center  ">
          <span>...</span>
        </div>
      )}
      {currentPage - 1 != 0 && (
        <div className="flex justify-center items-center hover:text-green-400 ">
          <button onClick={() => goToPage(currentPage - 1)}>
            {" "}
            {currentPage - 1}{" "}
          </button>
        </div>
      )}

      <div className="flex justify-center items-center  ">
        <span className="text-green-400"> {currentPage} </span>
      </div>
      {currentPage + 1 < movies.total_pages && currentPage + 1 < 500 && (
        <div className="flex justify-center items-center hover:text-green-400 ">
          <button onClick={() => goToPage(currentPage + 1)}>
            {currentPage + 1}
          </button>
        </div>
      )}
      {movies.total_pages >= 2 &&
        currentPage + 1 < movies.total_pages &&
        currentPage + 1 < 500 &&
        movies.total_pages > 4 && (
          <div className="flex justify-center items-center  ">
            <span>...</span>
          </div>
        )}
      {movies.total_pages > 2 &&
        currentPage < 500 &&
        movies.total_pages != currentPage && (
          <div className="flex justify-center items-center min-w-4 hover:text-green-400 ">
            <button
              onClick={() =>
                goToPage(movies.total_pages > 500 ? 500 : movies.total_pages)
              }
            >
              {" "}
              {movies.total_pages > 500 ? 500 : movies.total_pages}{" "}
            </button>
          </div>
        )}
      {currentPage == movies.total_pages || currentPage == 500 ? (
        <div
          className={`flex justify-center items-center  w-11 text-gray-600 `}
        >
          <button disabled>Next</button>
        </div>
      ) : (
        <div
          className={`flex justify-center items-center hover:text-green-400 w-11 `}
        >
          <button onClick={() => goToPage(currentPage + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Pagination;
