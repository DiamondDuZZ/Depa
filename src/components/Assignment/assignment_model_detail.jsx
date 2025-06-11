import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const ModelDetail = ({ isOpen, onClose, assignment, title = "งานที่ทำ" }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    assignment_id: assignment?.assignment_id || "",
    name: assignment?.name || "",
    type: assignment?.type || "",
    description: assignment?.description || "",
    dateStart: assignment?.date_start
      ? assignment.date_start.replace(" ", "T")
      : "", // ✅ ใช้ T เพื่อให้รองรับ datetime-local
    dateEnd: assignment?.date_end ? assignment.date_end.replace(" ", "T") : "",
    status: assignment?.status || "",
    expectedOutcome: assignment?.result_expected || "",
    actualOutcome: assignment?.result || "",
    filePath: assignment?.file_path || "",
  });

  useEffect(() => {
    if (assignment) {
      setFormData({
        name: assignment.name || "",
        type: assignment.type || "",
        description: assignment.description || "",
        dateStart: assignment?.date_start || "",
        dateEnd: assignment?.date_end || "",
        status: assignment?.status || "",
        expectedOutcome: assignment.result_expected || "",
        actualOutcome: assignment.result || "",
        filePath: assignment?.file_path || "",
      });
    }
  }, [assignment]);

  const [files] = useState([
    { name: "jirapa_proposal.pdf" },
    { name: "project_plan.pdf" },
  ]);
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

    return `${formattedDate}  เวลา  ${formattedTime}`;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "dateStart" || name === "dateEnd") {
      value = value.replace("T", " "); // ✅ เปลี่ยนกลับเป็น "YYYY-MM-DD HH:MM:SS"
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-8 w-[700px] shadow-lg">
        {/* Header */}
        <div className="flex justify-center items-center relative mb-4">
          <h2 className="text-2xl font-semibold text-[#0C2F53] mb-4">
            รายละเอียด
          </h2>
          <button
            onClick={onClose}
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
              <p className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium">
                {formData.name}
              </p>
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
              <p className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium">
                {formData.type}
              </p>
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
              <p className="text-[#0C2F53]  font-medium text-lg">{title}</p>
            </label>
            <p className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium">
              {formData.description}
            </p>
          </div>

          {/* ระยะเวลา */}
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
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-4"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 12l3 2" />
                    <path d="M12 7v5" />
                  </svg>
                  <p className="text-[#0C2F53]  font-medium text-lg">
                    วันที่เริ่มต้น
                  </p>
                </label>
                <p className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium">
                  {formatDateTime(formData.dateStart)}
                </p>
              </div>
            )}
            {formData.type !== "workload" && (
              <div className="w-1/2 mb-4 ">
                <label className="flex items-center gap-2 text-gray-600 mb-1">
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
                    class="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-4"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 12l3 2" />
                    <path d="M12 7v5" />
                  </svg>
                  <p className="text-[#0C2F53]  font-medium text-lg">
                    วันที่สิ้นสุด
                  </p>
                </label>
                <p className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium">
                  {formatDateTime(formData.dateEnd)}
                </p>
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
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-progress-check"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
                  <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
                  <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
                  <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
                  <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                <p className="text-[#0C2F53]  font-medium text-lg">สถานะ</p>
              </label>
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
            </div>
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
          <div className="grid grid-cols-2 gap-3">
            {formData.filePath ? (
              formData.filePath.split(",").map((fileName, index) => (
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
                    {/* ลิงก์ดาวน์โหลดไฟล์ */}
                    <a
                      href={`http://localhost:3000/uploads/${fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 font-medium text-sm hover:underline"
                    >
                      {fileName}
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">ไม่มีไฟล์แนบ</p>
            )}
          </div>

          {/* ผลลัพธ์ */}
          <div className="flex space-x-4">
            {formData.type !== "Workload" && (
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
                <p className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium">
                  {formData.expectedOutcome}
                </p>
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
              <p className="w-full border-b border-[#B5B5B5] p-2 text-[#686868] font-medium">
                {formData.actualOutcome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModelDetail;
