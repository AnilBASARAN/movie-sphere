import React from "react";

function Header() {
  return (
    <header className="flex justify-center gap-8 items-center h-16 sticky top-0 left-0 right-0 bg-slate-950 z-50 ">
      <div className="flex justify-center gap-8 items-center">
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div>
          <h1>All Movies</h1>
        </div>
        <div>
          <button>Animations</button>
        </div>
        <div>
          <h3>Genres</h3>
        </div>
      </div>

      <div>
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search"
          className="w-64 h-8 rounded-3xl p-2 text-m text-black outline-none"
        />
      </div>
      <div>
        <button>Login</button>
      </div>
    </header>
  );
}

export default Header;
