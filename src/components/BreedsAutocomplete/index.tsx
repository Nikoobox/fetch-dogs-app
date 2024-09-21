import { SyntheticEvent, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { fetchBreedsAPI } from "../../api";

const BreedsAutocomplete = ({
  setBreeds,
  selectedBreeds,
}: {
  setBreeds: (breeds: string[]) => void;
  selectedBreeds: string[];
}) => {
  const [breeds, setBreedsList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch the breeds from the API
  useEffect(() => {
    const loadBreeds = async () => {
      setLoading(true);
      try {
        const fetchedBreeds = await fetchBreedsAPI();
        setBreedsList(fetchedBreeds);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBreeds();
  }, []);

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string[]
  ) => {
    setBreeds(value); // Update with selected breeds
  };

  return (
    <Autocomplete
      multiple // Enable multiple selection
      options={breeds} // Options are the list of breeds
      getOptionLabel={(option) => option} // Display each breed as a string
      loading={loading} // Show a loading indicator while fetching data
      value={selectedBreeds} // Set the current selected breeds
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label="Search Breeds" variant="outlined" />
      )}
    />
  );
};

export default BreedsAutocomplete;
