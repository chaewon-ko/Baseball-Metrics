import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';

// tooltip doesn't work well..
// 정렬용 => 대체가 필요해보이긴함 => 가로로 표가 너무 김
// 원하는 지표들만 골라서 만드는 건 백엔드랑 통신을 해서 .csv받긴 해야할듯 => 이건 프론트에서 구현불가(?)인듯

const TableContainer = styled.div`
  margin: 0 90px;
  overflow-y: auto;
  max-height: 565px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-y: auto;
  white-space: nowrap;
`;

const TableHeader = styled.th`
  background-color: ${(props) => props.theme.subTransparent};
  color: black;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: visible;

  &:hover {
    background-color: ${(props) => props.theme.mainColor};
    color: #fff;
  }

  .tooltip {
    display: none; 
    width: auto;
    background-color: ${(props) => props.theme.mainColor};
    color: #fff;
    font-weight: 500;
    text-align: center;
    border-radius: 6px;
    padding: 5px 10px;
    position: absolute;
    z-index: 1;
    bottom: -100%;
    left: 50%;
    margin-left: -50%;
    opacity: 0;
    transition: opacity 0.3s;
    transform: translateY(-10px);
  }

  &:hover .tooltip {
    display: block; 
    opacity: 1;
    transform: translateY(0);
  }
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const ButtonContainer = styled.div`
  margin-left:90px;
  text-align: left;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 8px;
  cursor: pointer;
  text-align: left;
  border: none;
  color: ${(props) => (props.clicked ? '#22222' : 'inherit')}; 
  font-weight: ${(props) => (props.clicked ? 'bold' : 'normal')};
  transition: background-color 0.3s, color 0.3s;
  background-color: transparent;

  &:active {
    background-color: #e0e0e0;
  }
`;

const BPSelectBtn = styled.button`
  display: inline-flex;
  padding: 5px 14px;
  justify-content: center;
  align-items: center;
  gap: 40px;
  border-radius: 999px;
  border: 1px solid var(--main, #002063);
  background: #FFF;
  cursor: pointer;
  margin-right: 5px;
`;

const TeamSelectorWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left:90px;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const TeamSelector = styled.select`
  display: inline-flex;
  padding: 5px 16px;
  text-align: left;
  align-items: center;
  gap: 40px;
  border-radius: 999px;
  border: 1px solid var(--stroke, #D8D8D8);
  cursor: pointer;
  margin-right: 20px;
`;

function CsvReader() {
  const [tableData, setTableData] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [clickedButton, setClickedButton] = useState(null);

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
    setClickedButton(csvFilePath);
  };

  return (
    <div>
      <TeamSelectorWrapper>
        <TeamSelector>
          <option value="/data/battersBasic.csv">전체 팀</option>
          <option value="/data/battersExp.csv">LG</option>
          <option value="/data/battersExp.csv">KT</option>
          <option value="/data/battersExp.csv">SSG</option>
          <option value="/data/battersExp.csv">NC</option>
          <option value="/data/battersExp.csv">두산</option>
          <option value="/data/battersExp.csv">KIA</option>
          <option value="/data/battersExp.csv">롯데</option>
          <option value="/data/battersExp.csv">삼성</option>
          <option value="/data/battersExp.csv">한화</option>
          <option value="/data/battersExp.csv">키움</option>
        </TeamSelector>
        <BPSelectBtn>
          타자
        </BPSelectBtn>
        <BPSelectBtn>
          투수
        </BPSelectBtn>
      </TeamSelectorWrapper>
      <ButtonContainer>
        <Button onClick={() => handleButtonClick('/data/battersBasic.csv')} clicked={clickedButton === '/data/battersBasic.csv'}>
          기본
        </Button>
        <Button onClick={() => handleButtonClick('/data/battersExp.csv')} clicked={clickedButton === '/data/battersExp.csv'}>
          확장
        </Button>
        <Button onClick={() => handleButtonClick('/data/battersClutch.csv')} clicked={clickedButton === '/data/battersClutch.csv'}>
          클러치
        </Button>
        <Button onClick={() => handleButtonClick('/data/battersHit1.csv')} clicked={clickedButton === '/data/battersHit1.csv'}>
          타구1
        </Button>
        <Button onClick={() => handleButtonClick('/data/battersHit2.csv')} clicked={clickedButton === '/data/battersHit2.csv'}>
          타구2
        </Button>
        <Button onClick={() => handleButtonClick('/data/battersTeambat1.csv')} clicked={clickedButton === '/data/battersTeambat1.csv'}>
          팀배팅1
        </Button>
        <Button onClick={() => handleButtonClick('data/battersSteal.csv')} clicked={clickedButton === '/data/battersSteal.csv'}>
          도루
        </Button>
        <Button onClick={() => handleButtonClick('data/battersRun.csv')} clicked={clickedButton === '/data/battersRun.csv'}>
          주루
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
