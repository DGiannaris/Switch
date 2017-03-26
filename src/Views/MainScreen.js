import React, { Component } from 'react';
import { Row, Col } from 'antd';

class MainScreen extends Component {

	constructor(props) {
		super(props)
		
		this.streamers = this.streamers.bind(this)
	}

	componentWillMount() {
		// if (localStorage.getItem('streamers')) {
		// 	let streamers = JSON.parse(localStorage.getItem('streamers'));
		// 	streamers.map(streamer => {
		// 		this.props.addStreamers(JSON.parse(streamer))
		// 	})
			
		// }
	}

	streamers() {
		let streamerNames;
		if (this.props.streamers) {
			streamerNames = Object.keys(this.props.streamers).map(streamer => {
				
				this.props.streamers[streamer].name
			})
			
		}

		debugger;
	}
	
	render() {
		return (
			<Row>
				{this.streamers()}
			</Row>
		);
	}
}

export default MainScreen;