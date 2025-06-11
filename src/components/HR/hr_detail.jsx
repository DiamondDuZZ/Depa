import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HR_Detail = () => {
  const [startDate, setStartDate] = useState(new Date("2024-10-01"));
  const [endDate, setEndDate] = useState(new Date("2025-01-21"));

  const profileData = {
    name: "นายสมชาย ใจดี",
    position: "ส่วนบริหารและพัฒนาบุคคล",
    endDate: "31-01-2025",
    img: "../src/assets/images/employee_pro/user2.jpg",
    progress: 45,
  };

  const users = [
    {
      title: "พี่เลี้ยง",
      name: "นายสมศักดิ์ มั่นมี",
      img: "../src/assets/images/careerpath/user_test.png",
    },
  ];

  const stats = [
    {
      title: "วันทำงานไม่บันทึกวันหยุด",
      value: "74 ครั้ง",
      color: "text-blue-900",
      icon: (
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
          class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-time"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
          <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M15 3v4" />
          <path d="M7 3v4" />
          <path d="M3 11h16" />
          <path d="M18 16.496v1.504l1 1" />
        </svg>
      ),
    },
    {
      title: "ปฏิบัติงานนอกสถานที่",
      value: "4 ครั้ง",
      color: "text-gray-600",
      icon: (
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
          class="icon icon-tabler icons-tabler-outline icon-tabler-buildings"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 21v-15c0 -1 1 -2 2 -2h5c1 0 2 1 2 2v15" />
          <path d="M16 8h2c1 0 2 1 2 2v11" />
          <path d="M3 21h18" />
          <path d="M10 12v0" />
          <path d="M10 16v0" />
          <path d="M10 8v0" />
          <path d="M7 12v0" />
          <path d="M7 16v0" />
          <path d="M7 8v0" />
          <path d="M17 12v0" />
          <path d="M17 16v0" />
        </svg>
      ),
    },
    {
      title: "ลาป่วย",
      value: "6.5 ครั้ง",
      color: "text-orange-600",
      icon: (
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
          class="icon icon-tabler icons-tabler-outline icon-tabler-mood-sick"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z" />
          <path d="M9 10h-.01" />
          <path d="M15 10h-.01" />
          <path d="M8 16l1 -1l1.5 1l1.5 -1l1.5 1l1.5 -1l1 1" />
        </svg>
      ),
    },
    {
      title: "ลากิจส่วนตัว",
      value: "3.5 ครั้ง",
      color: "text-orange-500",
      icon: (
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
          class="icon icon-tabler icons-tabler-outline icon-tabler-briefcase"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
          <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
          <path d="M12 12l0 .01" />
          <path d="M3 13a20 20 0 0 0 18 0" />
        </svg>
      ),
    },
    {
      title: "ลาพักผ่อน",
      value: "2 ครั้ง",
      color: "text-purple-500",
      icon: (
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
          class="icon icon-tabler icons-tabler-outline icon-tabler-plane-inflight"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 11.085h5a2 2 0 1 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3l4 7z" />
          <path d="M3 21h18" />
        </svg>
      ),
    },
    {
      title: "ไม่ลงระบบ",
      value: "25 ครั้ง",
      color: "text-red-600",
      icon: (
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
          class="icon icon-tabler icons-tabler-outline icon-tabler-x"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      ),
    },
  ];

  const basicCourses = [
    {
      name: "ข้อบังคับบุคคล",
      image_url: "../src/assets/images/careerpath/cp1.png",
      status: "ผ่าน",
    },
    {
      name: "ระบบสารบรรณ",
      image_url: "../src/assets/images/careerpath/cp2.png",
      status: "ไม่ผ่าน",
    },
  ];

  const activities = [
    {
      name: "กิจกรรม A",
      image_url: "/src/assets/images/careerpath/cp3.png",
      status: "ผ่าน",
    },
    {
      name: "กิจกรรม B",
      image_url: "/src/assets/images/careerpath/cp4.png",
      status: "ไม่ผ่าน",
    },
  ];

  const [courses, setCourses] = useState(basicCourses);
  const [activity, setActivities] = useState(activities);

  // ฟังก์ชันอัปเดตสถานะ
  const handleStatusChangeBasic = (index, newStatus) => {
    setCourses((prevCourses) =>
      prevCourses.map((course, i) =>
        i === index ? { ...course, status: newStatus } : course
      )
    );
  };

  const handleStatusChangeActivity = (index, newStatus) => {
    setActivities((prev) =>
      prev.map((act, i) => (i === index ? { ...act, status: newStatus } : act))
    );
  };

  const [people, setPeople] = useState([{ id: 1, name: "นายสมศักดิ์ มั่งมี" }]);

  // ฟังก์ชันเพิ่มคน
  const handleAddPerson = () => {
    setPeople([
      ...people,
      { id: people.length + 1, name: "" }, // เพิ่มช่องค้นหา
    ]);
  };

  // ฟังก์ชันลบคน
  const handleRemovePerson = (id) => {
    if (people.length > 1) {
      setPeople(people.filter((person) => person.id !== id));
    }
  };

  const [searchText, setSearchText] = useState("");

  // ฟังก์ชันอัปเดตค่าการค้นหา
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // ฟังก์ชันล้างค่าการค้นหา
  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <div className="p-8 bg-white min-h-screen rounded-xl drop-shadow-md">
      <div className="flex gap-6">
        {/* Left Section: โปรไฟล์ & พี่เลี้ยง */}
        <div className="w-2/4 flex flex-col gap-6">
          {/* Profile Section */}
          <div className="flex items-center p-6">
            <div
              className="w-[150px] h-[150px] rounded-full flex-shrink-0 drop-shadow-xl"
              style={{
                background: "linear-gradient(135deg, #FFF200, #FFC600)",
                padding: "10px",
              }}
            >
              <img
                src={profileData.img}
                alt={profileData.name}
                className="w-full h-full rounded-full object-cover drop-shadow-xl"
              />
            </div>

            <div className="ml-6 space-y-4">
              <h2 className="text-lg font-semibold">
                <span className="text-navy-blue">ชื่อ:</span>
                <span className="ml-4 text-[#686868]">{profileData.name}</span>
              </h2>

              <p className="text-lg font-semibold ">
                <span className="text-navy-blue">ตำแหน่ง:</span>
                <span className="ml-4 text-[#686868]">
                  {profileData.position}
                </span>
              </p>
              <p className="text-lg font-semibold">
                <span className="text-navy-blue">วันที่สิ้นสุด:</span>
                <span className="ml-4 text-[#686868]">
                  {profileData.endDate}
                </span>
              </p>

              <div className="flex items-center">
                <p className="text-lg font-semibold text-navy-blue">
                  ความคืบหน้าในงาน:
                </p>
                <div className="ml-4 w-[250px] h-[20px] bg-gray-200 rounded-full shadow-md">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFC600] to-[#FFF200] text-xs font-semibold text-center flex items-center justify-center leading-none rounded-full shadow-lg"
                    style={{ width: `${profileData.progress}%` }}
                  >
                    {profileData.progress}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Cards Section */}
          <div className="flex gap-4">
            {users.map((user, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] drop-shadow-md p-4 w-[300px] flex items-center"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #FFF200, #FFC600)",
                    padding: "6px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src={user.img}
                    alt={user.name}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div className="text-left ml-4">
                  <h2 className="text-md font-semibold text-blue-900">
                    {user.title}
                  </h2>
                  <p className="text-[#686868] text-sm mt-2">{user.name}</p>
                </div>
              </div>
            ))}
            <div className="ml-4">
              <label className="text-lg font-semibold text-[#0C2F53] min-w-[80px] block mb-2">
                เลือกหัวหน้า
              </label>

              <div className="flex items-center space-x-4">
                <div className="relative flex items-center bg-white rounded-full shadow-lg  border-gray-300 overflow-hidden w-[330px]">
                  {/* ไอคอนค้นหา (อยู่ซ้าย) */}
                  <span className="absolute right-4 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icon-tabler-search"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                      <path d="M21 21l-6 -6" />
                    </svg>
                  </span>

                  {/* อินพุตค้นหา */}
                  <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="ค้นหารายชื่อ..."
                    className="w-full py-3 pl-6 pr-14 text-sm text-gray-800 bg-transparent rounded-full focus:ring-4 focus:ring-blue-300 outline-none"
                  />
                </div>
                {/* ปุ่มลบ */}
                <button
                  onClick={clearSearch}
                  className="group relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* เส้นกั้นระหว่าง User Cards Section และ User2 Cards Section */}
          <div className="border-t border-[#B5B5B5] my-"></div>

          <div className="p-6">
            {/* Header */}
            <div>
              <h2 className="text-xl text-navy-blue font-semibold flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icon-tabler-chart-column"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20h3" />
                  <path d="M17 20h3" />
                  <path d="M10.5 20h3" />
                  <path d="M4 16h3" />
                  <path d="M17 16h3" />
                  <path d="M10.5 16h3" />
                  <path d="M4 12h3" />
                  <path d="M17 12h3" />
                  <path d="M10.5 12h3" />
                </svg>
                เลือกลำดับหัวหน้า
              </h2>
              <p className="text-sm text-[#979797] mt-2">
                **เรียงลำดับจากตัวเลขน้อยคือหัวหน้าติดตัว**
              </p>
            </div>

            {/* รายการคน */}
            <div className="mt-6 space-y-4">
              {people.map((person, index) => (
                <div key={person.id} className="flex items-center gap-4">
                  <label className="text-lg font-semibold text-[#0C2F53] min-w-[80px]">
                    คนที่ {index + 1}
                  </label>

                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={person.name}
                      onChange={(e) =>
                        setPeople(
                          people.map((p) =>
                            p.id === person.id
                              ? { ...p, name: e.target.value }
                              : p
                          )
                        )
                      }
                      placeholder="ค้นหารายชื่อ"
                      className="w-full py-3 px-4 text-sm text-gray-800 bg-white/80 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-lg border-none outline-none focus:ring-4 focus:ring-blue-300 transition-all"
                    />

                    {/* ไอคอนค้นหา */}
                    {person.name === "" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                      </svg>
                    )}
                  </div>

                  {/* ปุ่มลบ */}
                  <button
                    onClick={() => handleRemovePerson(person.id)}
                    className="group relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icon-tabler-trash"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* ปุ่มเพิ่มคน */}
            <div className="mt-6">
              <button
                className="flex items-center gap-3 bg-green-500 text-white font-medium py-2 px-4 rounded-full shadow-md hover:scale-105 transition-all"
                onClick={handleAddPerson}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>เพิ่ม</span>
              </button>
            </div>
          </div>
        </div>
        {/* Right Section: สถิติการมาทำงาน */}
        <div className="w-1/2 bg-white shadow-lg rounded-xl p-6">
          {/* Header with Gradient */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md">
            <h2 className="text-xl font-semibold flex items-center gap-2">
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-chart-column"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 20h3" />
                <path d="M17 20h3" />
                <path d="M10.5 20h3" />
                <path d="M4 16h3" />
                <path d="M17 16h3" />
                <path d="M10.5 16h3" />
                <path d="M4 12h3" />
                <path d="M17 12h3" />
                <path d="M10.5 12h3" />
                <path d="M4 8h3" />
                <path d="M17 8h3" />
                <path d="M4 4h3" />
              </svg>{" "}
              สถิติการมาทำงาน
            </h2>
            <p className="text-sm text-gray-200">ดูข้อมูลการทำงานของพนักงาน</p>
          </div>

          {/* Date Range Picker */}
          <div className="flex flex-col bg-gray-50 p-4 mt-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-medium">จาก:</span>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="p-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-medium">ถึง:</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="p-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-3xl shadow-md hover:bg-blue-700 transition duration-200 flex items-center gap-2"
                onClick={() =>
                  console.log("ดูข้อมูลระหว่าง", startDate, "ถึง", endDate)
                }
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-search"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                  <path d="M21 21l-6 -6" />
                </svg>{" "}
                ดูข้อมูล
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-150"
              >
                {/* ไอคอนแบบ .svg */}
                <div className={`mr-3 ${stat.color}`}>{stat.icon}</div>
                <div>
                  <span className={`block text-md font-semibold ${stat.color}`}>
                    {stat.title}
                  </span>
                  <span className="text-gray-700">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Check-in Out */}
          <div className="mt-6 p-4 bg-white border-t-4 border-blue-500 rounded-lg shadow-md">
            <h3 className="text-md font-semibold text-gray-800">
              Check in-out
            </h3>
            <p className="text-gray-600">รวมการบันทึกเวลาเข้าออกทั้งหมด</p>
            <div className="flex justify-between mt-2">
              <p className="text-green-600 font-semibold flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                </svg>{" "}
                ปกติ: 31 ครั้ง
              </p>
              <p className="text-red-600 font-semibold flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="icon icon-tabler icons-tabler-filled icon-tabler-square-rounded-x"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                    fill="currentColor"
                    stroke-width="0"
                  />
                </svg>{" "}
                สาย: 2 ครั้ง
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-[#B5B5B5] mx-auto my-10 mt-10" />

      {/* Section for Basic Course */}
      <h1 className="depa-Header-text text-navy-blue mb-6 mt-10">
        Basic Course
      </h1>
      <table className="table-auto w-full bg-white shadow-md rounded-b-2xl">
        <thead>
          <tr className="bg-[#0C2F53] text-white text-center">
            <th className="py-3 px-4">ลำดับ</th>
            <th className="py-3 px-4"></th>
            <th className="py-3 px-4">ชื่องาน</th>
            <th className="py-3 px-4">สถานะ</th>
            <th className="py-3 px-4">คำอธิบาย</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr
              key={index}
              className={`text-center ${
                index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
              }`}
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">
                <img
                  src={course.image_url}
                  className="w-16 h-10 object-cover mx-auto rounded-2xl shadow-md"
                  alt={course.name}
                />
              </td>
              <td className="py-3 px-4 text-[#686868]">{course.name}</td>
              <td className="py-3 px-4 flex items-center justify-center gap-6">
                {/* Radio Button สำหรับ ผ่าน */}
                <label className="flex items-center cursor-pointer gap-2">
                  <input
                    type="radio"
                    name={`status-${index}`}
                    value="ผ่าน"
                    checked={course.status === "ผ่าน"}
                    onChange={() => handleStatusChangeBasic(index, "ผ่าน")}
                    className="hidden"
                  />
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all text-[#B5B5B5] ${
                      course.status === "ผ่าน"
                        ? "border-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {course.status === "ผ่าน" && (
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    )}
                  </span>
                  <span
                    className={`${
                      course.status === "ผ่าน"
                        ? "text-blue-600 font-medium"
                        : "text-[#707070]"
                    }`}
                  >
                    ผ่าน
                  </span>
                </label>

                {/* Radio Button สำหรับ ไม่ผ่าน */}
                <label className="flex items-center cursor-pointer gap-2">
                  <input
                    type="radio"
                    name={`status-${index}`}
                    value="ไม่ผ่าน"
                    checked={course.status === "ไม่ผ่าน"}
                    onChange={() => handleStatusChangeBasic(index, "ไม่ผ่าน")}
                    className="hidden"
                  />
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all text-[#B5B5B5] ${
                      course.status === "ไม่ผ่าน"
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                  >
                    {course.status === "ไม่ผ่าน" && (
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    )}
                  </span>
                  <span
                    className={`${
                      course.status === "ไม่ผ่าน"
                        ? "text-red-600 font-medium"
                        : "text-[#707070]"
                    }`}
                  >
                    ไม่ผ่าน
                  </span>
                </label>
              </td>

              {/* คำอธิบาย */}
              <td className="py-3 px-4 text-base">
                <div className="flex justify-center items-center">
                  <button
                    // onClick={() => handleOpenSeenModal(assignment)}
                    className="flex items-center justify-center drop-shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full py-2 px-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-file-text"
                    >
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      <path d="M10 9H8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                    </svg>
                    <p className="ml-1">อ่านคำอธิบาย</p>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Section for Basic Course */}
      <h1 className="depa-Header-text text-navy-blue mb-6 mt-10">Activity</h1>
      <table className="table-auto w-full bg-white shadow-md rounded-b-2xl">
        <thead>
          <tr className="bg-[#0C2F53] text-white text-center">
            <th className="py-3 px-4">ลำดับ</th>
            <th className="py-3 px-4"></th>
            <th className="py-3 px-4">กิจกรรม</th>
            <th className="py-3 px-4">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {activity.map((act, index) => (
            <tr
              key={index}
              className={`text-center ${
                index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
              }`}
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">
                <img
                  src={act.image_url}
                  className="w-16 h-10 object-cover mx-auto rounded-2xl shadow-md"
                  alt={act.name}
                />
              </td>
              <td className="py-3 px-4 text-[#686868]">{act.name}</td>
              <td className="py-3 px-4 flex items-center justify-center gap-6">
                {/* Radio Button สำหรับ ผ่าน */}
                <label className="flex items-center cursor-pointer gap-2">
                  <input
                    type="radio"
                    name={`status-${index}`}
                    value="ผ่าน"
                    checked={act.status === "ผ่าน"}
                    onChange={() => handleStatusChangeActivity(index, "ผ่าน")}
                    className="hidden"
                  />
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all text-[#B5B5B5] ${
                      act.status === "ผ่าน"
                        ? "border-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {act.status === "ผ่าน" && (
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    )}
                  </span>
                  <span
                    className={`${
                      act.status === "ผ่าน"
                        ? "text-blue-600 font-medium"
                        : "text-[#707070]"
                    }`}
                  >
                    ผ่าน
                  </span>
                </label>

                {/* Radio Button สำหรับ ไม่ผ่าน */}
                <label className="flex items-center cursor-pointer gap-2">
                  <input
                    type="radio"
                    name={`status-${index}`}
                    value="ไม่ผ่าน"
                    checked={act.status === "ไม่ผ่าน"}
                    onChange={() =>
                      handleStatusChangeActivity(index, "ไม่ผ่าน")
                    }
                    className="hidden"
                  />
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all text-[#B5B5B5] ${
                      act.status === "ไม่ผ่าน"
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                  >
                    {act.status === "ไม่ผ่าน" && (
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    )}
                  </span>
                  <span
                    className={`${
                      act.status === "ไม่ผ่าน"
                        ? "text-red-600 font-medium"
                        : "text-[#707070]"
                    }`}
                  >
                    ไม่ผ่าน
                  </span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HR_Detail;
