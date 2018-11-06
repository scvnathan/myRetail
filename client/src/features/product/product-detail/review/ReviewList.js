import React from 'react';
import styled from 'styled-components';
import Stars from "~root/common/Stars"
import TopProTopCon from './TopProTopCon';

const ReviewWrapper = styled.div`
	background-color: #f6f5f5;
	margin-top:2em;
`

const ReviewsHeader = styled.div`
	background-color: white;
	display:flex;
	align-items: center;
	justify-content: space-between;
`

const ViewAll = styled.button`
	border:0;
	background: none;
	font-weight:bold;
	font-size:1em;
	:hover {
		cursor:pointer;
		text-decoration: underline;
	}
`

const StarsWrapper = styled.div`
	display:flex;
	flex-direction: row;
	align-items: center;
	vertical-align: middle;
	margin:1em 0 1em;
`

const OverallStars = styled.strong`
	padding-left:15px;
	font-size:.9em;
`

export default props => {
	if (props.reviews.total === 0) {
		return null;
	}

	return (
		<ReviewWrapper>
			<ReviewsHeader>
				<StarsWrapper>
					<Stars coloredIn={props.reviews.overallRating} total={5}/>
					<OverallStars>overall</OverallStars>
				</StarsWrapper>
				<ViewAll>view all {props.reviews.total} reviews</ViewAll>
			</ReviewsHeader>

			<TopProTopCon topPro={props.reviews.topPro} topCon={props.reviews.topCon} />
		</ReviewWrapper>
	)
}