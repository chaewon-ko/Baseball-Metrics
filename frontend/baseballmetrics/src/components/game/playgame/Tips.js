import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { themes } from '../../../themes';
import { useEffect } from 'react';

const Tipbox = styled.div`
  border: 1px solid white;
  border-radius: 1rem;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.subColor};
`;


const Tips = ({ children, theme }) => {
  return (
    <ThemeProvider theme={themes[theme]}>
      <Tipbox>
        <h3>Tips</h3>
        <p>{children}</p>
      </Tipbox>
    </ThemeProvider>
  );
};

export default Tips;
