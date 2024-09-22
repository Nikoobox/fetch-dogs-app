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
    setBreeds(value); // Set the selected breeds from the Autocomplete
  };

  return (
    <Autocomplete
      multiple
      options={breeds}
      getOptionLabel={(option) => option}
      loading={loading}
      value={selectedBreeds}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Breeds"
          variant="outlined"
          size="small"
        />
      )}
    />
  );
};

export default BreedsAutocomplete;
