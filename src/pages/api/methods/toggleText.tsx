import { useState } from "react";

function TextContainer({ text }: any) {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="container">
      <div className={showFullText ? "text" : "line-clamp-4"}>{text}</div>
      {text.length > 450 && (
        <button
          className="underline text-gray-500 hover:text-gray-200"
          onClick={toggleText}
        >
          {showFullText ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default TextContainer;
