import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom";
const Register = ({ handleClosePopup }) => {
  const [departments, setDepartments] = useState([]);
  const [subroles, setSubroles] = useState([]);
  const [nameroles, setNameroles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSubrole, setSelectedSubrole] = useState(null);
  const [selectedNamerole, setSelectedNamerole] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isNameroleLocked, setIsNameroleLocked] = useState(true);
  const [isJobLocked, setIsJobLocked] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState(""); // State สำหรับ Title
  const [gender, setGender] = useState(""); // State สำหรับเพศ
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch departments
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/departments");
        const data = await response.json();
        setDepartments(
          data.map((item) => ({
            value: item.depart_id,
            label: item.depart_name,
          }))
        );
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    // Fetch subroles
    const fetchSubroles = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/subroles");
        const data = await response.json();
        setSubroles(
          data.map((item) => ({
            value: item.subrole_id,
            label: item.subrole_name,
          }))
        );
      } catch (error) {
        console.error("Error fetching subroles:", error);
      }
    };

    if (selectedTitle === "mr") {
      setGender("M"); // ตั้งค่าเพศเป็นชายเมื่อเลือก Mr.
    } else if (selectedTitle === "mrs" || selectedTitle === "miss") {
      setGender("F"); // ตั้งค่าเพศเป็นหญิงเมื่อเลือก Mrs. หรือ Ms.
    }

    fetchDepartments();
    fetchSubroles();
  }, [selectedTitle]);

  const handleDepartmentChange = (selectedOption) => {
    setIsJobLocked(true);
    setIsNameroleLocked(true);
    setSelectedDepartment(selectedOption);
    setSelectedSubrole(null); // Reset Subrole
    setSelectedNamerole(null); // Reset Namerole
    setSelectedJob(null); // Reset Job

    if (selectedOption) {
      fetchSubrolesByDepartment(selectedOption.value);
    }
  };

  const fetchSubrolesByDepartment = async (departId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/subroles/filter?depart_id=${departId}`
      );

      if (!response.ok) {
        console.error("Failed to fetch subroles:", response.statusText);
        return;
      }

      const data = await response.json();

      console.log("Fetched subroles:", data);

      setSubroles(
        data.map((item) => ({
          value: item.subrole_id,
          label: item.subrole_name,
        }))
      );
    } catch (error) {
      console.error("Error fetching subroles:", error);
    }
  };

  const handleSubroleChange = (selectedOption) => {
    setSelectedSubrole(selectedOption);
    setSelectedNamerole(null); // Reset Namerole
    setSelectedJob(null); // Reset Job
    if (selectedOption && selectedDepartment) {
      fetchNamerolesAndJobs(selectedDepartment.value, selectedOption.value);
    }
  };

  const fetchNamerolesAndJobs = async (departId, subroleId) => {
    if (!departId || !subroleId) {
      console.log("Depart ID or Subrole ID is missing");
      return;
    }

    console.log("Fetching nameroles and jobs with:", {
      depart_id: departId,
      subrole_id: subroleId,
    });

    try {
      const response = await fetch(
        `http://localhost:3000/api/nameroles/namerolesfilter?depart_id=${departId}&subrole_id=${subroleId}`
      );

      if (!response.ok) {
        console.error(
          "Failed to fetch nameroles and jobs:",
          response.statusText
        );
        return;
      }

      const data = await response.json();

      console.log("Fetched data:", data);

      const formattedNameroles = data.map((item) => ({
        value: item.namerole_id,
        label: item.namerole_name,
      }));

      const formattedJobs = data.map((item) => ({
        value: item.job_id,
        label: item.job_name,
      }));

      setNameroles(formattedNameroles);
      setJobs(formattedJobs);

      // ตรวจสอบว่ามีค่าเดียวหมดหรือไม่
      const uniqueNameroleIds = new Set(
        formattedNameroles.map((item) => item.value)
      );
      const uniqueJobIds = new Set(formattedJobs.map((item) => item.value));

      // เลือกอัตโนมัติถ้ามีค่าเดียวทั้งหมด
      if (uniqueNameroleIds.size === 1) {
        const autoSelectedNamerole = formattedNameroles[0];
        setSelectedNamerole(autoSelectedNamerole);
        setIsNameroleLocked(true); // ล็อคช่องถ้ามีค่าเดียวทั้งหมด
        console.log("Auto-selected namerole:", autoSelectedNamerole);
      } else if (formattedNameroles.length > 1) {
        setIsNameroleLocked(false); // ปลดล็อคถ้ามีหลายค่า
      }

      if (uniqueJobIds.size === 1) {
        const autoSelectedJob = formattedJobs[0];
        setSelectedJob(autoSelectedJob);
        setIsJobLocked(true); // ล็อคช่องถ้ามีค่าเดียวทั้งหมด
        console.log("Auto-selected job:", autoSelectedJob);
      } else if (formattedJobs.length > 1) {
        setIsJobLocked(false); // ปลดล็อคถ้ามีหลายค่า
      }
    } catch (error) {
      console.error("Error fetching nameroles and jobs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: selectedTitle,
      firstName,
      lastName,
      email,
      gender,
      nameroleId: selectedNamerole?.value || null,
      subroleId: selectedSubrole?.value || null,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/register/adduser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("สร้างบัญชีสำเร็จ!");
        // เคลียร์ข้อมูลในฟอร์ม

        setFirstName("");
        setLastName("");
        setEmail("");
        setSelectedDepartment(null);
        setSelectedSubrole(null);
        setSelectedNamerole(null);
        setSelectedJob(null);
        setSelectedTitle("");
        setGender("");
        handleClosePopup(); // ปิด popup หลังจาก 3 วินาที
      } else {
        const errorData = await response.json();
        toast.error(
          `เกิดข้อผิดพลาด: ${errorData.message || "ไม่สามารถสร้างบัญชีได้"}`
        );
      }
    } catch (error) {
      toast.error(`เกิดข้อผิดพลาด: ${error.message}`);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50 rounded-[10px]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[900px] h-[500px]">
        <div className="flex justify-center items-center relative mb-4">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
            สร้างบัญชีผู้ใช้งาน
          </h2>
          <button
            onClick={handleClosePopup}
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
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-[900px]"
        >
          {/* Section 1: Dropdowns */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                สังกัด
              </label>
              <Select
                options={departments}
                value={selectedDepartment}
                onChange={(option) => {
                  console.log("Selected Department:", option);
                  handleDepartmentChange(option);
                }}
                placeholder="กรุณาเลือกสังกัด"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                ชื่อตามโครงสร้าง
              </label>
              <Select
                options={subroles}
                value={selectedSubrole}
                onChange={(option) => {
                  console.log("Selected Subrole:", option);
                  handleSubroleChange(option);
                }}
                placeholder="กรุณาเลือกระดับ"
                isDisabled={!selectedDepartment} // ล็อคถ้ายังไม่ได้เลือกสังกัด
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                ชื่อตำแหน่ง
              </label>
              <Select
                options={nameroles}
                value={selectedNamerole}
                onChange={(option) => setSelectedNamerole(option)}
                placeholder="กรุณาเลือกชื่อตำแหน่ง"
                isDisabled={isNameroleLocked} // ล็อคถ้า isNameroleLocked เป็น true
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                สายงาน
              </label>
              <Select
                options={jobs}
                value={selectedJob}
                onChange={(option) => setSelectedJob(option)}
                placeholder="กรุณาเลือกสายงาน"
                isDisabled={isJobLocked} // ล็อคถ้า isJobLocked เป็น true
              />
            </div>
          </div>

          {/* Section 2: Personal Information */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                ชื่อ
              </label>
              <select
                className="w-[65px] h-[31px] pl-2 mr-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-gray-700"
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
              >
                <option value="" disabled>
                  เลือก
                </option>
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
                <option value="miss">Ms.</option>
              </select>
              <input
                type="text"
                placeholder="กรุณากรอกชื่อ"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-[250px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                นามสกุล
              </label>
              <input
                type="text"
                placeholder="กรุณากรอกนามสกุล"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-[350px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                อีเมล
              </label>
              <input
                type="email"
                placeholder="กรุณากรอกอีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[322px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                เพศ Sex
              </label>
              <div className="flex items-center pl-2 space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="M"
                    className="form-radio text-blue-500"
                    checked={gender === "M"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span className="ml-2">ชาย Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="F"
                    className="form-radio text-blue-500"
                    checked={gender === "F"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span className="ml-2">หญิง Female</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            สร้างบัญชี
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Register;
