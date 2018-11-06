import styled from "styled-components";

const Separator = styled.div`
	width: ${props => props.width || "200px"};
	height: 1px;
	background-color: #ccc;
	margin: ${props => props.margin || 0};
`;

export default Separator;
