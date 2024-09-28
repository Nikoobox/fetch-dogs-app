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

import { DogSearchParams, DogProps } from "../../api";
import BreedsAutocomplete from "../BreedsAutocomplete";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  onFetchBreeds,
  onSearchDogs,
  addDogToFavorites,
  removeDogFromFavorites,
  onMatchDog,
  onClearMatchDog,
  resetDogs,
} from "../../features/dogs";
import Table from "../Table";
import ZipCodes from "../ZipCodes";
import Favorites from "../Favorites";
import MatchingDogModal from "../MatchingDogModal";

const SearchPage: FC = () => {
  const dispatch = useAppDispatch();
  const dogsState = useAppSelector((state) => state.dogs);
  const { dogDetails, isLoading, queryParams, favorites, matchingDog } =
    dogsState;

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

    dispatch(onSearchDogs({ queryParams: newSearchParams, isNewSort: true }));

    setSearchParams(
      qs.stringify(newSearchParams, {
        skipNulls: true,
        arrayFormat: "brackets",
      })
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

    dispatch(onSearchDogs({ queryParams: newQueryParams, isNewSort: true }));
  };

  const handleAddDogToFavorites = (dog: DogProps) => {
    dispatch(addDogToFavorites(dog));
  };

  const handleRemoveDogFromFavorites = (dogId: string) => {
    dispatch(removeDogFromFavorites(dogId));
  };

  const generateMatch = async () => {
    dispatch(onMatchDog(favorites));
  };

  const handleCloseModal = () => {
    dispatch(onClearMatchDog());
  };

  const handleReset = () => {
    dispatch(resetDogs());

    setSelectedBreeds([]);
    setZipCode("");
    setZipCodes([]);
    setAgeMin("");
    setAgeMax("");
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, flex: 1 }}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <Paper elevation={1} sx={{ padding: 2 }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Search for Dogs
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" width="100%" alignItems="center" gap={2}>
                  <Box flex={1}>
                    <BreedsAutocomplete
                      setBreeds={setSelectedBreeds}
                      selectedBreeds={selectedBreeds}
                    />
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Button
                      variant="contained"
                      onClick={handleSearch}
                      disableElevation
                    >
                      Search
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleReset}
                      disableElevation
                    >
                      Reset
                    </Button>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 2 }}>
                    <TextField
                      label="Minimum Age"
                      type="number"
                      value={ageMin}
                      onChange={(e) =>
                        setAgeMin(
                          Number(e.target.value) < 0 ? 0 : e.target.value
                        )
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
                        setAgeMax(
                          Number(e.target.value) < 0 ? 0 : e.target.value
                        )
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
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ marginTop: 2, marginBottom: 1 }}>
            <Favorites
              favorites={favorites}
              onRemoveFromFavorites={handleRemoveDogFromFavorites}
              onGenerateMatch={generateMatch}
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ marginTop: "16px" }}>
            <Table
              dogsData={dogDetails}
              isLoading={isLoading}
              tableRef={tableRef}
              onSort={handleSort}
              sortInfo={queryParams?.sort}
              addToFavorites={handleAddDogToFavorites}
              favoriteDogs={favorites}
            />
          </Grid>
        </Grid>
      </Container>

      <MatchingDogModal matchingDog={matchingDog} onClose={handleCloseModal} />
    </>
  );
};

export default SearchPage;
