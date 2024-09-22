import { useEffect, FC, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import qs from "qs"; // Importing 'qs' for query string handling

import {
  TextField,
  Button,
  Typography,
  Grid2 as Grid,
  Container,
  Box,
} from "@mui/material";

import { DogSearchParams } from "../../api";
import BreedsAutocomplete from "../BreedsAutocomplete";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { onFetchBreeds, onSearchDogs } from "../../features/dogs";
import Table from "../Table";

const SearchPage: FC = () => {
  const dispatch = useAppDispatch();
  const dogsState = useAppSelector((state) => state.dogs);
  const { dogDetails, isLoading, queryParams } = dogsState;

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState<string>("");
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number | string>("");
  const [ageMax, setAgeMax] = useState<number | string>("");
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(onFetchBreeds());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableRef.current;

        if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
          console.log(
            ' sx={{ maxHeight: "400px", overflowY: "auto" }}',
            scrollTop + clientHeight >= scrollHeight - 50 && !isLoading
          );
          if (queryParams?.from) {
            dispatch(onSearchDogs(queryParams));

            setSearchParams(qs.stringify(queryParams, { skipNulls: true }));
          }
        }
      }
    };

    const currentTable = tableRef.current;
    currentTable?.addEventListener("scroll", handleScroll);

    return () => {
      currentTable?.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, isLoading, queryParams?.from]);

  const handleAddZipCode = () => {
    if (zipCode) {
      setZipCodes([...zipCodes, zipCode]);
      setZipCode("");
    }
  };
  const handleSearch = () => {
    const newSearchParams: DogSearchParams = {
      breeds: selectedBreeds.length ? selectedBreeds : undefined,
      zipCodes: zipCodes.filter((zip) => zip),
      ageMin: ageMin ? Number(ageMin) : undefined,
      ageMax: ageMax ? Number(ageMax) : undefined,
      from: undefined,
    };
    dispatch(onSearchDogs(newSearchParams));

    const updatedParams = {
      ...Object.fromEntries(searchParams), // Preserve existing params (this could be deleted)
      ...newSearchParams, // Add new search parameters
    };

    setSearchParams(qs.stringify(updatedParams, { skipNulls: true }));
  };

  const hasZipCodes = !!zipCodes.length;
  const hasDogDetails = !!dogDetails.length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6">Search for Dogs</Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <BreedsAutocomplete
              setBreeds={setSelectedBreeds}
              selectedBreeds={selectedBreeds}
            />

            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                label="Zip Code"
                value={zipCode}
                type="number"
                onChange={(e) => setZipCode(e.target.value)}
                variant="outlined"
                fullWidth
                size="small"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddZipCode}
                disableElevation
              >
                Add
              </Button>
              {hasZipCodes && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setZipCodes([])}
                  style={{ whiteSpace: "nowrap" }}
                  disableElevation
                >
                  Clear All
                </Button>
              )}
            </Box>
            {hasZipCodes && (
              <Box display="flex" gap={1}>
                {zipCodes.map((zCode) => (
                  <Box key={zCode}>{zCode}</Box>
                ))}
              </Box>
            )}
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Minimum Age"
                  type="number"
                  value={ageMin}
                  onChange={(e) =>
                    setAgeMin(Number(e.target.value) < 0 ? 0 : e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                  inputProps={{ min: 0 }}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Maximum Age"
                  type="number"
                  value={ageMax}
                  onChange={(e) =>
                    setAgeMax(Number(e.target.value) < 0 ? 0 : e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                  inputProps={{ min: 0 }}
                  size="small"
                />
              </Grid>
            </Grid>

            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disableElevation
            >
              Search
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }} sx={{ marginTop: "16px" }}>
          {hasDogDetails ? (
            <Table
              dogData={dogDetails}
              isLoading={isLoading}
              tableRef={tableRef}
            />
          ) : (
            <Typography>No results found.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchPage;
