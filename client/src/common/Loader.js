import React from "react";
import logo from "~images/logo.png";
import smallLogo from "~images/logo-sm.png";
import styled, { keyframes } from "styled-components";

const loaderAnim = keyframes`
	0%,47%, 100% { transform: scale3d(1,1,1); }
	10% { transform: scale3d(1.25,.75,1); }
	14% { transform: scale3d(.85,1.15,1); }
	20% { transform: scale3d(1.15,.85,1); }
	24% { transform: scale3d(.95,1.05,1); }
	36% { transform: scale3d(1.05,.95,1); }
`;

const LoaderLogo = styled.img`
	animation: ${loaderAnim};
	animation-duration: 2s;
	animation-timing-function: ease;
	animation-delay: 0s;
	animation-iteration-count: infinite;
	animation-direction: normal;
	animation-fill-mode: both;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0 auto;
	height: 100vh;
	justify-content: center;
	width: 45%;
`;

export default () => {
	return <LoaderLogo src={smallLogo} />;
};

export function FullScreenLoader() {
	return (
		<Wrapper>
			<LoaderLogo src={logo} />
		</Wrapper>
	);
}
