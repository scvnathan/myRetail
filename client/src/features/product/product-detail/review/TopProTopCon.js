import React from "react";
import Separator from "~root/common/Separator"
import styled from 'styled-components';
import ReviewItem from './ReviewItem';

const Rows = styled.div`
	display: flex;
	flex-direction: row;
`

const TopProTopCon = styled.div`
	padding:1em;
`

const TopReview = props => {
	return <div></div>
}

const ProConTitle = styled.h2`
	font-weight:normal;
	margin-bottom:0;
`
const ProConSubtitle = styled.div`
	font-weight:normal;
	font-size:.90em;
	color:grey;
`

const ReviewBox = styled.div`
	width:50%;
`

export default (props) => {
	return <TopProTopCon>
		<Rows>
			<ReviewBox>
				<ProConTitle>PRO</ProConTitle>
				<ProConSubtitle>most helpful 4-5 star review</ProConSubtitle>
			</ReviewBox>
			<ReviewBox>
				<ProConTitle>CON</ProConTitle>
				<ProConSubtitle>most helpful 1-2 star review</ProConSubtitle>
			</ReviewBox>
		</Rows>
		<Rows>
			<Separator margin={'1em 0 1em'} width={'100%'}/>
		</Rows>
		<Rows>
			<ReviewBox>
				<ReviewItem rating={props.topPro.overallRating} review={props.topPro.review}
				            screenName={props.topPro.screenName} datePosted={props.topPro.datePosted}/>
			</ReviewBox>
			<ReviewBox>
				<ReviewItem rating={props.topCon.overallRating} review={props.topCon.review}
				            screenName={props.topCon.screenName} datePosted={props.topCon.datePosted}/>
			</ReviewBox>
		</Rows>
	</TopProTopCon>
}