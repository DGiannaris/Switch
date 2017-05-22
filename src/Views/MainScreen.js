import React, { Component } from 'react';
import { Row, Col, Spin, notification, Alert } from 'antd';
import LiveStreamersList from '../components/LiveStreamersList';

class MainScreen extends Component {

	constructor(props) {
		super(props)
		this.hasUpdate = this.hasUpdate.bind(this)
	}

	state = {
		firstFetch: true
	}

	componentWillMount() {
		let socket = this.props.socket;

		// Make an array of streamers IDs
		let streamersArr = Object.keys(this.props.streamers).map(streamer => {
			
			return this.props.streamers[streamer].id
		})
		let data = {
			streams: streamersArr
		}
		// If this is the first time, send it to the server and wait for a response
		if (this.state.firstFetch) {
			socket.emit('getLivestreams', data)
		}		
	}

	componentDidMount() {
		let socket = this.props.socket
		socket.on('streamersStatus', data => {
			let propsOnline = (data === 'offline') ? 'offline' : this.props.onlineStreamers
			let oldStreamersArr = (propsOnline && propsOnline !== 'offline') ? JSON.parse(propsOnline) : ['']
			this.props.fetchedStreamers(data)
			this.setState({firstFetch:false})

			
			if (this.props.onlineStreamers !== 'offline') {
				
				let newStreamersArr = data
				let oldStreamersStringArr = oldStreamersArr.map(element => {
					return JSON.stringify(element.ChannelID)
				}).sort()
				let newStreamersStringArr = newStreamersArr.map(element => {
					return JSON.stringify(element.ChannelID)
				}).sort()
				let diffArr = [];
				newStreamersStringArr.map((element, i) => {
					return (

						element !== oldStreamersStringArr[i]
						? 
							() => {
								let notificationBody = {
									'streamer': newStreamersArr[i].Name,
							 		'id': newStreamersArr[i].ChannelID,
							 		'game': newStreamersArr[i].Game
								}
								diffArr.push(JSON.stringify(notificationBody))
							}
							
						: null
					)
					 
					 
				})
				diffArr.map(body => {
					return this.openNotification(body)
				})
				diffArr = [];
				
			}
		})
		
		
	}


	componentWillUnmount() {
		window.onbeforeunload = null; // remove event handler for normal unmounting
	}
	
	openNotification = (body) => {
		// let onlineStreamers = JSON.parse(this.props.onlineStreamers)
		// let Straemername = this.props.streamers[streamer].name
		// let game = onlineStreamers[streamer].Game
		// debugger;
		let info = JSON.parse(body)
		notification.open({
	    message: info.streamer + ' is online',
	    description: (info.game.length > 1) ? 'Playing ' + info.game : 'Playing something weird...',
	  });
	}

	hasUpdate() {
		console.log('has update called')
		let appVersion = localStorage.getItem('appVersion')
		let latestVersion = localStorage.getItem('latestVersion')
		if (latestVersion > appVersion) {
			console.log('has update')
			return <Alert message="Update Available" type="warning" closable />
			
		}
		return <p>test</p>
	}

	render() {
		let appVersion = localStorage.getItem('appVersion')
		let latestVersion = localStorage.getItem('latestVersion')
		return (
			<div> 
				{
					latestVersion > appVersion
					? <Alert banner message={`Update available (${latestVersion}). Go to settings to download.`} type="warning" closable />
					: null
				}
				<Row
				 	type="flex"
				 	justify="center"
				 	className="livestreamers-wrapper"
				>
					<Col xs={24}>
		          		<Spin spinning={this.state.firstFetch}>
		          		{
		          			this.state.firstFetch
		          			? <div className="fetching-msg">Fetching live streamers...</div>
	          				: 	<LiveStreamersList
			          				onlineStreamers={this.props.onlineStreamers}
			          				streamers={this.props.streamers}
			          				shell={this.props.shell}
			          			/>
		          		}
		          		</Spin>

					</Col>
				</Row>
			</div>
		);
	}
}

export default MainScreen;