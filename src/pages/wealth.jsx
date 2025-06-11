import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Step1 from "../components/Wealth/w_step1";
import Step2 from "../components/Wealth/w_step2";
import Step3 from "../components/Wealth/w_step3";
import Step4 from "../components/Wealth/w_step4";
import Step5 from "../components/Wealth/w_step5";
import Step6 from "../components/Wealth/w_step6";

const Wealth = () => {
  const [step, setStep] = useState(1);
  const [salary, setSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [calculatedData, setCalculatedData] = useState({});

  // step 3
  const [status, setStatus] = useState(""); // เก็บสถานภาพที่เลือก
  const [personalParents, setPersonalParents] = useState({
    father: false,
    mother: false,
  });
  const [personalParents2, setPersonalParents2] = useState({
    father: false,
    mother: false,
  });
  const [disabledDependents, setDisabledDependents] = useState({
    father: false,
    mother: false,
    child: false,
    relatives: false,
  });
  const [disabledDependents2, setDisabledDependents2] = useState({
    spouse: false,
    father: false,
    mother: false,
  });
  const [children, setChildren] = useState("ไม่มี");
  const [box1s3, setBox1s3] = useState("");
  const [box2s3, setBox2s3] = useState("");
  const [box3s3, setBox3s3] = useState("");
  // step 3
  
  // step 4
  const [box1, setBox1] = useState("");
  const [box2, setBox2] = useState("");
  const [box3, setBox3] = useState("");
  const [box4, setBox4] = useState("");
  const [box5, setBox5] = useState("");
  const [box6, setBox6] = useState("");
  // step 4
  // step 5
  const [box1s5, setBox1s5] = useState("");
  const [box2s5, setBox2s5] = useState("");
  const [box3s5, setBox3s5] = useState("");
  const [box4s5, setBox4s5] = useState("");
  // step 5
  // step 6
  const [box1s6, setBox1s6] = useState("");
  const [box2s6, setBox2s6] = useState("");
  const [income, setIncome] = useState("");
  const [adjustedTax, setAdjustedTax] = useState(0);
  // step 6
  const calculateTax = () => {
    const salaryPerYear = Number(salary) * 12;
    const totalIncome = salaryPerYear + Number(bonus) + Number(otherIncome);
    const basicDeduction = Math.min(totalIncome * 0.5, 100000) + 60000;

    let netIncomeAfterDeduction = totalIncome - basicDeduction;

    if (netIncomeAfterDeduction < 0) {
      netIncomeAfterDeduction = 0;
    }

    const tax = calculateProgressiveTax(netIncomeAfterDeduction);
    const all_deductions = basicDeduction;
    let status_reduction = 0;
    let fund_deduction = 0;
    let insurance_deductions = 0;
    let condition = 0;

    setCalculatedData({
      totalIncome,
      basicDeduction,
      netIncomeAfterDeduction,
      tax,
      all_deductions,
      status_reduction,
      fund_deduction,
      insurance_deductions,
      condition,
    });

    setStep(2);
  };

  const calculateProgressiveTax = (income) => {
    let tax = 0;
    if (income > 5000000) {
      tax += (income - 5000000) * 0.35;
      income = 5000000;
    }
    if (income > 2000000) {
      tax += (income - 2000000) * 0.3;
      income = 2000000;
    }
    if (income > 1000000) {
      tax += (income - 1000000) * 0.25;
      income = 1000000;
    }
    if (income > 750000) {
      tax += (income - 750000) * 0.2;
      income = 750000;
    }
    if (income > 500000) {
      tax += (income - 500000) * 0.15;
      income = 500000;
    }
    if (income > 300000) {
      tax += (income - 300000) * 0.1;
      income = 300000;
    }
    if (income > 150000) {
      tax += (income - 150000) * 0.05;
    }
    return tax;
  };

  const resetForm = () => {
    setStep(1);
    setSalary("");
    setBonus("");
    setOtherIncome("");
    setCalculatedData({});
    setStatus("");
    setPersonalParents({ father: false, mother: false });
    setPersonalParents2({ father: false, mother: false });
    setDisabledDependents({ father: false, mother: false, relatives: false });
    setDisabledDependents2({ spouse: false, father: false, mother: false });
    setChildren("ไม่มี");
    setBox1("");
    setBox2("");
    setBox3("");
    setBox4("");
    setBox5("");
    setBox6("");
    setBox1s5("");
    setBox2s5("");
    setBox3s5("");
    setBox4s5("");
    setBox1s6("");
    setBox2s6("");
    setIncome("");
    setAdjustedTax(0);
    setBox1s3("");
    setBox2s3("");
    setBox3s3("");
  };

  return (
    <div className="relative flex flex-col items-center pt-[50px] min-h-screen bg-white rounded-[20px] overflow-hidden">
      <div className="absolute top-20 left-[-150px] w-[300px] h-[300px] bg-gradient-to-b from-[#FFF200] to-[#FFD304] rounded-full clip-half-right hidden xl:block"></div>
<div className="absolute top-[300px] right-[-250px] w-[500px] h-[500px] bg-gradient-to-b from-[#FFF200] to-[#FFD304] rounded-full clip-half-left hidden xl:block"></div>

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
              salary={salary}
              setSalary={setSalary}
              bonus={bonus}
              setBonus={setBonus}
              otherIncome={otherIncome}
              setOtherIncome={setOtherIncome}
              calculateTax={calculateTax}
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
              calculatedData={calculatedData}
              setStep={setStep}
              resetForm={resetForm}
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
              calculatedData={calculatedData}
              setCalculatedData={setCalculatedData}
              status={status}
              setStatus={setStatus}
              personalParents={personalParents}
              setPersonalParents={setPersonalParents}
              personalParents2={personalParents2}
              setPersonalParents2={setPersonalParents2}
              disabledDependents={disabledDependents}
              setDisabledDependents={setDisabledDependents}
              disabledDependents2={disabledDependents2}
              setDisabledDependents2={setDisabledDependents2}
              children={children}
              setChildren={setChildren}
              box1s3={box1s3}
              setBox1s3={setBox1s3}
              box2s3={box2s3}
              setBox2s3={setBox2s3}
              box3s3={box3s3}
              setBox3s3={setBox3s3}
            />
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Step4 
              setStep={setStep} 
              calculatedData={calculatedData}
              setCalculatedData={setCalculatedData}
              salary={salary}
              box1={box1}
              setBox1={setBox1}
              box2={box2}
              setBox2={setBox2}
              box3={box3}
              setBox3={setBox3}
              box4={box4}
              setBox4={setBox4}
              box5={box5}
              setBox5={setBox5}
              box6={box6}
              setBox6={setBox6}
            />
          </motion.div>
        )}
        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Step5 
              setStep={setStep} 
              calculatedData={calculatedData}
              setCalculatedData={setCalculatedData}
              box1s5={box1s5}
              setBox1s5={setBox1s5}
              box2s5={box2s5}
              setBox2s5={setBox2s5}
              box3s5={box3s5}
              setBox3s5={setBox3s5}
              box4s5={box4s5}
              setBox4s5={setBox4s5}
            />
          </motion.div>
        )}
        {step === 6 && (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Step6 
              setStep={setStep} 
              calculatedData={calculatedData}
              setCalculatedData={setCalculatedData}
              calculateProgressiveTax={calculateProgressiveTax}
              box1s6={box1s6}
              setBox1s6={setBox1s6}
              box2s6={box2s6}
              setBox2s6={setBox2s6}
              income={income}
              setIncome={setIncome}
              adjustedTax={adjustedTax}
              setAdjustedTax={setAdjustedTax}
              resetForm={resetForm}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wealth;
