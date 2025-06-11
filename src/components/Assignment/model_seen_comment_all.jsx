import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const ModalSeenCommentAll = ({
  isOpen,
  onClose,
  assignment,
  users2,
  userIds,
}) => {
  const [commentList, setCommentList] = useState([]);
  const [editComment, setEditComment] = useState(null);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    if (!assignment?.assignment_id) return;

    const url = `http://localhost:3000/api/comments/getcomments?assignment_id=${assignment.assignment_id}&userIds=${userIds}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data)) {
        setCommentList(
          data.map((comment, index) => ({
            user: comment.f_name,
            comment: comment.comment_detail || "",
            level: index + 1,
            user_id: comment.user_id,
            comment_id: comment.comment_id || null, // ถ้ายังไม่มีคอมเมนต์ comment_id จะเป็น null
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleEditClick = (comment) => {
    setEditComment(comment);
    setNewComment(comment.comment);
  };

  const handleSaveEdit = async () => {
    if (!newComment) return;

    try {
      const url = editComment.comment_id
        ? "http://localhost:3000/api/comments/update"
        : "http://localhost:3000/api/comments/add";

      const method = editComment.comment_id ? "POST" : "PUT";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment_id: editComment.comment_id,
          user_id: editComment.user_id,
          assignment_id: assignment.assignment_id,
          new_comment: newComment,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCommentList((prevComments) =>
          prevComments.map((item) =>
            item.user_id === editComment.user_id
              ? {
                  ...item,
                  comment: newComment,
                  comment_id: data.comment_id || item.comment_id,
                }
              : item
          )
        );
        setEditComment(null);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error updating/adding comment:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, assignment]);

  if (!isOpen) return null;

  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserId = user?.userId || "N/A"; // ถ้าไม่มี user_id ให้แสดง "N/A"

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50 rounded-[10px] px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-[1200px] shadow-2xl">
        {/* หัวข้อ */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-message-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 9h8" />
            <path d="M8 13h6" />
            <path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z" />
          </svg>
          <span>ความคิดเห็นทั้งหมด</span>
        </h2>

        {/* รายการความคิดเห็น */}
        <div className="max-h-[450px] overflow-y-auto pr-4 space-y-4">
          {commentList.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap items-start bg-gray-50 p-5 rounded-2xl shadow-lg border-gray-200 hover:shadow-xl transition-all"
            >
              {/* ลำดับ */}
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#74C5FF] to-[#3B82F6] rounded-full shadow-md">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
                  <p className="text-navy-blue font-semibold text-[24px]">
                    {item.level}
                  </p>
                </div>
              </div>

              {/* ข้อมูลความคิดเห็น */}
              <div className="ml-5 flex-1 min-w-0">
                <p className="text-lg font-bold text-gray-800">{item.user}</p>
                {editComment?.user_id === item.user_id ? (
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mt-2 p-2 border border-gray-100 rounded-xl w-full min-h-[50px] resize-none"
                  />
                ) : (
                  <p className="text-gray-700 break-words">
                    {item.comment || "ยังไม่มีคอมเมนต์"}
                  </p>
                )}
              </div>

              {/* ปุ่มแก้ไข / เพิ่มคอมเมนต์ / บันทึก */}
              <div className="mt-4 flex items-center justify-end w-full sm:w-auto">
                {item.user_id === currentUserId &&
                  (editComment?.user_id === item.user_id ? (
                    <div className="flex flex-col items-center justify-center gap-2 ml-4">
                      {/* ปุ่มบันทึก */}
                      <button
                        onClick={handleSaveEdit}
                        className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl hover:from-green-500 hover:to-green-700 transition-shadow shadow-lg"
                      >
                        บันทึก
                      </button>

                      {/* ปุ่มยกเลิก */}
                      <button
                        onClick={() => setEditComment(null)}
                        className="w-full px-4 py-2 bg-gray-400 text-black font-semibold rounded-xl hover:bg-gray-500 transition-shadow shadow-lg"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(item)}
                      className="px-4 py-2 ml-4 text-white font-medium rounded-xl shadow-md transition 
                  bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
                    >
                      {item.comment ? "แก้ไข" : "เพิ่มคอมเมนต์"}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* ปุ่มปิด */}
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-3xl shadow-md hover:from-red-600 hover:to-red-700 transition"
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-progress-x"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
              <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
              <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
              <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
              <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
              <path d="M14 14l-4 -4" />
              <path d="M10 14l4 -4" />
            </svg>
            <span>ปิด</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalSeenCommentAll;
