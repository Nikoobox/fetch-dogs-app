import { FC } from "react";
import { TextField, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AddCircleOutline as AddCircleOutlineIcon } from "@mui/icons-material";

interface ZipCodesProps {
  zipCode: string;
  setZipCode: (value: string) => void;
  zipCodes: string[];
  setZipCodes: (codes: string[]) => void;
}

const ZipCodes: FC<ZipCodesProps> = ({
  zipCode,
  setZipCode,
  zipCodes,
  setZipCodes,
}) => {
  const handleAddZipCode = () => {
    if (zipCode) {
      setZipCodes([...zipCodes, zipCode]);
      setZipCode("");
    }
  };

  const handleDeleteZipCode = (index: number) => {
    const filteredZipCodes = zipCodes.filter((_, i) => i !== index);
    setZipCodes(filteredZipCodes);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      flexDirection={{ xs: "column", sm: "row" }}
    >
      <Box sx={{ width: { xs: "100%", sm: "35%" } }} display="flex">
        <TextField
          label="Zip Code"
          value={zipCode}
          type="number"
          onChange={(e) => setZipCode(e.target.value)}
          variant="outlined"
          fullWidth
          size="small"
        />

        <IconButton
          color="primary"
          onClick={handleAddZipCode}
          disabled={!zipCode || zipCodes.length === 5}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        gap={1}
        sx={{ width: { xs: "100%", sm: "65%" } }}
      >
        {zipCodes?.map((zCode, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              padding: "4px 8px",
              fontSize: "14px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {zCode}
            <IconButton
              size="small"
              onClick={() => handleDeleteZipCode(index)}
              sx={{
                marginLeft: 0.5,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                color: "white",
                width: "16px",
                height: "16px",
              }}
            >
              <CloseIcon
                fontSize="small"
                sx={{ width: "12px", height: "12px" }}
              />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ZipCodes;
