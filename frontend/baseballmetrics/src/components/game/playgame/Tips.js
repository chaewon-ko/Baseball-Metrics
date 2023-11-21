import React from 'react';
import styled from 'styled-components';

const Tipbox = styled.div`
	border: 1px solid white;
	border-radius: 1rem;
	padding-left: 10px;
	padding-right: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
	background-color: navy;
`

const Tips = ({children}) => {
	return (
		<Tipbox>
			<h3>Tips</h3>
			<p>{children}</p>
		</Tipbox>
	);
};

export default Tips;