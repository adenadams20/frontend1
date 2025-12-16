import React from "react";

const ExportCSV = ({ data, fileName = "export.csv" }) => {
  const downloadCSV = () => {
    if (!data || !data.length) return;

    const headers = Object.keys(data[0]);
    
    const csvRows = [
        headers.join(","), // entêtes
        ...data.map(row =>
            headers.map(field => `"${row[field] ?? ""}"`).join(",")
        )
    ];
    console.log(data);

    const blob = new Blob(
      ["\uFEFF" + csvRows.join("\n")], // BOM UTF-8 pour Excel
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={downloadCSV}>
      Export CSV
    </button>
  );
};

export default ExportCSV;
