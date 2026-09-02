// hooks/useFilter.js
import { useState, useMemo } from "react";

export const useFilter = (data, columns) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [multiSearch, setMultiSearch] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Single Search
      if (!multiSearch) {
        return Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      }

      // Multi Search
      return columns.every((col) => {
        const filterValue = filters[col.key]?.toLowerCase() || "";
        const cellValue = row[col.key];

        return (cellValue ?? "")
          .toString()
          .toLowerCase()
          .includes(filterValue);
      });
    });
  }, [data, search, filters, multiSearch, columns]);

  return {
    filteredData,
    search,
    setSearch,
    filters,
    setFilters,
    multiSearch,
    setMultiSearch,
  };
};