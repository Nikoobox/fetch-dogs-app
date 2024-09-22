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
  const { queryParams: qp, isNewSort } = action.payload;

  try {
    const searchResults: DogSearchReturnType = yield call(fetchDogsAPI, qp);
    const dogDetails: DogProps[] = yield call(
      fetchDogDetailsAPI,
      searchResults.resultIds
    );

    const nextUrl = searchResults?.next || "";
    const queryString = nextUrl.split("?")[1];

    let queryParams = {};
    if (isNewSort) {
      queryParams = { ...qp, size: "25", from: "25" }; // Use qs to parse the query string
    } else if (queryString && !isNewSort) {
      queryParams = qs.parse(queryString); // Use qs to parse the query string
    }

    yield put(
      onSearchDogsSuccess({ searchResults, dogDetails, queryParams, isNewSort })
    );
  } catch (error: any) {
    yield put(onSearchDogsError(error?.message || "Error searching for dogs"));
  }
}

function* handleMatchDogs(
  action: ReturnType<typeof onMatchDog>
): Generator<CallEffect<MatchProps> | PutEffect<any>, void, any> {
  try {
    const match = yield call(fetchDogMatchAPI, action.payload);

    yield put(onMatchDogSuccess(match));
  } catch (error: any) {
    yield put(onMatchDogError(error?.message || "Error matching dogs"));
  }
}

export function* dogsSaga() {
  yield takeEvery(onFetchBreeds, handleFetchBreeds);
  yield takeEvery(onSearchDogs, handleSearchDogs);
  yield takeEvery(onMatchDog, handleMatchDogs);
}
