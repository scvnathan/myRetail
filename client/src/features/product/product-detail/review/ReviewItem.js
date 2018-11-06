import React from "react";
import styled from 'styled-components';
import {formatDate} from "~root/util/DateFormat";
import Stars from "~root/common/Stars"

const Body = styled.div`
	line-height:1.35em;
	margin-bottom: 2em;
	font-size:.9em;
	padding-right:.5em;
`

const ReviewItem = (props) => {
	//TODO: This should probably be calculated in a selector or ideally on the server
	const dateReviewed = formatDate(props.datePosted);

	return <>
		<Stars coloredIn={props.rating} total={5}/>
		<Body>{props.review}</Body>
		<a href='#'>{props.screenName}</a> {dateReviewed}
	</>
}

export default ReviewItem