import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaPlus, FaMinus } from "react-icons/fa";

const HealthB = ({ heightB, setHeightB, weightB, setWeightB }) => {
  const [isCheckedB, setIsCheckedB] = useState(false);
  const [bmiB, setBmiB] = useState(null);
  const [bmiStatusB, setBmiStatusB] = useState("");

  const handleIncreaseB = () => {
    setWeightB((prevWeight) => prevWeight + 1);
  };
  const handleDecreaseB = () => {
    setWeightB((prevWeight) => Math.max(1, prevWeight - 1));
  };

  const handleInputChangeB = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 200) {
      setWeightB(value);
    } else if (value < 1) {
      setWeightB(1);
    } else {
      setWeightB(200);
    }
  };

  const calculateBMIB = () => {
    const heightInMeters = heightB / 100;
    const calculatedBmi = (weightB / heightInMeters ** 2).toFixed(2);
    setBmiB(calculatedBmi);
    if (calculatedBmi < 18.5) {
      setBmiStatusB("น้ำหนักน้อย");
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      setBmiStatusB("น้ำหนักปกติ");
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      setBmiStatusB("น้ำหนักเกิน");
    } else {
      setBmiStatusB("โรคอ้วน");
    }
  };

  useEffect(() => {
    calculateBMIB();
  }, [heightB, weightB]);

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
              value={weightB}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 3 && /^[0-9]*$/.test(value)) {
                  setWeightB(Number(value));
                }
              }}
              onBlur={() => setWeightB(Math.min(200, Math.max(1, weightB || 1)))}
              className="w-[120px] text-center text-[#FFC600] depa-Big-text bg-transparent focus:outline-none focus:ring-yellow-400"
            />
          </div>
          {/* การ์ดส่วนสูง */}
          <div className="bg-white shadow-md rounded-[20px] py-4 px-2 flex flex-col items-center justify-center">
            <p className="text-navy-blue text-lg font-semibold">ส่วนสูง (ซม.)</p>
            <input
              type="number"
              value={heightB}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 3 && /^[0-9]*$/.test(value)) {
                  setHeightB(Number(value));
                }
              }}
              onBlur={() => setHeightB(Math.min(300, Math.max(50, heightB || 50)))}
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
                {bmiB ? (
                  <>
                    {/* แสดงส่วนจำนวนเต็ม */}
                    <span className="text-[#FFC600] depa-Super-Big-text">
                      {Math.floor(bmiB)}
                    </span>
                    {/* แสดงส่วนทศนิยม */}
                    <span className="text-[#FFC600] depa-Title-text">
                      .{bmiB.split(".")[1] || "00"}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500 depa-Navigate-text">
                    กำลังคำนวณ...
                  </span>
                )}
              </div>

              <p className="text-navy-blue depa-Navigate-text mb-2">
                สถานะ BMI: {bmiStatusB || "กำลังคำนวณ..."}
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

export default HealthB;
