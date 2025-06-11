import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaHeartbeat,
  FaChevronRight,
} from "react-icons/fa";
import { PiHandCoinsFill, PiChartLineUpFill } from "react-icons/pi";

const Sidebar = ({
  toggleSidebar,
  isSidebarCollapsed,
  isCareerPathOpen,
  setIsCareerPathOpen,
  isHealthOpen,
  setIsHealthOpen,
  isWealthOpen,
  setIsWealthOpen,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFirstSection, setIsFirstSection] = useState(false);
  if (location.pathname === "/login") return null;

  const isActive = (path) => location.pathname === path;

  const user = JSON.parse(localStorage.getItem("user"));
  const userStatus = user?.status || "N/A";

  return (
    <aside
      className={`bg-gray-100 h-screen fixed top-0 left-0 flex flex-col transition-all duration-300 ease-in-out bg-white shadow-lg  ${
        isSidebarCollapsed ? "w-[95px]" : "w-64"
      }`}
    >
      {/* โลโก้ */}
      <div className="flex justify-center bg-white p-6">
        <img
          src="../src/assets/images/login/logodepa.jpg"
          alt="Logo"
          className={`transition-transform duration-300 ease-in-out ${
            isSidebarCollapsed
              ? "w-auto mb-[101px] scale-90"
              : "w-[186px] h-[186px] scale-100"
          }`}
        />
      </div>

      {/* Section Menu */}
      <ul className="space-y-4 p-6 flex-1">
        {/* Profile */}
        {isFirstSection ? (
          <>
            <li>
              <Link
                to="/profile"
                className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                  isActive("/profile")
                    ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                    : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
              >
                <FaUserCircle className="text-2xl" />
                {!isSidebarCollapsed && (
                  <span className="depa-Navigate-text ml-2">Profile</span>
                )}
              </Link>
            </li>

            {/* CareerPath */}
            <li>
              <div
                className={`flex items-center justify-between  transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                  location.pathname.startsWith("/careerpath")
                    ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md "
                    : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                } ${isSidebarCollapsed ? "justify-center" : "pl-[12px]"}`}
                onClick={() => {
                  setIsCareerPathOpen(!isCareerPathOpen); // เปิด/ปิด CareerPath
                  setIsHealthOpen(false); // ปิด Health
                  setIsWealthOpen(false); // ปิด Health
                  if (isSidebarCollapsed) toggleSidebar(); // เด้ง Sidebar ออกมา
                }}
              >
                <div className="flex items-center">
                  <PiChartLineUpFill className="text-2xl" />
                  {!isSidebarCollapsed && (
                    <span className="depa-Navigate-text ml-2">CareerPath</span>
                  )}
                </div>
                {!isSidebarCollapsed && (
                  <FaChevronRight
                    className={`text-sm transition-transform duration-300 ease-in-out ${
                      isCareerPathOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                )}
              </div>

              {!isSidebarCollapsed && isCareerPathOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <Link
                      to="/careerpath/careerpath1"
                      className={`block depa-Navigate-text transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md py-[8px] px-[10px] rounded-[10px] hover:text-white ${
                        isActive("/careerpath/careerpath1")
                          ? "text-white depa-Navigate-text bg-gradient-to-r from-[#FFC600] to-[#FFF200] py-[8px] px-[10px] rounded-[10px] shadow-md"
                          : "text-navy-blue"
                      }`}
                    >
                      CareerPath 1
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/careerpath/careerpath2"
                      className={`block depa-Navigate-text transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md py-[8px] px-[10px] rounded-[10px] hover:text-white ${
                        isActive("/careerpath/careerpath2")
                          ? "text-white depa-Navigate-text bg-gradient-to-r from-[#FFC600] to-[#FFF200] py-[8px] px-[10px] rounded-[10px] shadow-md"
                          : "text-navy-blue"
                      }`}
                    >
                      CareerPath 2
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/careerpath/careerpath3"
                      className={`block depa-Navigate-text transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md py-[8px] px-[10px] rounded-[10px] hover:text-white ${
                        isActive("/careerpath/careerpath3")
                          ? "text-white depa-Navigate-text bg-gradient-to-r from-[#FFC600] to-[#FFF200] py-[8px] px-[10px] rounded-[10px] shadow-md"
                          : "text-navy-blue"
                      }`}
                    >
                      CareerPath 3
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Health */}
            <li>
              <div
                className={`flex items-center justify-between font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                  location.pathname.startsWith("/health")
                    ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                    : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                onClick={() => {
                  setIsHealthOpen(!isHealthOpen); // เปิด/ปิด Health
                  setIsWealthOpen(false); // ปิด WealthPath
                  setIsCareerPathOpen(false); // ปิด CareerPath
                  if (isSidebarCollapsed) toggleSidebar(); // เด้ง Sidebar ออกมา
                }}
              >
                <div className="flex items-center">
                  <FaHeartbeat className="text-2xl" />
                  {!isSidebarCollapsed && (
                    <span className="depa-Navigate-text ml-2">Health</span>
                  )}
                </div>
                {!isSidebarCollapsed && (
                  <FaChevronRight
                    className={`text-sm transition-transform duration-300 ease-in-out ${
                      isHealthOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                )}
              </div>
              {!isSidebarCollapsed && isHealthOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  {userStatus === "A" && (
                    <li>
                      <Link
                        to="/health/upload_record"
                        className={`block depa-Navigate-text transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md py-[8px] px-[10px] rounded-[10px] hover:text-white ${
                          isActive("/health/upload_record")
                            ? "text-white depa-Navigate-text bg-gradient-to-r from-[#FFC600] to-[#FFF200] py-[8px] px-[10px] rounded-[10px] shadow-md"
                            : "text-navy-blue"
                        }`}
                      >
                        Upload Record
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/health/healtha"
                      className={`block depa-Navigate-text transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md py-[8px] px-[10px] rounded-[10px] hover:text-white ${
                        isActive("/health/healtha")
                          ? "text-white depa-Navigate-text bg-gradient-to-r from-[#FFC600] to-[#FFF200] py-[8px] px-[10px] rounded-[10px] shadow-md"
                          : "text-navy-blue"
                      }`}
                    >
                      Health A
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/health/healthb"
                      className={`block depa-Navigate-text transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md py-[8px] px-[10px] rounded-[10px] hover:text-white ${
                        isActive("/health/healthb")
                          ? "text-white depa-Navigate-text bg-gradient-to-r from-[#FFC600] to-[#FFF200] py-[8px] px-[10px] rounded-[10px] shadow-md"
                          : "text-navy-blue"
                      }`}
                    >
                      Health B
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Wealth */}
            <li>
              <div
                className={`flex items-center justify-between font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                  location.pathname.startsWith("/wealth")
                    ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                    : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                onClick={() => {
                  setIsWealthOpen(!isWealthOpen); // เปิด/ปิด Health
                  setIsCareerPathOpen(false); // ปิด CareerPath
                  setIsHealthOpen(false); // ปิด CareerPath
                  if (isSidebarCollapsed) toggleSidebar(); // เด้ง Sidebar ออกมา
                }}
              >
                <div className="flex items-center">
                  <PiHandCoinsFill className="text-2xl" />
                  {!isSidebarCollapsed && (
                    <span className="depa-Navigate-text ml-2">Wealth</span>
                  )}
                </div>
                {!isSidebarCollapsed && (
                  <FaChevronRight
                    className={`text-sm transition-transform duration-300 ease-in-out ${
                      isWealthOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                )}
              </div>
              {!isSidebarCollapsed && isWealthOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <Link
                      to="/wealth/wealth1"
                      className={`block depa-Navigate-text transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md py-[8px] px-[10px] rounded-[10px] hover:text-white ${
                        isActive("/wealth/wealth1")
                          ? "text-white depa-Navigate-text bg-gradient-to-r from-[#FFC600] to-[#FFF200] py-[8px] px-[10px] rounded-[10px] shadow-md"
                          : "text-navy-blue"
                      }`}
                    >
                      คำนวณภาษี
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/wealth/wealth2"
                      className={`block depa-Navigate-text transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md py-[8px] px-[10px] rounded-[10px] hover:text-white ${
                        isActive("/wealth/wealth2")
                          ? "text-white depa-Navigate-text bg-gradient-to-r from-[#FFC600] to-[#FFF200] py-[8px] px-[10px] rounded-[10px] shadow-md"
                          : "text-navy-blue"
                      }`}
                    >
                      วางแผนการเกษียณ
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </>
        ) : (
          <>
            {/* Setting */}
            {/* Probation (P) เห็นแค่ Assignment */}
            {userStatus === "T" && (
              <li>
                <Link
                  to="/assignment"
                  className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                    isActive("/assignment")
                      ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                      : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                  } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-parking-circle"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 16v-8h3.334c.92 0 1.666 .895 1.666 2s-.746 2 -1.666 2h-3.334" />
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                  </svg>
                  {!isSidebarCollapsed && (
                    <span className="depa-Navigate-text ml-2">Probation</span>
                  )}
                </Link>
              </li>
            )}
            {userStatus === "L" && (
              <>
                <li>
                  <Link
                    to="/department_head"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/department_head")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-user"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="depa-Navigate-text ml-2">Leader</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/department_other"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/department_other")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-list-check"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
                      <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
                      <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
                      <path d="M11 6l9 0" />
                      <path d="M11 12l9 0" />
                      <path d="M11 18l9 0" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="ml-2">Evaluate</span>
                    )}
                  </Link>
                </li>
                <li>
              <Link
                to="/mentor"
                className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                  isActive("/mentor")
                    ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                    : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-users"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                </svg>
                {!isSidebarCollapsed && (
                  <span className="ml-2">Mentor</span>
                )}
              </Link>
            </li>
              </>
            )}

            {userStatus === "H" && (
              <>
                <li>
                  <Link
                    to="/hr"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/hr")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-hospital-circle"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 16v-8" />
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                      <path d="M14 16v-8" />
                      <path d="M10 12h4" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="depa-Navigate-text ml-2">
                        Human Resource
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/editdevelopment"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/editdevelopment")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                      <path d="M16 5l3 3" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="depa-Navigate-text ml-2">
                        Edit Development
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/department_other"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/department_other")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-list-check"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
                      <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
                      <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
                      <path d="M11 6l9 0" />
                      <path d="M11 12l9 0" />
                      <path d="M11 18l9 0" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="ml-2">Evaluate</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/user")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-user-cog"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h2.5" />
                      <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M19.001 15.5v1.5" />
                      <path d="M19.001 21v1.5" />
                      <path d="M22.032 17.25l-1.299 .75" />
                      <path d="M17.27 20l-1.3 .75" />
                      <path d="M15.97 17.25l1.3 .75" />
                      <path d="M20.733 20l1.3 .75" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="depa-Navigate-text ml-2">
                        Permission Manage
                      </span>
                    )}
                  </Link>
                </li>
              </>
            )}

            {userStatus === "M" && (
              <li>
              <Link
                to="/mentor"
                className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                  isActive("/mentor")
                    ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                    : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-users"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                </svg>
                {!isSidebarCollapsed && (
                  <span className="ml-2">Mentor</span>
                )}
              </Link>
            </li>
            )}
            {userStatus === "A" && (
              <>
                <li>
                  <Link
                    to="/assignment"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/assignment")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-parking-circle"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 16v-8h3.334c.92 0 1.666 .895 1.666 2s-.746 2 -1.666 2h-3.334" />
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="depa-Navigate-text ml-2">Probation</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/department_head"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/department_head")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-user"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="ml-2">Leader</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hr"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/hr")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-hospital-circle"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 16v-8" />
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                      <path d="M14 16v-8" />
                      <path d="M10 12h4" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="ml-2">Human Resource</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/editdevelopment"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/editdevelopment")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                      <path d="M16 5l3 3" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="ml-2">Edit Development</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mentor"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/mentor")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-users"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="ml-2">Mentor</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/department_other"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/department_other")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-list-check"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
                      <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
                      <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
                      <path d="M11 6l9 0" />
                      <path d="M11 12l9 0" />
                      <path d="M11 18l9 0" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="ml-2">Evaluate</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user"
                    className={`flex items-center font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r from-[#FFC600] to-[#FFF200] hover:shadow-md hover:text-white ${
                      isActive("/user")
                        ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-white py-[8px] px-[10px] rounded-[10px] shadow-md"
                        : "text-navy-blue py-[8px] px-[10px] rounded-[10px] hover:bg-gray-200"
                    } ${isSidebarCollapsed ? "justify-left" : "pl-[12px]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-user-cog"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h2.5" />
                      <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M19.001 15.5v1.5" />
                      <path d="M19.001 21v1.5" />
                      <path d="M22.032 17.25l-1.299 .75" />
                      <path d="M17.27 20l-1.3 .75" />
                      <path d="M15.97 17.25l1.3 .75" />
                      <path d="M20.733 20l1.3 .75" />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="ml-2">Perimission Manage</span>
                    )}
                  </Link>
                </li>
              </>
            )}
          </>
        )}
      </ul>
      <div className="p-4 flex justify-center">
        <button
          onClick={() => setIsFirstSection(!isFirstSection)}
          className={`relative w-36 h-10 rounded-full flex items-center transition-all duration-300 border border-black/50 ${
            isFirstSection
              ? "bg-gradient-to-r from-[#FFC600] to-[#FFF200] shadow-md"
              : "bg-gray-300 shadow-sm"
          }`}
        >
          {!isSidebarCollapsed && ( // ซ่อนลูกบอลเมื่อ Sidebar ถูกย่อ
            <div
              className={`absolute left-1 w-8 h-8 bg-white rounded-full transition-all duration-300 border border-black/50 ${
                isFirstSection ? "translate-x-24" : "translate-x-1"
              } shadow`}
            ></div>
          )}
          <span
            className={`absolute w-full text-center font-semibold transition-all duration-300 text-sm ${
              isFirstSection ? "text-black" : "text-gray-700"
            }`}
          >
            {isFirstSection ? "Career" : "Promote"}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;