import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const EstimateForm2 = ({ isOpen, onClose, userID, prouserID }) => {
  const [data, setData] = useState([]);
  const [scores, setScores] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    Promise.all([
      fetch("http://localhost:3000/api/criterias/form2").then((res) =>
        res.json()
      ),
      fetch(
        `http://localhost:3000/api/criterias/commentscore?user_id=${userID}&user_probation_id=${prouserID}`
      ).then((res) => res.json()),
      fetch(
        `http://localhost:3000/api/criterias/commentoverall?user_id=${userID}&user_probation_id=${prouserID}`
      ).then((res) => res.json()),
    ])
      .then(([criteriaData, commentScores, commentData]) => {
        const groupedData = [
          {
            section: "ผลสัมฤทธิ์ของงาน",
            criteria: criteriaData.filter((c) => c.type === "1"),
          },
          {
            section: "พฤติกรรมที่อิงอัตลักษณ์ร่วม (Core Value)",
            criteria: criteriaData.filter((c) => c.type === "2"),
          },
        ];
        setData(groupedData);

        setScores(
          criteriaData.map((c) => {
            const existingScore = commentScores.find(
              (score) => score.criteria_id === c.criteria_id
            );
            return {
              id: c.criteria_id,
              score: existingScore ? existingScore.score : 0,
            };
          })
        );

        setComment(commentData.comment_detail || "");
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [isOpen, userID, prouserID]);

  if (!isOpen) return null;

  const handleChange = (id, value, max) => {
    const newValue = Math.min(Math.max(Number(value), 0), max);
    setScores(scores.map((s) => (s.id === id ? { ...s, score: newValue } : s)));
  };

  const handleSubmit = () => {
    fetch("http://localhost:3000/api/criterias/commentscore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userID,
        user_probation_id: prouserID,
        scores: scores,
        comment: comment,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("บันทึกข้อมูลสำเร็จ");
        onClose();
      })
      .catch((error) => console.error("Error saving data:", error));
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white w-[1100px] max-h-[80vh] p-8 rounded-2xl shadow-2xl border-gray-300 relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✖
        </button>
        <h2 className="text-3xl font-bold text-center mb-6 text-[#0C2F53]">
          การประเมินทดลองงาน
        </h2>
        {data.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-bold text-lg mb-3 border-b pb-2 text-gray-800">
              {section.section}
            </h3>
            <table className="w-full border-collapse border border-gray-300 text-sm rounded-lg overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-[#0C2F53] text-left text-white">
                  <th className="p-3">หัวข้อการประเมิน</th>
                  <th className="border p-3 text-center">คะแนนเต็ม</th>
                  <th className="border p-3 text-center">คะแนนที่ได้</th>
                </tr>
              </thead>
              <tbody>
                {section.criteria.map((criteria) => (
                  <tr key={criteria.criteria_id} className="hover:bg-gray-100">
                    <td className="border p-3">{criteria.description}</td>
                    <td className="border p-3 text-center font-semibold">
                      {criteria.maxscore}
                    </td>
                    <td className="border p-3 text-center">
                      <input
                        type="number"
                        value={
                          scores.find((s) => s.id === criteria.criteria_id)
                            ?.score || 0
                        }
                        onChange={(e) =>
                          handleChange(
                            criteria.criteria_id,
                            e.target.value,
                            criteria.maxscore
                          )
                        }
                        className="w-20 p-2 border rounded-lg text-center focus:ring focus:ring-blue-300"
                        min="0"
                        max={criteria.maxscore}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <div className="font-bold text-lg mt-4 text-center text-gray-800">
          คะแนนรวม: {scores.reduce((acc, cur) => acc + cur.score, 0)}
        </div>
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">เพิ่มความคิดเห็น</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 h-28"
            placeholder="โปรดระบุความคิดเห็นเพิ่มเติม..."
          />
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="mt-4 mb-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            ส่งแบบประเมิน
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EstimateForm2;
