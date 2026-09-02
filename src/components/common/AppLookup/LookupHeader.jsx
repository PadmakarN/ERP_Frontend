import { Search, X } from "lucide-react";

const LookupHeader = ({
  title = "Lookup",
  search,
  setSearch,
  close,
}) => {

  return (
    <div
      className="
        flex
        flex-col

        sm:flex-row
        sm:items-center
        sm:justify-between

        gap-3

        border-b
        border-slate-200
        dark:border-slate-700

        p-4

        bg-white
        dark:bg-slate-800
      "
    >

      {/* Title */}

      <h2
        className="
          text-lg
          font-semibold

          text-slate-800
          dark:text-slate-100
        "
      >
        {title}
      </h2>

      {/* Right */}

      <div
        className="
          flex
          items-center
          gap-2
          w-full
          sm:w-auto
        "
      >

        {/* Search */}

        <div
          className="
            flex
            flex-1
            sm:flex-none

            items-center

            rounded-md
            border

            border-slate-300
            dark:border-slate-600

            bg-white
            dark:bg-slate-900

            px-2
          "
        >

          <Search
            size={16}
            className="
              shrink-0

              text-slate-500
              dark:text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search..."
            className="
              w-full
              sm:w-48
              md:w-64

              border-none
              bg-transparent

              p-2

              text-sm

              text-slate-800
              dark:text-slate-100

              placeholder:text-slate-400
              dark:placeholder:text-slate-500

              outline-none
            "
          />

        </div>

        {/* Close */}

        <button
          type="button"
          onClick={close}
          className="
            shrink-0

            rounded-xl
            p-2

            text-slate-600
            dark:text-slate-300

            hover:bg-red-600
            hover:text-white

            transition-colors
            duration-200
          "
        >
          <X size={18} />
        </button>

      </div>

    </div>
  );
};

export default LookupHeader;