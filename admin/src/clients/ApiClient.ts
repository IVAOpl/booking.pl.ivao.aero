import Axios, { AxiosInstance } from "axios";
import { User } from "../types/User";

interface AuthResponse {
  jwt: string;
}

interface CreateUserRequest {
  name: string;
  login: string;
  password: string;
  email: string;
}

export class ApiClient {
  private axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = Axios.create({
      baseURL,
    });
  }

  async auth(ivaoToken: string) {
    return this.axios
      .post<AuthResponse>("/auth", { "ivao-token": ivaoToken })
      .then((response) => response.data);
  }

  async getAuth(token: string): Promise<User> {
    return this.axios
      .get<User>("/auth", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return {
          ...response.data,
          isAdmin: Boolean(response.data.isAdmin),
          suspended: Boolean(response.data.suspended),
        };
      });
  }

  async createUser(data: CreateUserRequest) {
    return this.axios
      .post("/user", { ...data })
      .then((response) => response.data);
  }

  async getUsers(token: string) {
    return this.axios
      .get<User[]>("/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
  }
}