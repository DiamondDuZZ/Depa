import React from "react";

const Step2 = ({
  setStep,
  saraly,
  setSaraly,
  amount,
  setAmount,
  rate,
  setRate,
  before,
  setBefore,
  fund,
  setFund,
  returns,
  setReturns,
  calculateMoneysave,
  calculateMoneyafterRe,
  calculateMoneyuseRe,
}) => {
  return (
    <div className="w-full max-w-[800px] text-center mx-auto px-4 sm:px-8">
      {/* กล่องข้อมูลแถวแรก */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        {/* เบี้ยประกันชีวิต */}
        <div className="bg-white rounded-xl p-6 pb-4">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            เงินเดือนปัจจุบัน
          </label>
          <input
            type="text"
            value={saraly.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) {
                setSaraly(rawValue);
              }
            }}
            placeholder="กรอกเงินเดือนปัจจุบันของคุณ (บาท)"
            className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
        </div>

        {/* เบี้ยประกันสุขภาพ */}
        <div className="bg-white rounded-xl p-6">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            จำนวนเงินที่ต้องการใช้ต่อเดือน
          </label>
          <input
            type="text"
            value={amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) {
                setAmount(rawValue);
              }
            }}
            placeholder="กรอกจำนวนเงินที่คุณต้องการใช้ต่อเดือน (บาท)"
            className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
        </div>
      </div>

      {/* กล่องข้อมูลแถวสอง */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        {/* เบี้ยประกันสุขภาพพิการ */}
        <div className="bg-white rounded-xl p-6">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            อัตราเงินสะสม (%)
          </label>
          <input
            type="text"
            value={rate.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) {
                setRate(rawValue);
              }
            }}
            placeholder="กรอกอัตราเงินสะสม เช่น 5"
            className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
        </div>

        {/* เบี้ยประกันชีวิตบำนาญ */}
        <div className="bg-white rounded-xl p-6">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            คุณเข้าทำงานก่อน วันที่ 1 ตุลาคม 2564
          </label>
          <div className="flex flex-col sm:flex-row gap-4 mb-4 ml-2 depa-Body-text mt-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="before"
                checked={before === true}
                onChange={() => setBefore(true)}
              />{" "}
              ใช่
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="before"
                checked={before === false}
                onChange={() => setBefore(false)}
              />{" "}
              ไม่ใช่
            </label>
          </div>
        </div>
      </div>

      {/* กล่องข้อมูลแถวสาม */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        {/* เบี้ยประกันสุขภาพพิการ */}
        <div className="bg-white rounded-xl p-6">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            กองทุนเงินออมขององค์กร
          </label>
          <input
            type="text"
            value={fund.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) {
                setFund(rawValue);
              }
            }}
            placeholder="กรอกเงินออมขององค์กร"
            className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
        </div>

        {/* เบี้ยประกันชีวิตบำนาญ */}
        <div className="bg-white rounded-xl p-6">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            สมมติฐานผลตอบแทนการลงทุน (%)
          </label>
          <input
            type="text"
            value={returns.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) {
                setReturns(rawValue);
              }
            }}
            placeholder="กรอกผลตอบแทนการลงทุนต่อปี เช่น 10"
            className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
        </div>
      </div>

      {/* ปุ่มย้อนกลับและถัดไป */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16 mb-8">
        <button
          onClick={() => setStep(1)}
          className="bg-gradient-to-r from-[#B5B5B5] to-[#FFFFFF] depa-Header-text text-navy-blue py-2 px-4 rounded-[60px] shadow-md w-full sm:w-[300px] h-[50px] sm:h-[75px]"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={() => {
            calculateMoneysave();
            calculateMoneyafterRe();
            calculateMoneyuseRe();
            setStep(3);
          }}
          className="bg-gradient-to-r from-[#FFC600] to-[#FFF200] depa-Header-text text-navy-blue py-2 px-4 rounded-[60px] shadow-md w-full sm:w-[300px] h-[50px] sm:h-[75px]"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

export default Step2;
