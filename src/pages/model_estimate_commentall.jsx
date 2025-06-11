import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const EstimateFormReadOnly = ({ isOpen, onClose, userIds, userID }) => {
  const [data, setData] = useState([]);
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState({});
  const [userMap, setUserMap] = useState({}); // ✅ Map user_id -> f_name l_name

  const userIdList = typeof userIds === "string" ? userIds.split(",") : [];

  useEffect(() => {
    if (isOpen) {
      // ✅ ดึงข้อมูลรายชื่อผู้ใช้ทั้งหมด
      fetch("http://localhost:3000/api/users/getAll")
        .then((res) => res.json())
        .then((users) => {
          const userMapping = {};
          users.forEach((user) => {
            userMapping[user.user_id] = `${user.f_name} ${user.l_name}`;
          });
          setUserMap(userMapping);
        })
        .catch((error) => console.error("Error fetching users:", error));

      // ✅ ดึงข้อมูลเกณฑ์การประเมิน
      fetch("http://localhost:3000/api/criterias/form1")
        .then((res) => res.json())
        .then((criteriaData) => {
          const groupedData = [
            { section: "ผลสัมฤทธิ์ของงาน", criteria: criteriaData.filter((c) => c.type === "1") },
            { section: "พฤติกรรมที่อิงอัตลักษณ์ร่วม (Core Value)", criteria: criteriaData.filter((c) => c.type === "2") }
          ];
          setData(groupedData);
        })
        .catch((error) => console.error("Error fetching criteria:", error));

      // ✅ ดึงข้อมูลคะแนน
      fetch(`http://localhost:3000/api/criterias/commentscoreall?user_id=${userID}&user_probation_id=${userIds}`)
        .then((res) => res.json())
        .then((scoreData) => {
          const groupedScores = {};
          userIdList.forEach((id) => (groupedScores[id] = {}));
          scoreData.forEach((item) => {
            if (!groupedScores[item.user_probation_id]) {
              groupedScores[item.user_probation_id] = {};
            }
            groupedScores[item.user_probation_id][item.criteria_id] = item.score;
          });
          setScores(groupedScores);
        })
        .catch((error) => console.error("Error fetching scores:", error));

      // ✅ ดึงข้อมูลความคิดเห็น
      fetch(`http://localhost:3000/api/criterias/comment_overall?user_id=${userID}&user_probation_id=${userIds}`)
        .then((res) => res.json())
        .then((commentData) => {
          const groupedComments = {};
          commentData.forEach((item) => {
            groupedComments[item.user_probation_id] = item.comment_detail;
          });
          setComments(groupedComments);
        })
        .catch((error) => console.error("Error fetching comments:", error));
    }
  }, [isOpen, userID, userIds]);

  if (!isOpen) return null;



  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white w-[1100px] max-h-[80vh] p-8 rounded-2xl shadow-2xl border-gray-300 relative overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl">✖</button>
        <h2 className="text-3xl font-bold text-center mb-6 text-[#0C2F53]">การประเมินทดลองงาน (อ่านอย่างเดียว)</h2>
  
        {data.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-bold text-lg mb-3 border-b pb-2 text-gray-800">{section.section}</h3>
            <table className="w-full border-collapse border border-gray-300 text-sm rounded-lg overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-[#0C2F53] text-white">
                  <th className="p-3">หัวข้อการประเมิน</th>
                  <th className="border p-3 text-center">คะแนนเต็ม</th>
                  {userIdList.map((id, idx) => (
                    <th key={idx} className="border p-3 text-center">{userMap[id] || id}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.criteria.map((criteria) => (
                  <tr key={criteria.criteria_id} className="hover:bg-gray-100">
                    <td className="border p-3">{criteria.description}</td>
                    <td className="border p-3 text-center font-semibold">{criteria.maxscore}</td>
                    {userIdList.map((id, idx) => (
                      <td key={idx} className="border p-3 text-center">{scores[id]?.[criteria.criteria_id] ?? "-"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
  
  {userIdList.map((id, idx) => {
  const displayName = userMap[id] ? userMap[id].replace("null", "").trim() : ""; // ✅ ลบ "null" ออกไป
  
  return displayName ? ( // ✅ แสดงเฉพาะถ้ามีชื่อ
    <div key={idx} className="ml-4 p-5 bg-gray-50 rounded-2xl shadow-lg border-gray-200 hover:shadow-xl transition-all">
      <p className="text-lg font-bold text-gray-800">{displayName}</p>
      <p className="text-gray-700 italic">{comments[id] ?? "ยังไม่มีความคิดเห็น"}</p> {/* ✅ ไม่แสดง null ในความคิดเห็น */}
    </div>
  ) : null;
})}

  
        <button onClick={onClose} className="mt-8 px-4 py-2 bg-[#DD2025] text-white rounded-3xl hover:bg-red-700">ปิด</button>
      </div>
    </div>,
    document.body
  );  
};

export default EstimateFormReadOnly;
