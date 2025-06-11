import React, { useState, useEffect } from "react";
import Pdpapopup from "../components/pdpapopup"; // นำเข้า Component Registain
import Header from "../components/Editprofile/Header";
import Section1 from "../components/Editprofile/section1";
import Address from "../components/Editprofile/address";
import Education from "../components/Editprofile/education";
import Lang from "../components/Editprofile/lang";
import File from "../components/Editprofile/file";
const Editprofile = () => {
  const today = new Date().toISOString().split("T")[0];
  const [showPopup, setShowPopup] = useState(false); // สร้าง state สำหรับควบคุม popup
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || "N/A"; // ถ้าไม่มี user_id ให้แสดง "N/A"
  const nameroleId = user?.nameroleId || "N/A"; // ถ้าไม่มี user_id ให้แสดง "N/A"
  const subroleId = user?.subroleId || "N/A"; // ถ้าไม่มี user_id ให้แสดง "N/A"
  const [namerole, setNamerole] = useState(null);
  const [subrole, setSubrole] = useState(null);
  const [formData, setFormData] = useState({
    user_id: userId,
    title_name: "",
    title_name_en: "",
    f_name: "",
    l_name: "",
    f_name_en: "",
    l_name_en: "",
    sex: "",
    nickname: "",
    birthday: "",
    nationality: "",
    id_card_no: "",
    id_card_expired: "",
    email: "",
    img: "",
    files: "",
    phone_number: "",
  });
  const [formDataAddress, setFormDataAddress] = useState({
    permanent: {
      address_line: "",
      province: "",
      amphure: "",
      tambon: "",
      zip_code: "",
    },
    current: {
      address_line: "",
      province: "",
      amphure: "",
      tambon: "",
      zip_code: "",
    },
    phone_number: "",
  });
  const [formDataEducation, setFormDataEducation] = useState({
    level: "",
    institution_name: "",
    year_start: "",
    year_end: "",
    diploma: "",
    majot: "",
    gpa: "",
    honor: "",
    files: "",
  });
  const [formDataLang, setFormDataLang] = useState({
    test_type_name: "",
    score: "",
    recieved_at: "",
  });

  const [imageFile, setImageFile] = useState(null); // เก็บไฟล์รูปภาพจริง
  const [attachedFile, setAttachedFile] = useState(null); // เก็บไฟล์แนบจริง
  const [imagePreview, setImagePreview] = useState(null); // เก็บ URL พรีวิวรูปภาพ

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fieldName = event.target.name; // ใช้ `name` เพื่อระบุว่าเป็น img หรือ file

    if (file) {
      const fileName = file.name; // เก็บชื่อไฟล์
      if (fieldName === "img") {
        setImageFile(file); // เก็บไฟล์รูปภาพจริง
        setFormData((prevData) => ({ ...prevData, img: fileName })); // อัปเดตชื่อไฟล์ใน formData
        setImagePreview(URL.createObjectURL(file)); // พรีวิวรูปภาพ
      } else if (fieldName === "files") {
        setAttachedFile(file); // เก็บไฟล์แนบจริง
        setFormData((prevData) => ({ ...prevData, files: fileName })); // อัปเดตชื่อไฟล์ใน formData
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // อัปเดตค่าที่เปลี่ยน
    }));
  };

  const handleOpenPopup = () => {
    setShowPopup(true); // เปิด popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // ปิด popup
  };




  useEffect(() => {
    // ฟังก์ชันแปลงรูปแบบวันที่จาก ISO เป็น DD/MM/YYYY
    const formatToDisplayDate = (isoDate) => {
      if (!isoDate) return "";
      const date = new Date(isoDate); // สร้างวันที่จาก ISO String
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // เดือนเริ่มต้นจาก 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // อัปเดตวันเกิดใน formData
    setFormData((prevData) => ({
      ...prevData,
      birthday: formatToDisplayDate(prevData.birthday), // แปลงวันเกิดที่ได้จาก API
    }));
  }, []);
  // สคริปรวม
  useEffect(() => {
    if (!nameroleId) {
      console.error("nameroleId ไม่พบใน localStorage");
      return;
    }

    // เรียก API เพื่อดึงข้อมูล
    fetch("http://localhost:3000/api/nameroles/getNamerole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nameroleId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNamerole(data.namerole); // เก็บข้อมูลใน state
        } else {
          console.error("เกิดข้อผิดพลาด:", data.message);
        }
      })
      .catch((error) => {
        console.error("ข้อผิดพลาดในการเชื่อมต่อ API:", error);
      });

    if (!subroleId) {
      console.error("subroleId ไม่พบใน localStorage");
      return;
    }

    // เรียก API เพื่อดึงข้อมูล
    fetch("http://localhost:3000/api/subroles/getSubrole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subroleId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSubrole(data.subrole); // เก็บข้อมูลใน state
        } else {
          console.error("เกิดข้อผิดพลาด:", data.message);
        }
      })
      .catch((error) => {
        console.error("ข้อผิดพลาดในการเชื่อมต่อ API:", error);
      });

    if (!userId) {
      console.error("userId ไม่พบใน localStorage");
      return;
    }

    fetch("http://localhost:3000/api/users/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        if (data.success) {
          const userData = data.user;
          const addresses = data.addresses || {};
          const permanentAddress = addresses.permanent || {};
          const currentAddress = addresses.current || {};
          const eduData = data.education;
          const langData = data.languages;

          // Ensure `birthday` is formatted correctly
          function formatLocalDate(dateString) {
            if (!dateString) return "";
            const date = new Date(dateString);
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // Adjust to local time
            return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
          }




          const formattedBirthday = formatLocalDate(userData.birthday);
          const formattedcard_expired = formatLocalDate(userData.id_card_expired);
          setFormData({
            user_id: userData.user_id || "",
            title_name: userData.title_name || "",
            title_name_en: userData.title_name_en || "",
            f_name: userData.f_name || "",
            l_name: userData.l_name || "",
            f_name_en: userData.f_name_en || "",
            l_name_en: userData.l_name_en || "",
            sex: userData.sex || "",
            nickname: userData.nickname || "",
            birthday: formattedBirthday, // Use correctly formatted date
            nationality: userData.nationality || "",
            id_card_no: userData.id_card_no || "",
            id_card_expired: formattedcard_expired || "",
            email: userData.email || "",
            img: userData.img || "",
            files: userData.files || "",
          });
          setFormDataAddress({
            permanent: {
              address_line: permanentAddress.address_line || "",
              province: permanentAddress.province || "",
              amphure: permanentAddress.amphure || "",
              tambon: permanentAddress.tambon || "",
              zip_code: permanentAddress.zip_code || "",
              phone_number: permanentAddress.phone_number || "",  // ✅ รวม phone_number ไว้ใน permanent
            },
            current: {
              address_line: currentAddress.address_line || "",
              province: currentAddress.province || "",
              amphure: currentAddress.amphure || "",
              tambon: currentAddress.tambon || "",
              zip_code: currentAddress.zip_code || "",

            }
          });


          
        } else {
          console.error("เกิดข้อผิดพลาด:", data.message);
        }
      })

      .catch((error) => {
        console.error("ข้อผิดพลาดในการเชื่อมต่อ API:", error);
      });
  }, [nameroleId, subroleId, userId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const convertToISOString = (dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      date.setHours(date.getHours() + 7); // ปรับให้ตรงกับเวลาไทย
      return date.toISOString().split("T")[0]; // เอาเฉพาะ yyyy-MM-dd
    };

    const formattedData = {
      ...formData,
      birthday: convertToISOString(formData.birthday),
      id_card_expired: convertToISOString(formData.id_card_expired),
    };




    try {
      const response = await fetch(
        "http://localhost:3000/api/users/updateUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("อัปเดตข้อมูลสำเร็จ!");
      } else {
        alert("เกิดข้อผิดพลาด: " + result.message);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
      alert("ไม่สามารถส่งข้อมูลได้");
    }
    const updateAddress = async (addressType, addressData) => {
      const response = await fetch("http://localhost:3000/api/users/updateAddress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: formData.user_id, address_type: addressType, ...addressData }),
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(`อัปเดตที่อยู่ (${addressType}) ล้มเหลว: ${result.message}`);
      }
    };

    try {
      await updateAddress("permanent", formDataAddress.permanent);
      await updateAddress("current", formDataAddress.current);
      
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      alert("เกิดข้อผิดพลาด: " + error.message);

    }
  };

  // สคริป1
  // สคริป2
  // สคริป3
  // สคริป4
  // สคริป5
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg w-full max-w-none p-8">
        <form
          className="bg-white shadow-md rounded-lg w-full max-w-none p-8"
          onSubmit={handleSubmit} // ฟังก์ชันเมื่อยืนยันฟอร์ม
        >
          {/* ส่วนที่ 1 */}
          <Header
            imagePreview={imagePreview}
            handleFileChange={handleFileChange}
            namerole={namerole}
            subrole={subrole}
          />

          {/* ส่วนที่ 1 */}

          {/* ส่วนที่ 2 */}
          <Section1 formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} today={today} />
          {/* ส่วนที่ 2 */}
          {/* เส้นคั่น 1 */}
          <div className="w-[1444px] h-[2px] bg-none mx-auto my-4 mt-12 " />

          {/* เส้นคั่น 1 */}
          {/* ข้อมูล Address */}
          <Address
            formDataAddress={formDataAddress}
            setFormDataAddress={setFormDataAddress}
          />

          {/* ข้อมูล Address */}
          {/* เส้นคั่น 2 */}
          <div className="w-[1444px] h-[2px] bg-gray mx-auto my-4 mt-20" />

          {/* เส้นคั่น 2 */}
          {/* ข้อมูลการศึกษา Education */}
          <Education
            formData={formData}
            handleInputChange={handleInputChange}
          />
          {/* ข้อมูลการศึกษา Education */}
          {/* เส้นคั่น 3 */}
          <div className="w-[1444px] h-[2px] bg-gray mx-auto my-4 mt-20" />

          {/* เส้นคั่น 3 */}
          {/* ความชำนาญทางภาษา */}
          <Lang
            formData={formData}
            handleInputChange={handleInputChange}
          />
          {/* ความชำนาญทางภาษา */}
          {/* เส้นคั่น 4 */}
          <div className="w-[1444px] h-[2px] bg-gray mx-auto my-4 mt-20" />

          {/* เส้นคั่น 4 */}
          {/* แนบข้อมูลประกอบ */}
          <File
            formData={formData}
            handleInputChange={handleInputChange}
          />
          {/* แนบข้อมูลประกอบ */}
          {/* เส้นคั่น 5 */}
          <div className="w-[1444px] h-[2px] bg-gray mx-auto my-4 mt-20" />

          {/* เส้นคั่น 5 */}
          {/* ประกาศ */}
          <div className="mt-8 bg-gray-100 items-left justify-left">
            <div className="">
              {/* ข้อความภาษาไทย */}
              <p className="text-gray-700 text-left leading-relaxed mb-4">
                ข้าพเจ้ายอมรับรองว่าข้อความข้างต้นเป็นความจริงทุกประการ
                หากปรากฏในภายหลังว่าข้อความที่ข้าพเจ้าได้กล่าวข้างต้นเป็นเท็จ
                สำนักงานส่งเสริมเศรษฐกิจดิจิทัล อาจพิจารณาเลิกจ้างข้าพเจ้าได้
                โดยข้าพเจ้าจะไม่เรียกร้องค่าชดเชยหรือค่าเสียหายใดๆ ทั้งสิ้น
                และข้าพเจ้าอนุญาตให้สำนักงานส่งเสริมเศรษฐกิจดิจิทัล
                ตรวจสอบประวัติกับกองทะเบียนประวัติอาชญากรรมซึ่งลงรายชื่อไว้เป็นหลักฐาน
              </p>

              {/* ข้อความภาษาอังกฤษ */}
              <p className="text-gray-700 text-left leading-relaxed">
                I declare that the above information is correct in every
                respect. I agree that if any above information is false then my
                employment may be terminated and I hereby agree that the digital
                economy promotion agency (depa) is authorized to examine my
                personal record with the Criminal Records Division.
              </p>
            </div>
          </div>

          {/* ประกาศ */}
          {/* เส้นคั่น 6 */}
          <div className="w-[1444px] h-[2px] bg-gray mx-auto my-4 mt-12" />
          {/* เส้นคั่น 6 */}
          {/* ปุ่ม */}
          <div className="items-center text-center">
            <button
              // onClick={handleOpenPopup}

              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
      {/* Popup */}
      <Pdpapopup isOpen={showPopup} onClose={handleClosePopup} />
    </div>
  );
};

export default Editprofile;
