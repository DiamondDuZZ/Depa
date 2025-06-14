import React from 'react';

const PDPA = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl max-w-3xl w-full p-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-4 text-left">
          นโยบายความเป็นส่วนตัว (PDPA)
        </h1>
        <hr className="my-4 border-blue-900" />
        <p className="text-gray-700 mb-4">
          สำนักงานส่งเสริมเศรษฐกิจดิจิทัล (สศด.) ให้ความสำคัญต่อการคุ้มครองข้อมูลส่วนบุคคลตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562 ดังนั้นเพื่อให้สามารถ เก็บ รวบรวม ใช้หรือเปิดเผยให้สอดคล้องกับพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 สศด. ใคร่ขอความยินยอมจากพนักงานในฐานะเจ้าของข้อมูลส่วนบุคคลในการเก็บ รวบรวม ใช้หรือเปิดเผย โดยมีรายละเอียดดังนี้ ทั้งนี้พนักงานรับทราบว่าหนังสือแสดงความยินยอมฉบับนี้เป็นส่วนหนึ่งของการใช้พัฒนาและบริหารทรัพยากรบุคคล
        </p>

        <p className="text-blue-900 font-semibold mb-4">ข้อ 1 วัตถุประสงค์การเก็บ รวมรวม ใช้หรือเปิดเผยข้อมูลส่วนบุคคล</p>
        <ul className="list-none pl-6">
          <li>เพื่อใช้ในการดำเนินการพัฒนาและบริหารทรัพยากรบุคคลภายใต้ข้อบังคับคณะกรรมการกำกับสำนักงานส่งเสริมเศรษฐกิจดิจิทัลว่าด้วยการบริหารทรัพยากรบุคคล พ.ศ. 2560</li>
        </ul>
        <br></br>
        

        <p className="text-blue-900 font-semibold mb-4">ข้อ 2 ประเภทข้อมูลส่วนบุคคล</p>
        <ol className="list-decimal pl-6">
            <li>ชื่อ นามสกุล ชื่อเล่น เพศ ภาพถ่าย วัน/เดือน/ปี เกิด</li>
            <li>Resume, CV ประสบการณ์การทำงาน และข้อมูลการศึกษา</li>
            <li>ข้อมูลการติดต่อ เช่น ที่อยู่ เบอร์โทรศัพท์ อีเมล</li>
            <li>ใบอนุญาตประกอบวิชาชีพหรือใบอนุญาตอื่น ๆ ที่เกี่ยวกับงาน ใบอนุญาตหรือประกาศนียบัตรที่มีอยู่</li>
            <li>ข้อมูลบัตรประชาชน ทะเบียนบ้าน ผลตรวจสุขภาพ ประวัติตรวจสอบอาชญากรรม</li>
            <li>ข้อมูลส่วนบุคคลของบุคคลอื่น เช่น บุคคลที่ติดต่อกรณีฉุกเฉิน บุคคลอ้างอิง รายละเอียดหรือเอกสารเกี่ยวกับคู่สมรส บุตร บิดามารดา ซึ่งรวมถึงอายุ อาชีพ/ตำแหน่งงาน/ระดับการศึกษา สถานที่ทำงาน ที่อยู่ เบอร์โทรศัพท์ของบุคคลดังกล่าว เป็นต้น</li>
            <li>ผลสอบวัดระดับทักษะทางภาษา</li>
        </ol>
        <br></br>

        <p className="text-blue-900 font-semibold mb-4">ข้อ 3 ระยะเวลาในการเก็บรักษาข้อมูลส่วนบุคคล</p>
        <ol className="list-decimal pl-6">
            <ol className="list-decimal">สศด. จะเก็บข้อมูลส่วนบุคคลของท่านตลอดระยะเวลาการเป็นพนักงานของสำนักงานส่งเสริมเศรษฐกิจดิจิทัล เพื่อใช้งานตามวัตถุประสงค์ที่แจ้งไว้ เว้นแต่กรณีดังต่อไปนี้</ol>
            <li>กรณีมีเหตุจำเป็นตามคำร้องขอจากเจ้าของข้อมูล, คำสั่งจากหน่วยงานของรัฐ, คำสั่งศาล</li>
            <li>หน่วยงาน จะจัดให้มีระบบการตรวจสอบเพื่อดำเนินการลบหรือทำลายข้อมูลส่วนบุคคลที่ไม่เกี่ยวข้องหรือเกินความจำเป็นตามวัตถุประสงค์ในการเก็บรวบรวมข้อมูลส่วนบุคคลนั้น </li>
        </ol>
        <br></br>

        <p className="text-blue-900 font-semibold mb-4">ข้อ 4 การเปิดเผยข้อมูลส่วนบุคคล</p>
        <ol className="list-decimal pl-6">
            <ol className="list-decimal">หน่วยงาน จะไม่เปิดเผยข้อมูลส่วนบุคคลดังกล่าวต่อบุคคลใดโดยไม่ได้รับการอนุญาตจากเจ้าของข้อมูล อย่างไรก็ดี เพื่อประโยชน์ในการดำเนินการตามวัตถุประสงค์การเก็บ รวบรวม ใช้หรือเปิดเผยตามที่ระบุไว้ข้างต้น พนักงานรับทราบและยินยอมว่าสศด. อาจเปิดเผยข้อมูลส่วนบุคคลของเจ้าของข้อมูลให้กับบุคคลอื่น ดังต่อไปนี้</ol>
            <li>บุคคลที่หน่วยงานได้ว่าจ้างในการดำเนินงานที่เกี่ยวข้องกับข้อมูลส่วนบุคคลเพื่อประโยชน์ในการบริหารจัดการองค์กร เช่น ผู้ให้บริการเกี่ยวกับเทคโนโลยีสารสนเทศ เป็นต้น</li>
            <li>หน่วยงาน อาจเปิดเผยข้อมูลส่วนบุคคลของผู้สมัครงานภายใต้หลักเกณฑ์ที่กฎหมายกำหนด เช่น การเปิดเผยข้อมูลต่อหน่วยงานราชการ หน่วยงานภาครัฐ รวมถึงในกรณีที่มีการร้องขอให้เปิดเผยข้อมูลโดยอาศัยอำนาจตามกฎหมาย เช่น การร้องขอข้อมูลเพื่อการฟ้องร้องหรือดำเนินคดีตามกฎหมาย การบังคับคดี เป็นต้น </li>
            <ol className="list-decimal">ทั้งนี้หน่วยงานหรือบุคคลเหล่านั้น จะดำเนินการให้มีมาตราการคุ้มครองข้อมูลส่วนบุคคลตามที่กฎหมายกำหนด และอยู่บนพื้นฐานการรู้เท่าที่จำเป็นอย่างเคร่งครัดเพื่อการปฏิบัติตามกฎหมายหรือสัญญา</ol>
        </ol>
        <br></br>

        <p className="text-blue-900 font-semibold mb-4">ข้อ 5 สิทธิของผู้สมัครงานในฐานะเจ้าของข้อมูลส่วนบุคคล</p>
        <ol className="list-decimal pl-6">
            <li>ขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลที่เกี่ยวกับตน ซึ่งอยู่ในความรับผิดชอบของหน่วยงาน หรือขอให้เปิดเผยถึงการได้มาซึ่งข้อมูลส่วนบุคคลดังกล่าวที่ตนไม่ได้ให้ความยินยอม</li>
            <li>แจ้งให้หน่วยงาน ดำเนินการให้ข้อมูลส่วนบุคคลของตนถูกต้องเป็นปัจจุบัน สมบูรณ์ และไม่ก่อให้เกิดความเข้าใจผิด </li>
            <li>คัดค้านการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลที่เกี่ยวกับตน ที่กฎหมายอนุญาตให้เก็บได้โดยไม่ต้องได้รับความยินยอมจากเจ้าของข้อมูล เมื่อใดก็ได้</li>
            <li>ขอให้หน่วยงาน ดำเนินการลบหรือทำลาย หรือทำให้ข้อมูลส่วนบุคคลเป็นข้อมูลที่ไม่สามารถระบุตัวบุคคลที่เป็นเจ้าของข้อมูลส่วนบุคคลได้ ในกรณีตามที่กฎหมายกำหนด ในกรณีที่มีการร้องขอให้ลบข้อมูลส่วนบุคคลจากระบบนั้น ข้อมูลดังกล่าวอาจจะยังคงได้รับการบันทึกหรือทำสำเนาไว้ที่เซิร์ฟเวอร์ (Server) หรือระบบสำรอง (Backup System) ของหน่วยงาน เพื่อป้องกันการเข้าสู่ระบบภายหลังโดยบุคคลที่ไม่ได้รับอนุญาต หรือเพื่อเป็นการสำรองข้อมูลในกรณีที่เกิดความผิดพลาด บกพร่อง หรือเกิดจากความขัดข้องของระบบ หรือในกรณีที่เกิดจากการกระทำใดๆ ที่มีจุดประสงค์มุ่งร้ายของบุคคลหรือซอฟต์แวร์อื่น</li>
            <li>ขอให้หน่วยงาน ระงับการใช้ข้อมูลส่วนบุคคลได้ ในกรณีตามที่กฎหมายกำหนด</li>
            <li>ถอนความยินยอมเมื่อใดก็ได้</li>
            <li>ร้องเรียนในกรณีที่หน่วยงาน หรือผู้ประมวลผลข้อมูลส่วนบุคคล รวมทั้งลูกจ้างหรือผู้รับจ้างของสศด. ฝ่าฝืนหรือไม่ปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล อย่างไรก็ตามสศด. มีสิทธิปฏิเสธสิทธิของพนักงานในฐานะเจ้าของข้อมูลส่วนบุคคลตามที่ระบุไว้ข้างต้นโดยอาศัยเหตุตามที่พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 หรือที่จะมีการแก้ไขเพิ่มเติมในภายหน้า หรือกฎหมายอื่นได้อนุญาตไว้</li>
        </ol>
        <br></br>

        <p className="text-blue-900 font-semibold mb-4">ข้อ 6 การรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคล</p>
        <ul class="list-none">
            <li>สำนักงานตระหนักถึงความสำคัญของการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลของท่าน สำนักงานจึงกำหนดให้มีมาตรการในการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลอย่างเหมาะสมและสอดคล้องกับการรักษาความลับของข้อมูลส่วนบุคคลเพื่อป้องกันการสูญหาย การเข้าถึง ทำลาย ใช้ แปลง แก้ไขหรือเปิดเผยข้อมูลส่วนบุคคลโดยไม่มีสิทธิ์หรือโดยไม่ชอบด้วยกฎหมาย โดยให้เป็นไปตามที่กำหนดในนโยบายและแนวปฏิบัติในการรักษาความมั่นคงปลอดภัยด้านเทคโนโลยีสารสนเทศของสำนักงาน</li>
        </ul>
        <br></br>

        <p className="text-blue-900 font-semibold mb-4">ข้อ 7  ช่องทางติดต่อ</p>
        <p>พนักงานสามารถติดต่อ ส่วนบริหารและพัฒนาบุคคล ได้ตามช่องทาง ดังต่อไปนี้</p>
        <ul className="list-disc pl-6">
          <li>อีเมล์ human@depa.or.th</li>
          <li>เบอร์โทรศัพท์ 088 227 2774</li>
          <li>ชั้น 3 แผนกส่วนบริหารและพัฒนาบุคคล สำนักงานส่งเสริมเศรษฐกิจดิจิทัล</li>
        </ul>

        <br></br>
        <p className="text-gray-700 mb-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="consent-checkbox"
            className="w-5 h-5 accent-blue-500 rounded mr-2"
          />
          <label htmlFor="consent-checkbox">
            ข้าพเจ้ารับทราบและให้ความยินยอมในการเก็บ รวบรวม ใช้ และ/หรือเปิดเผย ซึ่งข้อมูลส่วนบุคคลของข้าพเจ้าตามรายละเอียดที่ระบุไว้ในแบบฟอร์มแสดงความยินยอมฉบับนี้
          </label>
        </p>

        <div className="flex justify-center">
            <button
                href=""
                className="w-[80px] h-[50px] bg-blue-900 rounded-[15px] font-small text-m  text-white shadow-xl mt-4"
              >
                ยืนยัน
            </button>
        </div>
      </div>
    </div>
  );
};

export default PDPA;
