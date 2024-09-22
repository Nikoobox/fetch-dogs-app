import qs from "qs";

import {
  call,
  put,
  takeEvery,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";

import {
  onFetchBreeds,
  onFetchBreedsSuccess,
  onFetchBreedsError,
  onSearchDogs,
  onSearchDogsSuccess,
  onSearchDogsError,
  onMatchDog,
  onMatchDogSuccess,
  onMatchDogError,
} from "../../features/dogs";
import {
  fetchBreedsAPI,
  fetchDogsAPI,
  fetchDogDetailsAPI,
  fetchDogMatchAPI,
  DogSearchReturnType,
  DogProps,
  MatchProps,
} from "../../api";

function* handleFetchBreeds(): Generator<
  CallEffect<string[]> | PutEffect<any>,
  void,
  any
> {
  try {
    const breeds = yield call(fetchBreedsAPI);
    yield put(onFetchBreedsSuccess(breeds));
  } catch (error: any) {
    yield put(onFetchBreedsError(error?.message || "Error fetching breeds"));
  }
}

function* handleSearchDogs(
  action: ReturnType<typeof onSearchDogs>
): Generator<
  CallEffect<DogSearchReturnType | DogProps[]> | PutEffect<any>,
  void,
  any
> {
  try {
    const searchResults: DogSearchReturnType = yield call(
      fetchDogsAPI,
      action.payload
    );
    const dogDetails: DogProps[] = yield call(
      fetchDogDetailsAPI,
      searchResults.resultIds
    );

    const nextUrl = searchResults?.next || ""; // Use an empty string if next is null
    const queryString = nextUrl.split("?")[1]; // Get the part after the ?

    let queryParams = {}; // Default to an empty object
    if (queryString) {
      queryParams = qs.parse(queryString); // Use qs to parse the query string
    }
    // console.log("SAGAS searchResults", searchResults);
    // console.log("SAGAS dogDetails", dogDetails);

    yield put(onSearchDogsSuccess({ searchResults, dogDetails, queryParams }));
  } catch (error: any) {
    yield put(onSearchDogsError(error?.message || "Error searching for dogs"));
  }
}

function* handleMatchDogs(
  action: ReturnType<typeof onMatchDog> // Adjust according to your action type
): Generator<CallEffect<MatchProps> | PutEffect<any>, void, any> {
  try {
    const match = yield call(fetchDogMatchAPI, action.payload);
    // const
    yield put(onMatchDogSuccess(match)); // Adjust your success action
  } catch (error: any) {
    yield put(onMatchDogError(error?.message || "Error matching dogs")); // Adjust your error action
  }
}

export function* dogsSaga() {
  yield takeEvery(onFetchBreeds, handleFetchBreeds);
  yield takeEvery(onSearchDogs, handleSearchDogs);
  yield takeEvery(onMatchDog, handleMatchDogs);
}
