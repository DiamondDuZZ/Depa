import React, { useState, useEffect } from "react";

const MentorEvaluation = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // ถ้าไม่ได้เปิดจะไม่แสดง

  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowPopup(true), 100);
    } else {
      setShowPopup(false);
    }
  }, [isOpen]);

  const [selectedSatisfaction, setSelectedSatisfaction] = useState({});
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [comment, setComment] = useState("");

  // ข้อ 1: ฟังก์ชันอัปเดตความพึงพอใจ
  const handleSatisfactionChange = (question, value) => {
    setSelectedSatisfaction((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  // ข้อ 2: ฟังก์ชันเลือกความถี่
  const handleFrequencyChange = (value) => {
    setSelectedFrequency(value);
  };

  // ข้อ 3: ฟังก์ชันเลือกช่องทางการติดต่อ (Checkbox)
  const handleChannelChange = (value) => {
    setSelectedChannels((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // ฟังก์ชันส่งแบบประเมิน
  const handleSubmit = () => {
    console.log("ผลการประเมิน:", {
      ความพึงพอใจ: selectedSatisfaction,
      ความถี่: selectedFrequency,
      ช่องทางการติดต่อ: selectedChannels,
      ความคิดเห็นเพิ่มเติม: comment,
    });
    onClose(); // ปิดป๊อปอัป
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50 rounded-lg">
      <div
        className={`bg-white w-[750px] p-6 rounded-xl shadow-lg transition-transform duration-300 ${
          showPopup ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            แบบประเมินความพึงพอใจต่อโครงการระบบพี่เลี้ยงพนักงานใหม่
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[450px] overflow-y-auto mt-4 p-2">
          {/* คำอธิบาย */}
          <p className="text-gray-700 mt-3 font-semibold">
            ความคิดเห็นต่อโครงการระบบพี่เลี้ยงพนักงานใหม่
          </p>
          <p className="text-gray-600 text-sm mb-4">
            เกณฑ์การประเมิน: มากที่สุด = 5 | มาก = 4 | ปานกลาง = 3 | น้อย = 2 |
            น้อยที่สุด = 1
          </p>

          {/* คำถาม 1: ความพึงพอใจ */}
          <div className="mb-6">
            <h3 className="text-gray-700 font-medium mb-3">
              1. ความพึงพอใจต่อโครงการระบบพี่เลี้ยงพนักงานใหม่
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <table className="w-full border-collapse">
                {/* หัวตาราง */}
                <thead>
                  <tr className="bg-white border-b text-gray-700 text-sm">
                    <th className="py-3 px-4 text-left w-2/5">หัวข้อประเมิน</th>
                    {[5, 4, 3, 2, 1].map((value) => (
                      <th key={value} className="py-3 px-4 text-center">
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* เนื้อหาตาราง */}
                <tbody>
                  {[
                    "โครงการระบบพี่เลี้ยงพนักงานใหม่ ช่วยส่งเสริมความสามารถในการเรียนรู้การทำงาน",
                    "โครงการระบบพี่เลี้ยงพนักงานใหม่ ช่วยให้สามารถปรับตัวเข้ากับเพื่อนร่วมงานและสภาพแวดล้อมองค์กร",
                    "โครงการระบบพี่เลี้ยงพนักงานใหม่ ทำให้เกิดการแลกเปลี่ยนประสบการณ์และความรู้ต่างๆ",
                    "โครงการระบบพี่เลี้ยงพนักงานใหม่ ช่วยให้มีความสุขในการทำงานมากขึ้น",
                  ].map((question, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      {/* คำถาม */}
                      <td className="py-4 px-6 text-gray-800 font-medium">
                        {question}
                      </td>

                      {/* ตัวเลือก 5 - 1 */}
                      {[5, 4, 3, 2, 1].map((value) => (
                        <td key={value} className="py-3 px-4 text-center">
                          <label className="flex justify-center cursor-pointer">
                            <input
                              type="radio"
                              name={`satisfaction-${index}`}
                              value={value}
                              checked={selectedSatisfaction[question] === value}
                              onChange={() =>
                                handleSatisfactionChange(question, value)
                              }
                              className="hidden peer"
                            />
                            {/* วงกลม Radio Button */}
                            <span
                              className={`w-6 h-6 flex items-center justify-center border-2 rounded-full transition-all duration-200 peer-checked:bg-white peer-checked:border-blue-500 peer-checked:text-white hover:border-blue-400`}
                            >
                              {/* จุดที่อยู่ตรงกลาง */}
                              {selectedSatisfaction[question] === value && (
                                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                              )}
                            </span>
                          </label>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* คำถาม 2: ความถี่ในการพบ Mentor */}
          <div className="mt-4">
            <h3 className="text-gray-700 font-medium mb-2">
              2. ความถี่ในการพบปะกับ Mentor กี่ครั้ง / เดือน
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              {[
                "1 - 3 ครั้ง / เดือน",
                "4 - 6 ครั้ง / เดือน",
                "มากกว่า 6 เดือน",
              ].map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 py-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={option}
                    checked={selectedFrequency === option}
                    onChange={() => handleFrequencyChange(option)}
                    className="hidden peer"
                  />

                  {/* วงกลมของ Radio Button */}
                  <span
                    className={`w-6 h-6 flex items-center justify-center border-2 rounded-full transition-all duration-200 peer-checked:bg-white peer-checked:border-blue-500 hover:border-blue-400`}
                  >
                    {/* จุดสีขาวเมื่อเลือก */}
                    {selectedFrequency === option && (
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    )}
                  </span>

                  {/* ข้อความตัวเลือก */}
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* คำถาม 3: ช่องทางการติดต่อกับ Mentor */}
          <div className="mt-4">
            <h3 className="text-gray-700 font-medium mb-2">
              3. ช่องทางการสอบถามของ Mentor (เลือกได้มากกว่า 1 ข้อ){" "}
              <span className="text-red-500">*</span>
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              {[
                "พูดคุยโดยตรง (Face to face)",
                "โทรศัพท์",
                "Line / Call Line",
                "E-mail",
                "Microsoft Team",
              ].map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 py-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedChannels.includes(option)}
                    onChange={() => handleChannelChange(option)}
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 flex items-center justify-center border-2 rounded-md cursor-pointer ${
                      selectedChannels.includes(option)
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-400"
                    }`}
                  >
                    {selectedChannels.includes(option) && "✔"}
                  </span>
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* คำถาม 4: ความคิดเห็นเพิ่มเติม */}
          <div className="mt-4">
            <h3 className="text-gray-700 font-medium mb-2">
              4. ความคิดเห็น / ข้อเสนอแนะเพิ่มเติม{" "}
              <span className="text-red-500">*</span>
            </h3>
            <textarea
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="ใส่ความคิดเห็นของคุณ..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleSubmit}
            className=" flex items-center bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-full shadow-md"
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
              class="icon icon-tabler icons-tabler-outline icon-tabler-send"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 14l11 -11" />
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
            <p className="ml-2">ส่งประเมิน</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorEvaluation;
