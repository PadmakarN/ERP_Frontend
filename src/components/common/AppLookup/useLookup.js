import { useEffect, useMemo, useState } from "react";
import { getLookupData } from "./lookupService";
export const useLookup = ({
  value,
  onChange,
  table,
  columns = [],
  valueField,
  displayField,
  where = {},
  // ajax means:
  // true  = Popup
  // false = Normal Select
  ajax = false,
  // Component API lookup वापरत आहे का?
  enabled = true,
}) => {

  // =====================================================
  // STATES
  // =====================================================

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");


  // =====================================================
  // LOAD DATA
  // =====================================================

  const loadData = async () => {
    if (!enabled) {
      return;
    }
    if (!table) {
      return;
    }
    try {
      setLoading(true);
      const data = await getLookupData({
        table,
        where,
      });
      setRows(data || []);
    } catch (error) {
      console.error(
        "Lookup Load Error:",
        error
      );
      setRows([]);
    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // INITIAL / API DATA LOAD
  // =====================================================

  useEffect(() => {

    if (!enabled) {
      return;
    }

    if (!table) {
      return;
    }

    loadData();

  }, [
    enabled,
    table,
    JSON.stringify(where),
  ]);


  // =====================================================
  // OPEN POPUP
  // =====================================================

  const open = () => {

    // ajax=false असल्यास Popup उघडू नये

    if (!ajax) {
      return;
    }

    if (!table) {

      console.warn(
        "AppLookup: ajax=true but table is missing."
      );

      return;
    }

    setIsOpen(true);

  };


  // =====================================================
  // CLOSE POPUP
  // =====================================================

  const close = () => {

    setIsOpen(false);

    // Popup close झाल्यावर search clear

    setSearch("");

  };


  // =====================================================
  // SEARCH FILTER
  // =====================================================

  const filteredRows = useMemo(() => {

    // Search नाही

    if (!search.trim()) {

      return rows;

    }

    const text = search
      .toLowerCase()
      .trim();


    return rows.filter((row) => {

      // columns खालीलपैकी format मध्ये असू शकतात:

      // { field: "UserID", label: "User ID" }

      // किंवा

      // "UserID"

      return columns.some((column) => {

        const field =
          typeof column === "string"
            ? column
            : column?.field;

        if (!field) {
          return false;
        }

        return String(
          row[field] ?? ""
        )
          .toLowerCase()
          .includes(text);

      });

    });

  }, [
    rows,
    search,
    columns,
  ]);


  // =====================================================
  // SELECT ROW
  // =====================================================

  const selectRow = (row) => {

    if (!row) {
      return;
    }

    if (!valueField) {

      console.warn(
        "AppLookup: valueField is missing."
      );

      return;
    }

    const selectedValue =
      row[valueField];

    onChange(selectedValue);

    // Popup असल्यास close करा

    if (ajax) {

      close();

    }

  };


  // =====================================================
  // CLEAR VALUE
  // =====================================================

  const clearValue = () => {

    onChange("");

  };


  // =====================================================
  // SELECTED LABEL
  // =====================================================

  const selectedLabel = useMemo(() => {

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "";
    }

    if (!valueField || !displayField) {
      return "";
    }

    const row = rows.find(
      (item) =>
        String(item[valueField]) ===
        String(value)
    );

    return row
      ? row[displayField]
      : "";

  }, [
    rows,
    value,
    valueField,
    displayField,
  ]);


  // =====================================================
  // RELOAD
  // =====================================================

  const reload = async () => {

    await loadData();

  };


  // =====================================================
  // RETURN
  // =====================================================

  return {

    // Popup

    isOpen,

    open,

    close,


    // API

    loading,

    rows,

    reload,


    // Search

    search,

    setSearch,


    // Selection

    selectRow,

    clearValue,

    selectedLabel,

  };

};

