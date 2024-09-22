import { authLoginAPI, authLogoutAPI, ApiReturnType } from "./auth";
import {
  fetchBreedsAPI,
  fetchDogsAPI,
  fetchDogDetailsAPI,
  fetchDogMatchAPI,
  DogSearchReturnType,
  DogSearchParams,
  DogProps,
  MatchProps,
} from "./dogs";

export {
  authLoginAPI,
  authLogoutAPI,
  fetchBreedsAPI,
  fetchDogsAPI,
  fetchDogDetailsAPI,
  fetchDogMatchAPI,
};

export type {
  DogSearchReturnType,
  ApiReturnType,
  DogSearchParams,
  DogProps,
  MatchProps,
};
