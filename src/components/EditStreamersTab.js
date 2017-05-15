import React, { Component } from 'react';
import { Row, Col, Button, Icon, Rate, Card } from 'antd';



class EditStreamersTab extends Component {
	constructor(props) {
		super(props)
		this.rateChange = this.rateChange.bind(this)
		this.removeStreamer = this.removeStreamer.bind(this)
	}


	rateChange(streamer,value) {
		console.log(streamer.name + ' and ' + value)
		// Change love on streamer on state

		let streamerInfo = {
			name: streamer.name,
			photo: streamer.photo,
			id: streamer.id,
			love: value
		}

		this.props.addStreamer(streamerInfo)
	}

	removeStreamer(id) {
		let socket = this.props.socket
		this.props.deleteStreamerFromStore(id)
		socket.emit('resetAll')
		let streamersArr = Object.keys(this.props.streamers).map(streamer => {			
			return this.props.streamers[streamer].id
		})
		let data = {
			streams: streamersArr
		}
		socket.emit('removeStreamer', id)
		socket.emit('getLivestreams', data)
	}


	render() {
		return (
			 <Row
			 	gutter={20}
			 	type="flex"
			 	align="middle"
			 	justify="start"
			 	className="edit-streamers-tab-wrapper"
			 >				
				{
					this.props.streamers
					?
						Object.keys(this.props.streamers).map(streamer => {
		 					let currentStreamer = this.props.streamers[streamer]		 					 	
 					 		return (
 					 			currentStreamer.love === parseInt(this.props.love, 10)
 					 			?
	 					 			<Col xs={8} key={`tab-${currentStreamer.id}`}>
		 					 			<Card
		 									title={currentStreamer.name}
		 									bordered={false}
		 									className="edit-streamers-item"
		 								>
		 									{
		 										currentStreamer.photo
		 										?	<img src={currentStreamer.photo} alt="Streamer Profile" />
		 										: 	<Icon type="user" />
		 									}
		 									<div className="edit-streamers-buttons-wrapper">
			 									<Button
			 										type="danger"
			 										onClick={() => this.removeStreamer(currentStreamer.id)}
			 									>
			 										Remove <Icon type="delete" />
			 									</Button>
			 									<div className="love-meter-wrapper">
				 									<Rate
														value={this.props.streamers[streamer].love}
														character={<Icon type="heart" />}
														count={3}
														onChange={(value) => this.rateChange(currentStreamer, value)}
													/>
			 									</div>
		 									</div>
		 								</Card>
		 							</Col>
		 						: null
 					 		)		 					 	
						})
					: <p>Empty... Please add a streamer</p>
				}					
				
			 </Row>
		)
	}
}

export default EditStreamersTab;