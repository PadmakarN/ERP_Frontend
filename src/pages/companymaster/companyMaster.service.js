import api from "../../services/Api"; // ✅ consistent naming
/* ================= GET ALL Companies ================= */
export const getaAllCompanies = (newLimit) => {
  return api.get(`/companymaster?limit=${newLimit}`);
};

/* ================= GET ================= */
export const getCompanyById = (id) => {
  return api.get(`/companymaster/${id}`);
};

/* ================= CREATE ================= */
export const createCompany = (form) => {
  console.log("Form data being sent to API:", form);
   return api.post(`/companymaster`, form);
};

/* ================= UPDATE ================= */
export const updateCompany = (id, form) => {
  console.log("Updating company with ID:", id);
  console.log("Form data being sent to API:", form);
  return api.post(`/companymaster/${id}`, form);
};

/* ================= DELETE ================= */
export const deleteCompany = (id) => {
  return api.delete(`/companymaster/${id}`);
};