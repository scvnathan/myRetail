import styled from "styled-components";

const Common = styled.button`
	width: 240px;
	height: 40px;
	color: white;
	font-size: 1.25em;
	padding: 4px;
	border-radius: 3px;
	font-weight: lighter;
	font-family: "Roboto-Light", sans-serif;
	margin: ${props => props.margin || 0};
	:hover {
		cursor: pointer;
	}
`;

//TODO: Extract disabled styles, move differences to theme.js
export const PrimaryButton = styled(Common)`
	${props => (props.disabled ? "border:1px solid #444;" : "border:1px solid #cc0000;")} ${props =>
		props.disabled ? "" : "background: linear-gradient(to bottom, #ff776b 0%, #ce0000 86%);"}
	:active {
		${props => (props.disabled ? "" : "background: #df0000;")};
	}
`;
PrimaryButton.displayName = 'PrimaryButton'

export const SecondaryButton = styled(Common)`
	border: 1px solid black;
	background: #727272;
	background: linear-gradient(to bottom, #727272 0%, #0e0e0e 67%);
	:active {
		background: #0e0e0e;
	}
`;
SecondaryButton.displayName = 'SecondaryButton'

export const TertiaryButton = styled.button`
	border-radius: 3px;
	background-color: #f3f3f3;
	border: 0;
	width: 154px;
	height: 27px;
	letter-spacing: 0em;
	color: #444;
	:hover {
		cursor: pointer;
	}
`;
TertiaryButton.displayName = 'TertiaryButton'
