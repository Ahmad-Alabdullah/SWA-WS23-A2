import { serialize } from "cookie";
import { useLogin } from "../hooks/useLogin";

export const handleLogin = async () => {
  try {
    // Perform login request and obtain the JWT token
    const response = await useLogin();
    const { token } = response.data;

   const serializedToken = serialize('token', token, {
      expires: new Date(Date.now() + 60 * 60 * 1000), // Expires in 1 hour
      path: '/', // Cookie path
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    response.setHeader('Set-Cookie', serializedToken);

  } catch (error) {
    // Handle login error
  }
};
