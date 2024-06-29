import { api } from "./api";

class AuthService {
  async login(username, passwrod) {
    const { data } = await api.get(
      `/users/?username=${username}&password=${passwrod}`
    );
    return data[0];
  }
}

const authService = new AuthService();

export default authService;
