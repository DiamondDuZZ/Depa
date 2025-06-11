import { s } from "framer-motion/client";
import React, { useState, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Step6 = ({ setStep, calculatedData, calculateProgressiveTax, box1s6, setBox1s6, box2s6, setBox2s6, income, setIncome, adjustedTax, setAdjustedTax, resetForm }) => {
const [taxold, setTaxold] = useState("");
  // คำนวณภาษีเมื่อข้อมูลในช่องกรอกเปลี่ยนแปลง
  useEffect(() => {
    setTaxold(calculatedData.tax);
    const donation1 = Math.min(
      Number(box1s6 || 0) * 2,
      calculatedData.netIncomeAfterDeduction * 0.1
    ); // ลดหย่อน 2 เท่า
    const donation2 = Math.min(
      Number(box2s6 || 0),
      calculatedData.netIncomeAfterDeduction * 0.1
    ); // ลดหย่อนตามที่จ่ายจริง

    const netIncomeAfterDonation2 =
      Number(calculatedData.netIncomeAfterDeduction) -
      Number(calculatedData.status_reduction) -
      Number(calculatedData.fund_deduction) -
      Number(calculatedData.insurance_deductions);
    setIncome(netIncomeAfterDonation2)
    const newtax = calculateProgressiveTax(netIncomeAfterDonation2)
    setTaxold(newtax);  
    const netIncomeAfterDonation =
      Number(calculatedData.netIncomeAfterDeduction) -
      Number(calculatedData.status_reduction) -
      Number(calculatedData.fund_deduction) -
      Number(calculatedData.insurance_deductions) -
      donation1 -
      donation2;

    const newTax = calculateProgressiveTax(Math.max(netIncomeAfterDonation, 0));
    setAdjustedTax(newTax);
  }, [box1s6, box2s6, calculatedData, calculateProgressiveTax]);

  return (
    <div className="w-full max-w-[800px] mx-auto text-center">
      <h1 className="depa-Title-text text-navy-blue mb-12 ">การลดหย่อนภาษี</h1>

      {/* รายการลดหย่อน */}
      <div className="text-left mb-8 space-y-4">
        {[
          {
            label: "รวมเงินได้สุทธิ",
            value: income,
          },
          {
            label: "ภาษีที่ต้องจ่ายก่อนการลดหย่อนเพิ่มเติม",
            value: calculatedData.tax,
          },
          {
            label: "ค่าลดหย่อนจากสถานภาพ",
            value: calculatedData.status_reduction,
          },
          {
            label: "ค่าลดหย่อนจากกองทุน",
            value: calculatedData.fund_deduction,
          },
          {
            label: "ค่าลดหย่อนจากประกัน",
            value: calculatedData.insurance_deductions,
          },
          { label: "ภาษีหลังการลดหย่อนเพิ่มเติม", value: taxold },
        ].map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center depa-Subtitle-text"
          >
            <span className="text-navy-blue depa-Subtitle-text mb-4">
              {item.label}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-[#FFC600] depa-Subtitle-text">
                {item.value.toLocaleString()}
              </span>
              <span className="text-navy-blue ml-4">บาท</span>
            </span>
          </div>
        ))}
      </div>

      {/* เส้นแบ่ง */}
      <div className="border-t border-gray-light my-6 mb-10"></div>

      {/* ส่วนเงินบริจาค */}
      <div className="text-left mb-20">
        {/* หัวข้อเงินบริจาค */}
        <div className="flex items-center mb-4">
          <div className="flex items-center relative">
            {/* ข้อความ "เงินบริจาค" */}
            <h2 className="depa-Subtitle-text text-navy-blue mr-2">
              เงินบริจาค
            </h2>

            {/* ไอคอน */}
            <div className="group relative">
              <AiOutlineInfoCircle
                className="text-gray cursor-pointer hover:text-gray-700 transition duration-300"
                size={24}
              />
              {/* Tooltip */}
              <div className="absolute top-8 right-0 w-[300px] bg-white text-gray-700 text-sm p-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <p>
                  <strong>เงินบริจาค</strong>{" "}
                  สามารถนำมาคูณสองเพื่อใช้ลดหย่อนภาษีได้ ทั้งนี้
                  การลดหย่อนดังกล่าวต้องไม่เกิน 10% ของรายได้สุทธิ
                  หลังจากการหักค่าใช้จ่ายและค่าลดหย่อนอื่น ๆ ตามที่กฎหมายกำหนด
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ช่องเงินบริจาค */}
        <div className="grid grid-cols-2 gap-6 text-left mb-8">
          {/* ช่องเงินบริจาคเพื่อการศึกษา */}
          <div>
            <label className="block depa-Header-text text-navy-blue mb-4 mt-2">
              เงินบริจาคเพื่อการศึกษา การกีฬา การพัฒนา หรือโรงพยาบาลรัฐ
            </label>
            <input
              type="text"
              value={box1s6.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "");
                if (/^\d*$/.test(rawValue)) {
                  setBox1s6(rawValue);
                }
              }}
              placeholder="ระบุจำนวนเงิน"
              className="w-full h-[50px] p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
            />
            <span className="depa-Small-text text-gray">
              ลดหย่อน 2 เท่าของเงินที่จ่ายจริง แต่ไม่เกิน 10% ของเงินได้สุทธิ
            </span>
          </div>

          {/* ช่องเงินบริจาคทั่วไป */}
          <div>
            <label className="block depa-Header-text text-navy-blue mb-11 mt-2">
              เงินบริจาคทั่วไป
            </label>
            <input
              type="text"
              value={box2s6.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "");
                if (/^\d*$/.test(rawValue)) {
                  setBox2s6(rawValue);
                }
              }}
              placeholder="ระบุจำนวนเงิน"
              className="w-full h-[50px] p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
            />
            <span className="depa-Small-text text-gray ">
              ตามที่จ่ายจริง แต่ไม่เกิน 10% ของเงินได้สุทธิ
            </span>
          </div>
        </div>
      </div>

      {/* ภาษีที่ต้องจ่าย */}
      <div className="text-center my-8">
        <div className="flex justify-between items-center depa-Subtitle-text">
          {/* เนื้อหาอยู่ฝั่งซ้าย */}
          <span className="text-navy-blue">
            ภาษีที่ต้องจ่ายหลังลดหย่อนเงินบริจาค
          </span>

          {/* ตัวเลขและ "บาท" อยู่ฝั่งขวา */}
          <div className="flex items-center gap-2">
            <span className="depa-Title-text text-[#FFC600]">
              {adjustedTax.toLocaleString()}
            </span>
            <span className="depa-Subtitle-text text-navy-blue ml-4">บาท</span>
          </div>
        </div>
      </div>

      {/* ปุ่มย้อนกลับและถัดไป */}

      <div className="flex justify-center gap-4 mt-16">
        <button
          onClick={() => setStep(5)}
          className="bg-gradient-to-r from-[#B5B5B5] to-[#FFFFFF] depa-Header-text text-navy-blue py-2 px-4 rounded-[60px] shadow-md w-[300px] h-[75px]"
        >
          ย้อนกลับ
        </button>
        <button onClick={resetForm} className="bg-gradient-to-r from-[#FFC600] to-[#FFF200] depa-Header-text text-navy-blue py-2 px-4 rounded-[60px] shadow-md w-[300px] h-[75px]">
          เริ่มทำใหม่
        </button>
      </div>

      <p className="depa-Body-text text-gray mt-16 px-4 text-center mb-4">
        **หมายเหตุ:** โปรแกรมคำนวณภาษีนี้เป็นการประมาณเบื้องต้นสำหรับปีภาษี 2567
        ไม่รวมรายการหักลดหย่อนเพิ่มเติมตามประกาศกรมสรรพากร
      </p>
    </div>
  );
};

export default Step6;
