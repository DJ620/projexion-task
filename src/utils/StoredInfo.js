export default {
  getUsername: () => {
    const { username } = JSON.parse(localStorage.getItem("userInfo"));
    return username;
  },

  isTokenValid: () => {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    if (!token) return false;
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return exp * 1000 > Date.now();
  },
};
