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
    const searchResults = yield call(fetchDogsAPI, qp);
    const dogDetails = yield call(fetchDogDetailsAPI, searchResults.resultIds);

    const nextUrl = searchResults?.next || "";
    const queryString = nextUrl.split("?")[1];

    let queryParams = {};
    if (isNewSort) {
      queryParams = { ...qp, size: "25", from: "25" };
    } else if (queryString && !isNewSort) {
      queryParams = qs.parse(queryString);
    }

    yield put(
      onSearchDogsSuccess({ searchResults, dogDetails, queryParams, isNewSort })
    );
  } catch (error: any) {
    yield put(onSearchDogsError(error?.message || "Error searching for dogs"));
  }
}

function* matchDogs(
  action: ReturnType<typeof onMatchDog>
): Generator<CallEffect<DogProps | DogProps[]> | PutEffect<any>, void, any> {
  const ids = action.payload.map((dog) => dog.id);
  try {
    const response = yield call(fetchDogMatchAPI, ids);
    const normalizedPayload = [response.match];

    const machedDogDetails = yield call(fetchDogDetailsAPI, normalizedPayload);
    const machedDog = machedDogDetails[0];

    yield put(onMatchDogSuccess(machedDog));
  } catch (error: any) {
    yield put(onMatchDogError(error?.message || "Error matching the dog"));
  }
}

export function* dogsSaga() {
  yield takeEvery(onFetchBreeds, handleFetchBreeds);
  yield takeEvery(onSearchDogs, handleSearchDogs);
  yield takeEvery(onMatchDog, matchDogs);
}
