import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Logo from '../assets/logo.svg';

class LoginScreen extends Component {
  render() {
    return (
		<Row type="flex" justify="center" align="middle" className="loginscreen-wrapper">
			<Col span={14}>
				<Row type="flex" className="logo-wrapper" justify="center">
					<Col span={16}>
						<img src={Logo} alt="Logo" />
					</Col>
				</Row>
				<Row type="flex" className="login-intro">
					<Col span={24}>
						<h1>Manage your favourite streamers</h1>
					</Col>
				</Row>
			</Col>
		</Row>
    );
  }
}

export default LoginScreen;