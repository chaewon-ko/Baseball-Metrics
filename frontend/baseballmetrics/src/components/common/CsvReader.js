import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';

// tooltip doesn't work well..
// 정렬용 => 대체가 필요해보이긴함 => 가로로 표가 너무 김
// 원하는 지표들만 골라서 만드는 건 백엔드랑 통신을 해서 .csv받긴 해야할듯 => 이건 프론트에서 구현불가(?)인듯

const TableContainer = styled.div`
  margin: 20px;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
  white-space: nowrap;
`;

const TableHeader = styled.th`
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: visible;

  &:hover {
    background-color: #2980b9;
  }

  .tooltip {
    display: none; 
    width: auto;
    background-color: #34495e;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    top: -100%;
    left: 50%;
    margin-left: -50%;
    opacity: 0;
    transition: opacity 0.3s;
    transform: translateY(-100%);
  }

  &:hover .tooltip {
    display: block; 
    opacity: 1;
    top: -100%;
    transform: translateY(-100%);
  }
`;



const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 8px;
  cursor: pointer;
`;

function CsvReader() {
  const [tableData, setTableData] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    fetchData('/data/battersBasic.csv'); // 초기파일
  }, []);

  const fetchData = async (csvFilePath) => {
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
  };

  const handleHeaderClick = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTableData = () => {
    if (sortConfig.key !== null) {
      const sortedData = [...tableData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.direction === 'ascending') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      return sortedData;
    } else {
      return tableData;
    }
  };

  const handleButtonClick = (csvFilePath) => {
    fetchData(csvFilePath);
  };

  return (
    <div>
      <ButtonContainer>
        <Button onClick={() => handleButtonClick('/data/battersBasic.csv')}>
          Basic
        </Button>
        <Button onClick={() => handleButtonClick('/data/battersClutch.csv')}>
          Clutch
        </Button>
      </ButtonContainer>
      <TableContainer>
        {tableData && (
          <StyledTable>
            <thead>
              <tr>
                {Object.keys(tableData[0]).map((header) => (
                  <TableHeader key={header} onClick={() => handleHeaderClick(header)}>
                    {header}
                    <div className="tooltip">{header}</div>
                  </TableHeader>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedTableData().map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <TableData key={index}>{value}</TableData>
                  ))}
                </tr>
              ))}
            </tbody>
          </StyledTable>
        )}
      </TableContainer>
    </div>
  );
}

export default CsvReader;
