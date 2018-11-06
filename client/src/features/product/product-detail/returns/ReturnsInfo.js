import React from "react";
import styled from 'styled-components';

const ReturnsTitle = styled.h4`
	display:inline;
	margin:0;
	color: ${props => props.theme.colors.textLight};
	font-size:1.3em;
	font-weight:normal;
`

const ReturnsSeparator = styled.div`
	height:30px;
	width:2px;
	background-color:#999;
	font-size:2em;
	margin-left:10px;
	margin-right:10px;
`

const ReturnsWrapper = styled.div`
	font-weight:normal;
	display: flex;
	color:${props => props.theme.colors.textLight};
	flex-direction: row;
	align-items: center;
`

const ReturnsCopy = styled.div`
	font-size:.7em;
`

const ReturnsInfo = (props) => {
	return <ReturnsWrapper>
		<ReturnsTitle>returns</ReturnsTitle>
		<ReturnsSeparator/>
		<ReturnsCopy>{props.copy}</ReturnsCopy>
	</ReturnsWrapper>
}

export default ReturnsInfo