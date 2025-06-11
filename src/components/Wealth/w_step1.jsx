import React from "react";

const Step1 = ({
  salary,
  setSalary,
  bonus,
  setBonus,
  otherIncome,
  setOtherIncome,
  calculateTax,
}) => {
  return (
    <div className="w-full max-w-[490px]">
      <h1 className="depa-Title-text text-navy-blue mb-8 text-center">
        คำนวณภาษีเบื้องต้น
      </h1>
      <h1 className="depa-Subtitle-text text-navy-blue mb-8 text-center">
        รายรับ
      </h1>
      <div className="bg-white rounded-xl p-0 w-full">
        <div className="mb-7">
          <label className="block depa-Header-text text-navy-blue mb-4">
            เงินเดือน (บาท)
          </label>
          <input
            type="text"
            value={salary.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) {
                setSalary(rawValue);
              }
            }}
            placeholder="เงินเดือนของคุณต่อเดือน"
            className="w-full depa-Small-text h-[60px] p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="mb-7">
          <label className="block depa-Header-text text-navy-blue mb-4">
            โบนัส (บาท)
          </label>
          <input
            type="text"
            value={bonus.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) {
                setBonus(rawValue);
              }
            }}
            placeholder="รวมโบนัสที่คุณได้รับในปีนี้"
            className="w-full depa-Small-text p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="mb-11">
          <label className="block depa-Header-text text-navy-blue mb-4">
            รายได้อื่น ๆ เช่น การขายของออนไลน์, รับจ้างฟรีแลนซ์ (บาท)
          </label>
          <input
            type="text"
            value={otherIncome.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) {
                setOtherIncome(rawValue);
              }
            }}
            placeholder="ระบุรายได้พิเศษ"
            className="w-full depa-Small-text p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="text-center">
          <button
            onClick={calculateTax}
            className="depa-Header-text bg-gradient-to-l from-[#FFF200] to-[#FFD304] text-navy-blue font-semibold py-2 px-4 w-[200px] h-[50px] rounded-[30px] shadow-lg transition duration-300 hover:scale-105 hover:shadow-lg hover:from-[#FFD700] hover:to-[#FFEA00] sm:py-3 sm:px-6 sm:w-[300px] sm:h-[75px] sm:rounded-[60px] sm:shadow-xl"
          >
            คำนวณภาษี
          </button>
        </div>
      </div>
      <p className="depa-Body-text text-gray mt-16 px-4 text-center">
        **หมายเหตุ:** โปรแกรมคำนวณภาษีนี้เป็นการประมาณเบื้องต้นสำหรับปีภาษี 2567
        ไม่รวมรายการหักลดหย่อนเพิ่มเติมตามประกาศกรมสรรพากร
      </p>
    </div>
  );
};

export default Step1;
