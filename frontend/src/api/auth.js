import API from "./api";

export function login(username, password) {
  return API.post("token/", { username, password });
}

export function register(username, email, password) {
  return API.post("register/", { username, email, password });
}

export function refresh(refreshToken) {
  return API.post("token/refresh/", { refresh: refreshToken });
}

export function logout(refreshToken) {
  return API.post("logout/", { refresh: refreshToken });
}
