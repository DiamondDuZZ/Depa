import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Step1 from "../components/Wealth2/w2_step1";
import Step2 from "../components/Wealth2/w2_step2";
import Step3 from "../components/Wealth2/w2_step3";
import { s } from "framer-motion/client";

const Wealth2 = () => {
  const [step, setStep] = useState(1);

  // State สำหรับ Step 1
  const [age, setAge] = useState("");
  const [retire, setRetire] = useState("");
  const [working, setWorking] = useState("");
  const [require, setRequire] = useState("");

  // State สำหรับ Step 2
  const [saraly, setSaraly] = useState("");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [before, setBefore] = useState(false);
  const [fund, setFund] = useState("");
  const [returns, setReturns] = useState("");

  // State สำหรับ Step 3
  const [moneyafterRe, setMoneyafterRe] = useState("");
  const [moneyuseRe, setMoneyuseRe] = useState("");
  const [moneysave, setMoneysave] = useState("");
  const [aydca, setAydca] = useState([]);
  const [ayfund, setAyfund] = useState([]);

  // คำนวณค่า moneyafterRe และ moneyuseRe
  const calculateMoneyafterRe = () => {
    if (require && amount) {
      setMoneyafterRe(require * amount);
    }
  };
  const calculateMoneyuseRe = () => {
    if (saraly && retire && age) {
      const power = Math.pow(1 + 0.06, retire - age); // (1 + 6%) ^ (retire - age)
      const lastsaraly = saraly * power;
      const yearsWorked = working + (retire - age); // อายุทำงาน ณ ปัจจุบัน
      let compensationDays = 0;

      // เงื่อนไขจำนวนวันชดเชย
      if (yearsWorked >= 20) {
        compensationDays = 400;
      } else if (yearsWorked >= 10) {
        compensationDays = 300;
      } else if (yearsWorked >= 6) {
        compensationDays = 240;
      } else if (yearsWorked >= 3) {
        compensationDays = 180;
      } else if (yearsWorked >= 1) {
        compensationDays = 90;
      } else if (yearsWorked >= 0.33) {
        // 120 วัน = ประมาณ 0.33 ปี
        compensationDays = 30;
      }

      // แปลงจำนวนวันเป็นเดือน
      const compensationMonths = compensationDays / 30;

      // อัปเดต State
      setMoneyuseRe(lastsaraly * compensationMonths);
    }
  };

  const calculateMoneysave = () => {
    const parsedWorking = Number(working);
    const parsedRetire = Number(retire);
    const parsedAge = Number(age);

    const updatedAyfund = [...ayfund]; // ทำการ clone array
    const updatedAydca = [...aydca]; // ทำการ clone array

    let yearsWorked = parsedRetire - parsedAge + parsedWorking;
    let totalMoneysave = 0; // ตัวแปรสะสมเงินออมสะสมรวม
    let calsaraly = saraly;
    let interest = 0;

    // ลูปคำนวณตั้งแต่ 1 ถึง yearsWorked
    for (let year = parsedWorking; year <= yearsWorked; year++) {
      let contributionRate = 8; // เริ่มต้นที่ 8%

      switch (before) {
        case true:
          switch (true) {
            case year < 1:
              contributionRate = 8;
              break;

            case year >= 1 && year < 3:
              if (rate >= 2) {
                contributionRate = 9;
              } else if (rate < 2) {
                contributionRate = 0;
              }
              break;
            case year >= 3 && year < 5:
              if (rate >= 2) {
                contributionRate = 10;
              } else if (rate < 2) {
                contributionRate = 0;
              }
              break;

            case year >= 5 && year < 8:
              if (rate >= 2 && rate <= 10) {
                contributionRate = 10;
              } else if (rate >= 11) {
                contributionRate = 11;
              } else if (rate < 2) {
                contributionRate = 0;
              }
              break;
            case year >= 8 && year < 10:
              if (rate >= 2 && rate <= 10) {
                contributionRate = 10;
              } else if (rate == 11) {
                contributionRate = 11;
              } else if (rate >= 12) {
                contributionRate = 12;
              } else if (rate < 2) {
                contributionRate = 0;
              }
              break;
            case year >= 10:
              if (rate >= 2 && rate <= 10) {
                contributionRate = 10;
              } else if (rate == 11) {
                contributionRate = 11;
              } else if (rate == 12) {
                contributionRate = 12;
              } else if (rate >= 13) {
                contributionRate = 13;
              } else if (rate < 2) {
                contributionRate = 0;
              }
              break;
            default:
              contributionRate = 8;
          }
          break;
        case false:
          switch (true) {
            case year < 3:
              if (rate >= 2) {
                contributionRate = 8;
              } else if (rate < 2) {
                contributionRate = 0;
              }
              break;

            case year >= 3 && year < 5:
              if (rate >= 2) {
                contributionRate = 9;
              } else if (rate < 2) {
                contributionRate = 0;
              }
              break;

            case year >= 5 && year < 8:
              if (rate >= 2) {
                contributionRate = 10;
              } else if (rate < 2) {
                contributionRate = 0;
              }
              break;

            case year >= 8 && year < 10:
              if (rate >= 2 && rate <= 10) {
                contributionRate = 10;
              } else if (rate >= 11) {
                contributionRate = 11;
              } else if (rate < 2) {
                contributionRate = 0;
              }
              break;

            case year >= 10 && year < 14:
              if (rate >= 2 && rate <= 10) {
                contributionRate = 10;
              } else if (rate == 11) {
                contributionRate = 11;
              } else if (rate >= 12) {
                contributionRate = 12;
              } else if (rate < 2) {
                contributionRate = 0;
              }
              break;

            case year >= 14:
              if (rate >= 2 && rate <= 10) {
                contributionRate = 10;
              } else if (rate == 11) {
                contributionRate = 11;
              } else if (rate == 12) {
                contributionRate = 12;
              } else if (rate >= 13) {
                contributionRate = 13;
              } else if (rate < 2) {
                contributionRate = 0;
              }
              break;

            default:
              contributionRate = 8;
          }
          break;
        default:
          contributionRate = 8; // ค่าดีฟอลต์ในกรณีไม่มีค่า before
      }
      const yearlyMoneysave =
        calsaraly * 12 * (contributionRate / 100 + rate / 100);
      updatedAyfund.push(calsaraly * 12 * (rate / 100)); // เก็บค่ากองทุน
      updatedAydca.push(yearlyMoneysave + interest); // เก็บค่า DCA
      totalMoneysave += yearlyMoneysave + interest;
      calsaraly = calsaraly * (1 + 0.06); //อัตราขึ้นเงินเดือน
      interest = totalMoneysave * (returns / 100); // สมมุติฐานผลตอบแทนการลงทุน
      console.log("หลังคำนวณปีที่" + year);
      console.log(contributionRate);
      console.log(rate);
      console.log(calsaraly);
      console.log(totalMoneysave);
      console.log(calsaraly);
      console.log(interest);
    }
    setAyfund(updatedAyfund);
    setAydca(updatedAydca);
    console.log(aydca);
    console.log(ayfund);
    // อัปเดต State โดยจัดรูปแบบค่าเงิน
    setMoneysave(totalMoneysave);
  };
  return (
    <div className="relative flex flex-col items-center pt-[50px] min-h-screen bg-white rounded-[20px] overflow-hidden">
      {step !== 3 && (
        <>
          <div className="absolute top-20 left-[-150px] w-[300px] h-[300px] bg-gradient-to-b from-[#FFF200] to-[#FFD304] rounded-full clip-half-right hidden xl:block"></div>
          <div className="absolute top-[300px] right-[-250px] w-[500px] h-[500px] bg-gradient-to-b from-[#FFF200] to-[#FFD304] rounded-full clip-half-left hidden xl:block"></div>
        </>
      )}

      <div className="text-center depa-Title-text text-navy-blue mb-12 sm:mb-16">
        วางแผนการเกษียณ
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-4 mb-8 w-full max-w-[700px] justify-between">
        {step !== 3 && (
          <>
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <motion.div
                onClick={() => setStep(1)}
                className={`w-10 h-10 sm:w-16 sm:h-16  rounded-full flex items-center justify-center cursor-pointer ${
                  step >= 1
                    ? "bg-gradient-to-r from-[#0095FF] to-[#0C2F53] text-white shadow-lg"
                    : "bg-gray-300 text-gray-500"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center depa-Subtitle-text">1</div>
              </motion.div>
              <div
                className={`depa-Button-text mt-2 text-center text-xs sm:text-sm ${
                  step >= 1 ? "depa-Button-text" : "text-gray-500"
                }`}
              >
                เลือกอายุของคุณ
              </div>
            </div>

            {/* Line Between Steps */}
            <div
              className={`relative -mt-10 w-full h-[3px] ${
                step >= 2
                  ? "bg-gradient-to-r from-[#0095FF] to-[#0C2F53]"
                  : "bg-[#E5E5E5]"
              } transition-all duration-300`}
            ></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <motion.div
                onClick={() => setStep(2)}
                className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer ${
                  step === 2
                    ? "bg-gradient-to-r from-[#0095FF] to-[#0C2F53] text-white shadow-lg"
                    : "bg-[#E5E5E5] text-gray-500"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center depa-Subtitle-text">2</div>
              </motion.div>
              <div
                className={`depa-Button-text mt-2 text-center text-xs sm:text-sm ${
                  step === 2 ? "depa-Button-text" : "text-gray-500"
                }`}
              >
                เงินออมเพื่อการเกษียณฯ
              </div>
            </div>
          </>
        )}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Step1
              setStep={setStep}
              age={age}
              setAge={setAge}
              retire={retire}
              setRetire={setRetire}
              working={working}
              setWorking={setWorking}
              require={require}
              setRequire={setRequire}
            />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Step2
              setStep={setStep}
              saraly={saraly}
              setSaraly={setSaraly}
              amount={amount}
              setAmount={setAmount}
              rate={rate}
              setRate={setRate}
              before={before}
              setBefore={setBefore}
              fund={fund}
              setFund={setFund}
              returns={returns}
              setReturns={setReturns}
              calculateMoneysave={calculateMoneysave}
              calculateMoneyafterRe={calculateMoneyafterRe}
              calculateMoneyuseRe={calculateMoneyuseRe}
            />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Step3
              setStep={setStep}
              moneyafterRe={moneyafterRe}
              moneyuseRe={moneyuseRe}
              moneysave={moneysave}
              fund={fund}
              aydca={aydca}
              ayfund={ayfund}
              age={age}
              retire={retire}
              setAydca={setAydca}
              setAyfund={setAyfund}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wealth2;
