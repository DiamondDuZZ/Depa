import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs"; // ✅ ใช้ DayJS ในการจัดการวันที่
import duration from "dayjs/plugin/duration";
import "dayjs/locale/th"; // ✅ ตั้งค่าเป็นภาษาไทย
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ModalSendEstimateComment from "./model_estimate_comment";
import ModalSendEstimateComment2 from "./model_estimate_comment2";
import ModalSendEstimateCommentAll from "./model_estimate_commentall";
import ModalSendEstimateCommentAll2 from "./model_estimate_commentall2";
import ModalSeenCommentAll from "../components/Assignment/model_seen_comment_all";
import ModalEdit from "../components/Assignment/assignment_model_edit";
import ModalAdd from "../components/Assignment/assignment_model_add";
import ModalDetail from "../components/Assignment/assignment_model_detail";
import ModalDel from "../components/Assignment/assignment_model_del";
import ModelAddmentor from "../components/Department/add_mentor";
import ModalDelMentor from "../components/Department/del_mentor";
import ModalDelOther from "../components/Department/del_other";

import { useLocation, useNavigate } from "react-router-dom";
import { comment } from "postcss";
import { h2 } from "framer-motion/m";
import Department_O from "./department_other";

const Department_O_D = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [task, setTask] = useState(location.state?.task || {}); // ✅ รับค่าที่ถูกส่งมาจาก Department_H
  const [assignmentData, setAssignmentData] = useState([]);
  const [isModalDelMentorOpen, setIsModalDelMentorOpen] = useState(false);
  const [mentorData, setMentorData] = useState(task.mentor);
  const [basicCourses, setBasicCourses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [developmentData, setDevelopmentData] = useState([]);
  const userId = task.user_id || "N/A"; // ถ้าไม่มี user_id ให้แสดง "N/A"
  const [users2, setUsers2] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [userIds2, setUserIds2] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedOtherId, setSelectedOtherId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.userId || "N/A"; // ถ้าไม่มี user_id ให้แสดง "N/A"

  const [mentor, setMentor] = useState([
    {
      title: "พี่เลี้ยง",
      name: "", // เริ่มต้นเป็นค่าว่าง แล้วให้ API มาอัปเดต
      img: "../src/assets/images/careerpath/user_test.png",
    },
  ]);
  useEffect(() => {
    console.log("🔄 task.mentor เปลี่ยนแปลง:", task.mentor);
    fetchMentor();
  }, [task.mentor]);

  const handleChangeMentor = async () => {
    // ตรวจสอบว่ามีการเลือกข้อมูลหรือไม่

    // สร้าง payload สำหรับส่งไปยัง API
    const payload = {
      user_id: task.user_id, // ข้อความ comment (อาจเป็นข้อมูลเพิ่มเติม)
      mentorUserId: null,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/relations/updateMentor",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        // ส่งข้อมูลสำเร็จ
        toast.success("🎉 ลบพี่เลี้ยงสำเร็จ!");
        setTask((prevTask) => ({
          ...prevTask,
          mentor: null, // ล้างค่า mentor ใน task
        }));
        setMentorData(null);
      } else {
        console.error("Error saving mentor data");
        toast.error(" อัปเดตสถาณะล้มเหลว!");
      }
    } catch (error) {
      console.error("Error saving mentor data:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };
  const fetchAssignments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/assignments?user_id=${task.user_id}`
      );
      const data = await response.json();
      setAssignmentData(data);
    } catch (error) {
      console.error("Error fetching assignment data:", error);
    }
  };
  const fetchMentor = async () => {
    console.log("✅ ก่อนเรียกชื่อพี่เลี้ยง task.mentor:", task.mentor);

    if (!task.mentor) {
      console.log("⛔ ไม่มี mentor ให้เรียกข้อมูล");
      setMentorData(null);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/relations/Mentor?user_id=${task.mentor}`
      );
      const data = await response.json();

      console.log("📥 ข้อมูล mentor ที่โหลดได้:", data);

      if (data.name) {
        setMentor((prevMentor) =>
          prevMentor.map((m, index) =>
            index === 0 ? { ...m, name: data.name } : m
          )
        );
        setMentorData(data);
      }
    } catch (error) {
      console.error("❌ Error fetching mentor data:", error);
    }
  };
  const fetchOther = async () => {
    try {
      // 🔹 ดึงข้อมูลจาก relation
      const relationData = await fetch(
        `http://localhost:3000/api/relations/other/${task.user_id}`
      ).then((res) => res.json());

      if (!relationData?.other) return;

      // 🔹 แปลงค่าคอลัมน์ "other" ให้เป็น array ของ id เช่น "2|3|4" -> [2,3,4]
      const ids = relationData.other.split("|").map((id) => parseInt(id, 10));
      const ids2 = relationData.other
        .split("|")
        .map((id) => parseInt(id, 10))
        .join(",");
      setUserIds(ids);
      setUserIds2(ids2);

      // 🔹 ดึงข้อมูลผู้ใช้ที่ตรงกับ userIds
      const usersData = await fetch(
        `http://localhost:3000/api/relations/othername?ids=${ids.join(",")}`
      ).then((res) => res.json());

      // ✅ เรียง usersData ตามลำดับของ userIds ที่ได้จาก "other"
      const sortedUsers = ids.map((id) =>
        usersData.find((user) => user.user_id === id)
      );

      setUsers2(sortedUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleRemove = (removeId) => {
    setUserIds((prevUserIds) => {
      if (prevUserIds.length === 0) {
        console.error("❌ Error: userIds ว่างเปล่า ไม่สามารถลบได้");
        return prevUserIds;
      }

      const newIds = prevUserIds.filter((id) => id !== removeId);
      console.log("🔹 อัปเดต userIds:", newIds);

      setUsers2((prevUsers) => {
        const newUsers = prevUsers.filter((user) => user?.user_id !== removeId);
        console.log("🔹 อัปเดต users2:", newUsers);
        return newUsers;
      });
      setUserIds2(newIds.join(","));
      updateOther(newIds);
      return newIds;
    });
  };

  const handleAddUser = (event) => {
    const newUserId = parseInt(event.target.value, 10);
    if (userIds.includes(newUserId)) return; // กันซ้ำ

    const selectedUser = allUsers.find((user) => user.user_id === newUserId);
    if (!selectedUser) return;

    // 🔹 อัปเดตรายการ
    const updatedUserIds = [...userIds, newUserId];
    const updatedUsers = [...users2, selectedUser];

    setUserIds(updatedUserIds);
    setUsers2(updatedUsers);
    setUserIds2(updatedUserIds.join(","));
    updateOther(updatedUserIds);
  };

  // ✅ อัปเดตค่า `other` ไปที่ backend
  const updateOther = async (newIds) => {
    console.log("📌 อัปเดต other:", newIds);

    try {
      await fetch(`http://localhost:3000/api/relations/update-other`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: task.user_id, other: newIds }),
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const allUsersData = await fetch(
        "http://localhost:3000/api/users/gethname"
      ).then((res) => res.json());
      setAllUsers(allUsersData);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    if (task.user_id !== "N/A") {
      fetchAssignments();
    }
    if (task.user_id !== "N/A") {
      fetchMentor();
    }
    if (task.user_id !== "N/A") {
      fetchOther();
      fetchAllUsers();
    }
  }, [task.user_id]);

  if (!task) {
    return <p className="text-center mt-10 text-red-500">ไม่พบข้อมูล</p>;
  }
  const [isModalSeenOpen, setIsModalSeenOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2024-10-01"));
  const [endDate, setEndDate] = useState(new Date("2025-01-21"));

  const handleOpenSeenModal = (task) => {
    setSelectedAssignment(task);
    setIsModalSeenOpen(true);
  };
  const handleCloseSeenModal = () => {
    setIsModalSeenOpen(false);
    fetchAssignments();
  };

  const [isModalSendEstimateOpen, setIsModalSendEstimateOpen] = useState(false);
  const handleOpenSendEstimateModal = (task) => {
    setSelectedAssignment(task);
    setIsModalSendEstimateOpen(true);
  };
  const handleCloseSendEstimateModal = () => {
    setIsModalSendEstimateOpen(false);
    fetchAssignments();
  };
  const [isModalSendEstimate2Open, setIsModalSendEstimate2Open] =
    useState(false);
  const handleOpenSendEstimate2Modal = (task) => {
    setSelectedAssignment(task);
    setIsModalSendEstimate2Open(true);
  };
  const handleCloseSendEstimate2Modal = () => {
    setIsModalSendEstimate2Open(false);
    fetchAssignments();
  };
  const [isModalSendEstimateAllOpen, setIsModalSendEstimateAllOpen] =
    useState(false);
  const handleOpenSendEstimateAllModal = (task) => {
    setSelectedAssignment(task);
    setIsModalSendEstimateAllOpen(true);
  };
  const handleCloseSendEstimateAllModal = () => {
    setIsModalSendEstimateAllOpen(false);
    fetchAssignments();
  };
  const [isModalSendEstimateAll2Open, setIsModalSendEstimateAll2Open] =
    useState(false);
  const handleOpenSendEstimateAll2Modal = (task) => {
    setSelectedAssignment(task);
    setIsModalSendEstimateAll2Open(true);
  };
  const handleCloseSendEstimateAll2Modal = () => {
    setIsModalSendEstimateAll2Open(false);
    fetchAssignments();
  };

  const [isModelAddmentorOpen, setIsModelAddmentorOpen] = useState(false);
  const handlelAddmentorModal = (task) => {
    setSelectedAssignment(task);
    setIsModelAddmentorOpen(true);
  };
  const handleCloseAddmentorModal = () => {
    setIsModelAddmentorOpen(false);
    fetchAssignments();
    fetchMentor();
  };

  const [isModalEditOpen, setIsModalEdit] = useState(false);
  const handleOpenEditModal = (task) => {
    setSelectedAssignment(task);
    setIsModalEdit(true);
  };
  const handleCloseEditModal = () => {
    setIsModalEdit(false);
    fetchAssignments();
  };

  const [isModalAddOpen, setIsModalAdd] = useState(false);
  const handleOpenAddModal = (task) => {
    console.log(task);
    setSelectedAssignment(task);
    setIsModalAdd(true);
  };
  const handleCloseAddModal = () => {
    setIsModalAdd(false);
    fetchAssignments();
  };
  const [isModalOtherOpen, setIsModalOther] = useState(false);
  const handleOpenOtherModal = (task) => {
    setSelectedOtherId(task);
    setIsModalOther(true);
  };
  const handleCloseOtherModal = () => {
    setIsModalOther(false);
    fetchAssignments();
  };

  const [isModalDetailOpen, setIsModalDetail] = useState(false);
  const handleOpenDetailModal = (task) => {
    setSelectedAssignment(task);
    setIsModalDetail(true);
  };
  dayjs.extend(duration);
  dayjs.locale("th");
  const formatDateTime = (dateString) => {
    if (!dateString || dateString === "0000-00-00 00:00:00") return "ไม่ระบุ";

    const date = new Date(dateString);

    // ตั้งค่าแสดงวันที่แบบไทย
    const formattedDate = new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

    // ตั้งค่าแสดงเวลาแบบ 24 ชั่วโมง
    const formattedTime = new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // ใช้ระบบ 24 ชั่วโมง
      timeZone: "Asia/Bangkok", // ปรับโซนเวลาให้เป็นไทย
    }).format(date);

    return `${formattedDate}`;
  };
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
  const handleCloseDetailModal = () => {
    setIsModalDetail(false);
    fetchAssignments();
  };

  const [isModalDelOpen, setIsModalDel] = useState(false);
  const handleOpenDelModal = (task) => {
    setSelectedAssignment(task);
    setIsModalDel(true);
  };
  const handleCloseDelModal = () => {
    setIsModalDel(false);
    fetchAssignments();
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    console.log(taskId, newStatus);
    try {
      const response = await fetch(
        "http://localhost:3000/api/assignments/updateTaskStatus",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ taskId: taskId, status: newStatus }),
        }
      );
      if (response.ok) {
        fetchAssignments();
        toast.success("🎉 อัปเดตสถาณะสำเร็จ!");
        console.log("Status updated successfully");
      } else {
        toast.error("❌ อัปเดตสถานะไม่สำเร็จ!");
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const profileData = {
    id: task.user_id,
    name: task.f_name,
    position: task.depart_name,
    endDate: task.evaluate_expired,
    img: "../src/assets/images/employee_pro/user2.jpg",
    progress: task.progress,
  };

  const tasks = assignmentData.map((assignment) => ({
    assignment_id: assignment.assignment_id,
    name: assignment.name,
    type: assignment.type,
    date_start: assignment.date_start,
    date_end: assignment.date_end,
    status: assignment.status,
    comment: assignment.user_comment,
    user_comment: assignment.comment,
    description: assignment.description,
    result_expected: assignment.result_expected,
    result: assignment.result,
    file_path: assignment.file_path,
  }));

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

  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef(null);
  const [filterType, setFilterType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ฟังก์ชันกรองข้อมูล
  const filteredTasks = filterType
    ? tasks.filter((assignment) => assignment.type === filterType)
    : tasks;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    setIsDropdownOpen(false);
  };

  const toggleMenu = (taskIndex) => {
    setMenuOpen(menuOpen === taskIndex ? null : taskIndex);
  };

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
  return (
    <>
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
                  <span className="ml-4 text-[#686868]">
                    {profileData.name}
                  </span>
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
                    {formatDateTime(profileData.endDate)}
                  </span>
                </p>
                <button
                  className="mt-2 flex  items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#74C5FF] to-[#3B82F6] text-white rounded-[20px] text-sm shadow-md hover:bg-blue-600"
                  onClick={() =>
                    task.level_levels >= 3
                      ? handleOpenSendEstimateAll2Modal(profileData.id)
                      : handleOpenSendEstimateAllModal(profileData.id)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                  <p>ประเมินผล</p>
                </button>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-navy-blue mr-2">
                    ความคืบหน้าในงาน:
                  </p>
                  <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center relative">
                      <div className="w-[200px] h-[30px] bg-gray-200 rounded-full dark:bg-gray-700 shadow-md relative">
                        {/* % Text กลาง Progress Bar */}
                        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-navy-blue z-10">
                          {task.progress}%
                        </span>

                        {/* Progress Bar */}
                        <div
                          className="h-[30px] bg-gradient-to-r from-[#FFC600] to-[#FFF200] rounded-full shadow-lg"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ส่วนพี่เลี้ยง */}
            <div className="flex gap-4">
              {mentorData === null ? (
                <button
                  className="flex items-center gap-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-full shadow-lg transition-all duration-300 ease-in-out "
                  disabled
                >
                  {/* ข้อความ "เพิ่มพี่เลี้ยง" */}
                  <span className="font-medium text-sm tracking-wide">
                    ยังไม่มีพี่เลี้ยง
                  </span>
                </button>
              ) : (
                // ✅ ถ้า task.mentor มีค่า ให้แสดง mentor ตามปกติ
                mentor.map((mentor, index) => (
                  <div
                    key={index}
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
                        {mentor.name}
                      </p>
                    </div>

                    {/* ปุ่มลบ */}
                    
                  </div>
                ))
              )}
            </div>

            {/* เส้นกั้นระหว่าง User Cards Section และ User2 Cards Section */}
            <div className="border-t border-[#B5B5B5] my-6"></div>

            {/* User2 Cards Section */}
            <div className="grid grid-cols-2 gap-4">
              {users2.length > 0 ? (
                users2.map((user2, index) => (
                  <div
                    key={user2.user_id}
                    className="bg-white rounded-[30px] drop-shadow-md p-4 w-[320px] h-auto flex items-center gap-4 justify-between"
                  >
                    {/* วงกลมสีฟ้าซ้อนวงกลมสีขาว */}
                    <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#74C5FF] to-[#3B82F6] rounded-full shadow-md">
                      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
                        <p className="text-navy-blue font-semibold text-[24px]">
                          {index + 1}
                        </p>
                      </div>
                    </div>

                    {/* ข้อมูลชื่อและปุ่ม */}
                    <div className="flex flex-col flex-grow">
                      <p className="text-navy-blue font-semibold text-[16px] text-center">
                        {user2.f_name}
                      </p>

                      {/* 🔹 ปุ่ม "ประเมินผล" จะแสดงเมื่อ userId จาก localStorage ตรงกับ user2.user_id */}
                      {userID === user2.user_id && (
                        <button
                          className="mt-2 ml-10 w-[125px] flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#74C5FF] to-[#3B82F6] text-white rounded-[20px] text-sm shadow-md hover:bg-blue-600"
                          onClick={() =>
                            task.level_levels >= 3
                              ? handleOpenSendEstimate2Modal(user2.user_id)
                              : handleOpenSendEstimateModal(user2.user_id)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                            />
                          </svg>
                          <p>ประเมินผล</p>
                        </button>
                      )}
                    </div>

                    {/* ปุ่มลบ - ใช้ ml-auto เพื่อดันไปขวาสุด */}
                    
                  </div>
                ))
              ) : (
                <p className="text-gray-500">ไม่มีข้อมูล</p>
              )}
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
              <p className="text-sm text-gray-200">
                ดูข้อมูลการทำงานของพนักงาน
              </p>
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
                    <span
                      className={`block text-md font-semibold ${stat.color}`}
                    >
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

        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-[#0C2F53]">
              Assignment
            </h1>
          </div>
          <table className="table-auto w-full bg-white shadow-md rounded-b-2xl">
            <thead>
              <tr className="bg-[#0C2F53] text-white text-center">
                <th className="py-3 px-4">ลำดับ</th>
                <th className="py-3 px-4">ชื่องาน</th>
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
                              filterType === "workload"
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
                              filterType === "assignments"
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
                <th className="py-3 px-4">ระยะเวลา</th>
                <th className="py-3 px-4">สถานะ</th>
                <th className="py-3 px-4">ความเห็นผู้บังคับบัญชา</th>
                <th className="py-3 px-4">ดูรายละเอียด</th>
                <th className="py-3 px-4"> </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, taskIndex) => (
                <tr
                  key={taskIndex}
                  className={`text-center ${
                    taskIndex % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
                  }`}
                >
                  <td className="py-3 px-4">{taskIndex + 1}</td>
                  <td className="py-3 px-4 text-[#686868]">{task.name}</td>
                  <td className="py-3 px-4 text-[#686868]">{task.type}</td>
                  <td className="py-3 px-4">
                    {task.type !== "workload"
                      ? calculateTotalDuration(task.date_start, task.date_end)
                      : "ไม่ระบุ"}
                  </td>
                  {/* สถานะ */}
                  {/* สถานะ */}
                  <td className="py-3 px-4 flex items-center justify-center">
                    <span className="flex items-center justify-center drop-shadow-lg bg-white text-[#686868] rounded-full py-2 px-0.5 h-[40px] w-[120px]">
                      <span
                        className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full text-white ${
                          task.status === "1"
                            ? "bg-[#33AC5E]" // สีเขียว = ผ่าน
                            : task.status === "0"
                            ? "bg-[#DD2025]" // สีแดง = ไม่ผ่าน
                            : "bg-[#FFC107]" // สีเหลือง = รอการตรวจสอบ
                        }`}
                      >
                        {task.status === "1" ? (
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
                        ) : task.status === "0" ? (
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

                      <span className="text-[#686868] font-medium text-center">
                        {task.status === "1"
                          ? "ผ่าน"
                          : task.status === "0"
                          ? "ไม่ผ่าน"
                          : "รอตรวจ"}
                      </span>
                    </span>
                  </td>

                  {/* คำอธิบาย */}
                  <td className="py-3 px-4 text-base">
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => handleOpenSeenModal(task)}
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
                        <p className="ml-1">ความเห็นผู้บังคับบัญชา</p>
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-base">
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => handleOpenDetailModal(task)}
                        className="flex items-center justify-center drop-shadow-lg bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full py-2 px-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-md"
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
                        <p className="ml-1">ดูรายละเอียด</p>
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                <td className="py-3 px-4 text-[#686868]">
                  {course.course_name}
                </td>
                <td className="py-3 px-4 flex items-center justify-center">
                  <span className="flex items-center justify-center drop-shadow-lg bg-white text-[#686868] rounded-full py-2 px-0.5 h-[40px] w-[130px]">
                    <span
                      className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full text-white ${
                        checkBasicCourseStatus(course.course_id) === "อบรมแล้ว"
                          ? "bg-[#33AC5E]"
                          : "bg-[#DD2025]"
                      }`}
                    >
                      {checkBasicCourseStatus(course.course_id) ===
                      "อบรมแล้ว" ? (
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
                      {checkActivityStatus(activity.activity_id) ===
                      "ทำแล้ว" ? (
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
        {/* Modal */}
        <ModalSeenCommentAll
          isOpen={isModalSeenOpen}
          onClose={handleCloseSeenModal}
          assignment={selectedAssignment}
          userIds={userIds2}
          users2={users2}
        />
        <ModalSendEstimateComment
          isOpen={isModalSendEstimateOpen}
          onClose={handleCloseSendEstimateModal}
          prouserID={userID}
          userID={task.user_id || "N/A"}
        />
        <ModalSendEstimateComment2
          isOpen={isModalSendEstimate2Open}
          onClose={handleCloseSendEstimate2Modal}
          prouserID={userID}
          userID={task.user_id || "N/A"}
        />
        <ModalSendEstimateCommentAll
          isOpen={isModalSendEstimateAllOpen}
          onClose={handleCloseSendEstimateAllModal}
          userID={task.user_id || "N/A"}
          userIds={userIds2}
        />
        <ModalSendEstimateCommentAll2
          isOpen={isModalSendEstimateAll2Open}
          onClose={handleCloseSendEstimateAll2Modal}
          userID={task.user_id || "N/A"}
          userIds={userIds2}
        />
        <ModalEdit
          isOpen={isModalEditOpen}
          onClose={handleCloseEditModal}
          assignment={selectedAssignment}
          title="ผลการดำเนินงาน"
          head="ประเมินงาน"
        />
        <ModalAdd
          isOpen={isModalAddOpen}
          onClose={handleCloseAddModal}
          assignment={selectedAssignment}
          title="มอบหมายงาน"
        />
        <ModalDetail
          isOpen={isModalDetailOpen}
          onClose={handleCloseDetailModal}
          assignment={selectedAssignment}
          title="มอบหมายงาน"
        />
        <ModalDel
          isOpen={isModalDelOpen}
          onClose={handleCloseDelModal}
          assignment={selectedAssignment}
        />
        <ModelAddmentor
          isOpen={isModelAddmentorOpen}
          onClose={handleCloseAddmentorModal}
          task={selectedAssignment}
          setTask={setTask}
        />
        {/* ModalDelMentor */}
        <ModalDelMentor
          isOpen={isModalDelMentorOpen}
          onClose={() => setIsModalDelMentorOpen(false)}
          mentor={mentorData}
          handleChangeMentor={handleChangeMentor} // ✅ ส่งฟังก์ชันไปให้ Modal
        />
        <ModalDelOther
          isOpen={isModalOtherOpen}
          onClose={handleCloseOtherModal}
          selectedOtherId={selectedOtherId}
          handleRemove={handleRemove} // ✅ ส่งฟังก์ชันไปให้ Modal
        />
      </div>
    </>
  );
};

export default Department_O_D;
