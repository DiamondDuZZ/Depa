import React, { useState } from "react";

const Step3 = ({
  setStep,
  calculatedData,
  setCalculatedData,
  status,
  setStatus,
  personalParents,
  setPersonalParents,
  personalParents2,
  setPersonalParents2,
  disabledDependents,
  setDisabledDependents,
  disabledDependents2,
  setDisabledDependents2,
  children,
  setChildren,
  box1s3,
  setBox1s3,
  box2s3,
  setBox2s3,
  box3s3,
  setBox3s3,
}) => {
  const handleStatusChange = (e) => {
    setStatus(e.target.value);

    setPersonalParents({ father: false, mother: false });
    setPersonalParents2({ father: false, mother: false });
    setDisabledDependents({ father: false, mother: false, relatives: false });
    setDisabledDependents2({ spouse: false, father: false, mother: false });
    setChildren("ไม่มี");
    setBox1s3("");
    setBox2s3("");
    setBox3s3("");
  };

  const calculateReductions = () => {
    let reduction = 0;

    // ลดหย่อนบิดา-มารดา (ตนเอง) ส่วนบน
    if (personalParents.father) reduction += 30000;
    if (personalParents.mother) reduction += 30000;

    if (personalParents2.father) reduction += 30000;
    if (personalParents2.mother) reduction += 30000;

    // ลดหย่อนผู้พิการหรือทุพพลภาพ (ไม่มีเงินได้) ส่วนล่าง
    if (disabledDependents.father) reduction += 60000;
    if (disabledDependents.mother) reduction += 60000;
    if (disabledDependents.relatives) reduction += 60000;

    if (children === "มี") reduction += 30000;

    if (disabledDependents2.spouse) reduction += 60000;
    if (disabledDependents2.father) reduction += 60000;
    if (disabledDependents2.mother) reduction += 60000;

    if (status === "คู่สมรสไม่มีรายได้") {
      reduction += 60000;
    }
    if (box1s3) {
      reduction += Number(box1s3 * 30000);
    }
    if (box2s3) {
      reduction += Number(box2s3 * 60000);
    }
    if (box3s3) {
      reduction += Number(box3s3 * 60000);
    }
    // อัปเดตค่าลดหย่อนใน calculatedData
    setCalculatedData((prev) => {
      const previousReduction = prev.status_reduction || 0;
      const updatedAllDeductions =
        (prev.all_deductions || 0) - previousReduction + reduction;

      const newData = {
        ...prev,
        status_reduction: reduction,
        all_deductions: updatedAllDeductions,
      };

      console.log("Updated calculatedData:", newData); // Log ค่าที่อัปเดต
      return newData;
    });
  };

  const handleNext = () => {
    calculateReductions(); // เรียกใช้ฟังก์ชันคำนวณก่อน

    // ย้ายไปขั้นตอนถัดไป
    setStep(4);
  };

  const renderDetails = () => {
    switch (status) {
      case "โสด":
        return (
          <div className="mt-4">
            {/* หัวข้อ ลดหย่อนบิดา-มารดา */}
            <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-4">
              ลดหย่อนบิดา-มารดา (ตนเอง)
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4 ml-2 depa-Body-text">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={personalParents.father}
                  onChange={(e) =>
                    setPersonalParents((prev) => ({
                      ...prev,
                      father: e.target.checked,
                    }))
                  }
                />{" "}
                บิดา
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={personalParents.mother}
                  onChange={(e) =>
                    setPersonalParents((prev) => ({
                      ...prev,
                      mother: e.target.checked,
                    }))
                  }
                />{" "}
                มารดา
              </label>
            </div>
            <div className="text-left">
              <label className="depa-Micro-text text-gray mb-4">
                คนละ 30,000 บาท บาท (บิดามารดาต้องมีอายุเกิน 60 ปี
                และมีงบได้ไม่เกิน 30,000 บาทต่อปี) (ได้ทั้งบิดา มารดาของตนเอง
                และคู่สมรส)
              </label>
            </div>

            {/* หัวข้อ ลดหย่อนผู้พิการหรือทุพพลภาพ */}
            <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-4 mt-8">
              ลดหย่อนผู้พิการหรือทุพพลภาพ (ไม่มีเงินได้)
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4 ml-2 depa-Body-text">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disabledDependents.father}
                  onChange={(e) =>
                    setDisabledDependents((prev) => ({
                      ...prev,
                      father: e.target.checked,
                    }))
                  }
                />{" "}
                บิดา
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disabledDependents.mother}
                  onChange={(e) =>
                    setDisabledDependents((prev) => ({
                      ...prev,
                      mother: e.target.checked,
                    }))
                  }
                />{" "}
                มารดา
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disabledDependents.relatives}
                  onChange={(e) =>
                    setDisabledDependents((prev) => ({
                      ...prev,
                      relatives: e.target.checked,
                    }))
                  }
                />{" "}
                ญาติ (เช่น พี่ น้อง ฯลฯ)
              </label>
            </div>
            <div className="text-left">
              <label className="depa-Micro-text text-gray mb-4">
                กรณีบิดา, มารดา, คู่สมรส, บิดาคู่สมรส, มารดาคู่สมรส
                และบุตรของตนเอง <br />
                หากเป็นผู้อื่นได้เพียง 1 คนเท่านั้น ลดหย่อนได้คนละ 60,000 บาท
                (ต้องมีบัตรประจำตัวคนพิการ และไม่มีรายได้)
              </label>
            </div>
          </div>
        );

      case "หย่า":
        return (
          <div className="mt-4">
            {/* ลดหย่อนบิดา-มารดา */}
            <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-4">
              ลดหย่อนบิดา-มารดา (ตนเอง)
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4 ml-2 depa-Body-text">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={personalParents.father}
                  onChange={(e) =>
                    setPersonalParents((prev) => ({
                      ...prev,
                      father: e.target.checked,
                    }))
                  }
                />
                บิดา
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={personalParents.mother}
                  onChange={(e) =>
                    setPersonalParents((prev) => ({
                      ...prev,
                      mother: e.target.checked,
                    }))
                  }
                />
                มารดา
              </label>
            </div>
            <div className="text-left">
              <label className="depa-Micro-text text-gray mb-4">
                คนละ 30,000 บาท (บิดามารดาต้องมีอายุเกิน 60 ปี และมีงบได้ไม่เกิน
                30,000 บาทต่อปี) (ได้ทั้งบิดา มารดาของตนเอง และคู่สมรส)
              </label>
            </div>

            {/* บุตรคนที่ 1 */}
            <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-4 mt-8">
              บุตรคนที่ 1 (เกิดปีใดก็ตาม)
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4 ml-2 depa-Body-text">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="children"
                  checked={children === "มี"}
                  onChange={() => setChildren("มี")}
                />
                มี
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="children"
                  checked={children === "ไม่มี"}
                  onChange={() => {
                    setChildren("ไม่มี");
                    setBox1s3(""); // เคลียร์ช่องกรอก
                    setBox2s3(""); // เคลียร์ช่องกรอก
                  }}
                />
                ไม่มี
              </label>
            </div>
            <div className="text-left">
              <label className="depa-Micro-text text-gray mb-4">
                ลดหย่อน 30,000 บาท
              </label>
            </div>

            {/* บุตรคนที่ 2 เป็นต้นไป */}
            {children === "มี" && (
              <div>
                <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-8 mt-8">
                  บุตรคนที่ 2 เป็นต้นไป
                </h2>
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* ก่อนปี 2561 */}
                  <div className="w-full sm:w-1/2">
                    <label className="block depa-Header-text text-navy-blue mb-2">
                      จำนวนบุตรที่เกิดก่อนปี 2561
                    </label>
                    <input
                      type="text"
                      value={box1s3.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, "");
                        if (/^\d*$/.test(rawValue)) {
                          setBox1s3(rawValue);
                        }
                      }}
                      placeholder="ระบุจำนวนคน"
                      className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
                    />
                    <span className="depa-Micro-text text-gray ml-1">
                      ลดหย่อนคนละ 30,000 บาท
                    </span>
                  </div>

                  {/* ตั้งแต่ปี 2561 */}
                  <div className="w-full sm:w-1/2">
                    <label className="block depa-Header-text text-navy-blue mb-2">
                      จำนวนบุตรที่เกิดตั้งแต่ปี 2561 เป็นต้นไป
                    </label>
                    <input
                      type="text"
                      value={box2s3.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, "");
                        if (/^\d*$/.test(rawValue)) {
                          setBox2s3(rawValue);
                        }
                      }}
                      placeholder="ระบุจำนวนคน"
                      className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
                    />
                    <span className="depa-Micro-text text-gray ml-1">
                      ลดหย่อนคนละ 60,000 บาท
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ลดหย่อนผู้พิการหรือทุพพลภาพ */}
            <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-4 mt-8">
              ลดหย่อนผู้พิการหรือทุพพลภาพ (ไม่มีเงินได้)
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4 ml-2 depa-Body-text">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disabledDependents.father}
                  onChange={(e) =>
                    setDisabledDependents((prev) => ({
                      ...prev,
                      father: e.target.checked,
                    }))
                  }
                />
                บิดา
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disabledDependents.mother}
                  onChange={(e) =>
                    setDisabledDependents((prev) => ({
                      ...prev,
                      mother: e.target.checked,
                    }))
                  }
                />
                มารดา
              </label>
              {children === "มี" && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={disabledDependents.child}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setDisabledDependents((prev) => ({
                        ...prev,
                        child: isChecked,
                      }));
                      if (!isChecked) {
                        setBox3s3(""); // เคลียร์ค่าช่องกรอก
                      }
                    }}
                  />
                  บุตร
                </label>
              )}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disabledDependents.relatives}
                  onChange={(e) =>
                    setDisabledDependents((prev) => ({
                      ...prev,
                      relatives: e.target.checked,
                    }))
                  }
                />
                ญาติ (เช่น พี่ น้อง ฯลฯ)
              </label>
            </div>

            {disabledDependents.child && (
              <div className="mt-8 mb-2 text-left">
                <label className="block depa-Header-text text-navy-blue mb-2">
                  จำนวนบุตรที่ต้องการใช้สิทธิลดหย่อนผู้พิการ
                </label>
                <input
                  type="text"
                  value={box3s3.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, "");
                    if (/^\d*$/.test(rawValue)) {
                      setBox3s3(rawValue);
                    }
                  }}
                  placeholder="ระบุจำนวนคน"
                  className="w-full sm:w-[388px] p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
                />
              </div>
            )}

            <div className="text-left">
              <label className="depa-Micro-text text-gray mb-4">
                กรณีบิดา, มารดา, คู่สมรส, บิดาคู่สมรส , มารดาคู่สมรส
                และบุตรของตนเอง <br />
                หากเป็นผู้อื่นได้เพียง 1 คนเท่านั้น ลดหย่อนได้คนละ 60,000 บาท
                (ต้องมีบัตรประจำตัวคนพิการ และไม่มีรายได้)
              </label>
            </div>
          </div>
        );
      case "คู่สมรสมีรายได้ (แยกยื่น)":
        return (
          <div className="mt-4 ">
            <div className="flex flex-col">
              {/* กลุ่มลดหย่อน */}
              <div className="flex items-start">
                {/* ลดหย่อนบิดา-มารดา (ตนเอง) */}
                <div>
                  <h2 className="depa-Header-text font-bold text-navy-blue mb-2">
                    ลดหย่อนบิดา-มารดา (ตนเอง)
                  </h2>
                  <div className="flex gap-4 mb-2 depa-Body-text">
                    <label className="flex items-center gap-2 mr-4">
                      <input
                        type="checkbox"
                        checked={personalParents.father}
                        onChange={(e) =>
                          setPersonalParents((prev) => ({
                            ...prev,
                            father: e.target.checked,
                          }))
                        }
                      />{" "}
                      บิดา
                    </label>
                    <label className="flex items-center gap-2 mr-4">
                      <input
                        type="checkbox"
                        checked={personalParents.mother}
                        onChange={(e) =>
                          setPersonalParents((prev) => ({
                            ...prev,
                            mother: e.target.checked,
                          }))
                        }
                      />{" "}
                      มารดา
                    </label>
                  </div>
                </div>

                {/* ลดหย่อนบิดา-มารดา (คู่สมรส) */}
                <div className="ml-16">
                  <h2 className="depa-Header-text font-bold text-navy-blue mb-2">
                    ลดหย่อนบิดา-มารดา (คู่สมรส)
                  </h2>
                  <div className="flex gap-4 mb-2 depa-Body-text">
                    <label className="flex items-center gap-2 mr-4">
                      <input
                        type="checkbox"
                        checked={personalParents2.father}
                        onChange={(e) =>
                          setPersonalParents2((prev) => ({
                            ...prev,
                            father: e.target.checked,
                          }))
                        }
                      />{" "}
                      บิดา
                    </label>
                    <label className="flex items-center gap-2 mr-4">
                      <input
                        type="checkbox"
                        checked={personalParents2.mother}
                        onChange={(e) =>
                          setPersonalParents2((prev) => ({
                            ...prev,
                            mother: e.target.checked,
                          }))
                        }
                      />{" "}
                      มารดา
                    </label>
                  </div>
                </div>
              </div>

              {/* หมายเหตุ */}
              <div className="text-left depa-Micro-text text-gray mt-2">
                คนละ 30,000 บาท (บิดามารดาต้องมีอายุเกิน 60 ปี
                และมีเงินได้ไม่เกิน 30,000 บาทต่อปี) (ได้ทั้งบิดา มารดาของตนเอง
                และคู่สมรส)
              </div>
            </div>

            <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-4 mt-8">
              บุตรคนที่ 1 (เกิดปีใดก็ตาม)
            </h2>
            <div className="flex gap-4 mb-4 ml-2 depa-Body-text">
              <label className="flex items-center gap-2 mr-4">
                <input
                  type="radio"
                  name="children"
                  checked={children === "มี"}
                  onChange={() => setChildren("มี")}
                />{" "}
                มี
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="children"
                  checked={children === "ไม่มี"}
                  onChange={() => {
                    setChildren("ไม่มี");
                    // เคลียร์ช่องกรอกเมื่อเปลี่ยนเป็น "ไม่มี"
                    setBox1s3(""); // สำหรับจำนวนบุตรก่อนปี 2561
                    setBox2s3(""); // สำหรับจำนวนบุตรหลังปี 2561
                  }}
                />{" "}
                ไม่มี
              </label>
            </div>
            <div className="text-left">
              <label className="depa-Micro-text text-gray mb-4">
                ลดหย่อน 30,000 บาท
              </label>
            </div>
            <div className="text-left">
              {children === "มี" && (
                <div>
                  <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-8 mt-8">
                    บุตรคนที่ 2 เป็นต้นไป
                  </h2>
                  <div className="flex gap-6">
                    {/* ช่องกรอกบุตรที่เกิดก่อนปี 2561 */}

                    <div className="w-1/2">
                      <label className="block depa-Header-text text-navy-blue mb-2">
                        จำนวนบุตรที่เกิดก่อนปี 2561
                      </label>
                      <input
                        type="text"
                        value={box1s3.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/,/g, "");
                          if (/^\d*$/.test(rawValue)) {
                            setBox1s3(rawValue);
                          }
                        }}
                        placeholder="ระบุจำนวนคน"
                        className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
                      />
                      <span className="depa-Micro-text text-gray mb-4 ml-1">
                        ลดหย่อนคนละ 30,000 บาท
                      </span>
                    </div>

                    {/* ช่องกรอกบุตรที่เกิดตั้งแต่ปี 2561 เป็นต้นไป */}
                    <div className="w-1/2">
                      <label className="block depa-Header-text text-navy-blue mb-2">
                        จำนวนบุตรที่เกิดตั้งแต่ปี 2561 เป็นต้นไป
                      </label>
                      <input
                        type="text"
                        value={box2s3.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/,/g, "");
                          if (/^\d*$/.test(rawValue)) {
                            setBox2s3(rawValue);
                          }
                        }}
                        placeholder="ระบุจำนวนคน"
                        className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
                      />
                      <span className="depa-Small-text text-gray ml-1">
                        ลดหย่อนคนละ 60,000 บาท
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-4 mt-8">
              ลดหย่อนผู้พิการหรือทุพพลภาพ (ไม่มีเงินได้)
            </h2>
            <div className="flex gap-4 mb-4 ml-2 depa-Body-text">
              <label className="flex items-center gap-2 mr-4">
                <input
                  type="checkbox"
                  checked={disabledDependents.father}
                  onChange={(e) =>
                    setDisabledDependents((prev) => ({
                      ...prev,
                      father: e.target.checked,
                    }))
                  }
                />{" "}
                บิดา
              </label>
              <label className="flex items-center gap-2 mr-4">
                <input
                  type="checkbox"
                  checked={disabledDependents.mother}
                  onChange={(e) =>
                    setDisabledDependents((prev) => ({
                      ...prev,
                      mother: e.target.checked,
                    }))
                  }
                />{" "}
                มารดา
              </label>
              {children === "มี" && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={disabledDependents.child}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setDisabledDependents((prev) => ({
                        ...prev,
                        child: isChecked,
                      }));
                      // เคลียร์ค่าช่องกรอกเมื่อ Checkbox ถูกยกเลิก
                      if (!isChecked) {
                        setBox3s3(""); // เคลียร์ค่าช่องกรอก
                      }
                    }}
                  />{" "}
                  บุตร
                </label>
              )}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disabledDependents.relatives}
                  onChange={(e) =>
                    setDisabledDependents((prev) => ({
                      ...prev,
                      relatives: e.target.checked,
                    }))
                  }
                />{" "}
                ญาติ (เช่น พี่ น้อง ฯลฯ)
              </label>
            </div>
            {disabledDependents.child && (
              <div className="mt-8 mb-2 text-left">
                <label className="block depa-Header-text text-navy-blue mb-2">
                  จำนวนบุตรที่ต้องการใช้สิทธิลดหย่อนผู้พิการ
                </label>
                <input
                  type="text"
                  value={box3s3.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, "");
                    if (/^\d*$/.test(rawValue)) {
                      setBox3s3(rawValue);
                    }
                  }}
                  placeholder="ระบุจำนวนคน"
                  className="w-[388px] p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
                />
              </div>
            )}
            <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-4 mt-8">
              ลดหย่อนผู้พิการหรือทุพพลภาพ (คู่สมรสไม่มีเงินได้)
            </h2>
            <div className="flex gap-4 mb-4 ml-2 depa-Body-text">
              <label className="flex items-center gap-2 mr-4">
                <input
                  type="checkbox"
                  checked={disabledDependents2.spouse}
                  onChange={(e) =>
                    setDisabledDependents2((prev) => ({
                      ...prev,
                      spouse: e.target.checked,
                    }))
                  }
                />{" "}
                คู่สมรส
              </label>
              <label className="flex items-center gap-2 mr-4">
                <input
                  type="checkbox"
                  checked={disabledDependents2.father}
                  onChange={(e) =>
                    setDisabledDependents2((prev) => ({
                      ...prev,
                      father: e.target.checked,
                    }))
                  }
                />{" "}
                บิดา
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disabledDependents2.mother}
                  onChange={(e) =>
                    setDisabledDependents2((prev) => ({
                      ...prev,
                      mother: e.target.checked,
                    }))
                  }
                />{" "}
                มารดา
              </label>
            </div>
            <div className="text-left">
              <label className="depa-Micro-text text-gray mb-4">
                กรณีบิดา, มารดา, คู่สมรส, บิดาคู่สมรส , มารดาคู่สมรส
                และบุตรของตนเอง <br />
                หากเป็นผู้อื่นได้เพียง 1 คนเท่านั้น ลดหย่อนได้คนละ 60,000 บาท
                (ต้องมีบัตรประจำตัวคนพิการ และไม่มีรายได้)
              </label>
            </div>
          </div>
        );
      case "คู่สมรสไม่มีรายได้":
        return (
          <div className="mt-4 ">
            <div className="flex flex-col">
              {/* กลุ่มลดหย่อน */}
              <div className="flex items-start">
                {/* ลดหย่อนบิดา-มารดา (ตนเอง) */}
                <div>
                  <h2 className="depa-Header-text font-bold text-navy-blue mb-2">
                    ลดหย่อนบิดา-มารดา (ตนเอง)
                  </h2>
                  <div className="flex gap-4 mb-2 depa-Body-text">
                    <label className="flex items-center gap-2 mr-4">
                      <input
                        type="checkbox"
                        checked={personalParents.father}
                        onChange={(e) =>
                          setPersonalParents((prev) => ({
                            ...prev,
                            father: e.target.checked,
                          }))
                        }
                      />{" "}
                      บิดา
                    </label>
                    <label className="flex items-center gap-2 mr-4">
                      <input
                        type="checkbox"
                        checked={personalParents.mother}
                        onChange={(e) =>
                          setPersonalParents((prev) => ({
                            ...prev,
                            mother: e.target.checked,
                          }))
                        }
                      />{" "}
                      มารดา
                    </label>
                  </div>
                </div>

                {/* ลดหย่อนบิดา-มารดา (คู่สมรส) */}
                <div className="ml-16">
                  <h2 className="depa-Header-text font-bold text-navy-blue mb-2">
                    ลดหย่อนบิดา-มารดา (คู่สมรส)
                  </h2>
                  <div className="flex gap-4 mb-2 depa-Body-text">
                    <label className="flex items-center gap-2 mr-4">
                      <input
                        type="checkbox"
                        checked={personalParents2.father}
                        onChange={(e) =>
                          setPersonalParents2((prev) => ({
                            ...prev,
                            father: e.target.checked,
                          }))
                        }
                      />{" "}
                      บิดา
                    </label>
                    <label className="flex items-center gap-2 mr-4">
                      <input
                        type="checkbox"
                        checked={personalParents2.mother}
                        onChange={(e) =>
                          setPersonalParents2((prev) => ({
                            ...prev,
                            mother: e.target.checked,
                          }))
                        }
                      />{" "}
                      มารดา
                    </label>
                  </div>
                </div>
              </div>

              {/* หมายเหตุ */}
              <div className="text-left depa-Micro-text text-gray mt-2">
                คนละ 30,000 บาท (บิดามารดาต้องมีอายุเกิน 60 ปี
                และมีเงินได้ไม่เกิน 30,000 บาทต่อปี) (ได้ทั้งบิดา มารดาของตนเอง
                และคู่สมรส)
              </div>
            </div>

            <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-4 mt-8">
              บุตรคนที่ 1 (เกิดปีใดก็ตาม)
            </h2>
            <div className="flex gap-4 mb-4 ml-2 depa-Body-text">
              <label className="flex items-center gap-2 mr-4">
                <input
                  type="radio"
                  name="children"
                  checked={children === "มี"}
                  onChange={() => setChildren("มี")}
                />{" "}
                มี
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="children"
                  checked={children === "ไม่มี"}
                  onChange={() => {
                    setChildren("ไม่มี");
                    // เคลียร์ช่องกรอกเมื่อเปลี่ยนเป็น "ไม่มี"
                    setBox1s3(""); // สำหรับจำนวนบุตรก่อนปี 2561
                    setBox2s3(""); // สำหรับจำนวนบุตรหลังปี 2561
                  }}
                />{" "}
                ไม่มี
              </label>
            </div>
            <div className="text-left">
              <label className="depa-Micro-text text-gray mb-4">
                ลดหย่อน 30,000 บาท
              </label>
            </div>
            <div className="text-left">
              {children === "มี" && (
                <div>
                  <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-8 mt-8">
                    บุตรคนที่ 2 เป็นต้นไป
                  </h2>
                  <div className="flex gap-6">
                    {/* ช่องกรอกบุตรที่เกิดก่อนปี 2561 */}

                    <div className="w-1/2">
                      <label className="block depa-Header-text text-navy-blue mb-2">
                        จำนวนบุตรที่เกิดก่อนปี 2561
                      </label>
                      <input
                        type="text"
                        value={box1s3.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/,/g, "");
                          if (/^\d*$/.test(rawValue)) {
                            setBox1s3(rawValue);
                          }
                        }}
                        placeholder="ระบุจำนวนคน"
                        className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
                      />
                      <span className="depa-Micro-text text-gray mb-4 ml-1">
                        ลดหย่อนคนละ 30,000 บาท
                      </span>
                    </div>

                    {/* ช่องกรอกบุตรที่เกิดตั้งแต่ปี 2561 เป็นต้นไป */}
                    <div className="w-1/2">
                      <label className="block depa-Header-text text-navy-blue mb-2">
                        จำนวนบุตรที่เกิดตั้งแต่ปี 2561 เป็นต้นไป
                      </label>
                      <input
                        type="text"
                        value={box2s3.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/,/g, "");
                          if (/^\d*$/.test(rawValue)) {
                            setBox2s3(rawValue);
                          }
                        }}
                        placeholder="ระบุจำนวนคน"
                        className="w-full p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
                      />
                      <span className="depa-Small-text text-gray ml-1">
                        ลดหย่อนคนละ 60,000 บาท
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-4 mt-8">
              ลดหย่อนผู้พิการหรือทุพพลภาพ (ไม่มีเงินได้)
            </h2>
            <div className="flex gap-4 mb-4 ml-2 depa-Body-text">
              <label className="flex items-center gap-2 mr-4">
                <input
                  type="checkbox"
                  checked={disabledDependents.father}
                  onChange={(e) =>
                    setDisabledDependents((prev) => ({
                      ...prev,
                      father: e.target.checked,
                    }))
                  }
                />{" "}
                บิดา
              </label>
              <label className="flex items-center gap-2 mr-4">
                <input
                  type="checkbox"
                  checked={disabledDependents.mother}
                  onChange={(e) =>
                    setDisabledDependents((prev) => ({
                      ...prev,
                      mother: e.target.checked,
                    }))
                  }
                />{" "}
                มารดา
              </label>
              {children === "มี" && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={disabledDependents.child}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setDisabledDependents((prev) => ({
                        ...prev,
                        child: isChecked,
                      }));
                      // เคลียร์ค่าช่องกรอกเมื่อ Checkbox ถูกยกเลิก
                      if (!isChecked) {
                        setBox3s3(""); // เคลียร์ค่าช่องกรอก
                      }
                    }}
                  />{" "}
                  บุตร
                </label>
              )}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disabledDependents.relatives}
                  onChange={(e) =>
                    setDisabledDependents((prev) => ({
                      ...prev,
                      relatives: e.target.checked,
                    }))
                  }
                />{" "}
                ญาติ (เช่น พี่ น้อง ฯลฯ)
              </label>
            </div>
            {disabledDependents.child && (
              <div className="mt-8 mb-2 text-left">
                <label className="block depa-Header-text text-navy-blue mb-2">
                  จำนวนบุตรที่ต้องการใช้สิทธิลดหย่อนผู้พิการ
                </label>
                <input
                  type="text"
                  value={box3s3.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, "");
                    if (/^\d*$/.test(rawValue)) {
                      setBox3s3(rawValue);
                    }
                  }}
                  placeholder="ระบุจำนวนคน"
                  className="w-[388px] p-3 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
                />
              </div>
            )}
            <h2 className="depa-Header-text text-left font-bold text-navy-blue mb-4 mt-8">
              ลดหย่อนผู้พิการหรือทุพพลภาพ (คู่สมรสไม่มีเงินได้)
            </h2>
            <div className="flex gap-4 mb-4 ml-2 depa-Body-text">
              <label className="flex items-center gap-2 mr-4">
                <input
                  type="checkbox"
                  checked={disabledDependents2.spouse}
                  onChange={(e) =>
                    setDisabledDependents2((prev) => ({
                      ...prev,
                      spouse: e.target.checked,
                    }))
                  }
                />{" "}
                คู่สมรส
              </label>
              <label className="flex items-center gap-2 mr-4">
                <input
                  type="checkbox"
                  checked={disabledDependents2.father}
                  onChange={(e) =>
                    setDisabledDependents2((prev) => ({
                      ...prev,
                      father: e.target.checked,
                    }))
                  }
                />{" "}
                บิดา
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={disabledDependents2.mother}
                  onChange={(e) =>
                    setDisabledDependents2((prev) => ({
                      ...prev,
                      mother: e.target.checked,
                    }))
                  }
                />{" "}
                มารดา
              </label>
            </div>
            <div className="text-left">
              <label className="depa-Micro-text text-gray mb-4">
                กรณีบิดา, มารดา, คู่สมรส, บิดาคู่สมรส , มารดาคู่สมรส
                และบุตรของตนเอง <br />
                หากเป็นผู้อื่นได้เพียง 1 คนเท่านั้น ลดหย่อนได้คนละ 60,000 บาท
                (ต้องมีบัตรประจำตัวคนพิการ และไม่มีรายได้)
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-[800px] text-center">
      <h1 className="text-2xl font-bold text-navy-blue mb-8">การลดหย่อนภาษี</h1>
      <div className="bg-white rounded-xl p-6 w-full max-w-[490px] mx-auto">
        <label className="block text-lg text-navy-blue mb-4 text-left">
          สถานภาพ
        </label>
        <select
          className="w-full h-[60px] p-1 border border-gray-light rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-yellow-100"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="" disabled hidden>
            กรุณาเลือกสถานะ
          </option>
          <option value="โสด">โสด</option>
          <option value="หย่า">หย่า</option>
          <option value="คู่สมรสมีรายได้ (แยกยื่น)">
            คู่สมรสมีเงินได้ (แยกยื่น)
          </option>
          <option value="คู่สมรสไม่มีรายได้">คู่สมรสไม่มีเงินได้</option>
        </select>

        {status === "คู่สมรสไม่มีรายได้" && (
          <p className="mt-2 depa-Micro-text text-gray text-left ml-2 mb-[-20px]">
            ลดหย่อนเพิ่มสำหรับคู่สมรสไม่มีรายได้ 60,000 บาท
          </p>
        )}
      </div>

      {/* แสดงรายละเอียดที่เปลี่ยนตามสถานภาพ */}
      <div className="mt-8">{renderDetails()}</div>

      {/* ปุ่มย้อนกลับและถัดไป */}

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16">
        <button
          onClick={() => setStep(2)}
          className="bg-gradient-to-r from-[#B5B5B5] to-[#FFFFFF] depa-Header-text text-navy-blue py-2 px-4 rounded-[60px] shadow-md w-full sm:w-[300px] h-[50px] sm:h-[75px]"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-[#FFC600] to-[#FFF200] depa-Header-text text-navy-blue py-2 px-4 rounded-[60px] shadow-md w-full sm:w-[300px] h-[50px] sm:h-[75px]"
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

export default Step3;
