// utils/exportPDF.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (data, columns) => {
  const doc = new jsPDF();

  const tableColumn = columns.map((col) => col.label);
  const tableRows = data.map((row) =>
    columns.map((col) => row[col.key])
  );

  autoTable(doc, { head: [tableColumn], body: tableRows });

  doc.save("report.pdf");
};