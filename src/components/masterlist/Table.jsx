import { Pencil, Eye } from "lucide-react";
import { useState } from "react";

const Table = ({ columns, data = [], onEdit }) => {
  // =====================================================
  // COLUMN WIDTH
  // =====================================================

  const [columnWidth, setColumnWidth] = useState(
    columns.reduce((acc, col) => {
      acc[col.key] = 150;
      return acc;
    }, {})
  );

  // =====================================================
  // COLUMN RESIZE
  // =====================================================

  const handleResize = (key, e) => {
    const startX = e.clientX;
    const startWidth = columnWidth[key];

    const handleMouseMove = (event) => {
      const newWidth =
        startWidth + (event.clientX - startX);

      setColumnWidth((prev) => ({
        ...prev,
        [key]: Math.max(newWidth, 80),
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };

    document.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseup",
      handleMouseUp
    );
  };

  // =====================================================
  // SUMMARY CALCULATION
  // =====================================================

  const getSummaryValue = (column) => {
    const { key, summary } = column;

    if (!summary) return "";

    const values = data
      .map((row) => row[key])
      .filter(
        (value) =>
          value !== null &&
          value !== undefined &&
          value !== "" &&
          !isNaN(Number(value))
      )
      .map(Number);

    switch (summary) {
      // ================= SUM =================

      case "sum":
        return values.reduce(
          (total, value) => total + value,
          0
        );

      // ================= COUNT =================

      case "count":
        return values.length;

      // ================= AVG =================

      case "avg":
        return values.length
          ? (
              values.reduce(
                (total, value) => total + value,
                0
              ) / values.length
            ).toFixed(2)
          : 0;

      // ================= MIN =================

      case "min":
        return values.length
          ? Math.min(...values)
          : 0;

      // ================= MAX =================

      case "max":
        return values.length
          ? Math.max(...values)
          : 0;

      default:
        return "";
    }
  };

  // =====================================================
  // VISIBLE COLUMNS
  // =====================================================

  const visibleColumns = columns.filter(
    (col) => col.show !== false
  );

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div
      className="
        w-full
        rounded-xl
        overflow-hidden
        bg-white
        dark:bg-[#0F172A]
        border
        border-slate-200
        dark:border-slate-700
        shadow-sm
        dark:shadow-none
      "
    >
      {/* =================================================
          SCROLLABLE TABLE
      ================================================= */}
      <div className="overflow-auto h-[65vh]">

        <table className="w-full table-fixed border-collapse">

          {/* =================================================
              HEADER
          ================================================= */}

          <thead
            className="
              sticky
              top-0
              z- 1
              bg-blue-300
              text-gray-800
              dark:text-gray-200
              dark:bg-[#202a56]
              transition-colors
              duration-300
            "
          >
            <tr>
                <th
                className="
                  w-[90px]
                  px-3
                  py-2
                  text-center
                  text-xs
                  font-semibold
                  whitespace-nowrap
                  bg-blue-300
                  text-gray-800
                  dark:text-gray-200
                  dark:bg-[#202a56]
                  transition-colors
                  duration-300
                "
              >
                Sr.No
              </th>
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    width: columnWidth[col.key],
                  }}
                  className="
                    relative
                    px-3
                    py-2
                    text-left
                    text-xs
                    font-semibold
                    whitespace-nowrap
                    border-r
                    border-slate-700
                    dark:border-slate-500
                    transition-colors
                    duration-300
                  "
                >
                  {col.label}
                  {/* Resize Handle */}
                  <span
                    onMouseDown={(e) =>
                      handleResize(
                        col.key,
                        e
                      )
                    }
                    className="
                      absolute
                      right-0
                      top-0
                      h-full
                      w-1
                      cursor-col-resize
                      hover:bg-blue-400
                      text-slate-400
                      dark:bg-[#202a56]
                      dark:hover:bg-blue-500
                    "
                  />
                </th>
              ))}
              {/* Action Header */}
              <th
                className="
                  w-[90px]
                  px-3
                  py-2
                  text-center
                  text-xs
                  font-semibold
                  whitespace-nowrap
                  bg-blue-300
                  text-gray-800
                  dark:text-gray-200
                  dark:bg-[#202a56]
                  transition-colors
                  duration-300
                "
              >
                Action
              </th>
            </tr>

          </thead>

          {/* =================================================
              BODY
          ================================================= */}

          <tbody>

            {data.length > 0 ? (

              data.map((row, index) => (

                <tr
                  key={index}
                  onClick={() =>
                    onEdit?.(row)
                  }
                  className="
                    border-b
                    border-slate-100
                    dark:border-slate-800
                    even:bg-slate-50
                    dark:even:bg-[#111C2E]
                    bg-white
                    dark:bg-[#0F172A]
                    hover:bg-[#edf6ff]
                    dark:hover:bg-[#1E293B]
                    transition-colors
                    duration-300
                    cursor-pointer

                  "
                >
                  {/* Serial Number */}
                  <td
                    className="
                      px-3
                      py-[3px]
                      text-[13px]
                      text-slate-700
                      dark:text-slate-200
                      transition-colors
                      duration-300
                    "
                  >
                    {index + 1}
                  </td>
                  {/* Data Columns */}
                  {visibleColumns.map(
                    (col) => (
                      <td
                        key={col.key}
                        style={{
                          width:
                            columnWidth[
                              col.key
                            ],
                        }}
                        className="
                          px-3
                          py-[3px]
                          text-[13px]
                          text-slate-700
                          dark:text-slate-200
                          transition-colors
                          duration-300
                          truncate
                          whitespace-nowrap
                        "
                      >
                        {row[col.key]}
                      </td>
                    )
                  )}

                  {/* =================================================
                      ACTION
                  ================================================= */}
                  <td
                    className="
                      px-2
                      py-[2px]
                      bg-white
                      dark:bg-[#0F172A]
                    "
                  >

                    <div
                      className="
                        flex
                        justify-center
                        gap-1
                      "
                    >
                      {/* View */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.(row);
                        }}
                        title="View"
                        className="
                          p-1
                          rounded
                          bg-blue-100
                          dark:bg-blue-950
                          text-blue-600
                          dark:text-blue-400
                          hover:bg-blue-200
                          dark:hover:bg-blue-900
                          transition-colors                        
                          duration-300
                        "
                      >
                        <Eye size={13} />
                      </button>

                      {/* Edit */}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.(row);
                        }}
                        title="Edit"
                        className="
                          p-1
                          rounded
                          bg-green-100
                          dark:bg-green-950
                          text-green-600
                          dark:text-green-400
                          hover:bg-green-200
                          dark:hover:bg-green-900
                          transition-colors
                          duration-300
                        "
                      >
                        <Pencil size={13} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              /* =================================================
                  NO RECORDS
              ================================================= */

              <tr>
                <td
                  colSpan={
                    visibleColumns.length + 1
                  }
                  className="
                    py-16
                    text-center
                    bg-white
                    dark:bg-[#0F172A]
                    text-slate-600
                    dark:text-slate-300
                    transition-colors
                    duration-300
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      gap-2
                    "
                  >
                    <div className="text-5xl">
                      📂
                    </div>

                    <h3
                      className="
                        font-semibold

                        text-slate-700
                        dark:text-slate-200

                      "
                    >
                      No Records Found
                    </h3>
                    <p
                      className="
                        text-sm

                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      No data available for
                      display
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

          {/* =================================================
              FIXED SUMMARY ROW
          ================================================= */}
           
          {data.length > 0 && (
            <tfoot
              className="
                sticky
                bottom-0
                z-1
              "
            >
            
              <tr
                className="
                  border-t-2
                  border-slate-300
                  dark:border-slate-600
                  bg-slate-100
                  dark:bg-[#1E293B]
                  font-semibold
                  transition-colors
                  duration-300
                "
              >
                
                <td
                  className="
                    px-3
                    py-2
                    text-[13px]
                    text-slate-700
                    dark:text-slate-100
                    transition-colors
                    duration-300
                  "
                >
                  Summary
                </td>
                {visibleColumns.map(
                  (col, index) => (
                    <td
                      key={col.key}
                      style={{
                        width:
                          columnWidth[
                            col.key
                          ],
                      }}
                      className="
                        px-3
                        py-2
                        text-[13px]
                        text-slate-700
                        dark:text-slate-100
                        transition-colors
                        duration-300
                        whitespace-nowrap
                      "
                    >

                      {/* First Column */}
                      
                      {index === 0
                        ? `Total Records (${data.length})`
                        : getSummaryValue(
                            col
                          )}
                    </td>

                  )
                )}

                {/* Summary Action Column */}
                

                <td
                  className="
                    px-2
                    py-2
                    bg-slate-100
                    dark:bg-[#1E293B]
                    transition-colors
                    duration-300
                  "
                />
              </tr>
            </tfoot>

          )}

        </table>

      </div>

    </div>
  );
};

export default Table;