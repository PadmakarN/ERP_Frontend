import React from "react";
import { ArrowUpRight } from "lucide-react";

const DashboardPage = () => {

    const dashboardData = [
        {
            title: "Inward Stock",
            value: "1,200",
            color: "bg-amber-500",
            lightBg: "bg-amber-50",
            darkBg: "dark:bg-amber-950/30",
            iconColor: "text-amber-600 dark:text-amber-400",
        },
        {
            title: "Sales",
            value: "875",
            color: "bg-emerald-500",
            lightBg: "bg-emerald-50",
            darkBg: "dark:bg-emerald-950/30",
            iconColor: "text-emerald-600 dark:text-emerald-400",
        },
        {
            title: "Total Stock",
            value: "5,000",
            color: "bg-blue-600",
            lightBg: "bg-blue-50",
            darkBg: "dark:bg-blue-950/30",
            iconColor: "text-blue-600 dark:text-blue-400",
        },
        {
            title: "Revenue",
            value: "₹ 1,25,000",
            color: "bg-rose-500",
            lightBg: "bg-rose-50",
            darkBg: "dark:bg-rose-950/30",
            iconColor: "text-rose-600 dark:text-rose-400",
        },
    ];


    return (

        <div
            className="
                min-h-screen

                p-6

                bg-[#F8FAFC]
                dark:bg-[#111827]

                text-[#0F172A]
                dark:text-[#F8FAFC]

                transition-colors
                duration-300
            "
        >

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="mb-7">

                <h1
                    className="
                        text-2xl
                        font-bold

                        text-[#0F172A]
                        dark:text-[#F8FAFC]
                    "
                >
                    Dashboard
                </h1>

                <p
                    className="
                        mt-1

                        text-sm

                        text-[#64748B]
                        dark:text-[#94A3B8]
                    "
                >
                    Overview of your business performance
                </p>

            </div>


            {/* =====================================================
                SUMMARY CARDS
            ===================================================== */}

            <div
                className="
                    grid
                    gap-5

                    sm:grid-cols-2
                    lg:grid-cols-4
                "
            >

                {dashboardData.map((card, index) => (

                    <div
                        key={index}

                        className="
                            group

                            flex
                            items-center
                            justify-between

                            p-5

                            rounded-xl

                            bg-white
                            dark:bg-[#1E293B]

                            border
                            border-[#E2E8F0]
                            dark:border-[#334155]

                            shadow-sm

                            hover:shadow-md

                            transition-all
                            duration-300
                        "
                    >

                        {/* =================================================
                            LEFT
                        ================================================= */}

                        <div>

                            <h3
                                className="
                                    text-sm
                                    font-medium

                                    text-[#64748B]
                                    dark:text-[#94A3B8]
                                "
                            >
                                {card.title}
                            </h3>


                            <p
                                className="
                                    mt-2

                                    text-2xl
                                    font-bold

                                    tracking-tight

                                    text-[#0F172A]
                                    dark:text-[#F8FAFC]
                                "
                            >
                                {card.value}
                            </p>

                        </div>


                        {/* =================================================
                            ICON
                        ================================================= */}

                        <div
                            className={`
                                h-12
                                w-12

                                flex
                                items-center
                                justify-center

                                rounded-xl

                                ${card.lightBg}
                                ${card.darkBg}

                                ${card.iconColor}

                                transition-transform
                                duration-300

                                group-hover:scale-105
                            `}
                        >

                            <ArrowUpRight
                                size={22}
                                strokeWidth={2.2}
                            />

                        </div>

                    </div>

                ))}

            </div>


            {/* =====================================================
                MONTHLY PERFORMANCE
            ===================================================== */}

            <div
                className="
                    mt-7

                    p-6

                    rounded-xl

                    bg-white
                    dark:bg-[#1E293B]

                    border
                    border-[#E2E8F0]
                    dark:border-[#334155]

                    shadow-sm

                    transition-colors
                    duration-300
                "
            >

                {/* HEADER */}

                <div
                    className="
                        flex
                        items-center
                        justify-between

                        mb-5
                    "
                >

                    <div>

                        <h2
                            className="
                                text-lg
                                font-semibold

                                text-[#0F172A]
                                dark:text-[#F8FAFC]
                            "
                        >
                            Monthly Performance
                        </h2>

                        <p
                            className="
                                mt-1

                                text-xs

                                text-[#64748B]
                                dark:text-[#94A3B8]
                            "
                        >
                            Business performance overview
                        </p>

                    </div>


                    {/* PERIOD */}

                    <button
                        className="
                            px-3
                            py-1.5

                            rounded-lg

                            text-xs
                            font-medium

                            bg-[#F1F5F9]
                            dark:bg-[#334155]

                            text-[#475569]
                            dark:text-[#CBD5E1]

                            hover:bg-[#E2E8F0]
                            dark:hover:bg-[#475569]

                            transition-colors
                        "
                    >
                        This Year
                    </button>

                </div>


                {/* =================================================
                    CHART PLACEHOLDER
                ================================================= */}

                <div
                    className="
                        h-64

                        flex
                        flex-col
                        items-center
                        justify-center

                        rounded-lg

                        border
                        border-dashed

                        border-[#CBD5E1]
                        dark:border-[#475569]

                        bg-[#F8FAFC]
                        dark:bg-[#111827]
                    "
                >

                    <div
                        className="
                            text-4xl
                            mb-3
                        "
                    >
                        📊
                    </div>

                    <p
                        className="
                            text-sm
                            font-medium

                            text-[#64748B]
                            dark:text-[#94A3B8]
                        "
                    >
                        Chart Coming Soon...
                    </p>

                    <p
                        className="
                            mt-1

                            text-xs

                            text-[#94A3B8]
                            dark:text-[#64748B]
                        "
                    >
                        Monthly sales and revenue analytics
                    </p>

                </div>

            </div>

        </div>
    );
};

export default DashboardPage;