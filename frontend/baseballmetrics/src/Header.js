import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { themes } from './themes';

const StyledDiv = styled.div`
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.subColor};
  height: 80px;
  font-size:20px;
	display: grid;
	grid-template-columns: repeat(6,1fr);
	align-items: center;
	justify-items: center;
`;

const StyledLink = styled(Link)`
  margin-right: 10px;
  color: #fff;
	text-decoration: none;
`;

const ThemeSelector = styled.select`
  background-color: ${(props) => props.theme.subColor};
  color: ${(props) => props.theme.mainColor};
  cursor: pointer;
  border: none;
  margin-right: 10px;
`;

const Header = ({onThemeChange}) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  const changeTheme = (selectedTheme) => {
    setCurrentTheme(selectedTheme);
    onThemeChange(selectedTheme);
  };
  
  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <StyledDiv>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/record">Record</StyledLink>
        <StyledLink to="/game">Game</StyledLink>
        <StyledLink to="/compare">Comparison</StyledLink>
        <StyledLink to="/explaination"> </StyledLink>
        <ThemeSelector value={currentTheme} onChange={(e) => changeTheme(e.target.value)}>
          {Object.keys(themes).map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </ThemeSelector>
      </StyledDiv>
    </ThemeProvider>
  );
};

export default Header;
