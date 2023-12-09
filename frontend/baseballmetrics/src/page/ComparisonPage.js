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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 5px;`
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
      <Help>?</Help>
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
