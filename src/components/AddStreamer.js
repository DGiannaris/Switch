import React, { Component } from 'react';
import { Row, Col, Button, Modal, Icon, message, notification, Input, Spin, Steps, Rate, Alert } from 'antd';
import io from 'socket.io-client';

let socket = io('http://localhost:8000')
const Search = Input.Search;
const Step = Steps.Step;
const steps = [{
	title: 'Tell us his/her name',
	content: 'Test content 1'
},
{
	title: 'How much do you love him/her?',
	content: 'Test content 2'
},
{
	title: 'Does everything looks fine?',
	content: 'Test content 3'
}]

class AddStreamer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			streamerVerifyWait: false,
			streamerPhoto: null,
			current: 0,
			streamerLoveMeter: 2,
			streamerError: false,
		}
		this.handleAlert = this.handleAlert.bind(this)
		this.streamerShouldAdd = this.streamerShouldAdd.bind(this)
	}
	componentDidMount() {
		socket.on('streamerId', data => {
			console.log(data)
			let name = ( data == 'User does not exist!' ) ? 'Wrong name' : this.state.streamerName
			let verified = ( name == 'Wrong name') ? false : true
			this.setState({
				streamerVerifyWait: false,
				streamerVerified: false,
				streamerId: data.id,
				streamerPhoto: data.logo,
				streamerName: name,
				streamerVerified: verified
			})
		})
	}

	next() {
		const current = this.state.current + 1;
		this.setState({ current });
	}
	prev() {
		const current = this.state.current - 1;
		this.setState({ current });
	}

	verifyStreamer(name) {
		//Verify valid twitch username
		console.log(name)
		if (name.match(/^[a-zA-Z0-9][\w]{3,24}$/)) {
			console.log(name)
			//Check if streamer already exists
			let stateStreamers = this.props.streamers
			let streamerNamesArr = Object.keys(stateStreamers).map(streamerId => {
				return stateStreamers[streamerId].name.toLowerCase()
			})
			let lowerCaseName = name.toLowerCase();
			if (streamerNamesArr.includes(lowerCaseName)) {
				this.setState({
					streamerError: true,
					streamerErrorDescription: "Streamer is already saved"
				})
			} else {
				this.props.checkStreamer(name)
				socket.emit('checkStreamer', name)
				this.setState({
					streamerVerifyWait: true,
					streamerName: name
				})	
			}

					
		} else {
			this.setState({
				streamerError: true,
				streamerErrorDescription: "Invalid Twitch username"
			})
		}
	}

	streamerShouldAdd() {
		let streamerInfo = {
			name: this.state.streamerName,
			id: this.state.streamerId,
			photo: this.state.streamerPhoto,
			love: this.state.streamerLoveMeter
		}
		let userId = this.props.userId
		if (localStorage.getItem('streamers-' + userId)) {
			debugger;
			let stateStreamers = this.props.streamers
			let savedStreamersArr = Object.keys(stateStreamers).map(streamerId => {
				return JSON.stringify(stateStreamers[streamerId])
			})
			
			let newStreamer = JSON.stringify(streamerInfo)
			savedStreamersArr.push(newStreamer)
			localStorage.setItem('streamers-' + userId, JSON.stringify(savedStreamersArr))

		} else {
			let streamers = []
			streamers.push(JSON.stringify(streamerInfo))
			localStorage.setItem('streamers-' + userId, JSON.stringify(streamers))
		}
		this.props.addStreamer(streamerInfo)
		console.log('action streamer add')
		message.success('Streamer Added!', 2.5)

		//Reset Steps for next streamer
		this.setState({
			streamerVerifyWait: false,
			streamerVerified: false,
			streamerPhoto: null,
			current: 0,
			streamerLoveMeter: 2,
			streamerName: 'Add your streamer'
		})
	}

	handleAlert() {
		this.setState({
			streamerError: false
		})
	}

	render() {
		return (
			<div>
				<Steps current={this.state.current} >
					{
						steps.map( item => <Step key={item.title} title={item.title} />)
					}
				</Steps>
				<div className="steps-content">
					{
						// Streamer search field
						this.state.current == 0
						?
							<div className="cs-search">
								<div className="cs-search-field">
									<p>Type a name and then press Enter</p>
									<Search
										placeholder="Name"
										onSearch={value => this.verifyStreamer(value)}
									/>
									{
										this.state.streamerError
										?
											<Alert 
												message="Error"
												description={this.state.streamerErrorDescription}
												type="error"
												closable
												onClose={this.handleAlert}
											/>
										: null
									}
									
								</div>
								<div className="cs-search-result-wrapper">
									<Spin spinning = {this.state.streamerVerifyWait}>
										<div className="cs-search-result">
											{
												this.state.streamerPhoto == null
												? <Icon type="user" />
												: <img src={this.state.streamerPhoto} />
											}
											<h2>{this.state.streamerName || 'Add your streamer' }</h2>
										</div>
									</Spin>
								</div>
						    </div>
						: null
					}

					{
						// Streamer love field
						this.state.current == 1
						?
							<div className="cs-rate">
								<p>Choose how much you love {this.state.streamerName}</p>
								<Rate
									count={3}
									defaultValue={2}
									character={<Icon type="heart" />}
									onChange={(value) => { this.setState({streamerLoveMeter: value});}}
								/>	
							</div>
						: null
					}
					{
						// Streamer review field
						this.state.current == 2
						?
							<div className="cs-review">
								<div className="cs-review-text">
									<h2>Recap:</h2>
									<p>You love <span>{this.state.streamerName}</span> as much as</p>
									<Rate
										value={this.state.streamerLoveMeter}
										disabled={true}
										character={<Icon type="heart" />}
										count={3}
									/>
								</div>
								<div className="cs-review-streamer-image">
									<h2>You know, this one</h2>
									{
										this.state.streamerPhoto == null
										? <Icon type="user" />
										: <img src={this.state.streamerPhoto} />
									}
								</div>
							</div>
						: null
					}
				</div>
				<div className="steps-action">
					{						
						this.state.current > 0
						&&
						<Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
						  {
						  	this.state.current == steps.length - 1
						  	? 'No'
						  	: 'Previous'
						  }
						</Button>
					}

					{
						(this.state.current < steps.length - 1)
						&&
						<Button
							type="primary"
							onClick={() => this.next()}
							disabled={!this.state.streamerVerified}
						>
							Next
						</Button>
					}
					{
						this.state.current === steps.length - 1
						&&
						<Button 
							type="primary"
							onClick={this.streamerShouldAdd}>
							Add {this.state.streamerName} plz!
						</Button>
					}
					
		        </div>
			</div>
			
		)
	}
}

export default AddStreamer;