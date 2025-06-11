import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import ReactDOM from "react-dom";

const ModelAdd = ({ isOpen, onClose, assignment, title = "โปรดระบุงานที่ทำ" }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || "N/A"; // ถ้าไม่มี user_id ให้แสดง "N/A"
  const userStatus = user?.status || "N/A"; 
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    user_id: assignment?.user_id || userId,
    name: "",
    type: "assignment",
    description: "",
    dateStart: "",
    dateEnd: "",
    expectedOutcome: "",
    actualOutcome: "",
  });
  useEffect(() => {
    if (assignment) {
      setFormData({
        user_id: assignment.user_id || userId,
        name: "",
        type: "assignment",
        description: "",
        dateStart: "",
        dateEnd: "",
        expectedOutcome: "",
        actualOutcome: "",
      });
    }
  }, [assignment, userId]); // 📌 Dependency Array: อัปเดตเมื่อ assignment หรือ userId เปลี่ยน

  const handleFileChange = (event) => {
    if (files.length >= 4) {
      alert("อัปโหลดไฟล์ได้สูงสุด 4 ไฟล์เท่านั้น!");
      return;
    }

    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length + files.length > 4) {
      alert("อัปโหลดไฟล์ได้สูงสุด 4 ไฟล์เท่านั้น!");
      return;
    }

    setFiles([...files, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "type" && value === "workload") {
      setFormData({ ...formData, [name]: value, expectedOutcome: null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.description) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("user_id", formData.user_id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("dateStart", formData.dateStart);
    formDataToSend.append("dateEnd", formData.dateEnd);
    formDataToSend.append("expectedOutcome", formData.expectedOutcome);
    formDataToSend.append("actualOutcome", formData.actualOutcome);
  
    // ✅ เพิ่มไฟล์เข้า FormData
    files.forEach(file => {
      formDataToSend.append("files", file);
    });
  
    try {
      const response = await fetch("http://localhost:3000/api/assignments/add", {
        method: "POST",
        body: formDataToSend, // ✅ ไม่ต้องใส่ `Content-Type` เพราะ `FormData` จัดการเอง
      });
  
      if (response.ok) {
        toast.success("🎉 เพิ่มข้อมูลสำเร็จ!");
        setFiles([]);
        onClose();
      } else {
        throw new Error("บันทึกข้อมูลไม่สำเร็จ");
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด! ไม่สามารถบันทึกข้อมูลได้");
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;
  const handleClose = () =>{
    setFiles([]);
    formData.name = "";
    formData.description = "";
    formData.dateStart = "";
    formData.dateEnd = "";
    formData.expectedOutcome = "";
    formData.actualOutcome = "";
    onClose();
  };
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-8 w-[700px] shadow-lg">
        {/* Header */}
        <div className="flex justify-center items-center relative mb-4">
          <h2 className="text-2xl font-semibold text-[#0C2F53] mb-4">
            เพิ่มข้อมูลงาน
          </h2>
          <button
            onClick={handleClose}
            className="absolute right-0 text-gray-500 hover:text-red-500 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            {/* ชื่องาน และ ประเภท */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="flex items-center gap-2 text-gray-600 mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0C2F53"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-folder-open"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" />
                  </svg>
                  <p className="text-[#0C2F53] font-medium text-lg">ชื่องาน</p>
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium focus:outline-none"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="กรุณากรอกชื่องาน*"
                />
              </div>
              <div className="w-1/2">
                <label className="flex items-center gap-2 text-gray-600 mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#0C2F53"
                    class="icon icon-tabler icons-tabler-filled icon-tabler-briefcase"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M22 13.478v4.522a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-4.522l.553 .277a20.999 20.999 0 0 0 18.897 -.002l.55 -.275zm-8 -11.478a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v2.242l-1.447 .724a19.002 19.002 0 0 1 -16.726 .186l-.647 -.32l-1.18 -.59v-2.242a3 3 0 0 1 3 -3h2v-1a3 3 0 0 1 3 -3h4zm-2 8a1 1 0 0 0 -1 1a1 1 0 1 0 2 .01c0 -.562 -.448 -1.01 -1 -1.01zm2 -6h-4a1 1 0 0 0 -1 1v1h6v-1a1 1 0 0 0 -1 -1z" />
                  </svg>
                  <p className="text-[#0C2F53] font-medium text-lg">ประเภท</p>
                </label>
                <select
                  name="type"
                  className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium focus:outline-none"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option>assignment</option>
                  <option>workload</option>
                </select>
              </div>
            </div>

            {/* รายละเอียดงาน */}
            <div>
              <label className="flex items-center gap-2 text-gray-600 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#0C2F53"
                  class="icon icon-tabler icons-tabler-filled icon-tabler-file-description"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm3 14h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m0 -4h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2" />
                  <path d="M19 7h-4l-.001 -4.001z" />
                </svg>
                <p className="text-[#0C2F53]  font-medium text-lg">
                  {title}
                </p>
              </label>
              <textarea
                name="description"
                className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium focus:outline-none"
                rows="2"
                value={formData.description}
                onChange={handleChange}
                placeholder="กรุณากรอกรายละเอียดของงาน*"
              ></textarea>
            </div>

            {/* ระยะเวลา */}
            { userStatus === "L" && (
              <div className="flex space-x-4">
                <div className="w-1/2 mb-4">
                  <label className="flex items-center gap-2 text-gray-600 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-4">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 12l3 2" />
                      <path d="M12 7v5" />
                    </svg>
                    <p className="text-[#0C2F53] font-medium text-lg">วันที่เริ่มต้น</p>
                  </label>
                  <input
                    type="datetime-local"
                    name="dateStart"
                    className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium focus:outline-none"
                    value={formData.dateStart ? formData.dateStart.slice(0, 16) : ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-1/2 mb-4">
                  <label className="flex items-center gap-2 text-gray-600 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-4">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 12l3 2" />
                      <path d="M12 7v5" />
                    </svg>
                    <p className="text-[#0C2F53] font-medium text-lg">วันที่สิ้นสุด</p>
                  </label>
                  <input
                    type="datetime-local"
                    name="dateEnd"
                    className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium focus:outline-none"
                    value={formData.dateEnd ? formData.dateEnd.slice(0, 16) : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>



          {/* หัวข้อไฟล์งาน */}
          <label className="flex items-center gap-2 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0C2F53"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
              <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
              <path d="M17 18h2" />
              <path d="M20 15h-3v6" />
              <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
            </svg>
            <p className="text-[#0C2F53] font-medium text-lg">ไฟล์งาน</p>
          </label>

          {/* คำแนะนำ */}
          <p className="text-sm text-gray-500 mb-2">
            คำแนะนำ : เอกสารประกอบขนาดไฟล์ไม่เกิน 2 MB รองรับเฉพาะไฟล์{" "}
            <span className="font-semibold">.pdf</span> เท่านั้น
          </p>

          {/* แสดงรายการไฟล์ที่อัปโหลด */}
          <div className="grid grid-cols-2 gap-3 ">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white shadow-md p-3 rounded-2xl "
              >
                <div className="flex items-center gap-2">
                  {/* ไอคอน PDF */}
                  <img
                    src="../src/assets/images/employee_pro/pdf-file-format.png"
                    alt="PDF Icon"
                    className="w-8 h-8"
                  />
                  {/* ชื่อไฟล์ */}
                  <span className="text-gray-700 font-medium text-sm">
                    {file.name}
                  </span>
                </div>
                {/* ปุ่มลบไฟล์ */}
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="group relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition"
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
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

          {/* ปุ่มอัปโหลดไฟล์ */}
          <label className="flex items-center gap-2 mt-4 text-[#686868] cursor-pointer">
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
              class="icon icon-tabler icons-tabler-outline icon-tabler-link"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 15l6 -6" />
              <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
              <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
            </svg>
            <span className="mt-2 mb-4 text-[#686868]">เพิ่มไฟล์เอกสาร</span>
            <input
              type="file"
              accept=".pdf"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* ผลลัพธ์ */}
          <div className="flex space-x-4">
            {formData.type !== "workload" && (
              <div className="w-1/2 mb-4 ">
                <label className="flex items-center gap-2 text-gray-600 mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0C2F53"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-target-arrow"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M12 7a5 5 0 1 0 5 5" />
                    <path d="M13 3.055a9 9 0 1 0 7.941 7.945" />
                    <path d="M15 6v3h3l3 -3h-3v-3z" />
                    <path d="M15 9l-3 3" />
                  </svg>
                  <p className="text-[#0C2F53]  font-medium text-lg">
                    ผลลัพธ์ที่คาดหวัง
                  </p>
                </label>
                 
                <input
                  type="text"
                  name="expectedOutcome"
                  className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium focus:outline-none"
                  onChange={handleChange}
                  placeholder="กรุณากรอกผลลัพธ์ที่คาดหวัง*"
                />
              </div>
            )}
            <div className="w-1/2">
              <label className="flex items-center gap-2 text-gray-600 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0C2F53"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-report-search"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
                  <path d="M18 12v-5a2 2 0 0 0 -2 -2h-2" />
                  <path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                  <path d="M8 11h4" />
                  <path d="M8 15h3" />
                  <path d="M16.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
                  <path d="M18.5 19.5l2.5 2.5" />
                </svg>
                <p className="text-[#0C2F53]  font-medium text-lg">
                  ผลลัพธ์ที่ได้
                </p>
              </label>
              <input
                type="text"
                name="actualOutcome"
                className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium focus:outline-none"
                value={formData.actualOutcome}
                onChange={handleChange}
                placeholder="กรุณากรอกผลลัพธ์ที่ได้*"
              />
            </div>
          </div>


          {/* ปุ่มบันทึก */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-green-500 shadow-md text-white font-medium rounded-full hover:bg-green-700 transition">
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
                class="lucide lucide-save"
              >
                <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
                <path d="M7 3v4a1 1 0 0 0 1 1h7" />
              </svg>
              <p>บันทึก</p>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ModelAdd;