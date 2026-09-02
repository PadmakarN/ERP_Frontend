import api from "./api"; // ✅ consistent naming

/* ================= GET ALL Users ================= */
export const getAllUsers = () => {
  return api.get(`/usermaster`,{withCredentials: true});
};

/* ================= GET User by ID ================= */
export const getUserById = (id) => {
  return api.get(`/usermaster/${id}`);
};

/* ================= CREATE ================= */
export const saveUserMaster = (form, image) => {
  const formData = new FormData();

  Object.keys(form).forEach((key) => {
    formData.append(key, form[key]);
  });

  if (image) {
    formData.append("image", image);
  }

  return api.post(`/usermaster`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/* ================= UPDATE ================= */
export const updateUserMaster = (id, form, image) => {
  const formData = new FormData();

  Object.keys(form).forEach((key) => {
    formData.append(key, form[key]);
  });

  if (image) {
    formData.append("image", image);
  }

  return api.put(`/usermaster/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/* ================= DELETE ================= */
export const deleteUserMaster = (id) => {
  return api.delete(`/usermaster/${id}`);
};