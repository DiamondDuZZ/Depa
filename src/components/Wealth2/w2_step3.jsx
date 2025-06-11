import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";

const Step3 = ({
  setStep,
  moneyafterRe,
  moneyuseRe,
  moneysave,
  fund,
  aydca,
  ayfund,
  age,
  retire,
  setAydca,
  setAyfund,
}) => {
  const aydcaValues = Object.values(aydca);
  const ayfundValues = Object.values(ayfund);

  const totalBars = 11; // จำนวนกราฟสูงสุดที่ต้องการแสดง
  const totalYears = Number(retire) - Number(age);

  // คำนวณ step และสร้างปีที่จะใช้
  const step =
    totalYears >= totalBars ? Math.floor(totalYears / (totalBars - 1)) : 1;
  let years = Array.from(
    { length: totalBars },
    (_, i) => Number(age) + i * step
  ).filter((year) => year <= retire);

  // เพิ่มปีสุดท้ายเป็น retire ถ้ายังไม่มี
  if (years[years.length - 1] !== Number(retire)) {
    years.push(Number(retire));
  }

  // หาค่าสูงสุดจากข้อมูลเพื่อปรับ Y-Axis
  const maxValue = Math.max(...aydcaValues, ...ayfundValues);

  return (
    <div className="flex flex-col items-center px-4 sm:px-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 w-full">
        <Card
          title="เงินออมสะสมก่อนเกษียณฯ"
          value={formatValue(moneysave)}
          img="../src/assets/images/careerpath/cp1.png"
        />
        <Card
          title="กองทุนเงินออมขององค์กร"
          value={formatValue(fund)}
          img="../src/assets/images/careerpath/cp2.png"
        />
        <Card
          title="เงินที่ต้องใช้หลังเกษียณ"
          value={formatValue(moneyafterRe)}
          img="../src/assets/images/careerpath/cp3.png"
        />
        <Card
          title="เงินชดเชยหลังเกษียณฯ"
          value={formatValue(moneyuseRe)}
          img="../src/assets/images/careerpath/cp4.png"
        />
      </div>

      {/* Chart Section */}
      <div className="w-full p-4 sm:p-6 bg-white rounded-[20px] shadow-xl relative">
        <h3 className="text-base sm:text-lg font-semibold mb-4 text-navy-blue text-center sm:text-left">
          เงินออมสะสมก่อนเกษียณ (ปี)
        </h3>

        {/* Legend */}
        <div className="absolute top-2 right-4 flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex items-center mr-0 sm:mr-4 mb-2 sm:mb-0">
            <div className="w-4 h-4 bg-gradient-to-t from-[#0C2F53] to-[#0095FF] rounded-sm mr-2"></div>
            <span className="text-sm text-navy-blue font-bold">
              เงินออมสะสม DCA
            </span>

            <div className="relative flex items-center group">
              {/* Info Icon */}
              <FaInfoCircle
                className="cursor-pointer text-navy-blue transition-transform duration-300 group-hover:scale-110 hover:text-gray-700 ml-2"
                size={20}
              />
              {/* Tooltip */}
              <div className="absolute top-[-110px] left-1/2 transform -translate-x-1/2 bg-white text-navy-blue text-xs font-semibold p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 w-[260px] z-10 pointer-events-none">
                <div className="text-sm text-navy-blue font-bold mb-1">
                  DCA (Dollar Cost Averaging)
                </div>
                <div className="text-xs text-navy-blue leading-tight font-light">
                  กลยุทธ์การลงทุนแบบทยอยซื้อสินทรัพย์เป็นงวดๆ ด้วยจำนวนเงินเท่าๆ
                  กัน เพื่อลดความเสี่ยงจากความผันผวนของราคา
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-t from-[#FFC600] to-[#FFF200] rounded-sm mr-2"></div>
            <span className="text-sm text-navy-blue font-bold">
              เงินออมสะสมทั่วไป
            </span>
          </div>
        </div>

        {/* Y-Axis */}
        <div className="absolute left-4 sm:right-2 text-gray-light top-20 bottom-10 flex flex-col justify-between text-gray-400 text-xs sm:text-sm">
          {[...Array(5)].map((_, i) => {
            const value = Math.ceil((maxValue / 4) * (4 - i));
            return (
              <div className="flex items-center" key={i}>
                <span className="w-10 sm:w-16 text-right">
                  {formatValue(value)}
                </span>
                <div className="flex-1 border-t border-dashed border-gray-300 ml-2"></div>
              </div>
            );
          })}
        </div>

        {/* Bar Chart */}
        <div className="flex gap-2 sm:gap-4 justify-between w-full ml-2 sm:ml-10">
          {years.map((year, index) => (
            <BarChart
              key={index}
              year={year}
              aydca={aydca[year - age] || 0}
              ayfund={ayfund[year - age] || 0}
              maxValue={maxValue}
            />
          ))}
        </div>
      </div>

      {/* Back Button */}
      <motion.button
        onClick={() => {
          setAyfund([]);
          setAydca([]);
          setStep(2);
        }}
        className="mt-8 px-20 py-2 text-white font-bold rounded-[30px] bg-gradient-to-r from-[#0095FF] to-[#0662A9] shadow-lg hover:shadow-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ย้อนกลับ
      </motion.button>
    </div>
  );
};

/** BarChart Component */
const BarChart = ({ year, aydca, ayfund, maxValue }) => {
  const [selected, setSelected] = useState(false);
  const dcaHeight = (aydca / maxValue) * 100;
  const fundHeight = (ayfund / maxValue) * 100;

  return (
    <div className="flex flex-col items-center w-full relative cursor-pointer">
      <div className="relative w-10 sm:w-14 h-[200px] sm:h-[300px] flex items-end rounded-t-[20px] overflow-hidden">
        {/* DCA Bar */}
        <div
          style={{ height: `${dcaHeight}%` }}
          onClick={() => setSelected(!selected)}
          className={`w-full shadow-xl bg-gradient-to-t from-[#0C2F53] to-[#0095FF] rounded-t-[20px] ${
            selected ? "opacity-80" : ""
          }`}
        ></div>
        {/* Fund Bar */}
        <div
          style={{ height: `${fundHeight}%` }}
          onClick={() => setSelected(!selected)}
          className={`absolute shadow-xl bottom-0 left-0 w-full bg-gradient-to-t from-[#FFC600] to-[#FFF200] rounded-t-[20px] ${
            selected ? "opacity-80" : ""
          }`}
        ></div>

        {/* Tooltip */}
        {selected && (
          <div className="absolute top-[0px] left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-xl shadow-md text-xs z-10 text-center">
            <div className="text-[#0095FF] font-bold">
              DCA: {formatValue(aydca)}
            </div>
            <div className="text-[#FFC600] font-bold">
              เงินออม: {formatValue(ayfund)}
            </div>
          </div>
        )}
      </div>
      <span className="mt-2 text-xs sm:text-sm text-gray-500">{year}</span>
    </div>
  );
};

/** Card Component */
const Card = ({ title, value, img }) => {
  return (
    <div className="relative flex items-center bg-white p-4 sm:mt-[-40px] rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-[#F9FAFB] rounded-full shadow-md mr-4">
        <img src={img} alt={title} className="w-10 sm:w-14 h-10 sm:h-12" />
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <h4 className="text-lg sm:text-2xl font-bold text-[#FFC600] mb-2">
          {value} THB
        </h4>
        <p className="text-xs sm:text-sm text-navy-blue font-medium">{title}</p>
      </div>

      {/* Tooltip - Show on hover */}
      {title === "กองทุนเงินออมขององค์กร" && (
        <div className="absolute top-[120%] left-1/2 transform -translate-x-1/2 mb-2 w-[280px] p-3 bg-white shadow-lg rounded-lg text-[#0C2F53] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="font-bold mb-1">{title}</div>
          <div>{value} บาท</div>
          <div>เงินที่หักจากโบนัสของพนักงาน</div>
        </div>
      )}
    </div>
  );
};

/** Format Value Function */
const formatValue = (value) => {
  return value
    ? Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 })
    : "0";
};

export default Step3;
