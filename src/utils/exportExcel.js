// utils/exportExcel.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data, columns) => {
  const workSheetData = data.map((row) =>
    columns.reduce((acc, col) => {
      acc[col.label] = row[col.key];
      return acc;
    }, {})
  );

  const worksheet = XLSX.utils.json_to_sheet(workSheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(blob, "report.xlsx");
};