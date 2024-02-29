import { useState } from "react";
import { useMutation } from "@apollo/client";
import { loginMutation } from "../../utils/Queries";
import { useNavigate } from "react-router-dom";

function LoginForm() {
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMsg && <p>Error: {errorMsg}</p>}
    </div>
  );
}

export default LoginForm;
