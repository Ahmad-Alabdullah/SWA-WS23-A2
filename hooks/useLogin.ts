import client from "../constants/apollo-client";
import { API_URL } from "../constants/urls";

interface LoginRequest {
  username: string;
  password: string;
}

export const useLogin = () => {
  const login = async (body: LoginRequest) => {
    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        // Handle non-successful response (status code other than 2xx)
        throw new Error(`Login failed with status: ${res.status}`);
      }

      // Optionally handle response data if needed
      const data = await res.json();

      // Example: Assuming the response contains a token
      const token = data.token;

      // Example: Refetch relevant queries using Apollo Client
      await client.refetchQueries({ include: "active" });

    } catch (error) {
      // Handle fetch or other errors
      console.error('Login failed:', error);
      throw error; // Propagate the error to the caller if needed
    }
  };

  return { login };
};
