import React from 'react';
import styled from 'styled-components';

const ExplainTitle = styled.div`
	background-color: darkgray;
`
const ExplainContent = styled.div`
	background-color: lightgray;
`

const ExplainPage = () => {
	return (
		<div>
			<b>Indicator explaination</b>
			<ExplainTitle>Indicator1</ExplainTitle>
			<ExplainContent>Explaination1</ExplainContent>
			<ExplainTitle>Indicator2</ExplainTitle>
			<ExplainContent>Explaination2</ExplainContent>
			<ExplainTitle>Indicator3</ExplainTitle>
			<ExplainContent>Explaination3</ExplainContent>
		</div>
	);
};

export default ExplainPage;