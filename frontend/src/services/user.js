import axiosClient from ".";

export const getAllUsers = async () => {
  const res = await axiosClient.get("/user");
  return res.data.data.users;
};

export const deleteUser = async (id) => {
  const res = await axiosClient.delete(`/user/${id}`);
  return res.data;
};