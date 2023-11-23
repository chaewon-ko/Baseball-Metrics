import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const CsvReader = () => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    fetchData('/data/pitcherGame.csv'); // 초기파일
  }, []);

  const fetchData = async (csvFilePath) => {
    try {
      const response = await fetch(process.env.PUBLIC_URL + csvFilePath);
      const csvData = await response.text();

      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        complete: function (result) {
          setTableData(result.data);
        },
        error: function (error) {
          console.error('Error parsing CSV:', error.message);
        },
      });
    } catch (error) {
      console.error('Error fetching CSV:', error.message);
    }
  };

  return (
    <div>
      {tableData && (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(tableData[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, columnIndex) => (
                  <td key={columnIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const Selectpitcher = () => {
  return <CsvReader />;
};

export default Selectpitcher;