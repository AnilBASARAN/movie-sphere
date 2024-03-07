import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import { useState } from "react";

export default function Ratings() {
  const [value, setValue] = useState<number | null>();
  console.log(value);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        sx={{
          fontSize: "2.5rem",
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
        }}
      />
    </Box>
  );
}
