import React from "react";
import styled from "styled-components";

const List = styled.ul`
	margin: 0 0 0 1em;
	padding: 0;
	color: #777;
`;

const Item = styled.li`
	color: #777;
	margin-bottom: 0.5em;
`;

const Highlights = styled.h1`
	font-weight: normal;
`;

export default props => {
	const features = props.features;
	return (
		<div>
			<Highlights>product highlights</Highlights>
			<List>
				{features.map(feature => {
					return <Item key={feature}>{feature}</Item>;
				})}
			</List>
		</div>
	);
};
