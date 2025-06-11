import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModal from "../components/HR/popcourse";

const Editdevelopment = () => {
  const [basicCourses, setBasicCourses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({ name: "", image_url: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [type, setType] = useState("course");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [courseRes, activityRes] = await Promise.all([
        fetch("http://localhost:3000/api/basiccourses"),
        fetch("http://localhost:3000/api/activitys"),
      ]);
      const courses = await courseRes.json();
      const activities = await activityRes.json();
      setBasicCourses(courses);
      setActivities(activities);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    const url =
      type === "course"
        ? `http://localhost:3000/api/developments/basiccourses${
            isEditing ? `/${editId}` : ""
          }`
        : `http://localhost:3000/api/developments/activities${
            isEditing ? `/${editId}` : ""
          }`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!res.ok) throw new Error("Error saving data");

      setFormData({ name: "", image: null });
      setIsEditing(false);
      setEditId(null);
      setIsModalOpen(false);
      fetchData();
      toast.success(isEditing ? "อัปเดตข้อมูลสำเร็จ!" : "เพิ่มข้อมูลสำเร็จ!");
    } catch (error) {
      console.error("❌ Error saving data:", error);
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  const openEditModal = (item, itemType) => {
    setFormData({
      name: item.course_name || item.activity_name,
      image: null, // ไฟล์ใหม่จะถูกอัปโหลดเมื่อเลือกใหม่
      imageName: item.image_url || "", // ✅ เก็บชื่อไฟล์เดิมไว้
    });
    setIsEditing(true);
    setEditId(item.course_id || item.activity_id);
    setType(itemType);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, itemType) => {
    const url =
      itemType === "course"
        ? `http://localhost:3000/api/developments/basiccourses/${id}`
        : `http://localhost:3000/api/developments/activities/${id}`;

    try {
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error("Error deleting data");
      fetchData();
      toast.success("ลบข้อมูลสำเร็จ!");
    } catch (error) {
      console.error("❌ Error deleting data:", error);
    }
  };
  const handleadd = () => {
    setIsModalOpen(true);
    setFormData({ name: "", image_url: "" });
    setIsEditing(false);
    setEditId(null);
    setType("course");
  };
  return (
    <div className="p-8 bg-white min-h-screen rounded-xl drop-shadow-md">
      <h1 className="text-2xl font-bold text-navy-blue mb-6">
        จัดการ Basic Courses และ Activities
      </h1>
      <button
        onClick={handleadd}
        className="mb-4 mt-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition duration-200"
      >
        เพิ่มข้อมูล
      </button>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        type={type}
        setType={setType}
      />
      <h2 className="text-xl font-semibold text-navy-blue mb-4">
        Basic Courses
      </h2>
      <table className="table-auto w-full mb-8 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-[#0C2F53] text-white">
            <th className="py-3 px-4">ลำดับ</th>
            <th className="py-3 px-4">ชื่อ</th>
            <th className="py-3 px-4">รูปภาพ</th>
            <th className="py-3 px-4">จัดการ</th>
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
              <td className="py-3 px-4">{course.course_name}</td>
              <td className="py-3 px-4">
                {course.image_url && (
                  <img
                    src={`/assets/images/acticourse/${course.image_url}`}
                    alt={course.course_name}
                    className="w-16 h-10 mx-auto rounded"
                  />
                )}
              </td>
              <td className="py-3 px-4 flex justify-center items-center space-x-2">
                <button
                  onClick={() => openEditModal(course, "course")}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition duration-200"
                >
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
                    className="w-5 h-5"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                    <path d="M16 5l3 3" />
                  </svg>
                  <span>แก้ไข</span>
                </button>

                <button
                  onClick={() => handleDelete(course.course_id, "course")}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-md hover:from-red-500 hover:to-red-700 transition duration-200"
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
                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                  <span>ลบ</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ตาราง Activities */}
      <h2 className="text-xl font-semibold text-navy-blue mb-4">Activities</h2>
      <table className="table-auto w-full shadow-lg rounded-lg">
        <thead>
          <tr className="bg-[#0C2F53] text-white text-center">
            <th className="py-3 px-4">ลำดับ</th>
            <th className="py-3 px-4">ชื่อ</th>
            <th className="py-3 px-4">รูปภาพ</th>
            <th className="py-3 px-4">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr
              key={activity.activity_id}
              className={`text-center ${
                index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
              } hover:bg-gray-100 transition`}
            >
              <td className="py-3 px-4 font-medium text-gray-700">
                {index + 1}
              </td>
              <td className="py-3 px-4 text-gray-700">
                {activity.activity_name}
              </td>
              <td className="py-3 px-4">
                {activity.image_url && (
                  <img
                    src={`/assets/images/acticourse/${activity.image_url}`}
                    alt={activity.activity_name}
                    className="w-16 h-10 mx-auto rounded shadow-md"
                  />
                )}
              </td>
              <td className="py-3 px-4 flex justify-center items-center space-x-2">
                <button
                  onClick={() => openEditModal(activity, "activity")}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition duration-200"
                >
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
                    className="w-5 h-5"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                    <path d="M16 5l3 3" />
                  </svg>
                  <span>แก้ไข</span>
                </button>
                <button
                  onClick={() => handleDelete(activity.activity_id, "activity")}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-md hover:from-red-500 hover:to-red-700 transition duration-200"
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
                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                  <span>ลบ</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Editdevelopment;
