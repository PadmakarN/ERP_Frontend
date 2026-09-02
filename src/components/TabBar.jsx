import { useRef, useState, useEffect } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TabBar = ({ tabs, activeKey, onTabClick, onCloseTab }) => {
  const tabRef = useRef(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // =========================================================
  // SCROLL CHECK
  // =========================================================

  const checkScroll = () => {
    const el = tabRef.current;

    if (!el) return;

    setShowLeft(el.scrollLeft > 0);

    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  // =========================================================
  // CHECK WHEN TABS CHANGE
  // =========================================================

  useEffect(() => {
    checkScroll();
  }, [tabs]);

  // =========================================================
  // LEFT SCROLL
  // =========================================================

  const scrollLeft = () => {
    tabRef.current?.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  // =========================================================
  // RIGHT SCROLL
  // =========================================================

  const scrollRight = () => {
    tabRef.current?.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="
                sticky
                top-10
                z-20

                flex
                items-center

                w-full

                bg-white
                dark:bg-[#0F172A]

                border-b
                border-[#E2E8F0]
                dark:border-[#334155]

                transition-colors
                duration-300
            "
    >
      {/* =================================================
                LEFT ARROW
            ================================================= */}

      {showLeft && (
        <button
          type="button"
          onClick={scrollLeft}
          className="
                        h-full

                        flex
                        items-center
                        justify-center

                        px-3
                        py-2

                        shrink-0

                        text-[#64748B]
                        dark:text-[#94A3B8]

                        hover:text-[#0F172A]
                        dark:hover:text-white

                        hover:bg-[#F1F5F9]
                        dark:hover:bg-[#1E293B]

                        transition-colors
                        duration-200
                    "
        >
          <FaChevronLeft size={13} />
        </button>
      )}

      {/* =================================================
                TABS
            ================================================= */}

      <ul
        ref={tabRef}
        onScroll={checkScroll}
        className="
                    flex
                    items-end

                    w-full

                    overflow-x-auto
                    overflow-y-hidden

                    whitespace-nowrap

                    gap-1

                    scrollbar-hide
                "
      >
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className="
                            flex
                            shrink-0
                        "
          >
            <button
              type="button"
              onClick={() => onTabClick(tab.key)}
              className={`
                                group

                                flex
                                items-center

                                min-h-[38px]

                                px-4
                                py-2

                                rounded-t-lg

                                text-sm
                                font-medium

                                border
                                border-b-0

                                transition-all
                                duration-200

                                ${
                                  activeKey === tab.key
                                    ? `
                                            bg-[#F8FAFC]
                                            dark:bg-[#1E293B]

                                            text-[#2563EB]
                                            dark:text-[#60A5FA]

                                            border-[#E2E8F0]
                                            dark:border-[#334155]

                                            relative

                                            after:absolute
                                            after:left-0
                                            after:right-0
                                            after:bottom-[-1px]
                                            after:h-[2px]

                                            after:bg-[#2563EB]
                                            dark:after:bg-[#3B82F6]
                                        `
                                    : `
                                            bg-[#F1F5F9]
                                            dark:bg-[#111827]

                                            text-[#64748B]
                                            dark:text-[#94A3B8]

                                            border-[#E2E8F0]
                                            dark:border-[#334155]

                                            hover:bg-[#E2E8F0]
                                            dark:hover:bg-[#1E293B]

                                            hover:text-[#0F172A]
                                            dark:hover:text-[#F8FAFC]
                                        `
                                }
                            `}
            >
              {/* =================================
                                TAB NAME
                            ================================= */}

              <span
                className="
                                    truncate
                                    max-w-[150px]
                                "
              >
                {tab.name}
              </span>

              {/* =================================
                                CLOSE BUTTON
                            ================================= */}

              {tab.key !== "dashboard" && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();

                    onCloseTab(tab.key);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();

                      e.stopPropagation();

                      onCloseTab(tab.key);
                    }
                  }}
                  className="
                                        ml-2

                                        h-5
                                        w-5

                                        flex
                                        items-center
                                        justify-center

                                        rounded-md

                                        text-[#94A3B8]
                                        dark:text-[#64748B]

                                        hover:text-red-500
                                        dark:hover:text-red-400

                                        hover:bg-red-50
                                        dark:hover:bg-red-950/30

                                        cursor-pointer

                                        transition-all
                                        duration-200
                                    "
                >
                  <FaTimes size={11} />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* =================================================
                RIGHT ARROW
            ================================================= */}

      {showRight && (
        <button
          type="button"
          onClick={scrollRight}
          className="
                        h-full

                        flex
                        items-center
                        justify-center

                        px-3
                        py-2
                        shrink-0
                        text-[#64748B]
                        dark:text-[#94A3B8]
                        hover:text-[#0F172A]
                        dark:hover:text-white
                        hover:bg-[#F1F5F9]
                        dark:hover:bg-[#1E293B]
                        transition-colors
                        duration-200
                    "
        >
          <FaChevronRight size={13} />
        </button>
      )}
    </div>
  );
};

export default TabBar;
