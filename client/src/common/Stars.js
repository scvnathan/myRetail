import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import starImg from "~images/star.png";

const Star = styled.img`
	filter: ${props => (props.grayedOut ? "grayscale(100%) contrast(0.1)" : "")};
	font-size: 5em;
	text-align: left;
`;

const StarsWrapper = styled.div`
	margin-left: -2px;
`;

function buildStars(coloredIn, total) {
	const stars = [];
	for (let i = 0; i < total; i++) {
		stars.push(<Star grayedOut={i >= coloredIn} src={starImg} key={`star${i}`} />);
	}

	return stars;
}

const Stars = React.memo(props => {
	return <StarsWrapper>{buildStars(props.coloredIn, props.total)}</StarsWrapper>
});

Stars.propTypes = {
	coloredIn: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired
};

export default Stars;
