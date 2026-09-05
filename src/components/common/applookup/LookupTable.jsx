const LookupTable = ({
  rows = [],
  columns = [],
  loading = false,
  valueField,
  onSelect,
}) => {
  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="
          flex
          items-center
          justify-center

          p-8

          text-sm

          text-slate-500
          dark:text-slate-400
        "
      >
        Loading...
      </div>
    );
  }

  // =====================================================
  // NO RECORDS
  // =====================================================

  if (!rows.length) {
    return (
      <div
        className="
          flex
          items-center
          justify-center

          p-8

          text-sm

          text-slate-500
          dark:text-slate-400
        "
      >
        No Records Found
      </div>
    );
  }

  // =====================================================
  // TABLE
  // =====================================================

  return (
    <div
      className="
        max-h-[450px]

        overflow-auto

        scrollbar-thin
        scrollbar-thumb-slate-300
        dark:scrollbar-thumb-slate-600

        scrollbar-track-transparent
      "
    >
      <table
        className="
          w-full
          min-w-max

          border-collapse

          text-slate-700
          dark:text-slate-200
        "
      >
        {/* Header */}

        <thead
          className="
            sticky
            top-0
            z-10

            bg-slate-100
            dark:bg-slate-700
          "
        >
          <tr>
            {columns.map((column) => (
              <th
                key={column.field}
                className="
                  border-b

                  border-slate-300
                  dark:border-slate-600

                  px-4
                  py-3

                  text-left

                  text-sm
                  font-semibold

                  text-slate-700
                  dark:text-slate-100

                  whitespace-nowrap
                "
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}

        <tbody>
          {rows.map((row) => (
            <tr
              key={row[valueField]}
              onDoubleClick={() => onSelect(row)}
              className="
                cursor-pointer

                border-b

                border-slate-200
                dark:border-slate-700

                bg-white
                dark:bg-slate-800

                hover:bg-slate-50
                dark:hover:bg-slate-700

                transition-colors
                duration-150
              "
            >
              {columns.map((column) => (
                <td
                  key={column.field}
                  className="
                    px-4
                    py-2

                    text-sm

                    text-slate-700
                    dark:text-slate-200

                    whitespace-nowrap
                  "
                >
                  {row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LookupTable;
