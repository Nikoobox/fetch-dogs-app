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
  console.log("API searchParams: ", searchParams);
  try {
    const queryParams = qs.stringify(searchParams, {
      arrayFormat: "comma",
      skipNulls: true,
    });
    console.log("queryParams", queryParams);
    const response = await fetch(`${DOGS_SEARCH_URL}?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include the auth cookie
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
      credentials: "include", // Include the auth cookie
      body: JSON.stringify(dogIds), // Send an array of dog IDs
    });

    if (response.ok) {
      const dogs = await response.json();
      return dogs; // Expecting an array of dog objects
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
      body: JSON.stringify(dogIds), // Send an array of dog IDs
    });

    if (response.ok) {
      const match = await response.json();
      return match; // Expecting an object with the matched dog ID
    } else {
      throw new Error("Failed to fetch dog match.");
    }
  } catch (_error) {
    throw new Error("Failed to fetch dog match.");
  }
};

export { fetchBreedsAPI, fetchDogsAPI, fetchDogDetailsAPI, fetchDogMatchAPI };

// const fetchDogDetailsAPI = async (dogIds: string[]): Promise<DogProps[]> => {
//   const DOGS_DETAILS_URL = `${BASE_URL}/dogs`;
//   const chunkSize = 100;
//   const results: DogProps[] = [];

//   for (let i = 0; i < dogIds.length; i += chunkSize) {
//     const chunk = dogIds.slice(i, i + chunkSize);

//     try {
//       const response = await fetch(DOGS_DETAILS_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(chunk),
//       });

//       if (response.ok) {
//         const dogs = await response.json();
//         results.push(...dogs); // Combine the results
//       } else {
//         throw new Error("Failed to fetch dog details for chunk.");
//       }
//     } catch (error) {
//       console.error("Error fetching dog details:", error);
//       throw error; // Handle the error as needed
//     }
//   }

//   return results;
// };
