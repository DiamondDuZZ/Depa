import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaPlus, FaMinus } from "react-icons/fa";

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

  return (
    <div className="bg-gray-light3 min-h-screen pt-4">
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
            <p className="text-[#FFC600] depa-Big-text">ชาย</p>
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
                <div className="bg-gradient-to-tl from-[#FCCF31] to-[#F55555] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                  {/* ส่วนหัว */}
                  <div className="flex items-start space-x-3">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                      <img
                        src="../src/assets/images/health/health-image2.png"
                        alt="ระดับน้ำตาลในเลือด"
                        className="w-[63px] h-[63px] relative z-10"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-extrabold text-base">
                        ความดันโลหิต
                      </span>
                      <div className="w-[40px] pt-1">
                        <p className="bg-white text-[#F55555] text-sm font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                          X
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ส่วนเนื้อหา */}
                  <div className="flex flex-col">
                    <p className="text-white depa-Title-text pl-3">
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
                      ระดับน้ำตาลในเลือดสูงกว่าปกติ อาจส่งผลต่อสุขภาพ
                      โปรดปรึกษาแพทย์
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                {/* การ์ดใบที่ 2 */}
                <div className="bg-gradient-to-tl from-[#FEB692] to-[#EA5455] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                  {/* ส่วนหัว */}
                  <div className="flex items-start space-x-3">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                      <img
                        src="../src/assets/images/health/health-image1.png"
                        alt="คอเรสเตอรอล"
                        className="w-[63px] h-[63px] relative z-10"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-extrabold text-base">
                        FBS
                      </span>
                      <div className="w-[40px] pt-1">
                        <p className="bg-white text-[#33AC5E] text-sm font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                          X
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ส่วนเนื้อหา */}
                  <div className="flex flex-col">
                    <p className="text-white depa-Title-text pl-3">
                      x <span className="depa-Header-text">mg/dL</span>
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
                      ระดับคอเรสเตอรอลในเลือดสูงกว่าปกติ อาจเพิ่มความเสี่ยงต่อโรค
                      หัวใจและหลอดเลือด โปรดปรึกษาแพทย์เพื่อรับคำแนะนำ
                      ในการปรับเปลี่ยนพฤติกรรมหรือรักษาอย่างเหมาะสม
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                {/* การ์ดใบที่ 3 */}
                <div className="bg-gradient-to-tl from-[#ABDCFF] to-[#0396FF] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                  {/* ส่วนหัว */}
                  <div className="flex items-start space-x-3">
                    <div className="relative flex items-center justify-center p-2">
                      <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                      <img
                        src="../src/assets/images/health/health-image3.png"
                        alt="ความดันโลหิต"
                        className="w-[45px] h-[45px] relative z-10"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-extrabold text-base">
                        BUN
                      </span>
                      <div className="w-[40px] pt-1">
                        <p className="bg-white text-[#33AC5E] text-sm font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                          X
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ส่วนเนื้อหา */}
                  <div className="flex flex-col">
                    <p className="text-white depa-Title-text pl-3">
                      x<span className="depa-Header-text pl-2">mg/dL</span>
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
                      ความดันโลหิตสูงกว่าปกติ อาจส่งผลต่อหัวใจ ไต และหลอดเลือด
                      หากปล่อยไว้อาจนำไปสู่โรคร้ายแรง
                      โปรดปรึกษาแพทย์เพื่อปรับเปลี่ยนพฤติกรรมและรับการรักษา
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                {/* การ์ดใบที่ 4 */}
                <div className="bg-gradient-to-tl from-[#CE9FFC] to-[#7367F0] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-[-4px]">
                  {/* ส่วนหัว */}
                  <div className="flex items-start space-x-3">
                    <div className="relative flex items-center justify-center p-2">
                        <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                        <img
                          src="../src/assets/images/health/health-image4-1.png"
                          alt="กรดยูริก"
                          className="w-[45px] h-[45px] relative z-10"
                        />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-extrabold text-base">
                        Creatinine
                      </span>
                      <div className="w-[40px] pt-1">
                        <p className="bg-white text-[#33AC5E] text-sm font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                          X
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ส่วนเนื้อหา */}
                  <div className="flex flex-col">
                    <p className="text-white depa-Title-text pl-3">
                      x <span className="depa-Header-text">mg/dL</span>
                    </p>
                  </div>

                  {/* ป๊อปอัพรายละเอียด */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                      <h3 className="text-[#F55555] depa-Button-text mb-2">
                        ข้อมูลเพิ่มเติม
                      </h3>
                      <p className="depa-Samll-text">
                        ระดับกรดยูริกในเลือดสูงกว่าปกติ
                        อาจเพิ่มความเสี่ยงต่อโรคเกาต์และนิ่วในไต
                        ควรปรึกษาแพทย์เพื่อปรับพฤติกรรมการกินและรับคำแนะนำในการรักษา
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                {/* การ์ดใบที่ 5 */}
                <div className="bg-gradient-to-tl from-[#CE9FFC] to-[#7367F0] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-[-4px]">
                  {/* ส่วนหัว */}
                  <div className="flex items-start space-x-3">
                      <div className="relative flex items-center justify-center p-2">
                        <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                        <img
                          src="../src/assets/images/health/health-image5.png"
                          alt="กรดยูริก"
                          className="w-[45px] h-[45px] relative z-10"
                        />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-extrabold text-base">
                        Uric Acid
                      </span>
                      <div className="w-[40px] pt-1">
                        <p className="bg-white text-[#33AC5E] text-sm font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                          X
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ส่วนเนื้อหา */}
                  <div className="flex flex-col">
                    <p className="text-white depa-Title-text pl-3">
                      x <span className="depa-Header-text">mg/dL</span>
                    </p>
                  </div>

                  {/* ป๊อปอัพรายละเอียด */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                      <h3 className="text-[#F55555] depa-Button-text mb-2">
                        ข้อมูลเพิ่มเติม
                      </h3>
                      <p className="depa-Samll-text">
                        ระดับกรดยูริกในเลือดสูงกว่าปกติ
                        อาจเพิ่มความเสี่ยงต่อโรคเกาต์และนิ่วในไต
                        ควรปรึกษาแพทย์เพื่อปรับพฤติกรรมการกินและรับคำแนะนำในการรักษา
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                {/* การ์ดใบที่ 6 */}
                <div className="bg-gradient-to-tl from-[#CE9FFC] to-[#7367F0] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-[-4px]">
                  {/* ส่วนหัว */}
                  <div className="flex items-start space-x-3">
                      <img
                        src="../src/assets/images/health/health-image6.png"
                        alt="กรดยูริก"
                        className="w-[63px] h-[63px]"
                      />
                    <div className="flex flex-col">
                      <span className="text-white font-extrabold text-base">
                        Cholesterol
                      </span>
                      <div className="w-[40px] pt-1">
                        <p className="bg-white text-[#33AC5E] text-sm font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                          x
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ส่วนเนื้อหา */}
                  <div className="flex flex-col">
                    <p className="text-white depa-Title-text pl-3">
                      x <span className="depa-Header-text">mg/dL</span>
                    </p>
                  </div>

                  {/* ป๊อปอัพรายละเอียด */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                      <h3 className="text-[#F55555] depa-Button-text mb-2">
                        ข้อมูลเพิ่มเติม
                      </h3>
                      <p className="depa-Samll-text">
                        ระดับกรดยูริกในเลือดสูงกว่าปกติ
                        อาจเพิ่มความเสี่ยงต่อโรคเกาต์และนิ่วในไต
                        ควรปรึกษาแพทย์เพื่อปรับพฤติกรรมการกินและรับคำแนะนำในการรักษา
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                {/* การ์ดใบที่ 7 */}
                <div className="bg-gradient-to-tl from-[#CE9FFC] to-[#7367F0] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-[-4px]">
                  {/* ส่วนหัว */}
                  <div className="flex items-start space-x-3">
                    <div className="relative flex items-center justify-center p-2">
                      <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                      <img
                        src="../src/assets/images/health/health-image7.png"
                        alt="กรดยูริก"
                        className="w-[45px] h-[45px]  relative z-10"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-extrabold text-base">
                        Triglyceride
                      </span>
                      <div className="w-[40px] pt-1">
                        <p className="bg-white text-[#33AC5E] text-sm font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                          x
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ส่วนเนื้อหา */}
                  <div className="flex flex-col">
                    <p className="text-white depa-Title-text pl-3">
                      x <span className="depa-Header-text">mg/dL</span>
                    </p>
                  </div>

                  {/* ป๊อปอัพรายละเอียด */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                      <h3 className="text-[#F55555] depa-Button-text mb-2">
                        ข้อมูลเพิ่มเติม
                      </h3>
                      <p className="depa-Samll-text">
                        ระดับกรดยูริกในเลือดสูงกว่าปกติ
                        อาจเพิ่มความเสี่ยงต่อโรคเกาต์และนิ่วในไต
                        ควรปรึกษาแพทย์เพื่อปรับพฤติกรรมการกินและรับคำแนะนำในการรักษา
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                {/* การ์ดใบที่ 8 */}
                <div className="bg-gradient-to-tl from-[#CE9FFC] to-[#7367F0] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-[-4px]">
                  {/* ส่วนหัว */}
                  <div className="flex items-start space-x-3">
                    <div className="relative flex items-center justify-center p-2">
                      <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                      <img
                        src="../src/assets/images/health/health-image8.png"
                        alt="กรดยูริก"
                        className="w-[45px] h-[40px] mr-0.5 relative z-10"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-extrabold text-base">
                        HDL
                      </span>
                      <div className="w-[40px] pt-1">
                        <p className="bg-white text-[#33AC5E] text-sm font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                          x
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ส่วนเนื้อหา */}
                  <div className="flex flex-col">
                    <p className="text-white depa-Title-text pl-3">
                      x <span className="depa-Header-text">mg/dL</span>
                    </p>
                  </div>

                  {/* ป๊อปอัพรายละเอียด */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                      <h3 className="text-[#F55555] depa-Button-text mb-2">
                        ข้อมูลเพิ่มเติม
                      </h3>
                      <p className="depa-Samll-text">
                        ระดับกรดยูริกในเลือดสูงกว่าปกติ
                        อาจเพิ่มความเสี่ยงต่อโรคเกาต์และนิ่วในไต
                        ควรปรึกษาแพทย์เพื่อปรับพฤติกรรมการกินและรับคำแนะนำในการรักษา
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                {/* การ์ดใบที่ 9 */}
                <div className="bg-gradient-to-tl from-[#CE9FFC] to-[#7367F0] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-[-4px]">
                  {/* ส่วนหัว */}
                  <div className="flex items-start space-x-3">
                    <div className="relative flex items-center justify-center p-2">
                      <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                      <img
                        src="../src/assets/images/health/health-image9.png"
                        alt="กรดยูริก"
                        className="w-[45px] h-[40px] relative z-10"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-extrabold text-base">
                        LDL
                      </span>
                      <div className="w-[40px] pt-1">
                        <p className="bg-white text-[#33AC5E] text-sm font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                          x
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ส่วนเนื้อหา */}
                  <div className="flex flex-col">
                    <p className="text-white depa-Title-text pl-3">
                      x <span className="depa-Header-text">mg/dL</span>
                    </p>
                  </div>

                  {/* ป๊อปอัพรายละเอียด */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                      <h3 className="text-[#F55555] depa-Button-text mb-2">
                        ข้อมูลเพิ่มเติม
                      </h3>
                      <p className="depa-Samll-text">
                        ระดับกรดยูริกในเลือดสูงกว่าปกติ
                        อาจเพิ่มความเสี่ยงต่อโรคเกาต์และนิ่วในไต
                        ควรปรึกษาแพทย์เพื่อปรับพฤติกรรมการกินและรับคำแนะนำในการรักษา
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                {/* การ์ดใบที่ 10 */}
                <div className="bg-gradient-to-tl from-[#CE9FFC] to-[#7367F0] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-[-4px]">
                  {/* ส่วนหัว */}
                  <div className="flex items-start space-x-3">
                    <div className="relative flex items-center justify-center p-2">
                      <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                      <img
                        src="../src/assets/images/health/health-image10.png"
                        alt="กรดยูริก"
                        className="w-[45px] h-[40px] relative z-10"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-extrabold text-base">
                        Anti-HBs
                      </span>
                      <div className="w-[40px] pt-1">
                        <p className="bg-white text-[#33AC5E] text-sm font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                          x
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ส่วนเนื้อหา */}
                  <div className="flex flex-col">
                    <p className="text-white depa-Title-text pl-3">
                       Positive
                    </p>
                  </div>

                  {/* ป๊อปอัพรายละเอียด */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                      <h3 className="text-[#F55555] depa-Button-text mb-2">
                        ข้อมูลเพิ่มเติม
                      </h3>
                      <p className="depa-Samll-text">
                        ระดับกรดยูริกในเลือดสูงกว่าปกติ
                        อาจเพิ่มความเสี่ยงต่อโรคเกาต์และนิ่วในไต
                        ควรปรึกษาแพทย์เพื่อปรับพฤติกรรมการกินและรับคำแนะนำในการรักษา
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                {/* การ์ดใบที่ 11 */}
                <div className="bg-gradient-to-tl from-[#CE9FFC] to-[#7367F0] shadow-lg rounded-[25px] h-[150px] p-4 flex flex-col justify-between transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-xl group-hover:translate-[-4px]">
                  {/* ส่วนหัว */}
                  <div className="flex items-start space-x-3">
                     <div className="relative flex items-center justify-center p-2">
                      <span className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md"></span>
                      <img
                        src="../src/assets/images/health/health-image11.png"
                        alt="กรดยูริก"
                        className="w-[45px] h-[45px] relative z-10"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-extrabold text-base">
                        HBs Ag
                      </span>
                      <div className="w-[40px] pt-1">
                        <p className="bg-white text-[#33AC5E] text-sm font-semibold px-3 py-1 rounded-full mt-1 min-w-[80px] text-center">
                          x
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ส่วนเนื้อหา */}
                  <div className="flex flex-col">
                    <p className="text-white depa-Title-text pl-3">
                      Negative
                    </p>
                  </div>

                  {/* ป๊อปอัพรายละเอียด */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 text-sm text-gray-700 w-[280px] animate-fade-in">
                      <h3 className="text-[#F55555] depa-Button-text mb-2">
                        ข้อมูลเพิ่มเติม
                      </h3>
                      <p className="depa-Samll-text">
                        ระดับกรดยูริกในเลือดสูงกว่าปกติ
                        อาจเพิ่มความเสี่ยงต่อโรคเกาต์และนิ่วในไต
                        ควรปรึกษาแพทย์เพื่อปรับพฤติกรรมการกินและรับคำแนะนำในการรักษา
                      </p>
                    </div>
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
