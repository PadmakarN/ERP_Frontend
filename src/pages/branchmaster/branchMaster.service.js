import api from "../../services/Api"; // ✅ consistent naming
/* ================= GET ALL Branches ================= */
export const getaAllBranches = (newLimit) => {
  return api.get(`/branchmaster?limit=${newLimit}`);
};

/* ================= GET ================= */
export const getBranchById = (id) => {
  return api.get(`/branchmaster/${id}`);
};

/* ================= CREATE ================= */
export const createBranch = (form) => {
  console.log("Form data being sent to API:", form);
   return api.post(`/branchmaster`, form);
};

/* ================= UPDATE ================= */
export const updateBranch = (id, form) => {
  console.log("Updating branch with ID:", id);
  console.log("Form data being sent to API:", form);
  return api.post(`/branchmaster/${id}`, form);
};

/* ================= DELETE ================= */
export const deleteBranch = (id) => {
  return api.delete(`/branchmaster/${id}`);
};