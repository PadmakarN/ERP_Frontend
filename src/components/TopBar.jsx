import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/slices/themeSlice";
import {
    MdOutlineLightMode,
    MdDarkMode,MdNotifications
} from "react-icons/md";
import ProfileMenu from "./ProfileMenu";

function TopBar() {
    const dispatch = useDispatch();
    const theme = useSelector(
        (state) => state.theme.theme
    );
    return (
        <div
            className="
                fixed
                top-0
                left-0
                z-50
                w-full
                h-10
                flex
                items-center
                justify-end
                bg-white
                dark:bg-[#0F172A]
                text-[#0F172A]
                dark:text-[#F8FAFC]
                border-b
                border-[#E2E8F0]
                dark:border-[#334155]
                transition-colors
                duration-300
            "
        >

            {/* =================================================
                RIGHT SECTION
            ================================================= */}

            <div
                className="
                    flex
                    items-center
                    gap-2
                    mr-3
                "
            >

                {/* =================================================
                    THEME BUTTON
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        dispatch(toggleTheme())
                    }
                    title={
                        theme === "light"
                            ? "Switch to Dark Mode"
                            : "Switch to Light Mode"
                    }

                    className="
                        w-8
                        h-8
                        flex
                        items-center
                        justify-center
                        rounded-lg
                        text-[#111111]
                        dark:text-[#FBBF24]
                        hover:bg-[#F1F5F9]
                        dark:hover:bg-[#1E293B]
                        hover:text-[#2563EB]
                        dark:hover:text-[#FBBF24]
                        active:scale-95
                        transition-all
                        duration-200
                        cursor-pointer
                    "
                >

                    {theme === "light" ? (
                        <MdDarkMode
                            className="text-xl"
                        />
                    ) : (

                        <MdOutlineLightMode
                            className="text-xl"
                        />

                    )}

                </button>


                {/* =================================================
                    DIVIDER
                ================================================= */}

                <div
                    className="
                        h-5
                        w-px

                        bg-[#E2E8F0]
                        dark:bg-[#334155]
                    "
                />

                {/* Notifications */}
                <button
                    type="button"
                    title="Notifications"
                    className="
                        w-8
                        h-8
                        flex
                        items-center
                        justify-center
                        rounded-lg
                        text-[#111111]
                        dark:text-[#FBBF24]
                        hover:bg-[#F1F5F9]
                        dark:hover:bg-[#1E293B]
                        hover:text-[#2563EB]
                        dark:hover:text-[#FBBF24]
                        active:scale-95
                        transition-all
                        duration-200
                        cursor-pointer
                    "
                >
                    <MdNotifications className="text-xl" />
                </button>

                {/* =================================================
                    PROFILE
                ================================================= */}

                <div
                    className="
                        flex
                        items-center
                    "
                >
                    <ProfileMenu />
                </div>

            </div>

        </div>
    );
}

export default TopBar;