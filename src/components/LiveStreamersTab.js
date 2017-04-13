import React, { Component } from 'react';
import { Row, Col, Icon, Card } from 'antd';



export default class LiveStreamersTab extends Component {
	render () {
		let onlineStreamers = JSON.parse(this.props.onlineStreamers)
		return (

			<Row
					type="flex"
					align="top"
					justify="start"
					className="livestreamers-tab-wrapper"
				>
					<Col span={24}>
						<Row
							gutter={20}
						 	type="flex"
						 	align="middle"
						 	justify="start"
						 	className="livestreamers livestreamers-3love"
						>							
							{	
								
				 				onlineStreamers.map((streamer, i) => {
				 					let currentStreamer = JSON.parse(streamer)
				 						return (
				 						<Col xs={24} md={12} lg={6} key={currentStreamer.ChannelID}>
				 							<a href={`http://twitch.tv/${currentStreamer.Name}`} target="_blank">
						 						<Card
						 							title={currentStreamer.Name}
						 							bordered={false}
						 							className="edit-streamers-item"
						 						>
						 							<img 
						 								src={currentStreamer.PreviewImg + '?' + new Date().getTime()}
						 								alt="Streamer Preview"
						 							/>
						 							<div className="livestreamer-info">
						 								<div className="livestreamer-visible-info">
							 								<p><Icon type="user" /> {currentStreamer.Viewers}</p>
							 								<p><Icon type="video-camera" /> {currentStreamer.Game}</p>
						 								</div>
						 								<div className="livestreamers-hidden-info">
						 									<p><Icon type="link" /> Open in browser</p>
						 								</div>
						 							</div>
						 						</Card>
						 					</a>
				 						</Col>
				 					)					
					 			})
					 		}
						</Row>
					</Col>
				</Row>
		)
	}
}