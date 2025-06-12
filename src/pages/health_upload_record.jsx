import React, { useState, useRef } from 'react'
import { Upload, X, CheckCircle, ChevronLeft, ChevronRight, AlertCircle, Info } from 'lucide-react';
import * as XLSX from 'xlsx';

const HealthUploadRecord = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [year, setYear] = useState('');
  const fileInputRef = useRef(null);
  const yearInputRef = useRef(null);
  const [previewData, setPreviewData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showYearError, setShowYearError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [saveResult, setSaveResult] = useState(null);

  const REQUIRED_COLUMNS = [
    'ลำดับ', 'ชื่อ', 'นามสกุล', 'อายุ', 'น้ำหนัก กก.', 'ส่วนสูง ซ.ม.',
    'ค่า BMI', 'ความดันโลหิต', 'FBS', 'BUN', 'Creatinine',
    'Uricacid', 'Cholesterol', 'Triglyceride', 'HDL', 'LDL',
    'Anit-HBs', 'HBs Ag', 'หมายเหตุ'
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // ตรวจสอบประเภทไฟล์
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls)$/i)) {
      // เงียบๆ ไม่แสดง alert และ reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setIsProcessing(true);
    
    // อ่านไฟล์ Excel
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // ตรวจสอบว่ามีข้อมูลหรือไม่
        if (jsonData.length === 0) {
          setIsProcessing(false);
          return;
        }

        // ค้นหา header row โดยดูว่า row ไหนมีคอลัมน์ที่ต้องการครบ
        let headerRowIndex = -1;
        let headerRow = null;
        
        for (let i = 0; i < jsonData.length; i++) {
          const row = jsonData[i];
          if (row && Array.isArray(row)) {
            // นับจำนวนคอลัมน์ที่ตรงกับ REQUIRED_COLUMNS
            const matchingColumns = REQUIRED_COLUMNS.filter(col => row.includes(col));
            
            // ถ้าเจอครบทุกคอลัมน์ หรือเจอมากกว่า 80% ของคอลัมน์ที่ต้องการ
            if (matchingColumns.length === REQUIRED_COLUMNS.length || 
                matchingColumns.length >= Math.ceil(REQUIRED_COLUMNS.length * 0.8)) {
              headerRowIndex = i;
              headerRow = row;
              break;
            }
          }
        }

        // ถ้าไม่เจอ header ที่เหมาะสม ให้หยุดการประมวลผล
        if (headerRowIndex === -1) {
          setIsProcessing(false);
          return;
        }

        // สร้างข้อมูลใหม่โดยให้ header อยู่ที่ row แรก
        const reorderedData = [
          headerRow, // header row
          ...jsonData.slice(headerRowIndex + 1) // data rows หลัง header
        ];

        // เก็บข้อมูลทั้งหมด
        setPreviewData(reorderedData);
        setCurrentPage(1); // รีเซ็ตหน้าเป็นหน้าแรก
        
        setUploadedFile({
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          totalRows: reorderedData.length - 1 // ไม่นับ header
        });
        
        setIsProcessing(false);
      } catch (error) {
        console.error('Error reading file:', error);
        setIsProcessing(false);
      }
    };
    
    reader.readAsArrayBuffer(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setPreviewData(null);
    setCurrentPage(1);
    // Reset input field เพื่อให้สามารถเลือกไฟล์ใหม่ได้
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // คำนวณข้อมูลสำหรับหน้าปัจจุบัน
  const getCurrentPageData = () => {
    if (!previewData) return [];
    
    const dataRows = previewData.slice(1); // ไม่รวม header
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return dataRows.slice(startIndex, endIndex);
  };

  const totalPages = previewData ? Math.ceil((previewData.length - 1) / itemsPerPage) : 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // รีเซ็ตไปหน้าแรก
  };

  // ซ่อนข้อผิดพลาดเมื่อผู้ใช้เริ่มพิมพ์
  const handleYearChange = (e) => {
    setYear(e.target.value);
    if (showYearError) {
      setShowYearError(false);
    }
  };

  // แปลงข้อมูลจาก Excel format เป็น object format
  const convertExcelDataToObjects = (excelData) => {
    if (!excelData || excelData.length < 2) return [];
    
    const headers = excelData[0];
    const dataRows = excelData.slice(1);
    
    return dataRows.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || null;
      });
      return obj;
    });
  };

  const handleSaveToDatabase = async () => {
    if (!previewData || !year) {
      if (!year) {
        setShowYearError(true);
        // Focus ที่ช่องกรอกปี
        if (yearInputRef.current) {
          yearInputRef.current.focus();
        }
        // ซ่อนการแสดงข้อผิดพลาดหลังจาก 3 วินาที
        setTimeout(() => {
          setShowYearError(false);
        }, 3000);
      }
      return;
    }

    setIsSaving(true);
    
    try {
      // แปลงข้อมูลจาก Excel format เป็น object format
      const healthData = convertExcelDataToObjects(previewData);
      
      const response = await fetch('http://localhost:3000/api/health/bulk-with-user-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          healthData: healthData,
          year: year
        })
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        // สำเร็จ
        setSaveResult({
          success: true,
          message: result.message,
          details: result
        });
      } else {
        // ไม่สำเร็จ
        setSaveResult({
          success: false,
          message: result.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
          error: result.error
        });
      }
    } catch (error) {
      console.error('Error saving to database:', error);
      setSaveResult({
        success: false,
        message: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
        error: error.message
      });
    }
    
    setIsSaving(false);
    setShowResultModal(true);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    setSaveResult(null);
  };

  // Success Modal Component
  const SuccessModal = ({ result, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">บันทึกข้อมูลสำเร็จ! 🎉</h2>
              <p className="text-green-100 mt-1">ประมวลผลเสร็จสิ้น</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{result.insertedCount}</div>
              <div className="text-sm text-blue-500">รายการใหม่</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{result.existingCount}</div>
              <div className="text-sm text-orange-500">มีอยู่แล้ว</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{result.notFoundCount}</div>
              <div className="text-sm text-red-500">ไม่พบผู้ใช้</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{result.deletedCount}</div>
              <div className="text-sm text-purple-500">ลบข้อมูลเก่า</div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">{result.message}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );

  // Error Modal Component
  const ErrorModal = ({ result, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-2xl font-bold truncate">เกิดข้อผิดพลาด!</h2>
              <p className="text-red-100 mt-1 text-sm sm:text-base">ไม่สามารถบันทึกข้อมูลได้</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-4">
            <p className="text-red-800 font-medium text-sm sm:text-base break-words">{result.message}</p>
            {result.error && (
              <p className="text-red-600 text-xs sm:text-sm mt-2 break-words">รายละเอียด: {result.error}</p>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold text-sm sm:text-base"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 mt-3 bg-white rounded-xl drop-shadow-md">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#0C2F53] break-words">📊 อัปโหลดไฟล์ผลตรวจสุขภาพ</h3>
        </div>
        
        <div className="flex items-center justify-center sm:justify-end">
          <label className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#FFF200] to-[#FFE000] hover:from-[#FFE000] hover:to-[#FFD700] px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-[#E6D700] backdrop-blur-sm cursor-pointer w-full sm:w-auto justify-center">
            <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-[#0C2F53] drop-shadow-sm flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-[#0C2F53] tracking-wide">
              {isProcessing ? 'กำลังประมวลผล...' : 'เลือกไฟล์'}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isProcessing}
            />
          </label>
        </div>
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl shadow-md p-4 sm:p-6 mx-auto mt-6 sm:mt-8 backdrop-blur-sm border border-blue-200">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-500 flex-shrink-0"></div>
            <span className="text-base sm:text-lg font-semibold text-blue-700">กำลังประมวลผลไฟล์...</span>
          </div>
        </div>
      )}

      {/* Selected File Display */}
      {uploadedFile && !isProcessing && (
        <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl shadow-md p-4 sm:p-6 mx-auto mt-6 sm:mt-8 backdrop-blur-sm border border-green-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-green-700">ไฟล์ที่เลือก</h3>
                <p className="text-xs sm:text-sm text-green-600 break-all">
                  {uploadedFile.name} ({uploadedFile.size}) - {uploadedFile.totalRows} แถว
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-200 self-end sm:self-auto flex-shrink-0"
              title="ลบไฟล์"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Year Input Section */}
      <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-xl shadow-md p-4 sm:p-6 mx-auto mt-6 sm:mt-8 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <h2 className="text-base sm:text-lg font-bold text-[#0C2F53] flex items-center gap-2">
            📅 ระบุปีของข้อมูล (พ.ศ.):
          </h2>
          <div className="flex-1 lg:max-w-xs relative">
            <input
              ref={yearInputRef}
              type="number"
              placeholder="เช่น 2568"
              min="1900"
              max="2030"
              value={year}
              onChange={handleYearChange}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl text-sm sm:text-base bg-gradient-to-br from-white to-gray-50/50 text-[#0C2F53] hover:shadow-lg transition-all duration-300 backdrop-blur-sm placeholder:text-gray-400 font-medium ${
                showYearError 
                  ? 'border-red-400 focus:border-red-500 shadow-red-200' 
                  : 'border-gray-200/60 hover:border-gray-300 focus:border-[#FFF200]'
              }`}
            />
            {/* Error Message */}
            {showYearError && (
              <div className="absolute top-full left-0 mt-2 px-3 py-2 bg-red-500 text-white text-xs sm:text-sm rounded-lg shadow-lg animate-bounce z-10 max-w-xs">
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <span>กรุณาระบุปีของข้อมูล</span>
                </div>
                <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-red-500"></div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#FFF200]/10 to-[#FFE000]/10 border border-[#FFF200]/20 rounded-lg p-3 mt-4">
          <p className="text-xs sm:text-sm text-[#0C2F53]/80 flex items-start gap-2">
            <span className="text-sm sm:text-base flex-shrink-0">📝</span>
            <span>กรุณาระบุปีของข้อมูลสุขภาพที่จะอัปโหลด (ระบบจะเก็บข้อมูล 4 ปีล่าสุด)</span>
          </p>
        </div>
      </div>

      {/* Data Preview Table */}
      {previewData && (
        <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-xl shadow-md p-4 sm:p-6 mx-auto mt-6 sm:mt-8 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#0C2F53] flex items-center gap-2">
              📋 ข้อมูลตารางสุขภาพ
            </h3>
            <button
              onClick={handleSaveToDatabase}
              disabled={!year || isSaving}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg w-full sm:w-auto ${
                year && !isSaving
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>กำลังบันทึก...</span>
                </>
              ) : (
                <>
                  💾 <span>บันทึกลงฐานข้อมูล</span>
                </>
              )}
            </button>
          </div>
          
          {/* Table Container with Horizontal Scroll */}
          <div className="overflow-x-auto rounded-lg border border-gray-200/50 bg-white/50 backdrop-blur-sm shadow-sm">
            <div className="min-w-[800px]"> {/* Minimum width for table */}
              <table className="w-full divide-y divide-gray-200/50">
                <thead className="bg-gradient-to-r from-[#FFF200]/20 to-[#FFE000]/20">
                  <tr>
                    {previewData[0]?.map((header, index) => (
                      <th 
                        key={index}
                        className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-[#0C2F53] uppercase tracking-wider border-r border-gray-200/30 last:border-r-0 min-w-[100px] sm:min-w-[120px] sticky top-0 bg-gradient-to-r from-[#FFF200]/20 to-[#FFE000]/20 backdrop-blur-sm"
                      >
                        <div className="truncate" title={header}>
                          {header}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/30">
                  {getCurrentPageData().map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gradient-to-r hover:from-[#FFF200]/10 hover:to-transparent transition-all duration-200">
                      {row.map((cell, cellIndex) => (
                        <td 
                          key={cellIndex}
                          className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 border-r border-gray-200/20 last:border-r-0 max-w-[150px] sm:max-w-[200px]"
                        >
                          <div className="truncate" title={cell}>
                            {cell || '-'}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination - Responsive */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-6 px-2">
            {/* Info and Items per page */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="text-xs sm:text-sm text-[#0C2F53]/70 text-center sm:text-left">
                แสดง {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, uploadedFile?.totalRows || 0)} จากทั้งหมด {uploadedFile?.totalRows || 0} รายการ
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm text-[#0C2F53]/70">แสดง:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-200/60 rounded-lg text-xs sm:text-sm bg-gradient-to-br from-white to-gray-50/50 text-[#0C2F53] hover:border-gray-300 transition-all duration-300 backdrop-blur-sm"
                >
                  <option value={10}>10 รายการ</option>
                  <option value={25}>25 รายการ</option>
                  <option value={50}>50 รายการ</option>
                  <option value={100}>100 รายการ</option>
                </select>
              </div>
            </div>
            
            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 sm:p-2 rounded-lg border border-gray-200/60 bg-gradient-to-br from-white to-gray-50/50 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-[#0C2F53]" />
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, window.innerWidth < 640 ? 3 : 5) }, (_, i) => {
                  const maxButtons = window.innerWidth < 640 ? 3 : 5;
                  let pageNum;
                  if (totalPages <= maxButtons) {
                    pageNum = i + 1;
                  } else if (currentPage <= Math.ceil(maxButtons/2)) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - Math.floor(maxButtons/2)) {
                    pageNum = totalPages - maxButtons + 1 + i;
                  } else {
                    pageNum = currentPage - Math.floor(maxButtons/2) + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-[#FFF200] to-[#FFE000] text-[#0C2F53] shadow-md'
                          : 'bg-gradient-to-br from-white to-gray-50/50 text-[#0C2F53]/70 hover:shadow-md border border-gray-200/60'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 sm:p-2 rounded-lg border border-gray-200/60 bg-gradient-to-br from-white to-gray-50/50 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#0C2F53]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Modals */}
      {showResultModal && saveResult && (
        saveResult.success ? (
          <SuccessModal result={saveResult.details} onClose={closeResultModal} />
        ) : (
          <ErrorModal result={saveResult} onClose={closeResultModal} />
        )
      )}
    </div>
  )
}

export default HealthUploadRecord