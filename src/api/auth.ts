// import { createUser } from "../interface/user";

export const loginRequest = async (email: string, password: string) =>
  fetch("/api/auth/login", {
    method: 'POST',
    body: JSON.stringify({email, password})
  });

// export const registerRequest = async (data: createUser) =>
//   axios.post("/api/auth/register", data);

// export const profileRequest = async () => axios.get("/api/auth/profile");