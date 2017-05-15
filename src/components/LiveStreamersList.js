import React, { Component } from 'react';
import { Icon, Tabs } from 'antd';
import LiveStreamersTab from './LiveStreamersTab';

const TabPane = Tabs.TabPane;

const HeartsOnTabs = ({love}) => {
	let hearts = [] 
	for (let i = 0; i < love; i++) {
		hearts.push(<Icon type="heart" key={i} />)
	}
	return (
		<div>
			{hearts}
		</div>
	)
}
export default class LiveStreamersList extends Component {
	render() {
		let loveone = [];
		let lovetwo = [];
		let lovethree = [];
		if (this.props.onlineStreamers !== 'offline') {
			let onlineStreamers = JSON.parse(this.props.onlineStreamers)
			Object.keys(onlineStreamers).map(streamer => {
				let currentStreamer = onlineStreamers[streamer]
				let storedStreamer = this.props.streamers[currentStreamer.ChannelID]
				if (storedStreamer.love === 3) {
					return lovethree.push(JSON.stringify(currentStreamer))
				} else if (storedStreamer.love === 2) {
					return lovetwo.push(JSON.stringify(currentStreamer))
				} else {
					return loveone.push(JSON.stringify(currentStreamer))
				}
			})			
		}
		return (
			<div>
				{
					(this.props.onlineStreamers !== 'offline')
					?	
						<Tabs defaultActiveKey="3">
							<TabPane
								tab={<HeartsOnTabs love="3" />}
								key="3"
							>
								<LiveStreamersTab
									onlineStreamers={JSON.stringify(lovethree)}
									love={3}
									key={3}
									className="livestreamers-tab-wrapper"
									shell={this.props.shell}

								/>
							</TabPane>
							<TabPane
								tab={<HeartsOnTabs love="2" />}
								key="2"
							>
								<LiveStreamersTab
									onlineStreamers={JSON.stringify(lovetwo)}
									love={2}
									key={2}
									className="livestreamers-tab-wrapper"
									shell={this.props.shell}
								/>
							</TabPane>
							<TabPane
								tab={<HeartsOnTabs love="1" />}
								key="1"
							>
								<LiveStreamersTab
									onlineStreamers={JSON.stringify(loveone)}
									love={1}
									key={1}
									className="livestreamers-tab-wrapper"
									shell={this.props.shell}
								/>
							</TabPane>						
						</Tabs>
					: 'Offline'
				}
				
				
				
			</div>
			
		)
	}
}
