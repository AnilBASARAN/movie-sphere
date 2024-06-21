import React from "react";

const Stars: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  const filledStars = Math.floor(rating);
  const remainder = rating - filledStars;

  for (let i = 1; i <= 5; i++) {
    if (i <= filledStars) {
      stars.push(
        <span key={i} className="text-yellow-400 text-xs sm:text-lg">
          &#9733;
        </span>
      );
    } else if (remainder > 0 && i === filledStars + 1) {
      stars.push(
        <span key={i} className="relative inline-block">
          <span
            className="absolute"
            style={{ width: `${remainder * 100}%`, overflow: "hidden" }}
          >
            <span className="text-yellow-400 text-xs sm:text-lg">&#9733;</span>
          </span>
          <span className="text-gray-700 text-xs sm:text-lg">&#9733;</span>
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-700 text-xs sm:text-lg">
          &#9733;
        </span>
      );
    }
  }
  return <div>{stars}</div>;
};

export default Stars;
