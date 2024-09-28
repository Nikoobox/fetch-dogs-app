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
  const hasFavorites = !!favorites.length;

  return (
    <>
      <Box mb={1} display="flex" alignItems="center" width="100%" gap={0.5}>
        <FavoriteIcon sx={{ color: "red", width: 16, height: 16 }} />
        <Typography variant="h6">Favorites</Typography>
      </Box>

      <Box display="flex" gap={2} flexWrap="wrap">
        {!hasFavorites && (
          <Paper elevation={1} sx={{ padding: 1.5, width: "300px" }}>
            <Typography variant="subtitle2" color="grey">
              (Search for dogs, add them to the Favorites list, and generate
              perfect match!)
            </Typography>
          </Paper>
        )}
        {favorites.map(({ id, name, breed, age }) => (
          <Paper
            elevation={1}
            sx={{ padding: 1.5, position: "relative", width: "150px" }}
            key={id}
          >
            <Box display="flex" alignItems="center">
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "130px",
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "130px",
                  }}
                >
                  {breed}
                </Typography>
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

        {hasFavorites && (
          <Box my="auto">
            <Button
              size="small"
              onClick={onGenerateMatch}
              disableElevation
              color="primary"
            >
              Generate Match
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Favorites;
