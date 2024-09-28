import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DogSearchReturnType, DogSearchParams, DogProps } from "../../api";

interface DogsState {
  breeds: string[];
  searchResults: DogSearchReturnType | null;
  dogDetails: DogProps[];
  matchingDog: DogProps | null;
  isLoading: boolean;
  error: string | null;
  queryParams: DogSearchParams | null;
  favorites: DogProps[];
}

const initialState: DogsState = {
  breeds: [],
  searchResults: null,
  dogDetails: [],
  isLoading: false,
  error: null,
  matchingDog: null,
  queryParams: null,
  favorites: [],
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
      state.matchingDog = null;
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

    addDogToFavorites: (state, action: PayloadAction<DogProps>) => {
      const dogToAdd = action.payload;
      state.favorites.push(dogToAdd);
    },
    removeDogFromFavorites: (state, action: PayloadAction<string>) => {
      const dogIdToRemove = action.payload;
      state.favorites = state.favorites.filter(
        (dog) => dog.id !== dogIdToRemove
      );
    },

    onMatchDog: (state, _action: PayloadAction<DogProps[]>) => {
      state.isLoading = true;
    },
    onMatchDogSuccess: (state, action: PayloadAction<DogProps>) => {
      state.isLoading = false;
      state.matchingDog = action.payload;
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
  addDogToFavorites,
  removeDogFromFavorites,
  onMatchDog,
  onMatchDogSuccess,
  onMatchDogError,
} = dogsSlice.actions;

export default dogsSlice.reducer;
