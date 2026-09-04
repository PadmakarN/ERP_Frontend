import api from "../../services/Api";
/* ================= GET ALL Orders ================= */
export const getaAllOrders = (newLimit) => {
  return api.get(`/orderhdr?limit=${newLimit}`);
};

/* ================= GET ================= */
export const getOrderById = (id) => {
  return api.get(`/orderhdr/${id}`);
};

/* ================= CREATE ================= */
export const createOrder = (form) => {
  return api.post(`/orderhdr`, form);
};

/* ================= UPDATE ================= */
export const updateOrder = (id, form) => {
  return api.post(`/orderhdr/${id}`, form);
};

/* ================= DELETE ================= */
export const deleteOrder = (id) => {
  return api.delete(`/orderhdr/${id}`);
};