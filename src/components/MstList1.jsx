import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import CustomButton from "./Button";
import Toast from "./Tost";
import ModalWin from "./ModalWin";

const MstList = ({
  columns,
  data,
  loading,
  err,
  PageLink,
  onRefresh,
  ListTitle,
  onFilterChange,
  setpagelimit,
  Datewise,
  BranchWise,
  primaryKey,
}) => {
  const [filters, setFilters] = useState({});
  const [NoOfRec, setNoOfRec] = useState(0);
  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [branch, setBranch] = useState("");
  const [limit, setLimit] = useState(100);
  const [showMultiSearch, setShowMultiSearch] = useState(false);
  const [singleSearch, setSingleSearch] = useState("");

  const navigate = useNavigate();
  // 🔹 Modal States
  const [isOpen, setIsOpen] = useState(false);
  const [PageName, setPageName] = useState("");
  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  useEffect(() => {
    setNoOfRec(data.length);
  }, [data]);

  const filteredData = data.filter((row) => {
    // 🔹 Single Search Mode
    if (!showMultiSearch) {
      return Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(singleSearch.toLowerCase());
    }

    // 🔹 Multiple Column Search Mode
    return columns.every((col) => {
      const filterValue = filters[col.key]?.toLowerCase() || "";
      const cellValue = row[col.key];
      const cellStr =
        cellValue !== null && cellValue !== undefined
          ? cellValue.toString().toLowerCase()
          : "";
      return cellStr.includes(filterValue);
    });
  });
  const exportToExcel = () => {
    const workSheetData = filteredData.map((row) =>
      columns.reduce((acc, col) => {
        acc[col.label] = row[col.key];
        return acc;
      }, {}),
    );
    const worksheet = XLSX.utils.json_to_sheet(workSheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "report.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = columns.map((col) => col.label);
    const tableRows = filteredData.map((row) =>
      columns.map((col) => row[col.key]),
    );
    autoTable(doc, { head: [tableColumn], body: tableRows });
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  };
  //Handle Loading and Error 
  if (loading) return <Loading />;
   if (err)
   {
      return (
        <div className="text-center text-red-600 font-semibold py-10">
          ❌ {err}
        </div>
      )
   }

   if(!data || data.length === 0){
    return (
      <div className="text-center text-gray-600 font-semibold py-10">
        No data available.
      </div>
    )
   }
  //----- End ---
  const NewEntry = () => {
    setPageName(PageLink); // dynamic page load
    setIsOpen(true); // modal open
  };

  const handleEdit = (row) => {
    const id = row[primaryKey];
    id ? navigate(`/${PageLink}/${id}`) : Toast("Primary Key Not Found");
  };

  const handleRefreshClick = () => {
    if (onFilterChange) {
      onFilterChange({ fromdate, todate, branch });
    }
    if (onRefresh) onRefresh();
  };

  const selectionChange = (event) => {
    const newLimit = parseInt(event.target.value);
    setpagelimit({ page: 1, limit: newLimit });
    setLimit(newLimit);
  };

  return (
    <div className="w-full mt-4">
      {/* STICKY FILTER + BUTTON AREA */}
      <div className="sticky top-0 z-20 pb-2 shadow-sm">
        {/* SEARCH FILTERS */}
        {/* SEARCH AREA */}
        <div className="w-full mb-2">
          {/* Toggle Button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => {
                setShowMultiSearch(!showMultiSearch);
                setSingleSearch("");
                setFilters({});
              }}
              className="bg-amber-300 text-black px-3 py-1 rounded-md text-sm"
            >
              {showMultiSearch ? "Single Search" : "Multiple Search"}
            </button>
          </div>

          {/* Single Search */}
          {!showMultiSearch && (
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={singleSearch}
              onChange={(e) => setSingleSearch(e.target.value)}
            />
          )}

          {/* Multiple Search */}
          {showMultiSearch && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {columns.map((col) => (
                <input
                  key={col.key}
                  type="text"
                  placeholder={`Search ${col.label}`}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters[col.key] || ""}
                  onChange={(e) => handleFilterChange(col.key, e.target.value)}
                />
              ))}
            </div>
          )}
        </div>
        {/* BUTTONS + TITLE + RECORDS + LIMIT */}
        <div className="flex flex-wrap gap-3 items-center bg-gray-100 border border-gray-300 rounded-lg p-2 mb-2">
          <CustomButton text="➕ New" bgColor="#16a34a" onClick={NewEntry} />
          <CustomButton
            text="🔃 Refresh"
            bgColor="#2563eb"
            onClick={handleRefreshClick}
          />
          <CustomButton text="📊 Excel Export" onClick={exportToExcel} />
          <CustomButton text="📄 PDF Export" onClick={exportToPDF} />

          <h4 className="font-semibold text-gray-900 ml-2">{ListTitle}</h4>

          <div className="ml-auto font-semibold text-gray-700">
            {NoOfRec} Rows
          </div>

          <select
            value={limit}
            onChange={selectionChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option>100</option>
            <option>500</option>
            <option>2000</option>
            <option>5000</option>
            <option>10000</option>
          </select>
        </div>
      </div>

      {/* DATE + BRANCH FILTER */}
      {(Datewise === 1 || BranchWise === 1) && (
        <div className="flex flex-wrap justify-between gap-3 bg-gray-50 p-4 rounded-md mb-4">
          {Datewise === 1 && (
            <div className="flex gap-3">
              <div className="flex flex-col">
                <label className="text-sm font-medium">From</label>
                <input
                  type="date"
                  value={fromdate}
                  onChange={(e) => setFromdate(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium">To</label>
                <input
                  type="date"
                  value={todate}
                  onChange={(e) => setTodate(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>
          )}

          {BranchWise === 1 && (
            <input
              type="text"
              placeholder="Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          )}
        </div>
      )}

      {/* SCROLLABLE TABLE */}
      <div className="overflow-y-auto max-h-[70vh] border border-gray-300 rounded-lg">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="bg-blue-300 text-black sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-3 text-left text-sm font-semibold "
                >
                  {col.label}
                </th>
              ))}
              <th className="px-3 py-3 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, i) => (
              <tr
                key={i}
                className="even:bg-gray-50 hover:bg-amber-200 transition"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-3 py-2 text-sm border-b border-gray-200"
                  >
                    {row[col.key] ?? ""}
                  </td>
                ))}
                <td className="px-3 py-2 border-b border-gray-200">
                  <button
                    className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* MODAL WINDOW */}
      <ModalWin
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        PageName={PageName}
      />
    </div>
  );
};

export default MstList;
