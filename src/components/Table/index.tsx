import { FC, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Add as AddIcon,
} from "@mui/icons-material";

import { DogProps } from "../../api";

interface DogTableProps {
  dogsData: DogProps[];
  isLoading: boolean;
  tableRef?: React.Ref<HTMLDivElement>;
  onSort: (field: "breed" | "name" | "age") => void;
  sortInfo: string | undefined;
  addToFavorites: (dog: DogProps) => void;
  favoriteDogs: DogProps[];
}

const DogTable: FC<DogTableProps> = ({
  dogsData,
  isLoading,
  tableRef,
  onSort,
  sortInfo,
  addToFavorites,
  favoriteDogs,
}) => {
  const [sortField, sortDirection] = sortInfo
    ? sortInfo.split(":")
    : [null, null];

  const hasFetchedDogsData = !!dogsData.length;

  const renderSortIcon = (field: string) => {
    if (sortField === field) {
      return sortDirection === "asc" ? (
        <ArrowUpwardIcon fontSize="small" />
      ) : (
        <ArrowDownwardIcon fontSize="small" />
      );
    }
    return null;
  };

  const favoriteDogIds = useMemo(
    () => favoriteDogs.map((fDog) => fDog.id),
    [favoriteDogs]
  );

  if (!hasFetchedDogsData && isLoading) {
    return (
      <Box
        width="100%"
        height="150px"
        mx="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress
          sx={{
            color: "black",
          }}
        />
      </Box>
    );
  }

  if (!hasFetchedDogsData) {
    return null;
  }

  return (
    <div style={{ position: "relative" }}>
      {isLoading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            color: "black",
          }}
        />
      )}
      <Typography variant="h6" gutterBottom sx={{ marginBottom: 1 }}>
        Dogs Results
      </Typography>
      <TableContainer
        component={Paper}
        ref={tableRef}
        sx={{
          maxHeight: "400px",
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => onSort("breed")}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  sx={{ display: "flex", gap: 0.5, fontWeight: "bold" }}
                >
                  Breed {renderSortIcon("breed")}
                </Typography>
              </TableCell>
              <TableCell
                onClick={() => onSort("name")}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  sx={{ display: "flex", gap: 0.5, fontWeight: "bold" }}
                >
                  Name {renderSortIcon("name")}
                </Typography>
              </TableCell>
              <TableCell
                onClick={() => onSort("age")}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  sx={{ display: "flex", gap: 0.5, fontWeight: "bold" }}
                >
                  Age {renderSortIcon("age")}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  sx={{ display: "flex", gap: 0.5, fontWeight: "bold" }}
                >
                  Zip Code
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{ display: "flex", gap: 0.5, fontWeight: "bold" }}
                >
                  Image
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{ display: "flex", gap: 0.5, fontWeight: "bold" }}
                >
                  Add to Favorites
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dogsData.map((dog) => {
              const { id, breed, name, age, zip_code, img } = dog;
              return (
                <TableRow key={id}>
                  <TableCell>{breed}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{age}</TableCell>
                  <TableCell>{zip_code}</TableCell>
                  <TableCell>
                    <img
                      src={img}
                      alt="Dog"
                      style={{
                        borderRadius: "50%",
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => addToFavorites(dog)}
                      disabled={
                        favoriteDogIds.includes(id) ||
                        favoriteDogIds.length >= 5
                      }
                      color={
                        favoriteDogIds.includes(id) ? "default" : "primary"
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DogTable;
