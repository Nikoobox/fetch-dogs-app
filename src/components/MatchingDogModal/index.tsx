import { FC } from "react";
import { Modal, Paper, Typography, Box, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { DogProps } from "../../api";

interface MatchingDogModalProps {
  matchingDog: DogProps | null;
  onClose: () => void;
}

const MatchingDogModal: FC<MatchingDogModalProps> = ({
  matchingDog,
  onClose,
}) => {
  if (!matchingDog) return null;

  const { name, zip_code, breed, age, img } = matchingDog;
  return (
    <Modal
      open={Boolean(matchingDog)}
      onClose={onClose}
      aria-labelledby="matching-dog-modal"
      aria-describedby="matching-dog-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          padding: 4,
          maxWidth: 400,
          margin: "auto",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            color: "text.primary",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box display="flex" flexDirection="column">
          <Typography variant="h5" id="matching-dog-modal" mb={1}>
            You have a match!
          </Typography>
          <Box>
            <img
              src={img}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: 8,
              }}
              alt={`${name} the ${breed}`}
            />
          </Box>
          <Typography id="matching-dog-description">Name: {name}</Typography>
          <Typography>Breed: {breed}</Typography>
          <Typography>Age: {age}</Typography>
          <Typography>Zip Code: {zip_code}</Typography>
        </Box>
      </Paper>
    </Modal>
  );
};

export default MatchingDogModal;
