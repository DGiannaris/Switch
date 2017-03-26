import React, { Component } from 'react';
import { Row, Col } from 'antd';

class Dashboard extends Component {

	constructor(props) {
		super(props)
		this.renderName = this.renderName.bind(this)
	}


	renderName() {
		let userObj = JSON.parse(this.props.userObject);
		let userName = userObj.userName
		return 'text'
	}
	render() {
		return (
			<Row>
				{this.renderName()}
			</Row>
		);
	}
}

export default Dashboard;