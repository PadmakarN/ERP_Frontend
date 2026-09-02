import React, { useState,useEffect } from "react";
import axios from "axios";
import API_URL from '../Config/apiConfig';

function FetchData({
  mode = "ajax",
  type = "dropdown",
  table = "",
  where = {},
  columns = [],
  allowAdd = false,
  onSelect,
  className = "",      // Added for styling dropdown
  style = {},          // Added for inline style
  Select="",           // for in select specific field
  value = "",          // To control selected value
  required = false,    // For validation
}) {
  const [data, setData] = useState([]);
  const [customValue, setCustomValue] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Fetch data once on first focus (for dropdown)
  useEffect(() => {
  if (mode === "ajax" && table && !loaded) {
    fetchData();
  }
}, []);
  const fetchData = () => {
    if (loaded || mode !== "ajax" || !table) return;
    axios
      .post(`${API_URL}/api/fetch-data`, {
        table,
        where,
        columns,
      })
      .then((res) => {
        setData(res.data);
        setLoaded(true);
      })
      .catch((err) => console.error(err));
  };

  // When dropdown selection changes
  const handleSelect = (val) => {
    if (onSelect) onSelect(val);
  };

  // For adding custom items (if allowAdd = true)
  const handleAdd = () => {
    if (customValue.trim() === "") return;
    const newItem = {};
    columns.forEach((col, i) => {
      newItem[col] = i === 1 ? customValue : null;
    });
    setData((prev) => [...prev, newItem]);
    handleSelect(customValue);
    setCustomValue("");
  };

  if (type === "dropdown") {
    return (
      <div>
        <select
          className={className}
          style={style}
          onFocus={fetchData}
          onChange={(e) => handleSelect(e.target.value)}
          value={value}
          required={required}
        >
          <option value="">-- Select {Select}--</option>
          {data.map((item, index) => (
            <option key={index} value={item[columns[0]]}>
              {item[columns[1]]}
            </option>
          ))}
        </select>

        {allowAdd && (
          <div className={className}>
            <input
              type="text"
              placeholder="Add new"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="form-control"
            />
            <button type="button" className="btn btn-primary mt-1" onClick={handleAdd}>
              Add
            </button>
          </div>
        )}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div>
        <button onClick={fetchData}>Load Table</button>
        <table className="table table-bordered">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} onClick={() => handleSelect(row)} style={{ cursor: "pointer" }}>
                {columns.map((col) => (
                  <td key={col}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}

export default FetchData;
