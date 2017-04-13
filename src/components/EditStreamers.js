import React, { Component } from 'react';
import { Icon, Tabs } from 'antd';

import EditStreamersTabList from './EditStreamersTabList';
const TabPane = Tabs.TabPane;
const HeartsOnTabs = ({love}) => {
	let hearts = [];
	for (let i = 0; i < love; i++) {
		hearts.push(<Icon type="heart" key={i} />)
	}
	return (
		<div>
			{hearts}
		</div>
	)
}



class EditStreamers extends Component {
	
	render() {
		return (
			 <div>
			 	<Tabs defaultActiveKey="3">
			 		<TabPane tab={<HeartsOnTabs love="3" />} key="3">
			 			<EditStreamersTabList
			 				streamers={this.props.streamers}
			 				love="3"
			 				addStreamer={this.props.addStreamer}
			 				updateStoreToLocalstorage={this.props.updateStoreToLocalstorage}
			 				deleteStreamerFromStore={this.props.deleteStreamerFromStore}
			 				socket={this.props.socket}
			 			/>
			 		</TabPane>
			 		<TabPane tab={<HeartsOnTabs love="2" />} key="2">
			 			<EditStreamersTabList
			 				streamers={this.props.streamers}
			 				love="2"
			 				addStreamer={this.props.addStreamer}
			 				updateStoreToLocalstorage={this.props.updateStoreToLocalstorage}
			 				deleteStreamerFromStore={this.props.deleteStreamerFromStore}
			 				socket={this.props.socket}
			 			/>
			 		</TabPane>
			 		<TabPane tab={<HeartsOnTabs love="1" />} key="1">
			 			<EditStreamersTabList
			 				streamers={this.props.streamers}
			 				love="1"
			 				addStreamer={this.props.addStreamer}
			 				updateStoreToLocalstorage={this.props.updateStoreToLocalstorage}
			 				deleteStreamerFromStore={this.props.deleteStreamerFromStore}
			 				socket={this.props.socket}
			 			/>
			 		</TabPane>
			 	</Tabs>
			 </div>
		)
	}
}

export default EditStreamers;