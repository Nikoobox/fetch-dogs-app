import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DogSearchReturnType,
  DogSearchParams,
  DogProps,
  MatchProps,
} from "../../api";

interface SortingOptions {
  sortField: string; // e.g., "breed" or "age"
  sortOrder: "asc" | "desc"; // or any other sorting criteria you plan to support
}

interface DogsState {
  breeds: string[];
  searchResults: DogSearchReturnType | null;
  dogDetails: DogProps[];
  matchingDog: MatchProps | null; // Added property for the matched dog ID
  isLoading: boolean;
  error: string | null;
  queryParams: DogSearchParams | null; // Store all query parameters
  sorting?: SortingOptions; // New property for sorting
}

const initialState: DogsState = {
  breeds: [],
  searchResults: null,
  dogDetails: [],
  isLoading: false,
  error: null,
  matchingDog: null,
  queryParams: null, // Initialize to null or {}
  sorting: {
    sortField: "breed", // Default sorting field
    sortOrder: "asc", // Default sorting order
  },
};

interface OnSearchDogsSuccessActionType {
  searchResults: DogSearchReturnType;
  dogDetails: DogProps[];
  queryParams: DogSearchParams | null;
}

const dogsSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    onFetchBreeds: (state) => {
      state.isLoading = true;
    },
    onFetchBreedsSuccess: (state, action: PayloadAction<string[]>) => {
      state.isLoading = false;
      state.breeds = action.payload;
    },
    onFetchBreedsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    onSearchDogs: (state, _action: PayloadAction<DogSearchParams>) => {
      state.isLoading = true;
    },
    onSearchDogsSuccess: (
      state,
      action: PayloadAction<OnSearchDogsSuccessActionType>
    ) => {
      const { searchResults, dogDetails, queryParams } = action.payload;

      state.isLoading = false;
      state.searchResults = searchResults;
      state.dogDetails = [...state.dogDetails, ...dogDetails];
      state.queryParams = queryParams;
    },
    onSearchDogsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // New actions for matching dog
    onMatchDog: (state, _action: PayloadAction<string[]>) => {
      state.isLoading = true;
    },
    onMatchDogSuccess: (state, action: PayloadAction<MatchProps>) => {
      state.isLoading = false;
      state.matchingDog = action.payload; // Set the matched dog ID
    },
    onMatchDogError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  onFetchBreeds,
  onFetchBreedsSuccess,
  onFetchBreedsError,
  onSearchDogs,
  onSearchDogsSuccess,
  onSearchDogsError,
  onMatchDog,
  onMatchDogSuccess,
  onMatchDogError,
} = dogsSlice.actions;

export default dogsSlice.reducer;
