import React, { useState } from "react";

const Step4 = ({ setStep, calculatedData, setCalculatedData, salary, box1, setBox1, box2, setBox2, box3, setBox3, box4, setBox4, box5, setBox5, box6, setBox6 }) => {
  

  const calculateReductions = () => {
    let reduction = 0;
    let reduction2 = 0;
    let test = 0;

    if (box1) {
      // คำนวณ 15% ของ salary  
      const maxReduction = Math.min(Number(calculatedData.totalIncome) * 0.15, 500000); // ไม่เกิน 500,000 บาท
      reduction += Math.min(Number(box1), maxReduction); // เพิ่มค่า box1 โดยไม่เกินเงื่อนไข
      test = Math.min(Number(box1), maxReduction); // เพิ่มค่า box1 โดยไม่เกินเงื่อนไข
      console.log("กล่อง1",test);
    }
    if (box2) {
      const maxReduction = 13200; // ไม่เกิน 500,000 บาท
      reduction2 += Math.min(Number(box2), maxReduction); // เพิ่มค่า box1 โดยไม่เกินเงื่อนไข
      test = Math.min(Number(box2), maxReduction); // เพิ่มค่า box1 โดยไม่เกินเงื่อนไข
      console.log("กล่อง2",test);
    }
    if (box3) {
      const maxReduction = Math.min(Number(calculatedData.totalIncome) * 0.15); 
      reduction2 += Math.min(Number(box3), maxReduction); 
      test = Math.min(Number(box3), maxReduction); 
      console.log("กล่อง3",test);
    }
    if (box4) {
      const maxReduction = Math.min(Number(calculatedData.totalIncome) * 0.15); 
      reduction2 += Math.min(Number(box4), maxReduction); 
      test = Math.min(Number(box4), maxReduction); 
      console.log("กล่อง4",test);
    }
    if (box5) {
      const maxReduction = Math.min(9000); // ไม่เกิน 500,000 บาท
      reduction2 += Math.min(Number(box5), maxReduction); 
      test = Math.min(Number(box5), maxReduction); 
      console.log("กล่อง5",test);
    }
    if (box6) {
      const maxReduction = Math.min(100000); // ไม่เกิน 500,000 บาท
      reduction2 += Math.min(Number(box6), maxReduction); 
      test = Math.min(Number(box6), maxReduction); 
      console.log("กล่อง6",test);
    }
    if (reduction2 > 500000) {
      reduction2 = 500000
    }

    const allreduction = reduction + reduction2;
    // อัปเดตค่าลดหย่อนใน calculatedData
    setCalculatedData((prev) => {
      const previousReduction = prev.fund_deduction || 0;
      const updatedAllDeductions =
        (prev.all_deductions || 0) - previousReduction + allreduction;

      const newData = {
        ...prev,
        fund_deduction: allreduction,
        all_deductions: updatedAllDeductions,
        condition: reduction2,
      };

      console.log("Updated calculatedData:", newData); // Log ค่าที่อัปเดต
      return newData;
    });
  };
  const handleNext = () => {
    calculateReductions();
    setStep(5); // ไปยัง Step ถัดไป
  };

  return (
    <div className="w-full max-w-[800px] text-center">
      <h1 className="depa-Title-text text-navy-blue mb-8">การลดหย่อนภาษี</h1>
      <div className="bg-white rounded-xl p-6 w-full max-w-[490px] mx-auto">
        <label className="block text-lg text-navy-blue mb-2 text-left depa-Header-text">
          ค่าลดหย่อนกองทุนสำรองเลี้ยงชีพ (PVD)
        </label>
        <input
          type="text"
          value={box1.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(rawValue)) {
              setBox1(rawValue);
            }
          }}
          placeholder="ระบุจำนวนเงิน"
          className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
        />

        <div className="text-left">
          <label className="depa-Micro-text text-gray mb-4 ">
            ไม่เกิน 15% ของเงินได้ (ไม่รวมเงินสมทบจากนายจ้าง) และไม่เกิน
            500,000 บาท
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 pt-4 w-full max-w-[490px] mx-auto">
        <label className="block text-lg text-navy-blue mb-2 text-left depa-Header-text">
          กองทุนออมแห่งชาติ (กอช.)
        </label>
        <input
          type="text"
          value={box2.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(rawValue)) {
              setBox2(rawValue);
            }
          }}
          placeholder="ระบุจำนวนเงิน"
          className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
        />

        <div className="text-left">
          <label className="depa-Micro-text text-gray mb-6 ">
            ไม่เกิน 13,200 บาท
            และรวมกับกองทุนอื่นและเบี้ยประกันชีวิตแบบบำนาญแล้วไม่เกิน 500,000
            บาท
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 pt-4 w-full max-w-[490px] mx-auto">
        <label className="block text-lg text-navy-blue mb-2 text-left depa-Header-text">
          กองทุนบำเหน็จบำนาญข้าราชการ (กบข.)
        </label>
        <input
          type="text"
          value={box3.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(rawValue)) {
              setBox3(rawValue);
            }
          }}
          placeholder="ระบุจำนวนเงิน"
          className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
        />

        <div className="text-left">
          <label className="depa-Micro-text text-gray mb-6 ">
            ไม่เกิน 15% ของรายได้ทั้งปี และรวมกับกองทุนอื่นไม่เกิน 500,000 บาท
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 pt-4 w-full max-w-[490px] mx-auto">
        <label className="block text-lg text-navy-blue mb-2 text-left depa-Header-text">
          กองทุนครูเอกชน
        </label>
        <input
          type="text"
          value={box4.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(rawValue)) {
              setBox4(rawValue);
            }
          }}
          placeholder="ระบุจำนวนเงิน"
          className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
        />

        <div className="text-left">
          <label className="depa-Micro-text text-gray mb-6 ">
            ไม่เกิน 15% ของรายได้ทั้งปี
            และรวมกับกองทุนอื่นและเบี้ยประกันชีวิตแบบบำนาญแล้วไม่เกิน 500,000
            บาท
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 pt-4 w-full max-w-[490px] mx-auto">
        <label className="block text-lg text-navy-blue mb-2 text-left depa-Header-text">
          เงินประกันสังคม
        </label>
        <input
          type="text"
          value={box5.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(rawValue)) {
              setBox5(rawValue);
            }
          }}
          placeholder="ระบุจำนวนเงิน"
          className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
        />

        <div className="text-left">
          <label className="depa-Micro-text text-gray mb-6 ">
            ไม่เกิน 9,000 บาท
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 pt-4 pb-2 w-full max-w-[490px] mx-auto">
        <label className="block text-lg text-navy-blue mb-2 text-left">
          ดอกเบี้ยซื้อที่อยู่อาศัย
        </label>
        <input
          type="text"
          value={box6.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(rawValue)) {
              setBox6(rawValue);
            }
          }}
          placeholder="ระบุจำนวนเงิน"
          className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
        />

        <div className="text-left">
          <label className="depa-Micro-text text-gray mb-6 ">
            ไม่เกิน 100,000 บาท
          </label>
        </div>
      </div>

      {/* ปุ่มย้อนกลับและถัดไป */}

      <div className="flex justify-center gap-4 mt-16">
        <button
          onClick={() => setStep(3)}
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

      <p className="depa-Body-text text-gray mt-16 px-4 text-center mb-8">
        **หมายเหตุ:** โปรแกรมคำนวณภาษีนี้เป็นการประมาณเบื้องต้นสำหรับปีภาษี 2567
        ไม่รวมรายการหักลดหย่อนเพิ่มเติมตามประกาศกรมสรรพากร
      </p>
    </div>
  );
};

export default Step4;
