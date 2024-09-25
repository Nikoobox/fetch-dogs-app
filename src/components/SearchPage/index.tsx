import { useEffect, FC, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { debounce } from "lodash";

import {
  TextField,
  Button,
  Typography,
  Grid2 as Grid,
  Container,
  Box,
  Paper,
} from "@mui/material";

import { DogSearchParams } from "../../api";
import BreedsAutocomplete from "../BreedsAutocomplete";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { onFetchBreeds, onSearchDogs } from "../../features/dogs";
import Table from "../Table";
import ZipCodes from "../ZipCodes";

const SearchPage: FC = () => {
  const dispatch = useAppDispatch();
  const dogsState = useAppSelector((state) => state.dogs);
  const { dogDetails, isLoading, queryParams } = dogsState;
  console.log("STATE dogsState", dogsState);

  const [_searchParams, setSearchParams] = useSearchParams();

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
          if (queryParams?.from) {
            dispatch(onSearchDogs({ queryParams }));

            setSearchParams(
              qs.stringify(queryParams, {
                skipNulls: true,
                arrayFormat: "brackets",
              })
            );
          }
        }
      }
    };

    const debouncedScrollHandler = debounce(handleScroll, 500); // 500ms delay

    const currentTable = tableRef.current;
    currentTable?.addEventListener("scroll", debouncedScrollHandler);

    return () => {
      currentTable?.removeEventListener("scroll", debouncedScrollHandler);
    };
  }, [dispatch, isLoading, queryParams?.from]);

  const handleSearch = () => {
    const newSearchParams: DogSearchParams = {
      breeds: selectedBreeds.length ? selectedBreeds : undefined,
      zipCodes: zipCodes.filter((zip) => zip),
      ageMin: ageMin ? Number(ageMin) : undefined,
      ageMax: ageMax ? Number(ageMax) : undefined,
      from: undefined,
      sort: "breed:asc",
    };
    console.log("newSearchParams", newSearchParams);
    dispatch(onSearchDogs({ queryParams: newSearchParams, isNewSort: true }));

    const updatedParams = {
      // ...Object.fromEntries(searchParams), // Preserve existing params (keep for now)
      ...newSearchParams,
    };

    setSearchParams(
      qs.stringify(updatedParams, { skipNulls: true, arrayFormat: "brackets" })
    );
  };

  const handleSort = (field: "breed" | "name" | "age" | "zip_code") => {
    const currentSortOrder =
      queryParams?.sort?.split(":")[0] === field &&
      queryParams.sort.endsWith("asc")
        ? "desc"
        : "asc";

    const newQueryParams: DogSearchParams = {
      breeds: selectedBreeds.length ? selectedBreeds : undefined,
      zipCodes: zipCodes.filter((zip) => zip),
      ageMin: ageMin ? Number(ageMin) : undefined,
      ageMax: ageMax ? Number(ageMax) : undefined,
      from: undefined,
      sort: `${field}:${currentSortOrder}`,
    };

    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }

    setSearchParams(
      qs.stringify(newQueryParams, { skipNulls: true, arrayFormat: "brackets" })
    );
    console.log("### handleSort newQueryParams", newQueryParams);

    dispatch(onSearchDogs({ queryParams: newQueryParams, isNewSort: true }));
  };

  const hasDogDetails = !!dogDetails.length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <Paper elevation={1} sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Search for Dogs
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <BreedsAutocomplete
                setBreeds={setSelectedBreeds}
                selectedBreeds={selectedBreeds}
              />

              <Grid container spacing={2}>
                <Grid size={{ xs: 2 }}>
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
                <Grid size={{ xs: 2 }}>
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
                <Grid size={{ xs: 8 }}>
                  <ZipCodes
                    zipCode={zipCode}
                    setZipCode={setZipCode}
                    zipCodes={zipCodes}
                    setZipCodes={setZipCodes}
                  />
                </Grid>
              </Grid>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  disableElevation
                >
                  Search
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ marginTop: "16px" }}>
          {hasDogDetails ? (
            <Table
              dogData={dogDetails}
              isLoading={isLoading}
              tableRef={tableRef}
              onSort={handleSort}
              sortInfo={queryParams?.sort}
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
