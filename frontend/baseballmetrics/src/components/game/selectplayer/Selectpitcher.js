import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StyledTableContainer = styled.div`
  overflow-x: auto;
  max-width: 100%;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
`;

const StyledTh = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 수정된 부분: $isSelected prop 제거, 선택된 행에 배경색 적용
const StyledTd = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.subColor : 'transparent'};
  color: ${({ $isSelected }) => ($isSelected ? 'white' : 'inherit')};
`;


const StyledButton = styled.button`
  background-color: ${(props) => props.theme.mainColor};
  border: none;
  color: white;
  padding: 4px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
`;


const Selectpitcher = ({theme}) => {
  const [tableData, setTableData] = useState(null);
  const [selectedPitcher, setSelectedPitcher] = useState(null);

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

  const handlePitcherSelect = (pitcher) => {
    setSelectedPitcher(pitcher);

    axios.post('/selectpitcher', {
      "name": "페디" //일단 페디로 설정 눌렀을 때 이름 넣으면 될 듯
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  return (
    <div>
      {tableData && (
        <>
          <h2>Select the pitcher you want to compete against</h2>
          {selectedPitcher && (
            <div>
              <p>Now Selected: {selectedPitcher.이름}</p>
              <Link to="/game/batter">
                <StyledButton>Select</StyledButton>
              </Link>
            </div>
          )}

          <StyledTableContainer>
            <StyledTable>
              <thead>
                <tr>
                  <StyledTh>Select</StyledTh>
                  {Object.keys(tableData[0]).map((header, index) => (
                    <StyledTh key={index}>{header}</StyledTh>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {/* isSelected prop 대신 $isSelected 속성 사용 */}
                    <StyledTd $isSelected={selectedPitcher === row}>
                      <StyledButton onClick={() => handlePitcherSelect(row)}>
                        Select
                      </StyledButton>
                    </StyledTd>
                    {Object.values(row).map((value, columnIndex) => (
                      // isSelected prop 대신 $isSelected 속성 사용
                      <StyledTd
                        key={columnIndex}
                        $isSelected={selectedPitcher === row}
                      >
                        {value}
                      </StyledTd>
                    ))}
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </StyledTableContainer>
        </>
      )}
    </div>
  );
};

export default Selectpitcher;
