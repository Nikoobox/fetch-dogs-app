import qs from "qs";

const BASE_URL = " https://frontend-take-home-service.fetch.com";

interface LoginFormData {
  userName: string;
  userEmail: string;
}

export interface ApiReturnType extends LoginFormData {
  isAuthenticated: boolean;
}

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogSearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string; // e.g., "breed:asc" or "age:desc"
}

export interface DogSearchReturnType {
  resultIds: string[];
  total: number;
  dogs: Dog[];
  next?: string;
  prev?: string;
}

const authLoginAPI = async ({
  formData,
}: {
  formData: LoginFormData;
}): Promise<ApiReturnType> => {
  const AUTH_URL = BASE_URL + "/auth/login";
  try {
    const { userName, userEmail } = formData;

    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
      }),
      credentials: "include",
    });

    if (response.ok) {
      return {
        isAuthenticated: true,
        userName,
        userEmail,
      };
    } else {
      throw new Error("Login failed. Please try again.");
    }
  } catch (_error) {
    throw new Error("Login failed. Please try again.");
  }
};

const authLogoutAPI = async (): Promise<boolean> => {
  const AUTH_URL = BASE_URL + "/auth/logout";
  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });

    return response.ok; // true will indecate success
  } catch (_error) {
    throw new Error("Logout failed. Please try again.");
  }
};

// Endpoint to fetch all dog breeds
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
      return breeds; // Expecting the response to be an array of breed names
    } else {
      throw new Error("Failed to fetch dog breeds.");
    }
  } catch (_error) {
    throw new Error("Failed to fetch dog breeds.");
  }
};

// Endpoint to search for dogs with filters
const fetchDogsAPI = async (
  searchParams: DogSearchParams
): Promise<DogSearchReturnType> => {
  const DOGS_SEARCH_URL = `${BASE_URL}/dogs/search`;

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

const fetchDogDetailsAPI = async (dogIds: string[]): Promise<Dog[]> => {
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

export {
  authLoginAPI,
  authLogoutAPI,
  fetchBreedsAPI,
  fetchDogsAPI,
  fetchDogDetailsAPI,
};
