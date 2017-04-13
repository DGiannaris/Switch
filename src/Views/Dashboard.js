import React, { Component } from 'react';
import { Row } from 'antd';

class Dashboard extends Component {

	constructor(props) {
		super(props)
		this.renderName = this.renderName.bind(this)
	}


	renderName() {
		let userObj = JSON.parse(this.props.userObject);
		let userName = userObj.userName
		return userName
	}
	render() {
		return (
			<Row>
				{this.renderName}
			</Row>
		);
	}
}

export default Dashboard;