import React, { useState, useEffect } from 'react';
import RadarGraph from '../components/comparison/RadarGraph';
import styled from 'styled-components';
import BarGraph from '../components/comparison/BarGraph';
import { playerList } from '../players';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';

const GraphDiv = styled.div`
  margin: 0 auto;
  width: 600px;
`;

const GraphDiv3 = styled.div`
  margin: 0 auto;
  width: 30%;
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

`
const Styledselect2 =  styled.select`
  color: ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.subTransparent};
  width: 150px;
  padding: 5px;
  text-align: center;
  border-radius: 1rem;
  margin-right: 10px;

`

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
// 통신으로 받아와야할 선수들 데이터 선수 두명 + 해당 선수 구단/리그 평균(11개 데이터 이건 그냥 프론트에 박아놓을까?)
const ComparisonPage = ({ theme }) => {
  const [selectedPlayer1, setSelectedPlayer1] = useState(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState(null);
  const [selectedTeam1, setSelectedTeam1] = useState(teamList[0]);
  const [selectedTeam2, setSelectedTeam2] = useState(teamList[0]);
  const [filteredPlayers1, setFilteredPlayers1] = useState([]);
  const [filteredPlayers2, setFilteredPlayers2] = useState([]);
  const [player1, setPlayer1] = useState({ name: '', geo: [], bar: [] });
  const [player2, setPlayer2] = useState({ name: '', geo: [], bar: [] });

  useEffect(() => {
    // Player 1을 위해 선택된 팀에 따라 선수 필터링
    const playersForTeam1 = filteredPlayers(selectedTeam1.id);
    setFilteredPlayers1(playersForTeam1);

    // Player 2을 위해 선택된 팀에 따라 선수 필터링
    const playersForTeam2 = filteredPlayers(selectedTeam2.id);
    setFilteredPlayers2(playersForTeam2);
  }, [selectedTeam1, selectedTeam2]);

  const filteredPlayers = (teamId) => playerList.filter(player => player.teamId === teamId);

  const handlePlayerSelect = async () => {
    try {
      const response = await axios.post('/compare', {
        "type": 'batter',
        "player1": selectedPlayer1.name,
        "player2": selectedPlayer2.name,
      });

      setPlayer1({
        name: selectedPlayer1.name,
        geo: response.data.geo1,
        bar: response.data.bar1,
      });

      setPlayer2({
        name: selectedPlayer2.name,
        geo: response.data.geo2,
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
        <h2>비교할 선수 선택</h2>
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
      <button onClick={handlePlayerSelect} >COMPARE</button>
      <h2>RadarGraph</h2>
      <GraphDiv>
        <RadarGraph theme={theme} player1={player1.geo} player2={player2.geo} />
      </GraphDiv>
      <h2>Bar Graph</h2>
      <GraphDiv3>
        <BarGraph theme={theme} player1={player1.bar} player2={player2.bar} />
        {/* <BarGraph theme={theme} player1={selectedPlayer1.bar} player2={selectedPlayer2.bar} />
        <BarGraph theme={theme} player1={selectedPlayer1.bar} player2={selectedPlayer2.bar} /> */}
      </GraphDiv3>
    </div>
  );
};

export default ComparisonPage;
