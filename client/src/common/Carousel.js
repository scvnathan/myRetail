import React from "react";
import styled, {createGlobalStyle} from "styled-components";
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
Thumbnail.displayName = "Thumbnail";

const ThumbnailImageMask = styled.div`
	justify-content: center;
`;
ThumbnailImageMask.displayName = "ThumbnailImageMask";

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
ThumbnailBtnLeft.displayName = "ThumbnailBtnLeft";

const ThumbnailBtnRight = styled.button`
	${ThumbnailBtn};
`;
ThumbnailBtnRight.displayName = "ThumbnailBtnRight";

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
MainImage.displayName = "MainImage";

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
		text-decoration: underline;
	}
`;

const ImageModalWrapper = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	overflow: hidden;
	z-index: 2;

	> img {
		transform: scale(1.5);
		box-shadow: 0 14px 28px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
`;

const PreventScrolling = createGlobalStyle`
	html {
		> body {
			overflow: hidden;
		}
	}
`

const ModalCloseBtnWrapper = styled.div`
	position:absolute;
	top:0;
	right:50px;	
`
ModalCloseBtnWrapper.displayName = "ModalCloseBtn"

const ModalCloseBtn = styled.div`
	height: 50px;
	width: 50px;

	&:before,
	&:after {
		transform: rotate(-45deg);
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -10px / 2;
		margin-left: -50px / 2;
		display: block;
		height: 10px;
		width: 50px;
		background-color: #333;
	}

	&:after {
		transform: rotate(45deg);
	}
	&:hover {
		cursor:pointer;
	}
`;

function wrapAround(direction, index, length) {
	return (index + length + direction) % length;
}

function ViewLarger(props) {
	return (
		<ViewLargerWrapper {...props}>
			<ViewLargerIcon /> view larger
		</ViewLargerWrapper>
	);
}

const ImageModal = props => {
	return (
		<ImageModalWrapper>
			<img src={props.src} />
			<ModalCloseBtnWrapper  onClick={() => props.toggleFullscreen(false)}><ModalCloseBtn  /></ModalCloseBtnWrapper>
		</ImageModalWrapper>
	);
};

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { index: props.initial, fullscreen: false };

		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.getViewableThumbnailImages = this.getViewableThumbnailImages.bind(this);
		this.toggleFullscreen = this.toggleFullscreen.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.index !== this.state.index) return true;
		if (nextState.fullscreen !== this.state.fullscreen) return true;
		if (nextProps.maxViewable === this.props.maxViewable) return false;
		if (nextProps.images.join("") === this.props.images.join("")) return false;

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

	toggleFullscreen(fullscreen) {
		this.setState({ fullscreen });
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
				<ViewLarger  onClick={() => this.toggleFullscreen(true)} />
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
									key={imgObj.img + imgObj.index}
									src={imgObj.img}
								/>
							);
						})}
					</ThumbnailImageMask>
					<CenterThumbnailBtn>
						<ThumbnailBtnRight data-test="thumbnailBtnRight" onClick={this.next} />
					</CenterThumbnailBtn>
				</ThumbnailControl>
				{this.state.fullscreen && (
					<>
						<ImageModal data-test="imageModal" src={images[this.state.index]} toggleFullscreen={this.toggleFullscreen} />
						<PreventScrolling/>
					</>
				)}
			</CarouselWrapper>
		);
	}
}

Carousel.defaultProps = {
	maxViewable: 10,
	initial: 0
};

Carousel.propTypes = {
	images: PropTypes.array.isRequired,
	initial: PropTypes.number,
	maxViewable: PropTypes.number
};

export default Carousel;
