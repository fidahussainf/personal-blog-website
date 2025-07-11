import axiosClient from ".";

export const login = async (email, password) => {
  const res = await axiosClient.post("/auth/login", { email, password });
  return res.data.data.token;
};

export const signup = async (name, email, password) => {
  const res = await axiosClient.post("/auth/signup", { name, email, password });
  return res;
}
export const verifyToken = async () => {
  const res = await axiosClient.get("/auth/verify-token");
  return res.data.data;
};