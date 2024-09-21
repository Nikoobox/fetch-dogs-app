import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid2 as Grid,
  Container,
  Box,
} from "@mui/material";

import { fetchBreedsAPI, fetchDogsAPI, DogSearchReturnType } from "../../api";
import BreedsAutocomplete from "../BreedsAutocomplete";

const SearchPage: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState<string>(""); // Single zip code input
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number | string>("");
  const [ageMax, setAgeMax] = useState<number | string>("");
  const [searchResults, setSearchResults] =
    useState<DogSearchReturnType | null>(null);
  console.log("zipCodes", zipCodes);
  useEffect(() => {
    const handleFetchBreeds = async () => {
      try {
        const breeds = await fetchBreedsAPI();
        console.log("breeds", breeds);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    handleFetchBreeds();
  }, []);

  const handleAddZipCode = () => {
    if (zipCode) {
      setZipCodes([...zipCodes, zipCode]);
      setZipCode("");
    }
  };

  const handleSearch = async () => {
    try {
      const searchParams = {
        breeds: breeds || undefined,
        zipCodes: zipCodes.filter((zip) => zip), // Filter out empty zip codes
        ageMin: ageMin ? Number(ageMin) : undefined,
        ageMax: ageMax ? Number(ageMax) : undefined,
      };

      const data = await fetchDogsAPI(searchParams);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  const hasZipCodes = !!zipCodes.length;

  console.log("searchResults", searchResults);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 8,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4">Search for Dogs</Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <BreedsAutocomplete setBreeds={setBreeds} selectedBreeds={breeds} />

            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                label="Zip Code"
                value={zipCode}
                type="number"
                onChange={(e) => setZipCode(e.target.value)}
                variant="outlined"
                fullWidth
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
                  style={{
                    whiteSpace: "nowrap",
                  }}
                  disableElevation
                >
                  Clear All
                </Button>
              )}
            </Box>
            {hasZipCodes && (
              <Box display="flex" gap={1}>
                {zipCodes.map((zCode) => (
                  <Box>{zCode}</Box>
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
                  inputProps={{
                    min: 0,
                  }}
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
                  inputProps={{
                    min: 0,
                  }}
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

        <Grid size={{ xs: 12 }}>
          {/* {searchResults && searchResults?.dogs.length > 0 ? (
            <div>
              <Typography variant="h6">Search Results:</Typography>
              <ul>
                {searchResults.dogs.map((dog) => (
                  <li key={dog.id}>
                    <Typography>
                      {dog.name} - {dog.breed}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Typography>No results found.</Typography>
          )} */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchPage;
