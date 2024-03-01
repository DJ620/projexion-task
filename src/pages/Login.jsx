import { useState } from "react";
import { useMutation } from "@apollo/client";
import { loginMutation } from "../utils/Queries";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [login] = useMutation(loginMutation);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      const { data } = await login({
        variables: {
          email: username,
          password,
        },
      });
      if (data) {
        const token = data.Auth.loginJwt.loginResult.jwtTokens.accessToken;
        const userInfo = {
          username,
          token,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigate("/home");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setErrorMsg(error.message);
      setUsername("");
      setPassword("");
      console.error("Error during login: ", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-96 max-w-md mx-auto p-6 bg-black shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-300">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 px-4 py-2 rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-600"
          >
            LOGIN
          </button>
        </form>
        {errorMsg && <p className="text-red-500 mt-4">Error: {errorMsg}</p>}
      </div>
    </div>
  );
}

export default Login;
