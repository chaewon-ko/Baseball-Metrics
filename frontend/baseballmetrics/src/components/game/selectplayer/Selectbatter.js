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
const Help = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 5px;
  color: ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.subTransparent};
  position: relative;
  font-size: 16pt;

  &:hover {
    color: ${(props) => props.theme.subColor};
    background-color: ${(props) => props.theme.mainTransparent};

    & > article {
      display: block;
      position: absolute;
      width: 400px;
      background-color: ${(props) => props.theme.mainColor};
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      z-index: 1;
      font-size: 10pt;

      /* 텍스트 세로 가운데 정렬 스타일 추가 */
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }

  & > article {
    display: none;
  }
`;


const StyledTh = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  background-color: ${({ active, theme }) =>
    active ? theme.subTransparent : 'transparent'};
`

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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.span`
  margin: 0 5px;
  cursor: pointer;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
`;


const teamList = ['LG', 'KT', 'NC', '두산', 'SSG', 'KIA', '롯데', '삼성', '한화', '키움'];

const SelectBatter = ({ theme, onSelectBatters }) => {
  const [tableData, setTableData] = useState(null);
  const [selectedBatters, setSelectedBatters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [showArticle, setShowArticle] = useState(false);

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
          const dataWithoutEmptyRows = result.data.filter((row) =>
            Object.values(row).some(
              (value) => (value || '').toString().trim() !== ''
            )
          );

          if (dataWithoutEmptyRows.length > 0) {
            const lastRow =
              dataWithoutEmptyRows[dataWithoutEmptyRows.length - 1];
            if (
              Object.values(lastRow).every(
                (value) => (value || '').toString().trim() === ''
              )
            ) {
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
    fetchData(currentPage, sortColumn || '타율');
  }, [currentPage, sortColumn]);

  const fetchTeamData = async (team) => {
    try {
      const response = await axios.post('/teampage', {
        team: team,
      });

      const csvData = response.data;

      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        complete: function (result) {
          const dataWithoutEmptyRows = result.data.filter((row) =>
            Object.values(row).some(
              (value) => (value || '').toString().trim() !== ''
            )
          );

          if (dataWithoutEmptyRows.length > 0) {
            const lastRow =
              dataWithoutEmptyRows[dataWithoutEmptyRows.length - 1];
            if (
              Object.values(lastRow).every(
                (value) => (value || '').toString().trim() === ''
              )
            ) {
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

  const handleTeamFilter = (team) => {
    fetchTeamData(team);
  };

  const handleBatterSelect = (batter) => {
    const isAlreadySelected = selectedBatters.find(
      (selected) => selected.이름 === batter.이름
    );

    if (isAlreadySelected) {
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

    selectedNames.forEach(function (name, index) {
      if (index < 9) {
        axios
          .post('/selectplayer', {
            name: name,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.error(error);
          });
      } else {
        axios
          .post('/selectpinch', {
            name: name,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });

    onSelectBatters(selectedBatters);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (column) => {
    setSortColumn(column);
  };

  return (
    <div>
      {tableData ? (
        <>
          <h2>Decide your line-up</h2>
          <p>select 15players and click SELECT button.</p>
          <Help
            onMouseEnter={() => setShowArticle(true)}
            onMouseLeave={() => setShowArticle(false)}
          >
            ?
            {showArticle && (
              <article style={{ display: 'inline-block', marginLeft: '5px' }}>
                  <>
                    <p>출루율이 높은 선수: 타석에서 아웃을 추가하지 않고 진루할 확률이 높은 선수</p>
                    <p>장타율이 높은 선수: 타석에서 2루타 이상의 장타를 추가할 확률이 높음</p>
                    <p>BB/K가 높은 선수: 삼진을 잘 당하지 않는다</p>
                    <p>타율과 득점권타율: 보통 혹은 해당 상황에 안타를 만들어낼 확률</p>
                    <p>FO/GO: 뜬공/땅볼비율, 낮을수록 땅볼이 유도되어 병살 확률 등이 증가</p>
                    <br/>
                    <p>여러 지표를 동시에 비교하여 좋은 타자를 선택하세요.</p>
                  </>
              </article>
            )}
          </Help>
          <p>Now selected: </p>
          {selectedBatters.length > 0 && (
            <div>
              <ul>
                {selectedBatters.map((selectedBatter, index) => (
                  <li key={index}>
                    {index < 9 ? `${index + 1}번타자:` : '교체선수:'}
                    {selectedBatter.이름}
                    <StyledButton
                      onClick={() => changeOrder('up', index)}
                      disabled={index === 0}
                    >
                      UP
                    </StyledButton>
                    <StyledButton
                      onClick={() => changeOrder('down', index)}
                      disabled={index === selectedBatters.length - 1}
                    >
                      DOWN
                    </StyledButton>
                  </li>
                ))}
              </ul>
              <Link to="/game/play">
                <StyledButton onClick={handleSelect} disabled={selectedBatters.length < 15}>
                  SELECT
                </StyledButton>
              </Link>
            </div>
          )}
          <div>
            {teamList.map((team, index) => (
              <StyledButton key={index} onClick={() => handleTeamFilter(team)}>
                {team}
              </StyledButton>
            ))}
          </div>
          <StyledTableContainer>
            <StyledTable>
              <thead>
                <tr>
                  <StyledTh>Select</StyledTh>
                  {Object.keys(tableData[0]).map((header, index) => (
                    <StyledTh
                      key={index}
                      onClick={() => handleSort(header)}
                      active={sortColumn === header}
                    >
                      {header}
                    </StyledTh>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <StyledTd $isSelected={selectedBatters.includes(row)}>
                      <StyledButton onClick={() => handleBatterSelect(row)}>
                        선택
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

          <Pagination>
            {[...Array(8).keys()].map((page) => (
              <PageNumber
                key={page}
                onClick={() => handlePageClick(page + 1)}
                active={currentPage === page + 1}
              >
                {page + 1}
              </PageNumber>
            ))}
          </Pagination>
        </>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default SelectBatter;
