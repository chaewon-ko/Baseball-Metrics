import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 5px;
`;

const Styledstrong = styled.strong`
  font-size: 25px;
	display: block;
	margin-top: 10px;
	text-align: left;
`

const SBOCount = ({ outs }) => {
  const balls = 3;
  const strikes = 2;
  const maxOuts = 2;

  const getCircleColor = (count, maxCount, color) => {
    return count <= maxCount ? color : 'transparent';
  };

  return (
    <div>
      <Styledstrong>
        B
        {[...Array(balls)].map((_, index) => (
          <Circle
            key={index}
            style={{ backgroundColor: getCircleColor(index + 1, balls, 'lightgreen') }}
          />
        ))}
      </Styledstrong>
      <Styledstrong>
        S
        {[...Array(strikes)].map((_, index) => (
          <Circle
            key={index}
            style={{ backgroundColor: getCircleColor(index + 1, strikes, 'lightyellow') }}
          />
        ))}
      </Styledstrong>
      <Styledstrong>
        O
        {[...Array(maxOuts)].map((_, index) => (
          <Circle
            key={index}
            style={{
              backgroundColor:
                index < outs ? 'red' : 'lightcoral',
            }}
          />
        ))}
      </Styledstrong>
    </div>
  );
};

export default SBOCount;
