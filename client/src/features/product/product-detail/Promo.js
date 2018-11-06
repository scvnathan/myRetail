import React from "react";
import promoImage from "~images/promo.png";
import styled from "styled-components";

const List = styled.ul`
	list-style-image: url('${promoImage}');
	margin-left:25px;
	padding-left:0;
`;
const Item = styled.li`
	margin-bottom: 5px;
	color: #cc0000;
	font-size: 1.25em;
`;

export default props => {
	return (
		<List>
			{props.promos.map(promo => {
				return <Item key={promo.shortDescription}>{promo.shortDescription.toLowerCase()}</Item>;
			})}
		</List>
	);
};
