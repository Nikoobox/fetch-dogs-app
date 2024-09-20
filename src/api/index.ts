const AUTH_URL = "https://frontend-take-home-service.fetch.com/auth/login";

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

export { authLoginAPI };
