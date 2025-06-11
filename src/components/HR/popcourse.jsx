import React from "react";
import ReactDOM from "react-dom";

const EditModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  handleSubmit,
  isEditing,
  type,
  setType,
}) => {
  if (!isOpen) return null;
  const handleClose = () => {
    setFormData({ name: "", image_url: "" });
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      // ✅ ตรวจสอบว่าเป็นรูปภาพ
      setFormData({
        ...formData,
        image: file,
        imageName: file.name,
        previewUrl: URL.createObjectURL(file), // ✅ สร้าง URL สำหรับแสดงตัวอย่างรูป
      });
    } else {
      alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น!");
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50 rounded-[10px]">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[400px] transform transition-all scale-100">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? "อัปเดตข้อมูล" : "เพิ่มข้อมูล"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-red-500 transition duration-200"
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
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* ประเภท */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              ประเภท
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 shadow-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={isEditing}
            >
              <option value="course">Basic Course</option>
              <option value="activity">Activity</option>
            </select>
          </div>

          {/* ชื่อ */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">ชื่อ</label>
            <input
              type="text"
              placeholder="กรอกชื่อ..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 shadow-sm"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* อัปโหลดรูปภาพ */}
          <div className="flex flex-col items-center gap-3">
            <label className="w-full flex flex-col items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg cursor-pointer shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-200">
              <span className="flex items-center gap-2">
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                  <path d="M9 12h6" />
                  <path d="M12 9v6" />
                </svg>
                เลือกรูปภาพ
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {/* ✅ แสดงชื่อไฟล์ */}
            {formData.imageName && (
              <div className="text-center text-sm text-gray-500 flex items-center justify-center bg-gray-100 px-3 py-2 ">
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
                  className=" icon icon-tabler icons-tabler-outline icon-tabler-library-photo flex-shrink-0"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 3m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                  <path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" />
                  <path d="M17 7h.01" />
                  <path d="M7 13l3.644 -3.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" />
                  <path d="M15 12l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l2.644 2.644" />
                </svg>
                <p
                  className="ml-2 truncate overflow-hidden w-[220px]"
                  title={formData.imageName}
                >
                  {formData.imageName}
                </p>
              </div>
            )}
            {/* ✅ แสดงตัวอย่างรูปภาพ */}
            {formData.previewUrl && (
              <img
                src={formData.previewUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-md"
              />
            )}
          </div>

          {/* ปุ่ม */}
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="flex-1 flex-items-center flex justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition duration-200"
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-pencil-check"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                <path d="M13.5 6.5l4 4" />
                <path d="M15 19l2 2l4 -4" />
              </svg>
              <p className="ml-2">{isEditing ? "อัปเดต" : "เพิ่ม"}</p>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1  py-2 ml-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition duration-200"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EditModal;
