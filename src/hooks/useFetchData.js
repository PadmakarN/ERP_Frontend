import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

export const useFetchData = (table, params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams(params).toString();

      const response = await api.get(
        `/api/${table}?${queryParams}`
      );

      setData(response.data);
    } catch (err) {
      console.error("API Error :", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, [table, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
  };
};