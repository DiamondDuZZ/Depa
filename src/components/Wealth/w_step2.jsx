import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Step2 = ({ calculatedData, setStep, resetForm }) => {
  return (
    <div className="w-full max-w-[800px]">
      <h1 className="depa-Title-text text-navy-blue mb-16 text-center">
        ผลการคำนวณภาษี
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white shadow-xl rounded-xl p-4 text-center w-full lg:w-[380px] h-auto sm:h-[180px]">
          <h2 className="depa-Big-text text-yellow-dark">
            {calculatedData.totalIncome.toLocaleString()}
          </h2>
          <p className="text-navy-blue depa-Header-text mt-2">
            รายได้สุทธิ (บาท)
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-4 text-center w-full lg:w-[380px] h-auto sm:h-[180px]">
          <h2 className="depa-Big-text text-yellow-dark">
            {calculatedData.netIncomeAfterDeduction.toLocaleString()}
          </h2>
          <p className="text-navy-blue depa-Header-text mt-2">
            รายได้สุทธิหลังหักค่าใช้จ่าย
          </p>
          <p className="text-navy-blue depa-Header-text">
            และค่าลดหย่อนเบื้องต้น (บาท)
          </p>
        </div>

        <div className="relative bg-white shadow-xl rounded-xl p-4 text-center w-full lg:w-[380px] h-auto sm:h-[180px]">
          <h2 className="depa-Big-text text-yellow-dark">
            {calculatedData.basicDeduction.toLocaleString()}
          </h2>
          <p className="text-navy-blue depa-Header-text mt-2">
            รายได้สุทธิหลังหักลดหย่อน (บาท)
          </p>
          <div className="absolute top-2 right-2 group">
            <AiOutlineInfoCircle
              className="text-gray cursor-pointer hover:text-gray-700 transition duration-300"
              size={24}
            />
            <div className="absolute top-8 right-0 w-[260px] sm:w-[300px] bg-white text-gray-700 text-sm p-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <p>
                <strong>ลดหย่อนเบื้องต้น</strong> คิดจาก 50%
                จากรายได้ต่อปีแต่ไม่เกิน 100,000 บาท ตามมาตรา 40(1) และมาตรา
                40(2) รวมกับค่าลดหย่อนส่วนบุคคล 60,000 บาท
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-4 text-center w-full lg:w-[380px] h-auto sm:h-[180px]">
          <h2 className="depa-Big-text text-yellow-dark">
            {calculatedData.tax.toLocaleString()}
          </h2>
          <p className="text-navy-blue depa-Header-text mt-2">
            ภาษีที่ต้องจ่าย (บาท)
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 mb-16">
        <button
          onClick={() => setStep(1)}
          className="bg-gradient-to-r from-[#B5B5B5] to-[#FFFFFF] depa-Header-text text-navy-blue py-2 px-4 rounded-[60px] shadow-md w-full sm:w-[300px] h-[50px] sm:h-[75px]"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={() => setStep(3)}
          className="bg-gradient-to-r from-[#FFC600] to-[#FFF200] depa-Header-text text-navy-blue py-2 px-4 rounded-[60px] shadow-md w-full sm:w-[300px] h-[50px] sm:h-[75px]"
        >
          เพิ่มการลดหย่อน
        </button>
      </div>

      <p className="depa-Body-text text-gray mt-16 px-4 text-center">
        **หมายเหตุ:** โปรแกรมคำนวณภาษีนี้เป็นการประมาณเบื้องต้นสำหรับปีภาษี 2567
        ไม่รวมรายการหักลดหย่อนเพิ่มเติมตามประกาศกรมสรรพากร
      </p>
    </div>
  );
};

export default Step2;
