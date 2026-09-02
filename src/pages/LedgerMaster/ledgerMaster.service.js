import api from "../../services/Api"; // ✅ consistent naming
/* ================= GET ALL Ledgers ================= */
export const getaAllLedgers = (newLimit) => {
  return api.get(`/ledgermaster?limit=${newLimit}`);
};

/* ================= GET ================= */
export const getLedgerById = (id) => {
  return api.get(`/ledgermaster/${id}`);
};

/* ================= CREATE ================= */
export const createLedger = (form) => {
  console.log("Form data being sent to API:", form);
   return api.post(`/ledgermaster`, form);
};

/* ================= UPDATE ================= */
export const updateLedger = (id, form) => {
  console.log("Updating ledger with ID:", id);
  console.log("Form data being sent to API:", form);
  return api.post(`/ledgermaster/${id}`, form);
};

/* ================= DELETE ================= */
export const deleteLedger = (id) => {
  return api.delete(`/ledgermaster/${id}`);
};