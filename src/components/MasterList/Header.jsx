import AppButton from "../common/AppButton";
import { memo } from "react";
import {
  Plus,
  RefreshCcw,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

const Header = ({
  title,
  onNew,
  onRefresh,
  onExcel,
  onPDF,
  limit,
  setLimit,
}) => {
  return (
    <div
      className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-3

        bg-white
        dark:bg-[#0F172A]

        text-[#0F172A]
        dark:text-[#F8FAFC]
      "
    >
      {/* ================= LEFT ================= */}

      <div>
        <h1
          className="
            text-lg
            font-semibold

            text-[#0F172A]
            dark:text-[#F8FAFC]
          "
        >
          {title}
        </h1>
      </div>

      {/* ================= RIGHT ================= */}

      <div className="flex flex-wrap items-center gap-2">

        {/* ================= NEW ================= */}

        <AppButton
          text={
            <div className="flex items-center gap-1">
              <Plus size={12} />
              <span className="text-xs">
                New
              </span>
            </div>
          }
          variant="success"
          onClick={onNew}
          className="h-[30px] px-2 text-xs"
        />

        {/* ================= REFRESH ================= */}

        <AppButton
          text={
            <div className="flex items-center gap-1">
              <RefreshCcw size={12} />
              <span className="text-xs">
                Refresh
              </span>
            </div>
          }
          variant="secondary"
          onClick={onRefresh}
          className="h-[30px] px-2 text-xs"
        />

        {/* ================= EXCEL ================= */}

        <AppButton
          text={
            <div className="flex items-center gap-1">
              <FileSpreadsheet size={12} />
              <span className="text-xs">
                Excel
              </span>
            </div>
          }
          variant="success"
          onClick={onExcel}
          className="h-[30px] px-2 text-xs"
        />

        {/* ================= PDF ================= */}

        <AppButton
          text={
            <div className="flex items-center gap-1">
              <FileText size={12} />
              <span className="text-xs">
                PDF
              </span>
            </div>
          }
          variant="danger"
          onClick={onPDF}
          className="h-[30px] px-2 text-xs"
        />

        {/* ================= PAGE LIMIT ================= */}

        <select
          value={limit}
          onChange={(e) =>
            setLimit(Number(e.target.value))
          }
          className="
            h-[30px]
            min-w-[80px]
            rounded-lg
            border
            border-slate-300
            dark:border-slate-700
            bg-white
            dark:bg-[#0F172A]
            text-[#0F172A]
            dark:text-[#F8FAFC]
            px-2
            text-xs
            shadow-sm
            dark:shadow-none
            outline-none
            transition
            focus:border-[#041f31]
            dark:focus:border-blue-500
            focus:ring-1
            focus:ring-blue-100
            dark:focus:ring-blue-900
          "
        >
          <option
            value={100}
            className="bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC]"
          >
            100
          </option>
          <option
            value={500}
            className="bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC]"
          >
            500
          </option>
          <option
            value={1000}
            className="bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC]"
          >
            1000
          </option>
          <option
            value={2000}
            className="bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC]"
          >
            2000
          </option>
          <option
            value={5000}
            className="bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC]"
          >
            5000
          </option>

          <option
            value={10000}
            className="bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC]"
          >
            10000
          </option>
        </select>

      </div>
    </div>
  );
};

export default memo(Header);