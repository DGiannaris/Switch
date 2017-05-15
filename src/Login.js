/*global FB*/
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Icon, Row, Col } from 'antd';

class FacebookBtn extends Component {
	
	constructor(props) {
	      super(props);
	      this.responseFacebook = this.responseFacebook.bind(this)	      
	}

	componentDidMount() {
		
		let ipc = this.props.ipc;

		ipc.on('fbReply', (event, arg) => {
			console.log('reply = ' + arg)
			this.responseFacebook(arg)
		})

		ipc.on('fbLogoutReply', (event, arg) => {
			console.log(arg)
		})
	}

	responseApi (authResponse) {
		FB.api('/me', { fields: this.props.fields }, (me) => {
			me.accessToken = authResponse.accessToken;
			this.responseFacebook(me);
		});
	};

	checkLoginState (response) {
		if (response.authResponse) {
				this.responseApi(response.authResponse);
		} else {
			if (this.responseFacebook) {
				this.responseFacebook({ status: response.status });
			}
		}
	};

	responseFacebook(response) {
	    this.props.logUserAction(response);
	    console.log(response);
	    browserHistory.push('/dashboard')
	    let userObject = JSON.stringify(response)
	    //debugger;
	    localStorage.setItem('userObject', userObject)
	    console.log('LS')
	}


	clickHandler() {
		FB.login(this.checkLoginState.bind(this), {scope: "public_profile, email, user_friends"})
	}

	logOutBtn() {
		// FB.api('/me/permissions', 'delete', function(response) {
		//     console.log(response.success); // true for successful logout.
		// });
		let ipc = this.props.ipc
		ipc.send('fbLogout')
		this.props.logUserAction();
		localStorage.removeItem('userObject')
		browserHistory.push('/')
	}

	electronFb() {
		let ipc = this.props.ipc
		console.log('clicked')

		ipc.send('fbBtn', 'electron btn clicked!')
	}

	render() {
		return (
			<div>
				{
					<div>
						{
							this.props.logUserState
							? <Row type="flex" className="menu-items-wrapper logout-menu-item">
									<Col span={24}>										
										<Row className="menu-item" type="flex">
											<Col span={6} className="menu-item-icon">
												<Icon type="logout" />
											</Col>
											<Col span={18} className="menu-item-setting">
												<a onClick={this.logOutBtn.bind(this)}>Logout</a>
											</Col>
										</Row>
									</Col>
								</Row>
							: 
							<div className="login-screen-btn-wrapper">
								{
									//<Button className="fb-btn fb-login-btn" type="primary" size="large" onClick={this.clickHandler.bind(this)}>
									//	Login with Facebook <Icon type="user" />
									//</Button>
								}
								<Button
									className="fb-btn fb-login-btn"
									type="primary"
									size="large"
									onClick={this.electronFb.bind(this)}
								>
									Login with Facebook <Icon type="user" />
								</Button>

							</div>
						}
						
						
					</div> 
				}
			</div>
			
		)
	}
}


export default FacebookBtn;