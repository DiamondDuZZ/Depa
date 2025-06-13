import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaPlus, FaMinus } from "react-icons/fa";
import { FiFolder } from "react-icons/fi";  // ไอคอน folder จาก Feather icons


const HealthA = ({ height, setHeight, weight, setWeight }) => {
  const [isChecked, setIsChecked] = useState(false); // ตรวจสอบว่ามีการนิยาม isChecked หรือไม่
  const [bmi, setBmi] = useState(null); // State สำหรับค่า BMI
  const [bmiStatus, setBmiStatus] = useState(""); // State สำหรับสถานะ BMI

  const handleIncrease = () => {
    setWeight((prevWeight) => prevWeight + 1); // เพิ่มน้ำหนักขึ้น 1
  };
  const handleDecrease = () => {
    setWeight((prevWeight) => Math.max(1, prevWeight - 1)); // ลดน้ำหนักลง 1 และไม่ให้ต่ำกว่า 1
  };

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    // จำกัดค่าน้ำหนักให้อยู่ระหว่าง 30 และ 200
    if (value >= 1 && value <= 200) {
      setWeight(value); // อัปเดตน้ำหนักเมื่ออยู่ในช่วงที่กำหนด
    } else if (value < 1) {
      setWeight(1); // ตั้งค่าขั้นต่ำเป็น 30
    } else {
      setWeight(200); // ตั้งค่าสูงสุดเป็น 200
    }
  };

  const calculateBMI = () => {
    const heightInMeters = height / 100; // แปลงส่วนสูงจากเซนติเมตรเป็นเมตร
    const calculatedBmi = (weight / heightInMeters ** 2).toFixed(2); // คำนวณ BMI และปัดทศนิยม 2 ตำแหน่ง
    setBmi(calculatedBmi);

    // กำหนดสถานะ BMI
    if (calculatedBmi < 18.5) {
      setBmiStatus("น้ำหนักน้อย");
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      setBmiStatus("น้ำหนักปกติ");
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      setBmiStatus("น้ำหนักเกิน");
    } else {
      setBmiStatus("โรคอ้วน");
    }
  };

  // คำนวณ BMI ทุกครั้งที่ส่วนสูงหรือน้ำหนักเปลี่ยนแปลง
  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

//ค่าของเพศ อยากให้ดึงมาจากregister
const gender = "male"; // หรือ "female"
const genderLabel = gender === "male" ? "ชาย" : "หญิง";

//ค่าเบาหวาน 
const fbsValue = 150; //  เปลี่ยนตรงนี้ให้เป็นค่าที่รับมาจาก Excel
// สร้างฟังก์ชันเพื่อคืนข้อความและสีตามค่าที่รับ
const getFbsStatus = (value) => {
  if (value < 100) {
    return { label: 'ปกติ', color: '#33AC5E' }; // เขียว
  } else if (value >= 100 && value <= 125) {
    return { label: 'กลุ่มเสี่ยงเบาหวาน', color: '#FFD700' }; // เหลือง
  } else {
    return { label: 'เบาหวาน', color: '#F55555' }; // แดง
  }
};
const fbsStatus = getFbsStatus(fbsValue);

//ค่าBUN
const bunValue = 11; // เปลี่ยนเป็นค่าที่รับมาจาก Excel
//function
const getBunStatus = (value) => {
  if (value >= 10 && value <= 20) {
    return { label: 'ปกติ', color: '#33AC5E' };
  } else {
    return { label: 'ผิดปกติ', color: '#F55555' };
  }
};
const bunStatus = getBunStatus(bunValue);

//ค่าCreatinine ค่าที่ได้จากExel
const creatinineValue = 1.2; // ค่าที่รับมาจาก Excel 
//function
const getCreatinineStatus = (value, gender) => {
  if (
    (gender === 'male' && value >= 0.74 && value <= 1.35) ||
    (gender === 'female' && value >= 0.59 && value <= 1.04)
  ) {
    return { label: 'ปกติ', color: '#33AC5E' };
  } else {
    return { label: 'ผิดปกติ', color: '#F55555' };
  }
};
const creatinineStatus = getCreatinineStatus(creatinineValue, gender);

//ค่าUric acid
const uricValue = 6.5; // ค่าจาก Excel
//function
const getUricStatus = (value, gender) => {
  if (
    (gender === 'male' && value >= 3.4 && value <= 7.0) ||
    (gender === 'female' && value >= 2.4 && value <= 6.0)
  ) {
    return { label: 'ปกติ', color: '#33AC5E' }; // เขียว
  } else {
    return { label: 'ผิดปกติ', color: '#F55555' }; // แดง
  }
};
const uricStatus = getUricStatus(uricValue, gender);


  return (
    <div className="bg-white min-h-screen p-4 rounded-xl">
        <div className="flex text-2xl font-semibold text-navy-blue m-4">
          <FiFolder className="mr-2" size={28} />
          <p> ผลตรวจสุขภาพประจำปี </p>
        </div>
          {/* Grid Layout */}
          <div className="grid grid-cols-4 gap-4 ">
            {/* ซ้ายมือ */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {/* การ์ดอายุ */}
              <div className="bg-white shadow-md rounded-[20px] py-4 px-2 flex flex-col items-center justify-center">
                <h3 className="text-navy-blue depa-Header-text">อายุ</h3>
                <p className="text-[#FFC600] depa-Big-text">30</p>
              </div>
              {/* การ์ดเพศ */}
              <div className="bg-white shadow-md rounded-[20px] py-4 px-2 flex flex-col items-center justify-center">
                <h3 className="text-navy-blue depa-Header-text">เพศ</h3>
                <p className="text-[#FFC600] depa-Big-text">{genderLabel}</p>
              </div>

              {/* การ์ดน้ำหนัก */}
              <div className="bg-white shadow-md rounded-[20px] py-4 px-2 flex flex-col items-center justify-center">
                <p className="text-navy-blue text-lg font-semibold">น้ำหนัก (กก.)</p>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 3 && /^[0-9]*$/.test(value)) {
                      setWeight(Number(value));
                    }
                  }}
                  onBlur={() => setWeight(Math.min(200, Math.max(1, weight || 1)))}
                  className="w-[120px] text-center text-[#FFC600] depa-Big-text bg-transparent focus:outline-none focus:ring-yellow-400"
                />
              </div>
              {/* การ์ดส่วนสูง */}
              <div className="bg-white shadow-md rounded-[20px] py-4 px-2 flex flex-col items-center justify-center">
                <p className="text-navy-blue text-lg font-semibold">ส่วนสูง (ซม.)</p>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 3 && /^[0-9]*$/.test(value)) {
                      setHeight(Number(value));
                    }
                  }}
                  onBlur={() =>
                    setHeight(Math.min(300, Math.max(50, height || 50)))
                  }
                  className="w-[135px] text-center text-[#FFC600] depa-Big-text bg-transparent focus:outline-none focus:ring-yellow-400"
                />
              </div>
              {/* การ์ดBMI */}
                <div
                  className="bg-white shadow-md rounded-[20px] w-[385px] flex flex-col items-center justify-center p-6"
                  style={{ flex: 1.5 }}
                >
                  <h3 className="text-navy-blue depa-Header-text">
                    ผลลัพธ์ค่า BMI
                  </h3>
                  <div className="flex items-baseline">
                    {bmi ? (
                      <>
                        {/* แสดงส่วนจำนวนเต็ม */}
                        <span className="text-[#FFC600] depa-Super-Big-text">
                          {Math.floor(bmi)}
                        </span>
                        {/* แสดงส่วนทศนิยม */}
                        <span className="text-[#FFC600] depa-Title-text">
                          .{bmi.split(".")[1] || "00"}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-500 depa-Navigate-text">
                        กำลังคำนวณ...
                      </span>
                    )}
                  </div>

                  <p className="text-navy-blue depa-Navigate-text mb-2">
                    สถานะ BMI: {bmiStatus || "กำลังคำนวณ..."}
                  </p>
                  <div className="text-navy-blue depa-Small-text text-center">
                    <p>น้ำหนักน้อย: BMI ต่ำกว่า 18.5</p>
                    <p>น้ำหนักปกติ: BMI อยู่ระหว่าง 18.5 ถึง 24.9</p>
                    <p>น้ำหนักเกิน: BMI อยู่ระหว่าง 25 ถึง 29.9</p>
                    <p>โรคอ้วน: BMI อยู่ระหว่าง 30 ถึง 40</p>
                  </div>
                </div>
            </div>

            {/* ตรงกลาง */}
            <div className="col-span-3 space-y-4">
              {/* การ์ดใหญ่ */}
              <div className="bg-white shadow-md rounded-[20px] p-6">
                <div className="grid grid-cols-4 gap-4">
                  <div className="relative group">
                    {/* การ์ด */}
                    <div className="bg-[#aeb6bf] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                      {/* ส่วนหัว */}
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex flex-col">
                          <span className="text-white text-2xl font-extrabold ml-2">ความดันโลหิต</span>
                          <div className="w-[40px] pt-1">
                            <p className="bg-white text-[#F55555] text-xl font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                              X
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-center p-2">
                          <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                          <img
                            src="../src/assets/images/health/health-image2.png"
                            alt="ความดันโลหิต"
                            className="w-[45px] h-[45px] relative z-10"
                          />
                        </div>
                      </div>

                      {/* ส่วนเนื้อหา */}
                      <div className="flex flex-col">
                        <p className="text-white depa-Title-text pl-3 text-right">
                          x <span className="depa-Header-text">mmHg</span>
                        </p>
                      </div>
                    </div>

                    {/* ป๊อปอัพรายละเอียด */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                        <h3 className="text-[#F55555] depa-Button-text mb-2">
                          ข้อมูลเพิ่มเติม
                        </h3>
                        <p className="depa-Samll-text">
                          ระดับน้ำตาลในเลือดสูงกว่าปกติ อาจส่งผลต่อสุขภาพ โปรดปรึกษาแพทย์
                        </p>
                      </div>
                    </div>
                  </div>

                  {/*การ์ดใบที่ 2  */}
                  <div className="relative group">
                    <div className="bg-[#aeb6bf] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                      
                      {/* ส่วนหัว */}
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex flex-col">
                          <span className="text-white text-2xl font-extrabold ml-2">FBS</span>
                          <div className="pt-1">
                            <p
                              className="text-l font-semibold px-3 py-1 rounded-full mt-1 min-w-[120px] text-center"
                              style={{ backgroundColor: 'white', color: fbsStatus.color }}
                            >
                              {fbsStatus.label}
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-center p-2">
                          <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                          <img
                            src="../src/assets/images/health/health-image1.png"
                            alt="FBS"
                            className="w-[45px] h-[45px] relative z-10"
                          />
                        </div>
                      </div>

                      {/* ส่วนเนื้อหา */}
                      <div className="flex flex-col">
                        <p className="text-white depa-Title-text pl-3 text-right">
                          {fbsValue} <span className="depa-Header-text">mg/dL</span>
                        </p>
                      </div>
                    </div>

                    {/* ป๊อปอัพรายละเอียด */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                        <h3 className="text-[#F55555] depa-Button-text mb-2">ข้อมูลเพิ่มเติม</h3>
                        <p className="depa-Samll-text">
                          {
                            fbsValue < 100
                              ? 'หากผลตรวจมีค่าน้ำตาลกลูโคสต่ำกว่า 100 มิลลิกรัม/เดซิลิตร แสดงว่าอยู่ในเกณฑ์ปกติ'
                              : fbsValue <= 125
                              ? 'หากผลตรวจมีค่าน้ำตาลกลูโคส 100–125 mg/dL แสดงว่าเป็นกลุ่มเสี่ยงโรคเบาหวาน ควรปรับพฤติกรรมการบริโภคน้ำตาล'
                              : 'หากผลตรวจมีค่าน้ำตาลกลูโคสเกิน 126 mg/dL แสดงว่าเป็นโรคเบาหวาน ควรเข้ารับการรักษาจากแพทย์'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    {/* การ์ดใบที่ 3 */}
                    <div className="bg-[#aeb6bf] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                      
                      {/* ส่วนหัว */}
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex flex-col">
                          <span className="text-white text-2xl font-extrabold ml-2">BUN</span>
                          <div className="pt-1">
                            <p
                              className="text-xl font-semibold px-3 py-1 rounded-full mt-1 min-w-[100px] text-center bg-white"
                              style={{ color: bunStatus.color }}
                            >
                              {bunStatus.label}
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-center p-2">
                          <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                          <img
                            src="../src/assets/images/health/health-image3.png"
                            alt="BUN"
                            className="w-[45px] h-[45px] relative z-10"
                          />
                        </div>
                      </div>

                      {/* ส่วนเนื้อหา */}
                      <div className="flex flex-col">
                        <p className="text-white depa-Title-text pl-3 text-right">
                          {bunValue} <span className="depa-Header-text">mg/dL</span>
                        </p>
                      </div>
                    </div>

                    {/* ป๊อปอัพรายละเอียด */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                        <h3 className="text-[#F55555] depa-Button-text mb-2">ข้อมูลเพิ่มเติม</h3>
                        <p className="depa-Samll-text">
                          ความดันโลหิตสูงกว่าปกติ อาจส่งผลต่อหัวใจ ไต และหลอดเลือด
                          หากปล่อยไว้อาจนำไปสู่โรคร้ายแรง โปรดปรึกษาแพทย์เพื่อปรับเปลี่ยนพฤติกรรมและรับการรักษา
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    {/* การ์ดใบที่ 4 */}
                    <div className="bg-[#aeb6bf] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">

                      {/* ส่วนหัว */}
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex flex-col">
                          <span className="text-white text-2xl font-extrabold ml-2">Creatinine</span>
                          <div className="pt-1">
                            <p
                              className="text-xl font-semibold px-3 py-1 rounded-full mt-1 min-w-[100px] text-center bg-white"
                              style={{ color: creatinineStatus.color }}
                            >
                              {creatinineStatus.label}
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-center p-2">
                          <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                          <img
                            src="../src/assets/images/health/health-image4-1.png"
                            alt="creatinine"
                            className="w-[45px] h-[45px] relative z-10"
                          />
                        </div>
                      </div>

                      {/* ส่วนเนื้อหา */}
                      <div className="flex flex-col">
                        <p className="text-white depa-Title-text pl-3 text-right">
                          {creatinineValue} <span className="depa-Header-text">mg/dL</span>
                        </p>
                      </div>
                    </div>

                    {/* ป๊อปอัพรายละเอียด */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                        <h3 className="text-[#F55555] depa-Button-text mb-2">ข้อมูลเพิ่มเติม</h3>
                        <p className="depa-Samll-text">
                          ระดับครีอะตินินที่สูงกว่าปกติ อาจบ่งบอกถึงภาวะการทำงานของไตบกพร่อง ควรพบแพทย์เพื่อทำการวินิจฉัยเพิ่มเติม
                        </p>
                      </div>
                    </div>
                  </div>

{/* การ์ดใบที่ 5 */}
<div className="relative group">
  <div className="bg-[#aeb6bf] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">

    {/* ส่วนหัว */}
    <div className="flex items-start justify-between space-x-3">
      <div className="flex flex-col">
        <span className="text-white text-2xl font-extrabold ml-2">Uric Acid</span>
        <div className="pt-1">
          <p
            className="bg-white text-xl font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center"
            style={{ color: uricStatus.color }}
          >
            {uricStatus.label}
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-center p-2">
        <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
        <img
          src="../src/assets/images/health/health-image5.png"
          alt="กรดยูริก"
          className="w-[45px] h-[45px] relative z-10"
        />
      </div>
    </div>

    {/* ส่วนเนื้อหา */}
    <div className="flex flex-col">
      <p className="text-white depa-Title-text pl-3 text-right">
        {uricValue} <span className="depa-Header-text">mg/dL</span>
      </p>
    </div>
  </div>

  {/* ป๊อปอัพรายละเอียด */}
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
    <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
      <h3 className="text-[#F55555] depa-Button-text mb-2">ข้อมูลเพิ่มเติม</h3>
      <p className="depa-Samll-text">
        ระดับกรดยูริกในเลือดสูงกว่าปกติ อาจเพิ่มความเสี่ยงต่อโรคเกาต์และนิ่วในไต
        ควรปรึกษาแพทย์เพื่อปรับพฤติกรรมการกินและรับคำแนะนำในการรักษา
      </p>
    </div>
  </div>
</div>


                  {/*การ์กใบที่ 6*/}
                  <div className="relative group">
                    <div className="bg-[#aeb6bf] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                      
                      {/* ส่วนหัว */}
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex flex-col">
                          <span className="text-white text-2xl font-extrabold ml-2">Cholesterol</span>
                          <div className="w-[40px] pt-1">
                            <p className="bg-white text-[#33AC5E] text-xl font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                              x
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-center p-2">
                          <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                          <img
                            src="../src/assets/images/health/health-image6.png"
                            alt="Cholesterol"
                            className="w-[45px] h-[45px] relative z-10"
                          />
                        </div>
                      </div>

                      {/* ส่วนเนื้อหา */}
                      <div className="flex flex-col">
                        <p className="text-white depa-Title-text pl-3 text-right">
                          x <span className="depa-Header-text">mg/dL</span>
                        </p>
                      </div>
                    </div>

                    {/* ป๊อปอัพรายละเอียด */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                        <h3 className="text-[#F55555] depa-Button-text mb-2">ข้อมูลเพิ่มเติม</h3>
                        <p className="depa-Samll-text">
                          ระดับกรดยูริกในเลือดสูงกว่าปกติ อาจเพิ่มความเสี่ยงต่อโรคเกาต์และนิ่วในไต
                          ควรปรึกษาแพทย์เพื่อปรับพฤติกรรมการกินและรับคำแนะนำในการรักษา
                        </p>
                      </div>
                    </div>
                  </div>


                  <div className="relative group">
                    {/* การ์ดใบที่ 7 */}
                    <div className="bg-[#aeb6bf] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                      {/* ส่วนหัว */}
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex flex-col">
                          <span className="text-white text-2xl font-extrabold ml-2">Triglyceride</span>
                          <div className="w-20 pt-1">
                            <p className="bg-white text-[#33AC5E] text-xl font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                              x
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-center p-2">
                          <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                          <img
                            src="../src/assets/images/health/health-image7.png"
                            alt="Triglyceride"
                            className="w-[45px] h-[45px] relative z-10"
                          />
                        </div>
                      </div>

                      {/* ส่วนเนื้อหา */}
                      <div className="flex flex-col">
                        <p className="text-white depa-Title-text pr-3 text-right">
                          x <span className="depa-Header-text">mg/dL</span>
                        </p>
                      </div>
                    </div>

                    {/* ป๊อปอัพรายละเอียด */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                        <h3 className="text-[#F55555] depa-Button-text mb-2">ข้อมูลเพิ่มเติม</h3>
                        <p className="depa-Samll-text">
                          ไตรกลีเซอไรด์เป็นไขมันชนิดหนึ่งในเลือด หากระดับสูงอาจเพิ่มความเสี่ยงต่อโรคหัวใจและหลอดเลือด
                          การควบคุมอาหาร ออกกำลังกาย และการใช้ยาอาจช่วยลดระดับไขมันนี้ได้
                        </p>
                      </div>
                    </div>
                  </div>


                    {/*การ์ดใบที่8*/}
                    <div className="relative group">
                      <div className="bg-[#aeb6bf] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                        
                        {/* ส่วนหัว */}
                        <div className="flex items-start justify-between space-x-3">
                          <div className="flex flex-col">
                            <span className="text-white text-2xl font-extrabold ml-2">HDL</span>
                            <div className="pt-1">
                              <p className="bg-white text-[#33AC5E] text-xl font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                                x
                              </p>
                            </div>
                          </div>

                          <div className="relative flex items-center justify-center p-2">
                            <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                            <img
                              src="../src/assets/images/health/health-image8.png"
                              alt="HDL"
                              className="w-[45px] h-[40px] relative z-10"
                            />
                          </div>
                        </div>

                        {/* ส่วนเนื้อหา */}
                        <div className="flex flex-col">
                          <p className="text-white depa-Title-text pl-3 text-right">
                            x <span className="depa-Header-text">mg/dL</span>
                          </p>
                        </div>
                      </div>

                      {/* ป๊อปอัพรายละเอียด */}
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                          <h3 className="text-[#F55555] depa-Button-text mb-2">ข้อมูลเพิ่มเติม</h3>
                          <p className="depa-Samll-text">
                            ระดับกรดยูริกในเลือดสูงกว่าปกติ อาจเพิ่มความเสี่ยงต่อโรคเกาต์และนิ่วในไต
                            ควรปรึกษาแพทย์เพื่อปรับพฤติกรรมการกินและรับคำแนะนำในการรักษา
                          </p>
                        </div>
                      </div>
                    </div>

                  {/*การ์ดใบที่ 9*/}
                  <div className="relative group">
                    <div className="bg-[#aeb6bf] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                      
                      {/* ส่วนหัว */}
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex flex-col">
                          <span className="text-white text-2xl font-extrabold ml-2">LDL</span>
                          <div className="pt-1">
                            <p className="bg-white text-[#33AC5E] text-xl font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                              x
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-center p-2">
                          <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                          <img
                            src="../src/assets/images/health/health-image9.png"
                            alt="LDL"
                            className="w-[45px] h-[40px] relative z-10"
                          />
                        </div>
                      </div>

                      {/* ส่วนเนื้อหา */}
                      <div className="flex flex-col">
                        <p className="text-white depa-Title-text pl-3 text-right">
                          x <span className="depa-Header-text">mg/dL</span>
                        </p>
                      </div>
                    </div>

                    {/* ป๊อปอัพรายละเอียด */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                        <h3 className="text-[#F55555] depa-Button-text mb-2">ข้อมูลเพิ่มเติม</h3>
                        <p className="depa-Samll-text">
                          ระดับ LDL สูงเกินไป อาจนำไปสู่การสะสมไขมันในหลอดเลือดแดง
                          เพิ่มความเสี่ยงต่อโรคหัวใจและหลอดเลือด ควรควบคุมอาหารและออกกำลังกายสม่ำเสมอ
                        </p>
                      </div>
                    </div>
                  </div>

                  {/*การ์ดใบที่10 */}
                  <div className="relative group">
                    <div className="bg-[#aeb6bf] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                      {/* ส่วนหัว */}
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex flex-col">
                          <span className="text-white text-2xl font-extrabold ml-2">Anti-HBs</span>
                          <div className="w-20 pt-1">
                            <p className="bg-white text-[#33AC5E] text-xl font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                              x
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-center p-2">
                          <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                          <img
                            src="../src/assets/images/health/health-image10.png"
                            alt="Anti-HBs"
                            className="w-[45px] h-[40px] relative z-10"
                          />
                        </div>
                      </div>

                      {/* ส่วนเนื้อหา */}
                      <div className="flex flex-col">
                        <p className="text-white depa-Title-text pl-3 text-right">Positive</p>
                      </div>
                    </div>

                    {/* ป๊อปอัพรายละเอียด */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                        <h3 className="text-[#F55555] depa-Button-text mb-2">ข้อมูลเพิ่มเติม</h3>
                        <p className="depa-Samll-text">
                          ระดับ Anti-HBs เป็น Positive หมายถึงร่างกายมีภูมิคุ้มกันต่อไวรัสตับอักเสบบี
                          ซึ่งอาจเกิดจากการได้รับวัคซีนหรือหายจากการติดเชื้อ
                        </p>
                      </div>
                    </div>
                  </div>


                  <div className="relative group">
                    {/* การ์ดใบที่ 11 */}
                    <div className="bg-[#aeb6bf] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                      {/* ส่วนหัว */}
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex flex-col">
                          <span className="text-white text-2xl font-extrabold ml-2">HBs Ag</span>
                          <div className="pt-1">
                            <p className="bg-white text-[#33AC5E] text-xl font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                              x
                            </p>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-center p-2">
                          <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                          <img
                            src="../src/assets/images/health/health-image11.png"
                            alt="HBs Ag"
                            className="w-[45px] h-[45px] relative z-10"
                          />
                        </div>
                      </div>

                      {/* ส่วนเนื้อหา */}
                      <div className="flex flex-col">
                        <p className="text-white depa-Title-text pr-3 text-right">Negative</p>
                      </div>
                    </div>

                    {/* ป๊อปอัพรายละเอียด */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                        <h3 className="text-[#F55555] depa-Button-text mb-2">ข้อมูลเพิ่มเติม</h3>
                        <p className="depa-Samll-text">
                          การตรวจ HBs Ag ที่มีผล Negative หมายถึงไม่พบการติดเชื้อไวรัสตับอักเสบบีในขณะนั้น
                          ควรตรวจ Anti-HBs ร่วมเพื่อประเมินภูมิคุ้มกัน
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* การ์ดใหญ่ 2 ใบ (ซ้ายและขวาครอบคลุม Layout) */}
              <div className="flex gap-4 ">
                {/* การ์ดฝั่งขวา */}
                <div
                  className="bg-white shadow-md rounded-[20px] h-[300px] p-4 flex flex-col justify-between"
                  style={{ flex: 2.5 }}
                >
                  {/* ส่วนเนื้อหาอื่นในการ์ด */}
                  <div>
                    <h3 className="text-navy-blue depa-Header-text">
                      หมายเหตุและคำแนะนำ
                    </h3>
                    <p className="text-navy-blue depa-Small-text pt-2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                      nostrum, recusandae beatae tenetur quia a , adipisci illum eum
                      harum blanditiis, impedit ducimus. Consequatur veniam,
                      similique adipisci praesentium repudiandae ipsum excepturi?
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
       
      
    </div>
  );
};

export default HealthA;
