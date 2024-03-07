import React, { useState, useEffect } from "react";

const TransparentImage = ({ imagePath, alt }: any) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      const opacityTimer = setInterval(() => {
        setOpacity((opacity) => {
          if (opacity <= 0) {
            clearInterval(opacityTimer); // Clear interval if opacity reaches zero
            return 0; // Ensure opacity doesn't go negative
          }
          return opacity - 0.01;
        });
      }, 30); // Change the interval duration as needed

      // Cleanup function to clear the interval when component unmounts
      return () => clearInterval(opacityTimer);
    }, 5000); // Start after 5 seconds

    // Cleanup function to clear the timeout when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <img
        src={imagePath}
        alt={alt}
        className="border-2 border-primary"
        style={{ opacity: opacity }}
      />
    </div>
  );
};

export default TransparentImage;
