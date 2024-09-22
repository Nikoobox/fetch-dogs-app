const BASE_URL = " https://frontend-take-home-service.fetch.com";

interface LoginFormData {
  userName: string;
  userEmail: string;
}

export interface ApiReturnType extends LoginFormData {
  isAuthenticated: boolean;
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

export { authLoginAPI, authLogoutAPI };
