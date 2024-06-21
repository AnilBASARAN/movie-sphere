import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import { /* useContext, useEffect,  */ useState } from "react";
/* import { auth } from "@/config/firebase";
import { MainContext } from "@/components/Context/context"; */

export default function Ratings({
  movies,
  submitMovie,
  updateMovie,
  deleteMovie,
  initialValue,
}: any) {
  const [value, setValue] = useState<number | null>(initialValue);

  const handleValue = (newValue: number | null) => {
    // Attempt submission
    const submissionResult = submitMovie(movies, newValue);

    // If submission fails, attempt update
    if (!submissionResult) {
      updateMovie(movies, newValue);
    }
  };

  const handleDelete = async () => {
    if (value !== 0) {
      await deleteMovie(movies);
      window.location.reload();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px",
        color: "rgb(30 41 59)",
        "&:hover": {
          color: "rgb(148 163 184)",
        },
      }}
    >
      <button
        onClick={handleDelete}
        className="text-[10px] -px-4 mr-1 py-1 hover:text-white hover:font-bold transition-colors "
      >
        {/* {initialValue !== 0 ? <span>&#10005;</span> : " "} */}
        &#10005;
      </button>
      <Rating
        sx={{
          fontSize: {
            xs: "1.5rem",
            lg: "2.5rem",
          },
        }}
        name="text-feedback"
        precision={0.5}
        emptyIcon={
          <StarIcon
            style={{ opacity: 1, color: "rgb(12, 17, 27)" }}
            fontSize="inherit"
          />
        }
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleValue(newValue);
        }}
      />
    </Box>
  );
}
