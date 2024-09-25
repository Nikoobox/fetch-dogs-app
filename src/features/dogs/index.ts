import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DogSearchReturnType,
  DogSearchParams,
  DogProps,
  MatchProps,
} from "../../api";

interface SortingOptions {
  sortField: "breed" | "name" | "age";
  sortOrder: "asc" | "desc";
}

interface DogsState {
  breeds: string[];
  searchResults: DogSearchReturnType | null;
  dogDetails: DogProps[];
  matchingDog: MatchProps | null;
  isLoading: boolean;
  error: string | null;
  queryParams: DogSearchParams | null;
  sorting?: SortingOptions;
}

const initialState: DogsState = {
  breeds: [],
  searchResults: null,
  dogDetails: [],
  isLoading: false,
  error: null,
  matchingDog: null,
  queryParams: null,
};

interface OnSearchDogsSuccessActionType {
  searchResults: DogSearchReturnType;
  dogDetails: DogProps[];
  queryParams: DogSearchParams | null;
  isNewSort?: boolean;
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

    onSearchDogs: (
      state,
      _action: PayloadAction<{
        queryParams: DogSearchParams;
        isNewSort?: boolean;
      }>
    ) => {
      state.isLoading = true;
    },
    onSearchDogsSuccess: (
      state,
      action: PayloadAction<OnSearchDogsSuccessActionType>
    ) => {
      const { searchResults, dogDetails, queryParams, isNewSort } =
        action.payload;

      state.isLoading = false;
      state.searchResults = searchResults;

      if (isNewSort) {
        state.dogDetails = dogDetails;
      } else {
        state.dogDetails = [...state.dogDetails, ...dogDetails];
      }

      state.queryParams = queryParams;
    },
    onSearchDogsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // FUTURE
    // onMatchDog: (state, _action: PayloadAction<string[]>) => {
    //   state.isLoading = true;
    // },
    // onMatchDogSuccess: (state, action: PayloadAction<MatchProps>) => {
    //   state.isLoading = false;
    //   state.matchingDog = action.payload;
    // },
    // onMatchDogError: (state, action: PayloadAction<string>) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export const {
  onFetchBreeds,
  onFetchBreedsSuccess,
  onFetchBreedsError,
  onSearchDogs,
  onSearchDogsSuccess,
  onSearchDogsError,
  // onMatchDog,
  // onMatchDogSuccess,
  // onMatchDogError,
} = dogsSlice.actions;

export default dogsSlice.reducer;
