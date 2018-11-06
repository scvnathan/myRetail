import React from "react";
import styled from 'styled-components';
import moment from 'moment';
import Stars from "~root/common/Stars"

const Body = styled.div`
	line-height:1.35em;
	margin-bottom: 2em;
	font-size:.9em;
	padding-right:.5em;
`

const ReviewItem = (props) => {
	//TODO: This should probably be calculated in a selector or ideally on the server
	const dateReviewed = moment(props.datePosted).format(props.dateFormat || 'MMMM DD, YYYY');

	return <>
		<Stars coloredIn={props.rating} total={5}/>
		<Body>{props.review}</Body>
		<a href='#'>{props.screenName}</a> {dateReviewed}
	</>
}

export default ReviewItem