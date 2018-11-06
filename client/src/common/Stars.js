import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Star = styled.span`
	color: ${props => props.color || props.theme.colors.red};
	font-size: 5em;
	text-align: left;
`;

const StarsWrapper = styled.div`
	letter-spacing: -1em;
	line-height: 0;
	height: 1em;
	margin-left: -0.65em;
`;

function buildStars(coloredIn, total) {
	const stars = [];
	for (let i = 0; i < total; i++) {
		let color = null;
		if (i >= coloredIn) {
			color = "grey";
		}
		stars.push(
			<Star color={color} key={`star${i}`}>
				&#8902;
			</Star>
		);
	}

	return stars;
}

const Stars = React.memo(props => {
	return <StarsWrapper>{buildStars(props.coloredIn, props.total)}</StarsWrapper>;
});

Stars.propTypes = {
	coloredIn: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired
};

export default Stars;
