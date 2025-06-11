import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs"; // ✅ ใช้ DayJS ในการจัดการวันที่
import duration from "dayjs/plugin/duration";
import "dayjs/locale/th"; // ✅ ตั้งค่าเป็นภาษาไทย
import ModalSeenComment from "../components/Assignment/model_seen_comment";
import ModalSendComment from "../components/Assignment/model_send_comment";
import ModalEdit from "../components/Assignment/assignment_model_edit";
import ModalAdd from "../components/Assignment/assignment_model_add";
import ModalDetail from "../components/Assignment/assignment_model_detail";
import ModalDel from "../components/Assignment/assignment_model_del";

const Assignment = () => {
  const [assignmentData, setAssignmentData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || "N/A"; // ถ้าไม่มี user_id ให้แสดง "N/A"
  const [basicCourses, setBasicCourses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [developmentData, setDevelopmentData] = useState([]);

  const [mentor, setMentor] = useState([
    {
      title: "พี่เลี้ยง",
      name: "", // เริ่มต้นเป็นค่าว่าง แล้วให้ API มาอัปเดต
      img: "../src/assets/images/careerpath/user_test.png",
    },
  ]);
  const [head, setHead] = useState([
    {
      title: "หัวหน้า",
      name: "", // เริ่มต้นเป็นค่าว่าง แล้วให้ API มาอัปเดต
      img: "../src/assets/images/careerpath/user_test.png",
    },
  ]);
  //  แยกฟังก์ชันออกมา
  useEffect(() => {
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    // ดึงข้อมูล Basic Courses
    fetch("http://localhost:3000/api/basiccourses")
      .then((res) => res.json())
      .then((data) => setBasicCourses(data))
      .catch((err) => console.error("Error fetching basic courses:", err));

    // ดึงข้อมูล Activities
    fetch("http://localhost:3000/api/activitys")
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error("Error fetching activities:", err));

    // ดึงข้อมูล Development (เพื่อตรวจสอบสถานะของ user)
    fetch(`http://localhost:3000/api/developments/getStatus?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => setDevelopmentData(data))
      .catch((err) => console.error("Error fetching development data:", err));
  }, [userId]);

  // ตรวจสอบสถานะการอบรมของ Basic Course
  const checkBasicCourseStatus = (courseId) => {
    return developmentData.some((dev) => dev.course_id === courseId)
      ? "อบรมแล้ว"
      : "ยังไม่ได้อบรม";
  };

  // ตรวจสอบสถานะการอบรมของ Activity
  const checkActivityStatus = (activityId) => {
    return developmentData.some((dev) => dev.activity_id === activityId)
      ? "ทำแล้ว"
      : "ยังไม่ได้ทำ";
  };
  const fetchAssignments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/assignments?user_id=${userId}`
      );
      const data = await response.json();
      setAssignmentData(data);
    } catch (error) {
      console.error("Error fetching assignment data:", error);
    }
  };
  const fetchMentorandHead = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/relations/MentorandHead?user_id=${userId}`
      );
      const data = await response.json();

      console.log("📥 ข้อมูลที่โหลดได้:", data);

      // ✅ อัปเดตข้อมูล mentor
      setMentor((prevMentor) =>
        prevMentor.map((m, index) =>
          index === 0 ? { ...m, name: data.mentor_name } : m
        )
      );

      // ✅ อัปเดตข้อมูล head
      setHead((prevHead) =>
        prevHead.map((h, index) =>
          index === 0 ? { ...h, name: data.head_name } : h
        )
      );
    } catch (error) {
      console.error("❌ Error fetching mentor and head data:", error);
    }
  };

  // ✅ ใช้ useEffect เพื่อเรียกฟังก์ชัน
  useEffect(() => {
    if (userId !== "N/A") {
      fetchAssignments();
      fetchMentorandHead();
    }
  }, [userId]);

  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef(null); // ใช้ ref สำหรับเมนู
  const [filterType, setFilterType] = useState(""); // สำหรับเก็บค่าฟิลเตอร์
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // เปิด/ปิด Dropdown

  // ปิดเมนูเมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isModalSeenOpen, setIsModalSeenOpen] = useState(false);
  const handleOpenSeenModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalSeenOpen(true);
  };
  const handleCloseSeenModal = () => {
    setIsModalSeenOpen(false);
    fetchAssignments();
  };

  const [isModalSendOpen, setIsModalSendOpen] = useState(false);
  const handleOpenSendModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalSendOpen(true);
  };
  const handleCloseSendModal = () => {
    setIsModalSendOpen(false);
    fetchAssignments();
  };

  const [isModalEditOpen, setIsModalEdit] = useState(false);
  const handleOpenEditModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalEdit(true);
  };
  const handleCloseEditModal = () => {
    setIsModalEdit(false);
    fetchAssignments();
  };

  const [isModalAddOpen, setIsModalAdd] = useState(false);
  const handleOpenAddModal = () => setIsModalAdd(true);
  const handleCloseAddModal = () => {
    setIsModalAdd(false);
    fetchAssignments();
  };

  const [isModalDetailOpen, setIsModalDetail] = useState(false);
  const handleOpenDetailModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalDetail(true);
  };
  const handleCloseDetailModal = () => {
    setIsModalDetail(false);
    fetchAssignments();
  };

  const [isModalDelOpen, setIsModalDel] = useState(false);
  const handleOpenDelModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalDel(true);
  };
  const handleCloseDelModal = () => {
    setIsModalDel(false);
    fetchAssignments();
  };

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // ฟังก์ชันกรองข้อมูล
  const filteredAssignments = filterType
    ? assignmentData.filter((assignment) => assignment.type === filterType)
    : assignmentData;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    setIsDropdownOpen(false);
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  dayjs.extend(duration);
  dayjs.locale("th");
  const calculateTotalDuration = (start, end) => {
    if (!start || !end) return "ไม่ระบุ"; // ✅ ถ้าไม่มีข้อมูลให้แสดง "ไม่ระบุ"

    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const diffDuration = dayjs.duration(endDate.diff(startDate));

    const years = diffDuration.years();
    const months = diffDuration.months();
    const days = diffDuration.days();
    const hours = diffDuration.hours();

    let result = "";
    if (years > 0) result += `${years} ปี `;
    if (months > 0) result += `${months} เดือน `;
    if (days > 0) result += `${days} วัน `;
    if (hours > 0) result += `${hours} ชม.`;

    return result.trim() || "0 ชม."; // ✅ ถ้าไม่มีค่ากลับมา ให้แสดง "0 ชม."
  };

  return (
    <div className="p-8 bg-white min-h-screen rounded-xl drop-shadow-md">
      <div className="flex flex-wrap gap-4">
        {/* ส่วนของ Head */}
        {Array.isArray(head) &&
          head.map((head, index) => (
            <div
              key={`head-${index}`}
              className="bg-white rounded-[20px] drop-shadow-lg p-5 w-[320px] flex items-center relative transition-transform transform "
            >
              {/* รูปภาพของ Head */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #FFF200, #FFC600)",
                  padding: "6px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                }}
              >
                <img
                  src={head.img}
                  alt={head.name}
                  className="w-16 h-16 rounded-full"
                />
              </div>

              {/* ข้อมูลของ Head */}
              <div className="text-left ml-5 flex-1">
                <h2 className="text-lg font-semibold text-navy-blue">
                  {head.title}
                </h2>
                <p className="text-gray-600 text-md mt-1">
                  {head.name ? head.name : "ยังไม่มี"}
                </p>
              </div>
            </div>
          ))}

        {/* ส่วนของ Mentor */}
        {Array.isArray(mentor) &&
          mentor.map((mentor, index) => (
            <div
              key={`mentor-${index}`}
              className="bg-white rounded-[20px] drop-shadow-lg p-5 w-[320px] flex items-center relative transition-transform transform "
            >
              {/* รูปภาพของ Mentor */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #FFF200, #FFC600)",
                  padding: "6px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                }}
              >
                <img
                  src={mentor.img}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-full"
                />
              </div>

              {/* ข้อมูลของ Mentor */}
              <div className="text-left ml-5 flex-1">
                <h2 className="text-lg font-semibold text-navy-blue">
                  {mentor.title}
                </h2>
                <p className="text-gray-600 text-md mt-1">
                  {mentor.name ? mentor.name : "ยังไม่มี"}
                </p>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-between items-center mb-6 mt-6">
        <h1 className="text-2xl font-semibold text-[#0C2F53]">Assignment</h1>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white  hover:from-green-600 hover:to-green-700 font-medium py-2 px-5 shadow-sm rounded-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-md"
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          <span>เพิ่มงาน</span>
        </button>
      </div>
      <table className="table-auto w-full bg-white shadow-md rounded-b-xl">
        <thead>
          <tr className="bg-[#0C2F53] text-white text-center">
            <th className="py-3 px-4 text-xl">ลำดับ</th>
            <th className="py-3 px-4 text-xl">ชื่องาน</th>
            <th className="py-3 px-4 text-xl relative">
              {/* ไอคอน Dropdown */}
              <div className="inline-block">
                <button
                  className="flex items-center justify-center gap-2 focus:outline-none hover:text-blue-500 hover:scale-105 transition duration-200 ease-in-out"
                  onClick={toggleDropdown}
                >
                  ประเภท
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-list-filter"
                  >
                    <path d="M3 6h18" />
                    <path d="M7 12h10" />
                    <path d="M10 18h4" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-10 mt-4 w-28  bg-white text-black rounded-lg shadow-md z-10">
                    <ul className="py-1">
                      {/* ตัวเลือก: ทั้งหมด */}
                      <li
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#F5F5F5] ${
                          filterType === ""
                            ? "font-semibold text-blue-500 hover:bg-[#F5F5F5]"
                            : ""
                        }`}
                        onClick={() => handleFilterChange("")}
                      >
                        ทั้งหมด
                      </li>
                      {/* ตัวเลือก: Workload */}
                      <li
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#F5F5F5] ${
                          filterType === "Workload"
                            ? "font-semibold text-blue-500 hover:bg-[#F5F5F5]"
                            : ""
                        }`}
                        onClick={() => handleFilterChange("workload")}
                      >
                        Workload
                      </li>
                      {/* ตัวเลือก: Assignments */}
                      <li
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#F5F5F5] ${
                          filterType === "Assignments"
                            ? "font-semibold text-blue-500 hover:bg-[#F5F5F5]"
                            : ""
                        }`}
                        onClick={() => handleFilterChange("assignment")}
                      >
                        Assignments
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </th>
            <th className="py-3 px-4 text-xl">ระยะเวลา</th>
            <th className="py-3 px-4 text-xl">สถานะ</th>
            <th className="py-3 px-4 text-xl">ความเห็นผู้บังคับบัญชา</th>
            <th className="py-3 px-4 text-xl"></th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map((assignment, index) => (
            <tr
              key={index}
              className={`text-center ${
                index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
              }`}
            >
              <td className="py-3 px-4 text-base">{index + 1}</td>
              <td className="py-3 px-4 text-base">{assignment.name}</td>
              <td className="py-3 px-4 text-base">{assignment.type}</td>
              <td className="py-3 px-4">
                {assignment.type !== "workload"
                  ? calculateTotalDuration(
                      assignment.date_start,
                      assignment.date_end
                    )
                  : "ไม่ระบุ"}
              </td>

              {/* สถานะ */}
              <td className="py-3 px-4 flex items-center justify-center">
                <span className="flex items-center justify-center drop-shadow-lg bg-white text-[#686868] rounded-full py-2 px-0.5 h-[40px] w-[120px]">
                  <span
                    className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full text-white ${
                      assignment.status === "1"
                        ? "bg-[#33AC5E]" // สีเขียว = ผ่าน
                        : assignment.status === "0"
                        ? "bg-[#DD2025]" // สีแดง = ไม่ผ่าน
                        : "bg-[#FFC107]" // สีเหลือง = รอการตรวจสอบ
                    }`}
                  >
                    {assignment.status === "1" ? (
                      // ไอคอน "ผ่าน"
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
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    ) : assignment.status === "0" ? (
                      // ไอคอน "ไม่ผ่าน"
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
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="12" />
                        <line x1="12" x2="12.01" y1="16" y2="16" />
                      </svg>
                    ) : (
                      // ไอคอน "รอการตรวจสอบ"
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
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="12" />
                        <line x1="12" x2="12.01" y1="16" y2="16" />
                      </svg>
                    )}
                  </span>
                  {assignment.status === "1"
                    ? "ผ่าน"
                    : assignment.status === "0"
                    ? "ไม่ผ่าน"
                    : "รอตรวจ"}
                </span>
              </td>

              {/* คำอธิบาย */}
              <td className="py-3 px-4 text-base">
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => handleOpenSeenModal(assignment)}
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
                    <p className="ml-1">อ่านความเห็น</p>
                  </button>
                </div>
              </td>

              {/* Action - จุด 3 จุด (SVG) */}
              <td className="py-3 px-4 relative ">
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => toggleMenu(index)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="gray"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </button>
                </div>
                {menuOpen === index && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
                  >
                    <ul className="py-2">
                      {/* แก้ไข */}
                      {/* <li
                        className="flex items-center px-4 py-2 hover:bg-[#F5F5F5] text-[#FFC600] cursor-pointer"
                        onClick={() => handleOpenEditModal(assignment)}
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
                        <p className="ml-1">แก้ไข</p>
                      </li> */}

                      {/* ดูรายละเอียด */}
                      <li
                        onClick={() => handleOpenDetailModal(assignment)}
                        className="flex items-center px-4 py-2 hover:bg-[#F5F5F5] text-[#971ACC] cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                          />
                        </svg>
                        <p className="ml-1">ดูรายละเอียด</p>
                      </li>

                      {/* ลบ */}
                      <li
                        onClick={() => handleOpenDelModal(assignment)}
                        className="flex items-center px-4 py-2 hover:bg-[#F5F5F5] text-[#DD2025] cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <p className="ml-1">ลบ</p>
                      </li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-[2px] bg-[#B5B5B5] mx-auto my-4 mt-20" />
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
          </tr>
        </thead>
        <tbody>
          {basicCourses.map((course, index) => (
            <tr
              key={course.course_id}
              className={`text-center ${
                index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
              }`}
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">
                <img
                  src={
                    course.image_url ||
                    "../src/assets/images/careerpath/cp1.png"
                  }
                  className="w-16 h-10 object-cover mx-auto rounded-2xl shadow-md"
                  alt={course.course_name}
                />
              </td>
              <td className="py-3 px-4 text-[#686868]">{course.course_name}</td>
              <td className="py-3 px-4 flex items-center justify-center">
                <span className="flex items-center justify-center drop-shadow-lg bg-white text-[#686868] rounded-full py-2 px-0.5 h-[40px] w-[130px]">
                  <span
                    className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full text-white ${
                      checkBasicCourseStatus(course.course_id) === "อบรมแล้ว"
                        ? "bg-[#33AC5E]"
                        : "bg-[#DD2025]"
                    }`}
                  >
                    {checkBasicCourseStatus(course.course_id) === "อบรมแล้ว" ? (
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
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    ) : (
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
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="12" />
                        <line x1="12" x2="12.01" y1="16" y2="16" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[#686868]">
                    {checkBasicCourseStatus(course.course_id)}
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-[2px] bg-[#B5B5B5] mx-auto my-4 mt-20" />
      {/* Section for Activities */}
      <h1 className="depa-Header-text text-navy-blue mb-6 mt-10">Activity</h1>
      <table className="table-auto w-full bg-white shadow-md rounded-b-2xl">
        <thead>
          <tr className="bg-[#0C2F53] text-white text-center">
            <th className="py-3 px-4">ลำดับ</th>
            <th className="py-3 px-4"></th>
            <th className="py-3 px-4">ชื่องาน</th>
            <th className="py-3 px-4">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr
              key={activity.activity_id}
              className={`text-center ${
                index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
              }`}
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">
                <img
                  src={
                    activity.image_url ||
                    "../src/assets/images/careerpath/cp1.png"
                  }
                  className="w-16 h-10 object-cover mx-auto rounded-2xl shadow-md"
                  alt={activity.activity_name}
                />
              </td>
              <td className="py-3 px-4 text-[#686868]">
                {activity.activity_name}
              </td>
              <td className="py-3 px-4 flex items-center justify-center">
                <span className="flex items-center justify-center drop-shadow-lg bg-white text-[#686868] rounded-full py-2 px-0.5 h-[40px] w-[130px]">
                  <span
                    className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full text-white ${
                      checkActivityStatus(activity.activity_id) === "ทำแล้ว"
                        ? "bg-[#33AC5E]"
                        : "bg-[#DD2025]"
                    }`}
                  >
                    {checkActivityStatus(activity.activity_id) === "ทำแล้ว" ? (
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
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    ) : (
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
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="12" />
                        <line x1="12" x2="12.01" y1="16" y2="16" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[#686868]">
                    {checkActivityStatus(activity.activity_id)}
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalSeenComment
        isOpen={isModalSeenOpen}
        onClose={handleCloseSeenModal}
        assignment={selectedAssignment}
      />
      <ModalSendComment
        isOpen={isModalSendOpen}
        onClose={handleCloseSendModal}
        assignment={selectedAssignment}
      />
      <ModalEdit
        isOpen={isModalEditOpen}
        onClose={handleCloseEditModal}
        assignment={selectedAssignment}
      />
      <ModalAdd isOpen={isModalAddOpen} onClose={handleCloseAddModal} />
      <ModalDetail
        isOpen={isModalDetailOpen}
        onClose={handleCloseDetailModal}
        assignment={selectedAssignment}
      />
      <ModalDel
        isOpen={isModalDelOpen}
        onClose={handleCloseDelModal}
        assignment={selectedAssignment}
      />
    </div>
  );
};

export default Assignment;
