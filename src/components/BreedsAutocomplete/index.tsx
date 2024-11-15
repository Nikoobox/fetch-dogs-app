import { SyntheticEvent, FC } from "react";
import { Autocomplete, TextField } from "@mui/material";

interface Props {
  setBreeds: (breeds: string[]) => void;
  selectedBreeds: string[];
  breeds: string[];
}

const BreedsAutocomplete: FC<Props> = ({
  setBreeds,
  selectedBreeds,
  breeds,
}: Props) => {
  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string[]
  ) => {
    setBreeds(value);
  };

  return (
    <Autocomplete
      multiple
      options={breeds}
      limitTags={5}
      getOptionLabel={(option) => option}
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
