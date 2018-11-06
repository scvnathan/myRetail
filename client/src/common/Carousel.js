import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import arrow from "~images/arrow.png";
import magnifyIcon from "~images/magnify.png";

const thumbWidth = 64;
const Thumbnail = styled.img`
	width: ${thumbWidth}px;
	height: ${thumbWidth}px;
	border: 1px solid transparent;
	:hover {
		cursor: pointer;
	}
	${props =>
		props.isSelected
			? `	border-radius:3px;
			border:1px solid #999;`
			: ""};
`;
Thumbnail.displayName = 'Thumbnail'

const ThumbnailImageMask = styled.div`
	justify-content: center;
`;
ThumbnailImageMask.displayName = 'ThumbnailImageMask'

const ThumbnailControl = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: 10px;
`;

const ThumbnailBtn = `
	border: 0;
	width:10px;
	height:19px;
	background: url(${arrow}) no-repeat;
	:hover {
		cursor:pointer;
	}
`;

const ThumbnailBtnLeft = styled.button`
	${ThumbnailBtn};
	transform: scaleX(-1);
`;
ThumbnailBtnLeft.displayName = 'ThumbnailBtnLeft'

const ThumbnailBtnRight = styled.button`
	${ThumbnailBtn};
`;
ThumbnailBtnRight.displayName = 'ThumbnailBtnRight'

const CenterThumbnailBtn = styled.div`
	padding: 0 15px 0;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const MainImage = styled.img`
	margin: 0 auto 5em;
	max-width: 100%;
`;
MainImage.displayName = 'MainImage'

const CarouselWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ViewLargerIcon = styled.div`
	display: inline-block;
	background: url('${magnifyIcon}') no-repeat;
	width: 27px;
	height:27px;
	margin-right:10px;
`;

const ViewLargerWrapper = styled.div`
	color: #777;
	flex-direction: row;
	display: flex;
	align-items: center;
	font-size: 0.9em;
	:hover {
		cursor: pointer;
	}
`;

//TODO: Implement enlarging the main image. Could use a simple portal
function ViewLarger(props) {
	return (
		<ViewLargerWrapper {...props}>
			<ViewLargerIcon /> view larger
		</ViewLargerWrapper>
	);
}

function wrapAround(direction, index, length) {
	return (index + length + direction) % length;
}

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { index: props.initial };

		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.getViewableThumbnailImages = this.getViewableThumbnailImages.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.index !== this.state.index) {
			return true;
		}
		if (nextProps.maxViewable === this.props.maxViewable) return false;
		if (nextProps.images.join('') === this.props.images.join('')) return false;
		return true;
	}

	next() {
		this.setState((state, props) => ({
			index: wrapAround(1, state.index, props.images.length)
		}));
	}

	prev() {
		this.setState((state, props) => ({
			index: wrapAround(-1, state.index, props.images.length)
		}));
	}

	selectIndex(index) {
		this.setState({ index });
	}

	//Note: Instead of centering the active image, it might be less jarring to instead anchor/put the active
	//image toward the direction in the list the user clicked
	getViewableThumbnailImages(images, maxViewable, startingIndex) {
		const packImageObj = (img, index) => ({ img, index });
		const outputImages = [packImageObj(images[startingIndex], startingIndex)];

		let direction = 1;
		let rightCursor = startingIndex;
		let leftCursor = startingIndex;
		let added = 0;

		//Probably done in a roundabout way...
		//The idea is we have a start index and then alternate between either side of the images index until we populate
		//the outputImages array
		for (let i = 0; i < images.length; i++) {
			if (direction === 1 && rightCursor !== images.length - 1) {
				rightCursor = rightCursor + direction;
				outputImages.push(packImageObj(images[rightCursor], rightCursor));
				added++;
			}

			//Try to add the next image from the left
			if (direction === -1 && leftCursor !== 0) {
				leftCursor = leftCursor + direction;
				outputImages.unshift(packImageObj(images[leftCursor], leftCursor));
				added++;
			}

			//subtract one for our initial image added above
			if (added === maxViewable - 1) break;
			direction = direction === 1 ? -1 : 1;
		}

		return outputImages;
	}

	render() {
		const { images, maxViewable } = this.props;
		return (
			<CarouselWrapper data-test={"carousel"}>
				<MainImage src={images[this.state.index]} />
				<ViewLarger />
				<ThumbnailControl>
					<CenterThumbnailBtn>
						<ThumbnailBtnLeft data-test="thumbnailBtnLeft" onClick={this.prev} />
					</CenterThumbnailBtn>
					<ThumbnailImageMask>
						{this.getViewableThumbnailImages(images, maxViewable, this.state.index).map(imgObj => {
							return (
								<Thumbnail
									isSelected={imgObj.index === this.state.index}
									onClick={() => this.selectIndex(imgObj.index)}
									key={imgObj.img+imgObj.index}
									src={imgObj.img}
								/>
							);
						})}
					</ThumbnailImageMask>
					<CenterThumbnailBtn>
						<ThumbnailBtnRight data-test="thumbnailBtnRight" onClick={this.next} />
					</CenterThumbnailBtn>
				</ThumbnailControl>
			</CarouselWrapper>
		);
	}
}

Carousel.defaultProps = {
	maxViewable: 10,
	initial: 0
}

Carousel.propTypes = {
	images: PropTypes.array.isRequired,
	initial: PropTypes.number,
	maxViewable: PropTypes.number
};

export default Carousel;
