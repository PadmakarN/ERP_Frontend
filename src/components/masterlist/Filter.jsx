import {
  Search,
  CalendarDays,
  Building2,
  ListFilter,
} from "lucide-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterComponent = ({
  columns,
  search,
  setSearch,
  filters,
  setFilters,
  multiSearch,
  setMultiSearch,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  branch,
  setBranch,
  Datewise,
  BranchWise,
  branches = [],
}) => {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-4">

      {/* ================= TOP FILTER BAR ================= */}

      <div>
        <div className="flex flex-wrap items-center gap-3">
          {/* ================= SEARCH ================= */}
          <div className="relative flex-1 min-w-[260px]">
            <Search
              size={16}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                dark:text-slate-500
                pointer-events-none
              "
            />

            <input
              type="text"
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-9
                rounded-lg
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-[#0F172A]
                text-[#0F172A]
                dark:text-[#F8FAFC]
                placeholder:text-slate-400
                dark:placeholder:text-slate-500
                pl-10
                pr-3
                text-sm
                outline-none
                transition
                focus:border-blue-500
                dark:focus:border-blue-400
                focus:ring-2
                focus:ring-blue-100
                dark:focus:ring-blue-900
              "
            />

          </div>

          {/* ================= DATE FILTER ================= */}

          {Datewise && (
             <>
            <div className="grid grid-cols-2 gap-2">
              {/* ---------- FROM DATE ---------- */}
              <div className="relative">
                <CalendarDays
                  size={16}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    dark:text-slate-500
                    pointer-events-none
                    z-10
                  "
                />

                <DatePicker
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                  dateFormat="dd-MMM-yyyy"
                  placeholderText="15-Aug-2026"
                  className="
                    w-full
                    h-9
                    rounded-lg
                    border
                    border-slate-300
                    dark:border-slate-700
                    bg-white
                    dark:bg-[#0F172A]
                    text-[#0F172A]
                    dark:text-[#F8FAFC]
                    placeholder:text-slate-400
                    dark:placeholder:text-slate-500
                    pl-10
                    pr-3
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                    dark:focus:border-blue-400
                    focus:ring-2
                    focus:ring-blue-100
                    dark:focus:ring-blue-900
                  "
                />
              </div>

              {/* ---------- TO DATE ---------- */}

              <div className="relative">

                <CalendarDays
                  size={16}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    dark:text-slate-500
                    pointer-events-none
                    z-10
                  "
                />

                <DatePicker
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  dateFormat="dd-MMM-yyyy"
                  placeholderText="15-Aug-2026"
                  className="
                    w-full
                    h-9
                    rounded-lg
                    border
                    border-slate-300
                    dark:border-slate-700
                    bg-white
                    dark:bg-[#0F172A]
                    text-[#0F172A]
                    dark:text-[#F8FAFC]
                    placeholder:text-slate-400
                    dark:placeholder:text-slate-500
                    pl-10
                    pr-3
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                    dark:focus:border-blue-400
                    focus:ring-2
                    focus:ring-blue-100
                    dark:focus:ring-blue-900
                  "
                />

              </div>
            </div>
            </>
          )}

          {/* ================= BRANCH ================= */}

          {BranchWise && (
            <div className="relative">

              <Building2
                size={16}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  dark:text-slate-500
                  pointer-events-none
                  z-10
                "
              />

              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="
                  w-[240px]
                  h-9
                  rounded-lg
                  border
                  border-slate-300
                  dark:border-slate-700
                  bg-white
                  dark:bg-[#0F172A]
                  text-[#0F172A]
                  dark:text-[#F8FAFC]
                  pl-10
                  pr-3
                  text-sm
                  outline-none
                  transition
                  focus:border-blue-500
                  dark:focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                  dark:focus:ring-blue-900
                "
              >

                <option value="">
                  All Branch
                </option>

                {branches.map((b) => (
                  <option
                    key={b.id}
                    value={b.id}
                  >
                    {b.name}
                  </option>
                ))}

              </select>

            </div>
          )}

          {/* ================= ADVANCED FILTER BUTTON ================= */}

          <button
            onClick={() => {
              setMultiSearch(!multiSearch);
              setSearch("");
              setFilters({});
            }}
            title="Advanced Search"
            className={`
              h-9
              w-9
              flex
              items-center
              justify-center
              rounded-lg
              border
              transition-all
              ${
                multiSearch
                  ? `
                    bg-[#041f31]
                    dark:bg-blue-600
                    text-white
                    border-[#041f33]
                    dark:border-blue-500
                  `
                  : `
                    bg-white
                    dark:bg-[#0F172A]
                    text-slate-600
                    dark:text-slate-300
                    border-slate-300
                    dark:border-slate-700
                    hover:bg-slate-50
                    dark:hover:bg-slate-800
                  `
              }
            `}
          >
            <ListFilter size={16} />
          </button>

        </div>
      </div>

      {/* ================= ADVANCED SEARCH ================= */}

      {multiSearch && (
        <div
          className="
            bg-white
            dark:bg-[#0F172A]
            border
            border-slate-200
            dark:border-slate-700
            rounded-xl
            p-2
            shadow-sm
            dark:shadow-none
          "
        >

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-2
              lg:grid-cols-5
              gap-2
            "
          >

            {columns
              .filter((col) => col.show !== false)
              .map((col) => (

                <div key={col.key}>

                  {/* Label */}

                  <label
                    className="
                      block
                      mb-1
                      text-xs
                      font-medium
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    {col.label}
                  </label>

                  {/* Input */}

                  <input
                    type="text"
                    placeholder={`Search ${col.label}`}
                    value={filters[col.key] || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        col.key,
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      h-9
                      rounded-lg
                      border
                      border-slate-300
                      dark:border-slate-700
                      bg-white
                      dark:bg-[rgb(15,23,42)]
                      text-[#0F172A]
                      dark:text-[#F8FAFC]
                      placeholder:text-slate-400
                      dark:placeholder:text-slate-500
                      px-3
                      text-sm
                      outline-none
                      transition
                      focus:border-blue-500
                      dark:focus:border-blue-400
                      focus:ring-2
                      focus:ring-blue-100
                      dark:focus:ring-blue-900
                    "
                  />

                </div>

              ))}

          </div>

        </div>
      )}

    </div>
  );
};

export default FilterComponent;