import React from "react";

const Step1 = ({
  setStep,
  age,
  setAge,
  retire,
  setRetire,
  working,
  setWorking,
  require,
  setRequire,
}) => {
  return (
    <div className="w-full max-w-[800px] text-center mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        {/* อายุ */}
        <div className="bg-white rounded-xl p-6 pb-4">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            อายุ (ปี)
          </label>
          <input
            type="text"
            value={age.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) {
                setAge(rawValue);
              }
            }}
            placeholder="ระบุอายุปัจจุบันของคุณ"
            className="w-full p-3 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
        </div>

        {/* อายุเกษียณ */}
        <div className="bg-white rounded-xl p-6">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            อายุเกษียณฯ (ปี)
          </label>
          <input
            type="text"
            value={retire.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) {
                setRetire(rawValue);
              }
            }}
            placeholder="กรอกอายุที่ต้องการเกษียณ เช่น 60 ปี"
            className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
        </div>
      </div>

      {/* กล่องข้อมูลแถวสอง */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        {/* อายุการทำงาน */}
        <div className="bg-white rounded-xl p-6">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            อายุการทำงานปัจจุบัน (ปี)
          </label>
          <input
            type="text"
            value={working.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) {
                setWorking(rawValue);
              }
            }}
            placeholder="ระบุอายุการทำงานปัจจุบันของคุณ"
            className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
        </div>

        {/* ใช้เงินหลังเกษียณ */}
        <div className="bg-white rounded-xl p-6">
          <label className="block text-lg text-navy-blue mb-4 text-left depa-Header-text">
            อายุขัยที่คาดหวังที่จะใช้เงินหลังเกษียณ (ปี)
          </label>
          <input
            type="text"
            value={require.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) {
                setRequire(rawValue);
              }
            }}
            placeholder="กรอกจำนวนปี เช่น 20 ปี"
            className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
        </div>
      </div>

      {/* ปุ่มย้อนกลับและถัดไป */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16 mb">
        <button
          onClick={() => setStep(2)}
          className="bg-gradient-to-r from-[#FFC600] to-[#FFF200] depa-Header-text text-navy-blue py-2 px-4 rounded-[60px] shadow-md w-full sm:w-[300px] h-[50px] sm:h-[75px]"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

export default Step1;
