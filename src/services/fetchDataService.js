import api from "./Api";
// Select Data from API

export const fetchdbdata = async ({ table, columns, condition }) => {
  const res = await api.get("/api/fetchdbdata", {
    params: {
      table,
      columns,
      condition,
    },
  });

  return res.data;
};