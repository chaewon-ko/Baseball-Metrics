import React, { useState, useEffect } from 'react';
import RadarGraph from '../components/comparison/RadarGraph';
import styled from 'styled-components';
import BarGraph from '../components/comparison/BarGraph';
import { playerList } from '../players';
import { playerPList } from '../playersP';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';

const GraphDiv = styled.div`
  margin: 0 auto;
  width: 600px;
`;
const GraphDiv3 = styled.div`
  margin: 0 auto;
  width: 80%;
  min-height: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  grid-gap: 20px;
`;
const SelectPlayer = styled.div`
  display: inline-block;
  margin: 10px;
`
const Styledselect1 =  styled.select`
  color: ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.mainTransparent};
  width: 150px;
  padding: 5px;
  text-align: center;
  border-radius: 1rem;
  margin-right: 10px;
  border: 1px solid ${(props) => props.theme.mainColor};
`
const Styledselect2 =  styled.select`
  color: ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.subTransparent};
  width: 150px;
  padding: 5px;
  text-align: center;
  border-radius: 1rem;
  margin-right: 10px;
  border: 1px solid ${(props) => props.theme.mainColor};
`
const StyledButton = styled.button`
  color: ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.subTransparent};
  border-radius: 1rem;
  padding: 5px;
  width: 100px;
  border: 1px solid ${(props) => props.theme.mainColor};
  margin: 5px;
`
const SelectButton = styled.button`
  color: ${(props) => (props.selected ? props.theme.subColor : props.theme.mainColor)};
  background-color: ${(props) => (props.selected ? props.theme.mainColor : props.theme.subTransparent)};
  border-radius: 1rem;
  padding: 5px;
  width: 100px;
  border: 1px solid ${(props) => props.theme.mainColor};
  margin: 5px;
`;
const Div1 = styled.div`
  margin-bottom: 10px;
`
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
      background-color: ${(props) => props.theme.subTransparent};
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


const teamList = [
  {id: 1, name: '롯데'},
  {id: 2, name: '삼성'},
  {id: 3, name: '한화'},
  {id: 4, name: 'KIA'},
  {id: 5, name: '키움'},
  {id: 6, name: 'KT'},
  {id: 7, name: 'LG'},
  {id: 8, name: 'NC'},
  {id: 9, name: 'SSG'},
  {id: 10, name: '두산'},
]
// 구단 평균 리그 평균 구현해야 함.
const ComparisonPage = ({ theme }) => {
  const [showArticle, setShowArticle] = useState(false);
  const [selectedPlayer1, setSelectedPlayer1] = useState('선수1');
  const [selectedPlayer2, setSelectedPlayer2] = useState('선수2');
  const [selectedTeam1, setSelectedTeam1] = useState(teamList[0]);
  const [selectedTeam2, setSelectedTeam2] = useState(teamList[0]);
  const [filteredPlayers1, setFilteredPlayers1] = useState([]);
  const [filteredPlayers2, setFilteredPlayers2] = useState([]);
  const [player1, setPlayer1] = useState({ name: '', geo: [], bar: [] });
  const [player2, setPlayer2] = useState({ name: '', geo: [], bar: [] });
  const [type, setType] = useState('batter')

  useEffect(() => {
    const playersForTeam1 = filteredPlayers(selectedTeam1.id, type);
    setFilteredPlayers1(playersForTeam1);

    const playersForTeam2 = filteredPlayers(selectedTeam2.id, type);
    setFilteredPlayers2(playersForTeam2);
  }, [selectedTeam1, selectedTeam2, type]);  

  const filteredPlayers = (teamId, type) => {
    const players = type === 'batter' ? playerList : playerPList;  
    return players.filter(player => player.teamId === teamId);
  };

  const handleTypePitcher = () =>{
    setType('pitcher')
  }
  const handleTypeBatter = () =>{
    setType('batter')
  }
// 통신
  const handlePlayerSelect = async () => {
    try {
      const response = await axios.post('/compare', {
        "type": type,
        "player1": selectedPlayer1.name,
        "player2": selectedPlayer2.name,
      });

      setPlayer1({
        name: selectedPlayer1.name,
        geo: response.data.geo1.slice(1), 
        bar: response.data.bar1,
      });

      setPlayer2({
        name: selectedPlayer2.name,
        geo: response.data.geo2.slice(1),
        bar: response.data.bar2,
      });
    } catch (error) {
      console.error('Error fetching player data:', error.message);
    }
};
  
  const handlePlayer1Select = (player) => {
    setSelectedPlayer1(player);
  };
  const handlePlayer2Select = (player) => {
    setSelectedPlayer2(player);
  };
  const handleTeam1Select = (team) => {
    setSelectedTeam1(team);
  };
  const handleTeam2Select = (team) => {
    setSelectedTeam2(team);
  };
  
  return (
    <div>
      <div>
        <Div1>
        <h2>비교할 선수 선택</h2>
        <SelectButton onClick={handleTypeBatter} selected={type === 'batter'}>
          타자
        </SelectButton>
        <SelectButton onClick={handleTypePitcher} selected={type === 'pitcher'}>
          투수
        </SelectButton>
        </Div1>
        <SelectPlayer>
          <label>선수 1: </label>
          <Styledselect1 onChange={(e) => handleTeam1Select(teamList.find((p) => p.id === Number(e.target.value)))}>
            <option value="" disabled selected>팀 선택</option>
            {teamList.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </Styledselect1>
          <Styledselect1 onChange={(e) => handlePlayer1Select(filteredPlayers1.find((p) => p.id === Number(e.target.value)))}>
           <option value="" disabled selected>선수 선택</option>
            {filteredPlayers1.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </Styledselect1>
        </SelectPlayer>
        <SelectPlayer>
          <label>선수 2: </label>
          <Styledselect2 onChange={(e) => handleTeam2Select(teamList.find((p) => p.id === Number(e.target.value)))}>
          <option value="" disabled selected>팀 선택</option>
            {teamList.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </Styledselect2>
          <Styledselect2 onChange={(e) => handlePlayer2Select(filteredPlayers2.find((p) => p.id === Number(e.target.value)))}>
            <option value="" disabled selected>선수 선택</option>
            {filteredPlayers2.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </Styledselect2>
        </SelectPlayer>
      </div>
      <StyledButton onClick={handlePlayerSelect} >COMPARE</StyledButton>
      <h2>선수 능력치 비교</h2>
      <Help
        onMouseEnter={() => setShowArticle(true)}
        onMouseLeave={() => setShowArticle(false)}
      >
        ?
        {showArticle && (
          <article style={{ display: 'inline-block', marginLeft: '5px' }}>
            {type === 'batter' ? (
              <>
                <p>파워: 공을 얼마나 멀리 보낼 수 있는지</p>
                <p>컨택: 공을 얼마나 정확히 배트에 맞출 수 있는지</p>
                <p>선구안: 타석에서 볼과 스트라이크를 얼마나 잘 구별해낼 수 있는지</p>
                <p>속도: 베이스에서 베이스로 얼마나 빠르게 갈 수 있는지</p>
                <p>수비: 수비 상황에서 얼마나 안정감 있게 타구를 처리하는지</p>
                <p>멘탈: 중요 상황에 일관성 있는 혹은 더 강한 면모를 보이는지</p>
              </>
            ) : type === 'pitcher' ? (
              <>
                <p>구속: 공을 얼마나 빠르게 던질 수 있는지</p>
                <p>제구: 원하는 위치에 정확하게 공을 던지는 능력</p>
                <p>구위: 볼끝이 좋아 공이 배트에 맞아도 멀리 뻗어나가지 못하게 하는 능력</p>
                <p>체력: 한 경기에 공을 얼마나 많이 던질 수 있는지</p>
                <p>멘탈: 중요 상황에 일관성 있는 혹은 더 강한 면모를 보이는지</p>
              </>
            ) : null}
          </article>
        )}
      </Help>
      <GraphDiv>
        <RadarGraph 
        type = {type}
        label1={selectedPlayer1.name}
        label2={selectedPlayer2.name}
        theme={theme} player1={player1.geo}
        player2={player2.geo}
        />
      </GraphDiv>
      <h2>선수 성적(지표) 비교</h2>
      <p>해당 선수들의 2023년 기본 지표들을 비교합니다.</p>
      <GraphDiv3>
        <BarGraph type={type}
        label1={selectedPlayer1.name}
        label2={selectedPlayer2.name}
        theme={theme}
        player1={player1.bar}
        player2={player2.bar}
        />
      </GraphDiv3>
    </div>
  );
};

export default ComparisonPage;
