import React, { useState } from "react";
import { TextField, Button, Typography, Grid2 as Grid } from "@mui/material";

const SearchPage: React.FC = () => {
  const [breed, setBreed] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]); // Replace 'any' with your Dog type when defined

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}`
      );
      const data = await response.json();
      setSearchResults(data.results); // Adjust based on the actual API response structure
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  return (
    <Grid container spacing={2} style={{ padding: "16px" }}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4">Search for Dogs</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Enter Dog Breed"
          variant="outlined"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Grid>
      <Grid size={{ xs: 12 }}>
        {searchResults.length > 0 ? (
          <div>
            <Typography variant="h6">Search Results:</Typography>
            <ul>
              {searchResults.map((dog) => (
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
        )}
      </Grid>
    </Grid>
  );
};

export default SearchPage;
