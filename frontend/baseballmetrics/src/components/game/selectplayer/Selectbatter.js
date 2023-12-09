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
  width: 90%;
  margin: auto;
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
const SelectBatter = ({ theme, onSelectBatters }) => {
  const [tableData, setTableData] = useState(null);
  const [selectedBatters, setSelectedBatters] = useState([]);
  
  const fetchData = async (page, sort) => {
    try {
      const response = await axios.post('/page', {
        page: page,
        sort: sort,
      });
  
      const csvData = response.data;
  
      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        complete: function (result) {
          // 제거할 빈 줄이 있는 경우에만 필터링
          const dataWithoutEmptyRows = result.data.filter(row => Object.values(row).some(value => (value || '').toString().trim() !== ''));
      
          // 마지막 행이 빈 줄인 경우 제거
          if (dataWithoutEmptyRows.length > 0) {
            const lastRow = dataWithoutEmptyRows[dataWithoutEmptyRows.length - 1];
            if (Object.values(lastRow).every(value => (value || '').toString().trim() === '')) {
              dataWithoutEmptyRows.pop();
            }
          }
      
          setTableData(dataWithoutEmptyRows);
        },
        error: function (error) {
          console.error('Error parsing CSV:', error.message);
        },
      });           
    } catch (error) {
      console.error('Error fetching CSV:', error.message);
    }
  };
  
  useEffect(() => {
    fetchData(1, '타율');
  }, []);
  

  const handleBatterSelect = (batter) => {
    const isAlreadySelected = selectedBatters.find(
      (selected) => selected.이름 === batter.이름
    );

    if (isAlreadySelected) {
      // 이미 선택된 선수를 선택하면 해당 선수를 제외
      const newSelectedBatters = selectedBatters.filter(
        (selected) => selected.이름 !== batter.이름
      );

      setSelectedBatters(newSelectedBatters);
    } else {
      if (selectedBatters.length < 15) {
        const newSelectedBatters = [...selectedBatters];
        newSelectedBatters.push(batter);
        setSelectedBatters(newSelectedBatters);
      } else {
        alert('최대 15명까지만 선택할 수 있습니다.');
      }
    }
  };

  const changeOrder = (direction, index) => {
    const newSelectedBatters = [...selectedBatters];

    if (direction === 'up' && index > 0) {
      [newSelectedBatters[index - 1], newSelectedBatters[index]] = [
        newSelectedBatters[index],
        newSelectedBatters[index - 1],
      ];
    } else if (direction === 'down' && index < newSelectedBatters.length - 1) {
      [newSelectedBatters[index], newSelectedBatters[index + 1]] = [
        newSelectedBatters[index + 1],
        newSelectedBatters[index],
      ];
    }

    setSelectedBatters(newSelectedBatters);
  };

  const handleSelect = () => {
    const selectedNames = selectedBatters.map((batter) => batter.이름);
    console.log(selectedNames);
    // 서버로 전송하는 부분 422 에러 뜨는 중
    selectedNames.forEach(function (name, index) {
      if (index < 9) {
        axios
          .post('/selectplayer', {
            "name": name
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
      else {
        axios
          .post('/selectpinch', {
            "name": name
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    })
    onSelectBatters(selectedBatters);
  };

  return (
    <div>
      {tableData && (
        <>
          <h2>Select the batters you want to compete against</h2>
          {selectedBatters.length > 0 && (
            <div>
              <p>Now Selected:</p>
              <ol>
                {selectedBatters.map((selectedBatter, index) => (
                  <li key={index}>
                    {selectedBatter.이름}
                    <StyledButton
                      onClick={() => changeOrder('up', index)}
                      disabled={index === 0}
                    >
                      Up
                    </StyledButton>
                    <StyledButton
                      onClick={() => changeOrder('down', index)}
                      disabled={index === selectedBatters.length - 1}
                    >
                      Down
                    </StyledButton>
                  </li>
                ))}
              </ol>
              <Link to="/game/play">
                <StyledButton onClick={handleSelect}>Select</StyledButton>
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
                    <StyledTd $isSelected={selectedBatters.includes(row)}>
                      <StyledButton onClick={() => handleBatterSelect(row)}>
                        Select
                      </StyledButton>
                    </StyledTd>
                    {Object.values(row).map((value, columnIndex) => (
                      <StyledTd
                        key={columnIndex}
                        $isSelected={selectedBatters.includes(row)}
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

export default SelectBatter;
