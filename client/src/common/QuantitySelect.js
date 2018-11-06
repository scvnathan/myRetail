import React from "react";
import styled from "styled-components";

//TODO: theme for border radius, border color

const Selector = styled.div`
	border-radius: 2px;
	border: 1px solid #999;
	padding: 4px 6px;
	font-size: 0.9em;
	width: 175px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	vertical-align: middle;
`;
const BaseQuantityButton = content => `
	:before {
		font-family: 'Roboto-Light';
		border:0;
		vertical-align:middle;
		width:26px;
		height:26px;
		border-radius:100%;
		background-color: #ccc;
		display: inline-block;
		margin:0 4px 0;
		font-size: 155%;
		text-align:center;
		color: white;
		content: '${content}'
	}
	:hover {
		cursor:pointer;
	}
`;

const IncrementButton = styled.div`
	${BaseQuantityButton("+")};
`;

const DecrementButton = styled.div`
	${BaseQuantityButton("-")};
`;

class QualitySelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = { quantity: 1 };
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}

	increment() {
		this.setState((state, props) => {
			return {
				...state,
				quantity: Math.min(state.quantity + 1, props.max)
			};
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (nextState.quantity !== this.state.quantity);
	}

	decrement() {
		this.setState((state, props) => {
			return {
				...state,
				quantity: Math.max(state.quantity - 1, 1)
			};
		});
	}

	componentDidUpdate() {
		this.props.onUpdateQuantity && this.props.onUpdateQuantity(this.state.quantity);
	}

	render() {
		return (
			<Selector>
				quantity:
				<ButtonRow>
					<DecrementButton onClick={this.decrement} />
					<strong style={{ paddingTop: "5%" }}>{this.state.quantity}</strong>
					<IncrementButton onClick={this.increment} />
				</ButtonRow>
			</Selector>
		);
	}
}

QualitySelect.defaultProps = {
	max: 10
};

export default QualitySelect;
