import { useRouter } from 'next/router';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const { login } = useLogin();
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    console.log(data);
    await login(data);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
