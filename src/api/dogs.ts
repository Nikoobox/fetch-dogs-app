import qs from "qs";

const BASE_URL = " https://frontend-take-home-service.fetch.com";

export interface DogProps {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface MatchProps {
  match: string;
}

export interface DogSearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: string;
  sort?: string; // e.g., "breed:asc" or "age:desc"
}

export interface DogSearchReturnType {
  resultIds: string[];
  total: number;
  dogs: DogProps[];
  next?: string;
  prev?: string;
}

const fetchBreedsAPI = async (): Promise<string[]> => {
  const BREEDS_URL = `${BASE_URL}/dogs/breeds`;

  try {
    const response = await fetch(BREEDS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include the auth cookie
    });

    if (response.ok) {
      const breeds = await response.json();
      return breeds;
    } else {
      throw new Error("Failed to fetch dog breeds.");
    }
  } catch (_error) {
    throw new Error("Failed to fetch dog breeds.");
  }
};

const fetchDogsAPI = async (
  searchParams: DogSearchParams
): Promise<DogSearchReturnType> => {
  const DOGS_SEARCH_URL = `${BASE_URL}/dogs/search`;
  console.log("API searchParams", searchParams);
  try {
    const queryParams = qs.stringify(searchParams, {
      arrayFormat: "brackets",
      skipNulls: true,
    });
    console.log("--->>> API fetchDogsAPI queryParams", queryParams);
    const response = await fetch(`${DOGS_SEARCH_URL}?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch dogs.");
    }
  } catch (_error) {
    throw new Error("Failed to fetch dogs.");
  }
};

const fetchDogDetailsAPI = async (dogIds: string[]): Promise<DogProps[]> => {
  const DOGS_DETAILS_URL = `${BASE_URL}/dogs`;

  try {
    const response = await fetch(DOGS_DETAILS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dogIds),
    });

    if (response.ok) {
      const dogs = await response.json();
      return dogs;
    } else {
      throw new Error("Failed to fetch dog details.");
    }
  } catch (_error) {
    throw new Error("Failed to fetch dog details.");
  }
};

const fetchDogMatchAPI = async (dogIds: string[]): Promise<MatchProps> => {
  const DOGS_MATCH_URL = `${BASE_URL}/dogs/match`;

  try {
    const response = await fetch(DOGS_MATCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dogIds),
    });

    if (response.ok) {
      const match = await response.json();
      return match;
    } else {
      throw new Error("Failed to fetch dog match.");
    }
  } catch (_error) {
    throw new Error("Failed to fetch dog match.");
  }
};

export { fetchBreedsAPI, fetchDogsAPI, fetchDogDetailsAPI, fetchDogMatchAPI };
