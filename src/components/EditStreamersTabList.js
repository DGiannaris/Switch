import React, { Component } from 'react';
import { Row, Col, Button, Modal, Icon, message, notification, Input, Spin, Steps, Rate, Alert, Card } from 'antd';



class EditStreamersTabList extends Component {
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
		console.log(id)
		console.log('remove')
		this.props.deleteStreamerFromStore(id)
	}


	render() {
		return (
			 <Row
			 	gutter={20}
			 	type="flex"
			 	align="middle"
			 	justify="space-around"
			 >
			 	{
	 				Object.keys(this.props.streamers).map(streamer => {
	 					let currentStreamer = this.props.streamers[streamer]
	 					if (currentStreamer.love == this.props.love) {
	 						return (
	 							<Col xs="6" key={currentStreamer.id}>
	 								<Card
	 									title={currentStreamer.name}
	 									bordered={false}
	 									className="edit-streamers-item"
	 								>
	 									{
	 										currentStreamer.photo
	 										?	<img src={currentStreamer.photo} />
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
	 						)
	 					}
	 				} )
	 			}
			 </Row>
		)
	}
}

export default EditStreamersTabList;