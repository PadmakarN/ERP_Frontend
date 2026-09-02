import { useFilter } from "../../hooks/useFilter";
import { useState } from "react";
import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportPDF";
import { useModalWin } from "../common/ModalWin";
import { useNavigate } from "react-router-dom";

import MstListHeader from "./Header";
import MstListFilter from "./Filter";
import MstListTable from "./Table";
import Loading from "../Loading";

const Masterlist = ({
  columns,
  data,
  PageLink,
  ListTitle,
  loading,
  err,
  limit,
  setLimit,
  primaryKey,
  onRefresh,
  Datewise,
  BranchWise,
  FormComponent,
}) => {
  const navigate = useNavigate();

  const { openModalWin } = useModalWin();

  // =====================================================
  // FILTER
  // =====================================================

  const {
    filteredData,
    search,
    setSearch,
    filters,
    setFilters,
    multiSearch,
    setMultiSearch,
  } = useFilter(data, columns);

  // =====================================================
  // EDIT PAGE
  // =====================================================

  const handleEdit = (row) => {
    const id = row?.[primaryKey];

    if (FormComponent) {
      openModalWin((props) => (
        <FormComponent
          {...props}
          id={id}
        />
      ));
    } else {
      navigate(`/${PageLink}/${id}`);
    }
  };

  // =====================================================
  // NEW PAGE
  // =====================================================

  const handleNew = () => {
    if (FormComponent) {
      openModalWin((props) => (
        <FormComponent
          {...props}
          data={null}
        />
      ));
    } else {
      navigate(`/${PageLink}`);
    }
  };

  // =====================================================
  // DATE
  // =====================================================

  const today = new Date();

  const firstDateOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const [fromDate, setFromDate] =
    useState(firstDateOfMonth);

  const [toDate, setToDate] =
    useState(today);

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div
      className="
        w-full
        mt-6
        bg-slate-100
        dark:bg-[#0F172A]
        text-[#0F172A]
        dark:text-[#F8FAFC]
        transition-colors
        duration-200
      "
    >

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && <Loading />}

      {/* =================================================
          ERROR
      ================================================= */}

      {err && (
        <div
          className="
            rounded-xl
            border
            border-red-200
            dark:border-red-900
            bg-red-50
            dark:bg-red-950/40
            p-3
            text-red-600
            dark:text-red-400
            text-sm
          "
        >
          {err}
        </div>
      )}

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      {!loading && !err && (
        <div className="flex flex-col gap-2">

          {/* =================================================
              HEADER + FILTER CONTAINER
          ================================================= */}

          <div
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-[#0F172A]
              p-2
              shadow-md
              dark:shadow-none
            "
          >

            {/* ================= HEADER ================= */}

            <MstListHeader
              title={ListTitle}
              total={filteredData.length}
              onNew={handleNew}
              onRefresh={onRefresh}
              onExcel={() =>
                exportToExcel(
                  filteredData,
                  columns
                )
              }
              onPDF={() =>
                exportToPDF(
                  filteredData,
                  columns
                )
              }
              limit={limit}
              setLimit={setLimit}
            />

            {/* ================= FILTER ================= */}

            <div className="w-full mt-4">

              <MstListFilter
                columns={columns}
                search={search}
                setSearch={setSearch}
                filters={filters}
                setFilters={setFilters}
                fromDate={fromDate}
                toDate={toDate}
                setFromDate={setFromDate}
                setToDate={setToDate}
                Datewise={Datewise}
                BranchWise={BranchWise}
                multiSearch={multiSearch}
                setMultiSearch={setMultiSearch}
              />

            </div>

          </div>

          {/* =================================================
              TABLE CONTAINER
          ================================================= */}

          <div
            className="
              w-full
              overflow-x-auto
              rounded-2xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-[#0F172A]
              shadow-md
              dark:shadow-none
            "
          >

            <MstListTable
              columns={columns}
              data={filteredData}
              onEdit={handleEdit}
            />

          </div>

        </div>
      )}

    </div>
  );
};

export default Masterlist;