import React, { useState } from "react";

const Step5 = ({ setStep, calculatedData, setCalculatedData, box1s5, setBox1s5, box2s5, setBox2s5, box3s5, setBox3s5, box4s5, setBox4s5 }) => {
  

  const calculateReductions = () => {
    let reduction = 0;
    let reduction2 = 0;
    let reduction3 = 0;
    let test=0;

    if (box1s5) {
      // คำนวณ 15% ของ salary  
      reduction2 += Math.min(Number(box1s5), 100000); // เพิ่มค่า box1 โดยไม่เกินเงื่อนไข
      test = Math.min(Number(box1s5), 100000); // เพิ่มค่า box1 โดยไม่เกินเงื่อนไข
      console.log("กล่อง1",test);
    }
    if (box2s5) {
      const maxReduction = 25000; // ไม่เกิน 500,000 บาท
      reduction2 += Math.min(Number(box2s5), maxReduction); // เพิ่มค่า box1 โดยไม่เกินเงื่อนไข
      test = Math.min(Number(box2s5), maxReduction); // เพิ่มค่า box1 โดยไม่เกินเงื่อนไข
      console.log("กล่อง2",test);
    }
    if (box3s5) {
      reduction += Math.min(Number(box3s5), 15000); 
      test = Math.min(Number(box3s5), 15000); 
      console.log("กล่อง3",test);
    }
    if (box4s5) {
      if (box1s5) {
      const maxReduction = Math.min(Number(calculatedData.totalIncome) * 0.15 , 200000)
      reduction3 += Math.min(Number(box4s5), maxReduction); 
      test = Math.min(Number(box4s5), maxReduction);
      console.log("กล่อง4",test); 
      } else {
        const maxReduction = Math.min(Number(calculatedData.totalIncome) * 0.15 , 300000); 
        reduction3 += Math.min(Number(box4s5), maxReduction);
        test = Math.min(Number(box4s5), maxReduction);
        console.log("กล่อง4",test);
      }
    }
    if (reduction2 > 100000) {
      reduction2 = 100000;
    }
    if (Number(calculatedData.condition) < 500000) {
      if ((Number(reduction3)+Number(calculatedData.condition)) > 500000) {
        reduction3 = 500000 - Number(calculatedData.condition);
      }
    } else {
      reduction3 = 0 ;
    }
    const allreduction = reduction + reduction2 + reduction3;
    // อัปเดตค่าลดหย่อนใน calculatedData
    setCalculatedData((prev) => {
      const previousReduction = prev.insurance_deductions || 0;
      const updatedAllDeductions =
        (prev.all_deductions || 0) - previousReduction + allreduction;

      const newData = {
        ...prev,
        insurance_deductions: allreduction,
        all_deductions: updatedAllDeductions,
      };

      console.log("Updated calculatedData:", newData); // Log ค่าที่อัปเดต
      return newData;
    });
  };
  const handleNext = () => {
    calculateReductions();
    setStep(6); // ไปยัง Step ถัดไป
  };

  return (
    <div className="w-full max-w-[800px] text-center">
      <h1 className=" depa-Title-text text-navy-blue mb-8 ">การลดหย่อนภาษี</h1>

      {/* กล่องข้อมูลแถวแรก */}
      <div className="grid grid-cols-2 gap-6 items-start">
        {/* เบี้ยประกันชีวิต */}
        <div className="bg-white rounded-xl p-6 pb-4">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            เบี้ยประกันชีวิต
          </label>
          <input
            type="text"
            value={box1s5.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(rawValue)) {
              setBox1s5(rawValue);
            }
          }}
            placeholder="ระบุจำนวนเงิน"
            className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
          <div className="text-left mb-6">
            <label className="depa-Micro-text text-gray">
              ไม่เกิน 100,000 บาท
            </label>
          </div>
          <div className="text-left">
            <label className="depa-Micro-text text-gray">
              เบี้ยประกันชีวิต และประกันสุขภาพรวมกันต้องไม่เกิน 100,000 บาท
            </label>
          </div>
        </div>

        {/* เบี้ยประกันสุขภาพ */}
        <div className="bg-white rounded-xl p-6">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            เบี้ยประกันสุขภาพ
          </label>
          <input
            type="text"
            value={box2s5.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(rawValue)) {
              setBox2s5(rawValue);
            }
          }}
            placeholder="ระบุจำนวนเงิน"
            className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
          <div className="text-left">
            <label className="depa-Micro-text text-gray">
              ไม่เกิน 25,000 บาท
            </label>
          </div>
        </div>
      </div>

      {/* เส้นแบ่ง */}
      <div className="my-6 border-t border-gray-light"></div>

      {/* กล่องข้อมูลแถวสอง */}
      <div className="grid grid-cols-2 gap-6 items-start">
        {/* เบี้ยประกันสุขภาพพิการ */}
        <div className="bg-white rounded-xl p-6">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            เบี้ยประกันสุขภาพพิการ/มาตรา
          </label>
          <input
            type="text"
            value={box3s5.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(rawValue)) {
              setBox3s5(rawValue);
            }
          }}
            placeholder="ระบุจำนวนเงิน"
            className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
          <div className="text-left">
            <label className="depa-Micro-text text-gray">
              ไม่เกิน 15,000 บาท
            </label>
          </div>
        </div>

        {/* เบี้ยประกันชีวิตบำนาญ */}
        <div className="bg-white rounded-xl p-6">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            เบี้ยประกันชีวิตบำนาญ
          </label>
          <input
            type="text"
            value={box4s5.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(rawValue)) {
              setBox4s5(rawValue);
            }
          }}
            placeholder="ระบุจำนวนเงิน"
            className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
          <div className="text-left">
            <label className="depa-Micro-text text-gray">
              ไม่เกิน 15% ของรายได้ทั้งปี ไม่เกิน 200,000 บาท
              หากไม่ได้ใช้สิทธิประกันชีวิตทั่วไป สามารถนำมารวมได้สูงสุด 300,000
              บาทและรวมกับกองทุนอื่นไม่เกิน 500,000 บาท
            </label>
          </div>
        </div>
      </div>

      {/* ปุ่มย้อนกลับและถัดไป */}
      <div className="flex justify-center gap-4 mt-16">
        <button
          onClick={() => setStep(4)}
          className="bg-gradient-to-r from-[#B5B5B5] to-[#FFFFFF] depa-Header-text text-navy-blue py-2 px-4 rounded-[60px] shadow-md w-[300px] h-[75px]"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-[#FFC600] to-[#FFF200] depa-Header-text text-navy-blue py-2 px-4 rounded-[60px] shadow-md w-[300px] h-[75px]"
        >
          ถัดไป
        </button>
      </div>

      <p className="depa-Body-text text-gray mt-16 px-4 text-center mb-4">
        **หมายเหตุ:** โปรแกรมคำนวณภาษีนี้เป็นการประมาณเบื้องต้นสำหรับปีภาษี 2567
        ไม่รวมรายการหักลดหย่อนเพิ่มเติมตามประกาศกรมสรรพากร
      </p>
    </div>
  );
};

export default Step5;
