import { FC } from "react";
import { Typography, Button, Box, Paper, IconButton } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import { DogProps } from "../../api";

interface FavoritesProps {
  favorites: DogProps[];
  onRemoveFromFavorites: (dogId: string) => void;
  onGenerateMatch: () => void;
}

const Favorites: FC<FavoritesProps> = ({
  favorites,
  onRemoveFromFavorites,
  onGenerateMatch,
}) => {
  return (
    <>
      <Box
        mb={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        minWidth="100%"
      >
        <Box display="flex" alignItems="center" gap={0.5}>
          <FavoriteIcon sx={{ color: "red", width: 16, height: 16 }} />
          <Typography variant="h6">Favorites</Typography>
        </Box>
        {favorites.length > 0 && (
          <Button
            size="small"
            variant="outlined"
            onClick={onGenerateMatch}
            disableElevation
          >
            Generate Match
          </Button>
        )}
      </Box>

      <Box display="flex" gap={2}>
        {favorites.map(({ id, name, breed, age }) => (
          <Paper
            elevation={1}
            sx={{ padding: 1.5, position: "relative", minWidth: "100px" }}
          >
            <Box display="flex" alignItems="center">
              <Box>
                <Typography sx={{ fontWeight: 600 }}>{name}</Typography>
                <Typography variant="subtitle2">{breed}</Typography>
                <Typography variant="subtitle2">Age: {age}</Typography>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={() => onRemoveFromFavorites(id)}
              sx={{
                color: "black",
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "transparent",
              }}
            >
              <CloseIcon
                fontSize="small"
                sx={{ width: "16px", height: "16px" }}
              />
            </IconButton>
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default Favorites;
