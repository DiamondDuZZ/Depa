import React from "react";

const Assignment = () => {
  const tasks = [
    {
      name: "ทำทรง",
      result: "10 ล้าน",
      status: "ผ่าน",
    },
    {
      name: "ทรงเหมือนทำ",
      result: "2 อบรม",
      status: "ไม่ผ่าน",
    },
    {
      name: "ทำใจ",
      result: "5 บท",
      status: "ผ่าน",
    },
  ];

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-[#0C2F53]">Routine</h1>
      <table className="table-auto w-full bg-white shadow-md rounded-b-xl">
        <thead>
          <tr className="bg-[#0C2F53] text-white text-center">
            <th className="py-3 px-4 text-xl">ลำดับ</th>
            <th className="py-3 px-4 text-xl">ชื่องาน</th>
            <th className="py-3 px-4 text-xl">ผลลัพธ์ที่คาดหวัง</th>
            <th className="py-3 px-4 text-xl">ผ่าน/ไม่ผ่าน</th>
            <th className="py-3 px-4 text-xl">คำอธิบาย</th>
            <th className="py-3 px-4 text-xl">คำอธิบายจากหัวหน้าแผนก</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={index}
              className={`text-center ${
                index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
              }`}
            >
              <td className="py-3 px-4 text-base">{index + 1}</td>
              <td className="py-3 px-4 text-base">{task.name}</td>
              <td className="py-3 px-4 text-base">{task.result}</td>
              <td className="py-3 px-4 text-base">
                {task.status === "ผ่าน" ? (
                  <span className="flex items-center justify-center drop-shadow-lg bg-[#FFFF] text-[#686868] rounded-full py-2 px-0.5">
                    <img
                      src="../src/assets/images/button/check.png"
                      className="mr-[10px] bg-[#33AC5E] text-[#FFFFFF] rounded-full py-1 px-0.5 items-center justify-center"
                    />
                    {task.status}
                  </span>
                ) : (
                  <span className="flex items-center justify-center drop-shadow-lg bg-[#FFFF] text-[#686868] rounded-full py-2 px-0.5">
                    <img
                      src="../src/assets/images/button/X.png"
                      className="mr-[10px] bg-[#DD2025] text-[#FFFFFF] rounded-full py-0.5 px-0.5 items-center justify-center"
                    />
                    {task.status}
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-base">
                <div className="flex items-center justify-center">
                  <button className="flex items-center justify-center drop-shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full py-2 px-3">
                    <img
                      src="../src/assets/images/button/add-small.png"
                      alt="เพิ่ม"
                      className="mr-[10px]"
                    />
                    เพิ่มคำอธิบาย
                  </button>
                </div>
              </td>
              <td className="py-3 px-4 text-base">
                <div className="flex justify-center items-center">
                  <button className="flex items-center justify-center drop-shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full py-2 px-3">
                    <img
                      src="../src/assets/images/button/book.png"
                      alt="อ่าน"
                      className="mr-[10px]"
                    />
                    อ่านคำอธิบาย
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-[59px]">
        <button className="flex items-center justify-center drop-shadow-lg bg-[#33AC5E] text-white rounded-full py-2 px-3">
          <img
            src="../src/assets/images/button/add-small.png"
            alt="อ่าน"
            className="mr-[10px]"
          />
          เพิ่มงาน
        </button>
      </div>
    </div>
  );
};

export default Assignment;
