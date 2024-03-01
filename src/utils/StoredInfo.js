export default {
  getUsername: () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo && userInfo.username ? userInfo.username : '';
  },

  isTokenValid: () => {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    if (!token) return false;
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return exp * 1000 > Date.now();
  },
};
